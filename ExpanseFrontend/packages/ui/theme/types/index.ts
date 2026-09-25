import { Theme } from "@mui/material"

export type ExpanseThemes = "primary" | "blue" | "red" | "green" | "orange"
export type ThemeMode = "light" | "dark"

export type ThemeProviderProps = {
  children: React.ReactNode
  initialTheme: ExpanseThemes
  initialThemeMode: ThemeMode
}

export interface ThemeContextProps {
  currentTheme: Theme
  setCurrentTheme: (v: Theme) => void
  lightOrDarkThemeMode: ThemeMode
  setLightOrDarkThemeMode: (v: ThemeMode) => void
  setThemeSelection: (v: ExpanseThemes) => void
  themeSelection: ExpanseThemes
  themeName: string
}
