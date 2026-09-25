"use client"

import React, { createContext, useContext, useMemo, type ComponentType } from "react"
import type { MinimapTileVariantProps } from "@expanse/theme"

export interface MinimapTileContextValue {
  // Resolved colors
  resolvedColor: string
  activeTileColor: string
  fgColor: string
  tileBgColor: string
  border: string
  boxShadow: string

  // Variant
  variantConfig: MinimapTileVariantProps
  pulseAnimation: string | undefined

  // State
  hovered: boolean
  isActive: boolean
  isEmpty: boolean
  isInteractive: boolean
  isSpecial: boolean

  // Dimensions
  size: number
  iconSize: number

  // Content
  label: string | undefined
  content: "iconOnly" | "iconAndLabel" | "titleOnTile"
  Icon: ComponentType<{ sx?: object }> | undefined
  firstLetter: string | undefined

  // Chevrons
  showNavigationChevrons: boolean
  emphasisDirection: "up" | "down" | "left" | "right" | null
  canMoveUp: boolean
  canMoveDown: boolean
  canMoveLeft: boolean
  canMoveRight: boolean
  tileGap: number
  neighborColors: { up?: string; down?: string; left?: string; right?: string }
}

const MinimapTileContext = createContext<MinimapTileContextValue | null>(null)

export function MinimapTileProvider({
  value,
  children,
}: {
  value: MinimapTileContextValue
  children: React.ReactNode
}) {
  return (
    <MinimapTileContext.Provider value={value}>
      {children}
    </MinimapTileContext.Provider>
  )
}

export function useMinimapTileContext(): MinimapTileContextValue {
  const ctx = useContext(MinimapTileContext)
  if (!ctx) throw new Error("useMinimapTileContext must be used inside MinimapTileProvider")
  return ctx
}
