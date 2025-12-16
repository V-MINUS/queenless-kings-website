'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, Play, Calendar } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        {/* Video element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/queenlesskingsmusic_1730567943_3492577245182398355_19327151472.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Gradient overlay - crimson vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        
        {/* Subtle crimson glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-crimson/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4"
      >
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-brand-crimson/30 text-sm text-brand-cream">
            <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse" />
            Alt Rock from Kerry, Ireland
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-brand-cream drop-shadow-[0_0_30px_rgba(245,240,225,0.3)]">
            Queenless
          </span>
          <br />
          <span className="text-brand-crimson drop-shadow-[0_0_30px_rgba(196,30,58,0.5)]">
            Kings
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg sm:text-xl text-brand-cream/80"
        >
          Raw energy. Unfiltered emotion. Pure rock.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#music"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-crimson text-white font-semibold rounded-lg hover:shadow-glow-crimson transition-all"
          >
            <Play className="w-5 h-5" />
            Listen Now
          </motion.a>
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-cream text-brand-cream font-semibold rounded-lg hover:bg-brand-cream hover:text-black transition-all"
          >
            <Calendar className="w-5 h-5" />
            Tour Dates
          </motion.a>
        </motion.div>

        {/* Latest Release Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <a
            href="https://open.spotify.com/album/03OpQZiz2UuPY1yvcOTGBr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-6 py-3 bg-black/50 backdrop-blur-sm border border-brand-crimson/30 rounded-full hover:border-brand-crimson/50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-brand-crimson to-brand-darkred rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-brand-cream/60">Latest Release</p>
              <p className="text-brand-cream font-semibold group-hover:text-brand-crimson transition-colors">
                When You're On My Mind - Out Now
              </p>
            </div>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-brand-cream/60 hover:text-brand-crimson transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.a>
      </motion.div>
    </section>
  )
}
