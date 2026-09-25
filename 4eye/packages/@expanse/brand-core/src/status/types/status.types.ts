import type { BoxProps } from "@mui/material"

/**
 * Layout variants for ProfileStatusDisplay
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
 * Direction of expansion
 */
/**
 * Direction of expansion.
 *
 * Names describe the direction the *secondary bars grow* away from the
 * profile bar.
 *
 * Vertical (staircase layout):
 *   - "down-left"  — profile top-right; bars grow down + leftward
 *   - "down-right" — profile top-left; bars grow down + rightward
 *   - "up-left"    — profile bottom-right; bars grow up + leftward
 *   - "up-right"   — profile bottom-left; bars grow up + rightward
 *
 * Horizontal (horizontal layout):
 *   - "left"  — bars grow leftward
 *   - "right" — bars grow rightward
 */
export type StatusBarExpansionDirection =
  | "down-left"
  | "down-right"
  | "up-left"
  | "up-right"
  | "left"
  | "right"

/**
 * @deprecated Use StatusBarExpansionDirection instead
 */
export type ExpansionDirection = StatusBarExpansionDirection
