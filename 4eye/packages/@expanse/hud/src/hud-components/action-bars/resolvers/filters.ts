/**
 * Tile Filtering
 * 
 * Filter tiles based on visibility, behavior, and category options.
 */

import type { TileConfig } from "@expanse/map"
import type { NavItemResolverOptions } from "./NavItemResolver.types"

/**
 * Filter tiles to only include those valid for nav bar display.
 * 
 * Excludes:
 * - Disabled tiles (behavior.disabled)
 * - Hidden tiles (behavior.hidden)
 * - External link tiles (behavior.external)
 * - Tiles not matching category filters
 * 
 * @param tiles - All tiles from grid config
 * @param options - Optional filter criteria
 * @returns Filtered array of valid tiles
 */
export function filterValidTiles(
  tiles: readonly TileConfig[],
  options?: Partial<NavItemResolverOptions>
): TileConfig[] {
  // First pass: exclude disabled, hidden, and external tiles
  let filtered = tiles.filter(tile => {
    if (tile.behavior?.disabled) return false
    if (tile.behavior?.hidden) return false
    if (tile.behavior?.external) return false
    return true
  })

  // Apply category inclusion filter
  if (options?.includeCategories?.length) {
    const include = options.includeCategories
    filtered = filtered.filter(tile => 
      tile.display.category && include.includes(tile.display.category)
    )
  }
  
  // Apply category exclusion filter
  if (options?.excludeCategories?.length) {
    const exclude = options.excludeCategories
    filtered = filtered.filter(tile => 
      !tile.display.category || !exclude.includes(tile.display.category)
    )
  }

  return filtered
}
