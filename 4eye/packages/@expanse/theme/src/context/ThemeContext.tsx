"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from "@mui/material"
import type {
  ExpanseTheme,
  ThemeContextProps,
  ThemeMode,
  ThemeProviderProps,
  InitialThemeMode,
} from "../types"
import {
  breakpoints,
  getComponents,
  mixins,
  spacing,
  typography,
  zIndex,
} from "../configs/common-theme"
import Cookies from "js-cookie"

// Import all theme configurations (palettes and shadows only - component configs are now in packages)
import {
  // Primary (purple)
  darkThemePalette,
  darkThemeEmptyShadowArray,
  lightThemePalette,
  lightThemeShadows,
  // Blue
  blueLightThemePalette,
  blueDarkThemePalette,
  // Green
  greenLightThemePalette,
  greenDarkThemePalette,
  // Orange
  orangeLightThemePalette,
  orangeDarkThemePalette,
  // Red
  redLightThemePalette,
  redDarkThemePalette,
  // Teal
  tealLightThemePalette,
  tealDarkThemePalette,
  // Gamified (vibrant game abilities)
  gamifiedDarkPalette,
  gamifiedDarkEmptyShadowArray,
  gamifiedLightPalette,
  gamifiedLightEmptyShadowArray,
  // Gamified Desaturated (Japan-style soft palette)
  gamifiedDesaturatedDarkPalette,
  gamifiedDesaturatedDarkEmptyShadowArray,
  gamifiedDesaturatedLightPalette,
  gamifiedDesaturatedLightEmptyShadowArray,
  // Neon (electric cyan/mint)
  neonDarkPalette,
  neonDarkEmptyShadowArray,
  neonLightPalette,
  neonLightEmptyShadowArray,
  // Mono (grayscale for mental health/wellness)
  monoDarkThemePalette,
  monoDarkEmptyShadowArray,
  monoLightThemePalette,
  monoLightEmptyShadowArray,
} from "../configs"

// ============================================================================
// Theme Configuration Lookups
// ============================================================================

/**
 * Lookup table for theme palettes by color and mode.
 * Eliminates deep ternary chains.
 */
const PALETTES = {
  purple: { light: lightThemePalette, dark: darkThemePalette },
  blue: { light: blueLightThemePalette, dark: blueDarkThemePalette },
  green: { light: greenLightThemePalette, dark: greenDarkThemePalette },
  orange: { light: orangeLightThemePalette, dark: orangeDarkThemePalette },
  red: { light: redLightThemePalette, dark: redDarkThemePalette },
  teal: { light: tealLightThemePalette, dark: tealDarkThemePalette },
  gamified: { light: gamifiedLightPalette, dark: gamifiedDarkPalette },
  "gamified-desaturated": { light: gamifiedDesaturatedLightPalette, dark: gamifiedDesaturatedDarkPalette },
  neon: { light: neonLightPalette, dark: neonDarkPalette },
  mono: { light: monoLightThemePalette, dark: monoDarkThemePalette },
} as const

// Note: Component configs have been moved to @expanse/brand-core and @expanse/shell.
// Use the componentExtensions prop to pass component theme overrides.

/**
 * Shadows by mode (dark mode has no shadows)
 * Note: gamified uses different shadow arrays
 */
const SHADOWS = {
  light: lightThemeShadows,
  dark: darkThemeEmptyShadowArray,
} as const

/**
 * Gamified-specific shadows (use empty arrays for both modes)
 */
const GAMIFIED_SHADOWS = {
  light: gamifiedLightEmptyShadowArray,
  dark: gamifiedDarkEmptyShadowArray,
} as const

const GAMIFIED_DESATURATED_SHADOWS = {
  light: gamifiedDesaturatedLightEmptyShadowArray,
  dark: gamifiedDesaturatedDarkEmptyShadowArray,
} as const

const NEON_SHADOWS = {
  light: neonLightEmptyShadowArray,
  dark: neonDarkEmptyShadowArray,
} as const

const MONO_SHADOWS = {
  light: monoLightEmptyShadowArray,
  dark: monoDarkEmptyShadowArray,
} as const

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Detect system color scheme preference.
 * Returns 'light' as fallback if matchMedia is unavailable (SSR).
 */
function getSystemThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * Resolve initial theme mode, handling "system" option.
 */
function resolveInitialMode(mode: InitialThemeMode): ThemeMode {
  if (mode === "system") {
    return getSystemThemeMode()
  }
  return mode
}

/**
 * Create MUI theme for a given color and mode combination.
 * 
 * @param color - The theme color (purple, blue, etc.)
 * @param mode - Light or dark mode
 * @param extensions - Component theme extensions (from @expanse/brand-core, @expanse/shell, etc.)
 */
function createExpanseTheme(
  color: ExpanseTheme, 
  mode: ThemeMode,
  extensions?: Record<string, unknown>
): Theme {
  const palette = PALETTES[color]?.[mode] ?? PALETTES.purple[mode]
  const shadows = getShadowsForTheme(color, mode)

  return createTheme({
    spacing,
    palette,
    mixins,
    typography,
    components: getComponents(palette, shadows, extensions ?? {}),
    shadows,
    zIndex,
    breakpoints,
  })
}

/**
 * Get shadows array for a given theme and mode.
 * Some themes (gamified, neon, mono) use empty shadow arrays.
 */
function getShadowsForTheme(color: ExpanseTheme, mode: ThemeMode) {
  switch (color) {
    case "gamified":
      return GAMIFIED_SHADOWS[mode]
    case "gamified-desaturated":
      return GAMIFIED_DESATURATED_SHADOWS[mode]
    case "neon":
      return NEON_SHADOWS[mode]
    case "mono":
      return MONO_SHADOWS[mode]
    default:
      return SHADOWS[mode]
  }
}

// ============================================================================
// Cookie Persistence
// ============================================================================

const COOKIE_KEYS = {
  theme: "expanse-theme",
  mode: "expanse-mode",
} as const

function getSavedTheme(): ExpanseTheme | null {
  const saved = Cookies.get(COOKIE_KEYS.theme) as ExpanseTheme | undefined
  if (saved && saved in PALETTES) return saved
  return null
}

function getSavedMode(): ThemeMode | null {
  const saved = Cookies.get(COOKIE_KEYS.mode) as ThemeMode | undefined
  if (saved === "light" || saved === "dark") return saved
  return null
}

function saveTheme(theme: ExpanseTheme): void {
  Cookies.set(COOKIE_KEYS.theme, theme, { expires: 365 })
}

function saveMode(mode: ThemeMode): void {
  Cookies.set(COOKIE_KEYS.mode, mode, { expires: 365 })
}

// ============================================================================
// Context
// ============================================================================

export const ThemeContext = React.createContext<ThemeContextProps | null>(null)

// ============================================================================
// Provider Component
// ============================================================================

/**
 * ThemeProvider - Provides theme context with color and mode switching.
 *
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // With explicit settings
 * <ThemeProvider initialTheme="blue" initialThemeMode="dark">
 *   <App />
 * </ThemeProvider>
 *
 * // With system preference detection
 * <ThemeProvider initialTheme="purple" initialThemeMode="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  initialTheme = "purple",
  initialThemeMode = "light",
  componentExtensions,
}: ThemeProviderProps) {
  // Resolve "system" mode on mount
  const resolvedInitialMode = useMemo(
    () => resolveInitialMode(initialThemeMode),
    // Only compute once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // State for color theme selection
  const [themeSelection, setThemeSelectionState] = useState<ExpanseTheme>(() => {
    // Check for saved preference first
    return getSavedTheme() ?? initialTheme
  })

  // State for light/dark mode
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    // Check for saved preference first
    return getSavedMode() ?? resolvedInitialMode
  })

  // Create theme object (memoized on color + mode + extensions changes)
  const currentTheme = useMemo(
    () => createExpanseTheme(themeSelection, themeMode, componentExtensions?.[themeMode]),
    [themeSelection, themeMode, componentExtensions]
  )

  // Set theme selection with persistence
  const setThemeSelection = useCallback((theme: ExpanseTheme) => {
    setThemeSelectionState(theme)
    saveTheme(theme)
  }, [])

  // Set theme mode with persistence
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode)
    saveMode(mode)
  }, [])

  // Toggle between light and dark
  const toggleThemeMode = useCallback(() => {
    setThemeModeState((current) => {
      const newMode = current === "light" ? "dark" : "light"
      saveMode(newMode)
      return newMode
    })
  }, [])

  // Listen for system preference changes when initialThemeMode is "system"
  useEffect(() => {
    if (initialThemeMode !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually changed the mode
      const savedMode = getSavedMode()
      if (!savedMode) {
        setThemeModeState(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [initialThemeMode])

  // Context value
  const value = useMemo<ThemeContextProps>(
    () => ({
      currentTheme,
      themeMode,
      themeSelection,
      setThemeMode,
      setThemeSelection,
      toggleThemeMode,
    }),
    [currentTheme, themeMode, themeSelection, setThemeMode, setThemeSelection, toggleThemeMode]
  )

  return (
    <MuiThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

// ============================================================================
// Re-export for backwards compatibility
// ============================================================================

// These are deprecated but kept for existing code that may use them
/** @deprecated Use themeMode instead */
export type { ThemeMode as LightOrDarkThemeMode }
