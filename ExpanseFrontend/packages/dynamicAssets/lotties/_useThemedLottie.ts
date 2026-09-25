"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import type { ExpanseLottie } from "../types"
import type { LottieThemeConfig } from "../theming/lottieColorMapping"
import { applyColorMapping } from "../theming/lottieColorMapping"

/**
 * Options for the useThemedLottie hook
 */
export interface UseThemedLottieOptions {
  /** Name of the animation (used for theme loading) */
  animationName: string
  /** Base animation data (original Lottie JSON) */
  baseAnimationData: any
  /** Unified schema containing element definitions */
  unifiedSchema: ExpanseLottie
  /** Theme to apply (preset name or hex color) */
  theme?: string
  /** Theme variant to use */
  variant?: string
  /** Function to load theme configuration */
  themeLoader: (
    animationName: string,
    variant: string,
    theme: string,
  ) => Promise<LottieThemeConfig>
}

/**
 * Hook for applying theming to Lottie animations
 * Handles both config-based and algorithmic theming
 */
export function useThemedLottie({
  animationName,
  baseAnimationData,
  unifiedSchema,
  theme,
  variant = "default",
  themeLoader,
}: UseThemedLottieOptions) {
  const [themedAnimationData, setThemedAnimationData] =
    useState(baseAnimationData)
  const [isLoadingTheme, setIsLoadingTheme] = useState(false)
  const failedThemesRef = useRef<Set<string>>(new Set())

  // Extract element paths from unified schema
  const elementPaths = useMemo(() => {
    const paths: Record<string, string> = {}
    for (const [elementId, element] of Object.entries(unifiedSchema.elements)) {
      paths[elementId] = element.path
    }
    return paths
  }, [unifiedSchema.elements])

  // Load and apply theme
  useEffect(() => {
    if (!theme) {
      setThemedAnimationData(baseAnimationData)
      return
    }

    // Check if this theme has previously failed
    const themeKey = `${animationName}-${variant}-${theme}`
    if (failedThemesRef.current.has(themeKey)) {
      console.warn(
        `[useThemedLottie] Skipping previously failed theme: ${themeKey}`,
      )
      return
    }

    setIsLoadingTheme(true)

    const loadThemeAsync = async () => {
      try {
        let themedData = baseAnimationData

        if (theme.startsWith("#")) {
          // Algorithmic theming for hex colors
          console.log(
            `[useThemedLottie] TODO: Applying algorithmic theming with color: ${theme}`,
          )
          // TODO: Implement algorithmic theming, or optionally just use AI to generate the theme and save it if it doesnt exist, probably better
          // themedData = applyAlgorithmicTheming(baseAnimationData, theme, elementPaths)
        } else {
          // Config-based theming
          console.log(`[useThemedLottie] Loading config-based theme: ${theme}`)
          const themeConfig = await themeLoader(animationName, variant, theme)
          console.log({ themeConfig })
          if (themeConfig) {
            console.log(`[useThemedLottie] Applying config-based theming`)
            themedData = applyColorMapping(
              baseAnimationData,
              themeConfig,
              elementPaths,
            )
          }
        }

        setThemedAnimationData(themedData)
        setIsLoadingTheme(false)
      } catch (error) {
        console.error(
          `[useThemedLottie] Failed to load theme for ${animationName}:`,
          error,
        )
        failedThemesRef.current.add(themeKey)
        setThemedAnimationData(baseAnimationData)
        setIsLoadingTheme(false)
      }
    }

    loadThemeAsync()
  }, [
    animationName,
    baseAnimationData,
    theme,
    variant,
    themeLoader,
    elementPaths,
  ])

  return {
    themedAnimationData,
    isLoadingTheme,
  }
}
