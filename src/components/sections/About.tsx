'use client'

import { motion } from 'framer-motion'
import { Users, Music, Award, MapPin } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Band Members', value: '5' },
  { icon: Music, label: 'Songs Released', value: '10+' },
  { icon: Award, label: 'Live Shows', value: '50+' },
  { icon: MapPin, label: 'Based in', value: 'Kerry' },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-header">The Band</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Band Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-crimson/30">
              <img 
                src="/media/band-photo-2025.jpg" 
                alt="Queenless Kings band photo - Copyright Abigail Ring"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-crimson" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-crimson" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand-crimson" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-crimson" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-brand-cream/80 text-lg leading-relaxed">
              <p>
                Queenless Kings are a 5-piece alt-rock band hailing from the heart of Kerry, Ireland. 
                With a sound that blends raw energy with melodic hooks, we've been making waves 
                across the Irish music scene.
              </p>
              <p>
                Our music draws from classic rock influences while pushing into modern territory - 
                think driving guitars, powerful vocals, and songs that stick with you long after 
                the last note fades.
              </p>
              <p>
                From intimate pub gigs to festival stages, we bring the same intensity and 
                passion to every performance. We're not just a band - we're a family, and 
                every show is a chance to welcome more people into the kingdom.
              </p>
              <p className="text-brand-crimson font-semibold italic text-xl">
                "No Queens. Just Kings."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center cyber-card p-6 rounded-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-crimson rounded-full mb-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-brand-crimson mb-1">{stat.value}</div>
                <div className="text-sm text-brand-cream/60">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
