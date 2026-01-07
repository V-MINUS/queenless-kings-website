'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Music, Facebook, Mail, MapPin, Video } from 'lucide-react'

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/queenlesskingsmusic/', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@queenlesskings8794', icon: Youtube },
  { name: 'Spotify', href: 'https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82', icon: Music },
  { name: 'Facebook', href: 'https://www.facebook.com/queenlesskingsmusic/', icon: Facebook },
  { name: 'TikTok', href: 'https://www.tiktok.com/@queenlesskingsofficial', icon: Video },
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Music', href: '#music' },
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-brand-crimson/20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      {/* Social Icons Bar - Sugar Business style */}
      <div className="relative z-10 border-b border-brand-crimson/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full text-brand-cream/60 hover:text-brand-crimson transition-all duration-200"
                  aria-label={social.name}
                >
                  <IconComponent className="h-6 w-6" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-brand-cream mb-4 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                Queenless Kings
              </h3>
              <p className="text-brand-cream/70 mb-6 max-w-md">
                Experience the sound that defines a generation. Follow us for the latest music, 
                exclusive content, and upcoming events.
              </p>
              
              {/* Newsletter Signup */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-brand-charcoal border border-brand-crimson/30 rounded-lg text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-crimson transition-colors duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-brand-crimson text-white font-semibold rounded-lg hover:shadow-glow-crimson transition-all duration-200 uppercase tracking-wider text-sm"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-brand-cream mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-brand-cream/60 hover:text-brand-crimson transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact & Social */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-brand-cream mb-4 uppercase tracking-wider">Connect</h4>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-brand-cream/60">
                  <Mail className="h-4 w-4 text-brand-crimson" />
                  <span className="text-sm">bookings@queenlesskingsband.com</span>
                </div>
                <div className="flex items-center space-x-3 text-brand-cream/60">
                  <MapPin className="h-4 w-4 text-brand-crimson" />
                  <span className="text-sm">Kerry, Ireland</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-brand-crimson/10 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-brand-cream/50 text-sm">
            © 2025 Queenless Kings. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-brand-cream/50 hover:text-brand-crimson text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-brand-cream/50 hover:text-brand-crimson text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
