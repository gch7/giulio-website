import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JoinPageClient from './join-page-client';
import {
    isValidLanguage,
    isValidGroup,
    translations,
    SUPPORTED_LANGUAGES,
    SUPPORTED_GROUPS,
    type SupportedLanguage
} from './config';

interface PageProps {
    params: Promise<{
        lang: string;
        group: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang, group } = await params;

    if (!isValidLanguage(lang) || !isValidGroup(group)) {
        return {
            title: 'Not Found',
        };
    }

    const t = translations[lang];

    return {
        title: `${t.title} | Gamma Capital`,
        description: t.description,
    };
}

export async function generateStaticParams() {
    const params: { lang: string; group: string }[] = [];

    for (const lang of SUPPORTED_LANGUAGES) {
        for (const group of SUPPORTED_GROUPS) {
            params.push({ lang, group });
        }
    }

    return params;
}

export default async function JoinPage({ params }: PageProps) {
    const { lang, group } = await params;

    // Validate parameters
    if (!isValidLanguage(lang) || !isValidGroup(group)) {
        notFound();
    }

    return <JoinPageClient lang={lang as SupportedLanguage} group={group} />;
}
