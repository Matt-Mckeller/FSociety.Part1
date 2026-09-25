/**
 * i18n Configuration
 *
 * Defines supported locales and default locale for the application.
 * This is the single source of truth for language configuration.
 */

export const locales = ["en", "es", "zh"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
}

/**
 * Locale metadata for SEO and display
 */
export const localeMetadata: Record<
  Locale,
  {
    name: string
    nativeName: string
    direction: "ltr" | "rtl"
    hrefLang: string
  }
> = {
  en: {
    name: "English",
    nativeName: "English",
    direction: "ltr",
    hrefLang: "en",
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    hrefLang: "es",
  },
  zh: {
    name: "Chinese",
    nativeName: "中文",
    direction: "ltr",
    hrefLang: "zh",
  },
}

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
