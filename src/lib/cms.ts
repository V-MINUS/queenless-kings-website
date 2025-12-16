import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Content types
export interface Event {
  _id: string
  title: string
  date: string
  time: string
  venue: string
  location: string
  price: string
  status: 'on-sale' | 'sold-out' | 'cancelled'
  ticketUrl?: string
  description?: string
  image?: any
}

export interface Release {
  _id: string
  title: string
  type: 'single' | 'ep' | 'album'
  year: string
  duration: string
  cover?: any
  spotifyUrl?: string
  bandcampUrl?: string
  youtubeUrl?: string
  description?: string
  tracks?: Track[]
}

export interface Track {
  _id: string
  title: string
  duration: string
  audioFile?: any
}

export interface GalleryItem {
  _id: string
  title: string
  type: 'image' | 'video'
  media: any
  alt: string
  description?: string
}

export interface NewsPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: any[]
  publishedAt: string
  author: string
  featuredImage?: any
  tags?: string[]
}

// API functions
export async function getEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch(`
      *[_type == "event"] | order(date asc) {
        _id,
        title,
        date,
        time,
        venue,
        location,
        price,
        status,
        ticketUrl,
        description,
        image
      }
    `)
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getReleases(): Promise<Release[]> {
  try {
    const releases = await client.fetch(`
      *[_type == "release"] | order(year desc) {
        _id,
        title,
        type,
        year,
        duration,
        cover,
        spotifyUrl,
        bandcampUrl,
        youtubeUrl,
        description,
        tracks[]-> {
          _id,
          title,
          duration,
          audioFile
        }
      }
    `)
    return releases
  } catch (error) {
    console.error('Error fetching releases:', error)
    return []
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const items = await client.fetch(`
      *[_type == "galleryItem"] | order(_createdAt desc) {
        _id,
        title,
        type,
        media,
        alt,
        description
      }
    `)
    return items
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return []
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const posts = await client.fetch(`
      *[_type == "newsPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        content,
        publishedAt,
        author,
        featuredImage,
        tags
      }
    `)
    return posts
  } catch (error) {
    console.error('Error fetching news posts:', error)
    return []
  }
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    const post = await client.fetch(`
      *[_type == "newsPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        content,
        publishedAt,
        author,
        featuredImage,
        tags
      }
    `, { slug })
    return post
  } catch (error) {
    console.error('Error fetching news post:', error)
    return null
  }
}
