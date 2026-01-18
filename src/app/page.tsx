import { draftMode } from 'next/headers'
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { PageBuilder } from "@/components/page-builder";
import { OrganizationSchema } from "@/components/structured-data";
import { sanityFetch } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from "@/sanity/lib/queries";
import type { Page, SiteSettings, UIStrings } from "@/types/sanity";

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const { isEnabled: isDraftMode } = await draftMode()

  // Fetch homepage and site settings from Sanity
  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<Page | null>({
      query: HOMEPAGE_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['page', 'homepage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
    sanityFetch<UIStrings | null>({
      query: UI_STRINGS_QUERY,
      revalidate: isDraftMode ? 0 : 60,
      tags: ['uiStrings'],
    }),
  ])

  // If we have CMS data, use PageBuilder; otherwise show "Coming Soon" or 404
  const hasCMSContent = pageData?.sections && pageData.sections.length > 0

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <OrganizationSchema siteSettings={siteSettings} />

      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main>
        {hasCMSContent ? (
          <PageBuilder sections={pageData.sections} uiStrings={uiStrings} />
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900">{uiStrings?.comingSoonTitle || 'Coming Soon'}</h1>
              <p className="mt-2 text-gray-600">{uiStrings?.comingSoonMessage || 'This page is currently being updated.'}</p>
            </div>
          </div>
        )}
      </main>
      <Footer siteSettings={siteSettings} />


    </div>
  );
}