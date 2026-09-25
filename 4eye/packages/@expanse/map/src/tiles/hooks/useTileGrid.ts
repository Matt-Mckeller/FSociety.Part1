import { useTileContext } from "../providers/TileProvider"

/**
 * Hook to access tile grid state and actions
 */
export function useTileGrid() {
  return useTileContext()
}
