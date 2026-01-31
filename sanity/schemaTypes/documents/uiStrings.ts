import { defineType, defineField } from 'sanity'
import { Text } from 'lucide-react'

export default defineType({
    name: 'uiStrings',
    title: 'UI Strings',
    type: 'document',
    icon: Text,
    groups: [
        { name: 'notFound', title: '404 Page' },
        { name: 'system', title: 'System' },
        { name: 'navigation', title: 'Navigation' },
        { name: 'accessibility', title: 'Accessibility' },
        { name: 'forms', title: 'Forms & Validation' },
        { name: 'memberships', title: 'Memberships' },
        { name: 'routes', title: 'Route Paths' },
    ],
    fields: [
        // 404 Page Fields
        defineField({
            name: 'notFoundBadge',
            title: '404 Badge Text',
            type: 'internationalizedArrayString',
            group: 'notFound',
        }),
        defineField({
            name: 'notFoundTitle',
            title: '404 Title',
            type: 'internationalizedArrayString',
            group: 'notFound',
            description: 'Use {highlight} to wrap the highlighted word',
        }),
        defineField({
            name: 'notFoundDescription',
            title: '404 Description',
            type: 'internationalizedArrayText',
            group: 'notFound',
        }),
        defineField({
            name: 'notFoundHomeButtonText',
            title: 'Home Button Text',
            type: 'internationalizedArrayString',
            group: 'notFound',
        }),
        defineField({
            name: 'notFoundContactButtonText',
            title: 'Contact Button Text',
            type: 'internationalizedArrayString',
            group: 'notFound',
        }),
        defineField({
            name: 'notFoundQuickLinksTitle',
            title: 'Quick Links Section Title',
            type: 'internationalizedArrayString',
            group: 'notFound',
        }),

        // Navigation Strings
        defineField({
            name: 'mobileMenuOpenLabel',
            title: 'Mobile Menu Open Label',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),
        defineField({
            name: 'mobileMenuCloseLabel',
            title: 'Mobile Menu Close Label',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),
        defineField({
            name: 'logoAriaLabel',
            title: 'Logo Aria Label (Home Link)',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),
        defineField({
            name: 'exploreServicesLabel',
            title: 'Explore Services Label',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),
        defineField({
            name: 'navigationBackLabel',
            title: 'Back Label',
            type: 'internationalizedArrayString',
            group: 'navigation',
        }),

        // Forms & Validation
        defineField({
            name: 'formSubmitButton',
            title: 'Submit Button Default',
            type: 'internationalizedArrayString',
            group: 'forms',
        }),
        defineField({
            name: 'formSubmittingText',
            title: 'Submitting Text',
            type: 'internationalizedArrayString',
            group: 'forms',
        }),
        defineField({
            name: 'formRequiredError',
            title: 'Required Field Error Message',
            type: 'internationalizedArrayString',
            group: 'forms',
        }),
        defineField({
            name: 'formEmailError',
            title: 'Invalid Email Error Message',
            type: 'internationalizedArrayString',
            group: 'forms',
        }),
        defineField({
            name: 'formSuccessTitle',
            title: 'Success Message Title',
            type: 'internationalizedArrayString',
            group: 'forms',
        }),

        // System Loading/Errors
        defineField({
            name: 'systemLoading',
            title: 'Loading text',
            type: 'internationalizedArrayString',
            group: 'system',
        }),
        defineField({
            name: 'systemError',
            title: 'Error Message',
            type: 'internationalizedArrayString',
            group: 'system',
        }),
        defineField({
            name: 'comingSoonTitle',
            title: 'Coming Soon Title',
            type: 'internationalizedArrayString',
            group: 'system',
        }),

        // Route Paths (Global - Not internationalized because they are internal slugs)
        defineField({
            name: 'contactRoute',
            title: 'Contact Page Route',
            type: 'string',
            group: 'routes',
            initialValue: '/contact',
        }),
        defineField({
            name: 'solutionsRoute',
            title: 'Solutions Page Route',
            type: 'string',
            group: 'routes',
            initialValue: '/solutions',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'System UI Strings',
                subtitle: 'All localized labels and messages',
            }
        },
    },
})

