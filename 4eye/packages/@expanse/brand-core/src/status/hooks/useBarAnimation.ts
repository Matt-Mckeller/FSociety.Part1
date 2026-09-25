"use client";
import { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import type { AnimationConfig, ProfileAnimationConfig } from "../types/animation.types"
import { DEFAULT_ANIMATION_CONFIG, PROFILE_ANIMATION_CONFIG } from "../types/animation.types"

export interface UseBarAnimationOptions {
  /** Number of bars */
  barCount: number
  /** Whether currently expanded */
  isExpanded: boolean
  /** Whether animation is enabled */
  enabled?: boolean
  /** Animation configuration */
  config?: Partial<AnimationConfig>
  /** Callback when animation completes */
  onComplete?: () => void
}

export interface UseBarAnimationReturn {
  /** Opacity values for each bar (0-1) */
  opacities: number[]
  /** Whether any animation is active */
  isAnimating: boolean
}

/**
 * Hook for managing bar opacity animations with GSAP
 *
 * Handles staggered fade in/out animations for status bars.
 * First bar is always fully visible (opacity: 1).
 *
 * @example
 * ```tsx
 * const { opacities, isAnimating } = useBarAnimation({
 *   barCount: 3,
 *   isExpanded,
 *   enabled: expandable,
 * })
 *
 * // Use opacities[i] for each bar's opacity
 * ```
 */
export function useBarAnimation({
  barCount,
  isExpanded,
  enabled = true,
  config,
  onComplete,
}: UseBarAnimationOptions): UseBarAnimationReturn {
  const mergedConfig = { ...DEFAULT_ANIMATION_CONFIG, ...config }

  // Initialize opacities: first bar always 1, rest based on expanded state
  const [opacities, setOpacities] = useState<number[]>(() =>
    Array.from({ length: barCount }, (_, i) =>
      i === 0 ? 1 : isExpanded ? 1 : 0
    )
  )

  const [isAnimating, setIsAnimating] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const opacityRefs = useRef<number[]>(opacities)

  // Keep refs in sync
  opacityRefs.current = opacities

  // Handle bar count changes
  useEffect(() => {
    if (opacities.length !== barCount) {
      setOpacities(
        Array.from({ length: barCount }, (_, i) =>
          i === 0 ? 1 : isExpanded ? 1 : 0
        )
      )
    }
  }, [barCount, isExpanded, opacities.length])

  useEffect(() => {
    if (!enabled || barCount <= 1) {
      return undefined
    }

    // Kill existing animation
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        onComplete?.()
      },
    })
    timelineRef.current = tl
    setIsAnimating(true)

    if (isExpanded) {
      // Expand: Fade in bars sequentially (skip first)
      for (let i = 1; i < barCount; i++) {
        const delay = (i - 1) * mergedConfig.staggerDelay
        const target = { value: opacityRefs.current[i] || 0 }

        tl.to(
          target,
          {
            value: 1,
            duration: mergedConfig.expandDuration,
            ease: mergedConfig.easeExpand,
            onUpdate: () => {
              const newValue = target.value
              setOpacities((prev) => {
                const next = [...prev]
                next[i] = newValue
                return next
              })
            },
          },
          delay
        )
      }
    } else {
      // Collapse: Fade out bars in reverse (skip first)
      for (let reverseIndex = 0; reverseIndex < barCount - 1; reverseIndex++) {
        const i = barCount - 1 - reverseIndex
        const delay = reverseIndex * mergedConfig.staggerDelay * 0.5
        const target = { value: opacityRefs.current[i] || 1 }

        tl.to(
          target,
          {
            value: 0,
            duration: mergedConfig.collapseDuration,
            ease: mergedConfig.easeCollapse,
            onUpdate: () => {
              const newValue = target.value
              setOpacities((prev) => {
                const next = [...prev]
                next[i] = newValue
                return next
              })
            },
          },
          delay
        )
      }
    }

    return () => {
      timelineRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, enabled, barCount, mergedConfig.staggerDelay, mergedConfig.expandDuration, mergedConfig.collapseDuration, mergedConfig.easeExpand, mergedConfig.easeCollapse, onComplete])

  return { opacities, isAnimating }
}

// ============================================================================
// Profile-specific animation hook (with color progress)
// ============================================================================

export interface UseProfileAnimationOptions {
  /** Whether currently expanded */
  isExpanded: boolean
  /** Whether animation is enabled */
  enabled?: boolean
  /** Animation configuration */
  config?: Partial<ProfileAnimationConfig>
  /** Whether to start expanded */
  defaultExpanded?: boolean
}

export interface ProfileBarAnimationState {
  /** Fill opacity (0-1) */
  fillOpacity: number
  /** Color progress (0=lighter, 1=final) */
  colorProgress: number
  /** Whether bar is visible */
  visible: boolean
}

export interface UseProfileAnimationReturn {
  /** Currency bar (bar 2) animation state */
  currency: ProfileBarAnimationState
  /** Progress bar (bar 3) animation state */
  progress: ProfileBarAnimationState
  /** Whether animating */
  isAnimating: boolean
}

/**
 * Hook for ProfileStatusDisplay animations
 *
 * Manages fill opacity and color progress for currency and progress bars.
 * Includes visibility control for the third bar (staggered appearance).
 */
export function useProfileAnimation({
  isExpanded,
  enabled = true,
  config,
  defaultExpanded = false,
}: UseProfileAnimationOptions): UseProfileAnimationReturn {
  const mergedConfig = { ...PROFILE_ANIMATION_CONFIG, ...config }

  const [currency, setCurrency] = useState<ProfileBarAnimationState>({
    fillOpacity: defaultExpanded ? 1 : 0,
    colorProgress: defaultExpanded ? 1 : 0,
    visible: true,
  })

  const [progress, setProgress] = useState<ProfileBarAnimationState>({
    fillOpacity: defaultExpanded ? 1 : 0,
    colorProgress: defaultExpanded ? 1 : 0,
    visible: defaultExpanded,
  })

  const [isAnimating, setIsAnimating] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Refs to track current values for collapse animation closure
  const currencyRef = useRef(currency)
  const progressRef = useRef(progress)
  currencyRef.current = currency
  progressRef.current = progress

  useEffect(() => {
    if (!enabled) return undefined

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    })
    timelineRef.current = tl
    setIsAnimating(true)

    if (isExpanded) {
      // Expand: Currency bar immediately with fill fade, then progress after stagger
      setCurrency((prev) => ({
        ...prev,
        fillOpacity: mergedConfig.startingFillOpacity,
        colorProgress: mergedConfig.startingColorProgress,
      }))

      const currencyTarget = {
        opacity: mergedConfig.startingFillOpacity,
        colorProgress: mergedConfig.startingColorProgress,
      }

      tl.to(
        currencyTarget,
        {
          opacity: 1,
          colorProgress: 1,
          duration: mergedConfig.expandDuration,
          ease: mergedConfig.easeExpand,
          onUpdate: () => {
            setCurrency((prev) => ({
              ...prev,
              fillOpacity: currencyTarget.opacity,
              colorProgress: currencyTarget.colorProgress,
            }))
          },
        },
        0
      )

      // Progress bar appears after stagger delay
      tl.call(
        () => {
          setProgress({
            fillOpacity: mergedConfig.startingFillOpacity,
            colorProgress: mergedConfig.startingColorProgress,
            visible: true,
          })
        },
        [],
        mergedConfig.staggerDelay
      )

      const progressTarget = {
        opacity: mergedConfig.startingFillOpacity,
        colorProgress: mergedConfig.startingColorProgress,
      }

      tl.to(
        progressTarget,
        {
          opacity: 1,
          colorProgress: 1,
          duration: mergedConfig.expandDuration,
          ease: mergedConfig.easeExpand,
          onUpdate: () => {
            setProgress((prev) => ({
              ...prev,
              fillOpacity: progressTarget.opacity,
              colorProgress: progressTarget.colorProgress,
            }))
          },
        },
        mergedConfig.staggerDelay
      )
    } else {
      // Collapse: Progress fades first, then currency
      const progressTarget = {
        opacity: progressRef.current.fillOpacity,
        colorProgress: progressRef.current.colorProgress,
      }

      tl.to(
        progressTarget,
        {
          opacity: 0,
          colorProgress: 0,
          duration: mergedConfig.collapseDuration,
          ease: mergedConfig.easeCollapse,
          onUpdate: () => {
            setProgress((prev) => ({
              ...prev,
              fillOpacity: progressTarget.opacity,
              colorProgress: progressTarget.colorProgress,
            }))
          },
        },
        0
      )

      const currencyTarget = {
        opacity: currencyRef.current.fillOpacity,
        colorProgress: currencyRef.current.colorProgress,
      }

      tl.to(
        currencyTarget,
        {
          opacity: 0,
          colorProgress: 0,
          duration: mergedConfig.collapseDuration,
          ease: mergedConfig.easeCollapse,
          onUpdate: () => {
            setCurrency((prev) => ({
              ...prev,
              fillOpacity: currencyTarget.opacity,
              colorProgress: currencyTarget.colorProgress,
            }))
          },
        },
        mergedConfig.staggerDelay * 0.5
      )

      // Hide progress after fade
      tl.call(
        () => {
          setProgress((prev) => ({ ...prev, visible: false }))
        },
        [],
        mergedConfig.collapseDuration + 0.01
      )
    }

    return () => {
      timelineRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, enabled, mergedConfig.staggerDelay, mergedConfig.expandDuration, mergedConfig.collapseDuration, mergedConfig.easeExpand, mergedConfig.easeCollapse, mergedConfig.startingFillOpacity, mergedConfig.startingColorProgress])

  return { currency, progress, isAnimating }
}
