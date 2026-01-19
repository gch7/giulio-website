import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import { sanityFetch } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY, UI_STRINGS_QUERY } from '@/sanity/lib/queries';
import type { SiteSettings, UIStrings } from '@/types/sanity';

export default async function NotFound() {
    const [siteSettings, uiStrings] = await Promise.all([
        sanityFetch<SiteSettings | null>({
            query: SITE_SETTINGS_QUERY,
            tags: ['siteSettings'],
        }),
        sanityFetch<UIStrings | null>({
            query: UI_STRINGS_QUERY,
            tags: ['uiStrings'],
        }),
    ]);

    const content = {
        badge: uiStrings?.notFoundBadge,
        title: uiStrings?.notFoundTitle,
        description: uiStrings?.notFoundDescription,
        homeButton: uiStrings?.notFoundHomeButtonText,
        contactButton: uiStrings?.notFoundContactButtonText,
        quickLinksTitle: uiStrings?.notFoundQuickLinksTitle,
        quickLinks: uiStrings?.notFoundQuickLinks || [],
    };

    // Parse title for highlighting (simple implementation based on description)
    // Matches {highlight}Text{/highlight}
    const safeTitle = content.title || '';
    const titleParts = safeTitle.split(/\{highlight\}|\{\/highlight\}/);
    const titleBefore = titleParts[0] || '';
    const titleHighlight = titleParts.length > 1 ? titleParts[1] : '';
    const titleAfter = titleParts.length > 2 ? titleParts[2] : '';

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
            <NavigationHeader siteSettings={siteSettings} uiStrings={uiStrings} />

            <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2563EB]/3 rounded-full blur-3xl -z-10" />

                <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Subtle 404 Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
                        {content.badge}
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-display font-semibold tracking-tighter text-[#111827] italic">
                            {titleHighlight ? (
                                <>
                                    {titleBefore}
                                    <span className="text-[#2563EB]">{titleHighlight}</span>
                                    {titleAfter}
                                </>
                            ) : (
                                content.title
                            )}
                        </h1>
                        <p className="text-lg md:text-xl text-[#6B7280] max-w-lg mx-auto leading-relaxed font-medium">
                            {content.description}
                        </p>
                    </div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-md mx-auto">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-[#0A1A2F] text-white py-4 px-6 rounded-xl font-semibold text-[14px] hover:bg-[#1E3A8A] transition-all active:scale-[0.98] shadow-lg shadow-black/5"
                        >
                            <Home className="w-4 h-4" />
                            {content.homeButton}
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 bg-white text-[#111827] py-4 px-6 rounded-xl font-semibold text-[14px] border border-[#E5E7EB] hover:border-[#2563EB]/50 hover:bg-[#2563EB]/5 transition-all active:scale-[0.98]"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {content.contactButton}
                        </Link>
                    </div>

                    {/* Quick Search Suggestion */}
                    {content.quickLinks.length > 0 && (
                        <div className="pt-12 border-t border-gray-100 mt-12">
                            <p className="text-[12px] text-[#9CA3AF] font-medium uppercase tracking-widest mb-6 font-display">
                                {content.quickLinksTitle}
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {content.quickLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-[13px] text-[#6B7280] font-medium hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer siteSettings={siteSettings} />
        </div>
    );
}
