/**
 * @expanse/i18n
 *
 * Internationalization utilities for Expanse applications.
 * Provides locale, timezone, currency, and direction support
 * for both runtime and Storybook environments.
 *
 * @example
 * ```tsx
 * // In your app
 * import { I18nProvider, useI18n } from '@expanse/i18n'
 *
 * function App() {
 *   return (
 *     <I18nProvider locale="en-US" timezone="America/New_York" currency="USD">
 *       <YourContent />
 *     </I18nProvider>
 *   )
 * }
 *
 * function MyComponent() {
 *   const { formatCurrency, formatDate } = useI18n()
 *   return <div>{formatCurrency(1234.56)}</div>  // "$1,234.56"
 * }
 *
 * // In Storybook preview.tsx
 * import { withI18n, withDirection } from '@expanse/i18n/decorators'
 *
 * const preview = {
 *   decorators: [withI18n, withDirection, ...otherDecorators],
 *   globalTypes: {
 *     locale: { ... },
 *     timezone: { ... },
 *     currency: { ... },
 *     direction: { ... },
 *   }
 * }
 * ```
 */

// Configuration exports
export {
  // Locale
  locales,
  defaultLocale,
  localeConfigs,
  type Locale,
  type LocaleConfig,
  // Timezone
  timezones,
  defaultTimezone,
  timezoneConfigs,
  type Timezone,
  type TimezoneConfig,
  // Currency
  currencies,
  defaultCurrency,
  currencyConfigs,
  type Currency,
  type CurrencyConfig,
  // Direction
  directions,
  defaultDirection,
  getEffectiveDirection,
  type Direction,
} from "./config"

// Context exports
export {
  I18nProvider,
  useI18n,
  useI18nOptional,
  type I18nContextValue,
  type I18nProviderProps,
} from "./context"

// Decorator exports (for Storybook)
export { withI18n, withDirection } from "./decorators"

// Message formatting utilities
export {
  pluralize,
  pluralCategory,
  selectPlural,
  formatMessage,
  formatList,
  ordinalCategory,
  englishOrdinalSuffix,
  createTranslator,
  type PluralCategory,
  type MessageCatalog,
} from "./messages"
