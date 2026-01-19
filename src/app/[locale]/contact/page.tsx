import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import ContactPageClient from './contact-client';
import { sanityFetch } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { ContactPage, SiteSettings, UIStrings } from '@/types/sanity';
import type { Locale } from '@/i18n/config';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageData = await sanityFetch<ContactPage | null>({
    query: CONTACT_PAGE_QUERY,
    params: { locale },
    tags: ['contactPage'],
    skipDraftMode: true,
  });

  return {
    title: pageData?.seoTitle ?? 'Contact Us | Gamma Capital',
    description: pageData?.seoDescription ?? 'Get in touch with Gamma Capital. Contact us about Discord memberships, consulting services, or general inquiries.',
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const [pageData, siteSettings, uiStrings] = await Promise.all([
    sanityFetch<ContactPage | null>({
      query: CONTACT_PAGE_QUERY,
      params: { locale },
      revalidate: isDraftMode ? 0 : 60,
      tags: ['contactPage'],
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

  return <ContactPageClient pageData={pageData} siteSettings={siteSettings} uiStrings={uiStrings} />;
}
