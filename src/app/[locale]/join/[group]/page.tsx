import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    SUPPORTED_GROUPS,
    isValidGroup,
    translations,
    type SupportedLocale,
    type SupportedGroup,
} from '@/lib/join-config';
import JoinClient from './join-client';
import { locales, type Locale, isValidLocale as isValidI18nLocale } from '@/i18n/config';

interface JoinPageProps {
    params: Promise<{
        locale: Locale;
        group: string;
    }>;
}

// Generate static params for all groups across all locales
export async function generateStaticParams() {
    const results = [];
    for (const locale of locales) {
        for (const group of SUPPORTED_GROUPS) {
            results.push({ locale, group });
        }
    }
    return results;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: JoinPageProps): Promise<Metadata> {
    const { locale, group } = await params;

    if (!isValidGroup(group)) {
        return { title: 'Not Found' };
    }

    // Map i18n locale to join-config locale
    const joinLocale: SupportedLocale = locale === 'it' ? 'it' : 'en';
    const t = translations[joinLocale];

    return {
        title: `${t.ctaButton} | Gamma Capital`,
        description: t.description,
        robots: 'noindex, nofollow',
    };
}

export default async function JoinPage({ params }: JoinPageProps) {
    const { locale, group } = await params;

    // Validate group
    if (!isValidGroup(group)) {
        notFound();
    }

    // Map i18n locale to join-config locale
    const joinLocale: SupportedLocale = locale === 'it' ? 'it' : 'en';

    return (
        <JoinClient
            locale={joinLocale}
            group={group as SupportedGroup}
        />
    );
}
