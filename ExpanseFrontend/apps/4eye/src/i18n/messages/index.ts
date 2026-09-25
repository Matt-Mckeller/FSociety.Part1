import type { Translations } from "../types"
import en from "./en"
import es from "./es"
import zh from "./zh"

export { en, es, zh }

/**
 * All messages indexed by locale
 */
export const messages: Record<string, Translations> = {
  en,
  es,
  zh,
}

/**
 * Get messages for a specific locale
 * Falls back to English if locale not found
 */
export function getMessages(locale: string): Translations {
  return messages[locale] ?? messages.en
}
