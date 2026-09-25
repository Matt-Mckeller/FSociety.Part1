/**
 * Geometry utilities for logo positioning and calculations
 */

/**
 * Calculate x,y position from center point, angle, and distance
 *
 * @param centerX - Center X coordinate
 * @param centerY - Center Y coordinate
 * @param angle - Angle in degrees (0 = right, 90 = up, 180 = left, 270 = down)
 * @param distance - Distance from center
 * @returns { x, y } position
 */
export function positionFromAngle(
  centerX: number,
  centerY: number,
  angle: number,
  distance: number,
): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180
  return {
    x: centerX + Math.cos(radians) * distance,
    y: centerY - Math.sin(radians) * distance, // SVG y increases downward
  }
}

/**
 * Calculate angle from one point to another
 *
 * @param fromX - Source X
 * @param fromY - Source Y
 * @param toX - Target X
 * @param toY - Target Y
 * @returns Angle in degrees (0-360, 0 = right, 90 = up)
 */
export function angleToPoint(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): number {
  const dx = toX - fromX
  const dy = fromY - toY // Invert because SVG y increases downward
  const radians = Math.atan2(dy, dx)
  let degrees = (radians * 180) / Math.PI
  if (degrees < 0) degrees += 360
  return degrees
}

/**
 * Preset pupil gaze directions in degrees
 * 0 = right, 90 = up, 180 = left, 270 = down
 */
export const PUPIL_GAZE_DIRECTIONS = {
  /** Looking down-left toward the moon (49.5, 365) from sphere center (165, 165) */
  moon: 240, // ~arctan((365-165)/(49.5-165)) = down-left
  /** Looking up-right through the ring opening at 1 o'clock */
  "1-oclock": 60,
  /** Looking straight up */
  up: 90,
  /** Looking up-right at 45 degrees */
  "up-right": 45,
  /** Looking up-left */
  "up-left": 135,
  /** Looking down-left */
  "down-left": 225,
  /** Looking down-right */
  "down-right": 315,
  /** Looking right */
  right: 0,
  /** Looking left */
  left: 180,
} as const

export type PupilGazePreset = keyof typeof PUPIL_GAZE_DIRECTIONS

/**
 * Light direction presets in degrees
 */
export const LIGHT_DIRECTIONS = {
  "top-left": 135,
  "top-right": 45,
  top: 90,
  "bottom-left": 225,
  "bottom-right": 315,
} as const

export type LightDirectionPreset = keyof typeof LIGHT_DIRECTIONS

/**
 * Convert light direction angle to radial gradient percentages
 *
 * @param angle - Light direction in degrees (0 = right, 90 = up)
 * @returns { cx, cy, fx, fy } as percentages for radialGradient
 */
export function lightAngleToGradientPosition(angle: number): {
  cx: string
  cy: string
  fx: string
  fy: string
} {
  // Normalize to SVG coordinate system (y increases downward)
  const radians = (angle * Math.PI) / 180

  // Calculate position as offset from center (50%, 50%)
  // Light at angle X means the bright spot is at that angle from center
  const offset = 15 // How far from center (in %)
  const focusOffset = 20 // Focus point offset (slightly further)

  const cx = 50 + Math.cos(radians) * offset
  const cy = 50 - Math.sin(radians) * offset // Inverted for SVG
  const fx = 50 + Math.cos(radians) * focusOffset
  const fy = 50 - Math.sin(radians) * focusOffset

  return {
    cx: `${cx}%`,
    cy: `${cy}%`,
    fx: `${fx}%`,
    fy: `${fy}%`,
  }
}
