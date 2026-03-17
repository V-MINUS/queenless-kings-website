import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis as UpstashRedis } from '@upstash/redis'
import IORedis from 'ioredis'
import { sendContactEmail } from '@/lib/email'

// Redis client setup - supports both Upstash REST API and local Redis
let redisClient: UpstashRedis | IORedis | null = null
let isLocalRedis = false

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Use Upstash REST API (cloud)
  redisClient = new UpstashRedis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
  console.log('Using Upstash Redis (REST API)')
} else if (process.env.REDIS_URL) {
  // Use local Redis (homelab)
  try {
    redisClient = new IORedis(process.env.REDIS_URL)
    isLocalRedis = true
    console.log('Using local Redis:', process.env.REDIS_URL)
  } catch (error) {
    console.error('Failed to connect to local Redis:', error)
    redisClient = null
  }
} else {
  console.warn('No Redis configured - using in-memory rate limiting')
}

const ratelimit = redisClient && !isLocalRedis
  ? new Ratelimit({
      redis: redisClient as UpstashRedis,
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      analytics: true,
    })
  : null

// fallback in-memory limiter if Upstash credentials are missing
const fallbackRateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000
const MAX_REQUESTS = 5

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().optional(),
  turnstileToken: z.string().min(10, 'Verification is required'),
})

// Local Redis rate limiting (for homelab)
async function checkLocalRedisRateLimit(ip: string): Promise<{ success: boolean; reset?: number }> {
  if (!redisClient || !isLocalRedis) {
    return { success: false }
  }

  const key = `contact:${ip}`
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  try {
    const redis = redisClient as IORedis
    
    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart)
    
    // Count requests in current window
    const count = await redis.zcard(key)
    
    if (count >= MAX_REQUESTS) {
      const oldestTimestamp = await redis.zrange(key, 0, 0, 'WITHSCORES')
      const reset = oldestTimestamp[1] ? parseInt(oldestTimestamp[1]) + RATE_LIMIT_WINDOW : now + RATE_LIMIT_WINDOW
      return { success: false, reset: Math.ceil(reset / 1000) }
    }
    
    // Add current request
    await redis.zadd(key, now, `${now}-${Math.random()}`)
    await redis.expire(key, Math.ceil(RATE_LIMIT_WINDOW / 1000))
    
    return { success: true }
  } catch (error) {
    console.error('Local Redis rate limit error:', error)
    return { success: false }
  }
}

// In-memory fallback rate limiting
function checkFallbackRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = fallbackRateLimitMap.get(ip)

  if (!record) {
    fallbackRateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    fallbackRateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (record.count >= MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Rate limiting: Upstash > Local Redis > In-memory fallback
    if (ratelimit) {
      // Upstash REST API rate limiting
      const { success, reset } = await ratelimit.limit(`contact:${ip}`)
      if (!success) {
        const retryAfter = Math.max(0, Math.ceil(reset - Date.now() / 1000))
        return NextResponse.json(
          { error: 'Too many requests. Please slow down.' },
          { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
        )
      }
    } else if (isLocalRedis && redisClient) {
      // Local Redis rate limiting
      const { success, reset } = await checkLocalRedisRateLimit(ip)
      if (!success) {
        const retryAfter = reset ? Math.max(0, reset - Math.floor(Date.now() / 1000)) : 60
        return NextResponse.json(
          { error: 'Too many requests. Please slow down.' },
          { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
        )
      }
    } else if (!checkFallbackRateLimit(ip)) {
      // In-memory fallback
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }

    const { name, email, subject, message, honeypot, turnstileToken } = validationResult.data

    if (honeypot) {
      return NextResponse.json(
        { error: 'Invalid submission.' },
        { status: 400 }
      )
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (!turnstileSecret) {
      return NextResponse.json(
        { error: 'Verification service unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const verifyPayload = new URLSearchParams()
    verifyPayload.append('secret', turnstileSecret)
    verifyPayload.append('response', turnstileToken)
    if (ip && ip !== 'unknown') {
      verifyPayload.append('remoteip', ip)
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: verifyPayload.toString(),
    })

    const verifyData = await verifyResponse.json()
    if (!verifyData.success) {
      return NextResponse.json(
        { error: 'Verification failed. Please refresh and try again.' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Messaging is temporarily unavailable. Please try again soon.' },
        { status: 503 }
      )
    }

    // Send email
    const success = await sendContactEmail({
      name,
      email,
      subject,
      message,
    })

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
