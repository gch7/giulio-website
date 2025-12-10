import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'richTextSection',
    title: 'Rich Text Section',
    type: 'object',
    description: 'A flexible content section with rich text editor',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title (optional)',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'string',
                                        title: 'URL',
                                    },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab?',
                                        initialValue: false,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            options: {
                list: [
                    { title: 'White', value: 'white' },
                    { title: 'Light Gray', value: 'gray' },
                    { title: 'Teal Accent', value: 'teal' },
                ],
            },
            initialValue: 'white',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: 'Rich Text Section',
                subtitle: title || 'No title',
            }
        },
    },
})
