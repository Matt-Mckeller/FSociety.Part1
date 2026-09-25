"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import {
  type Position,
  type Direction,
  GRID_SIZE,
  CENTER,
  isValidPosition,
  getNextPosition,
} from "@/types/grid"

// =============================================================================
// Types
// =============================================================================

export interface NavigationContextType {
  /** Current grid position */
  currentPosition: Position
  /** Navigate in a direction */
  navigate: (direction: Direction) => void
  /** Navigate directly to a position */
  navigateTo: (position: Position) => void
  /** Check if navigation is possible in direction */
  canNavigate: (direction: Direction) => boolean
  /** Check if position is valid */
  isValidPosition: (position: Position) => boolean
  /** Grid size */
  gridSize: number
  /** Navigation history */
  history: Position[]
  /** Go back in history */
  goBack: () => void
  /** Can go back */
  canGoBack: boolean
}

// =============================================================================
// Context
// =============================================================================

const NavigationContext = createContext<NavigationContextType | null>(null)

// =============================================================================
// Hook
// =============================================================================

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider")
  }
  return context
}

// =============================================================================
// Provider
// =============================================================================

interface NavigationProviderProps {
  children: ReactNode
  initialPosition?: Position
}

export function NavigationProvider({
  children,
  initialPosition = CENTER,
}: NavigationProviderProps) {
  const [currentPosition, setCurrentPosition] =
    useState<Position>(initialPosition)
  const [history, setHistory] = useState<Position[]>([initialPosition])

  // Navigation functions
  const canNavigate = useCallback(
    (direction: Direction): boolean => {
      const nextPos = getNextPosition(currentPosition, direction)
      return isValidPosition(nextPos)
    },
    [currentPosition],
  )

  const navigate = useCallback(
    (direction: Direction) => {
      if (!canNavigate(direction)) return

      const nextPos = getNextPosition(currentPosition, direction)
      setCurrentPosition(nextPos)
      setHistory((prev) => [...prev, nextPos])
    },
    [currentPosition, canNavigate],
  )

  const navigateTo = useCallback((position: Position) => {
    if (!isValidPosition(position)) return

    setCurrentPosition(position)
    setHistory((prev) => [...prev, position])
  }, [])

  const goBack = useCallback(() => {
    if (history.length <= 1) return

    const newHistory = history.slice(0, -1)
    const previousPosition = newHistory[newHistory.length - 1]
    setHistory(newHistory)
    setCurrentPosition(previousPosition)
  }, [history])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        s: "down",
        S: "down",
        a: "left",
        A: "left",
        d: "right",
        D: "right",
      }

      const direction = keyMap[e.key]
      if (direction) {
        e.preventDefault()
        navigate(direction)
      }

      // Escape to go back
      if (e.key === "Escape") {
        e.preventDefault()
        goBack()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigate, goBack])

  const value: NavigationContextType = {
    currentPosition,
    navigate,
    navigateTo,
    canNavigate,
    isValidPosition,
    gridSize: GRID_SIZE,
    history,
    goBack,
    canGoBack: history.length > 1,
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
