import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ServicePageClient from '@/components/templates/service-page-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SERVICE_LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ServiceLandingPage, SiteSettings } from "@/types/sanity";
import type { Locale } from '@/i18n/config';

import networkPageEn from '@/data/seeds/networkPage-en.json';
import networkPageIt from '@/data/seeds/networkPage-it.json';

const NETWORK_PAGE_IDS: Record<string, string> = {
  en: 'networkPage',
  it: 'networkPage-it',
};

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const id = NETWORK_PAGE_IDS[locale] || 'networkPage';

  let pageData = await sanityFetch<ServiceLandingPage | null>({
    query: SERVICE_LANDING_PAGE_QUERY,
    params: { id, locale },
    revalidate: 60,
    tags: ['networkPage'],
    skipDraftMode: true,
  });

  if (!pageData) {
    pageData = (locale === 'it' ? networkPageIt : networkPageEn) as unknown as ServiceLandingPage;
  }

  return {
    title: pageData?.seoTitle || 'Strategic Network | Gamma Capital',
    description: pageData?.seoDescription || 'Access exclusive deal flow, institutional connections, and curated investment opportunities through our strategic network.',
  };
}

export default async function NetworkPage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const id = NETWORK_PAGE_IDS[locale] || 'networkPage';

  let [pageData, siteSettings] = await Promise.all([
    sanityFetch<ServiceLandingPage | null>({
      query: SERVICE_LANDING_PAGE_QUERY,
      params: { id, locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['networkPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  if (!pageData) {
    pageData = (locale === 'it' ? networkPageIt : networkPageEn) as unknown as ServiceLandingPage;
  }

  return (
    <ServicePageClient
      pageData={pageData}
      siteSettings={siteSettings}
      defaultBadge="Strategic Network"
      defaultTitle="Exclusive Access & Strategic Connections"
    />
  );
}
