import { defineField, defineType } from 'sanity'
import { Briefcase, Users, Calendar, Check } from 'lucide-react'

export default defineType({
    name: 'serviceLandingPage',
    title: 'Service Landing Page',
    type: 'document',
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero Section' },
        { name: 'services', title: 'Services Grid' },
        { name: 'cta', title: 'Call to Action' },
    ],
    fields: [
        // SEO
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            group: 'seo',
        }),

        // Hero
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle (highlighted)',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            group: 'hero',
        }),
        defineField({
            name: 'heroCtaText',
            title: 'Hero CTA Text',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroCtaLink',
            title: 'Hero CTA Link',
            type: 'string',
            group: 'hero',
        }),

        defineField({
            name: 'layout',
            title: 'Layout Style',
            type: 'string',
            group: 'services',
            options: {
                list: [
                    { title: 'Grid (Default)', value: 'grid' },
                    { title: 'List (Detailed)', value: 'list' },
                ],
                layout: 'radio',
            },
            initialValue: 'grid',
        }),

        // Services Grid
        defineField({
            name: 'services',
            title: 'Services Cards',
            type: 'array',
            group: 'services',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'e.g. Briefcase, Users, Calendar',
                            options: {
                                list: [
                                    { title: 'Briefcase', value: 'Briefcase' },
                                    { title: 'Users', value: 'Users' },
                                    { title: 'Calendar', value: 'Calendar' },
                                    { title: 'Check', value: 'Check' },
                                    { title: 'Network', value: 'Network' },
                                    { title: 'Building', value: 'Building2' },
                                    { title: 'Bar Chart', value: 'BarChart3' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'features',
                            title: 'Features List',
                            type: 'array',
                            of: [{ type: 'string' }],
                        }),
                        defineField({
                            name: 'linkUrl',
                            title: 'Link URL',
                            type: 'string',
                        }),
                        defineField({
                            name: 'linkText',
                            title: 'Link Text',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),

        // CTA
        defineField({
            name: 'ctaTitle',
            title: 'CTA Title',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaDescription',
            title: 'CTA Description',
            type: 'text',
            group: 'cta',
        }),
        defineField({
            name: 'primaryCtaText',
            title: 'Primary Button Text',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'primaryCtaLink',
            title: 'Primary Button Link',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'secondaryCtaText',
            title: 'Secondary Button Text',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'secondaryCtaLink',
            title: 'Secondary Button Link',
            type: 'string',
            group: 'cta',
        }),
    ],
})
