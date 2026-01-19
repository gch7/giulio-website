import { defineField, defineType } from 'sanity'
import { TrendingUp, BarChart3, Users, Building2, Network, Shield } from 'lucide-react'

export default defineType({
    name: 'solutionsPage',
    title: 'Solutions Page',
    type: 'document',
    icon: TrendingUp,
    groups: [
        { name: 'seo', title: 'SEO' },
        { name: 'hero', title: 'Hero Section' },
        { name: 'solutions', title: 'Solutions List' },
        { name: 'cta', title: 'Call to Action' },
    ],
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
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
            initialValue: 'Our Solutions',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            group: 'hero',
            initialValue: 'Comprehensive Investment Solutions',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle (highlighted)',
            type: 'string',
            group: 'hero',
            initialValue: 'Investment Solutions',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            group: 'hero',
            initialValue: 'From market intelligence to personalized consulting, we provide the tools and insights you need to succeed in today\'s markets.',
        }),

        // Solutions List
        defineField({
            name: 'solutions',
            title: 'Solutions Cards',
            type: 'array',
            group: 'solutions',
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
                            description: 'e.g. BarChart3, Users, Building2, Network',
                            options: {
                                list: [
                                    { title: 'Bar Chart', value: 'BarChart3' },
                                    { title: 'Users', value: 'Users' },
                                    { title: 'Building', value: 'Building2' },
                                    { title: 'Network', value: 'Network' },
                                    { title: 'Trending Up', value: 'TrendingUp' },
                                    { title: 'Shield', value: 'Shield' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'color',
                            title: 'Accent Color',
                            type: 'string',
                            initialValue: '#2563EB',
                        }),
                        defineField({
                            name: 'href',
                            title: 'Link URL',
                            type: 'string',
                        }),
                        defineField({
                            name: 'features',
                            title: 'Features List',
                            type: 'array',
                            of: [{ type: 'string' }],
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
            initialValue: 'Not Sure Where to Start?',
        }),
        defineField({
            name: 'ctaDescription',
            title: 'CTA Description',
            type: 'text',
            group: 'cta',
            initialValue: 'Book a free consultation call to discuss your goals and find the right solution for your investment needs.',
        }),
        defineField({
            name: 'primaryCtaText',
            title: 'Primary Button Text',
            type: 'string',
            group: 'cta',
            initialValue: 'Schedule a Call',
        }),
        defineField({
            name: 'primaryCtaLink',
            title: 'Primary Button Link',
            type: 'string',
            group: 'cta',
            initialValue: '/contact',
        }),
        defineField({
            name: 'secondaryCtaText',
            title: 'Secondary Button Text',
            type: 'string',
            group: 'cta',
            initialValue: 'View Memberships',
        }),
        defineField({
            name: 'secondaryCtaLink',
            title: 'Secondary Button Link',
            type: 'string',
            group: 'cta',
            initialValue: '/memberships',
        }),
    ],
})
