"use client"

import { type ReactNode } from "react"
import { Box, useTheme, type SxProps, type Theme } from "@mui/material"
import { CornerBracketFrame, type CornerBracketFrameProps } from "@expanse/brand-core"
import { Z_INDEX } from "@expanse/theme"
import { HudContentArea } from "./HudContentArea"
import { TileContainer } from "./TileContainer"

/** Shared z-index for the decorative corner-bracket frame inside a `FullScreenHudOverlay`. */
export const FULL_SCREEN_OVERLAY_BRACKET_Z = 10

/** Shared z-index for foreground content (top strip, dividers, panels) inside a `FullScreenHudOverlay`. */
export const FULL_SCREEN_OVERLAY_CONTENT_Z = 11

export interface FullScreenHudOverlayProps {
  /** Whether the overlay is open. Renders `null` when false. */
  open: boolean
  /** Overlay content, rendered after the background and corner bracket. */
  children: ReactNode
  /** Stacking layer for the whole overlay. @default Z_INDEX.FULL_MAP_VIEW */
  zIndex?: number
  /**
   * Optional background layer rendered first, behind the corner bracket and
   * content. Wrapped in its own absolutely-positioned, `zIndex: 0` Box so it
   * has an explicit stacking order instead of relying on DOM mount order.
   */
  background?: ReactNode
  /** Background color of the inner surface. @default "background.paper" */
  surfaceBg?: string
  /**
   * Overflow behavior of the inner surface Box. Use `"visible"` when a
   * child (e.g. `CornerBracketFrame`) needs to bleed past this box's edge.
   * @default "hidden"
   */
  overflow?: "visible" | "hidden"
  /**
   * Corner-bracket frame configuration, merged over shared defaults.
   * Pass `false` to omit the bracket entirely.
   * @default {} (renders with shared defaults)
   */
  cornerBracket?: false | Partial<CornerBracketFrameProps>
  /** Extra styles merged onto the inner surface Box. */
  sx?: SxProps<Theme>
}

/**
 * Full-screen HUD overlay shell — the fixed, HUD-safe-area-clipped surface
 * shared by every full-screen overlay mounted at the shell level (the map
 * view, Scene Studio). Factors out the
 * `position:fixed + HudContentArea + TileContainer(mode="fit") + inner
 * surface Box + corner bracket` boilerplate previously duplicated across
 * those call sites.
 */
export function FullScreenHudOverlay({
  open,
  children,
  zIndex = Z_INDEX.FULL_MAP_VIEW,
  background,
  surfaceBg = "background.paper",
  overflow = "hidden",
  cornerBracket,
  sx,
}: FullScreenHudOverlayProps) {
  const theme = useTheme()

  if (!open) return null

  const bracketProps: CornerBracketFrameProps | null =
    cornerBracket === false
      ? null
      : {
          variant: "single",
          thickness: 1,
          inset: 0,
          placement: "inner",
          animateOnMount: true,
          active: open,
          color: theme.palette.primary.main,
          sx: { zIndex: FULL_SCREEN_OVERLAY_BRACKET_Z },
          ...cornerBracket,
        }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex,
        bgcolor: "transparent",
        pointerEvents: "none",
        // overflow:visible so CornerBracketFrame halos that straddle the
        // inner Box edge can bleed into the inset strips.
        overflow: "visible",
      }}
    >
      <HudContentArea sx={{ overflow: "visible" }}>
        <TileContainer mode="fit">
          <Box
            sx={[
              {
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: surfaceBg,
                color: "text.primary",
                pointerEvents: "auto",
                overflow,
              },
              ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
          >
            {background && (
              <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
                {background}
              </Box>
            )}
            {bracketProps && <CornerBracketFrame {...bracketProps} />}
            {children}
          </Box>
        </TileContainer>
      </HudContentArea>
    </Box>
  )
}

export default FullScreenHudOverlay
