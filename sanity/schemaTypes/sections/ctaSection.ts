import { defineType, defineField } from 'sanity'

export default defineType({
    // Keep internal name for backward compat with existing data
    name: 'testimonialCTASection',
    title: 'CTA Section', // Display name updated for clarity
    type: 'object',
    fields: [
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            initialValue: 'Trusted by institutional investors',
        }),
        defineField({
            name: 'titleLine1',
            title: 'Title Line 1',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'Ready to Gain an Edge',
        }),
        defineField({
            name: 'titleLine2',
            title: 'Title Line 2 (Muted)',
            type: 'string',
            initialValue: "in Today's Markets?",
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
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
    ],
    preview: {
        select: {
            title: 'titleLine1',
            subtitle: 'titleLine2',
        },
        prepare({ title, subtitle }) {
            return {
                title: 'CTA Section',
                subtitle: `${title} ${subtitle || ''}`,
            }
        },
    },
})
