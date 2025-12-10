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
            validation: (Rule) => Rule.required(),
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
