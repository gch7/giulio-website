import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './schemaTypes'

// Supported languages for internationalization
const supportedLanguages = [
  { id: 'en', title: 'English' },
  { id: 'it', title: 'Italiano' }
]

// Document types that support internationalization
const i18nSchemaTypes = [
  'page',
  'siteSettings',
  'contactPage',
  'membershipsPage',
  'consultingPage',
  'solutionsPage',
  'serviceLandingPage',
  'uiStrings'
]

// Custom structure for singleton documents
const singletonTypes = ['siteSettings', 'contactPage', 'membershipsPage', 'consultingPage', 'solutionsPage', 'networkPage', 'realEstatePage', 'strategyPage', 'uiStrings']

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
      // Solutions Page
      S.listItem()
        .title('Solutions Page')
        .id('solutionsPage')
        .child(
          S.document()
            .schemaType('solutionsPage')
            .documentId('solutionsPage')
            .title('Solutions Page')
        ),
      S.divider(),
      // Service Pages (Singletons)
      S.listItem()
        .title('Network Page')
        .id('networkPage')
        .child(
          S.document()
            .schemaType('serviceLandingPage')
            .documentId('networkPage')
            .title('Network Page')
        ),
      S.listItem()
        .title('Real Estate Page')
        .id('realEstatePage')
        .child(
          S.document()
            .schemaType('serviceLandingPage')
            .documentId('realEstatePage')
            .title('Real Estate Page')
        ),
      S.listItem()
        .title('Strategy Page')
        .id('strategyPage')
        .child(
          S.document()
            .schemaType('serviceLandingPage')
            .documentId('strategyPage')
            .title('Strategy Page')
        ),
      S.divider(),
      // Other Pages (Singletons)
      S.listItem()
        .title('Memberships Page')
        .id('membershipsPage')
        .child(
          S.document()
            .schemaType('membershipsPage')
            .documentId('membershipsPage')
            .title('Memberships Page')
        ),
      S.listItem()
        .title('Consulting Page')
        .id('consultingPage')
        .child(
          S.document()
            .schemaType('consultingPage')
            .documentId('consultingPage')
            .title('Consulting Page')
        ),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(
          S.documentTypeList('contactPage')
            .title('Contact Page (All Languages)')
        ),
      S.divider(),
      // UI Strings
      S.listItem()
        .title('UI Strings')
        .id('uiStrings')
        .child(
          S.document()
            .schemaType('uiStrings')
            .documentId('uiStrings')
            .title('UI Strings')
        ),
      // Pages
      S.documentTypeListItem('page').title('Pages'),
    ])

export default defineConfig({
  name: 'default',
  title: 'Gamma Capital CMS',

  projectId: 'rm9kkope',
  dataset: 'production',
  basePath: '/admin',

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        preview: '/',
        previewMode: {
          enable: '/api/draft' + (process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET
            ? `?secret=${process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET}`
            : ''),
        },
      },
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: i18nSchemaTypes,
    }),
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
