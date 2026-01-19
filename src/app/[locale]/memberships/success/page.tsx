"use server";

import React, { Suspense } from 'react';
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Loader2 } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { SiteSettings, UIStrings } from '@/types/sanity';
import { SuccessContent } from './success-content';
import type { Locale } from '@/i18n/config';

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export default async function SuccessPage({ params }: PageProps) {
  const { locale } = await params;
  
  const [siteSettings, uiStrings] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      params: { locale },
      tags: ['siteSettings'],
    }),
    sanityFetch<UIStrings | null>({
      query: UI_STRINGS_QUERY,
      params: { locale },
      tags: ['uiStrings'],
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />
      <main className="flex items-center justify-center min-h-[80vh] px-6">
        <Suspense fallback={
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin" />
            <p className="text-[#6B7280]">{uiStrings?.systemLoading ?? ''}</p>
          </div>
        }>
          <SuccessContent uiStrings={uiStrings} />
        </Suspense>
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
