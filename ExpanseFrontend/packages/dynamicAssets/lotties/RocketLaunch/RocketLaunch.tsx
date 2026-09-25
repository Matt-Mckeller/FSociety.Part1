"use client"
import { Box, useTheme } from "@mui/system"
import BaseAnimationData from "./RocketLaunchUpAndRightRed_ExpanseNamingExport.json"
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
import { RocketLaunchSchema } from "./RocketLaunch.expanse-lottie"
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
 * - Preset theme: One of the predefined themes (e.g., "purple-light", "blue-dark")
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

/**
 * Rocket Launch Animation Component
 *
 * Features a character with a rocket that launches with particle effects.
 *
 * **Theming:**
 * Two props control theming:
 * - `theme`: Color theme name (e.g., "purple-light", "blue-dark")
 * - `variant`: Theme variant ("default", "ImprovedMonochromeColoring", "ImprovedDualToneColor")
 *
 * **Theme Variants:**
 * - "default": Original style - maintains red animation's visual patterns with new color
 * - "ImprovedMonochromeColoring": AI-enhanced monochrome with optimized contrast
 * - "ImprovedDualToneColor": AI-enhanced dual-tone with complementary colors
 *
 * **Themeable Elements:**
 * - Main Character: Body, hands, head, legs (40 elements total)
 * - Rocket: Body, fins, windows, exhaust
 * - Effects: Sparkles, flames, smoke
 *
 * **Available Preset Themes:**
 * Light/Dark mode variants:
 * - "purple-light", "purple-dark"
 * - "blue-light", "blue-dark"
 * - "green-light", "green-dark"
 * - "orange-light", "orange-dark"
 * - "red-light", "red-dark"
 * - "teal-light", "teal-dark"
 *
 * @example
 * ```tsx
 * // Preset theme with default variant
 * <RocketLaunch width="500px" theme="purple-light" />
 * <RocketLaunch width="500px" theme="blue-dark" />
 *
 * // Monochrome variant with enhanced contrast
 * <RocketLaunch width="500px" theme="purple-light" variant="ImprovedMonochromeColoring" />
 *
 * // Dual-tone variant
 * <RocketLaunch width="500px" theme="purple-light" variant="ImprovedDualToneColor" />
 *
 * // Custom color (algorithmic theming)
 * <RocketLaunch width="500px" theme="#FF5733" />
 *
 * // Original colors (no theming)
 * <RocketLaunch width="500px" />
 * ```
 */
export const RocketLaunch = forwardRef(
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
       * - "default": Original style (maintains red animation's patterns)
       * - "ImprovedMonochromeColoring": AI-enhanced monochrome with better contrast
       * - "ImprovedDualToneColor": AI-enhanced dual-tone with complementary colors
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
      animationName: "RocketLaunch",
      baseAnimationData: BaseAnimationData,
      expanseLottie: RocketLaunchSchema,
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
        preloadThemes("RocketLaunch", [[variant, oppositeTheme]])
      }
    }, [theme, variant])

    useEffect(() => {
      let mounted = true
      
      getLottie().then((lottie) => {
        if (!mounted || !containerRef.current || !lottie) return
        
        animationInstance.current = lottie.loadAnimation({
          container: containerRef.current as Element,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: themedAnimationData,
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
        className="rocket-launch-animation-container"
        ref={containerRef}
        sx={{ maxWidth, width }}
      ></Box>
    )
  },
)

RocketLaunch.displayName = "RocketLaunch"

// ===== TYPE EXPORTS =====
// Re-export utility functions from generic theme loader
export {
  loadTheme,
  preloadThemes,
} from "../../theming/lottieGenericThemeLoader"
