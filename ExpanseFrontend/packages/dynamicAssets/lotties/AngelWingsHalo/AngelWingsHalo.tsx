"use client"
import { Box, useTheme } from "@mui/system"
import BaseAnimationData from "./AngelWingsHalo.json"
import {
  useLayoutEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react"
import { getLottie } from "../lottieDynamicLoader"
// ===== SHARED THEMING HOOK =====
import { useThemedLottie } from "../../theming/useThemedLottie"
import { AngelWingsHaloSchema } from "./AngelWingsHalo.expanse-lottie"
import {
  loadTheme,
  preloadThemes,
} from "../../theming/lottieGenericThemeLoader"

// ===== DYNAMIC THEME LOADER =====
// Using generic theme loader instead of component-specific one

// Type definitions - using generic types now
type ThemeVariant = string
type ThemeName = string

/**
 * Theme prop type - accepts preset theme names or custom hex colors
 *
 * - Preset theme: One of the predefined themes from THEME_REGISTRY
 * - Custom color: Any hex color string (e.g., "#FF5733")
 * - Undefined: Use original animation colors
 *
 * Note: Using union with string allows both autocomplete for preset themes
 * and acceptance of any string for custom colors
 */
type ThemeProp = ThemeName | string | undefined

/**
 * Variant prop type - determines which theme set to use
 */
type VariantProp = ThemeVariant | undefined

export const AngelWingsHalo = forwardRef(
  (
    {
      maxWidth,
      width,
      onComplete,
      theme,
      variant = "default",
    }: {
      maxWidth?: string | number
      width?: string | number
      onComplete?: () => void
      /**
       * Theme to apply to the animation
       * - Preset theme name: "purple-light", "blue-dark", etc. (autocomplete available)
       * - Custom hex color: "#FF5733", "#667eea", etc.
       * - Undefined: Use original animation colors
       */
      theme?: ThemeProp
      /**
       * Theme variant to use
       * - "default": Standard gradient (default)
       * - "up": Vertical gradient pattern
       * - "halo-only": Only themes the halo
       */
      variant?: VariantProp
    },
    ref,
  ) => {
    const containerRef = useRef<Element>(null)
    const animationInstance = useRef<any>(null)

    // Memoize themeLoader to prevent unnecessary re-renders
    const themeLoader = useCallback(
      (animationName: string, variant: string, theme: string) =>
        loadTheme(animationName, variant, theme),
      [],
    )

    // Hook handles all theming logic
    const { themedAnimationData, isLoadingTheme } = useThemedLottie({
      animationName: "AngelWingsHalo",
      baseAnimationData: BaseAnimationData,
      unifiedSchema: AngelWingsHaloSchema,
      theme,
      variant,
      themeLoader,
    })

    // Preload opposite theme for faster switching (light ↔ dark)
    useEffect(() => {
      if (theme && !theme.startsWith("#")) {
        const isLight = theme.includes("-light")
        const oppositeTheme = isLight
          ? theme.replace("-light", "-dark")
          : theme.replace("-dark", "-light")
        preloadThemes("AngelWingsHalo", [[variant, oppositeTheme]])
      }
    }, [theme, variant])

    useEffect(() => {
      let mounted = true
      
      getLottie().then((lottie) => {
        if (!mounted || !containerRef.current || !lottie) return
        
        animationInstance.current = lottie.loadAnimation({
          container: containerRef.current as Element,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: themedAnimationData,
          initialSegment: [1, 237], // static
        })

        if (onComplete) {
          animationInstance.current.addEventListener("complete", onComplete)
        }
      })

      return () => {
        mounted = false
        if (animationInstance.current) {
          if (onComplete) {
            animationInstance.current.removeEventListener("complete", onComplete)
          }
          animationInstance.current.destroy()
        }
      }
    }, [onComplete, themedAnimationData])

    useImperativeHandle(ref, () => ({
      playAnimation: () => {
        console.log("play animation")
        animationInstance.current.goToAndPlay(0, true)
      },
    }))

    return (
      <Box
        className="angel-wings-halo-animation-container"
        ref={containerRef}
        sx={{ maxWidth, width }}
      ></Box>
    )
  },
)

AngelWingsHalo.displayName = "AngelWingsHalo"

// ===== TYPE EXPORTS =====
// Re-export utility functions from generic theme loader
export {
  loadTheme,
  preloadThemes,
} from "../../theming/lottieGenericThemeLoader"
