"use client"

import React, { type ReactNode } from "react"
import {
  Box,
  Typography,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material"
import MapIcon from "@mui/icons-material/Map"
import {
  useFullMapEntrance,
  type FullMapEntrance,
} from "./hooks/useFullMapEntrance"

export interface MinimapFullViewShellProps {
  /** Header title. Defaults to "Map". */
  title?: ReactNode
  /** Force flat surface tokens (no border, no shadow). Defaults to true. */
  flat?: boolean
  /** App-injected nav actions (Return, list-view toggle, history, …). */
  navigationActions?: ReactNode
  /** App-injected role/page actions. */
  roleActions?: ReactNode
  /** Optional ContextBar slot, rendered between the header and the body. */
  contextBar?: ReactNode
  /**
   * Body slot — the grid lives here. Phase 2 ships placeholder content;
   * Phase 3 swaps in `MinimapFullGrid`.
   */
  children?: ReactNode
  /**
   * Legend slot — renders below the body. Phase 3 swaps in
   * `MinimapFullLegend`.
   */
  legend?: ReactNode
  /** Footer slot, below the legend. */
  footer?: ReactNode
  /** Reserved top inset (px). */
  topChromeInset?: number
  /** Reserved left inset (px). */
  leftChromeInset?: number
  /** Reserved right inset (px). */
  rightChromeInset?: number
  /** Reserved bottom inset (px). */
  bottomChromeInset?: number
  /**
   * Visual density preset. `"comfortable"` (default) targets the
   * full-screen overlay; `"compact"` tightens padding, gap, and title
   * size for inline embeds (e.g. on a marketing page).
   * @default "comfortable"
   */
  density?: "comfortable" | "compact"
  /** Entrance animation. Defaults to `"from-top-right"`. */
  entrance?: FullMapEntrance
  sx?: SxProps<Theme>
  className?: string
}

/**
 * Presentational shell for the full minimap view.
 *
 * - Flex column that fills its container (Decision 1: no viewport units).
 * - Header (title + role actions + nav actions).
 * - Optional ContextBar strip.
 * - Body (flex: 1) where the grid lands.
 * - Legend + footer strips.
 * - Pads the bottom by `bottomChromeInset` so persistent HUD chrome
 *   (e.g. collapsed `AIInputBar`) doesn’t hide the legend.
 *
 * The shell does not own chat, navigation state, or routing. It only
 * arranges the slots.
 */
export function MinimapFullViewShell({
  title = "Map",
  flat = true,
  navigationActions,
  roleActions,
  contextBar,
  children,
  legend,
  footer,
  topChromeInset = 0,
  leftChromeInset = 0,
  rightChromeInset = 0,
  bottomChromeInset = 0,
  density = "comfortable",
  entrance = "from-top-right",
  sx,
  className,
}: MinimapFullViewShellProps) {
  const theme = useTheme()
  const entranceSx = useFullMapEntrance(entrance)

  const isCompact = density === "compact"
  const basePad = isCompact ? { xs: 1, md: 1.5 } : { xs: 2, md: 3 }
  const baseGap = isCompact ? 1 : 2
  const titleVariant = isCompact ? "subtitle1" : "h6"

  return (
    <Box
      role="region"
      aria-label="Map view"
      className={className}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          height: "100%",
          // Surface: flat mode uses the dark panel-blue (background.dark =
          // #2C4F76, matching the minimap dark variant / CompactStatusBar fill);
          // card mode uses paper.
          bgcolor: flat ? "background.dark" : "background.paper",
          color: flat ? "#FFFFFF" : theme.palette.text.primary,
          border: flat ? "none" : `1px solid ${theme.palette.divider}`,
          borderRadius: flat ? 0 : 2,
          boxShadow: flat ? "none" : 1,
          gap: baseGap,
          pt: topChromeInset
            ? `calc(${theme.spacing(isCompact ? 1.5 : 3)} + ${topChromeInset}px)`
            : basePad,
          pl: leftChromeInset
            ? `calc(${theme.spacing(isCompact ? 1.5 : 3)} + ${leftChromeInset}px)`
            : basePad,
          pr: rightChromeInset
            ? `calc(${theme.spacing(isCompact ? 1.5 : 3)} + ${rightChromeInset}px)`
            : basePad,
          pb: bottomChromeInset
            ? `calc(${theme.spacing(isCompact ? 1 : 2)} + ${bottomChromeInset}px)`
            : basePad,
        },
        entranceSx.sx as SxProps<Theme>,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Title row — MUI 3-column flex layout: [left spacer][centered
          title][actions]. Using a balanced spacer on the left keeps the
          title visually centered without absolute positioning, while
          actions remain inline (so they participate in measurement). */}
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexShrink: 0,
          minWidth: 0,
        }}
      >
        {/* Left spacer balances the actions slot to keep the title
            optically centered. */}
        <Box sx={{ flex: 1, minWidth: 0 }} />

        {title != null && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              minWidth: 0,
              justifyContent: "center",
            }}
          >
            <MapIcon
              fontSize="small"
              sx={{ color: theme.palette.text.primary, opacity: 0.6 }}
            />
            {typeof title === "string" ? (
              <Typography
                variant={titleVariant}
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "text.primary",
                }}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          {roleActions}
          {navigationActions}
        </Box>
      </Box>

      {/* ContextBar — centered below the title, above the body. */}
      {contextBar && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            minWidth: 0,
          }}
        >
          <Box sx={{ flexShrink: 0, minWidth: 0 }}>{contextBar}</Box>
        </Box>
      )}

      {/* Body — grid lives here in Phase 3 */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>

      {/* Legend strip — centered, visually separated from the body by a
          faint divider so it reads as chrome, not part of the grid. */}
      {legend && (
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: isCompact ? 0.75 : 1.25,
            borderTop: `1px solid ${flat ? "rgba(255,255,255,0.15)" : theme.palette.divider}`,
          }}
        >
          {legend}
        </Box>
      )}

      {/* Footer */}
      {footer && (
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  )
}
