/**
 * Tile to Nav Item Conversion
 * 
 * Convert tile configurations to nav item format.
 */

import type { TileConfig } from "@expanse/map"
import type { SimpleBarItem } from "../components/SimpleBar"
import type { SvgIconComponent } from "@mui/icons-material"

/**
 * Convert a tile configuration to a nav item.
 * 
 * Extracts the relevant display properties from a tile
 * and formats them for use in ActionBar components.
 * 
 * @param tile - Source tile configuration
 * @returns Nav item ready for ActionBar
 */
export function convertTileToNavItem(tile: TileConfig): SimpleBarItem {
  return {
    id: tile.id,
    // Cast icon to expected type - TileConfig uses ElementType, SimpleBarItem expects SvgIconComponent
    icon: tile.display.icon as SvgIconComponent,
    label: tile.display.label,
    position: tile.position,
    hoverColor: tile.display.colors.hover ?? tile.display.colors.active,
  }
}

/**
 * Convert multiple tiles to nav items.
 * 
 * @param tiles - Array of tile configurations
 * @returns Array of nav items
 */
export function convertTilesToNavItems(tiles: readonly TileConfig[]): SimpleBarItem[] {
  return tiles.map(convertTileToNavItem)
}
