import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Queen Less Kings',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Redefining rock with electric energy and raw emotion',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Used for Open Graph / Twitter cards (1200x630 recommended)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'spotify', type: 'url', title: 'Spotify' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'tiktok', type: 'url', title: 'TikTok' },
        { name: 'bandcamp', type: 'url', title: 'Bandcamp' },
        { name: 'soundcloud', type: 'url', title: 'SoundCloud' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
    }),
    defineField({
      name: 'pressEmail',
      title: 'Press Email',
      type: 'string',
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Banner', initialValue: false },
        { name: 'text', type: 'string', title: 'Banner Text' },
        { name: 'link', type: 'url', title: 'Banner Link' },
        { name: 'linkText', type: 'string', title: 'Link Text' },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Settings',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Newsletter Signup', initialValue: true },
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Join the Kingdom' },
        { name: 'description', type: 'string', title: 'Description' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global configuration',
      }
    },
  },
})
