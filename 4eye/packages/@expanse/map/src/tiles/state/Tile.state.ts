import { Position } from "../../navigation/types/Position.types"

/**
 * State shape for tile grid
 * Note: Loading is handled by Next.js, not tracked here.
 */
export interface TileGridState {
  /** Currently hovered tile position */
  hoveredPosition: Position | null
}

/**
 * Initial tile grid state
 */
export const initialTileGridState: TileGridState = {
  hoveredPosition: null,
}
