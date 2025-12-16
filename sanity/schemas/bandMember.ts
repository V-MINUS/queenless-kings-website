import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bandMember',
  title: 'Band Member',
  type: 'document',
  icon: () => '🎸',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'role',
      title: 'Role / Instrument',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., Lead Vocals, Guitar, Drums',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'website', type: 'url', title: 'Personal Website' },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active Member',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      media: 'photo',
      active: 'active',
    },
    prepare({ title, role, media, active }) {
      return {
        title: active ? title : `${title} (Former)`,
        subtitle: role,
        media,
      }
    },
  },
})
