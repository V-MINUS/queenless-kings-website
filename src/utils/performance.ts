// Performance optimization utilities

// Image optimization
export const imageOptimization = {
  // Lazy loading intersection observer
  createLazyLoadObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    if (typeof window === 'undefined') return null
    
    return new IntersectionObserver(callback, {
      rootMargin: '50px 0px',
      threshold: 0.01,
    })
  },

  // Preload critical images
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  },

  // Generate responsive image srcSet
  generateSrcSet: (baseUrl: string, sizes: number[]): string => {
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ')
  },
}

// Code splitting utilities
import React from 'react'
export const dynamicImports = {
  // Lazy load components
  lazyComponent: <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ) => {
    if (typeof window === 'undefined') return null
    return React.lazy(importFunc)
  },

  // Preload route components
  preloadRoute: async (routeImport: () => Promise<any>) => {
    try {
      await routeImport()
    } catch (error) {
      console.warn('Failed to preload route:', error)
    }
  },
}

// Performance monitoring
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string, renderFn: () => void) => {
    if (typeof window === 'undefined') return renderFn()
    
    const start = performance.now()
    renderFn()
    const end = performance.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${end - start}ms`)
    }
  },

  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window === 'undefined') return
    
    // Track LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // Track FID (First Input Delay)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        console.log('FID:', entry.processingStart - entry.startTime)
      })
    }).observe({ entryTypes: ['first-input'] })

    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      console.log('CLS:', clsValue)
    }).observe({ entryTypes: ['layout-shift'] })
  },
}

// Memory management
export const memoryOptimization = {
  // Debounce function calls
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  // Throttle function calls
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Clean up event listeners
  createCleanupManager: () => {
    const cleanupFunctions: (() => void)[] = []
    
    return {
      add: (cleanup: () => void) => {
        cleanupFunctions.push(cleanup)
      },
      cleanup: () => {
        cleanupFunctions.forEach(fn => fn())
        cleanupFunctions.length = 0
      },
    }
  },
}

// Network optimization
export const networkOptimization = {
  // Prefetch resources
  prefetchResource: (url: string, type: 'script' | 'style' | 'image' = 'script') => {
    if (typeof document === 'undefined') return
    
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = type
    link.href = url
    document.head.appendChild(link)
  },

  // Preconnect to external domains
  preconnectDomain: (domain: string) => {
    if (typeof document === 'undefined') return
    
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    document.head.appendChild(link)
  },

  // Check network connection
  getNetworkInfo: () => {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return { effectiveType: '4g', downlink: 10 }
    }
    
    const connection = (navigator as any).connection
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
    }
  },
}

// Bundle optimization
export const bundleOptimization = {
  // Check if feature is supported
  supportsFeature: (feature: string): boolean => {
    if (typeof window === 'undefined') return false
    
    switch (feature) {
      case 'webp':
        return document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1
      case 'avif':
        return document.createElement('canvas').toDataURL('image/avif').indexOf('avif') > -1
      case 'intersection-observer':
        return 'IntersectionObserver' in window
      case 'service-worker':
        return 'serviceWorker' in navigator
      default:
        return false
    }
  },

  // Load polyfills conditionally
  loadPolyfill: async (condition: boolean, polyfillUrl: string) => {
    if (!condition && typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = polyfillUrl
      document.head.appendChild(script)
      
      return new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
      })
    }
  },
}

// SEO optimization
export const seoOptimization = {
  // Generate structured data
  generateStructuredData: (type: 'MusicGroup' | 'Event' | 'MusicRecording', data: any) => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
    }
    
    return JSON.stringify({ ...baseSchema, ...data })
  },

  // Update meta tags dynamically
  updateMetaTags: (tags: Record<string, string>) => {
    if (typeof document === 'undefined') return
    
    Object.entries(tags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    })
  },
}

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return
  
  // Preconnect to external services
  networkOptimization.preconnectDomain('https://fonts.googleapis.com')
  networkOptimization.preconnectDomain('https://api.spotify.com')
  
  // Track web vitals in production
  if (process.env.NODE_ENV === 'production') {
    performanceMonitor.trackWebVitals()
  }
  
  // Load critical polyfills
  bundleOptimization.loadPolyfill(
    !bundleOptimization.supportsFeature('intersection-observer'),
    'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver'
  )
}
