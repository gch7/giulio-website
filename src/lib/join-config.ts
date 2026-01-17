// Join configuration for Discord + Stripe access flow
// This configuration defines supported locales, groups, and translations

export const SUPPORTED_LOCALES = ['it', 'en'] as const;
export const SUPPORTED_GROUPS = ['group-a', 'group-b'] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export type SupportedGroup = typeof SUPPORTED_GROUPS[number];

// Backend endpoint for Discord authentication
// The frontend only redirects to this URL - all auth logic is handled by backend
export const DISCORD_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_DISCORD_AUTH_ENDPOINT || '';

// Translations for join pages
export const translations: Record<SupportedLocale, {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaButton: string;
  ctaSubtext: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
}> = {
  en: {
    badge: 'Premium Discord Access',
    title: 'Connect with Discord to',
    titleHighlight: 'Unlock Premium Access',
    description: 'Join our private Discord community for real-time market insights, options flow analysis, and structured guidance from experienced analysts.',
    ctaButton: 'Connect with Discord',
    ctaSubtext: 'Secure authentication via Discord',
    step1Title: 'Connect Discord',
    step1Description: 'Authenticate securely with your Discord account',
    step2Title: 'Complete Payment',
    step2Description: 'Choose your plan and checkout via Stripe',
    step3Title: 'Instant Access',
    step3Description: 'Your Premium role activates automatically',
  },
  it: {
    badge: 'Accesso Discord Premium',
    title: 'Connettiti con Discord per',
    titleHighlight: 'Sbloccare l\'Accesso Premium',
    description: 'Unisciti alla nostra community Discord privata per analisi di mercato in tempo reale, interpretazione dei flussi sulle opzioni e guida strutturata da analisti esperti.',
    ctaButton: 'Connetti con Discord',
    ctaSubtext: 'Autenticazione sicura tramite Discord',
    step1Title: 'Connetti Discord',
    step1Description: 'Autenticati in modo sicuro con il tuo account Discord',
    step2Title: 'Completa il Pagamento',
    step2Description: 'Scegli il tuo piano e paga con Stripe',
    step3Title: 'Accesso Istantaneo',
    step3Description: 'Il tuo ruolo Premium si attiva automaticamente',
  },
};

// Group-specific metadata (for tracking/analytics)
export const groupMetadata: Record<SupportedGroup, {
  name: string;
  source: string;
}> = {
  'group-a': {
    name: 'Group A',
    source: 'partner',
  },
  'group-b': {
    name: 'Group B',
    source: 'campaign',
  },
};

// Validate if locale is supported
export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// Validate if group is supported
export function isValidGroup(group: string): group is SupportedGroup {
  return SUPPORTED_GROUPS.includes(group as SupportedGroup);
}

// Build the Discord auth redirect URL
export function buildDiscordAuthUrl(locale: SupportedLocale, group: SupportedGroup): string {
  if (!DISCORD_AUTH_ENDPOINT) {
    console.warn('NEXT_PUBLIC_DISCORD_AUTH_ENDPOINT is not configured');
    return '#';
  }
  
  const url = new URL(DISCORD_AUTH_ENDPOINT);
  url.searchParams.set('locale', locale);
  url.searchParams.set('group', group);
  return url.toString();
}
