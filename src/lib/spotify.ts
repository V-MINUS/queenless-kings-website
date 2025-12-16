// Spotify API Integration
// This file handles all Spotify API interactions using the free tier

interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface SpotifyArtist {
  id: string
  name: string
  images: Array<{ url: string; height: number; width: number }>
  followers: { total: number }
  genres: string[]
  external_urls: { spotify: string }
  popularity: number
}

export interface SpotifyTrack {
  id: string
  name: string
  duration_ms: number
  preview_url: string | null
  external_urls: { spotify: string }
  track_number: number
  album: {
    id: string
    name: string
    images: Array<{ url: string; height: number; width: number }>
  }
  artists: Array<{ id: string; name: string }>
}

export interface SpotifyAlbum {
  id: string
  name: string
  album_type: 'album' | 'single' | 'compilation'
  release_date: string
  total_tracks: number
  images: Array<{ url: string; height: number; width: number }>
  external_urls: { spotify: string }
  artists: Array<{ id: string; name: string }>
}

// Cache for access token
let cachedToken: { token: string; expiresAt: number } | null = null

// Get access token using client credentials flow (free tier)
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured')
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data: SpotifyTokenResponse = await response.json()
  
  // Cache the token (expires 5 minutes before actual expiry for safety)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 300) * 1000,
  }

  return data.access_token
}

// Get artist profile
export async function getArtist(artistId?: string): Promise<SpotifyArtist | null> {
  const id = artistId || process.env.SPOTIFY_ARTIST_ID
  if (!id) return null

  try {
    const token = await getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

// Get artist's top tracks
export async function getArtistTopTracks(
  artistId?: string,
  market = 'GB'
): Promise<SpotifyTrack[]> {
  const id = artistId || process.env.SPOTIFY_ARTIST_ID
  if (!id) return []

  try {
    const token = await getAccessToken()
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return []
    const data = await response.json()
    return data.tracks || []
  } catch {
    return []
  }
}

// Get artist's albums
export async function getArtistAlbums(
  artistId?: string,
  includeGroups = 'album,single'
): Promise<SpotifyAlbum[]> {
  const id = artistId || process.env.SPOTIFY_ARTIST_ID
  if (!id) return []

  try {
    const token = await getAccessToken()
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=${includeGroups}&limit=50&market=GB`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return []
    const data = await response.json()
    return data.items || []
  } catch {
    return []
  }
}

// Get album details with tracks
export async function getAlbum(albumId: string): Promise<(SpotifyAlbum & { tracks: { items: SpotifyTrack[] } }) | null> {
  try {
    const token = await getAccessToken()
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

// Get all Spotify data for the artist (combined call for efficiency)
export async function getSpotifyData() {
  const artistId = process.env.SPOTIFY_ARTIST_ID
  if (!artistId) {
    return { artist: null, topTracks: [], albums: [] }
  }

  const [artist, topTracks, albums] = await Promise.all([
    getArtist(artistId),
    getArtistTopTracks(artistId),
    getArtistAlbums(artistId),
  ])

  return { artist, topTracks, albums }
}

// Helper to format duration from milliseconds
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Helper to get Spotify embed URL
export function getSpotifyEmbedUrl(
  type: 'track' | 'album' | 'artist' | 'playlist',
  id: string,
  options?: {
    theme?: 'dark' | 'light'
    compact?: boolean
  }
): string {
  const theme = options?.theme === 'light' ? '1' : '0'
  return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=${theme}`
}

// Helper to get best image from Spotify images array
export function getBestImage(
  images: Array<{ url: string; height: number; width: number }>,
  preferredSize: 'small' | 'medium' | 'large' = 'medium'
): string | null {
  if (!images || images.length === 0) return null

  const sorted = [...images].sort((a, b) => b.width - a.width)
  
  switch (preferredSize) {
    case 'small':
      return sorted[sorted.length - 1]?.url || sorted[0]?.url
    case 'large':
      return sorted[0]?.url
    case 'medium':
    default:
      return sorted[Math.floor(sorted.length / 2)]?.url || sorted[0]?.url
  }
}
