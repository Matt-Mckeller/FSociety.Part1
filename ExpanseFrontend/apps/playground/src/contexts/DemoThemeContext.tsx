"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import {
  ColorThemeName,
  ThemeMode,
  getColorPalette,
  ColorPalette,
} from "../constants/colorPalettes"

/**
 * LocalStorage key for persisting demo preferences
 */
const STORAGE_KEY = "playground-demo-preferences"

/**
 * Demo preferences stored in localStorage
 */
interface DemoPreferences {
  mode: ThemeMode
  colorTheme: ColorThemeName
  showColorMappings: boolean
  showConsoleLogs: boolean
  lastVisited: string
  preferredVariant?: "learn" | "showcase"
}

/**
 * Context value for demo theme state
 */
interface DemoThemeContextValue {
  // Light/Dark mode
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void

  // Color theme
  colorTheme: ColorThemeName
  setColorTheme: (theme: ColorThemeName) => void

  // Current colors (computed from mode + colorTheme)
  currentColors: ColorPalette

  // Advanced settings
  showColorMappings: boolean
  showConsoleLogs: boolean
  setShowColorMappings: (show: boolean) => void
  setShowConsoleLogs: (show: boolean) => void

  // Variant preference
  preferredVariant: "learn" | "showcase"
  setPreferredVariant: (variant: "learn" | "showcase") => void
}

/**
 * Default preferences
 */
const DEFAULT_PREFERENCES: DemoPreferences = {
  mode: "light",
  colorTheme: "purple",
  showColorMappings: false,
  showConsoleLogs: false,
  lastVisited: new Date().toISOString(),
  preferredVariant: "learn",
}

const DemoThemeContext = createContext<DemoThemeContextValue | undefined>(
  undefined,
)

/**
 * Provider component for demo theme state
 */
export function DemoThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light")
  const [colorTheme, setColorThemeState] = useState<ColorThemeName>("purple")
  const [showColorMappings, setShowColorMappings] = useState(false)
  const [showConsoleLogs, setShowConsoleLogs] = useState(false)
  const [preferredVariant, setPreferredVariantState] = useState<
    "learn" | "showcase"
  >("learn")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const prefs: DemoPreferences = JSON.parse(stored)
        setModeState(prefs.mode || "light")
        setColorThemeState(prefs.colorTheme || "purple")
        setShowColorMappings(prefs.showColorMappings || false)
        setShowConsoleLogs(prefs.showConsoleLogs || false)
        setPreferredVariantState(prefs.preferredVariant || "learn")
      }
    } catch (error) {
      console.error("Failed to load demo preferences:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return
    if (typeof window === "undefined") return

    try {
      const prefs: DemoPreferences = {
        mode,
        colorTheme,
        showColorMappings,
        showConsoleLogs,
        preferredVariant,
        lastVisited: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch (error) {
      console.error("Failed to save demo preferences:", error)
    }
  }, [
    mode,
    colorTheme,
    showColorMappings,
    showConsoleLogs,
    preferredVariant,
    isInitialized,
  ])

  // Computed current colors based on mode and colorTheme
  const currentColors = getColorPalette(colorTheme, mode)

  // Toggle between light and dark mode
  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  // Setters with type safety
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
  }, [])

  const setColorTheme = useCallback((theme: ColorThemeName) => {
    setColorThemeState(theme)
  }, [])

  const setPreferredVariant = useCallback((variant: "learn" | "showcase") => {
    setPreferredVariantState(variant)
  }, [])

  const value: DemoThemeContextValue = {
    mode,
    setMode,
    toggleMode,
    colorTheme,
    setColorTheme,
    currentColors,
    showColorMappings,
    showConsoleLogs,
    setShowColorMappings,
    setShowConsoleLogs,
    preferredVariant,
    setPreferredVariant,
  }

  return (
    <DemoThemeContext.Provider value={value}>
      {children}
    </DemoThemeContext.Provider>
  )
}

/**
 * Hook to use demo theme context
 */
export function useDemoTheme() {
  const context = useContext(DemoThemeContext)
  if (!context) {
    throw new Error("useDemoTheme must be used within DemoThemeProvider")
  }
  return context
}

/**
 * Hook to sync demo theme with URL query params
 * Call this in page components to enable shareable URLs
 */
export function useSyncThemeWithURL() {
  const { colorTheme, mode, setColorTheme, setMode } = useDemoTheme()

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const urlTheme = params.get("theme") as ColorThemeName | null
    const urlMode = params.get("mode") as ThemeMode | null

    if (
      urlTheme &&
      ["purple", "blue", "red", "green", "orange", "teal"].includes(urlTheme)
    ) {
      setColorTheme(urlTheme)
    }

    if (urlMode && ["light", "dark"].includes(urlMode)) {
      setMode(urlMode)
    }
  }, [])

  // Update URL when theme changes (without page reload)
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    params.set("theme", colorTheme)
    params.set("mode", mode)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, "", newUrl)
  }, [colorTheme, mode])
}
