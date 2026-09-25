"use client";
import { createElement, isValidElement, type ReactElement, type ReactNode, type ComponentType } from "react"

// =============================================================================
// Types
// =============================================================================

/** A React component type that accepts an optional MUI sx fontSize prop */
export type IconComponent = ComponentType<{ sx?: { fontSize?: number } }>

/** A value that may be a rendered element, a component type, or any renderable node */
export type IconLike = ReactNode | IconComponent

// =============================================================================
// Utility
// =============================================================================

/**
 * Safely renders icon values that may be:
 * - A React element (returned as-is)
 * - A component type, including React.memo/forwardRef wrappers (instantiated via createElement)
 * - Any other renderable node (returned as-is)
 *
 * This is needed because MUI icons are React.memo-wrapped objects, not plain functions,
 * so `typeof icon === "function"` is insufficient to detect them.
 */
export function renderIcon(icon: IconLike, iconSize: number): ReactNode {
  if (isValidElement(icon)) return icon

  if (
    typeof icon === "function" ||
    (typeof icon === "object" && icon !== null && "$$typeof" in (icon as object))
  ) {
    return createElement(icon as IconComponent, { sx: { fontSize: iconSize } })
  }

  return icon as ReactElement | string | number | null | undefined
}