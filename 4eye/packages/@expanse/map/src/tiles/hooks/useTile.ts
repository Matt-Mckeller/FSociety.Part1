"use client";
import { useCallback } from "react"
import { Position } from "../../navigation/types/Position.types"
import { useTileContext } from "../providers/TileProvider"

/**
 * Hook to manage a single tile's state
 */
export function useTile(position: Position) {
  const { dispatch, actions, isHovered } = useTileContext()
  
  const setHovered = useCallback((hovered: boolean) => {
    dispatch(actions.setHovered(hovered ? position : null))
  }, [dispatch, actions, position])
  
  return {
    isHovered: isHovered(position),
    setHovered,
  }
}
