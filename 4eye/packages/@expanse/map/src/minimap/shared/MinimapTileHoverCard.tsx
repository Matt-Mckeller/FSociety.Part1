"use client"

/**
 * MinimapTileHoverCard
 *
 * Floating preview card anchored to a hovered minimap tile. Shows the
 * tile's identity (icon + label), an optional description
 * (from `seo.description`), and a primary "Go" button that navigates
 * to the tile and dismisses the card.
 *
 * Category chips are intentionally omitted — group labels are unsettled
 * placeholders and add more noise than signal. Color on the icon chip
 * still conveys group membership; the legend (tooltip) owns naming.
 *
 * Mounted at the grid level (not per-tile) so only one card is ever in
 * the DOM. The grid tracks `hoveredCell` + `anchorEl` and renders a
 * single instance of this component pointed at the right tile.
 *
 * Hover bridge: the card itself absorbs `onMouseEnter` / `onMouseLeave`
 * and forwards them to the host so a small close-delay can keep the
 * card open while the cursor moves from tile → card to click "Go".
 */

import React, { type ComponentType } from "react"
import {
  Box,
  Button,
  Paper,
  Popper,
  Typography,
  useTheme,
  type PopperPlacementType,
} from "@mui/material"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"

export interface MinimapTileHoverCardProps {
  open: boolean
  anchorEl: HTMLElement | null
  /** Tile identity */
  label: string
  /** @deprecated Kept for API stability; not rendered. */
  category?: string
  description?: string
  icon?: ComponentType<{ sx?: object }>
  /** Resolved tile color (used for the icon chip + Go button accent). */
  color: string
  /** Placement preference. @default "bottom" */
  placement?: PopperPlacementType
  /** Called when the user presses Go. */
  onGo: () => void
  /** Hover bridge handlers — forward mouse enter/leave from the card. */
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MinimapTileHoverCard({
  open,
  anchorEl,
  label,
  description,
  icon: Icon,
  color,
  placement = "bottom",
  onGo,
  onMouseEnter,
  onMouseLeave,
}: MinimapTileHoverCardProps) {
  const theme = useTheme()
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      // Auto-flip when there isn't room on the preferred side.
      modifiers={[
        { name: "flip", enabled: true },
        { name: "preventOverflow", enabled: true, options: { padding: 8 } },
        { name: "offset", options: { offset: [0, 12] } },
      ]}
      // Keep above the active tile pulse halo.
      sx={{ zIndex: theme.zIndex.tooltip + 1, pointerEvents: "auto" }}
    >
      <Paper
        role="dialog"
        aria-label={`${label} preview`}
        elevation={6}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{
          minWidth: 220,
          maxWidth: 280,
          p: 1.5,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Identity row: icon chip + title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          {Icon && (
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon sx={{ fontSize: 18, color: theme.palette.common.white }} />
            </Box>
          )}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Typography>
        </Box>

        {/* Optional description */}
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.8rem",
              lineHeight: 1.4,
              // Clamp long copy.
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        )}

        {/* Go button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={onGo}
            sx={{
              bgcolor: color,
              color: theme.palette.common.white,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: color,
                filter: "brightness(0.92)",
              },
            }}
          >
            Go
          </Button>
        </Box>
      </Paper>
    </Popper>
  )
}

export default MinimapTileHoverCard
