// Types
// Note: PageRegistry is exported from ./components to avoid duplicate export
export type {
  TileVariant,
  TileState,
  TileProps,
  TileGridVariant,
  TileGridProps,
} from "./types"

// State
export type { TileGridState, TileAction } from "./state"
export { TileActionTypes, tileActions, initialTileGridState, tileReducer } from "./state"

// Providers
export { TileProvider, useTileContext } from "./providers"
export type { TileProviderProps } from "./providers"

// Hooks
export { useTileGrid, useTile } from "./hooks"

// Components
export { Tile, TileGrid, TileContent, TileSkeleton } from "./components"
export type { TileContentProps } from "./components"
