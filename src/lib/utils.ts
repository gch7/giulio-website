import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedHref(href: string | undefined | null, locale: string | string[] | undefined): string {
  if (!href) return ''
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return href

  const currentLocale = Array.isArray(locale) ? locale[0] : locale
  if (!currentLocale) return href

  // already has locale prefix
  if (href.startsWith(`/${currentLocale}/`) || href === `/${currentLocale}`) return href

  // Ensure href starts with /
  const path = href.startsWith('/') ? href : `/${href}`

  return `/${currentLocale}${path}`
}
