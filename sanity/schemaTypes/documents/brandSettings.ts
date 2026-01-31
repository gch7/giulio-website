import { defineType, defineField } from 'sanity'
import { Palette } from 'lucide-react'

export default defineType({
    name: 'brandSettings',
    title: 'Brand Identity',
    type: 'document',
    icon: Palette,
    groups: [
        { name: 'logo', title: 'Logo & Assets' },
        { name: 'social', title: 'Social Media' },
        { name: 'contact', title: 'Global Contact' },
    ],
    fields: [
        // Brand Group
        defineField({
            name: 'siteName',
            title: 'Internal Site Name',
            type: 'string',
            description: 'Used in the CMS and admin areas',
            initialValue: 'Gamma Capital',
        }),
        defineField({
            name: 'logo',
            title: 'Global Logo',
            type: 'image',
            group: 'logo',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text (English)',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            group: 'logo',
        }),

        // Social Group
        defineField({
            name: 'socialLinks',
            title: 'Global Social Media Links',
            type: 'array',
            group: 'social',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'platform', title: 'Platform', type: 'string' }),
                        defineField({ name: 'url', title: 'URL', type: 'string' }),
                        defineField({
                            name: 'iconName',
                            title: 'Icon Key',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Twitter/X', value: 'twitter' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'Email', value: 'email' },
                                ],
                            },
                        }),
                    ],
                },
            ],
        }),

        // Contact Group
        defineField({
            name: 'contactEmail',
            title: 'Master Contact Email',
            type: 'string',
            group: 'contact',
            description: 'Used across all footer versions unless overridden',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Global Brand Settings',
                subtitle: 'Shared across all languages',
            }
        },
    },
})
