'use client'

import type { CalendarEvent } from '@/lib/google-calendar'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Ticket } from 'lucide-react'
import { useState } from 'react'

interface EventsClientProps {
  events: CalendarEvent[]
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

function stripUrls(text: string): string {
  return text.replace(/https?:\/\/\S+/g, '').trim()
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
        setMessage('You\'re on the list! 🤘')
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

  return (
    <section id="events" className="relative py-20 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Shows</h2>
          <p className="text-lg text-brand-cream/70 max-w-3xl mx-auto mt-6">
            Join us live and experience the energy that defines Queenless Kings
          </p>
        </motion.div>

        <div className="space-y-6">
          {events.length === 0 && (
            <div className="cyber-card rounded-xl p-8 text-center text-brand-cream/70">
              No shows are scheduled right now. Join the mailing list below and we will let you know the
              moment new dates go live.
            </div>
          )}

          {events.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cyber-card rounded-xl hover:border-brand-crimson/50 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-4">
                      <h3 className="text-xl font-bold text-brand-crimson mb-2 md:mb-0 hover:text-brand-cream transition-colors">
                        {event.title}
                      </h3>
                      {event.status && (
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            event.status === 'cancelled'
                              ? 'bg-brand-darkred/20 text-brand-cream/60 border border-brand-darkred/30'
                              : 'bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30'
                          }`}
                        >
                          {event.status === 'cancelled'
                            ? 'Cancelled'
                            : event.status === 'tentative'
                              ? 'TBC'
                              : 'On Sale'}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-brand-cream/70">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-brand-crimson" />
                        <span>
                          {formatDate(event.start)}{' '}
                          {event.isAllDay ? '(All day)' : `@ ${formatTime(event.start)}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 md:col-span-2">
                        <MapPin className="h-5 w-5 text-brand-crimson" />
                        <span className="text-brand-crimson hover:underline cursor-pointer">
                          {event.venue || event.location || 'Venue TBA'}
                          {event.city ? `, ${event.city}` : ''}
                        </span>
                      </div>
                    </div>

                    {event.description && stripUrls(event.description) && (
                      <p className="mt-4 text-brand-cream/60 text-sm leading-relaxed max-w-3xl">
                        {stripUrls(event.description)}
                      </p>
                    )}
                  </div>

                  {/* Ticket Info */}
                  <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4">
                    {event.price && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-cream">{event.price}</div>
                        <div className="text-sm text-brand-cream/60">per ticket</div>
                      </div>
                    )}
                    
                    <motion.a
                      href={event.ticketUrl || event.htmlLink || '#'}
                      target={event.ticketUrl || event.htmlLink ? '_blank' : undefined}
                      rel={event.ticketUrl || event.htmlLink ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: event.status === 'cancelled' ? 1 : 1.05 }}
                      whileTap={{ scale: event.status === 'cancelled' ? 1 : 0.95 }}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold uppercase tracking-wider text-sm transition-all duration-200 ${
                        event.status === 'cancelled'
                          ? 'bg-brand-charcoal text-brand-cream/40 cursor-not-allowed'
                          : 'bg-brand-cream text-black hover:shadow-glow-gold'
                      }`}
                    >
                      <Ticket className="h-4 w-4" />
                      <span>
                        {event.status === 'cancelled'
                          ? 'Cancelled'
                          : event.ticketUrl || event.htmlLink
                            ? 'Get Tickets'
                            : 'More Info'}
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup for Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center cyber-card rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-brand-cream mb-4 uppercase tracking-wider">Never Miss a Show</h3>
          <p className="text-brand-cream/70 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new tour dates, 
            exclusive presales, and special events.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-4 py-3 bg-brand-charcoal border border-brand-crimson/30 rounded-lg text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-crimson transition-colors duration-200 disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.05 }}
                whileTap={{ scale: status === 'loading' || status === 'success' ? 1 : 0.95 }}
                className="px-6 py-3 bg-brand-crimson text-white font-semibold rounded-lg hover:shadow-glow-crimson transition-all duration-200 uppercase tracking-wider text-sm disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </div>
            {message && (
              <p className={`text-sm text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
