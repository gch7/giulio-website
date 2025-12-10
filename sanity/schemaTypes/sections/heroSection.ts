import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            initialValue: 'Institutional Intelligence',
        }),
        defineField({
            name: 'titleLine1',
            title: 'Title Line 1',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'Market Intelligence for',
        }),
        defineField({
            name: 'titleLine2',
            title: 'Title Line 2 (Highlighted)',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'Sophisticated Investors',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'primaryCTA',
            title: 'Primary CTA Button',
            type: 'ctaButton',
        }),
        defineField({
            name: 'secondaryCTA',
            title: 'Secondary CTA Button',
            type: 'ctaButton',
        }),
        defineField({
            name: 'featureCards',
            title: 'Feature Cards',
            type: 'array',
            of: [defineArrayMember({ type: 'serviceCard' })],
            validation: (Rule) => Rule.max(3),
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [defineArrayMember({ type: 'stat' })],
            validation: (Rule) => Rule.max(4),
        }),
    ],
    preview: {
        select: {
            title: 'titleLine1',
            subtitle: 'titleLine2',
        },
        prepare({ title, subtitle }) {
            return {
                title: 'Hero Section',
                subtitle: `${title} ${subtitle}`,
            }
        },
    },
})
