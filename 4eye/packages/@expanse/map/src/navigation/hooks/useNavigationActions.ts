"use client"

import { useCallback } from "react"
import type {
  Direction,
  MapGridNavigationConfig,
  NavigationMethod,
  Position,
  TileConfig,
} from "../types"
import { DIRECTION_OFFSETS } from "../utils/positionUtils"

export interface NavigationActionsConfig {
  position: Position
  setPosition: (pos: Position) => void
  pushHistory: (pos: Position) => void
  popHistory: () => Position | undefined
  clearForwardHistory: () => void
  pushForwardHistory: (pos: Position) => void
  popForwardHistory: () => Position | undefined
  homePosition: Position
  gridConfig: { width: number; height: number; wrapAround?: boolean }
  getTileAt: (x: number, y: number) => TileConfig | null
  isValidPosition: (x: number, y: number) => boolean
  currentTile: TileConfig | null
  lastNavigationMethod: React.MutableRefObject<NavigationMethod>
  config: MapGridNavigationConfig
}

export interface NavigationActions {
  navigate: (direction: Direction) => void
  navigateTo: (x: number, y: number) => void
  goHome: () => void
  goBack: () => void
  goForward: () => void
  canNavigate: (direction: Direction) => boolean
}

/**
 * Navigation action handlers
 *
 * Provides directional navigation, jump-to, home, and back functionality.
 */
export function useNavigationActions({
  position,
  setPosition,
  pushHistory,
  popHistory,
  clearForwardHistory,
  pushForwardHistory,
  popForwardHistory,
  homePosition,
  gridConfig,
  getTileAt,
  isValidPosition,
  currentTile,
  lastNavigationMethod,
  config,
}: NavigationActionsConfig): NavigationActions {
  // Check if navigation in direction is possible
  const canNavigate = useCallback(
    (direction: Direction): boolean => {
      const offset = DIRECTION_OFFSETS[direction]
      let newX = position.x + offset.x
      let newY = position.y + offset.y

      // Handle wrap-around
      if (gridConfig.wrapAround !== false) {
        if (newX < 0) newX = gridConfig.width - 1
        if (newX >= gridConfig.width) newX = 0
        if (newY < 0) newY = gridConfig.height - 1
        if (newY >= gridConfig.height) newY = 0
        return true
      }

      return isValidPosition(newX, newY)
    },
    [position, gridConfig.wrapAround, gridConfig.width, gridConfig.height, isValidPosition]
  )

  // Internal navigation with method tracking
  const navigateToInternal = useCallback(
    (x: number, y: number, method: NavigationMethod) => {
      // Validate position
      if (!isValidPosition(x, y)) {
        // Try wrap-around
        if (gridConfig.wrapAround !== false) {
          x = ((x % gridConfig.width) + gridConfig.width) % gridConfig.width
          y = ((y % gridConfig.height) + gridConfig.height) % gridConfig.height
        } else {
          return
        }
      }

      // Check if tile is disabled
      const targetTile = getTileAt(x, y)
      if (targetTile?.behavior?.disabled) return

      // Handle external URLs
      if (targetTile?.behavior?.external) {
        window.open(targetTile.behavior.external, "_blank")
        return
      }

      // Store previous position in history
      pushHistory(position)
      clearForwardHistory()

      // Call leave callback
      if (currentTile && config.onTileLeave) {
        config.onTileLeave(currentTile)
      }

      const newPosition = { x, y }
      lastNavigationMethod.current = method

      // Call navigate callback
      if (config.onNavigate) {
        config.onNavigate(position, newPosition, method)
      }

      // Update position
      setPosition(newPosition)

      // Call enter callback
      if (targetTile && config.onTileEnter) {
        config.onTileEnter(targetTile)
      }
    },
    [
      isValidPosition,
      gridConfig.wrapAround,
      gridConfig.width,
      gridConfig.height,
      getTileAt,
      pushHistory,
      clearForwardHistory,
      position,
      currentTile,
      config,
      lastNavigationMethod,
      setPosition,
    ]
  )

  // Navigate in a direction
  const navigate = useCallback(
    (direction: Direction) => {
      if (!canNavigate(direction)) return

      const offset = DIRECTION_OFFSETS[direction]
      let newX = position.x + offset.x
      let newY = position.y + offset.y

      // Handle wrap-around
      if (gridConfig.wrapAround !== false) {
        if (newX < 0) newX = gridConfig.width - 1
        if (newX >= gridConfig.width) newX = 0
        if (newY < 0) newY = gridConfig.height - 1
        if (newY >= gridConfig.height) newY = 0
      }

      navigateToInternal(newX, newY, "keyboard")
    },
    [canNavigate, position, gridConfig.wrapAround, gridConfig.width, gridConfig.height, navigateToInternal]
  )

  // Navigate to specific position
  const navigateTo = useCallback(
    (x: number, y: number) => {
      navigateToInternal(x, y, "direct")
    },
    [navigateToInternal]
  )

  // Go to home position
  const goHome = useCallback(() => {
    navigateToInternal(homePosition.x, homePosition.y, "direct")
  }, [navigateToInternal, homePosition])

  // Go back in history
  const goBack = useCallback(() => {
    const previousPosition = popHistory()
    if (!previousPosition) return
    pushForwardHistory(position)
    setPosition(previousPosition)
    lastNavigationMethod.current = "history"
  }, [popHistory, pushForwardHistory, position, setPosition, lastNavigationMethod])

  // Go forward in history (after one or more backs)
  const goForward = useCallback(() => {
    const nextPosition = popForwardHistory()
    if (!nextPosition) return
    pushHistory(position)
    setPosition(nextPosition)
    lastNavigationMethod.current = "history"
  }, [popForwardHistory, pushHistory, position, setPosition, lastNavigationMethod])

  return {
    navigate,
    navigateTo,
    goHome,
    goBack,
    goForward,
    canNavigate,
  }
}
