import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'serviceCard',
    title: 'Service Card',
    type: 'object',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Lucide icon name (e.g., "BarChart3", "Users", "Building2")',
            options: {
                list: [
                    { title: 'BarChart3 (Market)', value: 'BarChart3' },
                    { title: 'Users (People)', value: 'Users' },
                    { title: 'Building2 (Real Estate)', value: 'Building2' },
                    { title: 'Network (Connections)', value: 'Network' },
                    { title: 'Rocket (Launch)', value: 'Rocket' },
                    { title: 'Discord', value: 'Discord' },
                ],
            },
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'href',
            title: 'Link URL',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'linkText',
            title: 'Link Text',
            type: 'string',
            initialValue: 'Learn more',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})
