import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    SUPPORTED_LOCALES,
    SUPPORTED_GROUPS,
    isValidLocale,
    isValidGroup,
    translations,
    type SupportedLocale,
    type SupportedGroup,
} from '@/lib/join-config';
import JoinClient from './join-client';

interface JoinPageProps {
    params: Promise<{
        locale: string;
        group: string;
    }>;
}

// Generate static params for all locale/group combinations
export async function generateStaticParams() {
    const params: { locale: string; group: string }[] = [];

    for (const locale of SUPPORTED_LOCALES) {
        for (const group of SUPPORTED_GROUPS) {
            params.push({ locale, group });
        }
    }

    return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: JoinPageProps): Promise<Metadata> {
    const { locale, group } = await params;

    if (!isValidLocale(locale) || !isValidGroup(group)) {
        return { title: 'Not Found' };
    }

    const t = translations[locale as SupportedLocale];

    return {
        title: `${t.ctaButton} | Gamma Capital`,
        description: t.description,
        robots: 'noindex, nofollow', // Usually join pages should not be indexed
    };
}

export default async function JoinPage({ params }: JoinPageProps) {
    const { locale, group } = await params;

    // Validate locale and group
    if (!isValidLocale(locale) || !isValidGroup(group)) {
        notFound();
    }

    return (
        <JoinClient
            locale={locale as SupportedLocale}
            group={group as SupportedGroup}
        />
    );
}
