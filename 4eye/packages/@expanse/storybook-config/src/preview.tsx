/**
 * Storybook Preview Configuration
 *
 * Complete preview configuration for @expanse packages.
 * Import and spread into your package's preview.tsx.
 *
 * @example
 * ```tsx
 * // Basic usage
 * import { decorators, globalTypes, parameters } from "@expanse/storybook-config/preview"
 *
 * const preview: Preview = {
 *   decorators,
 *   globalTypes,
 *   parameters,
 * }
 *
 * // With component extensions (e.g., brand-core)
 * import { createPreviewConfig } from "@expanse/storybook-config/preview"
 * import { createBrandCoreExtensions } from "@expanse/brand-core/theme"
 *
 * const preview = createPreviewConfig({
 *   extensionFactory: (palette) => createBrandCoreExtensions(palette),
 * })
 * ```
 */

import type { Preview } from "@storybook/react"
import { decorators, createThemeDecorator, withI18n, withDirection, type ComponentExtensionFactory } from "./decorators/index"
import { globalTypes, themeGlobalTypes } from "./globalTypes/index"

/**
 * Standard Storybook parameters
 */
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  // Disable Storybook's built-in backgrounds - we manage via theme
  backgrounds: {
    disable: true,
  },
  layout: "fullscreen",
}

/**
 * Options for creating a custom preview config
 */
export interface PreviewConfigOptions {
  /**
   * Factory function to create component theme extensions.
   * Called with (palette, themeName, mode) for each theme.
   */
  extensionFactory?: ComponentExtensionFactory

  /**
   * Include i18n controls (locale, timezone, currency, direction)
   * @default true
   */
  includeI18n?: boolean

  /**
   * Additional decorators to apply (after theme decorator)
   */
  additionalDecorators?: Preview["decorators"]

  /**
   * Override or extend parameters
   */
  additionalParameters?: Preview["parameters"]
}

/**
 * Create a complete Storybook preview configuration
 *
 * @param options - Configuration options
 * @returns Preview configuration object
 */
export function createPreviewConfig(options: PreviewConfigOptions = {}): Preview {
  const {
    extensionFactory,
    includeI18n = true,
    additionalDecorators = [],
    additionalParameters = {},
  } = options

  // Build decorator chain
  const themeDecorator = extensionFactory
    ? createThemeDecorator(extensionFactory)
    : createThemeDecorator()

  const previewDecorators = includeI18n
    ? [withI18n, withDirection, themeDecorator, ...additionalDecorators]
    : [themeDecorator, ...additionalDecorators]

  // Build globalTypes
  const previewGlobalTypes = includeI18n ? globalTypes : themeGlobalTypes

  return {
    decorators: previewDecorators,
    globalTypes: previewGlobalTypes,
    parameters: {
      ...parameters,
      ...additionalParameters,
    },
  }
}

// Re-export for convenience
export { decorators, globalTypes, themeGlobalTypes }
export { createThemeDecorator, withI18n, withDirection } from "./decorators"
export * from "./toolbar"
export * from "./themeData"
