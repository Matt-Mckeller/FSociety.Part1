"use client"

import { Box, type BoxProps } from "@mui/material"
import { type ReactNode } from "react"

// Types
import type {
  StatusBarLayoutPattern,
  StatusBarDisplayState,
  StatusBarExpansionDirection,
  ExpansionBehavior,
} from "./types/status.types"

// Hooks
import { useExpansion } from "./hooks/useExpansion"
import { useBarAnimation } from "./hooks/useBarAnimation"
import { useVisualState } from "./hooks/useVisualState"
import { useStatusBarLayout } from "./hooks/useStatusBarLayout"

// Re-export types for backward compatibility
export type {
  StatusBarLayoutPattern,
  StatusBarDisplayState,
  StatusBarExpansionDirection,
  ExpansionBehavior,
}

/**
 * Props for StatusBarDisplay component
 */
export interface StatusBarDisplayProps {
  /** Array of bar elements to display */
  bars: ReactNode[]
  /** Layout pattern */
  layout?: StatusBarLayoutPattern
  /** Fixed height for bars in pixels */
  barHeight?: number
  /** Gap between bars in theme spacing units */
  gap?: number
  /** Visual display state */
  displayState?: StatusBarDisplayState
  /** Whether expandable */
  expandable?: boolean
  /** Expansion trigger */
  expansionTrigger?: "hover" | "click"
  /** Expansion direction */
  expansionDirection?: StatusBarExpansionDirection
  /** Expansion behavior */
  expansionBehavior?: ExpansionBehavior
  /** Whether to start expanded */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Additional container props */
  containerProps?: BoxProps
  /** Accessible label */
  "aria-label"?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * StatusBarDisplay - Flexible multi-bar status display
 *
 * A generic status bar display that accepts any bar elements and supports
 * multiple layout patterns (staircase, horizontal) and expansion behaviors.
 *
 * @example
 * ```tsx
 * // Basic staircase layout
 * <StatusBarDisplay
 *   layout="staircase"
 *   bars={[
 *     <ProfileBar key="profile" />,
 *     <CurrencyBar key="currency" />,
 *     <ProgressBar key="progress" />,
 *   ]}
 * />
 *
 * // Expandable horizontal layout
 * <StatusBarDisplay
 *   layout="horizontal"
 *   expandable
 *   expansionTrigger="hover"
 *   bars={[...]}
 * />
 * ```
 */
export function StatusBarDisplay({
  bars,
  layout = "staircase",
  barHeight = 28,
  gap = 0.5,
  displayState = "active",
  expandable = false,
  expansionTrigger = "hover",
  expansionDirection,
  expansionBehavior = "inline",
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  containerProps,
  "aria-label": ariaLabel,
}: StatusBarDisplayProps) {
  // ==========================================================================
  // HOOKS
  // ==========================================================================

  // Expansion state management
  const { isExpanded, isHovered, handlers } = useExpansion({
    defaultExpanded,
    expanded: controlledExpanded,
    onExpandedChange,
    trigger: expansionTrigger,
    enabled: expandable,
  })

  // Animation state for bar opacities
  const { opacities } = useBarAnimation({
    barCount: bars.length,
    isExpanded,
    enabled: expandable,
  })

  // Visual state mapping
  const visualState = useVisualState({
    displayState,
    isHovered,
  })

  // Effective direction
  const effectiveDirection: StatusBarExpansionDirection =
    expansionDirection ||
    (layout === "horizontal" || layout === "horizontal-center" ? "right" : "down")

  // Layout calculations
  const {
    layoutStyles,
    containerStyles,
    getOverlayStyles,
  } = useStatusBarLayout({
    layout,
    direction: effectiveDirection,
    behavior: expansionBehavior,
    gap,
    barCount: bars.length,
    barHeight,
    expandable,
  })

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================

  /**
   * Render bars with proper opacity and layout
   */
  const renderBars = (skipFirst = false) => {
    const barsToRender = skipFirst ? bars.slice(1) : bars
    const startIndex = skipFirst ? 1 : 0

    // Filter to only visible bars
    const visibleBars = expandable
      ? barsToRender.filter((_, i) => startIndex + i === 0 || opacities[startIndex + i] > 0 || isExpanded)
      : barsToRender

    const wrapperStyles = getOverlayStyles(skipFirst)

    return (
      <Box sx={Object.assign({}, layoutStyles, wrapperStyles)}>
        {visibleBars.map((bar, i) => {
          const actualIndex = skipFirst ? i + 1 : i
          const opacity = opacities[actualIndex] ?? 1
          const shouldRender = actualIndex === 0 || opacity > 0 || isExpanded

          if (!shouldRender) return null

          // Scale middle bars for horizontal-center layout
          const isCenter =
            layout === "horizontal-center" &&
            bars.length >= 3 &&
            actualIndex > 0 &&
            actualIndex < bars.length - 1

          return (
            <Box
              key={actualIndex}
              sx={{
                opacity: expandable ? opacity : 1,
                transition: "opacity 0.2s ease-in-out",
                transform: isCenter ? "scale(1.15)" : "none",
                transformOrigin: "center",
              }}
            >
              {bar}
            </Box>
          )
        })}
      </Box>
    )
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <Box
      role="group"
      aria-label={ariaLabel || "Status display"}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
      onClick={handlers.onClick}
      sx={containerStyles}
      {...containerProps}
    >
      {expansionBehavior === "overlay" ? (
        // Overlay mode: first bar anchored, rest overlay
        <Box sx={{ position: "relative" }}>
          <Box>{bars[0]}</Box>
          {(isExpanded || opacities.some((o, i) => i > 0 && o > 0)) &&
            renderBars(true)}
        </Box>
      ) : (
        // Inline or reserved: render all bars normally
        renderBars(false)
      )}
    </Box>
  )
}
