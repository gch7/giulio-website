import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ServicePageClient from '@/components/templates/service-page-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SERVICE_LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ServiceLandingPage, SiteSettings } from "@/types/sanity";
import type { Locale } from '@/i18n/config';

import realEstatePageEn from '@/data/seeds/realEstatePage-en.json';
import realEstatePageIt from '@/data/seeds/realEstatePage-it.json';

const REAL_ESTATE_PAGE_IDS: Record<string, string> = {
  en: 'realEstatePage',
  it: 'realEstatePage-it',
};

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const id = REAL_ESTATE_PAGE_IDS[locale] || 'realEstatePage';

  let pageData = await sanityFetch<ServiceLandingPage | null>({
    query: SERVICE_LANDING_PAGE_QUERY,
    params: { id, locale },
    revalidate: 60,
    tags: ['realEstatePage'],
    skipDraftMode: true,
  });

  if (!pageData) {
    pageData = (locale === 'it' ? realEstatePageIt : realEstatePageEn) as unknown as ServiceLandingPage;
  }

  return {
    title: pageData?.seoTitle || 'Real Estate Advisory | Gamma Capital',
    description: pageData?.seoDescription || 'Strategic real estate investment guidance including market analysis, due diligence, and investment strategy development for property investments.',
  };
}

export default async function RealEstatePage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const id = REAL_ESTATE_PAGE_IDS[locale] || 'realEstatePage';

  let [pageData, siteSettings] = await Promise.all([
    sanityFetch<ServiceLandingPage | null>({
      query: SERVICE_LANDING_PAGE_QUERY,
      params: { id, locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['realEstatePage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  if (!pageData) {
    pageData = (locale === 'it' ? realEstatePageIt : realEstatePageEn) as unknown as ServiceLandingPage;
  }

  return (
    <ServicePageClient
      pageData={pageData}
      siteSettings={siteSettings}
      defaultBadge="Real Estate Advisory"
      defaultTitle="Strategic Real Estate Guidance"
    />
  );
}
