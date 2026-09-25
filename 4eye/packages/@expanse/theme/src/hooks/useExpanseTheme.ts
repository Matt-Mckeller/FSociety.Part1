"use client"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import type { ThemeContextProps } from "../types"

/**
 * Hook to access theme context.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { themeMode, themeSelection, setThemeMode, toggleThemeMode } = useExpanseTheme();
 *
 *   return (
 *     <button onClick={toggleThemeMode}>
 *       Current mode: {themeMode}
 *     </button>
 *   );
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 */
export function useExpanseTheme(): ThemeContextProps {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "useExpanseTheme must be used within a ThemeProvider. " +
        "Make sure your component is wrapped in <ThemeProvider>."
    )
  }

  return context
}

/**
 * Hook to get just the current theme mode (light/dark).
 * Lightweight alternative when you only need mode info.
 */
export function useThemeMode() {
  const { themeMode, setThemeMode, toggleThemeMode } = useExpanseTheme()
  return { themeMode, setThemeMode, toggleThemeMode }
}

/**
 * Hook to get just the current theme selection (color).
 * Lightweight alternative when you only need color info.
 */
export function useThemeSelection() {
  const { themeSelection, setThemeSelection } = useExpanseTheme()
  return { themeSelection, setThemeSelection }
}
