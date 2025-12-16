import { groq } from 'next-sanity'

// ============================================
// Event Queries
// ============================================

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now() && !cancelled] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    venue,
    address,
    city,
    country,
    ticketUrl,
    ticketPrice,
    soldOut,
    description,
    lineup,
    featured,
    "imageUrl": image.asset->url
  }
`

export const pastEventsQuery = groq`
  *[_type == "event" && date < now()] | order(date desc) [0...20] {
    _id,
    title,
    "slug": slug.current,
    date,
    venue,
    city,
    country,
    "imageUrl": image.asset->url
  }
`

export const featuredEventQuery = groq`
  *[_type == "event" && featured == true && date >= now()] | order(date asc) [0] {
    _id,
    title,
    "slug": slug.current,
    date,
    venue,
    city,
    country,
    ticketUrl,
    ticketPrice,
    soldOut,
    "imageUrl": image.asset->url
  }
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    venue,
    address,
    city,
    country,
    ticketUrl,
    ticketPrice,
    soldOut,
    cancelled,
    description,
    lineup,
    "imageUrl": image.asset->url
  }
`

// ============================================
// Release Queries
// ============================================

export const releasesQuery = groq`
  *[_type == "release"] | order(releaseDate desc) {
    _id,
    title,
    "slug": slug.current,
    releaseType,
    releaseDate,
    description,
    spotifyId,
    spotifyUrl,
    appleMusicUrl,
    youtubeUrl,
    bandcampUrl,
    soundcloudUrl,
    tracks,
    featured,
    "coverUrl": coverArt.asset->url
  }
`

export const featuredReleaseQuery = groq`
  *[_type == "release" && featured == true] | order(releaseDate desc) [0] {
    _id,
    title,
    "slug": slug.current,
    releaseType,
    releaseDate,
    spotifyId,
    spotifyUrl,
    "coverUrl": coverArt.asset->url
  }
`

export const releaseBySlugQuery = groq`
  *[_type == "release" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    releaseType,
    releaseDate,
    description,
    spotifyId,
    spotifyUrl,
    appleMusicUrl,
    youtubeUrl,
    bandcampUrl,
    soundcloudUrl,
    tracks,
    credits,
    "coverUrl": coverArt.asset->url
  }
`

// ============================================
// Gallery Queries
// ============================================

export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(date desc) [0...30] {
    _id,
    title,
    mediaType,
    videoUrl,
    youtubeId,
    date,
    tags,
    photographer,
    description,
    featured,
    "imageUrl": image.asset->url,
    "event": event->{
      title,
      "slug": slug.current
    }
  }
`

export const featuredGalleryQuery = groq`
  *[_type == "galleryItem" && featured == true] | order(date desc) [0...6] {
    _id,
    title,
    mediaType,
    youtubeId,
    "imageUrl": image.asset->url
  }
`

// ============================================
// Band Member Queries
// ============================================

export const bandMembersQuery = groq`
  *[_type == "bandMember" && active == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    socialLinks,
    "photoUrl": photo.asset->url
  }
`

// ============================================
// Site Settings Query
// ============================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    tagline,
    description,
    socialLinks,
    contactEmail,
    bookingEmail,
    pressEmail,
    announcement,
    newsletter,
    "logoUrl": logo.asset->url,
    "ogImageUrl": ogImage.asset->url
  }
`
