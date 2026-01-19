import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY, ALL_PAGE_SLUGS_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from "@/sanity/lib/queries";
import type { Page, SiteSettings, UIStrings } from "@/types/sanity";
import { getImageUrl } from '@/sanity/lib/image'
import { locales, type Locale } from '@/i18n/config'

interface PageProps {
    params: Promise<{
        locale: Locale
        slug: string
    }>
}

export const revalidate = 60

// Generate static params for all CMS pages across all locales
export async function generateStaticParams() {
    const results = []
    
    for (const locale of locales) {
        const slugs = await sanityFetch<string[]>({
            query: ALL_PAGE_SLUGS_QUERY,
            params: { locale },
            revalidate: 3600,
            tags: ['page'],
            skipDraftMode: true,
        })

        if (slugs) {
            for (const slug of slugs) {
                results.push({ locale, slug })
            }
        }
    }
    
    return results
}

// Generate metadata for SEO - cascades to site-level defaults
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug } = await params

    // Fetch page and site settings in parallel for fallback
    const [page, siteSettings] = await Promise.all([
        sanityFetch<Page | null>({
            query: PAGE_BY_SLUG_QUERY,
            params: { slug, locale },
            revalidate: 60,
            tags: ['page', slug],
            skipDraftMode: true,
        }),
        sanityFetch<SiteSettings | null>({
            query: SITE_SETTINGS_QUERY,
            params: { locale },
            revalidate: 60,
            tags: ['siteSettings'],
            skipDraftMode: true,
        }),
    ])

    if (!page) {
        return {}
    }

    // Cascade: page-level > site-level > empty
    const title = page.seoTitle || page.title || siteSettings?.seoTitle
    const description = page.seoDescription || siteSettings?.seoDescription || ''
    const ogImage = page.ogImage || siteSettings?.ogImage
    const ogImageUrl = ogImage ? getImageUrl(ogImage, { width: 1200 }) || '' : ''
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gammacapital.com'

    return {
        title,
        description,
        ...(page.noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        alternates: {
            canonical: `${siteUrl}/${locale}/${slug}`,
            languages: {
                en: `${siteUrl}/en/${slug}`,
                it: `${siteUrl}/it/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url: `${siteUrl}/${locale}/${slug}`,
            images: ogImageUrl ? [{
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: ogImage?.alt || title || 'Page image',
            }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImageUrl ? [{
                url: ogImageUrl,
                alt: ogImage?.alt || title || 'Page image',
            }] : [],
        },
    }
}


export default async function CMSPage({ params }: PageProps) {
    const { locale, slug } = await params
    const { isEnabled: isDraftMode } = await draftMode()

    // Fetch page data and site settings from Sanity
    const [page, siteSettings, uiStrings] = await Promise.all([
        sanityFetch<Page | null>({
            query: PAGE_BY_SLUG_QUERY,
            params: { slug, locale },
            revalidate: isDraftMode ? 0 : 60,
            tags: ['page', slug],
        }),
        sanityFetch<SiteSettings | null>({
            query: SITE_SETTINGS_QUERY,
            params: { locale },
            revalidate: isDraftMode ? 0 : 60,
            tags: ['siteSettings'],
        }),
        sanityFetch<UIStrings | null>({
            query: UI_STRINGS_QUERY,
            params: { locale },
            revalidate: isDraftMode ? 0 : 60,
            tags: ['uiStrings'],
        }),
    ])

    // If no page found or it's the homepage (should be handled by /), return 404
    if (!page || page.isHomepage) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB]">
            <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
            <main>
                {page.sections && page.sections.length > 0 ? (
                    <PageBuilder sections={page.sections} uiStrings={uiStrings} />
                ) : (
                    <div className="py-12 md:py-24 text-center text-[#a1a1aa]">
                        <p>No content yet. Add sections in Sanity Studio.</p>
                    </div>
                )}
            </main>
            <Footer siteSettings={siteSettings} />

            {/* Draft mode indicator */}
            {isDraftMode && (
                <div className="fixed bottom-4 right-4 z-50 bg-[#2563EB] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Draft Mode
                    <a
                        href={`/api/disable-draft?slug=${slug}`}
                        className="ml-2 underline hover:no-underline"
                    >
                        Exit
                    </a>
                </div>
            )}
        </div>
    )
}
