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
            description: 'Choose an icon from the list. Icons are from the Lucide library.',
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
            description: 'Where this card links to. Use /page-name for internal links.',
            validation: (Rule) => [
                Rule.required(),
                Rule.custom((value) => {
                    if (!value) return true
                    if (value.startsWith('/') || value.startsWith('http') || value.startsWith('mailto:')) {
                        return true
                    }
                    return 'URL must start with / (internal) or http/https (external)'
                }),
            ],
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
