/**
 * withI18n - Internationalization decorator for Storybook
 *
 * Wraps stories with i18n provider, configured from toolbar globals.
 * Reads `locale` from Storybook globals.
 *
 * Re-exported from @expanse/i18n.
 *
 * @example
 * ```tsx
 * import { withI18n } from "@expanse/storybook-config"
 * export const decorators = [withI18n, withExpanseTheme]
 * ```
 */

export { withI18n } from "@expanse/i18n"
