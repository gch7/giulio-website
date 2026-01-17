'use client'

import type { SiteSettings } from '@/types/sanity'

interface OrganizationSchemaProps {
    siteSettings?: SiteSettings | null
    baseUrl?: string
}

export function OrganizationSchema({ siteSettings, baseUrl = 'https://gammacapital.com' }: OrganizationSchemaProps) {
    if (!siteSettings) return null

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteSettings.siteName || 'Gamma Capital',
        url: baseUrl,
        ...(siteSettings.contactEmail && { email: `mailto:${siteSettings.contactEmail}` }),
        ...(siteSettings.seoDescription && { description: siteSettings.seoDescription }),
        sameAs: siteSettings.socialLinks
            ?.filter(link => link.url?.startsWith('http'))
            .map(link => link.url) || [],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface WebPageSchemaProps {
    title: string
    description?: string
    url: string
    baseUrl?: string
}

export function WebPageSchema({ title, description, url, baseUrl = 'https://gammacapital.com' }: WebPageSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        ...(description && { description }),
        url: `${baseUrl}${url}`,
        isPartOf: {
            '@type': 'WebSite',
            name: 'Gamma Capital',
            url: baseUrl,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface BreadcrumbSchemaProps {
    items: Array<{ name: string; url: string }>
    baseUrl?: string
}

export function BreadcrumbSchema({ items, baseUrl = 'https://gammacapital.com' }: BreadcrumbSchemaProps) {
    if (!items || items.length === 0) return null

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
