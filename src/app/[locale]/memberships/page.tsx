import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import MembershipsPageClient from './memberships-client';
import { sanityFetch } from '@/sanity/lib/client';
import { MEMBERSHIPS_PAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { MembershipsPage, SiteSettings, UIStrings } from '@/types/sanity';
import type { Locale } from '@/i18n/config';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageData = await sanityFetch<MembershipsPage | null>({
    query: MEMBERSHIPS_PAGE_QUERY,
    params: { locale },
    tags: ['membershipsPage'],
    skipDraftMode: true,
  });

  return {
    title: pageData?.seoTitle ?? 'Discord Memberships | Gamma Capital',
    description: pageData?.seoDescription ?? 'Join our exclusive Discord community for real-time market insights and connect with sophisticated investors.',
  };
}

export default async function MembershipsPage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<MembershipsPage | null>({
      query: MEMBERSHIPS_PAGE_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['membershipsPage'],
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

  return <MembershipsPageClient pageData={pageData} siteSettings={siteSettings} uiStrings={uiStrings} />;
}
