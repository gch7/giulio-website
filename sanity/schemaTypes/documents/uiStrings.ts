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
        { name: 'general', title: 'General' },
    ],
    fields: [
        // 404 Page Fields
        defineField({
            name: 'notFoundBadge',
            title: '404 Badge Text',
            type: 'string',
            group: 'notFound',
            initialValue: 'Error 404',
        }),
        defineField({
            name: 'notFoundTitle',
            title: '404 Title',
            type: 'string',
            group: 'notFound',
            initialValue: 'Lost in Data.',
            description: 'Use {highlight} to wrap the highlighted word, e.g., "Lost in {highlight}Data.{/highlight}"',
        }),
        defineField({
            name: 'notFoundDescription',
            title: '404 Description',
            type: 'text',
            group: 'notFound',
            rows: 2,
            initialValue: 'The page you are looking for has been moved, removed, or never existed in our strategy framework.',
        }),
        defineField({
            name: 'notFoundHomeButtonText',
            title: 'Home Button Text',
            type: 'string',
            group: 'notFound',
            initialValue: 'Return Home',
        }),
        defineField({
            name: 'notFoundContactButtonText',
            title: 'Contact Button Text',
            type: 'string',
            group: 'notFound',
            initialValue: 'Contact Support',
        }),
        defineField({
            name: 'notFoundQuickLinksTitle',
            title: 'Quick Links Section Title',
            type: 'string',
            group: 'notFound',
            initialValue: 'Popular Insights',
        }),
        defineField({
            name: 'notFoundQuickLinks',
            title: 'Quick Links',
            type: 'array',
            group: 'notFound',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'Link', type: 'string' }),
                ],
                preview: {
                    select: { title: 'label', subtitle: 'href' },
                },
            }],
        }),

        // System Strings
        defineField({
            name: 'systemLoading',
            title: 'Loading text',
            type: 'string',
            group: 'system',
            initialValue: 'Loading...',
        }),
        defineField({
            name: 'systemError',
            title: 'Error Badge / Title',
            type: 'string',
            group: 'system',
            initialValue: 'Error',
        }),
        defineField({
            name: 'systemRetry',
            title: 'Retry Button',
            type: 'string',
            group: 'system',
            initialValue: 'Retry',
        }),
        defineField({
            name: 'comingSoonTitle',
            title: 'Coming Soon Title',
            type: 'string',
            group: 'system',
            initialValue: 'Coming Soon',
        }),
        defineField({
            name: 'comingSoonMessage',
            title: 'Coming Soon Message',
            type: 'text',
            group: 'system',
            initialValue: 'This page is currently being updated.',
        }),

        // Navigation Strings
        defineField({
            name: 'mobileMenuOpenLabel',
            title: 'Mobile Menu Open Label (Accessibility)',
            type: 'string',
            group: 'navigation',
            initialValue: 'Open menu',
        }),
        defineField({
            name: 'mobileMenuCloseLabel',
            title: 'Mobile Menu Close Label (Accessibility)',
            type: 'string',
            group: 'navigation',
            initialValue: 'Close menu',
        }),
        defineField({
            name: 'navigationBackLabel',
            title: 'Back Label',
            type: 'string',
            group: 'navigation',
            initialValue: 'Back',
        }),
        defineField({
            name: 'exploreServicesLabel',
            title: 'Explore Services Label',
            type: 'string',
            group: 'navigation',
            initialValue: 'Explore Services',
        }),

        // General UI Strings
        defineField({
            name: 'draftModeLabel',
            title: 'Draft Mode Label',
            type: 'string',
            group: 'general',
            initialValue: 'Draft Mode',
        }),
        defineField({
            name: 'draftModeExitText',
            title: 'Draft Mode Exit Text',
            type: 'string',
            group: 'general',
            initialValue: 'Exit',
        }),
        defineField({
            name: 'readyToStartBadge',
            title: 'Ready to Start Badge',
            type: 'string',
            group: 'general',
            initialValue: 'Ready to Start?',
        }),

        // System Strings - Errors
        defineField({
            name: 'sectionErrorTitle',
            title: 'Section Error Title',
            type: 'string',
            group: 'system',
            initialValue: 'Section Error',
        }),
        defineField({
            name: 'sectionErrorMessage',
            title: 'Section Error Message Default',
            type: 'string',
            group: 'system',
            initialValue: 'Unknown error',
        }),

        // Accessibility & Controls
        defineField({
            name: 'paginationPrev',
            title: 'Pagination Previous Label',
            type: 'string',
            group: 'navigation',
            initialValue: 'Previous',
        }),
        defineField({
            name: 'paginationNext',
            title: 'Pagination Next Label',
            type: 'string',
            group: 'navigation',
            initialValue: 'Next',
        }),
        defineField({
            name: 'carouselPrev',
            title: 'Carousel Previous Label',
            type: 'string',
            group: 'navigation',
            initialValue: 'Previous slide',
        }),
        defineField({
            name: 'carouselNext',
            title: 'Carousel Next Label',
            type: 'string',
            group: 'navigation',
            initialValue: 'Next slide',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'UI Strings',
                subtitle: 'System messages and labels',
            }
        },
    },
})
