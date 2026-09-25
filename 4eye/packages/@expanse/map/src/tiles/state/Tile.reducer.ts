import { TileGridState } from "./Tile.state"
import { TileAction, TileActionTypes } from "./Tile.actions"

/**
 * Tile reducer
 */
export function tileReducer(state: TileGridState, action: TileAction): TileGridState {
  switch (action.type) {
    case TileActionTypes.SET_HOVERED: {
      return {
        ...state,
        hoveredPosition: action.payload,
      }
    }
    
    default:
      return state
  }
}
