/**
 * Nav Item Resolution
 * 
 * Main orchestrator for resolving nav items from grid configuration.
 */

import type { MapGridNavigationConfig } from "@expanse/map"
import type { NavItemGroups, NavItemResolverOptions, NavItemResolverInput } from "./NavItemResolver.types"
import { isLeftOfCenter, isRightOfCenter, getGridCenter } from "./position"
import { filterValidTiles } from "./filters"
import { convertTilesToNavItems } from "./converters"
import { sortByProximity, limitItems } from "./sorting"

// =============================================================================
// Default Options
// =============================================================================

const DEFAULT_MAX_PER_SIDE = 6

// =============================================================================
// Options Parsing
// =============================================================================

/**
 * Legacy options shape (from AutoNavigationOptions)
 */
interface LegacyOptions {
  mode?: string
  maxItemsPerSide?: number
  includeCategories?: string[]
  excludeCategories?: string[]
  groupByCategory?: boolean
  sortFn?: (a: any, b: any) => number
}

/**
 * Check if input is legacy options shape
 */
function isLegacyOptions(input: unknown): input is LegacyOptions {
  return typeof input === "object" && input !== null && "mode" in input
}

/**
 * Parse resolver input into normalized options.
 * 
 * Handles:
 * - `"from-grid"` → default options
 * - `"from-pages"` → default options (same behavior)
 * - `"none"` → null (disabled)
 * - `false` → null (disabled)
 * - `{ mode, maxItemsPerSide, ... }` → converted from legacy shape
 * - `{ maxPerSide, ... }` → merged with defaults
 * 
 * @param input - Mode string, options object, or legacy options
 * @returns Normalized options or null if disabled
 */
export function parseNavItemResolverOptions(
  input: NavItemResolverInput | LegacyOptions | undefined
): NavItemResolverOptions | null {
  // Disabled cases
  if (input === false || input === "none" || input === undefined) {
    return null
  }

  // String modes
  if (typeof input === "string") {
    switch (input) {
      case "from-grid":
      case "from-pages":
        return { maxPerSide: DEFAULT_MAX_PER_SIDE }
      case "featured":
        return { maxPerSide: DEFAULT_MAX_PER_SIDE }
      default:
        return null
    }
  }

  // Legacy options object (has `mode` property)
  if (isLegacyOptions(input)) {
    // Check if mode is disabled
    if (input.mode === "none") {
      return null
    }
    
    return {
      maxPerSide: input.maxItemsPerSide ?? DEFAULT_MAX_PER_SIDE,
      includeCategories: input.includeCategories,
      excludeCategories: input.excludeCategories,
      groupByCategory: input.groupByCategory,
      sortFn: input.sortFn,
    }
  }

  // New options object - merge with defaults
  return {
    maxPerSide: DEFAULT_MAX_PER_SIDE,
    ...input,
  }
}

// =============================================================================
// Main Resolution Function
// =============================================================================

/**
 * Resolve nav items from grid configuration.
 * 
 * This function transforms grid tiles into nav items suitable for
 * left and right action bars. It:
 * 
 * 1. Filters out disabled/hidden/external tiles
 * 2. Applies category filters if specified
 * 3. Splits tiles into left/right groups based on grid position
 * 4. Converts tiles to nav item format
 * 5. Sorts by proximity to center
 * 6. Limits to max items per side
 * 
 * @param config - Grid navigation configuration
 * @param options - Resolution options
 * @returns Left and right nav item groups
 * 
 * @example
 * ```tsx
 * const { left, right } = resolveNavItems(gridConfig)
 * // Use in ActionBar components
 * <ActionBar anchor="left" items={left} />
 * <ActionBar anchor="right" items={right} />
 * ```
 */
export function resolveNavItems(
  config: MapGridNavigationConfig,
  options?: NavItemResolverOptions
): NavItemGroups {
  const { tiles, dimensions } = config
  const { width, height } = dimensions
  
  // Use homePosition as center if provided, otherwise geometric center
  const center = dimensions.homePosition ?? getGridCenter(width, height)

  // Step 1: Filter to valid tiles
  const validTiles = filterValidTiles(tiles, options)

  // Step 2: Split by position relative to center
  const leftTiles = validTiles.filter(tile => isLeftOfCenter(tile.position, width))
  const rightTiles = validTiles.filter(tile => isRightOfCenter(tile.position, width))

  // Step 3: Convert to nav items
  const leftItems = convertTilesToNavItems(leftTiles)
  const rightItems = convertTilesToNavItems(rightTiles)

  // Step 4: Sort by proximity to center
  const sortedLeft = sortByProximity(leftItems, center, options?.sortFn)
  const sortedRight = sortByProximity(rightItems, center, options?.sortFn)

  // Step 5: Limit to max per side
  const maxPerSide = options?.maxPerSide ?? DEFAULT_MAX_PER_SIDE
  
  return {
    left: limitItems(sortedLeft, maxPerSide),
    right: limitItems(sortedRight, maxPerSide),
  }
}
