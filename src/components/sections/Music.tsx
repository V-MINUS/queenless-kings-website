'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Youtube } from 'lucide-react'
import { JsonLd, getMusicRecordingSchema } from '@/lib/structured-data'

const LYRIC_VIDEO_ID = 'QuJxMDbxfa0'

const platforms = [
  { name: 'Spotify', href: 'https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82' },
  { name: 'Bandcamp', href: 'https://queenlesskings.bandcamp.com/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@queenlesskings8794' },
  { name: 'SoundCloud', href: 'https://soundcloud.com/user-598831235' },
]

const releases = [
  {
    id: 1,
    title: 'Forgive Me Brother',
    type: 'Single',
    year: '2025',
    cover: '/media/forgive-me-brother.jpg',
    duration: '3:20',
    description: 'A raw, heavy rock track about loyalty, guilt, and the bonds that define us.',
    spotifyUrl: 'https://open.spotify.com/track/4RZVszD0dPplNRqkgYB6ux',
    spotifyTrackId: '4RZVszD0dPplNRqkgYB6ux',
    bandcampUrl: 'https://queenlesskings.bandcamp.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=QuJxMDbxfa0',
    lyricVideoId: 'QuJxMDbxfa0',
  },
  {
    id: 2,
    title: "When You're On My Mind",
    type: 'Single',
    year: '2024',
    cover: '/media/when-your-on-my-mind.png',
    duration: '3:45',
    description: '',
    lyricVideoId: '',
    spotifyUrl: 'https://open.spotify.com/track/0w6BpESd8qQ4h69bhr0ICp',
    spotifyTrackId: '0w6BpESd8qQ4h69bhr0ICp',
    bandcampUrl: 'https://queenlesskings.bandcamp.com/',
    youtubeUrl: 'https://www.youtube.com/@queenlesskings8794',
  },
  {
    id: 3,
    title: 'Killing Floor',
    type: 'Single',
    year: '2023',
    cover: '/media/killing-floor-single.png',
    duration: '4:12',
    description: '',
    lyricVideoId: '',
    spotifyUrl: 'https://open.spotify.com/track/4cg08bbvli0iYH6Eq9Uzpi',
    spotifyTrackId: '4cg08bbvli0iYH6Eq9Uzpi',
    bandcampUrl: 'https://queenlesskings.bandcamp.com/',
    youtubeUrl: 'https://www.youtube.com/@queenlesskings8794',
  },
]

export default function Music() {
  const featured = releases[0]
  const older = releases.slice(1)

  return (
    <section id="music" className="relative bg-black overflow-hidden">
      {/* Structured Data */}
      {releases.map((release) => (
        <JsonLd
          key={`schema-${release.id}`}
          data={getMusicRecordingSchema({
            name: release.title,
            artist: 'Queenless Kings',
            datePublished: release.year,
            duration: `PT${release.duration.replace(':', 'M')}S`,
            url: release.spotifyUrl,
            image: release.cover,
            genre: ['Rock', 'Alternative Rock', 'Hard Rock'],
          })}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-brand-crimson text-sm font-bold uppercase tracking-[0.2em]">Music</span>
          <div className="h-px flex-1 bg-brand-crimson/20" />
        </motion.div>

        {/* ── Featured Release ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] mb-16"
        >
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            {/* Cover Art */}
            <div className="relative aspect-square lg:aspect-auto min-h-[280px] overflow-hidden">
              <img
                src={featured.cover}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent lg:hidden" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] font-bold text-brand-crimson uppercase tracking-[0.2em] border border-brand-crimson/50 rounded-sm px-2.5 py-1">
                  Latest Single
                </span>
                <span className="text-brand-cream/30 text-xs">{featured.year} · {featured.duration}</span>
              </div>

              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {featured.title}
              </h3>

              <p className="text-brand-cream/55 mb-7 leading-relaxed text-sm sm:text-base">
                {featured.description}
              </p>

              {/* Spotify Embed */}
              <div className="mb-6">
                <iframe
                  src={`https://open.spotify.com/embed/track/${featured.spotifyTrackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${featured.title} on Spotify`}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {featured.lyricVideoId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${featured.lyricVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-brand-cream/80 font-semibold hover:border-white/30 hover:text-brand-cream transition-all text-sm"
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    Watch Lyric Video
                  </a>
                )}
                <a
                  href={featured.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-crimson text-white font-semibold hover:shadow-[0_0_20px_rgba(196,30,58,0.5)] transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Stream Everywhere
                </a>
              </div>

              {/* Platform Pills */}
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-cream/35 hover:text-brand-cream/70 transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25"
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Official Lyric Video ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cream/35 text-xs font-semibold uppercase tracking-[0.15em]">Official Lyric Video</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="relative max-w-4xl rounded-xl overflow-hidden border border-white/[0.06]">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${LYRIC_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Forgive Me Brother | Queenless Kings | Official Lyric Video"
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Past Singles ── */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-cream/35 text-xs font-semibold uppercase tracking-[0.15em]">Previous Singles</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {older.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-brand-crimson/25 transition-all group"
              >
                <div className="w-[72px] h-[72px] flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={release.cover} alt={release.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-brand-cream/35 uppercase tracking-wider">{release.type}</span>
                    <span className="text-[11px] text-brand-cream/25">·</span>
                    <span className="text-[11px] text-brand-cream/35">{release.year}</span>
                  </div>
                  <h4 className="text-brand-cream font-semibold text-sm mb-2 truncate group-hover:text-brand-crimson transition-colors">
                    {release.title}
                  </h4>
                  <div className="flex gap-3">
                    <a
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-cream/35 hover:text-brand-crimson transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Spotify
                    </a>
                    <a
                      href={release.bandcampUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-cream/35 hover:text-brand-crimson transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Bandcamp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
