'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Music, Facebook, Video, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bookings@queenlesskingsband.com',
    href: 'mailto:bookings@queenlesskingsband.com',
  },
  {
    icon: Phone,
    label: 'Booking',
    value: '+44 20 1234 5678',
    href: 'tel:+442012345678',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kerry, Ireland',
    href: '#',
  },
]

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/queenlesskingsmusic/', icon: Instagram, color: 'hover:text-pink-400' },
  { name: 'YouTube', href: 'https://www.youtube.com/@queenlesskings8794', icon: Youtube, color: 'hover:text-red-400' },
  { name: 'Spotify', href: 'https://open.spotify.com/artist/11SfEIcAyAMs9UdphqUF82', icon: Music, color: 'hover:text-green-400' },
  { name: 'Facebook', href: 'https://www.facebook.com/queenlesskingsmusic/', icon: Facebook, color: 'hover:text-blue-400' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@queenlesskingsofficial', icon: Video, color: 'hover:text-cyan-400' },
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }, [formData])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  return (
    <section id="contact" className="relative py-20 bg-brand-charcoal overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      {/* Crimson glow effects */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-brand-crimson/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-brand-darkred/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Contact</h2>
          <p className="text-lg text-brand-cream/70 max-w-3xl mx-auto mt-6">
            Ready to collaborate, book us for an event, or just want to say hello? 
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cyber-card rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-brand-cream mb-6 uppercase tracking-wider">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-cream/70 mb-2 uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-brand-crimson/30 rounded-lg text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-crimson transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-cream/70 mb-2 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-brand-crimson/30 rounded-lg text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-crimson transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-brand-cream/70 mb-2 uppercase tracking-wider">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-brand-crimson/30 rounded-lg text-brand-cream focus:outline-none focus:border-brand-crimson transition-colors duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="press">Press & Media</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-brand-cream/70 mb-2 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-brand-crimson/30 rounded-lg text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-crimson transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-4 bg-brand-crimson/20 border border-brand-crimson/30 rounded-lg text-brand-crimson"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.05 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
                className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-brand-crimson text-white font-semibold rounded-lg hover:shadow-glow-crimson transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-brand-cream mb-6 uppercase tracking-wider">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 cyber-card rounded-lg hover:border-brand-crimson/50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-brand-crimson rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-brand-cream/60 uppercase tracking-wider">{info.label}</div>
                        <div className="text-brand-crimson font-semibold">{info.value}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold text-brand-cream mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center space-x-3 p-4 cyber-card rounded-lg hover:border-brand-crimson/50 text-brand-cream/70 hover:text-brand-crimson transition-all duration-300"
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="font-semibold">{social.name}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="cyber-card rounded-lg p-6">
              <h4 className="text-xl font-bold text-brand-cream mb-4 uppercase tracking-wider">Response Times</h4>
              <div className="space-y-3 text-brand-cream/70">
                <div className="flex justify-between">
                  <span>General Inquiries</span>
                  <span className="text-brand-crimson">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Requests</span>
                  <span className="text-brand-crimson">Same day</span>
                </div>
                <div className="flex justify-between">
                  <span>Press & Media</span>
                  <span className="text-brand-crimson">12-24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
