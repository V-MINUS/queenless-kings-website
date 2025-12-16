'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'default' | 'glass' | 'neon'
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-background-secondary border border-dark-800',
      glass: 'backdrop-blur-glass border border-dark-700',
      neon: 'bg-background-secondary border border-neon-green/30 shadow-lg shadow-neon-green/10',
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
