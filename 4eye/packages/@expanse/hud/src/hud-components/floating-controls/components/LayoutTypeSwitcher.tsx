"use client"

import { Box, Chip, Stack, IconButton, Tooltip } from "@mui/material"
import {
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  GridView as GridIcon,
} from "@mui/icons-material"
import { useLayoutConfig } from '@expanse/shell/core/providers'
import { FloatingToolbar } from "./FloatingToolbar"
import { LAYOUT_TYPES, LAYOUT_LABELS, LAYOUT_COLORS } from "../constants"
import type { LayoutTypeSwitcherProps } from "../types"

/**
 * Floating quick-switcher for cycling through layout types
 *
 * Provides:
 * - Previous/Next arrows to cycle layouts
 * - Current layout displayed as colored chip
 * - Real-time updates via LayoutConfigContext
 *
 * @example
 * ```tsx
 * // Full switcher with arrows
 * <LayoutTypeSwitcher position="top-center" />
 *
 * // Compact mode (chip only)
 * <LayoutTypeSwitcher compact />
 * ```
 */
export function LayoutTypeSwitcher({
  position = "top-center",
  compact = false,
  zIndex = 1300,
}: LayoutTypeSwitcherProps) {
  const { config, updateConfig } = useLayoutConfig()

  const currentIndex = LAYOUT_TYPES.indexOf(config.layoutType)

  const cycleLayout = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % LAYOUT_TYPES.length
        : (currentIndex - 1 + LAYOUT_TYPES.length) % LAYOUT_TYPES.length
    updateConfig("layoutType", LAYOUT_TYPES[newIndex])
  }

  const layoutChip = (
    <Chip
      icon={<GridIcon sx={{ fontSize: 16 }} />}
      label={LAYOUT_LABELS[config.layoutType]}
      size="small"
      onClick={compact ? () => cycleLayout("next") : undefined}
      sx={{
        bgcolor: LAYOUT_COLORS[config.layoutType],
        color: "#fff",
        fontWeight: 600,
        cursor: compact ? "pointer" : "default",
        "& .MuiChip-icon": { color: "inherit" },
      }}
    />
  )

  if (compact) {
    return (
      <FloatingToolbar position={position} zIndex={zIndex}>
        <Tooltip title="Click to cycle layouts">
          {layoutChip}
        </Tooltip>
      </FloatingToolbar>
    )
  }

  return (
    <FloatingToolbar position={position} zIndex={zIndex}>
      <Stack direction="row" spacing={0.5} sx={{
        alignItems: "center"
      }}>
        <Tooltip title="Previous layout">
          <IconButton
            size="small"
            onClick={() => cycleLayout("prev")}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            <PrevIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Box sx={{ px: 1 }}>{layoutChip}</Box>

        <Tooltip title="Next layout">
          <IconButton
            size="small"
            onClick={() => cycleLayout("next")}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            <NextIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </FloatingToolbar>
  );
}
