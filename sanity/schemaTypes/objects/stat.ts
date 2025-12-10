import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'stat',
    title: 'Statistic',
    type: 'object',
    fields: [
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'e.g., "500+", "$2.1B", "94%"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'e.g., "Active Members", "AUM Advised"',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'value',
            subtitle: 'label',
        },
    },
})
