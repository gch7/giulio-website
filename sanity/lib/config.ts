import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { schemaTypes } from '../schemaTypes'

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
]

// Types that behave like singletons (protect from deletion/duplication)
const singletonTypes = ['brandSettings', 'uiStrings', 'siteSettings', 'contactPage', 'membershipsPage', 'consultingPage', 'solutionsPage']

// All types that are managed via the custom sidebar lists (to hide from global "+" menu)
const i18nListTypes = ['page', 'siteSettings', 'contactPage', 'membershipsPage', 'consultingPage', 'solutionsPage', 'serviceLandingPage']

const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Global Brand & System
      S.listItem()
        .title('Brand Identity')
        .id('brandSettings')
        .icon(() => '🎨')
        .child(S.document().schemaType('brandSettings').documentId('brandSettings').title('Brand Identity')),
      S.listItem()
        .title('UI Strings')
        .id('uiStrings')
        .icon(() => '🔤')
        .child(S.document().schemaType('uiStrings').documentId('uiStrings').title('UI Strings Export')),
      S.divider(),

      // Branding & Settings (Localizable)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.documentTypeList('siteSettings').title('Site Settings (All Languages)')),
      S.divider(),

      // Core Pages
      S.listItem()
        .title('Solutions Page')
        .id('solutionsPage')
        .child(S.documentTypeList('solutionsPage').title('Solutions Page (All Languages)')),
      S.listItem()
        .title('Service Pages')
        .id('servicePages')
        .child(S.documentTypeList('serviceLandingPage').title('Service Pages (All Languages)')),
      S.listItem()
        .title('Memberships Page')
        .id('membershipsPage')
        .child(S.documentTypeList('membershipsPage').title('Memberships Page (All Languages)')),
      S.listItem()
        .title('Consulting Page')
        .id('consultingPage')
        .child(S.documentTypeList('consultingPage').title('Consulting Page (All Languages)')),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(S.documentTypeList('contactPage').title('Contact Page (All Languages)')),
      S.divider(),

      // Custom Pages
      S.listItem()
        .title('Custom Pages')
        .id('customPages')
        .child(S.documentTypeList('page').title('Custom Pages (All Languages)')),
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
      documentInternationalization({
        supportedLanguages,
        schemaTypes: i18nSchemaTypes,
      }),
      internationalizedArray({
        languages: supportedLanguages,
        defaultLanguages: ['en'],
        fieldTypes: ['string', 'text'],
      }),
    ],
    schema: {
      types: schemaTypes,
      // Filter out manage-only types from the global "New document" menu
      templates: (templates) =>
        templates.filter(({ schemaType }) =>
          !i18nListTypes.includes(schemaType) && schemaType !== 'brandSettings' && schemaType !== 'uiStrings'
        ),
    },
    document: {
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
