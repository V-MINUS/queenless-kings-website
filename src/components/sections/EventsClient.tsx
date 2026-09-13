'use client'

import type { CalendarEvent } from '@/lib/google-calendar'
import { motion } from 'framer-motion'
import { Clock, MapPin, Ticket, CalendarPlus } from 'lucide-react'
import { useState } from 'react'

interface EventsClientProps {
  events: CalendarEvent[]
}

function getDay(dateStr: string) {
  return new Date(dateStr).getDate()
}

function getMonth(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-GB', { month: 'short' }).toUpperCase()
}

function getWeekday(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'long' })
}

function getTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function stripUrls(text: string) {
  return text.replace(/https?:\/\/\S+/g, '').trim()
}

function DateBadge({ dateStr, large = false }: { dateStr: string; large?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-brand-crimson rounded-xl flex-shrink-0 ${
      large
        ? 'w-20 h-20 shadow-[0_0_30px_rgba(196,30,58,0.35)]'
        : 'w-14 h-14'
    }`}>
      <span className={`font-bold text-white leading-none ${large ? 'text-3xl' : 'text-xl'}`}>
        {getDay(dateStr)}
      </span>
      <span className={`font-bold text-white/70 tracking-wider ${large ? 'text-xs mt-0.5' : 'text-[10px]'}`}>
        {getMonth(dateStr)}
      </span>
    </div>
  )
}

function TicketButton({ event, small = false }: { event: CalendarEvent; small?: boolean }) {
  if (event.status === 'cancelled') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-brand-cream/30 ${small ? 'text-xs' : 'text-sm'}`}>
        Cancelled
      </span>
    )
  }
  if (event.ticketUrl) {
    return (
      <a
        href={event.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 bg-brand-cream text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(245,240,225,0.3)] transition-all uppercase tracking-wider ${
          small ? 'text-xs px-3 py-1.5' : 'text-sm px-5 py-2.5'
        }`}
      >
        <Ticket className={small ? 'w-3 h-3' : 'w-4 h-4'} />
        Get Tickets
      </a>
    )
  }
  if (event.htmlLink) {
    return (
      <a
        href={event.htmlLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 border border-white/15 text-brand-cream/70 font-semibold rounded-lg hover:border-brand-crimson/50 hover:text-brand-cream transition-all uppercase tracking-wider ${
          small ? 'text-xs px-3 py-1.5' : 'text-sm px-5 py-2.5'
        }`}
      >
        <CalendarPlus className={small ? 'w-3 h-3' : 'w-4 h-4'} />
        Add to Calendar
      </a>
    )
  }
  return null
}

export default function EventsClient({ events }: EventsClientProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage("You're on the list! 🤘")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  const nextShow = events[0]
  const upcoming = events.slice(1)

  return (
    <section id="events" className="relative py-20 bg-[#0d0d0d] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-brand-crimson text-sm font-bold uppercase tracking-[0.2em]">Live</span>
          <div className="h-px flex-1 bg-brand-crimson/20" />
        </motion.div>

        {events.length === 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-brand-cream/50 mb-12">
            No shows scheduled right now — join the list below and be first to know.
          </div>
        )}

        {/* ── Next Show Spotlight ── */}
        {nextShow && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="text-brand-cream/35 text-xs font-semibold uppercase tracking-[0.15em]">Next Show</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <DateBadge dateStr={nextShow.start} large />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {nextShow.status && nextShow.status !== 'confirmed' && (
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      nextShow.status === 'cancelled'
                        ? 'bg-red-900/40 text-red-400'
                        : 'bg-brand-crimson/20 text-brand-crimson'
                    }`}>
                      {nextShow.status === 'cancelled' ? 'Cancelled' : 'TBC'}
                    </span>
                  )}
                  <span className="text-brand-cream/40 text-xs uppercase tracking-wider">
                    {getWeekday(nextShow.start)}
                    {!nextShow.isAllDay && ` · ${getTime(nextShow.start)}`}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-brand-cream mb-2 leading-snug">
                  {nextShow.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-brand-cream/55">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-crimson flex-shrink-0" />
                    {nextShow.venue || nextShow.location || 'Venue TBA'}
                    {nextShow.city ? `, ${nextShow.city}` : ''}
                  </span>
                  {!nextShow.isAllDay && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-crimson flex-shrink-0" />
                      {getTime(nextShow.start)}
                    </span>
                  )}
                  {nextShow.price && (
                    <span className="font-semibold text-brand-cream/80">{nextShow.price}</span>
                  )}
                </div>

                {nextShow.description && stripUrls(nextShow.description) && (
                  <p className="mt-3 text-brand-cream/40 text-xs leading-relaxed max-w-xl">
                    {stripUrls(nextShow.description)}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0">
                <TicketButton event={nextShow} />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Upcoming Shows List ── */}
        {upcoming.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="text-brand-cream/35 text-xs font-semibold uppercase tracking-[0.15em]">Upcoming</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="space-y-2">
              {upcoming.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
                    event.status === 'cancelled'
                      ? 'border-white/[0.04] opacity-50'
                      : 'border-white/[0.06] bg-white/[0.01] hover:border-brand-crimson/20'
                  }`}
                >
                  <DateBadge dateStr={event.start} />

                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${event.status === 'cancelled' ? 'text-brand-cream/40 line-through' : 'text-brand-cream'}`}>
                      {event.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-0.5 text-[12px] text-brand-cream/40">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue || event.location || 'Venue TBA'}
                        {event.city ? `, ${event.city}` : ''}
                      </span>
                      {!event.isAllDay && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTime(event.start)}
                        </span>
                      )}
                      {event.price && <span className="font-medium text-brand-cream/60">{event.price}</span>}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <TicketButton event={event} small />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Newsletter ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 text-center"
        >
          <h3 className="text-lg font-bold text-brand-cream mb-2 uppercase tracking-wider">Never Miss a Show</h3>
          <p className="text-brand-cream/50 mb-6 max-w-md mx-auto text-sm">
            First to hear new music, gig announcements and presale links.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-sm mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-4 py-3 bg-black border border-white/10 rounded-lg text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-crimson/50 transition-colors text-sm disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 bg-brand-crimson text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(196,30,58,0.4)] transition-all text-sm disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : 'Join'}
              </motion.button>
            </div>
            {message && (
              <p className={`text-xs text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
            <p className="text-[11px] text-brand-cream/25">No spam. Unsubscribe anytime.</p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
