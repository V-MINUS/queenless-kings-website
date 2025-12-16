'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Music, Calendar, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-green/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-pink/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[150px] sm:text-[200px] font-bold leading-none">
            <span className="text-neon-green drop-shadow-[0_0_30px_rgba(57,255,20,0.5)]">4</span>
            <span className="text-white">0</span>
            <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,16,240,0.5)]">4</span>
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lost in the Kingdom
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Looks like this page took a wrong turn at the last gig. 
            Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-semibold rounded-lg hover:shadow-neon-green transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/#music"
            className="inline-flex items-center gap-2 px-6 py-3 border border-dark-600 text-white font-semibold rounded-lg hover:border-neon-pink hover:text-neon-pink transition-all"
          >
            <Music className="w-5 h-5" />
            Listen to Music
          </Link>
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 px-6 py-3 border border-dark-600 text-white font-semibold rounded-lg hover:border-neon-green hover:text-neon-green transition-all"
          >
            <Calendar className="w-5 h-5" />
            View Events
          </Link>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back to previous page
        </motion.button>
      </div>
    </div>
  )
}
