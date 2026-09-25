"use client"

import { Chip, Tooltip } from "@mui/material"
import {
  Visibility as VisibleIcon,
  VisibilityOff as HiddenIcon,
} from "@mui/icons-material"
import { useLayoutConfig } from '@expanse/shell/core/providers'
import { FloatingToolbar } from "./FloatingToolbar"
import type { MinimapToggleProps } from "../types"

/**
 * Floating toggle button for minimap visibility
 *
 * @example
 * ```tsx
 * <MinimapToggle position="top-right" />
 * ```
 */
export function MinimapToggle({
  position = "top-right",
  zIndex = 1300,
}: MinimapToggleProps) {
  const { config, updateMinimapConfig } = useLayoutConfig()

  const isEnabled = config.minimap.enabled

  const toggle = () => {
    updateMinimapConfig("enabled", !isEnabled)
  }

  return (
    <FloatingToolbar position={position} zIndex={zIndex}>
      <Tooltip title={isEnabled ? "Hide minimap" : "Show minimap"}>
        <Chip
          icon={isEnabled ? <VisibleIcon sx={{ fontSize: 16 }} /> : <HiddenIcon sx={{ fontSize: 16 }} />}
          label={isEnabled ? "Minimap" : "Minimap Off"}
          size="small"
          onClick={toggle}
          sx={{
            bgcolor: isEnabled ? "primary.main" : "rgba(255,255,255,0.15)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      </Tooltip>
    </FloatingToolbar>
  )
}
