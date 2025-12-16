'use client'

import { motion } from 'framer-motion'

interface SpotifyEmbedProps {
  spotifyId: string
  type: 'album' | 'track' | 'artist' | 'playlist'
  theme?: 'dark' | 'light'
  compact?: boolean
  className?: string
}

export function SpotifyEmbed({
  spotifyId,
  type,
  theme = 'dark',
  compact = false,
  className = '',
}: SpotifyEmbedProps) {
  // Determine height based on type and compact mode
  const getHeight = () => {
    if (compact) return 80
    switch (type) {
      case 'track':
        return 152
      case 'album':
      case 'playlist':
        return 352
      case 'artist':
        return 352
      default:
        return 352
    }
  }

  const embedUrl = `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=${theme === 'dark' ? '0' : '1'}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height={getHeight()}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl border-0"
        title={`Spotify ${type} embed`}
      />
    </motion.div>
  )
}

// Compact player for track previews
export function SpotifyTrackPreview({
  spotifyId,
  className = '',
}: {
  spotifyId: string
  className?: string
}) {
  return (
    <SpotifyEmbed
      spotifyId={spotifyId}
      type="track"
      compact
      className={className}
    />
  )
}

// Full album player
export function SpotifyAlbumPlayer({
  spotifyId,
  className = '',
}: {
  spotifyId: string
  className?: string
}) {
  return (
    <SpotifyEmbed
      spotifyId={spotifyId}
      type="album"
      className={className}
    />
  )
}
