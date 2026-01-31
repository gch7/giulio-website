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
        // Navigation Group (Localizable)
        defineField({
            name: 'siteName',
            title: 'Display Site Name',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),
        defineField({
            name: 'logoText',
            title: 'Logo Text (if no image)',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),
        // For complex arrays like navItems, we can either use document-level i18n
        // Or we keep it as a regular array but its elements have translated fields.
        // Given we are still in document-level for SiteSettings (as per sidebar), 
        // but the goal was to "Optimize". 
        // If SiteSettings is still a list in sidebar, we keep it as is but cleaned up.

        // Wait, I put siteSettings in i18nListTypes in config.ts. 
        // That means it STILL uses translated documents.
        // The optimization is that GLOBAL fields are now in Brand Identity.

        defineField({
            name: 'navItems',
            title: 'Navigation Menu Items',
            type: 'array',
            group: 'navigation',
            of: [defineArrayMember({ type: 'navItem' })],
        }),
        defineField({
            name: 'navCTA',
            title: 'Navigation CTA Button',
            type: 'ctaButton',
            group: 'navigation',
        }),

        // Mobile Menu
        defineField({
            name: 'mobileFooterText',
            title: 'Mobile Footer Text',
            type: 'text',
            group: 'mobile',
        }),

        // Footer
        defineField({
            name: 'footerDescription',
            title: 'Footer Description',
            type: 'text',
            group: 'footer',
        }),
        defineField({
            name: 'footerColumns',
            title: 'Footer Link Columns',
            type: 'array',
            group: 'footer',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Column Title', type: 'string' }),
                        defineField({
                            name: 'links',
                            title: 'Links',
                            type: 'array',
                            of: [defineArrayMember({ type: 'link' })],
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright Text',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'disclaimer',
            title: 'Footer Disclaimer',
            type: 'text',
            group: 'footer',
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
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Localizable Site Settings',
            }
        },
    },
})
