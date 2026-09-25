"use client";
import React from "react"
import { Box } from "@mui/material"
import { FabClusterContext } from "./FabClusterContext"
import { useFabPanelState } from "./HudFabPanelProvider"
import { RAIL_ITEM_GAP } from "../../hud/rails/railPillStyle"

interface FabClusterProps {
  children: React.ReactNode
}

/**
 * Layout container that stacks `FabTrigger`s. Provides the
 * `FabClusterContext` only if no ancestor `HudFabPanelProvider` is in
 * scope — when the HUD-wide provider exists, opening a panel in one
 * cluster auto-closes a panel in any other cluster.
 *
 * Pure layout (flex column + gap). No background / border / blur — each
 * panel renders its own glass pill on hover, so the cluster itself stays
 * invisible until interacted with.
 */
export function FabCluster({ children }: FabClusterProps) {
  const parentCtx = React.useContext(FabClusterContext)
  const localValue = useFabPanelState()

  const stack = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: `${RAIL_ITEM_GAP}px`,
      }}
    >
      {children}
    </Box>
  )

  if (parentCtx) return stack
  return (
    <FabClusterContext.Provider value={localValue}>{stack}</FabClusterContext.Provider>
  )
}
