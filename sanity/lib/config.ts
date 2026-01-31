import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
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
  'uiStrings'
]

// Custom structure for singleton documents (excluding i18n types that need multiple docs per language)
const singletonTypes = ['networkPage', 'realEstatePage', 'strategyPage']

// Types that should show as lists in the structure (for i18n management)
const i18nListTypes = ['siteSettings', 'contactPage', 'membershipsPage', 'consultingPage', 'solutionsPage', 'uiStrings']

const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (i18n list)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.documentTypeList('siteSettings')
            .title('Site Settings (All Languages)')
        ),
      // Solutions Page (i18n list)
      S.listItem()
        .title('Solutions Page')
        .id('solutionsPage')
        .child(
          S.documentTypeList('solutionsPage')
            .title('Solutions Page (All Languages)')
        ),
      S.divider(),
      // Service Pages (Singletons - using serviceLandingPage type)
      S.listItem()
        .title('Service Pages')
        .id('servicePages')
        .child(
          S.documentTypeList('serviceLandingPage')
            .title('Service Pages (All Languages)')
        ),
      S.divider(),
      // Other Pages (i18n lists)
      S.listItem()
        .title('Memberships Page')
        .id('membershipsPage')
        .child(
          S.documentTypeList('membershipsPage')
            .title('Memberships Page (All Languages)')
        ),
      S.listItem()
        .title('Consulting Page')
        .id('consultingPage')
        .child(
          S.documentTypeList('consultingPage')
            .title('Consulting Page (All Languages)')
        ),
      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(
          S.documentTypeList('contactPage')
            .title('Contact Page (All Languages)')
        ),
      S.divider(),
      // UI Strings (i18n list)
      S.listItem()
        .title('UI Strings')
        .id('uiStrings')
        .child(
          S.documentTypeList('uiStrings')
            .title('UI Strings (All Languages)')
        ),
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
      documentInternationalization({
        supportedLanguages,
        schemaTypes: i18nSchemaTypes,
      }),
    ],
    schema: {
      types: schemaTypes,
      // Filter out singleton types and i18n management types from the global "New document" menu
      templates: (templates) =>
        templates.filter(({ schemaType }) =>
          !singletonTypes.includes(schemaType) && !i18nListTypes.includes(schemaType)
        ),
    },
    document: {
      // For singleton types, prevent deleting existing ones
      // Note: we allow 'create' generally but filter it from the menu above
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

