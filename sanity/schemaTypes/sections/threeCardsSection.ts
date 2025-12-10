import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'threeCardsSection',
    title: 'Three Cards Section',
    type: 'object',
    fields: [
        defineField({
            name: 'cards',
            title: 'Cards',
            type: 'array',
            of: [defineArrayMember({ type: 'serviceCard' })],
            validation: (Rule) => Rule.max(3).min(1),
        }),
    ],
    preview: {
        select: {
            cards: 'cards',
        },
        prepare({ cards }) {
            return {
                title: 'Three Cards Section',
                subtitle: `${cards?.length || 0} cards`,
            }
        },
    },
})
