'use client'

import { motion } from 'framer-motion'
import { Play, Pause, ExternalLink, Download } from 'lucide-react'
import { useState } from 'react'

const releases = [
  {
    id: 1,
    title: "When You're On My Mind",
    type: 'Single',
    year: '2024',
    cover: '/media/queenlesskingsmusic_1732721683_3510646387546488337_19327151472.jpg',
    duration: '3:45',
    spotifyUrl: 'https://open.spotify.com/album/03OpQZiz2UuPY1yvcOTGBr',
    bandcampUrl: 'https://queenlesskings.bandcamp.com/',
    youtubeUrl: 'https://www.youtube.com/@queenlesskings8794',
  },
  {
    id: 2,
    title: 'Killing Floor',
    type: 'Single',
    year: '2024',
    cover: '/media/queenlesskingsmusic_1730371247_3490929502043005438_19327151472.jpg',
    duration: '4:12',
    spotifyUrl: 'https://open.spotify.com/album/0MBDBT5sOOs0mMdHE7BckA',
    bandcampUrl: 'https://queenlesskings.bandcamp.com/',
    youtubeUrl: 'https://www.youtube.com/@queenlesskings8794',
  },
]

export default function Music() {
  const [playingId, setPlayingId] = useState<number | null>(null)

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id)
  }

  return (
    <section id="music" className="relative py-20 bg-brand-charcoal overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      {/* Crimson glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-darkred/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Music</h2>
          <p className="text-lg text-brand-cream/70 max-w-3xl mx-auto mt-6">
            Explore our latest releases and discover the sound of Queenless Kings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative cyber-card rounded-xl overflow-hidden hover:border-brand-crimson/50 transition-all duration-300"
            >
              {/* Cover Art */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={release.cover} 
                  alt={release.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => togglePlay(release.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-16 h-16 bg-brand-crimson rounded-full flex items-center justify-center shadow-glow-crimson">
                    {playingId === release.id ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white ml-1" />
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-brand-crimson font-semibold uppercase tracking-wider">{release.type}</span>
                  <span className="text-sm text-brand-cream/60">{release.year}</span>
                </div>
                
                <h3 className="text-xl font-bold text-brand-cream mb-2">{release.title}</h3>
                <p className="text-brand-cream/60 text-sm mb-4">{release.duration}</p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.a
                      href={release.spotifyUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-brand-charcoal rounded-lg text-brand-cream/60 hover:text-brand-crimson transition-all duration-200"
                      aria-label="Listen on Spotify"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href={release.bandcampUrl}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-brand-charcoal rounded-lg text-brand-cream/60 hover:text-brand-crimson transition-all duration-200"
                      aria-label="Buy on Bandcamp"
                    >
                      <Download className="h-4 w-4" />
                    </motion.a>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm bg-brand-crimson text-white font-semibold rounded-lg hover:shadow-glow-crimson transition-all duration-200"
                  >
                    Listen Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Streaming Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-lg font-semibold text-brand-cream/60 mb-8 uppercase tracking-wider">Available on all platforms</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[
              { name: 'Spotify', href: 'https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82' },
              { name: 'Bandcamp', href: 'https://queenlesskings.bandcamp.com/' },
              { name: 'YouTube', href: 'https://www.youtube.com/@queenlesskings8794' },
              { name: 'SoundCloud', href: 'https://soundcloud.com/user-598831235' },
            ].map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3 cyber-card rounded-lg text-brand-cream/80 hover:text-brand-crimson hover:border-brand-crimson/50 transition-all duration-200 font-medium"
              >
                {platform.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
