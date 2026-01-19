import { defineType, defineField } from 'sanity'
import { Mail } from 'lucide-react'

export default defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    icon: Mail,
    groups: [
        { name: 'hero', title: 'Hero Section', default: true },
        { name: 'intro', title: 'Introduction' },
        { name: 'form', title: 'Form Settings' },
        { name: 'expectations', title: 'Expectations' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        // Hero Section
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            group: 'hero',
            description: 'Main heading. Use {brand} for the brand name with accent color.',
            initialValue: 'Get in Touch with {brand}Gamma Capital{/brand}',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            group: 'hero',
            rows: 3,
        }),
        defineField({
            name: 'heroHighlight',
            title: 'Hero Highlight Text',
            type: 'string',
            group: 'hero',
            description: 'Bold text shown after description',
        }),

        // Introduction Section
        defineField({
            name: 'introHeading',
            title: 'Introduction Heading',
            type: 'string',
            group: 'intro',
        }),
        defineField({
            name: 'introDescription',
            title: 'Introduction Description',
            type: 'text',
            group: 'intro',
            rows: 3,
        }),
        defineField({
            name: 'introEmailLabel',
            title: 'Email Label Text',
            type: 'string',
            group: 'intro',
            initialValue: 'For general communication:',
        }),
        defineField({
            name: 'introEmail',
            title: 'Contact Email',
            type: 'string',
            group: 'intro',
            validation: (Rule) => Rule.email(),
        }),

        // Form Section
        defineField({
            name: 'formTitle',
            title: 'Form Section Title',
            type: 'string',
            group: 'form',
            initialValue: 'Contact Request',
        }),
        defineField({
            name: 'formSubtitle',
            title: 'Form Section Subtitle',
            type: 'text',
            group: 'form',
            rows: 2,
        }),
        defineField({
            name: 'formSuccessTitle',
            title: 'Success Message Title',
            type: 'string',
            group: 'form',
            initialValue: 'Request submitted successfully!',
        }),
        defineField({
            name: 'formSuccessMessage',
            title: 'Success Message Description',
            type: 'string',
            group: 'form',
        }),
        defineField({
            name: 'formErrorTitle',
            title: 'Error Message Title',
            type: 'string',
            group: 'form',
            initialValue: 'Failed to submit request',
        }),
        defineField({
            name: 'formErrorMessage',
            title: 'Error Message Description',
            type: 'string',
            group: 'form',
        }),
        // Form Labels & Placeholders
        defineField({
            name: 'formNameLabel',
            title: 'Name Label',
            type: 'string',
            group: 'form',
            initialValue: 'Full Name',
        }),
        defineField({
            name: 'formNamePlaceholder',
            title: 'Name Placeholder',
            type: 'string',
            group: 'form',
            initialValue: 'Your full name',
        }),
        defineField({
            name: 'formEmailLabel',
            title: 'Email Label',
            type: 'string',
            group: 'form',
            initialValue: 'Email Address',
        }),
        defineField({
            name: 'formEmailPlaceholder',
            title: 'Email Placeholder',
            type: 'string',
            group: 'form',
            initialValue: 'your@email.com',
        }),
        defineField({
            name: 'formCountryLabel',
            title: 'Country Label',
            type: 'string',
            group: 'form',
            initialValue: 'Country of Residence',
        }),
        defineField({
            name: 'formCountryPlaceholder',
            title: 'Country Placeholder',
            type: 'string',
            group: 'form',
            initialValue: 'e.g., Switzerland, United States, etc.',
        }),
        defineField({
            name: 'formInterestLabel',
            title: 'Interest Label',
            type: 'string',
            group: 'form',
            initialValue: 'Area of Interest',
        }),
        defineField({
            name: 'formInterestPlaceholder',
            title: 'Interest Placeholder (Dropdown)',
            type: 'string',
            group: 'form',
            initialValue: 'Select an area of interest',
        }),
        defineField({
            name: 'formMessageLabel',
            title: 'Message Label',
            type: 'string',
            group: 'form',
            initialValue: 'Message',
        }),
        defineField({
            name: 'formMessagePlaceholder',
            title: 'Message Placeholder',
            type: 'string',
            group: 'form',
            initialValue: 'Briefly describe your situation, objectives, or question.',
        }),
        defineField({
            name: 'formButtonText',
            title: 'Submit Button Text',
            type: 'string',
            group: 'form',
            initialValue: 'Submit Request',
        }),
        defineField({
            name: 'formButtonSubmittingText',
            title: 'Submitting Button Text',
            type: 'string',
            group: 'form',
            initialValue: 'Submitting...',
        }),
        defineField({
            name: 'areaOfInterestOptions',
            title: 'Area of Interest Options',
            type: 'array',
            group: 'form',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string' }),
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                ],
                preview: {
                    select: { title: 'label', subtitle: 'value' },
                },
            }],
        }),

        // Expectations Section
        defineField({
            name: 'expectationsHeading',
            title: 'Expectations Section Heading',
            type: 'string',
            group: 'expectations',
            initialValue: 'What to Expect After Contacting Us',
        }),
        defineField({
            name: 'expectationItems',
            title: 'Expectation Items',
            type: 'array',
            group: 'expectations',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'icon',
                        title: 'Icon',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'User Check', value: 'UserCheck' },
                                { title: 'Clock', value: 'Clock' },
                                { title: 'Message Square', value: 'MessageSquare' },
                                { title: 'Shield Check', value: 'ShieldCheck' },
                            ],
                        },
                    }),
                    defineField({ name: 'text', title: 'Text', type: 'string' }),
                ],
                preview: {
                    select: { title: 'text', subtitle: 'icon' },
                },
            }],
        }),

        // Disclaimer
        defineField({
            name: 'disclaimer',
            title: 'Compliance Disclaimer',
            type: 'text',
            group: 'expectations',
            rows: 3,
        }),

        // SEO Fields
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Description',
            type: 'text',
            group: 'seo',
            rows: 3,
            validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
        }),
    ],
    preview: {
        select: {
            language: 'language',
        },
        prepare({ language }) {
            return { 
                title: 'Contact Page',
                subtitle: language ? language.toUpperCase() : 'Default'
            }
        },
    },
})
