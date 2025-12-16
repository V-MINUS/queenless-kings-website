'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-dark-700',
        className
      )}
    />
  )
}

// Pre-built skeleton components for common use cases

export function EventCardSkeleton() {
  return (
    <div className="flex items-start gap-4 p-6 rounded-xl bg-dark-800 border border-dark-700">
      <Skeleton className="w-20 h-20 rounded-xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="w-24 h-10 rounded-lg" />
    </div>
  )
}

export function ReleaseCardSkeleton() {
  return (
    <div className="rounded-xl bg-dark-800 border border-dark-700 overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function GalleryItemSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden">
      <Skeleton className="aspect-square w-full" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen bg-dark-900">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
        <Skeleton className="h-16 w-96 max-w-full" />
        <Skeleton className="h-6 w-64 max-w-full" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-12 w-32 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function SectionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-4 w-96 max-w-full mx-auto" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ReleaseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-2/3' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

export function AvatarSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return <Skeleton className={cn('rounded-full', sizeClasses[size])} />
}

export function ButtonSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-28',
    lg: 'h-12 w-36',
  }

  return <Skeleton className={cn('rounded-lg', sizeClasses[size])} />
}
