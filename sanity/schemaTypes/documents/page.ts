import { defineType, defineField, defineArrayMember } from 'sanity'
import { FileText } from 'lucide-react'

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: FileText,
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input) => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .slice(0, 96),
                isUnique: async (slug, context) => {
                    const { document, getClient } = context
                    const client = getClient({ apiVersion: '2024-01-01' })
                    const id = document?._id?.replace('drafts.', '')
                    const result = await client.fetch(
                        `count(*[_type == "page" && slug.current == $slug && _id != $id && !(_id in path("drafts.**"))])`,
                        { slug, id }
                    )
                    return result === 0
                },
            },
            validation: (Rule) => [
                Rule.required(),
                Rule.custom((slug) => {
                    if (!slug?.current) return true
                    const valid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
                    return valid || 'Slug must be lowercase letters, numbers, and hyphens only'
                }),
            ],
        }),
        defineField({
            name: 'isHomepage',
            title: 'Is Homepage?',
            type: 'boolean',
            group: 'content',
            description: '⚠️ Only ONE page should be marked as homepage. Setting this will make this page display at the root URL (/).',
            initialValue: false,
            validation: (Rule) =>
                Rule.custom(async (value, context) => {
                    if (!value) return true
                    const { document, getClient } = context
                    const client = getClient({ apiVersion: '2024-01-01' })
                    const currentId = document?._id?.replace('drafts.', '')
                    const existingHomepage = await client.fetch(
                        `*[_type == "page" && isHomepage == true && _id != $id && !(_id in path("drafts.**"))][0]._id`,
                        { id: currentId }
                    )
                    if (existingHomepage) {
                        return 'Another page is already set as homepage. Please uncheck that page first.'
                    }
                    return true
                }),
        }),
        defineField({
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            group: 'content',
            of: [
                defineArrayMember({ type: 'heroSection', title: 'Hero Section' }),
                defineArrayMember({ type: 'whatWeDoSection', title: 'What We Do' }),
                defineArrayMember({ type: 'testimonialCTASection', title: 'CTA Section' }),
                defineArrayMember({ type: 'threeCardsSection', title: 'Three Cards' }),
                defineArrayMember({ type: 'richTextSection', title: 'Rich Text' }),
                defineArrayMember({ type: 'multiAssetSection', title: 'Multi-Asset Section' }),
                defineArrayMember({ type: 'whyGammaSection', title: 'Why Gamma Section' }),
            ],
        }),

        // SEO Fields
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
            description: 'Override the default title for search engines',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Description',
            type: 'text',
            group: 'seo',
            rows: 3,
            description: 'Description for search engines. Keep under 160 characters for best results.',
            validation: (Rule) => [
                Rule.max(160).warning('Keep under 160 characters for best SEO'),
                Rule.min(50).warning('Add more description for better SEO (at least 50 chars)'),
            ],
        }),
        defineField({
            name: 'noIndex',
            title: 'Hide from Search Engines?',
            type: 'boolean',
            group: 'seo',
            description: 'Enable this to add a noindex meta tag, preventing search engines from indexing this page.',
            initialValue: false,
        }),
        defineField({
            name: 'ogImage',
            title: 'Social Share Image',
            type: 'image',
            group: 'seo',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Describe this image for accessibility and SEO',
                    validation: (Rule) => Rule.custom((alt, context) => {
                        // @ts-expect-error - parent access
                        if (context?.parent?.asset && !alt) {
                            return 'Alt text is recommended for social share images'
                        }
                        return true
                    }).warning(),
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current',
            isHomepage: 'isHomepage',
        },
        prepare({ title, slug, isHomepage }) {
            return {
                title: isHomepage ? `🏠 ${title}` : title,
                subtitle: isHomepage ? 'Homepage' : `/${slug}`,
            }
        },
    },
})
