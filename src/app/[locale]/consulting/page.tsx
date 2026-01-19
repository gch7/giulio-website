import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ConsultingPageClient from './consulting-client';
import { sanityFetch } from '@/sanity/lib/client';
import { CONSULTING_PAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { ConsultingPage, SiteSettings, UIStrings } from '@/types/sanity';
import type { Locale } from '@/i18n/config';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageData = await sanityFetch<ConsultingPage | null>({
    query: CONSULTING_PAGE_QUERY,
    params: { locale },
    tags: ['consultingPage'],
    skipDraftMode: true,
  });

  return {
    title: pageData?.seoTitle ?? 'Consulting Services | Gamma Capital',
    description: pageData?.seoDescription ?? 'Expert investment consulting services including portfolio review, strategy design, and risk framework development.',
  };
}

export default async function ConsultingPage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<ConsultingPage | null>({
      query: CONSULTING_PAGE_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['consultingPage'],
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

  return <ConsultingPageClient pageData={pageData} siteSettings={siteSettings} uiStrings={uiStrings} />;
}
