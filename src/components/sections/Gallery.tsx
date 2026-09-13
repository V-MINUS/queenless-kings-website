'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type Category = 'live' | 'press' | 'artwork'
type Filter = 'all' | Category

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Live', value: 'live' },
  { label: 'Press', value: 'press' },
  { label: 'Artwork', value: 'artwork' },
]

const galleryItems: { id: number; category: Category; src: string; alt: string; title: string }[] = [
  { id: 101, category: 'live', src: '/media/gig-photo-01.jpg', alt: 'Drummer behind the kit', title: 'Live at DFM' },
  { id: 102, category: 'live', src: '/media/gig-photo-02.jpg', alt: 'Band member on stage', title: 'Live at DFM' },
  { id: 103, category: 'live', src: '/media/gig-photo-03.jpg', alt: 'Guitarist playing live', title: 'Live at DFM' },
  { id: 104, category: 'live', src: '/media/gig-photo-04.jpg', alt: 'Guitarist shredding', title: 'Live at DFM' },
  { id: 105, category: 'live', src: '/media/gig-photo-05.jpg', alt: 'Band member portrait live', title: 'Live at DFM' },
  { id: 106, category: 'live', src: '/media/gig-photo-06.jpg', alt: 'Band member on stage', title: 'Live at DFM' },
  { id: 107, category: 'live', src: '/media/gig-photo-07.jpg', alt: 'Band member performing', title: 'Live at DFM' },
  { id: 108, category: 'live', src: '/media/gig-photo-08.jpg', alt: 'Stage close-up', title: 'Live at DFM' },
  { id: 109, category: 'live', src: '/media/gig-photo-09.jpg', alt: 'Band member performing', title: 'Live at DFM' },
  { id: 110, category: 'live', src: '/media/gig-photo-10.jpg', alt: 'Singer performing live', title: 'Live at DFM' },
  { id: 111, category: 'live', src: '/media/gig-photo-11.jpg', alt: 'Band member on stage', title: 'Live at DFM' },
  { id: 112, category: 'live', src: '/media/gig-photo-12.jpg', alt: 'Singer belting it out', title: 'Live at DFM' },
  { id: 113, category: 'live', src: '/media/gig-photo-13.jpg', alt: 'Band member performing', title: 'Live at DFM' },
  { id: 114, category: 'live', src: '/media/gig-photo-14.jpg', alt: 'Band backstage', title: 'Behind the Scenes' },
  { id: 1,   category: 'live', src: '/media/queenlesskingsmusic_1730371247_3490929502043005438_19327151472.jpg', alt: 'Queenless Kings at The Grand, Killarney', title: 'The Grand, Killarney' },
  { id: 2,   category: 'press', src: '/media/queenlesskingsmusic_1731090435_3496962489134188358_19327151472.webp', alt: 'Band group photo', title: 'Band Promo Shoot' },
  { id: 3,   category: 'press', src: '/media/queenlesskingsmusic_1731090435_3496962489134201983_19327151472.webp', alt: 'Band member portrait', title: 'Portrait Session' },
  { id: 4,   category: 'press', src: '/media/queenlesskingsmusic_1731090435_3496962489134213247_19327151472.webp', alt: 'Band member portrait', title: 'Portrait Session' },
  { id: 5,   category: 'press', src: '/media/queenlesskingsmusic_1731090435_3496962489226622453_19327151472.webp', alt: 'Guitarist with PRS guitar', title: 'Guitar Session' },
  { id: 6,   category: 'press', src: '/media/queenlesskingsmusic_1731090435_3496962489243162220_19327151472.webp', alt: 'Band member portrait', title: 'Portrait Session' },
  { id: 7,   category: 'press', src: '/media/queenlesskingsmusic_1731090435_3496962489276883686_19327151472.webp', alt: 'Guitarist playing', title: 'Guitar Session' },
  { id: 8,   category: 'artwork', src: '/media/queenlesskingsmusic_1732721683_3510646387546488337_19327151472.jpg', alt: 'Piece of Cake album artwork', title: 'Piece of Cake' },
]

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter)
  const selectedItem = galleryItems.find(i => i.id === selectedId) ?? null

  const navigate = (dir: 'prev' | 'next') => {
    if (selectedId === null) return
    const idx = filtered.findIndex(i => i.id === selectedId)
    if (dir === 'prev') setSelectedId(filtered[(idx - 1 + filtered.length) % filtered.length].id)
    else setSelectedId(filtered[(idx + 1) % filtered.length].id)
  }

  return (
    <section id="gallery" className="relative py-20 bg-black overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="text-brand-crimson text-sm font-bold uppercase tracking-[0.2em]">Gallery</span>
          <div className="h-px flex-1 bg-brand-crimson/20" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.12em] transition-all ${
                filter === f.value
                  ? 'bg-brand-crimson text-white'
                  : 'border border-white/10 text-brand-cream/45 hover:text-brand-cream hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2.5">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid mb-2.5 group relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedId(item.id)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full block object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedId(null)}
            >
              <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute -top-11 right-0 text-brand-cream/60 hover:text-brand-cream transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>

                <button
                  onClick={() => navigate('prev')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-brand-cream/40 hover:text-brand-cream transition-colors hidden sm:block"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={() => navigate('next')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-brand-cream/40 hover:text-brand-cream transition-colors hidden sm:block"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full max-h-[82vh] object-contain rounded-lg"
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-brand-cream/60 text-sm">{selectedItem.title}</p>
                  <p className="text-brand-cream/30 text-xs uppercase tracking-wider">{selectedItem.category}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
