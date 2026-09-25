/**
 * withDirection - RTL/LTR direction decorator for Storybook
 *
 * Wraps stories to apply text direction (ltr/rtl), configured from toolbar globals.
 * Reads `direction` from Storybook globals.
 *
 * Re-exported from @expanse/i18n.
 *
 * @example
 * ```tsx
 * import { withDirection } from "@expanse/storybook-config"
 * export const decorators = [withI18n, withDirection, withExpanseTheme]
 * ```
 */

export { withDirection } from "@expanse/i18n"
