'use client'

import { motion } from 'framer-motion'
import { Users, Music, Award, MapPin } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Band Members', value: '5' },
  { icon: Music, label: 'Years Together', value: '15' },
  { icon: Award, label: 'Live Shows', value: '50+' },
  { icon: MapPin, label: 'Based in', value: 'Kerry' },
]

const achievements = [
  { year: '2023', title: "Winners — Mike The Pie's Battle of the Bands" },
  { year: '2023', title: 'Winners — Local Hero Competition' },
  { year: '2023', title: 'Semi-Finalists — Hot Press National Music Competition' },
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
                Queenless Kings are a five-piece alt rock band whose story began fifteen years ago —
                not in a studio or a venue, but in a shed in Edenderry, Ireland, where a group of 
                childhood friends first plugged in and started making noise together.
              </p>
              <p>
                What began as teenagers messing around with borrowed gear has grown into something 
                far deeper: a decade and a half of writing, gigging and chasing a sound that's truly 
                their own. That shed gave way to stages across the country, the friendships hardened 
                into a band, and the band into a brotherhood — a bond forged entirely through music 
                and the shared determination to make it last.
              </p>
              <p>
                Now based in Tralee, Co. Kerry, they hold a weekly residency at The Grand in 
                Killarney and gig relentlessly across Ireland — a band that truly lives for the stage.
              </p>
              <p className="text-brand-crimson font-semibold italic text-xl">
                "The culmination of 10 years of learning, writing and gigging."
              </p>
            </div>

            {/* Achievements */}
            <div className="mt-8 space-y-3">
              {achievements.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-brand-crimson border border-brand-crimson/40 rounded px-2 py-0.5 uppercase tracking-wider">{item.year}</span>
                  <span className="text-brand-cream/70 text-sm">{item.title}</span>
                </div>
              ))}
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
