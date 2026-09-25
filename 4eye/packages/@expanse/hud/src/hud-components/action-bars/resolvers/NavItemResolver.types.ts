/**
 * Nav Item Resolver Types
 * 
 * Types for resolving nav items from grid tile configurations.
 */

import type { SimpleBarItem } from "../components/SimpleBar"

// =============================================================================
// Output Types
// =============================================================================

/**
 * Nav items grouped by position relative to grid center.
 * Used to populate left and right action bars in templates.
 */
export interface NavItemGroups {
  /** Items for left sidebar (tiles positioned left of grid center) */
  left: SimpleBarItem[]
  /** Items for right sidebar (tiles positioned right of grid center) */
  right: SimpleBarItem[]
}

// =============================================================================
// Options Types
// =============================================================================

/**
 * Options for resolving nav items from tiles.
 */
export interface NavItemResolverOptions {
  /** Include only tiles matching these categories */
  includeCategories?: string[]
  /** Exclude tiles matching these categories */
  excludeCategories?: string[]
  /** Maximum items per sidebar (default: 6) */
  maxPerSide?: number
  /** Group items by category */
  groupByCategory?: boolean
  /** Custom sort function for ordering items */
  sortFn?: (a: SimpleBarItem, b: SimpleBarItem) => number
}

/**
 * Shorthand modes for common resolution configurations.
 * 
 * - `"from-grid"`: Resolve from all valid tiles in the grid
 * - `"from-pages"`: Resolve from page registry (same as from-grid for now)
 * - `"featured"`: Only include tiles marked as featured (future)
 * - `"none"`: Disable automatic resolution
 * - `false`: Disable automatic resolution
 */
export type NavItemResolverMode = 
  | "from-grid" 
  | "from-pages" 
  | "featured" 
  | "none" 
  | false

/**
 * Input type that accepts either mode string or full options.
 */
export type NavItemResolverInput = NavItemResolverMode | NavItemResolverOptions
