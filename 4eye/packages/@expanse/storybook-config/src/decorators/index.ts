/**
 * Storybook Decorators
 *
 * Decorators wrap stories with providers and context.
 * Apply in order: i18n → direction → theme (outermost → innermost)
 */

// Types
export type { ComponentExtensionFactory } from "./types"

// Components
export { StoryWrapper } from "./StoryWrapper"

// Individual decorators
export { withExpanseTheme, createThemeDecorator, createStorybookTheme } from "./withExpanseTheme"
export { withI18n } from "./withI18n"
export { withDirection } from "./withDirection"

// Default decorator chain
import type { Decorator } from "@storybook/react"
import { withI18n } from "./withI18n"
import { withDirection } from "./withDirection"
import { withExpanseTheme } from "./withExpanseTheme"

/**
 * Standard decorator chain for @expanse packages.
 * Order: i18n → direction → theme
 */
export const decorators: Decorator[] = [withI18n, withDirection, withExpanseTheme]
