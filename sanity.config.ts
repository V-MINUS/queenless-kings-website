import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'queen-less-kings',
  title: 'Queen Less Kings CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Content types
            S.documentTypeListItem('event').title('Events').icon(() => '📅'),
            S.documentTypeListItem('release').title('Music Releases').icon(() => '💿'),
            S.documentTypeListItem('galleryItem').title('Gallery').icon(() => '🖼️'),
            S.documentTypeListItem('bandMember').title('Band Members').icon(() => '🎸'),
            S.divider(),
            // Newsletter
            S.documentTypeListItem('subscriber').title('Subscribers').icon(() => '📧'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
