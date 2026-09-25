/**
 * ActionButton Types
 *
 * Types for the individual button component used in Action Bars.
 */

import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

// =============================================================================
// Re-exports for convenience
// =============================================================================

export type { SxProps, Theme }

// =============================================================================
// Label Display
// =============================================================================

/**
 * How labels are displayed with buttons
 */
export type ActionButtonLabelDisplay =
  | "icon-only"        // Default - icon without text
  | "icon-label-below" // Icon with label text below
  | "icon-label-right" // Icon with label text beside (horizontal)
  | "label-only"       // Text only, no icon

/**
 * Label text size
 */
export type ActionButtonLabelSize = "xs" | "sm" | "md"

/**
 * Label size to font size mapping
 */
export const LABEL_SIZE_PX: Record<ActionButtonLabelSize, number> = {
  xs: 10,
  sm: 11,
  md: 12,
}

// =============================================================================
// Button Size
// =============================================================================

/**
 * Button size variants
 */
export type ActionButtonSize = "xxs" | "xs" | "sm" | "md" | "lg"

/**
 * Button size to pixel mapping
 */
export const BUTTON_SIZE_PX: Record<ActionButtonSize, number> = {
  xxs: 28,
  xs: 32,
  sm: 36,
  md: 40,
  lg: 48,
}

// =============================================================================
// Active Shape
// =============================================================================

/**
 * Shape of the active/selected background highlight
 */
export type ActionButtonActiveShape =
  | "rounded"   // Default - slightly rounded corners
  | "circle"    // Circular/pill background
  | "square"    // Sharp square corners
  | "diamond"   // Rotated square (diamond shape)
  | "triangle"  // Triangle pointing up

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for ActionButton component
 */
export interface ActionButtonProps {
  /** Icon to display */
  icon?: ReactNode

  /** Alternative icon when active/on (for toggles) */
  iconOn?: ReactNode

  /** Button label (shown in tooltip, and optionally visually) */
  label: string

  /** Value identifier (used by ActionGroup for selection) */
  value?: string

  /** Click handler */
  onClick?: () => void

  /** Whether button is disabled */
  disabled?: boolean

  /** Whether button shows active state (controlled by ActionGroup or manually) */
  active?: boolean

  /** Badge content (number or string) */
  badge?: number | string

  /** Badge color */
  badgeColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success"

  /** Button size (default: 'md') */
  size?: ActionButtonSize

  /** Label display mode (default: 'icon-only') */
  labelDisplay?: ActionButtonLabelDisplay

  /** Label text size when shown (default: 'xs') */
  labelSize?: ActionButtonLabelSize

  /** Tooltip placement */
  tooltipPlacement?: "top" | "bottom" | "left" | "right"

  /** Color mode override (default: auto from theme) */
  colorMode?: "auto" | "dark" | "light"

  /** Shape of the active/selected background highlight (default: 'rounded') */
  activeShape?: ActionButtonActiveShape

  /** Additional styles */
  sx?: SxProps<Theme>
}
