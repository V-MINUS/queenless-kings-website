'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-white mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-8">
            We hit a wrong note there. Don&apos;t worry, our tech crew is on it.
            Try refreshing the page or head back home.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-semibold rounded-lg hover:shadow-neon-green transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-dark-600 text-white font-semibold rounded-lg hover:border-neon-green hover:text-neon-green transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Error Details (dev only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 p-4 bg-dark-800 rounded-lg border border-dark-700 text-left"
          >
            <p className="text-xs text-gray-500 mb-2">Error details (dev only):</p>
            <code className="text-sm text-red-400 break-all">{error.message}</code>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
