/**
 * @expanse/storybook-config
 *
 * Shared Storybook configuration for @expanse packages.
 * Provides consistent decorators, globalTypes, and toolbar items.
 *
 * @example
 * ```tsx
 * // In your package's .storybook/preview.tsx
 * import { decorators, globalTypes, parameters } from "@expanse/storybook-config/preview"
 *
 * const preview: Preview = {
 *   decorators,
 *   globalTypes,
 *   parameters,
 * }
 *
 * export default preview
 * ```
 */

// Re-export everything from preview for convenience
export * from "./preview"

// Export individual pieces for customization
export * from "./decorators/index"
export * from "./globalTypes/index"
export * from "./toolbar"
