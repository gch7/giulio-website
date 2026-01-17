'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

// Inline schema types to avoid importing from external folder
const page = {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    ],
}

const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        { name: 'siteName', title: 'Site Name', type: 'string' },
    ],
}

const singletonTypes = ['siteSettings']

const structure = (S: any) =>
    S.list()
        .title('Content')
        .items([
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
            S.documentTypeListItem('page').title('Pages'),
        ])

const config = defineConfig({
    name: 'default',
    title: 'Gamma Capital CMS',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rm9kkope',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/admin',
    plugins: [
        structureTool({ structure }),
        presentationTool({
            previewUrl: {
                origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
                preview: '/',
                previewMode: {
                    enable: '/api/draft',
                },
            },
        }),
        visionTool(),
    ],
    schema: {
        types: [page, siteSettings],
        templates: (templates) =>
            templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
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

export function Studio() {
    return <NextStudio config={config} />
}
