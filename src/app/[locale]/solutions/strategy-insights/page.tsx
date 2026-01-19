import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ServicePageClient from '@/components/templates/service-page-client';
import { sanityFetch } from "@/sanity/lib/client";
import { SERVICE_LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ServiceLandingPage, SiteSettings } from "@/types/sanity";
import type { Locale } from '@/i18n/config';

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageData = await sanityFetch<ServiceLandingPage | null>({
    query: SERVICE_LANDING_PAGE_QUERY,
    params: { id: 'strategyPage', locale },
    revalidate: 60,
    tags: ['strategyPage'],
    skipDraftMode: true,
  });

  return {
    title: pageData?.seoTitle || 'Strategy Insights | Gamma Capital',
    description: pageData?.seoDescription || 'Actionable market intelligence and data-driven analysis including market research, technical signals, risk assessment, and opportunity identification.',
  };
}

export default async function StrategyInsightsPage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings] = await Promise.all([
    sanityFetch<ServiceLandingPage | null>({
      query: SERVICE_LANDING_PAGE_QUERY,
      params: { id: 'strategyPage', locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['strategyPage'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['siteSettings'],
    }),
  ]);

  return (
    <ServicePageClient
      pageData={pageData}
      siteSettings={siteSettings}
      defaultBadge="Strategy Insights"
      defaultTitle="Market Intelligence & Strategy"
    />
  );
}
