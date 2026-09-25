import { getRequestConfig } from "next-intl/server"
import { getMessages } from "./messages"
import { defaultLocale, isValidLocale } from "./config"

/**
 * next-intl request configuration
 *
 * This is called for each request to provide the messages for the current locale.
 * Used by next-intl's server components and the NextIntlClientProvider.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (set by middleware)
  let locale = await requestLocale

  // Validate and fallback to default if invalid
  if (!locale || !isValidLocale(locale)) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: getMessages(locale),
  }
})
