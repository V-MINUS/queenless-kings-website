import { defineType, defineField } from 'sanity'
import { CalendarIcon } from 'lucide-react'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time (optional)',
      type: 'datetime',
      description: 'For multi-day events or festivals',
    }),
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Venue Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'UK',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
    }),
    defineField({
      name: 'ticketPrice',
      title: 'Ticket Price',
      type: 'string',
      description: 'e.g., "£15" or "Free" or "£15-£25"',
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'cancelled',
      title: 'Cancelled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'lineup',
      title: 'Lineup / Support Acts',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Show this event prominently on the homepage',
    }),
  ],
  orderings: [
    {
      title: 'Date (Upcoming First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Date (Most Recent)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      venue: 'venue',
      city: 'city',
      media: 'image',
    },
    prepare({ title, date, venue, city, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'No date'
      return {
        title,
        subtitle: `${formattedDate} • ${venue}, ${city}`,
        media,
      }
    },
  },
})
