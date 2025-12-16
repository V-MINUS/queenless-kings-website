// Google Calendar API Integration
// Free tier: Unlimited for own calendars

import { google } from 'googleapis'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  location?: string
  start: string
  end: string
  htmlLink?: string
  status?: string
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
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  })
}

// Get Calendar client
function getCalendarClient() {
  const auth = getAuth()
  return google.calendar({ version: 'v3', auth })
}

// Get upcoming events
export async function getUpcomingEvents(maxResults = 10): Promise<CalendarEvent[]> {
  try {
    const calendar = getCalendarClient()
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    if (!calendarId) {
      console.warn('No Google Calendar ID configured')
      return []
    }

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return (response.data.items || []).map((event) => ({
      id: event.id || '',
      title: event.summary || 'Untitled Event',
      description: event.description || undefined,
      location: event.location || undefined,
      start: event.start?.dateTime || event.start?.date || '',
      end: event.end?.dateTime || event.end?.date || '',
      htmlLink: event.htmlLink || undefined,
      status: event.status || undefined,
    }))
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return []
  }
}

// Get events within a date range
export async function getEventsInRange(
  startDate: Date,
  endDate: Date,
  maxResults = 50
): Promise<CalendarEvent[]> {
  try {
    const calendar = getCalendarClient()
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    if (!calendarId) return []

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return (response.data.items || []).map((event) => ({
      id: event.id || '',
      title: event.summary || 'Untitled Event',
      description: event.description || undefined,
      location: event.location || undefined,
      start: event.start?.dateTime || event.start?.date || '',
      end: event.end?.dateTime || event.end?.date || '',
      htmlLink: event.htmlLink || undefined,
      status: event.status || undefined,
    }))
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return []
  }
}

// Get a single event by ID
export async function getEventById(eventId: string): Promise<CalendarEvent | null> {
  try {
    const calendar = getCalendarClient()
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    if (!calendarId) return null

    const response = await calendar.events.get({
      calendarId,
      eventId,
    })

    const event = response.data
    return {
      id: event.id || '',
      title: event.summary || 'Untitled Event',
      description: event.description || undefined,
      location: event.location || undefined,
      start: event.start?.dateTime || event.start?.date || '',
      end: event.end?.dateTime || event.end?.date || '',
      htmlLink: event.htmlLink || undefined,
      status: event.status || undefined,
    }
  } catch (error) {
    console.error('Error fetching calendar event:', error)
    return null
  }
}

// Parse location string to extract venue and city
export function parseLocation(location?: string): { venue?: string; city?: string } {
  if (!location) return {}
  
  const parts = location.split(',').map((p) => p.trim())
  if (parts.length >= 2) {
    return {
      venue: parts[0],
      city: parts[1],
    }
  }
  return { venue: location }
}

// Format event date for display
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Format event time for display
export function formatEventTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Check if event is all-day
export function isAllDayEvent(start: string): boolean {
  // All-day events have date format (YYYY-MM-DD) instead of datetime
  return start.length === 10
}
