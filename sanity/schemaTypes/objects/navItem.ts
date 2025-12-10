import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'navItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Menu Text',
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
            name: 'hasDropdown',
            title: 'Has Dropdown Menu?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'dropdownItems',
            title: 'Dropdown Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'text',
                            title: 'Text',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                        }),
                        defineField({
                            name: 'href',
                            title: 'URL',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'text',
                            subtitle: 'href',
                        },
                    },
                },
            ],
            hidden: ({ parent }) => !parent?.hasDropdown,
        }),
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'href',
        },
    },
})
