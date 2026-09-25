"use client"
import { Box } from "@mui/system"
import type { AnimationItem } from "lottie-web"
import {
  useLayoutEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react"
import { getLottie } from "../lotties/lottieDynamicLoader"
import { useThemedLottie } from "./useThemedLottie"
import { loadTheme, preloadThemes } from "./lottieGenericThemeLoader"
import type { ExpanseLottie } from "../types"

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props accepted by all Lottie animation components created by the factory
 */
export interface LottieComponentProps {
  /** Maximum width of the animation container */
  maxWidth?: string | number
  /** Width of the animation container */
  width?: string | number
  /** Height of the animation container */
  height?: string | number
  /** Callback fired when animation completes (only for non-looping animations) */
  onComplete?: () => void
  /**
   * Theme to apply to the animation
   * - Preset theme name: "purple-light", "blue-dark", etc.
   * - Custom hex color: "#FF5733", "#667eea", etc.
   * - Undefined: Use original animation colors
   */
  theme?: string
  /**
   * Theme variant to use (e.g., "default", "minimal", "halo-only")
   * @default "default"
   */
  variant?: string
  /** Whether to loop the animation */
  loop?: boolean
  /** Whether to autoplay the animation */
  autoplay?: boolean
  /** Additional CSS class name */
  className?: string
}

/**
 * Ref handle exposed by Lottie animation components
 */
export interface LottieComponentRef {
  /** Play the animation from the beginning */
  playAnimation: () => void
  /** Pause the animation */
  pause: () => void
  /** Resume the animation */
  resume: () => void
  /** Stop the animation */
  stop: () => void
  /** Go to a specific frame */
  goToFrame: (frame: number, isFrame?: boolean) => void
  /** Get the underlying Lottie animation instance */
  getAnimationInstance: () => AnimationItem | null
}

/**
 * Configuration for creating a Lottie animation component
 */
export interface LottieComponentConfig {
  /** Name of the animation (used for theme loading and display) */
  animationName: string
  /** Base animation JSON data */
  baseAnimationData: any
  /** ExpanseLottie schema containing element definitions for theming */
  schema: ExpanseLottie
  /** Default variant to use if none specified */
  defaultVariant?: string
  /** Default loop setting */
  defaultLoop?: boolean
  /** Default autoplay setting */
  defaultAutoplay?: boolean
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

/**
 * Factory function to create themed Lottie animation components
 *
 * This dramatically reduces boilerplate - each animation component goes from
 * ~150 lines to ~10 lines while maintaining full functionality.
 *
 * @example
 * ```tsx
 * // In Homework.tsx
 * import { createLottieComponent } from "../../theming/createLottieComponent"
 * import BaseAnimationData from "./Homework.json"
 * import { HomeworkSchema } from "./Homework.expanse-lottie"
 *
 * export const Homework = createLottieComponent({
 *   animationName: "Homework",
 *   baseAnimationData: BaseAnimationData,
 *   schema: HomeworkSchema,
 * })
 * ```
 *
 * @example
 * ```tsx
 * // Usage in app
 * <Homework width="400px" theme="purple-light" variant="default" />
 * <Homework width="400px" theme="#FF5733" /> // Custom color
 * ```
 */
export function createLottieComponent(
  config: LottieComponentConfig,
): ForwardRefExoticComponent<
  LottieComponentProps & RefAttributes<LottieComponentRef>
> {
  const {
    animationName,
    baseAnimationData,
    schema,
    defaultVariant = "default",
    defaultLoop = true,
    defaultAutoplay = true,
  } = config

  const Component = forwardRef<LottieComponentRef, LottieComponentProps>(
    (
      {
        maxWidth,
        width,
        height,
        onComplete,
        theme,
        variant = defaultVariant,
        loop = defaultLoop,
        autoplay = defaultAutoplay,
        className,
      },
      ref,
    ) => {
      const containerRef = useRef<HTMLDivElement>(null)
      const animationInstance = useRef<AnimationItem | null>(null)

      // Memoize themeLoader to prevent unnecessary re-renders
      const themeLoader = useCallback(
        (animName: string, variantName: string, themeName: string) =>
          loadTheme(animName, variantName, themeName),
        [],
      )

      // Hook handles all theming logic
      const { themedAnimationData } = useThemedLottie({
        animationName,
        baseAnimationData,
        expanseLottie: schema,
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
          preloadThemes(animationName, [[variant, oppositeTheme]])
        }
      }, [theme, variant])

      // Initialize and manage Lottie animation
      useEffect(() => {
        let mounted = true
        
        if (!containerRef.current) return undefined

        getLottie().then((lottie) => {
          if (!mounted || !containerRef.current || !lottie) return
          
          animationInstance.current = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop,
            autoplay,
            animationData: themedAnimationData,
          })

          if (onComplete) {
            animationInstance.current.addEventListener("complete", onComplete)
          }
        })

        return () => {
          mounted = false
          if (onComplete && animationInstance.current) {
            animationInstance.current.removeEventListener(
              "complete",
              onComplete,
            )
          }
          animationInstance.current?.destroy()
          animationInstance.current = null
        }
      }, [themedAnimationData, loop, autoplay, onComplete])

      // Expose animation control methods via ref
      useImperativeHandle(ref, () => ({
        playAnimation: () => {
          animationInstance.current?.goToAndPlay(0, true)
        },
        pause: () => {
          animationInstance.current?.pause()
        },
        resume: () => {
          animationInstance.current?.play()
        },
        stop: () => {
          animationInstance.current?.stop()
        },
        goToFrame: (frame: number, isFrame = true) => {
          animationInstance.current?.goToAndStop(frame, isFrame)
        },
        getAnimationInstance: () => animationInstance.current,
      }))

      // Generate CSS class name from animation name
      const cssClassName = `${animationName
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
        .slice(1)}-animation-container`

      return (
        <Box
          className={className || cssClassName}
          ref={containerRef}
          sx={{ maxWidth, width, height }}
        />
      )
    },
  )

  Component.displayName = animationName

  return Component
}

// ============================================================================
// RE-EXPORTS
// ============================================================================

// Re-export theme loading utilities for components that need them
export { loadTheme, preloadThemes } from "./lottieGenericThemeLoader"
