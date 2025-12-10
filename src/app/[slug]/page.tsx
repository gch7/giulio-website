import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY, ALL_PAGE_SLUGS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Page, SiteSettings } from "@/types/sanity";
import { getImageUrl } from '@/sanity/lib/image'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export const revalidate = 60

// Generate static params for all CMS pages
export async function generateStaticParams() {
    const slugs = await sanityFetch<string[]>({
        query: ALL_PAGE_SLUGS_QUERY,
        revalidate: 3600, // Revalidate every hour
        tags: ['page'],
    })

    return slugs.map((slug) => ({
        slug,
    }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params

    const page = await sanityFetch<Page | null>({
        query: PAGE_BY_SLUG_QUERY,
        params: { slug },
        revalidate: 60,
        tags: ['page', slug],
    })

    if (!page) {
        return {}
    }

    return {
        title: page.seoTitle || page.title,
        description: page.seoDescription,
        openGraph: {
            title: page.seoTitle || page.title,
            description: page.seoDescription || '',
            images: page.ogImage ? [getImageUrl(page.ogImage, { width: 1200 }) || ''] : [],
        },
    }
}

export default async function CMSPage({ params }: PageProps) {
    const { slug } = await params
    const { isEnabled: isDraftMode } = await draftMode()

    // Fetch page data and site settings from Sanity
    const [page, siteSettings] = await Promise.all([
        sanityFetch<Page | null>({
            query: PAGE_BY_SLUG_QUERY,
            params: { slug },
            revalidate: isDraftMode ? 0 : 60,
            tags: ['page', slug],
        }),
        sanityFetch<SiteSettings | null>({
            query: SITE_SETTINGS_QUERY,
            revalidate: isDraftMode ? 0 : 60,
            tags: ['siteSettings'],
        }),
    ])

    // If no page found or it's the homepage (should be handled by /), return 404
    if (!page || page.isHomepage) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <NavigationHeader siteSettings={siteSettings} />
            <main>
                {page.sections && page.sections.length > 0 ? (
                    <PageBuilder sections={page.sections} />
                ) : (
                    <div className="py-24 text-center text-[#a1a1aa]">
                        <p>No content yet. Add sections in Sanity Studio.</p>
                    </div>
                )}
            </main>
            <Footer siteSettings={siteSettings} />

            {/* Draft mode indicator */}
            {isDraftMode && (
                <div className="fixed bottom-4 right-4 z-50 bg-[#0d9488] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
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
