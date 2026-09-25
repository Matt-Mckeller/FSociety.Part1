/**
 * ExpanseLogo V5 Context
 *
 * Provides settings and theming context for logo components.
 */

"use client"

import React, { createContext, useContext, useMemo } from "react"
import type { LogoSettings } from "./ExpanseLogoV5.types"

const DEFAULT_SETTINGS: LogoSettings = {
  defaultShape: "circle",
  default3DMode: true,
  defaultInteractive: true,
  enableAnimations: true,
  enable3DTransforms: true,
  reduceMotion: false,
}

const LogoSettingsContext = createContext<LogoSettings>(DEFAULT_SETTINGS)

export interface LogoSettingsProviderProps {
  children: React.ReactNode
  settings?: Partial<LogoSettings>
}

/**
 * Provider for logo settings
 *
 * Wrap your app or section to provide default settings for all logos.
 * Can be used to fetch settings from a backend.
 */
export function LogoSettingsProvider({
  children,
  settings,
}: LogoSettingsProviderProps) {
  const mergedSettings = useMemo(
    () => ({ ...DEFAULT_SETTINGS, ...settings }),
    [settings],
  )

  return (
    <LogoSettingsContext.Provider value={mergedSettings}>
      {children}
    </LogoSettingsContext.Provider>
  )
}

/**
 * Hook to access logo settings
 */
export function useLogoSettings(): LogoSettings {
  return useContext(LogoSettingsContext)
}

/**
 * Hook to check if reduce motion is preferred
 */
export function useReducedMotion(): boolean {
  const settings = useLogoSettings()

  // Check both context setting and system preference
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return settings.reduceMotion || prefersReducedMotion
}
