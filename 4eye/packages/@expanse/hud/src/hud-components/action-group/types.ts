/**
 * ActionGroup Types
 *
 * Types for the selection group component that wraps ActionButtons.
 */

import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

// =============================================================================
// Selection Mode
// =============================================================================

/**
 * Selection behavior for the group
 */
export type ActionGroupMode =
  | "radio"    // Single selection - one item active at a time
  | "checkbox" // Multiple selection - items can be toggled independently
  | "buttons"  // No selection state - buttons trigger actions only

// =============================================================================
// Selection Indicator
// =============================================================================

/**
 * Shape of selection indicator
 */
export type SelectionIndicatorShape =
  | "none"           // No indicator (just background highlight)
  | "circle"         // Filled circular indicator
  | "circle-outline" // Outlined circular indicator
  | "square"         // Filled square indicator
  | "square-outline" // Outlined square indicator
  | "triangle"       // Triangle pointer (points at selected)
  | "underline"      // Underline bar beneath icon
  | "dot"            // Small dot indicator
  | "ring"           // Glowing ring around icon

/**
 * Where indicator appears relative to button
 */
export type SelectionIndicatorPosition =
  | "start"    // Before button (left for horizontal, top for vertical)
  | "end"      // After button (right for horizontal, bottom for vertical)
  | "overlay"  // Overlaid on/around button (for ring, underline, background)

/**
 * Selection indicator size
 */
export type SelectionIndicatorSize = "xs" | "sm" | "md" | "lg"

/**
 * Indicator size to pixel mapping
 */
export const INDICATOR_SIZE_PX: Record<SelectionIndicatorSize, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
}

// =============================================================================
// Context Value
// =============================================================================

/**
 * Context value provided to ActionButtons within a group
 */
export interface ActionGroupContextValue {
  /** Selection mode */
  mode: ActionGroupMode

  /** Check if a value is currently active/selected */
  isActive: (value: string) => boolean

  /** Handle selection of a value */
  onSelect: (value: string) => void

  /** Indicator configuration */
  indicator?: {
    shape: SelectionIndicatorShape
    position: SelectionIndicatorPosition
    size: SelectionIndicatorSize
    color?: string
  }
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Base props shared across all modes
 */
interface ActionGroupBaseProps {
  /** Children (ActionButton components) */
  children: ReactNode

  /** Selection indicator shape (default: 'none') */
  indicator?: SelectionIndicatorShape

  /** Indicator position (default: 'overlay') */
  indicatorPosition?: SelectionIndicatorPosition

  /** Indicator size (default: 'sm') */
  indicatorSize?: SelectionIndicatorSize

  /** Indicator color (default: theme primary) */
  indicatorColor?: string

  /** Gap between items (default: 0.5) */
  gap?: number

  /** Orientation (default: inherits from parent ActionBar) */
  orientation?: "horizontal" | "vertical"

  /** Additional styles */
  sx?: SxProps<Theme>
}

/**
 * Props for radio mode (single selection)
 */
export interface ActionGroupRadioProps extends ActionGroupBaseProps {
  mode: "radio"
  /** Currently selected value */
  value: string
  /** Called when selection changes */
  onChange: (value: string) => void
  // Checkbox props not allowed
  values?: never
  onToggle?: never
}

/**
 * Props for checkbox mode (multiple selection)
 */
export interface ActionGroupCheckboxProps extends ActionGroupBaseProps {
  mode: "checkbox"
  /** Current toggle states */
  values: Record<string, boolean>
  /** Called when a toggle changes */
  onToggle: (value: string, checked: boolean) => void
  // Radio props not allowed
  value?: never
  onChange?: never
}

/**
 * Props for buttons mode (no selection state)
 */
export interface ActionGroupButtonsProps extends ActionGroupBaseProps {
  mode?: "buttons"
  // No selection props
  value?: never
  values?: never
  onChange?: never
  onToggle?: never
}

/**
 * Union type for ActionGroup props
 */
export type ActionGroupProps =
  | ActionGroupRadioProps
  | ActionGroupCheckboxProps
  | ActionGroupButtonsProps
