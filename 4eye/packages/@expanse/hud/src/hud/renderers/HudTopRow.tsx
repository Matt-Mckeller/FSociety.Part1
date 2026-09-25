import { Box } from "@mui/material"

import { Z_INDEX } from "@expanse/theme"
import { MINIMAP_DOCK_WIDTH } from "../constants"
import { useHudBarSizes, useCenterContent, useRegisterHudInset } from "../slots"
import { MinimapDock } from "../../map-views/minimap/MinimapDock"
import { CurrentLocationActionBar } from "../../hud-components/current-location-bar/CurrentLocationActionBar"
import type { CurrentLocationCenterButtonOverride } from "../../hud-components/current-location-bar/CurrentLocationActionBar"
import { ResponsiveHudStatus } from "./ResponsiveHudStatus"

export interface HudTopRowProps {
  centerLocationOverride?: CurrentLocationCenterButtonOverride
  defaultMinimapOpen?: boolean
  onMinimapFullScreenRequest?: () => void
  /**
   * When true, the MinimapDock's full-screen-request button morphs into
   * a close (frame → plus) button and routes its click to {@link onMinimapFullScreenClose}.
   */
  isMinimapFullScreenOpen?: boolean
  onMinimapFullScreenClose?: () => void
}

/**
 * Single fixed top row.
 *
 * - Wrapper: `pointer-events: none` + `overflow: visible` so it doesn't
 *   block the page below. Spans `[edge … viewport-edge]` so its
 *   horizontal midpoint == viewport midpoint.
 * - Left & right slots: `position: absolute` so their width changes
 *   (e.g. CompactStatusBar hover-expand from 104→400px) NEVER push the
 *   other slots; expansions overlap whatever sits beside them.
 * - Center (CurrentLocationActionBar): `position: absolute` + `left: 50%`
 *   + `translateX(-50%)` so it is anchored to viewport center and
 *   ignores both siblings entirely.
 */
export function HudTopRow({
  centerLocationOverride,
  defaultMinimapOpen,
  onMinimapFullScreenRequest,
  isMinimapFullScreenOpen = false,
  onMinimapFullScreenClose,
}: HudTopRowProps) {
  const barSizes = useHudBarSizes()

  // Self-register both insets we own: the top chrome row and the minimap
  // dock that lives inside it.
  useRegisterHudInset({
    id: "hud-top-row",
    edge: "top",
    size: barSizes.header,
    label: "Top chrome (status + location)",
  })
  useRegisterHudInset({
    id: "hud-top-row-minimap",
    edge: "minimap",
    size: MINIMAP_DOCK_WIDTH,
    label: "MinimapDock",
  })

  // Highest-priority center-content registration wins. When present it
  // takes over the entire CurrentLocationActionBar interior — used by
  // pages that need a richer center treatment than the standard
  // back / page-icon / forward (e.g. the home slideshow's step rail).
  const { entries: centerEntries } = useCenterContent()
  const centerContentOverride = centerEntries[0]?.node

  return (
    <Box
      sx={{
        position: "fixed",
        top: barSizes.edge,
        left: barSizes.edge,
        right: barSizes.edge,
        height: barSizes.header,
        zIndex: Z_INDEX.PERSISTENT_RAILS,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "flex-start",
          pointerEvents: "auto",
          overflow: "visible",
        }}
      >
        <ResponsiveHudStatus />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          height: barSizes.header,
          pointerEvents: "auto",
        }}
      >
        <CurrentLocationActionBar
          thickness={{ pixels: barSizes.header }}
          centerButtonOverride={centerLocationOverride}
          centerContentOverride={centerContentOverride}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          alignItems: "flex-start",
          pointerEvents: "auto",
          overflow: "visible",
        }}
      >
        <MinimapDock
          position="top-right"
          defaultOpen={defaultMinimapOpen}
          title="Map"
          variant="dark"
          tileVariant="circular"
          showListViewButton
          onFullScreenRequest={onMinimapFullScreenRequest}
          isFullScreenOpen={isMinimapFullScreenOpen}
          onFullScreenClose={onMinimapFullScreenClose}
          sx={{ position: "relative", top: "auto", right: "auto", zIndex: "auto" }}
        />
      </Box>
    </Box>
  )
}
