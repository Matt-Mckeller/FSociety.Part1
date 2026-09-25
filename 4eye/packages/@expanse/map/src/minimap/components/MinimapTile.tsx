// Re-export from the refactored minimap-tile module.
// All external imports targeting this path continue to work unchanged.
export {
  MinimapTile,
  resolveTileAccent,
  FALLBACK_LEGEND_COLORS,
  MINIMAP_TILE_LABEL_OVERHEAD,
  MINIMAP_TILE_LABEL_MIN_WIDTH,
} from "./minimap-tile"
export type { MinimapTileProps, MinimapTileHoverInfo } from "./minimap-tile"
