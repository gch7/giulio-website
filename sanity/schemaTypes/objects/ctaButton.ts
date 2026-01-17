import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'ctaButton',
    title: 'CTA Button',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Button Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'href',
            title: 'URL',
            type: 'string',
            description: 'Use /page-name for internal links or https://... for external links',
            validation: (Rule) => [
                Rule.required(),
                Rule.custom((value) => {
                    if (!value) return true
                    if (value.startsWith('/') || value.startsWith('http') || value.startsWith('mailto:') || value.startsWith('tel:')) {
                        return true
                    }
                    return 'URL must start with / (internal) or http/https (external) or mailto:/tel:'
                }),
            ],
        }),
        defineField({
            name: 'variant',
            title: 'Style Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary (Dark)', value: 'primary' },
                    { title: 'Secondary (Outline)', value: 'secondary' },
                    { title: 'Ghost (Transparent)', value: 'ghost' },
                ],
            },
            initialValue: 'primary',
        }),
        defineField({
            name: 'showArrow',
            title: 'Show Arrow Icon?',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'href',
        },
    },
})
