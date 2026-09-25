"use client"

/**
 * ActionOrb — single round/pill action button used on HUD orb bars.
 *
 * Composition shell that orchestrates the four extracted concerns:
 *   - color resolution        → `useOrbColors` (palette.ability lookups)
 *   - layout dimensioning     → `resolveOrbLayout` (mode + px sizing)
 *   - surface skin            → `buildOrbSx` (theme.ExpanseActionOrb)
 *   - external label / hotkey → `<OrbLabelStack>`, `<OrbHotkey>`
 *
 * @example
 * ```tsx
 * <ActionOrb
 *   icon={<SparkleIcon />}
 *   label="AI Assistant"
 *   shape="circle"
 *   variant="glow"
 *   color="ai"
 *   onClick={openAi}
 * />
 * ```
 */

import { Badge, Box, IconButton, Tooltip, useTheme } from "@mui/material"

import type { ActionOrbProps } from "./types"
import { useOrbColors } from "./hooks"
import {
  resolveOrbLayout,
  getShapeBorderRadius,
  getShapeTransform,
  getIconCounterTransform,
} from "./actionOrb.layout"
import { buildOrbSx } from "./actionOrb.styles"
import { OrbHotkey } from "./OrbHotkey"
import { OrbLabelStack } from "./OrbLabelStack"

export function ActionOrb({
  icon,
  label,
  shape = "circle",
  size = "md",
  variant = "glass",
  color = "default",
  colorMode = "auto",
  positionMode = "fixed",
  x,
  y,
  disabled = false,
  badge,
  hotkey,
  hotkeyDisplay = "none",
  showInlineLabel = false,
  labelPosition = "right",
  vibrant = false,
  onClick,
  sx,
}: ActionOrbProps) {
  const theme = useTheme()
  const { colors, mode } = useOrbColors({ color, colorMode, variant, vibrant })
  const layout = resolveOrbLayout({ shape, size, showInlineLabel, labelPosition })

  const iconColor = mode === "dark" ? "#ffffff" : "#1a1a1a"
  const isDiamond = layout.effectiveShape === "diamond"
  const isCircleBelow = layout.mode === "circle-below"

  // ── Position styles applied to the OUTERMOST element ──────────────────────
  const positionStyles =
    positionMode === "free" && x !== undefined && y !== undefined
      ? { position: "absolute" as const, left: x, top: y }
      : undefined

  // ── IconButton sx (everything skin + dimension) ───────────────────────────
  const buttonSx = buildOrbSx({
    theme,
    variant,
    colors,
    width: layout.width,
    height: layout.height,
    paddingX: layout.paddingX,
    paddingY: layout.paddingY,
    borderRadius: getShapeBorderRadius(layout.effectiveShape, layout.height),
    outerTransform: getShapeTransform(layout.effectiveShape),
    diamond: isDiamond,
  })

  // ── The IconButton itself ─────────────────────────────────────────────────
  const button = (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      sx={[
        buttonSx,
        // Position lives on the button only when there's no outer label stack.
        ...(!isCircleBelow && positionStyles ? [positionStyles] : []),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: showInlineLabel && !isCircleBelow ? 0.75 : 0,
          transform: getIconCounterTransform(layout.effectiveShape),
          color: iconColor,
          "& > svg": { width: layout.iconSize, height: layout.iconSize },
        }}
      >
        {icon}
        {showInlineLabel && !isCircleBelow && (
          <Box
            component="span"
            sx={{
              fontSize: layout.labelFontSize,
              fontWeight: 600,
              letterSpacing: 0.2,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Box>
        )}
      </Box>
    </IconButton>
  )

  // ── Wrap with badge (inside the label stack so badge clips to the orb) ────
  const buttonWithBadge =
    badge !== undefined ? (
      <Badge
        badgeContent={badge}
        color="error"
        sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 18, height: 18 } }}
      >
        {button}
      </Badge>
    ) : (
      button
    )

  // ── Circle-below: wrap the badge'd orb in a column with the label below ──
  const composed = isCircleBelow ? (
    <OrbLabelStack
      label={label}
      fontSize={layout.labelFontSize}
      textColor={iconColor}
      positionStyles={positionStyles}
    >
      {buttonWithBadge}
    </OrbLabelStack>
  ) : (
    buttonWithBadge
  )

  // ── Hotkey overlay (positioned relative to the button group) ──────────────
  const withHotkey =
    hotkey && hotkeyDisplay !== "none" ? (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        {composed}
        <OrbHotkey
          hotkey={hotkey}
          display={hotkeyDisplay}
          mode={mode}
          colors={colors}
          shape={layout.effectiveShape}
          buttonHeight={layout.height}
          hotkeyFontSize={layout.hotkeyFontSize}
          overlayFontSize={layout.iconSize * 0.6}
        />
      </Box>
    ) : (
      composed
    )

  // Suppress the tooltip when the label is already visible on/under the orb.
  if (showInlineLabel) return withHotkey
  return <Tooltip title={label}>{withHotkey}</Tooltip>
}
