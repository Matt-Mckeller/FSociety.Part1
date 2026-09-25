"use client"

import React, { useState } from "react"
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Popover,
  useTheme,
  alpha,
} from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined"
import { HUD_HEADER_BAR_SIZE } from "@expanse/brand-core"
import { ActionBar } from "../action-bars"
import type { ActionBarProps } from "../action-bars"
import { useNavigation } from "@expanse/map"

/**
 * Optional override that replaces the normal back / icon / forward nav with a
 * screen-title + close button (e.g. "Map" while the full map view is open).
 */
export interface CurrentLocationCenterButtonOverride {
  icon: React.ReactNode
  label: string
  onClick: () => void
  /** Optional bg color for the swatch. Falls back to the current tile color. */
  color?: string
}

export interface CurrentLocationActionBarProps
  extends Omit<ActionBarProps, "children" | "orientation"> {
  /** Matches {@link ContextBar} / HUD header row height */
  thickness?: ActionBarProps["thickness"]
  /** When set, replaces the normal nav with a title + close button. */
  centerButtonOverride?: CurrentLocationCenterButtonOverride
  /**
   * When set, replaces the bar's entire inner content with arbitrary
   * React. Wins over {@link centerButtonOverride} and the default nav.
   * Use for richer takeovers (e.g. a slideshow step rail) where the
   * "title + close" shape isn't enough.
   */
  centerContentOverride?: React.ReactNode
}

/**
 * Center HUD bar: back, current-page icon (with name on hover / click),
 * forward. Same ActionBar footprint as {@link ContextBar}.
 *
 * When `centerButtonOverride` is provided the inner content switches to a
 * compact "screen title + close" layout (e.g. "Map") while the same
 * ActionBar shell, variant, and thickness are preserved.
 */
export function CurrentLocationActionBar({
  variant = "frosted",
  shape = "pill",
  thickness = { pixels: HUD_HEADER_BAR_SIZE.desktop },
  centerButtonOverride,
  centerContentOverride,
  ...rest
}: CurrentLocationActionBarProps) {
  const theme = useTheme()
  const {
    currentTile,
    position,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
  } = useNavigation()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const label =
    currentTile?.display.label ??
    `[${position.x + 1}, ${position.y + 1}]`

  const IconComp = currentTile?.display.icon
  const swatchColor =
    currentTile?.display.colors.active ??
    currentTile?.display.colors.inactive ??
    theme.palette.primary.main

  const iconNode = IconComp ? (
    React.createElement(IconComp as React.ComponentType<{ sx?: object }>, {
      sx: { fontSize: 22, color: "common.white" },
    })
  ) : (
    <PlaceOutlinedIcon sx={{ fontSize: 22, color: "common.white" }} />
  )

  // When a full content takeover is in play, render the override directly
  // without this ActionBar shell — the override (e.g. ContextBar) owns its
  // own pill and double-wrapping produces two visible frosted containers.
  if (centerContentOverride) {
    return (
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        {centerContentOverride}
      </Box>
    )
  }

  const { boxShadow: boxShadowOverride, ...restWithoutShadow } = rest as {
    boxShadow?: ActionBarProps["boxShadow"]
  } & typeof rest
  const resolvedBoxShadow = boxShadowOverride ?? undefined

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <ActionBar
        variant={variant}
        shape={shape}
        thickness={thickness}
        orientation="horizontal"
        boxShadow={resolvedBoxShadow}
        {...restWithoutShadow}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.25,
            px: 0.5,
            height: "100%",
          }}
        >
          {centerButtonOverride ? (
            // Locked-state layout: chevrons rendered but disabled (greyed
            // out, non-clickable), with a primary-blue swatch + label in
            // the centre. Used e.g. while the full-screen map view is
            // open — host clicking the swatch routes to the override's
            // onClick (typically "close map view").
            (<>
              <Tooltip title="Navigation disabled">
                <span>
                  <IconButton
                    size="small"
                    aria-label="Back (disabled)"
                    disabled
                    sx={{
                      p: 0.75,
                      // Override MUI's default disabled color so the chevron
                      // remains visible against the dark frosted pill.
                      "&.Mui-disabled": { color: alpha("#fff", 0.45) },
                    }}
                  >
                    <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={centerButtonOverride.label} enterDelay={300}>
                <IconButton
                  size="small"
                  aria-label={centerButtonOverride.label}
                  onClick={centerButtonOverride.onClick}
                  sx={{
                    p: 0.5,
                    pr: 1.25,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor:
                        centerButtonOverride.color ??
                        theme.palette.primary.main,
                      border: `1px solid ${alpha("#000", 0.12)}`,
                      "& > svg": {
                        fontSize: 22,
                        color: theme.palette.common.white,
                      },
                    }}
                  >
                    {centerButtonOverride.icon}
                  </Box>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                      fontWeight: 600,
                      color: "common.white",
                      userSelect: "none",
                    }}
                  >
                    {centerButtonOverride.label}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Tooltip title="Navigation disabled">
                <span>
                  <IconButton
                    size="small"
                    aria-label="Forward (disabled)"
                    disabled
                    sx={{
                      p: 0.75,
                      "&.Mui-disabled": { color: alpha("#fff", 0.45) },
                    }}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>
            </>)
          ) : (
            <>
              <Tooltip title={canGoBack ? "Back" : "No previous page"}>
                <span>
                  <IconButton
                    size="small"
                    aria-label="Back"
                    disabled={!canGoBack}
                    onClick={goBack}
                    sx={{
                      color: canGoBack ? "text.primary" : "action.disabled",
                      p: 0.75,
                    }}
                  >
                    <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={label} enterDelay={400}>
                <IconButton
                  size="small"
                  aria-label={`Current page: ${label}`}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ p: 0.5, borderRadius: 1 }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: swatchColor,
                      border: `1px solid ${alpha("#000", 0.12)}`,
                    }}
                  >
                    {iconNode}
                  </Box>
                </IconButton>
              </Tooltip>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                slotProps={{
                  paper: { sx: { px: 2, py: 1.25, minWidth: 160 } },
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {label}
                </Typography>
                <Typography variant="caption" sx={{
                  color: "text.secondary"
                }}>
                  [{position.x + 1}, {position.y + 1}]
                  {currentTile?.display.category
                    ? ` · ${currentTile.display.category}`
                    : ""}
                </Typography>
              </Popover>

              <Tooltip
                title={canGoForward ? "Forward" : "Nothing to go forward to"}
              >
                <span>
                  <IconButton
                    size="small"
                    aria-label="Forward"
                    disabled={!canGoForward}
                    onClick={goForward}
                    sx={{
                      color: canGoForward ? "text.primary" : "action.disabled",
                      p: 0.75,
                    }}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          )}
        </Box>
      </ActionBar>
    </Box>
  );
}
