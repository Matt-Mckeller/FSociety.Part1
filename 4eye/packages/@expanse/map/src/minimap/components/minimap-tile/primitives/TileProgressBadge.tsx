"use client"

import React from "react"
import { Box, Tooltip } from "@mui/material"
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded"
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded"

export interface TileProgressBadgeProps {
  /** Exploration progress: 0 = not visited, 1-99 = partial, 100 = complete. */
  progressPercent?: number
  /** Tile label for the tooltip (e.g., "Learn"). */
  tileLabel?: string
}

/**
 * TileProgressBadge — exploration progress indicator for minimap tiles.
 *
 * Visual states:
 * - `undefined` or `0`: empty circle outline (not visited)
 * - `1–99`: segmented ring showing progress arc
 * - `100`: filled checkmark (complete)
 *
 * Tooltip: "Not yet visited" | "Visited · 35% explored" | "Fully explored"
 *
 * Positioned absolutely in the top-right corner of the tile chip.
 */
export function TileProgressBadge({
  progressPercent = 0,
  tileLabel = "page",
}: TileProgressBadgeProps) {
  const isVisited = progressPercent > 0
  const isComplete = progressPercent === 100
  const isPartial = isVisited && !isComplete

  // Tooltip label
  const tooltipText = isComplete
    ? "Fully explored"
    : isVisited
      ? `Visited · ${progressPercent}% explored`
      : "Not yet visited"

  // Progress arc: 0–100% maps to 0–360deg rotation.
  // SVG circle starts at 3 o'clock; rotate -90deg to start at 12 o'clock.
  const arcDegrees = (progressPercent / 100) * 360
  const strokeDasharray = `${arcDegrees} 360`

  return (
    <Tooltip title={tooltipText} arrow placement="top" enterDelay={200}>
      <Box
        sx={{
          position: "absolute",
          top: -6,
          right: -6,
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
          cursor: "help",
          zIndex: 5,
        }}
        aria-label={tooltipText}
      >
        {isComplete ? (
          // Fully explored: checkmark icon
          (<CheckCircleRoundedIcon
            sx={{
              fontSize: 20,
              color: "#10B981", // success green
              filter: "drop-shadow(0 0 3px rgba(16,185,129,0.6))",
            }}
          />)
        ) : isPartial ? (
          // Partial: segmented ring (SVG circle with stroke-dasharray)
          (<Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{
              width: 20,
              height: 20,
              transform: "rotate(-90deg)", // start arc at top
            }}
          >
            {/* Background ring (unfilled) */}
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="rgba(100,116,139,0.35)" // neutral gray-blue
              strokeWidth="2.5"
            />
            {/* Progress arc (filled portion) */}
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="#3B82F6" // primary blue
              strokeWidth="2.5"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 2px rgba(59,130,246,0.4))",
              }}
            />
          </Box>)
        ) : (
          // Not visited: empty circle outline
          (<RadioButtonUncheckedRoundedIcon
            sx={{
              fontSize: 20,
              color: "rgba(100,116,139,0.45)", // subtle gray
            }}
          />)
        )}
      </Box>
    </Tooltip>
  );
}
