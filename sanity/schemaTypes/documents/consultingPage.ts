import { defineType, defineField } from 'sanity'
import { Briefcase } from 'lucide-react'

export default defineType({
    name: 'consultingPage',
    title: 'Consulting Page',
    type: 'document',
    icon: Briefcase,
    groups: [
        { name: 'hero', title: 'Hero Section', default: true },
        { name: 'services', title: 'Service Sections' },
        { name: 'cta', title: 'Final CTA' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        // Hero Section
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge',
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
            title: 'Hero Subtitle',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            group: 'hero',
            rows: 3,
        }),
        defineField({
            name: 'heroStats',
            title: 'Hero Stats',
            type: 'array',
            group: 'hero',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string' }),
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                ],
                preview: {
                    select: { title: 'value', subtitle: 'label' },
                },
            }],
        }),

        // Service Navigation
        defineField({
            name: 'serviceNavItems',
            title: 'Service Navigation Items',
            type: 'array',
            group: 'services',
            description: 'Sidebar navigation tabs for service sections',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'id', title: 'Section ID', type: 'string' }),
                    defineField({ name: 'title', title: 'Tab Title', type: 'string' }),
                    defineField({
                        name: 'icon',
                        title: 'Icon',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Briefcase', value: 'Briefcase' },
                                { title: 'Bar Chart', value: 'BarChart3' },
                                { title: 'Layers', value: 'Layers' },
                                { title: 'Shield', value: 'Shield' },
                                { title: 'Building', value: 'Building2' },
                                { title: 'Bitcoin', value: 'Bitcoin' },
                            ],
                        },
                    }),
                ],
                preview: {
                    select: { title: 'title', subtitle: 'id' },
                },
            }],
        }),
        defineField({
            name: 'serviceNavTitle',
            title: 'Service Navigation Title',
            type: 'string',
            group: 'services',
            initialValue: 'Our Advisory Services',
        }),
        defineField({
            name: 'serviceNavSubtitle',
            title: 'Service Navigation Subtitle',
            type: 'string',
            group: 'services',
            initialValue: 'Click to explore each service in detail',
        }),

        // Service Sections
        defineField({
            name: 'serviceSections',
            title: 'Service Sections',
            type: 'array',
            group: 'services',
            description: 'Full content sections for each service',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'id', title: 'Section ID', type: 'string', description: 'Must match navigation item ID' }),
                    defineField({
                        name: 'icon',
                        title: 'Icon',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Briefcase', value: 'Briefcase' },
                                { title: 'Bar Chart', value: 'BarChart3' },
                                { title: 'Layers', value: 'Layers' },
                                { title: 'Shield', value: 'Shield' },
                                { title: 'Building', value: 'Building2' },
                                { title: 'Bitcoin', value: 'Bitcoin' },
                            ],
                        },
                    }),
                    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
                    defineField({
                        name: 'description',
                        title: 'Description Paragraphs',
                        type: 'array',
                        of: [{ type: 'text', rows: 3 }],
                    }),
                    defineField({ name: 'highlight', title: 'Highlight Text', type: 'string' }),
                    defineField({
                        name: 'iconGradient',
                        title: 'Icon Gradient Class',
                        type: 'string',
                        initialValue: 'from-[#2563EB] to-[#1E3A8A]',
                    }),
                    defineField({
                        name: 'shadowColor',
                        title: 'Shadow Color Class',
                        type: 'string',
                        initialValue: '[#2563EB]/20',
                    }),
                    defineField({
                        name: 'features',
                        title: 'Feature Cards',
                        type: 'array',
                        of: [{
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'icon',
                                    title: 'Icon',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Bar Chart', value: 'BarChart3' },
                                            { title: 'Target', value: 'Target' },
                                            { title: 'Trending Up', value: 'TrendingUp' },
                                            { title: 'Shield', value: 'Shield' },
                                            { title: 'Layers', value: 'Layers' },
                                            { title: 'Users', value: 'Users' },
                                            { title: 'Map', value: 'Map' },
                                            { title: 'Building', value: 'Building2' },
                                            { title: 'Calculator', value: 'Calculator' },
                                            { title: 'Dumbbell', value: 'Dumbbell' },
                                        ],
                                    },
                                }),
                                defineField({ name: 'title', title: 'Title', type: 'string' }),
                                defineField({ name: 'desc', title: 'Description', type: 'string' }),
                            ],
                            preview: {
                                select: { title: 'title', subtitle: 'desc' },
                            },
                        }],
                    }),
                ],
                preview: {
                    select: { title: 'title', subtitle: 'id' },
                },
            }],
        }),

        // Final CTA Section
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
            rows: 2,
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaButtonHref',
            title: 'CTA Button Link',
            type: 'string',
            group: 'cta',
            initialValue: '/contact',
        }),

        // SEO Fields
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Description',
            type: 'text',
            group: 'seo',
            rows: 3,
            validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Consulting Page' }
        },
    },
})
