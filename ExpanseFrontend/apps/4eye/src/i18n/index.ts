/**
 * i18n Module
 *
 * Provides internationalization support for the application.
 *
 * @example
 * // In a server component:
 * import { getTranslations } from 'next-intl/server'
 * const t = await getTranslations('home')
 * <h1>{t('intro.title')}</h1>
 *
 * @example
 * // In a client component:
 * import { useTranslations } from 'next-intl'
 * const t = useTranslations('home')
 * <h1>{t('intro.title')}</h1>
 */

export * from "./config"
export * from "./types"
export { getMessages, messages } from "./messages"
