/**
 * withExpanseTheme - Theme decorator for Storybook
 *
 * Wraps stories with MUI ThemeProvider, configured from toolbar globals.
 * Reads `mode` (light/dark) and `colorTheme` (purple, neon, etc.) from Storybook globals.
 *
 * @example
 * ```tsx
 * // Basic usage - no component extensions
 * import { withExpanseTheme } from "@expanse/storybook-config"
 * export const decorators = [withExpanseTheme]
 *
 * // With package-specific component themes
 * import { createThemeDecorator } from "@expanse/storybook-config"
 * const withTheme = createThemeDecorator((palette, color, mode) => {
 *   return createBrandCoreTheme(palette)
 * })
 * export const decorators = [withTheme]
 * ```
 */

import React from "react"
import type { Decorator } from "@storybook/react"
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import { createTheme, type Theme } from "@mui/material/styles"
import type { ThemeMode, ExpanseTheme } from "@expanse/theme"
import {
  ThemeContext,
  breakpoints,
  getComponents,
  mixins,
  spacing,
  typography,
  zIndex,
} from "@expanse/theme"
import { PALETTES, SHADOWS_BY_THEME, THEME_COLORS, THEME_MODES } from "../themeData"
import type { ComponentExtensionFactory } from "./types"
import { StoryWrapper } from "./StoryWrapper"

/**
 * Create MUI theme for storybook
 */
export function createStorybookTheme(
  color: ExpanseTheme,
  mode: ThemeMode,
  componentExtensions?: Record<string, unknown>
): Theme {
  const palette = PALETTES[color]?.[mode] ?? PALETTES.purple[mode]
  const shadows = SHADOWS_BY_THEME[color]?.[mode] ?? SHADOWS_BY_THEME.purple[mode]

  return createTheme({
    spacing,
    palette,
    mixins,
    typography,
    shadows,
    zIndex,
    breakpoints,
    components: getComponents(palette, shadows, componentExtensions ?? {}),
  })
}

/**
 * Create a theme decorator with optional component extensions.
 *
 * Pre-creates all theme combinations for performance.
 *
 * @param extensionFactory - Optional factory to create package-specific component themes
 */
export function createThemeDecorator(
  extensionFactory?: ComponentExtensionFactory
): Decorator {
  // Pre-create themes for performance
  const THEMES: Record<ExpanseTheme, Record<ThemeMode, Theme>> = {} as any

  THEME_COLORS.forEach((color) => {
    THEMES[color] = {} as Record<ThemeMode, Theme>
    THEME_MODES.forEach((mode) => {
      const palette = PALETTES[color]?.[mode] ?? PALETTES.purple[mode]
      const extensions = extensionFactory?.(palette, color, mode)
      THEMES[color][mode] = createStorybookTheme(color, mode, extensions)
    })
  })

  return (Story, context) => {
    const color = (context.globals.colorTheme || "blue") as ExpanseTheme
    const mode = (context.globals.mode || "dark") as ThemeMode
    const theme = THEMES[color]?.[mode] || THEMES.blue.dark

    const themeContextValue = {
      currentTheme: theme,
      themeMode: mode,
      themeSelection: color,
      setThemeMode: () => {},
      setThemeSelection: () => {},
      toggleThemeMode: () => {},
    }

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeContext.Provider value={themeContextValue}>
          <CssBaseline />
          <StoryWrapper>
            <Story />
          </StoryWrapper>
        </ThemeContext.Provider>
      </MuiThemeProvider>
    )
  }
}

/**
 * Default theme decorator (no component extensions).
 *
 * Use `createThemeDecorator(factory)` if your package has custom component themes.
 */
export const withExpanseTheme = createThemeDecorator()
