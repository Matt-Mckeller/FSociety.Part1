"use client";
import React, { createContext, useContext, useReducer, useMemo, ReactNode } from "react"
import { Position } from "../../navigation/types/Position.types"
import { TileGridState, initialTileGridState, tileReducer, tileActions, TileAction } from "../state"

/**
 * Tile context value shape
 */
export interface TileContextValue extends TileGridState {
  dispatch: React.Dispatch<TileAction>
  actions: typeof tileActions
  
  // Convenience helpers
  isHovered: (position: Position) => boolean
}

/**
 * Tile context
 */
const TileContext = createContext<TileContextValue | null>(null)

/**
 * Tile provider props
 */
export interface TileProviderProps {
  children: ReactNode
}

/**
 * Tile provider component
 */
export function TileProvider({ children }: TileProviderProps) {
  const [state, dispatch] = useReducer(tileReducer, initialTileGridState)
  
  const value = useMemo<TileContextValue>(() => ({
    ...state,
    dispatch,
    actions: tileActions,
    
    isHovered: (position: Position) =>
      state.hoveredPosition?.x === position.x && state.hoveredPosition?.y === position.y,
  }), [state])
  
  return (
    <TileContext.Provider value={value}>
      {children}
    </TileContext.Provider>
  )
}

/**
 * Hook to use tile context
 */
export function useTileContext(): TileContextValue {
  const context = useContext(TileContext)
  if (!context) {
    throw new Error("useTileContext must be used within TileProvider")
  }
  return context
}
