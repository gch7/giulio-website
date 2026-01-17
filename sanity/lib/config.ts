import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from '../schemaTypes'

// Custom structure for singleton documents
const singletonTypes = ['siteSettings']

const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings singleton
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.divider(),
      // Pages
      S.documentTypeListItem('page').title('Pages'),
    ])

export const createSanityConfig = (options?: {
  origin?: string
}) => {
  const origin = options?.origin || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  
  return defineConfig({
    name: 'default',
    title: 'Gamma Capital CMS',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rm9kkope',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/admin',
    plugins: [
      structureTool({ structure }),
      presentationTool({
        previewUrl: {
          origin,
          preview: '/',
          previewMode: {
            enable: '/api/draft',
          },
        },
      }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
      // Filter out singleton types from the global "New document" menu
      templates: (templates) =>
        templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
    },
    document: {
      // For singleton types, prevent creating new documents and deleting existing ones
      actions: (prev, context) => {
        if (singletonTypes.includes(context.schemaType)) {
          return prev.filter(
            (action) => action.action !== 'delete' && action.action !== 'duplicate'
          )
        }
        return prev
      },
    },
  })
}
