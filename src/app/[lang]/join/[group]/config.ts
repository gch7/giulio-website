// Join page configuration
// Update these values based on your backend setup

export const SUPPORTED_LANGUAGES = ['it', 'en'] as const;
export const SUPPORTED_GROUPS = ['group-a', 'group-b'] as const;

// Backend endpoint for Discord authentication
// The button will redirect to: {BACKEND_AUTH_URL}?lang={lang}&group={group}
export const BACKEND_AUTH_URL = 'https://your-backend.com/auth/discord';

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
export type SupportedGroup = typeof SUPPORTED_GROUPS[number];

export const translations: Record<SupportedLanguage, {
    title: string;
    subtitle: string;
    description: string;
    button: string;
    note: string;
    features: string[];
}> = {
    it: {
        title: 'Unisciti a Gamma Capital',
        subtitle: 'Accedi alla community Discord esclusiva',
        description: 'Connetti il tuo account Discord per accedere ai canali privati con analisi di mercato in tempo reale, alert e contenuti educativi.',
        button: 'Connetti con Discord',
        note: 'Dopo aver connesso Discord, verrai reindirizzato al checkout sicuro.',
        features: [
            'Accesso immediato ai canali privati',
            'Analisi di mercato in tempo reale',
            'Alert su attività insolite',
            'Contenuti educativi esclusivi',
        ],
    },
    en: {
        title: 'Join Gamma Capital',
        subtitle: 'Access the exclusive Discord community',
        description: 'Connect your Discord account to access private channels with real-time market analysis, alerts, and educational content.',
        button: 'Connect with Discord',
        note: 'After connecting Discord, you will be redirected to secure checkout.',
        features: [
            'Instant access to private channels',
            'Real-time market analysis',
            'Unusual activity alerts',
            'Exclusive educational content',
        ],
    },
};

export function isValidLanguage(lang: string): lang is SupportedLanguage {
    return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function isValidGroup(group: string): group is SupportedGroup {
    return SUPPORTED_GROUPS.includes(group as SupportedGroup);
}
