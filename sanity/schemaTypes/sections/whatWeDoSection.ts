import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
    name: 'whatWeDoSection',
    title: 'What We Do Section',
    type: 'object',
    fields: [
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            initialValue: 'Our Solutions',
        }),
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            initialValue: 'What We Do',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [defineArrayMember({ type: 'serviceCard' })],
        }),
        defineField({
            name: 'showViewAllButton',
            title: 'Show "View All" Button?',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'viewAllButtonText',
            title: 'View All Button Text',
            type: 'string',
            initialValue: 'View All Solutions',
            hidden: ({ parent }) => !parent?.showViewAllButton,
        }),
        defineField({
            name: 'viewAllButtonHref',
            title: 'View All Button URL',
            type: 'string',
            initialValue: '/solutions',
            hidden: ({ parent }) => !parent?.showViewAllButton,
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: 'What We Do Section',
                subtitle: title,
            }
        },
    },
})
