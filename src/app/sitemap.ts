import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { locales, defaultLocale } from '@/i18n/config'

interface PageData {
    _id: string
    title: string
    slug: string
    isHomepage?: boolean
    noIndex?: boolean
    language?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gammacap.ch'

    // Custom query to include noIndex and language fields
    const SITEMAP_PAGES_QUERY = `*[_type == "page" && (language == $locale || !defined(language))] {
        _id,
        title,
        "slug": slug.current,
        isHomepage,
        noIndex,
        language
    }`

    const allRoutes: MetadataRoute.Sitemap = []

    // Generate routes for each locale
    for (const locale of locales) {
        const alternates = {
            languages: Object.fromEntries(
                locales.map(l => [l, `${siteUrl}/${l}`])
            ) as Record<string, string>,
        }

        // Homepage for each locale
        allRoutes.push({
            url: `${siteUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: locale === defaultLocale ? 1 : 0.9,
            alternates,
        })

        // Static routes for each locale
        const staticPaths = ['memberships', 'solutions', 'contact', 'consulting']
        for (const path of staticPaths) {
            allRoutes.push({
                url: `${siteUrl}/${locale}/${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${siteUrl}/${l}/${path}`])
                    ) as Record<string, string>,
                },
            })
        }

        // Solutions subpages
        const solutionPaths = ['network', 'real-estate', 'strategy-insights']
        for (const path of solutionPaths) {
            allRoutes.push({
                url: `${siteUrl}/${locale}/solutions/${path}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${siteUrl}/${l}/solutions/${path}`])
                    ) as Record<string, string>,
                },
            })
        }

        // Dynamic CMS pages for this locale
        const pages = await sanityFetch<PageData[] | null>({
            query: SITEMAP_PAGES_QUERY,
            params: { locale },
            revalidate: 3600,
            tags: ['page', 'sitemap'],
        })

        const cmsRoutes = (pages || [])
            .filter((page) => !page.isHomepage && page.slug && !page.noIndex)
            .map((page) => ({
                url: `${siteUrl}/${locale}/${page.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${siteUrl}/${l}/${page.slug}`])
                    ) as Record<string, string>,
                },
            }))

        allRoutes.push(...cmsRoutes)
    }

    return allRoutes
}
