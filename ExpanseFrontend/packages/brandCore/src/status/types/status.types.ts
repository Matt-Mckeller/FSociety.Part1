import type { BoxProps } from "@mui/material"
import type { ReactNode } from "react"

/**
 * Layout patterns for status bar arrangement
 */
export type StatusBarLayoutPattern =
  | "staircase"       // Ascending stairs, largest bar on bottom, right-aligned
  | "staircase-left"  // Ascending stairs, left-aligned
  | "horizontal"      // Side by side, equal alignment
  | "horizontal-center" // Side by side with center bar scaled larger

/**
 * Legacy layout type for ProfileStatusDisplay
 * @deprecated Use StatusBarLayoutPattern instead
 */
export type ProfileStatusDisplayLayout = "staircase" | "horizontal"

/**
 * Visual display state affecting appearance
 * - 'active': Full opacity, always visible (default)
 * - 'interactive': Semi-transparent until hovered/clicked
 * - 'inactive': Dimmed appearance, doesn't draw attention
 */
export type StatusBarDisplayState = "active" | "interactive" | "inactive"

/**
 * @deprecated Use StatusBarDisplayState instead
 */
export type ProfileStatusDisplayState = StatusBarDisplayState

/**
 * Base props shared across status display components
 */
export interface StatusBarBaseProps {
  /** Fixed height for bars in pixels */
  barHeight?: number
  /** Visual display state */
  displayState?: StatusBarDisplayState
  /** Additional props passed to container */
  containerProps?: BoxProps
}

/**
 * Props for the flexible StatusBarDisplay component
 */
export interface StatusBarDisplayProps extends StatusBarBaseProps {
  /** Array of bar elements to display */
  bars: ReactNode[]
  /** Layout pattern */
  layout?: StatusBarLayoutPattern
  /** Gap between bars in theme spacing units */
  gap?: number
  /** Whether the component is expandable */
  expandable?: boolean
  /** Expansion trigger method */
  expansionTrigger?: "hover" | "click"
  /** Direction of expansion */
  expansionDirection?: StatusBarExpansionDirection
  /** How expansion affects layout */
  expansionBehavior?: ExpansionBehavior
  /** Initial expanded state */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Accessible label for screen readers */
  "aria-label"?: string
}

/**
 * Props for ProfileStatusDisplay (specific 3-bar profile layout)
 */
export interface ProfileStatusDisplayProps extends StatusBarBaseProps {
  /** Layout variant */
  layout?: ProfileStatusDisplayLayout
  /** Enable expand/collapse */
  expandable?: boolean
  /** Expansion trigger */
  expansionTrigger?: "hover" | "click"
  /** Expansion direction */
  expansionDirection?: StatusBarExpansionDirection
  /** Initial expanded state */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded changes */
  onExpandedChange?: (expanded: boolean) => void
}

/**
 * Direction of expansion
 */
export type StatusBarExpansionDirection = "down" | "up" | "right" | "left"

/**
 * @deprecated Use StatusBarExpansionDirection instead
 */
export type ExpansionDirection = StatusBarExpansionDirection

/**
 * Expansion behavior affecting layout stability
 * - 'inline': Expands within document flow, may cause layout shift
 * - 'overlay': Expands as overlay using absolute positioning, no shift
 * - 'reserved': Container always reserves maximum space, no shift
 */
export type ExpansionBehavior = "inline" | "overlay" | "reserved"
