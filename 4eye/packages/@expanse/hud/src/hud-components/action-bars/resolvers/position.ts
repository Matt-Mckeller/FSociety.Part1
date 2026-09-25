/**
 * Position Utilities
 * 
 * Utilities for determining tile position relative to grid center.
 */

import type { Position } from "@expanse/map"

/**
 * Check if a position is on the left side of the grid.
 * 
 * @param position - Tile position to check
 * @param gridWidth - Total width of the grid
 * @returns true if position.x < center
 */
export function isLeftOfCenter(position: Position, gridWidth: number): boolean {
  const center = Math.floor(gridWidth / 2)
  return position.x < center
}

/**
 * Check if a position is on the right side of the grid.
 * 
 * @param position - Tile position to check
 * @param gridWidth - Total width of the grid
 * @returns true if position.x > center
 */
export function isRightOfCenter(position: Position, gridWidth: number): boolean {
  const center = Math.floor(gridWidth / 2)
  return position.x > center
}

/**
 * Calculate Euclidean distance from a position to a center point.
 * Used for sorting items by proximity to grid center.
 * 
 * @param position - Position to measure from
 * @param center - Center point to measure to
 * @returns Distance as a number
 */
export function distanceFromCenter(position: Position, center: Position): number {
  const dx = position.x - center.x
  const dy = position.y - center.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Get the geometric center of a grid.
 * 
 * @param width - Grid width
 * @param height - Grid height
 * @returns Center position
 */
export function getGridCenter(width: number, height: number): Position {
  return {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  }
}
