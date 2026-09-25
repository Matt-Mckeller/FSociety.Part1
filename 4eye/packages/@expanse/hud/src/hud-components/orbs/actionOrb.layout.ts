/**
 * ActionOrb layout resolver.
 *
 * Pure helper that maps the (shape, size, showInlineLabel, labelPosition)
 * combinatorial props down to a discrete layout *mode* plus the concrete
 * pixel dimensions, padding, and effective shape needed to render.
 *
 * The four modes:
 *   - `icon-only`     : Shape-driven button with no label inside.
 *   - `right-pill`    : Capsule pill, label sits to the right of the icon.
 *   - `circle-below`  : True circle button + label rendered below it.
 *   - `oval-below`    : Stretched oval, label below; explicit shape="pill".
 */

import type { OrbShape, OrbSize, ActionOrbProps } from "./types"
import { ORB_SIZES } from "./types"

export type OrbLayoutMode =
  | "icon-only"
  | "right-pill"
  | "circle-below"
  | "oval-below"

export interface OrbLayout {
  mode: OrbLayoutMode
  /** Resolved shape after right-pill promotion. */
  effectiveShape: OrbShape
  /** Final outer width (number for px, "auto" for content-sized). */
  width: number | "auto"
  /** Final outer height in px. */
  height: number
  /** Icon glyph size in px (slightly smaller for circle-below). */
  iconSize: number
  /** Horizontal padding (MUI spacing units). */
  paddingX: number
  /** Vertical padding (MUI spacing units). */
  paddingY: number
  /** Inline label font size in px. */
  labelFontSize: number
  /** Hotkey font size in px. */
  hotkeyFontSize: number
}

const LABEL_FONT_BY_SIZE: Record<OrbSize, number> = {
  xs: 11,
  sm: 12,
  md: 13,
  lg: 15,
  xl: 17,
}

const HOTKEY_FONT_BY_SIZE: Record<OrbSize, number> = {
  xs: 9,
  sm: 10,
  md: 11,
  lg: 12,
  xl: 13,
}

/**
 * Resolve layout mode + dimensions from the orb's display props.
 */
export function resolveOrbLayout(
  props: Pick<
    ActionOrbProps,
    "shape" | "size" | "showInlineLabel" | "labelPosition"
  >,
): OrbLayout {
  const shape: OrbShape = props.shape ?? "circle"
  const size: OrbSize = props.size ?? "md"
  const showInlineLabel = !!props.showInlineLabel
  const labelPosition = props.labelPosition ?? "right"

  const sizeConfig = ORB_SIZES[size]
  const buttonHeight = sizeConfig.button

  const isBelow = showInlineLabel && labelPosition === "below"
  const isOvalBelow = isBelow && shape === "pill"
  const isCircleBelow = isBelow && !isOvalBelow
  const isRightPill = showInlineLabel && !isBelow

  let mode: OrbLayoutMode
  if (isOvalBelow) mode = "oval-below"
  else if (isCircleBelow) mode = "circle-below"
  else if (isRightPill) mode = "right-pill"
  else mode = "icon-only"

  // Width — fixed pill width when a label is shown so orbs in a row stay
  // visually consistent regardless of text length. Square for icon-only and
  // circle-below; pill shape stretches to the configured pillWidth.
  let width: number | "auto"
  if (mode === "right-pill") width = sizeConfig.pillWidth
  else if (mode === "circle-below") width = buttonHeight
  else if (mode === "oval-below") width = sizeConfig.pillWidth
  else if (shape === "pill") width = sizeConfig.pillWidth
  else width = buttonHeight

  const height =
    mode === "oval-below" ? Math.round(buttonHeight * 1.55) : buttonHeight

  const iconSize =
    mode === "circle-below"
      ? Math.round(sizeConfig.icon * 0.85)
      : sizeConfig.icon

  // Right-pill auto-promotes circle/undefined → pill capsule.
  const effectiveShape: OrbShape =
    mode === "right-pill" && (shape === "circle" || shape === undefined)
      ? "pill"
      : shape

  // Padding (MUI spacing units, 1 = 8px).
  const paddingX = mode === "icon-only" ? 0 : mode === "oval-below" ? 0.75 : 1.5
  const paddingY = mode === "oval-below" ? 0.75 : 0

  return {
    mode,
    effectiveShape,
    width,
    height,
    iconSize,
    paddingX,
    paddingY,
    labelFontSize: LABEL_FONT_BY_SIZE[size],
    hotkeyFontSize: HOTKEY_FONT_BY_SIZE[size],
  }
}

/**
 * Border radius (in px or %) for a given shape + height.
 */
export function getShapeBorderRadius(shape: OrbShape, height: number): string {
  switch (shape) {
    case "circle":
      return "50%"
    case "square":
      return "12px"
    case "diamond":
      return "8px"
    case "hexagon":
      return "25%"
    case "pill":
      return `${Math.round(height / 2)}px`
    default:
      return "50%"
  }
}

/**
 * Outer transform applied to the button (rotates diamond shape).
 */
export function getShapeTransform(shape: OrbShape): string | undefined {
  return shape === "diamond" ? "rotate(45deg)" : undefined
}

/**
 * Counter-rotation for the icon inside a rotated diamond.
 */
export function getIconCounterTransform(shape: OrbShape): string | undefined {
  return shape === "diamond" ? "rotate(-45deg)" : undefined
}
