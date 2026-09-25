"use client"

import { useState, useCallback } from "react"
import type { ComponentType } from "react"
import type { MinimapTileHoverInfo } from "../types"

interface UseMinimapTileInteractionInput {
  isInteractive: boolean
  label?: string
  category?: string
  resolvedColor: string
  Icon?: ComponentType<{ sx?: object }>
  onClick?: () => void
  onHoverChange?: (info: MinimapTileHoverInfo | null) => void
}

interface UseMinimapTileInteractionResult {
  hovered: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleKeyDown: (e: React.KeyboardEvent) => void
}

export function useMinimapTileInteraction({
  isInteractive,
  label,
  category,
  resolvedColor,
  Icon,
  onClick,
  onHoverChange,
}: UseMinimapTileInteractionInput): UseMinimapTileInteractionResult {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    onHoverChange?.({
      label: label ?? "",
      category,
      color: resolvedColor,
      icon: Icon,
    })
  }, [label, category, resolvedColor, Icon, onHoverChange])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    onHoverChange?.(null)
  }, [onHoverChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isInteractive) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick?.()
    }
  }, [isInteractive, onClick])

  return { hovered, handleMouseEnter, handleMouseLeave, handleKeyDown }
}
