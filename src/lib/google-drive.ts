// Google Drive API Integration
// Free tier: 15GB storage, 10M queries/day

import { google } from 'googleapis'

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  thumbnailLink?: string
  webContentLink?: string
  webViewLink?: string
  size?: string
  createdTime?: string
  modifiedTime?: string
}

// Initialize Google Auth
function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    throw new Error('Google service account credentials not configured')
  }

  const parsedCredentials = JSON.parse(credentials)
  
  return new google.auth.GoogleAuth({
    credentials: parsedCredentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })
}

// Get Drive client
function getDriveClient() {
  const auth = getAuth()
  return google.drive({ version: 'v3', auth })
}

// List files in a folder
export async function getMediaFiles(folderId?: string): Promise<DriveFile[]> {
  try {
    const drive = getDriveClient()
    const targetFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID

    if (!targetFolderId) {
      console.warn('No Google Drive folder ID configured')
      return []
    }

    const response = await drive.files.list({
      q: `'${targetFolderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, webViewLink, size, createdTime, modifiedTime)',
      orderBy: 'createdTime desc',
      pageSize: 100,
    })

    return (response.data.files || []) as DriveFile[]
  } catch (error) {
    console.error('Error fetching Google Drive files:', error)
    return []
  }
}

// Get files by type (images, videos, audio)
export async function getMediaByType(
  type: 'image' | 'video' | 'audio',
  folderId?: string
): Promise<DriveFile[]> {
  try {
    const drive = getDriveClient()
    const targetFolderId = folderId || process.env.GOOGLE_DRIVE_FOLDER_ID

    if (!targetFolderId) return []

    const mimeTypeQuery = {
      image: "mimeType contains 'image/'",
      video: "mimeType contains 'video/'",
      audio: "mimeType contains 'audio/'",
    }

    const response = await drive.files.list({
      q: `'${targetFolderId}' in parents and ${mimeTypeQuery[type]} and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, webViewLink, size, createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    })

    return (response.data.files || []) as DriveFile[]
  } catch (error) {
    console.error(`Error fetching ${type} files:`, error)
    return []
  }
}

// Get a direct view URL for a file
export function getFileViewUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

// Get a direct download URL for a file
export function getFileDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

// Get an embeddable URL for a file
export function getFileEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

// Get thumbnail URL with custom size
export function getThumbnailUrl(fileId: string, size: number = 400): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
}

// Check if file is an image
export function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/')
}

// Check if file is a video
export function isVideo(mimeType: string): boolean {
  return mimeType.startsWith('video/')
}

// Check if file is audio
export function isAudio(mimeType: string): boolean {
  return mimeType.startsWith('audio/')
}

// Format file size
export function formatFileSize(bytes: string | number): string {
  const size = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
}
