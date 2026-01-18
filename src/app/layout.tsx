import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { headers } from "next/headers";
import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  });

  return {
    title: settings?.seoTitle ?? settings?.siteName ?? undefined,
    description: settings?.seoDescription ?? undefined,
  };
}

import { UI_STRINGS_QUERY } from "@/sanity/lib/queries";
import type { UIStrings } from "@/types/sanity";
import { UIStringsProvider } from "@/components/providers/ui-strings-provider";

// ... imports remain the same

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isAdminPage = pathname.startsWith("/admin");

  // Fetch UI Strings globally
  const uiStrings = await sanityFetch<UIStrings | null>({
    query: UI_STRINGS_QUERY,
    revalidate: isDraftMode ? 0 : 60,
    tags: ['uiStrings'],
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UIStringsProvider uiStrings={uiStrings}>
          {children}
        </UIStringsProvider>
        {!isAdminPage && <VisualEditsMessenger />}
        {isDraftMode && !isAdminPage && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}