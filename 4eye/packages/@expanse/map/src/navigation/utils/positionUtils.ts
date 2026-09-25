import type { Direction, Position } from "../types"

/**
 * Direction offsets for grid navigation
 */
export const DIRECTION_OFFSETS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

/**
 * Get position key for tile registry lookup
 */
export function getPositionKey(x: number, y: number): string {
  return `${x},${y}`
}

/**
 * Calculate center position for grid
 */
export function calculateCenter(width: number, height: number): Position {
  return {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  }
}

/**
 * Check if position is within grid bounds
 */
export function isPositionInBounds(
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  return x >= 0 && x < width && y >= 0 && y < height
}

/**
 * Apply wrap-around to position
 */
export function wrapPosition(
  x: number,
  y: number,
  width: number,
  height: number
): Position {
  return {
    x: ((x % width) + width) % width,
    y: ((y % height) + height) % height,
  }
}

/**
 * Calculate new position after moving in a direction
 */
export function getNextPosition(
  current: Position,
  direction: Direction,
  gridWidth: number,
  gridHeight: number,
  wrapAround: boolean
): Position | null {
  const offset = DIRECTION_OFFSETS[direction]
  let newX = current.x + offset.x
  let newY = current.y + offset.y

  if (wrapAround) {
    return wrapPosition(newX, newY, gridWidth, gridHeight)
  }

  if (!isPositionInBounds(newX, newY, gridWidth, gridHeight)) {
    return null
  }

  return { x: newX, y: newY }
}
