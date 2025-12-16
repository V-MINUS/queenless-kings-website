'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Ticket, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface EventCardProps {
  event: {
    _id?: string
    id?: string
    title: string
    date: string
    venue: string
    city: string
    country?: string
    ticketUrl?: string
    ticketPrice?: string
    soldOut?: boolean
    cancelled?: boolean
    imageUrl?: string
    description?: string
  }
  index?: number
  variant?: 'default' | 'compact' | 'featured'
}

export function EventCard({ event, index = 0, variant = 'default' }: EventCardProps) {
  const eventDate = new Date(event.date)
  const isPast = eventDate < new Date()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`flex items-center gap-4 p-4 rounded-lg bg-dark-800 border border-dark-700 ${
          isPast ? 'opacity-60' : ''
        }`}
      >
        {/* Date Badge */}
        <div className="flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center bg-dark-700 rounded-lg">
          <span className="text-2xl font-bold text-neon-green">{eventDate.getDate()}</span>
          <span className="text-xs uppercase text-gray-400">
            {eventDate.toLocaleDateString('en-GB', { month: 'short' })}
          </span>
        </div>

        {/* Event Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{event.title}</h3>
          <p className="text-sm text-gray-400 truncate">
            {event.venue}, {event.city}
          </p>
        </div>

        {/* Status/Action */}
        <div className="flex-shrink-0">
          {event.soldOut ? (
            <span className="px-3 py-1 text-xs font-semibold bg-red-500/20 text-red-400 rounded-full">
              Sold Out
            </span>
          ) : event.cancelled ? (
            <span className="px-3 py-1 text-xs font-semibold bg-gray-500/20 text-gray-400 rounded-full">
              Cancelled
            </span>
          ) : event.ticketUrl && !isPast ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-neon-green/20 text-neon-green rounded-full hover:bg-neon-green/30 transition-colors"
            >
              <Ticket className="w-3 h-3" />
              Tickets
            </a>
          ) : null}
        </div>
      </motion.div>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-600"
      >
        {/* Background Image */}
        {event.imageUrl && (
          <div className="absolute inset-0">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
          </div>
        )}

        <div className="relative p-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-neon-pink/20 text-neon-pink rounded-full mb-4">
            Featured Event
          </span>

          <h2 className="text-3xl font-bold text-white mb-4">{event.title}</h2>

          <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neon-green" />
              <span>{formatDate(eventDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-neon-green" />
              <span>{formatTime(eventDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-neon-green" />
              <span>
                {event.venue}, {event.city}
              </span>
            </div>
          </div>

          {event.description && (
            <p className="text-gray-400 mb-6 line-clamp-2">{event.description}</p>
          )}

          <div className="flex items-center gap-4">
            {event.soldOut ? (
              <span className="px-6 py-3 text-sm font-semibold bg-red-500/20 text-red-400 rounded-lg">
                Sold Out
              </span>
            ) : event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-semibold rounded-lg hover:shadow-neon-green transition-all"
              >
                <Ticket className="w-5 h-5" />
                Get Tickets
                {event.ticketPrice && <span>• {event.ticketPrice}</span>}
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-xl bg-dark-800 border border-dark-700 hover:border-neon-green/50 transition-all duration-300 ${
        isPast ? 'opacity-60' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Date Badge */}
          <div className="flex-shrink-0 w-20 h-20 flex flex-col items-center justify-center bg-dark-700 rounded-xl group-hover:bg-neon-green/10 transition-colors">
            <span className="text-3xl font-bold text-neon-green">{eventDate.getDate()}</span>
            <span className="text-sm uppercase text-gray-400">
              {eventDate.toLocaleDateString('en-GB', { month: 'short' })}
            </span>
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
              {event.title}
            </h3>

            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-pink" />
                <span>
                  {event.venue}, {event.city}
                  {event.country && `, ${event.country}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-pink" />
                <span>{formatTime(eventDate)}</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex-shrink-0">
            {event.soldOut ? (
              <span className="px-4 py-2 text-sm font-semibold bg-red-500/20 text-red-400 rounded-lg">
                Sold Out
              </span>
            ) : event.cancelled ? (
              <span className="px-4 py-2 text-sm font-semibold bg-gray-500/20 text-gray-400 rounded-lg">
                Cancelled
              </span>
            ) : event.ticketUrl && !isPast ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green text-black font-semibold rounded-lg hover:shadow-neon-green transition-all"
              >
                <Ticket className="w-4 h-4" />
                {event.ticketPrice || 'Tickets'}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}
