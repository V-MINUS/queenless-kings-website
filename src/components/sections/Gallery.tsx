'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryItems = [
  {
    id: 101,
    type: 'image',
    src: '/media/gig-photo-01.jpg',
    alt: 'Drummer behind the kit - live gig',
    title: 'Live at DFM',
  },
  {
    id: 102,
    type: 'image',
    src: '/media/gig-photo-02.jpg',
    alt: 'Band member on stage - live gig',
    title: 'Live at DFM',
  },
  {
    id: 103,
    type: 'image',
    src: '/media/gig-photo-03.jpg',
    alt: 'Guitarist playing live',
    title: 'Live at DFM',
  },
  {
    id: 104,
    type: 'image',
    src: '/media/gig-photo-04.jpg',
    alt: 'Guitarist shredding on stage',
    title: 'Live at DFM',
  },
  {
    id: 105,
    type: 'image',
    src: '/media/gig-photo-05.jpg',
    alt: 'Band member portrait - live',
    title: 'Live at DFM',
  },
  {
    id: 106,
    type: 'image',
    src: '/media/gig-photo-06.jpg',
    alt: 'Band member on stage',
    title: 'Live at DFM',
  },
  {
    id: 107,
    type: 'image',
    src: '/media/gig-photo-07.jpg',
    alt: 'Band member performing live',
    title: 'Live at DFM',
  },
  {
    id: 108,
    type: 'image',
    src: '/media/gig-photo-08.jpg',
    alt: 'Band member on stage close-up',
    title: 'Live at DFM',
  },
  {
    id: 109,
    type: 'image',
    src: '/media/gig-photo-09.jpg',
    alt: 'Band member performing',
    title: 'Live at DFM',
  },
  {
    id: 110,
    type: 'image',
    src: '/media/gig-photo-10.jpg',
    alt: 'Singer performing live',
    title: 'Live at DFM',
  },
  {
    id: 111,
    type: 'image',
    src: '/media/gig-photo-11.jpg',
    alt: 'Band member on stage',
    title: 'Live at DFM',
  },
  {
    id: 112,
    type: 'image',
    src: '/media/gig-photo-12.jpg',
    alt: 'Singer belting it out live',
    title: 'Live at DFM',
  },
  {
    id: 113,
    type: 'image',
    src: '/media/gig-photo-13.jpg',
    alt: 'Band member performing live',
    title: 'Live at DFM',
  },
  {
    id: 114,
    type: 'image',
    src: '/media/gig-photo-14.jpg',
    alt: 'Band backstage fun',
    title: 'Behind the Scenes',
  },
  {
    id: 1,
    type: 'image',
    src: '/media/queenlesskingsmusic_1730371247_3490929502043005438_19327151472.jpg',
    alt: 'Queenless Kings band photo - The Grand Killarney',
    title: 'The Grand, Killarney',
  },
  {
    id: 2,
    type: 'image',
    src: '/media/queenlesskingsmusic_1731090435_3496962489134188358_19327151472.webp',
    alt: 'Band group photo - playful poses',
    title: 'Band Promo Shoot',
  },
  {
    id: 3,
    type: 'image',
    src: '/media/queenlesskingsmusic_1731090435_3496962489134201983_19327151472.webp',
    alt: 'Band member portrait',
    title: 'Portrait Session',
  },
  {
    id: 4,
    type: 'image',
    src: '/media/queenlesskingsmusic_1731090435_3496962489134213247_19327151472.webp',
    alt: 'Band member portrait',
    title: 'Portrait Session',
  },
  {
    id: 5,
    type: 'image',
    src: '/media/queenlesskingsmusic_1731090435_3496962489226622453_19327151472.webp',
    alt: 'Guitarist with PRS guitar',
    title: 'Guitar Session',
  },
  {
    id: 6,
    type: 'image',
    src: '/media/queenlesskingsmusic_1731090435_3496962489243162220_19327151472.webp',
    alt: 'Band member in red shirt',
    title: 'Portrait Session',
  },
  {
    id: 7,
    type: 'image',
    src: '/media/queenlesskingsmusic_1731090435_3496962489276883686_19327151472.webp',
    alt: 'Guitarist playing',
    title: 'Guitar Session',
  },
  {
    id: 8,
    type: 'image',
    src: '/media/queenlesskingsmusic_1732721683_3510646387546488337_19327151472.jpg',
    alt: 'Piece of Cake album artwork',
    title: 'Piece of Cake - Artwork',
  },
]

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const filteredItems = galleryItems

  const openLightbox = (id: number) => {
    setSelectedItem(id)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedItem === null) return
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedItem(filteredItems[newIndex].id)
  }

  const selectedItemData = selectedItem ? galleryItems.find(item => item.id === selectedItem) : null

  return (
    <section id="gallery" className="relative py-20 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Gallery</h2>
          <p className="text-lg text-brand-cream/70 max-w-3xl mx-auto mb-8 mt-6">
            Behind the scenes, live performances, and exclusive moments
          </p>

        </motion.div>

        {/* Gallery Grid with actual images */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(item.id)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border border-brand-crimson/20 hover:border-brand-crimson/50 transition-all duration-300"
            >
              {/* Actual image */}
              <img 
                src={item.src} 
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-brand-cream text-lg font-semibold uppercase tracking-wider drop-shadow-lg">View</div>
              </div>

              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-brand-cream font-medium truncate">{item.title}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {selectedItem && selectedItemData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeLightbox}
                className="absolute -top-12 right-0 p-2 text-brand-cream hover:text-brand-crimson transition-colors duration-200 z-10"
              >
                <X className="h-8 w-8" />
              </motion.button>

              {/* Navigation buttons */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/80 rounded-full text-brand-cream hover:text-brand-crimson transition-colors duration-200 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/80 rounded-full text-brand-cream hover:text-brand-crimson transition-colors duration-200 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </motion.button>

              {/* Content */}
              <div className="rounded-xl overflow-hidden border border-brand-crimson/30">
                <img 
                    src={selectedItemData.src} 
                    alt={selectedItemData.alt}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                
                <div className="p-4 bg-black/90">
                  <h3 className="text-lg font-bold text-brand-cream">{selectedItemData.title}</h3>
                  <p className="text-brand-cream/60 text-sm">{selectedItemData.alt}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
