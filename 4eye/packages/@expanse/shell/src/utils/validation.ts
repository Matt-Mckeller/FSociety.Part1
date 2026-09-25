/**
 * Runtime validation utilities
 * Provides helpful error messages for configuration validation
 */

import type { Position } from '@expanse/map/navigation/types'

/**
 * Custom error class for layout validation errors
 */
export class LayoutValidationError extends Error {
  constructor(message: string, public suggestion?: string) {
    super(message)
    this.name = "LayoutValidationError"
    
    // Add suggestion to error message
    if (suggestion) {
      this.message += `\n\n💡 Suggestion: ${suggestion}`
    }

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LayoutValidationError)
    }
  }
}

/**
 * Validate a position object
 * 
 * @param position - Position to validate
 * @param context - Context for error message
 * @throws {LayoutValidationError} If position is invalid
 * 
 * @example
 * ```ts
 * validatePosition({ x: 5, y: 10 }, 'navigation')
 * // OK
 * 
 * validatePosition({ x: -1, y: 10 }, 'navigation')
 * // Throws: Invalid position...
 * ```
 */
export function validatePosition(
  position: unknown,
  context: string = "position"
): asserts position is Position {
  if (!position || typeof position !== "object") {
    throw new LayoutValidationError(
      `Invalid ${context}: expected an object with x and y coordinates`,
      "Provide a position object like { x: 0, y: 0 }"
    )
  }

  const pos = position as Partial<Position>

  if (typeof pos.x !== "number" || !Number.isFinite(pos.x)) {
    throw new LayoutValidationError(
      `Invalid ${context}: x coordinate must be a finite number, got ${pos.x}`,
      "Ensure x is a valid number (not NaN or Infinity)"
    )
  }

  if (typeof pos.y !== "number" || !Number.isFinite(pos.y)) {
    throw new LayoutValidationError(
      `Invalid ${context}: y coordinate must be a finite number, got ${pos.y}`,
      "Ensure y is a valid number (not NaN or Infinity)"
    )
  }

  if (pos.x < 0) {
    throw new LayoutValidationError(
      `Invalid ${context}: x coordinate cannot be negative (got ${pos.x})`,
      "Grid coordinates are 0-indexed. Use x >= 0"
    )
  }

  if (pos.y < 0) {
    throw new LayoutValidationError(
      `Invalid ${context}: y coordinate cannot be negative (got ${pos.y})`,
      "Grid coordinates are 0-indexed. Use y >= 0"
    )
  }

  if (!Number.isInteger(pos.x)) {
    throw new LayoutValidationError(
      `Invalid ${context}: x coordinate must be an integer (got ${pos.x})`,
      "Use Math.floor() or Math.round() to convert to integer"
    )
  }

  if (!Number.isInteger(pos.y)) {
    throw new LayoutValidationError(
      `Invalid ${context}: y coordinate must be an integer (got ${pos.y})`,
      "Use Math.floor() or Math.round() to convert to integer"
    )
  }
}

/**
 * Validate grid dimensions
 * 
 * @param width - Grid width
 * @param height - Grid height
 * @param context - Context for error message
 * @throws {LayoutValidationError} If dimensions are invalid
 */
export function validateGridDimensions(
  width: unknown,
  height: unknown,
  context: string = "grid dimensions"
): asserts width is number {
  if (typeof width !== "number" || !Number.isFinite(width)) {
    throw new LayoutValidationError(
      `Invalid ${context}: width must be a finite number, got ${width}`,
      "Provide a valid grid width (e.g., 10)"
    )
  }

  if (typeof height !== "number" || !Number.isFinite(height)) {
    throw new LayoutValidationError(
      `Invalid ${context}: height must be a finite number, got ${height}`,
      "Provide a valid grid height (e.g., 10)"
    )
  }

  if (width <= 0) {
    throw new LayoutValidationError(
      `Invalid ${context}: width must be positive (got ${width})`,
      "Grid width must be at least 1"
    )
  }

  if (height <= 0) {
    throw new LayoutValidationError(
      `Invalid ${context}: height must be positive (got ${height})`,
      "Grid height must be at least 1"
    )
  }

  if (!Number.isInteger(width)) {
    throw new LayoutValidationError(
      `Invalid ${context}: width must be an integer (got ${width})`,
      "Use Math.floor() or Math.round() to convert to integer"
    )
  }

  if (!Number.isInteger(height)) {
    throw new LayoutValidationError(
      `Invalid ${context}: height must be an integer (got ${height})`,
      "Use Math.floor() or Math.round() to convert to integer"
    )
  }

  if (width > 1000) {
    console.warn(
      `⚠️  Large grid width detected (${width}). Consider using a smaller grid for better performance.`
    )
  }

  if (height > 1000) {
    console.warn(
      `⚠️  Large grid height detected (${height}). Consider using a smaller grid for better performance.`
    )
  }
}

/**
 * Validate position is within grid bounds
 * 
 * @param position - Position to validate
 * @param width - Grid width
 * @param height - Grid height
 * @param context - Context for error message
 * @throws {LayoutValidationError} If position is out of bounds
 */
export function validatePositionInBounds(
  position: Position,
  width: number,
  height: number,
  context: string = "position"
): void {
  if (position.x >= width) {
    throw new LayoutValidationError(
      `Invalid ${context}: x coordinate ${position.x} is out of bounds (grid width: ${width})`,
      `Valid x range is 0 to ${width - 1}`
    )
  }

  if (position.y >= height) {
    throw new LayoutValidationError(
      `Invalid ${context}: y coordinate ${position.y} is out of bounds (grid height: ${height})`,
      `Valid y range is 0 to ${height - 1}`
    )
  }
}

/**
 * Validate z-index value
 * 
 * @param zIndex - Z-index to validate
 * @param context - Context for error message
 * @throws {LayoutValidationError} If z-index is invalid
 */
export function validateZIndex(
  zIndex: unknown,
  context: string = "z-index"
): asserts zIndex is number {
  if (typeof zIndex !== "number" || !Number.isFinite(zIndex)) {
    throw new LayoutValidationError(
      `Invalid ${context}: must be a finite number, got ${zIndex}`,
      "Provide a valid z-index number (e.g., 1000)"
    )
  }

  if (!Number.isInteger(zIndex)) {
    console.warn(
      `⚠️  Non-integer z-index detected (${zIndex}). Consider using integers for z-index values.`
    )
  }
}

/**
 * Validate required property exists
 * 
 * @param obj - Object to check
 * @param key - Property key
 * @param context - Context for error message
 * @throws {LayoutValidationError} If property is missing
 */
export function validateRequired<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  context: string = "configuration"
): asserts obj is T & Required<Pick<T, K>> {
  if (!(key in obj) || obj[key] === undefined || obj[key] === null) {
    throw new LayoutValidationError(
      `Missing required property '${String(key)}' in ${context}`,
      `Provide a value for '${String(key)}'`
    )
  }
}

/**
 * Create helpful error for common mistakes
 * 
 * @param message - Error message
 * @param docs - Documentation URL
 * @returns Error with documentation link
 */
export function createHelpfulError(
  message: string,
  docs?: string
): LayoutValidationError {
  return new LayoutValidationError(
    message,
    docs ? `See documentation: ${docs}` : undefined
  )
}
