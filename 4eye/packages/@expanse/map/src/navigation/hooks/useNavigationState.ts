"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import type {
  MapGridNavigationConfig,
  NavigationMethod,
  NavigationStyle,
  Position,
  TileConfig,
} from "../types"
import { DEFAULT_ROUTING_CONFIG } from "../types"
import { calculateCenter, getPositionKey } from "../utils/positionUtils"
import { getPositionFromURL } from "../utils/urlUtils"

export interface NavigationStateConfig {
  config: MapGridNavigationConfig
  initialPosition?: Position
}

export interface NavigationState {
  position: Position
  setPosition: (pos: Position) => void
  history: Position[]
  forwardHistory: Position[]
  pushHistory: (pos: Position) => void
  popHistory: () => Position | undefined
  clearForwardHistory: () => void
  pushForwardHistory: (pos: Position) => void
  popForwardHistory: () => Position | undefined
  navigationStyle: NavigationStyle
  setNavigationStyle: (style: NavigationStyle) => void
  lastNavigationMethod: React.MutableRefObject<NavigationMethod>
  homePosition: Position
  tileRegistry: Map<string, TileConfig>
  currentTile: TileConfig | null
  getTileAt: (x: number, y: number) => TileConfig | null
  isValidPosition: (x: number, y: number) => boolean
}

/**
 * Core navigation state management
 *
 * Handles position, history, tile registry, and validation.
 */
export function useNavigationState({
  config,
  initialPosition,
}: NavigationStateConfig): NavigationState {
  const gridConfig = config.dimensions
  const routing = { ...DEFAULT_ROUTING_CONFIG, ...config.routing }

  // Calculate home position (default: center)
  const homePosition = useMemo(
    () =>
      gridConfig.homePosition ||
      calculateCenter(gridConfig.width, gridConfig.height),
    [gridConfig.homePosition, gridConfig.width, gridConfig.height]
  )

  // Build tile registry for O(1) lookup
  const tileRegistry = useMemo(() => {
    const registry = new Map<string, TileConfig>()
    for (const tile of config.tiles) {
      registry.set(getPositionKey(tile.position.x, tile.position.y), tile)
    }
    return registry
  }, [config.tiles])

  // Calculate initial position
  const getInitialPosition = useCallback((): Position => {
    // 1. Explicit initialPosition prop
    if (initialPosition) return initialPosition

    // 2. From URL (if enabled)
    if (routing.initialFromUrl) {
      const urlPosition = getPositionFromURL(config)
      if (urlPosition) return urlPosition
    }

    // 3. Home position
    return homePosition
  }, [initialPosition, routing.initialFromUrl, config, homePosition])

  // State
  const [position, setPosition] = useState<Position>(getInitialPosition)
  const [history, setHistory] = useState<Position[]>([])
  const [forwardHistory, setForwardHistory] = useState<Position[]>([])
  const [navigationStyle, setNavigationStyle] = useState<NavigationStyle>("grid")

  // Refs
  const lastNavigationMethod = useRef<NavigationMethod>("direct")

  // History management
  const pushHistory = useCallback((pos: Position) => {
    setHistory((prev) => [...prev.slice(-19), pos]) // Keep last 20
  }, [])

  const popHistory = useCallback((): Position | undefined => {
    let previous: Position | undefined
    setHistory((prev) => {
      previous = prev[prev.length - 1]
      return prev.slice(0, -1)
    })
    return previous
  }, [])

  const clearForwardHistory = useCallback(() => {
    setForwardHistory([])
  }, [])

  const pushForwardHistory = useCallback((pos: Position) => {
    setForwardHistory((prev) => [...prev.slice(-19), pos])
  }, [])

  const popForwardHistory = useCallback((): Position | undefined => {
    let next: Position | undefined
    setForwardHistory((prev) => {
      next = prev[prev.length - 1]
      return prev.slice(0, -1)
    })
    return next
  }, [])

  // Position validation
  const isValidPosition = useCallback(
    (x: number, y: number): boolean => {
      return x >= 0 && x < gridConfig.width && y >= 0 && y < gridConfig.height
    },
    [gridConfig.width, gridConfig.height]
  )

  // Tile lookup
  const getTileAt = useCallback(
    (x: number, y: number): TileConfig | null => {
      return tileRegistry.get(getPositionKey(x, y)) || null
    },
    [tileRegistry]
  )

  const currentTile = useMemo(
    () => getTileAt(position.x, position.y),
    [getTileAt, position.x, position.y]
  )

  return {
    position,
    setPosition,
    history,
    forwardHistory,
    pushHistory,
    popHistory,
    clearForwardHistory,
    pushForwardHistory,
    popForwardHistory,
    navigationStyle,
    setNavigationStyle,
    lastNavigationMethod,
    homePosition,
    tileRegistry,
    currentTile,
    getTileAt,
    isValidPosition,
  }
}
