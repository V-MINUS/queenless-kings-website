import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'release',
  title: 'Music Release',
  type: 'document',
  icon: () => '💿',
  fields: [
    defineField({
      name: 'title',
      title: 'Release Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: {
        list: [
          { title: 'Album', value: 'album' },
          { title: 'EP', value: 'ep' },
          { title: 'Single', value: 'single' },
          { title: 'Live Album', value: 'live' },
          { title: 'Compilation', value: 'compilation' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover Art',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'spotifyId',
      title: 'Spotify Album/Track ID',
      type: 'string',
      description: 'The ID from the Spotify URL (e.g., 4aawyAB9vmqN3uQ7FjRGTy)',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Music URL',
      type: 'url',
    }),
    defineField({
      name: 'bandcampUrl',
      title: 'Bandcamp URL',
      type: 'url',
    }),
    defineField({
      name: 'soundcloudUrl',
      title: 'SoundCloud URL',
      type: 'url',
    }),
    defineField({
      name: 'tracks',
      title: 'Track List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'track',
          fields: [
            { name: 'title', type: 'string', title: 'Track Title' },
            { name: 'duration', type: 'string', title: 'Duration', description: 'e.g., 3:45' },
            { name: 'spotifyTrackId', type: 'string', title: 'Spotify Track ID' },
            { name: 'featured', type: 'boolean', title: 'Featured Track', initialValue: false },
          ],
          preview: {
            select: { title: 'title', duration: 'duration' },
            prepare({ title, duration }) {
              return { title, subtitle: duration }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'text',
      rows: 6,
      description: 'Production credits, musicians, etc.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Release',
      type: 'boolean',
      initialValue: false,
      description: 'Show this release prominently on the homepage',
    }),
  ],
  orderings: [
    {
      title: 'Release Date (Newest)',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      releaseType: 'releaseType',
      releaseDate: 'releaseDate',
      media: 'coverArt',
    },
    prepare({ title, releaseType, releaseDate, media }) {
      const year = releaseDate ? new Date(releaseDate).getFullYear() : ''
      const type = releaseType ? releaseType.toUpperCase() : ''
      return {
        title,
        subtitle: `${type} • ${year}`,
        media,
      }
    },
  },
})
