/**
 * Message Formatting Utilities
 *
 * Simple, backend-agnostic utilities for message formatting.
 * Works in browsers and React Native via the Intl API.
 *
 * @example
 * ```ts
 * // Simple pluralization
 * pluralize(5, 'item', 'items') // "items"
 * pluralize(1, 'item', 'items') // "item"
 *
 * // Locale-aware pluralization
 * pluralCategory(5, 'en-US') // "other"
 * pluralCategory(1, 'en-US') // "one"
 * pluralCategory(0, 'ar-SA') // "zero"
 *
 * // ICU MessageFormat parsing
 * formatMessage("{count, plural, one {# item} other {# items}}", { count: 5 }, 'en-US')
 * // "5 items"
 * ```
 */

// =============================================================================
// Simple Pluralization
// =============================================================================

/**
 * Simple English-style pluralization.
 * For other languages, use `selectPlural` with locale-specific forms.
 */
export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

/**
 * Get the plural category for a count in a specific locale.
 * Uses Intl.PluralRules to handle language-specific rules.
 *
 * Categories:
 * - "zero" - for zero in some languages (Arabic, Latvian)
 * - "one" - singular (most languages)
 * - "two" - dual (Arabic, Hebrew, Slovenian)
 * - "few" - paucal (Russian, Polish, Arabic for 3-10)
 * - "many" - large numbers (Russian, Polish, Arabic for 11-99)
 * - "other" - default/plural (all languages)
 */
export function pluralCategory(
  count: number,
  locale: string
): "zero" | "one" | "two" | "few" | "many" | "other" {
  return new Intl.PluralRules(locale).select(count)
}

/**
 * Select the appropriate form based on plural category.
 *
 * @example
 * ```ts
 * const forms = {
 *   one: "{count} item",
 *   other: "{count} items"
 * }
 * selectPlural(1, forms, 'en-US') // "{count} item"
 * selectPlural(5, forms, 'en-US') // "{count} items"
 * ```
 */
export function selectPlural(
  count: number,
  forms: Partial<Record<"zero" | "one" | "two" | "few" | "many" | "other", string>>,
  locale: string
): string {
  const category = pluralCategory(count, locale)
  return forms[category] || forms.other || ""
}

// =============================================================================
// ICU MessageFormat Parser (Simplified)
// =============================================================================

/**
 * Parse and format an ICU MessageFormat string.
 *
 * Supports:
 * - {variable} - Simple interpolation
 * - {count, plural, one {...} other {...}} - Plurals
 * - {count, plural, =0 {...} =1 {...} other {...}} - Exact matches
 *
 * For full ICU support (select, nested plurals), use 'intl-messageformat' package.
 *
 * @example
 * ```ts
 * formatMessage("Hello, {name}!", { name: "World" }, "en-US")
 * // "Hello, World!"
 *
 * formatMessage(
 *   "{count, plural, one {# item} other {# items}}",
 *   { count: 5 },
 *   "en-US"
 * )
 * // "5 items"
 * ```
 */
export function formatMessage(
  template: string,
  values: Record<string, string | number>,
  locale: string
): string {
  // Handle plural syntax: {varName, plural, one {...} other {...}}
  const pluralRegex = /\{(\w+),\s*plural,([^}]+(?:\{[^}]*\}[^}]*)+)\}/g

  let result = template.replace(pluralRegex, (_, varName, pluralParts) => {
    const count = Number(values[varName])
    const category = pluralCategory(count, locale)

    // Parse plural options
    const options: Record<string, string> = {}
    const optionRegex = /(=\d+|zero|one|two|few|many|other)\s*\{([^}]*)\}/g
    let match
    while ((match = optionRegex.exec(pluralParts)) !== null) {
      options[match[1]] = match[2]
    }

    // Check for exact match first (=0, =1, etc.)
    const exactMatch = options[`=${count}`]
    if (exactMatch !== undefined) {
      return exactMatch.replace(/#/g, String(count));
    }

    // Fall back to plural category
    const selected = options[category] || options.other || ""
    return selected.replace(/#/g, String(count));
  })

  // Handle simple interpolation: {variable}
  result = result.replace(/\{(\w+)\}/g, (_, varName) => {
    const value = values[varName]
    return value !== undefined ? String(value) : `{${varName}}`
  })

  return result
}

// =============================================================================
// List Formatting
// =============================================================================

/**
 * Format a list of items with locale-appropriate conjunctions.
 *
 * @example
 * ```ts
 * formatList(["Apple", "Banana", "Orange"], "en-US", "conjunction")
 * // "Apple, Banana, and Orange"
 *
 * formatList(["Apple", "Banana", "Orange"], "es-ES", "conjunction")
 * // "Apple, Banana y Orange"
 * ```
 */
export function formatList(
  items: string[],
  locale: string,
  type: "conjunction" | "disjunction" | "unit" = "conjunction"
): string {
  return new Intl.ListFormat(locale, { type, style: "long" }).format(items)
}

// =============================================================================
// Ordinal Formatting
// =============================================================================

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 * Note: Only works well for English. Other languages may need custom logic.
 *
 * @example
 * ```ts
 * ordinal(1, "en-US") // "one" (category for 1st)
 * ordinal(2, "en-US") // "two" (category for 2nd)
 * ordinal(3, "en-US") // "few" (category for 3rd)
 * ordinal(4, "en-US") // "other" (category for 4th+)
 * ```
 */
export function ordinalCategory(
  count: number,
  locale: string
): "zero" | "one" | "two" | "few" | "many" | "other" {
  return new Intl.PluralRules(locale, { type: "ordinal" }).select(count)
}

/**
 * Get English ordinal suffix.
 * For other languages, implement language-specific logic.
 */
export function englishOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// =============================================================================
// Types
// =============================================================================

export type PluralCategory = "zero" | "one" | "two" | "few" | "many" | "other"

export interface MessageCatalog {
  [key: string]: string
}

/**
 * Create a typed translation function for a message catalog.
 *
 * @example
 * ```ts
 * const messages = {
 *   "en-US": { greeting: "Hello!", count: "{n, plural, one {# item} other {# items}}" },
 *   "es-ES": { greeting: "¡Hola!", count: "{n, plural, one {# artículo} other {# artículos}}" }
 * }
 *
 * const t = createTranslator(messages, "en-US")
 * t("greeting") // "Hello!"
 * t("count", { n: 5 }) // "5 items"
 * ```
 */
export function createTranslator<T extends Record<string, MessageCatalog>>(
  catalogs: T,
  locale: keyof T,
  fallbackLocale?: keyof T
) {
  const messages = catalogs[locale] || catalogs[fallbackLocale!] || {}
  const fallback = fallbackLocale ? catalogs[fallbackLocale] : undefined

  return function t(
    key: keyof T[keyof T],
    values?: Record<string, string | number>
  ): string {
    const template = messages[key as string] || fallback?.[key as string] || String(key)
    return values ? formatMessage(template, values, String(locale)) : template
  }
}
