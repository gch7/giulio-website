import { defineType, defineField } from 'sanity'
import { Users } from 'lucide-react'

export default defineType({
    name: 'membershipsPage',
    title: 'Memberships Page',
    type: 'document',
    icon: Users,
    groups: [
        { name: 'hero', title: 'Hero Section', default: true },
        { name: 'features', title: 'Features & Benefits' },
        { name: 'included', title: 'What\'s Included' },
        { name: 'pricing', title: 'Pricing' },
        { name: 'access', title: 'Access Steps' },
        { name: 'faq', title: 'FAQ' },
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
            initialValue: 'Premium Discord Access',
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
            name: 'heroPrimaryCta',
            title: 'Primary CTA Text',
            type: 'string',
            group: 'hero',
            initialValue: 'Join the Membership',
        }),
        defineField({
            name: 'heroSecondaryCta',
            title: 'Secondary CTA Text',
            type: 'string',
            group: 'hero',
            initialValue: 'Discover What\'s Inside',
        }),

        // Inside Features Section
        defineField({
            name: 'insideSectionTitle',
            title: 'Inside Section Title',
            type: 'string',
            group: 'features',
        }),
        defineField({
            name: 'insideSectionDescription',
            title: 'Inside Section Description',
            type: 'text',
            group: 'features',
            rows: 2,
        }),
        defineField({
            name: 'insideFeatures',
            title: 'Inside Features',
            type: 'array',
            group: 'features',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'icon',
                        title: 'Icon',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Trending Up', value: 'TrendingUp' },
                                { title: 'Eye', value: 'Eye' },
                                { title: 'Bell', value: 'Bell' },
                                { title: 'Message Square', value: 'MessageSquare' },
                                { title: 'Graduation Cap', value: 'GraduationCap' },
                            ],
                        },
                    }),
                    defineField({ name: 'text', title: 'Text', type: 'string' }),
                ],
                preview: {
                    select: { title: 'text', subtitle: 'icon' },
                },
            }],
        }),

        // Key Benefits Section
        defineField({
            name: 'benefitsSectionTitle',
            title: 'Benefits Section Title',
            type: 'string',
            group: 'features',
            initialValue: 'Key Benefits of Joining',
        }),
        defineField({
            name: 'keyBenefits',
            title: 'Key Benefits',
            type: 'array',
            group: 'features',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'icon',
                        title: 'Icon',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Target', value: 'Target' },
                                { title: 'Zap', value: 'Zap' },
                                { title: 'Users', value: 'Users' },
                                { title: 'Book Open', value: 'BookOpen' },
                                { title: 'Award', value: 'Award' },
                            ],
                        },
                    }),
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
                ],
                preview: {
                    select: { title: 'title', subtitle: 'description' },
                },
            }],
        }),

        // What's Included Section
        defineField({
            name: 'includedSectionTitle',
            title: 'Included Section Title',
            type: 'string',
            group: 'included',
            initialValue: 'What\'s Included in the Membership',
        }),
        defineField({
            name: 'includedFeatures',
            title: 'Core Features',
            type: 'array',
            group: 'included',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'educationalMiniCourseTitle',
            title: 'Educational Section Title',
            type: 'string',
            group: 'included',
            initialValue: 'Educational mini-course:',
        }),
        defineField({
            name: 'educationalItems',
            title: 'Educational Items',
            type: 'array',
            group: 'included',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'additionalIncluded',
            title: 'Additional Included Features',
            type: 'array',
            group: 'included',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'includedTagline',
            title: 'Included Section Tagline',
            type: 'string',
            group: 'included',
        }),

        // Pricing Section
        defineField({
            name: 'pricingSectionTitle',
            title: 'Pricing Section Title',
            type: 'string',
            group: 'pricing',
            initialValue: 'Membership Tiers',
        }),
        defineField({
            name: 'pricingSectionDescription',
            title: 'Pricing Section Description',
            type: 'text',
            group: 'pricing',
            rows: 2,
        }),
        defineField({
            name: 'plans',
            title: 'Membership Plans',
            type: 'array',
            group: 'pricing',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'id', title: 'Plan ID', type: 'string' }),
                    defineField({ name: 'name', title: 'Plan Name', type: 'string' }),
                    defineField({ name: 'price', title: 'Price Display', type: 'string' }),
                    defineField({ name: 'priceValue', title: 'Price Value', type: 'number' }),
                    defineField({ name: 'trial', title: 'Trial Period', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'string' }),
                    defineField({ name: 'cta', title: 'CTA Text', type: 'string' }),
                    defineField({ name: 'popular', title: 'Most Popular', type: 'boolean' }),
                    defineField({ name: 'stripePriceId', title: 'Stripe Price ID', type: 'string' }),
                ],
                preview: {
                    select: { title: 'name', subtitle: 'price' },
                },
            }],
        }),
        defineField({
            name: 'popularBadgeText',
            title: 'Popular Badge Text',
            type: 'string',
            group: 'pricing',
            initialValue: 'Most Popular',
        }),

        // Access Steps Section
        defineField({
            name: 'accessSectionTitle',
            title: 'Access Section Title',
            type: 'string',
            group: 'access',
            initialValue: 'How Access Works',
        }),
        defineField({
            name: 'accessSteps',
            title: 'Access Steps',
            type: 'array',
            group: 'access',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'step', title: 'Step Number', type: 'number' }),
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'string' }),
                ],
                preview: {
                    select: { title: 'title', step: 'step' },
                    prepare({ title, step }) {
                        return { title: `${step}. ${title}` }
                    },
                },
            }],
        }),
        defineField({
            name: 'accessTagline',
            title: 'Access Section Tagline',
            type: 'string',
            group: 'access',
            initialValue: 'No friction, no manual steps, no waiting.',
        }),

        // FAQ Section
        defineField({
            name: 'faqSectionTitle',
            title: 'FAQ Section Title',
            type: 'string',
            group: 'faq',
            initialValue: 'Frequently Asked Questions',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQ Items',
            type: 'array',
            group: 'faq',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'question', title: 'Question', type: 'string' }),
                    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
                ],
                preview: {
                    select: { title: 'question' },
                },
            }],
        }),

        // Coming Soon Section
        defineField({
            name: 'comingSoonTitle',
            title: 'Coming Soon Title',
            type: 'string',
            group: 'features',
            initialValue: 'Coming Soon',
        }),
        defineField({
            name: 'comingSoonDescription',
            title: 'Coming Soon Description',
            type: 'text',
            group: 'features',
            rows: 2,
        }),
        defineField({
            name: 'comingSoonFeatures',
            title: 'Coming Soon Features',
            type: 'array',
            group: 'features',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'comingSoonNote',
            title: 'Coming Soon Note',
            type: 'string',
            group: 'features',
        }),

        // Final CTA Section
        defineField({
            name: 'finalCtaTitle',
            title: 'Final CTA Title',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'finalCtaDescription',
            title: 'Final CTA Description',
            type: 'text',
            group: 'cta',
            rows: 2,
        }),
        defineField({
            name: 'finalCtaButton',
            title: 'Final CTA Button Text',
            type: 'string',
            group: 'cta',
            initialValue: 'Choose Your Membership Plan',
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
            return { title: 'Memberships Page' }
        },
    },
})
