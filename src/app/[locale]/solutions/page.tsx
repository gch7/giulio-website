import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import SolutionsPageClient from './solutions-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SOLUTIONS_PAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from "@/sanity/lib/queries";
import type { SolutionsPage, SiteSettings, UIStrings } from "@/types/sanity";
import type { Locale } from '@/i18n/config';

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageData = await sanityFetch<SolutionsPage | null>({
    query: SOLUTIONS_PAGE_QUERY,
    params: { locale },
    revalidate: 60,
    tags: ['solutionsPage'],
    skipDraftMode: true,
  });

  return {
    title: pageData?.seoTitle ?? undefined,
    description: pageData?.seoDescription ?? undefined,
  };
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<SolutionsPage | null>({
      query: SOLUTIONS_PAGE_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['solutionsPage'],
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
  ]);

  if (!pageData && !isDraftMode) {
    notFound();
  }

  return <SolutionsPageClient pageData={pageData} siteSettings={siteSettings} uiStrings={uiStrings} />;
}
