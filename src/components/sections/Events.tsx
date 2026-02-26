import type { CalendarEvent } from '@/lib/google-calendar'
import EventsClient from './EventsClient'
import { getUpcomingEvents } from '@/lib/google-calendar'

export default async function Events() {
  let events: CalendarEvent[] = []

  try {
    events = await getUpcomingEvents(6)
  } catch (error) {
    console.error('Failed to load events from Google Calendar', error)
  }

  return <EventsClient events={events} />
}
