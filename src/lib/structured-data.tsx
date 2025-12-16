// JSON-LD Structured Data for SEO
import React from 'react'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://queenlesskings.com'

export interface EventStructuredData {
  name: string
  startDate: string
  endDate?: string
  location: {
    name: string
    address: string
  }
  description?: string
  image?: string
  offers?: {
    price?: string
    priceCurrency?: string
    url?: string
    availability?: 'InStock' | 'SoldOut' | 'PreOrder'
  }
}

export interface MusicAlbumStructuredData {
  name: string
  artist: string
  datePublished: string
  image?: string
  numTracks?: number
  genre?: string[]
}

// Band/Organization Schema
export function getBandSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'Queen Less Kings',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    description: 'Redefining rock with electric energy and raw emotion',
    genre: ['Rock', 'Alternative Rock', 'Hard Rock'],
    sameAs: [
      process.env.NEXT_PUBLIC_SPOTIFY || '',
      process.env.NEXT_PUBLIC_INSTAGRAM || '',
      process.env.NEXT_PUBLIC_YOUTUBE || '',
      process.env.NEXT_PUBLIC_FACEBOOK || '',
      process.env.NEXT_PUBLIC_TWITTER || '',
    ].filter(Boolean),
  }
}

// Website Schema
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Queen Less Kings',
    url: baseUrl,
    description: 'Official website of Queen Less Kings - Rock band',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

// Event Schema
export function getEventSchema(event: EventStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
      },
    },
    description: event.description,
    image: event.image,
    performer: {
      '@type': 'MusicGroup',
      name: 'Queen Less Kings',
    },
    offers: event.offers
      ? {
          '@type': 'Offer',
          price: event.offers.price || '0',
          priceCurrency: event.offers.priceCurrency || 'GBP',
          url: event.offers.url,
          availability: `https://schema.org/${event.offers.availability || 'InStock'}`,
        }
      : undefined,
  }
}

// Music Album Schema
export function getMusicAlbumSchema(album: MusicAlbumStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: album.name,
    byArtist: {
      '@type': 'MusicGroup',
      name: album.artist,
    },
    datePublished: album.datePublished,
    image: album.image,
    numTracks: album.numTracks,
    genre: album.genre,
  }
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// FAQ Schema (for contact page)
export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Helper to render JSON-LD script tag
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
