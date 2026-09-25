"use client"

import React, { useMemo } from "react"
import { Box, Tooltip } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"
import { MinimapTileProvider } from "./context/MinimapTileContext"
import { useMinimapTileColors } from "./hooks/useMinimapTileColors"
import { useMinimapTileInteraction } from "./hooks/useMinimapTileInteraction"
import { TileChip } from "./primitives/TileChip"
import { TileChevrons } from "./primitives/TileChevrons"
import { TileLabel } from "./primitives/TileLabel"
import { TileProgressBadge } from "./primitives/TileProgressBadge"
import { TileRecommendedFrame } from "./primitives/TileRecommendedFrame"
import type { MinimapTileProps } from "./types"

export function MinimapTile({
  variant = "default",
  size = 22,
  iconSize = 14,
  label,
  content = "iconOnly",
  category,
  color,
  ringColor,
  chip: chipMode,
  icon: Icon,
  isActive = false,
  isEmpty = false,
  disabled = false,
  href,
  external = false,
  onClick,
  animateActive = true,
  inactiveColorOpacity = 0.5,
  showNavigationChevrons = false,
  canMoveUp = true,
  canMoveDown = true,
  canMoveLeft = true,
  canMoveRight = true,
  emphasisDirection = "up",
  tileGap = 3,
  neighborColors,
  progressPercent,
  isRecommended = false,
  categoryColors: instanceCategoryColors,
  onHoverChange,
  sx,
}: MinimapTileProps) {
  // ----------------------------------------------------------
  // Semantic element selection
  // ----------------------------------------------------------
  const isInteractive = !disabled && (!!href || !!onClick)
  const as: React.ElementType = disabled ? "div" : href ? "a" : onClick ? "button" : "div"

  const interactionProps: React.HTMLAttributes<HTMLElement> & {
    href?: string; target?: string; rel?: string; type?: string
  } = {}

  if (!disabled) {
    if (href) {
      interactionProps.href = href
      if (external) { interactionProps.target = "_blank"; interactionProps.rel = "noopener noreferrer" }
    } else if (onClick) {
      interactionProps.type = "button"
    }
  }

  const isSpecial = !isEmpty && (!!color || !!category)

  // ----------------------------------------------------------
  // First-letter fallback
  // ----------------------------------------------------------
  const firstLetter = useMemo(() => {
    if (Icon || !label) return undefined
    const t = label.trim()
    return t ? t.charAt(0).toUpperCase() : undefined
  }, [Icon, label])

  // ----------------------------------------------------------
  // Color resolution + interaction
  // `resolvedColor` does not depend on hover; hover only affects
  // shadow. Resolve once for the hover payload, then again with the
  // live hover flag for paint.
  // ----------------------------------------------------------
  const baseColors = useMinimapTileColors({
    variant,
    category,
    color,
    isEmpty,
    isActive,
    hovered: false,
    animateActive,
    inactiveColorOpacity,
    instanceCategoryColors,
    isSpecial,
    ringColor,
    chip: chipMode,
    size,
  })

  const { hovered: hoveredState, handleMouseEnter: enterHandler, handleMouseLeave: leaveHandler, handleKeyDown: keyHandler } =
    useMinimapTileInteraction({
      isInteractive,
      label,
      category,
      resolvedColor: baseColors.resolvedColor,
      Icon,
      onClick,
      onHoverChange,
    })

  const liveColors = useMinimapTileColors({
    variant,
    category,
    color,
    isEmpty,
    isActive,
    hovered: hoveredState,
    animateActive,
    inactiveColorOpacity,
    instanceCategoryColors,
    isSpecial,
    ringColor,
    chip: chipMode,
    size,
  })

  // ----------------------------------------------------------
  // Build context value
  // ----------------------------------------------------------
  const contextValue = useMemo(() => ({
    ...liveColors,
    hovered: hoveredState,
    isActive,
    isEmpty,
    isInteractive,
    isSpecial,
    size,
    iconSize,
    label,
    content,
    Icon,
    firstLetter,
    showNavigationChevrons,
    emphasisDirection: emphasisDirection ?? null,
    canMoveUp,
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    tileGap,
    neighborColors: neighborColors ?? {},
  }), [
    liveColors, hoveredState, isActive, isEmpty, isInteractive, isSpecial,
    size, iconSize, label, content, Icon, firstLetter,
    showNavigationChevrons, emphasisDirection, canMoveUp, canMoveDown, canMoveLeft, canMoveRight,
    tileGap, neighborColors,
  ])

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  const chip = (
    <TileChip
      as={as}
      interactionProps={interactionProps}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
      onKeyDown={keyHandler}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      sx={sx}
    />
  )

  // iconOnly has no under-tile caption — surface the name on hover.
  // iconAndLabel / titleOnTile already show the name (caption or on-chip).
  const chipWithNameHint =
    content === "iconOnly" && label && !isEmpty ? (
      <Tooltip title={label} placement="top" enterDelay={450}>
        <Box component="span" sx={{ display: "inline-flex" }}>
          {chip}
        </Box>
      </Tooltip>
    ) : chip

  const chipWithChevrons = showNavigationChevrons && isActive && !isEmpty ? (
    <TileChevrons>{chipWithNameHint}</TileChevrons>
  ) : chipWithNameHint

  // Wrap chip with state indicators (progress badge + recommended frame)
  const chipWithIndicators = (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {chipWithChevrons}
      {progressPercent !== undefined && !isEmpty && (
        <TileProgressBadge progressPercent={progressPercent} tileLabel={label} />
      )}
      {isRecommended && !isEmpty && <TileRecommendedFrame size={size} />}
    </Box>
  )

  if (content !== "iconAndLabel" || !label) {
    return (
      <MinimapTileProvider value={contextValue}>
        {chipWithIndicators}
      </MinimapTileProvider>
    )
  }

  return (
    <MinimapTileProvider value={contextValue}>
      <Box sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center", minWidth: 0 }}>
        {chipWithIndicators}
        <TileLabel />
      </Box>
    </MinimapTileProvider>
  )
}
