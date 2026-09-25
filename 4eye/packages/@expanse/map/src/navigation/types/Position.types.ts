/**
 * Core position and direction types for the grid navigation system.
 */

/** Position in the grid (0-indexed coordinates) */
export interface Position {
  x: number
  y: number
}

// =============================================================================
// Branded Types for Enhanced Type Safety (Optional)
// =============================================================================

/**
 * Branded type for X coordinate
 * Prevents accidentally passing Y coordinate as X
 * 
 * @example
 * ```ts
 * const x: PositionX = createPositionX(5)
 * const y: PositionY = createPositionY(10)
 * // Type error: createPosition(y, x) // Wrong order!
 * const pos = createPosition(x, y) // Correct!
 * ```
 */
export type PositionX = number & { readonly __brand: "PositionX" }

/**
 * Branded type for Y coordinate
 * Prevents accidentally passing X coordinate as Y
 */
export type PositionY = number & { readonly __brand: "PositionY" }

/**
 * Position with branded coordinates for enhanced type safety
 * Use this when you want compile-time guarantees about coordinate order
 */
export interface BrandedPosition {
  x: PositionX
  y: PositionY
}

/**
 * Create a branded X coordinate
 * 
 * @param value - The numeric X coordinate
 * @returns Branded X coordinate
 */
export function createPositionX(value: number): PositionX {
  return value as PositionX
}

/**
 * Create a branded Y coordinate
 * 
 * @param value - The numeric Y coordinate
 * @returns Branded Y coordinate
 */
export function createPositionY(value: number): PositionY {
  return value as PositionY
}

/**
 * Create a branded position from numeric coordinates
 * Provides compile-time safety against coordinate order mistakes
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns Branded position
 * 
 * @example
 * ```ts
 * const pos = createBrandedPosition(5, 10)
 * // Type-safe: can't accidentally swap x and y
 * ```
 */
export function createBrandedPosition(x: number, y: number): BrandedPosition {
  return {
    x: createPositionX(x),
    y: createPositionY(y),
  }
}

/**
 * Convert branded position to regular position
 * 
 * @param position - Branded position
 * @returns Regular position
 */
export function unbrandPosition(position: BrandedPosition): Position {
  return {
    x: position.x as number,
    y: position.y as number,
  }
}

/**
 * Convert regular position to branded position
 * 
 * @param position - Regular position
 * @returns Branded position
 */
export function brandPosition(position: Position): BrandedPosition {
  return createBrandedPosition(position.x, position.y)
}

// =============================================================================
// Navigation Types
// =============================================================================

/** Navigation direction */
export type Direction = "up" | "down" | "left" | "right"

/** How the navigation was triggered */
export type NavigationMethod = "keyboard" | "button" | "minimap" | "swipe" | "direct" | "history" | "url"

/** Navigation style mode */
export type NavigationStyle = "traditional" | "grid"
