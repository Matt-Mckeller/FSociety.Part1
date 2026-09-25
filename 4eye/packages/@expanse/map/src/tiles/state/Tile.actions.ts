import { Position } from "../../navigation/types/Position.types"

/**
 * Action type constants
 */
export const TileActionTypes = {
  SET_HOVERED: "tile/SET_HOVERED",
} as const

/**
 * Tile action types
 */
export type TileAction =
  | { type: typeof TileActionTypes.SET_HOVERED; payload: Position | null }

/**
 * Action creators
 */
export const tileActions = {
  setHovered: (position: Position | null) => ({
    type: TileActionTypes.SET_HOVERED,
    payload: position,
  } as const),
}
