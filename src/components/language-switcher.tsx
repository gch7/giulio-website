'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { useLocale } from '@/components/providers/locale-provider'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const currentLocale = useLocale()

  const switchLocale = (newLocale: Locale): string => {
    // Replace the current locale in the path with the new locale
    const segments = pathname.split('/')
    // segments[0] is empty string, segments[1] is the locale
    if (segments.length > 1) {
      segments[1] = newLocale
    }
    return segments.join('/') || `/${newLocale}`
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-1">|</span>}
          <Link
            href={switchLocale(locale)}
            className={`px-1 py-0.5 rounded transition-colors ${
              currentLocale === locale
                ? 'text-[#2563EB] font-semibold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}

// Mobile version with larger touch targets
export function LanguageSwitcherMobile() {
  const pathname = usePathname()
  const currentLocale = useLocale()

  const switchLocale = (newLocale: Locale): string => {
    const segments = pathname.split('/')
    if (segments.length > 1) {
      segments[1] = newLocale
    }
    return segments.join('/') || `/${newLocale}`
  }

  return (
    <div className="flex items-center gap-3">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocale(locale)}
          className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20'
              : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#2563EB]/30 hover:text-[#111827]'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
