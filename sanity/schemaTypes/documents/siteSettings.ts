import { defineType, defineField, defineArrayMember } from 'sanity'
import { Settings } from 'lucide-react'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    icon: Settings,
    groups: [
        { name: 'navigation', title: 'Navigation' },
        { name: 'mobile', title: 'Mobile Menu' },
        { name: 'footer', title: 'Footer' },
        { name: 'seo', title: 'SEO & Meta' },
    ],
    fields: [
        // Navigation Group
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            group: 'navigation',
            initialValue: 'Gamma Capital',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            group: 'navigation',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Important for accessibility and SEO',
                    validation: (Rule) => Rule.custom((alt, context) => {
                        // @ts-expect-error - parent access
                        if (context?.parent?.asset && !alt) {
                            return 'Alt text is recommended for accessibility'
                        }
                        return true
                    }).warning(),
                }),
            ],
        }),
        defineField({
            name: 'logoText',
            title: 'Logo Text (if no image)',
            type: 'string',
            group: 'navigation',
            initialValue: 'Γ',
        }),
        defineField({
            name: 'navItems',
            title: 'Navigation Menu Items',
            type: 'array',
            group: 'navigation',
            of: [defineArrayMember({ type: 'navItem' })],
            description: 'Main navigation links. Recommended: 4-6 items for best UX.',
            validation: (Rule) => Rule.max(8).warning('Too many nav items may overwhelm users'),
        }),
        defineField({
            name: 'navCTA',
            title: 'Navigation CTA Button',
            type: 'ctaButton',
            group: 'navigation',
        }),

        // Mobile Menu Group
        defineField({
            name: 'mobileSecondaryLinks',
            title: 'Mobile Secondary Links',
            type: 'array',
            group: 'mobile',
            of: [defineArrayMember({ type: 'link' })],
            description: 'Links displayed in the grid at the bottom of the mobile menu',
        }),
        defineField({
            name: 'mobileFooterText',
            title: 'Mobile Footer Text',
            type: 'text',
            group: 'mobile',
            rows: 2,
            description: 'Text displayed at the very bottom of the mobile menu',
        }),

        // Footer Group
        defineField({
            name: 'footerDescription',
            title: 'Footer Description',
            type: 'text',
            group: 'footer',
            rows: 2,
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            group: 'footer',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'iconName',
                            title: 'Social Icon',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Twitter/X', value: 'twitter' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Discord', value: 'discord' },
                                    { title: 'Email', value: 'email' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'GitHub', value: 'github' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'string',
                            validation: (Rule) => Rule.custom((value, context) => {
                                if (!value) return true
                                // @ts-expect-error - parent access
                                const platform = context?.parent?.platform
                                if (platform === 'email') {
                                    return value.includes('@') || 'Please enter a valid email address'
                                }
                                if (value.startsWith('http://') || value.startsWith('https://')) {
                                    return true
                                }
                                return 'URL must start with http:// or https://'
                            }),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                            subtitle: 'url',
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'footerColumns',
            title: 'Footer Link Columns',
            type: 'array',
            group: 'footer',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Column Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'links',
                            title: 'Links',
                            type: 'array',
                            of: [defineArrayMember({ type: 'link' })],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            links: 'links',
                        },
                        prepare({ title, links }) {
                            return {
                                title,
                                subtitle: `${links?.length || 0} links`,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
            group: 'footer',
            initialValue: '© 2024 Gamma Capital. All rights reserved.',
        }),
        defineField({
            name: 'disclaimer',
            title: 'Footer Disclaimer',
            type: 'text',
            group: 'footer',
            rows: 3,
        }),
        defineField({
            name: 'connectColumnTitle',
            title: 'Connect Column Title',
            type: 'string',
            group: 'footer',
            initialValue: 'Connect',
        }),

        // SEO Group
        defineField({
            name: 'seoTitle',
            title: 'Default SEO Title',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Default Meta Description',
            type: 'text',
            group: 'seo',
            rows: 3,
            initialValue: 'Institutional-grade market intelligence.',
            description: 'Default description for pages without their own. Keep under 160 characters.',
            validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
        }),
        defineField({
            name: 'ogImage',
            title: 'Default OG Image',
            type: 'image',
            group: 'seo',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Describe this image for accessibility and SEO',
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings',
            }
        },
    },
})
