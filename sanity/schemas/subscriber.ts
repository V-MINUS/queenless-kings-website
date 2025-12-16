import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  icon: () => '📧',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website Footer', value: 'footer' },
          { title: 'Events Page', value: 'events' },
          { title: 'Popup', value: 'popup' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      date: 'subscribedAt',
      active: 'active',
    },
    prepare({ title, date, active }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-GB')
        : 'Unknown date'
      return {
        title: active ? title : `${title} (Unsubscribed)`,
        subtitle: `Subscribed: ${formattedDate}`,
      }
    },
  },
})
