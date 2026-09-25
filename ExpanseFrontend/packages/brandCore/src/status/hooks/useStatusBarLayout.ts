import { useMemo, useCallback } from "react"
import type { BoxProps } from "@mui/material"
import type {
  StatusBarLayoutPattern,
  StatusBarExpansionDirection,
  ExpansionBehavior,
} from "../types/status.types"

export interface UseStatusBarLayoutOptions {
  /** Layout pattern */
  layout: StatusBarLayoutPattern
  /** Expansion direction */
  direction: StatusBarExpansionDirection
  /** Expansion behavior */
  behavior: ExpansionBehavior
  /** Gap in theme spacing units */
  gap: number
  /** Number of bars */
  barCount: number
  /** Height of each bar */
  barHeight: number
  /** Whether expandable */
  expandable: boolean
}

export interface UseStatusBarLayoutReturn {
  /** Whether expansion is vertical */
  isVertical: boolean
  /** Whether direction is reversed (up/left) */
  isReverse: boolean
  /** Effective expansion direction */
  effectiveDirection: StatusBarExpansionDirection
  /** Styles for the layout wrapper */
  layoutStyles: BoxProps["sx"]
  /** Styles for the container */
  containerStyles: BoxProps["sx"]
  /** Get wrapper styles for overlay positioning */
  getOverlayStyles: (skipFirst: boolean) => BoxProps["sx"]
  /** Reserved dimensions for reserved behavior */
  reservedDimensions: { minHeight?: number; minWidth?: string }
}

/**
 * Hook for calculating status bar layout styles
 *
 * Handles layout patterns, expansion directions, and behaviors.
 * Provides computed styles for flexbox layout.
 */
export function useStatusBarLayout({
  layout,
  direction,
  behavior,
  gap,
  barCount,
  barHeight,
  expandable,
}: UseStatusBarLayoutOptions): UseStatusBarLayoutReturn {
  const isVertical = direction === "down" || direction === "up"
  const isReverse = direction === "up" || direction === "left"

  // Calculate effective direction based on layout and explicit direction
  const effectiveDirection = useMemo((): StatusBarExpansionDirection => {
    if (direction) return direction
    if (layout === "horizontal" || layout === "horizontal-center") return "right"
    return "down"
  }, [direction, layout])

  // Calculate reserved dimensions for reserved behavior
  const reservedDimensions = useMemo(() => {
    if (behavior !== "reserved") return {}

    if (isVertical) {
      // Height = barHeight * number of bars + gaps
      const gapPx = gap * 8 // theme spacing unit is 8px
      const totalHeight = barHeight * barCount + (barCount - 1) * gapPx
      return { minHeight: totalHeight }
    }

    return { minWidth: "fit-content" as const }
  }, [behavior, isVertical, barHeight, barCount, gap])

  // Layout-specific wrapper styles
  const layoutStyles = useMemo((): BoxProps["sx"] => {
    const baseStyles = {
      display: "flex",
      gap,
    }

    switch (layout) {
      case "staircase":
        return {
          ...baseStyles,
          flexDirection: isReverse ? "column-reverse" : "column",
          alignItems: "flex-end",
        }
      case "staircase-left":
        return {
          ...baseStyles,
          flexDirection: isReverse ? "column-reverse" : "column",
          alignItems: "flex-start",
        }
      case "horizontal":
        return {
          ...baseStyles,
          flexDirection: isReverse ? "row-reverse" : "row",
          alignItems: "center",
        }
      case "horizontal-center":
        return {
          ...baseStyles,
          flexDirection: isReverse ? "row-reverse" : "row",
          alignItems: "center",
        }
      default:
        return baseStyles
    }
  }, [layout, isReverse, gap])

  // Container styles based on expansion behavior
  const containerStyles = useMemo((): BoxProps["sx"] => {
    const base: BoxProps["sx"] = {
      position: "relative",
      cursor: expandable ? "pointer" : "default",
    }

    if (behavior === "reserved") {
      return { ...base, ...reservedDimensions }
    }

    return base
  }, [expandable, behavior, reservedDimensions])

  // Get overlay positioning styles
  const getOverlayStyles = useCallback(
    (skipFirst: boolean): BoxProps["sx"] => {
      if (behavior !== "overlay" || !expandable || !skipFirst) {
        return {}
      }

      if (effectiveDirection === "down") {
        return { position: "absolute", zIndex: 10, top: "100%", right: 0, pt: gap }
      }
      if (effectiveDirection === "up") {
        return { position: "absolute", zIndex: 10, bottom: "100%", right: 0, pb: gap }
      }
      if (effectiveDirection === "right") {
        return { position: "absolute", zIndex: 10, left: "100%", top: 0, pl: gap }
      }
      if (effectiveDirection === "left") {
        return { position: "absolute", zIndex: 10, right: "100%", top: 0, pr: gap }
      }

      return {}
    },
    [behavior, expandable, effectiveDirection, gap]
  )

  return {
    isVertical,
    isReverse,
    effectiveDirection,
    layoutStyles,
    containerStyles,
    getOverlayStyles,
    reservedDimensions,
  }
}
