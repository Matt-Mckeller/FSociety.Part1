/**
 * Brand Context
 *
 * Global configuration context for brand components.
 * Allows consistent theming and effects across all brand elements.
 */

"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react"
import type { BrandConfig, BrandContextValue } from "../types"

// ============================================================
// DEFAULT CONFIG
// ============================================================

const DEFAULT_BRAND_CONFIG: BrandConfig = {
  primaryColor: "#ffffff",
  secondaryColor: "#cccccc",
  accentColor: "#4a90d9",
  glowEnabled: false,
  glowIntensity: 0.6,
  shadowEnabled: true,
  animationsEnabled: true,
  defaultAnimationSpeed: 1,
  useThemeColors: true,
  themeColorMapping: {
    primary: "text",
    secondary: "text",
  },
}

// ============================================================
// CONTEXT
// ============================================================

const BrandContext = createContext<BrandContextValue | null>(null)

// ============================================================
// PROVIDER
// ============================================================

export interface BrandProviderProps {
  /** Initial configuration */
  config?: Partial<BrandConfig>
  /** MUI theme reference for color resolution */
  theme?: {
    palette?: {
      primary?: { main?: string }
      secondary?: { main?: string }
      text?: { primary?: string }
      background?: { default?: string; paper?: string }
    }
  }
  children: React.ReactNode
}

export function BrandProvider({ config, theme, children }: BrandProviderProps) {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>({
    ...DEFAULT_BRAND_CONFIG,
    ...config,
  })

  const setConfig = useCallback((newConfig: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...newConfig }))
  }, [])

  const resolveColor = useCallback(
    (colorKey: keyof BrandConfig | string): string => {
      // Direct color value
      if (colorKey.startsWith("#") || colorKey.startsWith("rgb")) {
        return colorKey
      }

      // Brand config color
      if (colorKey in brandConfig) {
        const value = brandConfig[colorKey as keyof BrandConfig]
        if (typeof value === "string") return value
      }

      // Theme color resolution
      if (brandConfig.useThemeColors && theme?.palette) {
        const mapping =
          brandConfig.themeColorMapping?.[
            colorKey as keyof typeof brandConfig.themeColorMapping
          ]
        if (mapping) {
          switch (mapping) {
            case "primary":
              return (
                theme.palette.primary?.main ??
                brandConfig.primaryColor ??
                "#ffffff"
              )
            case "secondary":
              return (
                theme.palette.secondary?.main ??
                brandConfig.secondaryColor ??
                "#cccccc"
              )
            case "text":
              return (
                theme.palette.text?.primary ??
                brandConfig.primaryColor ??
                "#ffffff"
              )
            case "background":
              return theme.palette.background?.default ?? "#000000"
          }
        }
      }

      // Fallback
      return brandConfig.primaryColor ?? "#ffffff"
    },
    [brandConfig, theme],
  )

  const value = useMemo<BrandContextValue>(
    () => ({
      config: brandConfig,
      setConfig,
      resolveColor,
    }),
    [brandConfig, setConfig, resolveColor],
  )

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
}

// ============================================================
// HOOKS
// ============================================================

/**
 * Access the brand context
 */
export function useBrandContext(): BrandContextValue {
  const context = useContext(BrandContext)
  if (!context) {
    // Return a default context if not wrapped in provider
    return {
      config: DEFAULT_BRAND_CONFIG,
      setConfig: () => {},
      resolveColor: (key) => {
        if (key.startsWith("#") || key.startsWith("rgb")) return key
        return DEFAULT_BRAND_CONFIG.primaryColor ?? "#ffffff"
      },
    }
  }
  return context
}

/**
 * Access brand config directly
 */
export function useBrandConfig(): BrandConfig {
  return useBrandContext().config
}

/**
 * Check if glow effects are enabled
 */
export function useGlowEnabled(): boolean {
  const { config } = useBrandContext()
  return config.glowEnabled ?? false
}

/**
 * Check if animations are enabled
 */
export function useAnimationsEnabled(): boolean {
  const { config } = useBrandContext()
  return config.animationsEnabled ?? true
}

/**
 * Get resolved color from brand context
 */
export function useBrandColor(colorKey: keyof BrandConfig | string): string {
  const { resolveColor } = useBrandContext()
  return resolveColor(colorKey)
}
