/**
 * Color Palettes for Playground Demo Theme Controls
 *
 * Defines pre-configured color themes for light and dark modes.
 * Inspired by Material-UI color system and the gallery project.
 */

export type ColorThemeName =
  | "purple"
  | "blue"
  | "red"
  | "green"
  | "orange"
  | "teal"
export type ThemeMode = "light" | "dark"

export interface ColorPalette {
  main: string
  light: string
  dark: string
}

export interface ThemePalettes {
  light: ColorPalette
  dark: ColorPalette
}

export const COLOR_PALETTES: Record<ColorThemeName, ThemePalettes> = {
  purple: {
    light: {
      main: "#621890",
      light: "#9c5ec4",
      dark: "#3e105c",
    },
    dark: {
      main: "#a15bca",
      light: "#e1c2f5",
      dark: "#7b3a9b",
    },
  },
  blue: {
    light: {
      main: "#1976d2",
      light: "#4dabf5",
      dark: "#115293",
    },
    dark: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#5d99c6",
    },
  },
  red: {
    light: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    dark: {
      main: "#ef5350",
      light: "#ffcdd2",
      dark: "#e53935",
    },
  },
  green: {
    light: {
      main: "#2e7d32",
      light: "#66bb6a",
      dark: "#1b5e20",
    },
    dark: {
      main: "#66bb6a",
      light: "#c8e6c9",
      dark: "#4caf50",
    },
  },
  orange: {
    light: {
      main: "#ed6c02",
      light: "#ffa726",
      dark: "#e65100",
    },
    dark: {
      main: "#ffa726",
      light: "#ffe0b2",
      dark: "#fb8c00",
    },
  },
  teal: {
    light: {
      main: "#00796b",
      light: "#26a69a",
      dark: "#004d40",
    },
    dark: {
      main: "#26a69a",
      light: "#b2dfdb",
      dark: "#00897b",
    },
  },
}

/**
 * Get color palette for a specific theme and mode
 */
export function getColorPalette(
  theme: ColorThemeName,
  mode: ThemeMode,
): ColorPalette {
  return COLOR_PALETTES[theme][mode]
}

/**
 * Get gradient string for color circle buttons
 */
export function getThemeGradient(
  theme: ColorThemeName,
  mode: ThemeMode,
): string {
  const palette = getColorPalette(theme, mode)
  return `linear-gradient(135deg, ${palette.main} 0%, ${palette.light} 100%)`
}

/**
 * Theme display names for UI
 */
export const THEME_DISPLAY_NAMES: Record<ColorThemeName, string> = {
  purple: "Purple",
  blue: "Blue",
  red: "Red",
  green: "Green",
  orange: "Orange",
  teal: "Teal",
}
