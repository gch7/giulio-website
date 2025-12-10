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
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isHomepage',
            title: 'Is Homepage?',
            type: 'boolean',
            group: 'content',
            description: 'Mark this page as the homepage (only one page should be marked)',
            initialValue: false,
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
            description: 'Description for search engines (150-160 characters recommended)',
        }),
        defineField({
            name: 'ogImage',
            title: 'Social Share Image',
            type: 'image',
            group: 'seo',
            options: {
                hotspot: true,
            },
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
