import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { headers } from "next/headers";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { VisualEditing } from "next-sanity/visual-editing";
import { LocaleProvider } from '@/components/providers/locale-provider';
import { UIStringsProvider } from "@/components/providers/ui-strings-provider";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings, UIStrings } from "@/types/sanity";
import { locales, type Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import StyledComponentsRegistry from '@/lib/registry';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gammacap.ch';

  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    params: { locale },
    tags: ['siteSettings'],
    skipDraftMode: true,
  });

  return {
    title: settings?.seoTitle ?? settings?.siteName ?? undefined,
    description: settings?.seoDescription ?? undefined,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        it: `${siteUrl}/it`,
        'x-default': `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale: localeParam } = await params;

  // Validate locale
  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const { isEnabled: isDraftMode } = await draftMode();
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isAdminPage = pathname.startsWith("/admin");

  // Fetch UI Strings for this locale
  const uiStrings = await sanityFetch<UIStrings | null>({
    query: UI_STRINGS_QUERY,
    params: { locale },
    revalidate: isDraftMode ? 0 : 60,
    tags: ['uiStrings'],
  });

  return (
    <StyledComponentsRegistry>
      <LocaleProvider locale={locale}>
        <UIStringsProvider uiStrings={uiStrings}>
          {children}
        </UIStringsProvider>
      </LocaleProvider>
      {!isAdminPage && <VisualEditsMessenger />}
      {isDraftMode && !isAdminPage && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </StyledComponentsRegistry>
  );
}
