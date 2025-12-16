// Email Service using Resend (Free tier: 10,000 emails/month)
import { Resend } from 'resend'

// Initialize Resend only if API key is available
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured - email functionality disabled')
    return null
  }
  return new Resend(apiKey)
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterData {
  email: string
  name?: string
  source?: 'footer' | 'events' | 'popup' | 'other'
}

// Send contact form submission
export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const resend = getResend()
    if (!resend) {
      console.log('Email would be sent:', data)
      return true // Return true in dev mode without API key
    }
    
    const fromEmail = process.env.EMAIL_FROM || 'Queen Less Kings <noreply@queenlesskings.com>'
    const toEmail = process.env.EMAIL_TO || 'info@queenlesskings.com'

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `[Contact Form] ${data.subject}`,
      html: generateContactEmailHTML(data),
    })

    // Send confirmation to the user
    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: 'Thanks for reaching out! - Queen Less Kings',
      html: generateContactConfirmationHTML(data.name),
    })

    return true
  } catch (error) {
    console.error('Error sending contact email:', error)
    return false
  }
}

// Send newsletter welcome email
export async function sendNewsletterWelcome(data: NewsletterData): Promise<boolean> {
  try {
    const resend = getResend()
    if (!resend) {
      console.log('Newsletter signup would be sent:', data)
      return true // Return true in dev mode without API key
    }
    
    const fromEmail = process.env.EMAIL_FROM || 'Queen Less Kings <noreply@queenlesskings.com>'

    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: 'Welcome to the Kingdom! 👑 - Queen Less Kings',
      html: generateNewsletterWelcomeHTML(data.name),
    })

    return true
  } catch (error) {
    console.error('Error sending newsletter welcome:', error)
    return false
  }
}

// Legacy compatibility functions
export async function handleContactForm(data: ContactFormData): Promise<boolean> {
  return sendContactEmail(data)
}

export async function handleNewsletterSubscription(data: NewsletterData): Promise<boolean> {
  return sendNewsletterWelcome(data)
}

// Email HTML Templates
function generateContactEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border-radius: 12px; padding: 40px; border: 1px solid #333;">
        <h1 style="color: #39FF14; margin: 0 0 24px; font-size: 24px;">New Contact Form Submission</h1>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #888; margin: 0 0 4px; font-size: 12px; text-transform: uppercase;">From</p>
          <p style="margin: 0; font-size: 16px;">${data.name} &lt;${data.email}&gt;</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #888; margin: 0 0 4px; font-size: 12px; text-transform: uppercase;">Subject</p>
          <p style="margin: 0; font-size: 16px;">${data.subject}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #888; margin: 0 0 4px; font-size: 12px; text-transform: uppercase;">Message</p>
          <div style="background-color: #1a1a1a; padding: 16px; border-radius: 8px; border-left: 3px solid #39FF14;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;">
        
        <p style="color: #666; font-size: 12px; margin: 0;">
          Reply directly to this email to respond to ${data.name}.
        </p>
      </div>
    </body>
    </html>
  `
}

function generateContactConfirmationHTML(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border-radius: 12px; padding: 40px; border: 1px solid #333;">
        <h1 style="color: #39FF14; margin: 0 0 24px; font-size: 28px;">Thanks for reaching out! 🎸</h1>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Hey ${name || 'there'},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          We've received your message and will get back to you as soon as possible. 
          Our team typically responds within 24-48 hours.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
          In the meantime, check out our latest music and upcoming shows!
        </p>
        
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://queenlesskings.com'}" 
           style="display: inline-block; background: linear-gradient(135deg, #39FF14, #00FFFF); color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Visit Our Website
        </a>
        
        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;">
        
        <p style="color: #666; font-size: 12px; margin: 0;">
          Rock on! 🤘<br>
          The Queen Less Kings Team
        </p>
      </div>
    </body>
    </html>
  `
}

function generateNewsletterWelcomeHTML(name?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border-radius: 12px; padding: 40px; border: 1px solid #333;">
        <h1 style="color: #39FF14; margin: 0 0 8px; font-size: 32px;">Welcome to the Kingdom! 👑</h1>
        <p style="color: #FF10F0; margin: 0 0 24px; font-size: 18px;">You're officially part of the crew</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Hey ${name || 'there'},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
          Thanks for joining the Queen Less Kings newsletter! You'll be the first to know about:
        </p>
        
        <ul style="padding-left: 20px; margin: 0 0 24px;">
          <li style="margin-bottom: 8px;">🎵 <strong>New Music Releases</strong> - Be first to hear our latest tracks</li>
          <li style="margin-bottom: 8px;">🎤 <strong>Tour Dates & Tickets</strong> - Early access to shows</li>
          <li style="margin-bottom: 8px;">🎁 <strong>Exclusive Content</strong> - Behind-the-scenes & merch drops</li>
          <li style="margin-bottom: 8px;">🎉 <strong>Special Offers</strong> - Subscriber-only deals</li>
        </ul>
        
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://queenlesskings.com'}" 
           style="display: inline-block; background: linear-gradient(135deg, #39FF14, #00FFFF); color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Explore Our Music
        </a>
        
        <hr style="border: none; border-top: 1px solid #333; margin: 32px 0;">
        
        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <a href="${process.env.NEXT_PUBLIC_SPOTIFY || '#'}" style="color: #1DB954; text-decoration: none;">Spotify</a>
          <a href="${process.env.NEXT_PUBLIC_INSTAGRAM || '#'}" style="color: #E4405F; text-decoration: none;">Instagram</a>
          <a href="${process.env.NEXT_PUBLIC_YOUTUBE || '#'}" style="color: #FF0000; text-decoration: none;">YouTube</a>
        </div>
        
        <p style="color: #666; font-size: 12px; margin: 0;">
          Rock on! 🤘<br>
          The Queen Less Kings Team
        </p>
      </div>
    </body>
    </html>
  `
}
