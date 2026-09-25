"use client"

import { useMemo } from "react"
import type { SxProps, Theme } from "@mui/material"
import type { TransitionConfig } from "./types"

/**
 * Generate transition animation styles for page content.
 *
 * @example
 * ```tsx
 * const transitionStyles = useLayoutTransition({
 *   type: "fade",
 *   duration: 250,
 *   withScale: true,
 * })
 *
 * return (
 *   <Box key={pageKey} sx={{ ...transitionStyles }}>
 *     {pageContent}
 *   </Box>
 * )
 * ```
 */
export function useLayoutTransition(config: TransitionConfig = {}): SxProps<Theme> {
  const { type = "fade", duration = 250, withScale = false } = config

  return useMemo(() => {
    if (type === "none") return {}

    const durationMs = `${duration}ms`
    const scaleFrom = withScale ? "scale(0.95)" : "scale(1)"
    const scaleTo = "scale(1)"

    const baseTransition = `opacity ${durationMs} ease`
    const transformTransition = withScale ? `, transform ${durationMs} ease` : ""

    return {
      transition: baseTransition + transformTransition,
      "@keyframes fadeIn": {
        from: { opacity: 0, transform: scaleFrom },
        to: { opacity: 1, transform: scaleTo },
      },
      animation: `fadeIn ${durationMs} ease`,
    }
  }, [type, duration, withScale])
}

/**
 * Generate page key for triggering transitions on navigation.
 *
 * @example
 * ```tsx
 * const { position } = useNavigation()
 * const pageKey = usePageKey(position)
 *
 * return <Box key={pageKey}>{content}</Box>
 * ```
 */
export function usePageKey(position: { x: number; y: number }): string {
  return useMemo(() => `${position.x}-${position.y}`, [position.x, position.y])
}
