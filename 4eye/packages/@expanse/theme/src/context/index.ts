export { ThemeProvider, ThemeContext } from "./ThemeContext"

// Re-export hooks from hooks module for convenience
export { useExpanseTheme, useThemeMode, useThemeSelection } from "../hooks/useExpanseTheme"

/**
 * @deprecated Use useExpanseTheme instead
 */
export { useExpanseTheme as useThemeContext } from "../hooks/useExpanseTheme"
