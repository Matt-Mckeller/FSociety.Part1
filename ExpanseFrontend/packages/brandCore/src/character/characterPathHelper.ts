/**
 * Character SVG Path Helper
 *
 * Utilities for converting coordinate arrays to SVG path data strings.
 */

// Re-export types for backward compatibility
export type { PathCoordinates, ArcParameters } from "./types/path"

import type { PathCoordinates } from "./types/path"

/**
 * Convert array of points to SVG path data string.
 * Creates a path with M (moveto) for first point and L (lineto) for rest.
 *
 * @param points - Array of {x, y} coordinates
 * @returns SVG path d attribute string
 *
 * @example
 * getCharacterPathData([{x: 10, y: 20}, {x: 30, y: 40}])
 * // Returns: "M10 20 L30 40"
 */
export const getCharacterPathData = (points: PathCoordinates[]): string => {
  return points
    .map(({ x, y }, index) => (index === 0 ? `M${x} ${y}` : `L${x} ${y}`))
    .join(" ")
}
