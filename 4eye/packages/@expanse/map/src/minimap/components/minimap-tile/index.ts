// Public API — all named exports that external consumers reference
export { MinimapTile } from "./MinimapTile"
export type { MinimapTileProps, MinimapTileHoverInfo } from "./types"
export { resolveTileAccent } from "./hooks/useMinimapTileColors"
export {
  FALLBACK_LEGEND_COLORS,
  MINIMAP_TILE_LABEL_OVERHEAD,
  MINIMAP_TILE_LABEL_MIN_WIDTH,
} from "./constants"
