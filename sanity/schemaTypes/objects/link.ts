import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'Use /page-name for internal links or https://... for external links',
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((value) => {
          if (!value) return true
          if (value.startsWith('/') || value.startsWith('http') || value.startsWith('mailto:') || value.startsWith('tel:')) {
            return true
          }
          return 'URL must start with / (internal) or http/https (external) or mailto:/tel:'
        }),
      ],
    }),
    defineField({
      name: 'isExternal',
      title: 'Open in new tab?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
