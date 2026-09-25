export { Minimap, default } from "./components/Minimap"
export { useMinimap } from "./hooks/useMinimap"
export type { MinimapState } from "./hooks/useMinimap"
export * from "./types"
export { MinimapGrid } from "./variants/MinimapGrid"
export { MinimapDots } from "./variants/MinimapDots"
export { MinimapBlocks } from "./variants/MinimapBlocks"
export { MinimapOverlay } from "./components/MinimapOverlay"
export type { MinimapOverlayProps } from "./components/MinimapOverlay"
export { MinimapTile } from "./components/MinimapTile"
export type { MinimapTileProps, MinimapTileHoverInfo } from "./components/MinimapTile"
export { TileListPanel } from "./components/TileListPanel"
export type { TileListPanelProps } from "./components/TileListPanel"

// Shared internals (used by the HUD-aware MinimapPanel + MinimapFullView in @expanse/hud)
export {
  MinimapTileGrid,
  MinimapCategoryLegend,
  useMinimapLegendItems,
  MINIMAP_CATEGORY_PLACEHOLDERS,
} from "./shared"
export type {
  MinimapTileGridProps,
  MinimapTileGridHoverInfo,
  MinimapCategoryLegendProps,
  MinimapPanelLegendItem,
} from "./shared"
