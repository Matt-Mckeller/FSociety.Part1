import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography, useTheme } from "@mui/material"
import { CornerBracketFrame } from "../../display/CornerBracketFrame"
import { WaterBackground } from "./WaterBackground"

/**
 * `WaterBackground` — drop-in animated backdrop. A solid panel-blue
 * fill with two oversized SVG fractal-noise tiles drifting on
 * different axes / speeds / blend modes. Reads as gentle rippling
 * water; never shifts the perceived color of the surface.
 */

const meta: Meta = {
  title: "BrandCore/Primitives/WaterBackground",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}
export default meta

const FRAME_WIDTH = 720
const FRAME_HEIGHT = 420
// Match `theme.palette.background.dark` used by MinimapFullViewOverlay
// (the brand panel-blue, also used by the minimap dark variant /
// CompactStatusBar).
const SOLID_BLUE = "#2C4F76"

const INSET_SHADOW = [
  "inset 0 16px 32px -16px rgba(0,0,0,0.30)",
  "inset 0 -12px 24px -16px rgba(0,0,0,0.22)",
  "inset 16px 0 24px -20px rgba(0,0,0,0.18)",
  "inset -16px 0 24px -20px rgba(0,0,0,0.18)",
].join(", ")

function DemoFrame() {
  const theme = useTheme()
  return (
    <Stack spacing={1} sx={{ p: 3, alignItems: "flex-start" }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Drifting Film Grain
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", maxWidth: FRAME_WIDTH }}>
        Solid panel-blue base with two SVG fractal-noise layers drifting
        on different axes, speeds, and blend modes. Interference reads as
        gentle rippling water; respects <code>prefers-reduced-motion</code>.
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          overflow: "hidden",
          bgcolor: SOLID_BLUE,
          boxShadow: INSET_SHADOW,
        }}
      >
        <WaterBackground />
        <CornerBracketFrame
          lengthPct={36}
          thickness={3}
          inset={0}
          color={theme.palette.primary.main}
          layerRatio="1:2:3"
          placement="inner"
          animateOnMount={false}
          sx={{ zIndex: 3 }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 80px)",
              gridAutoRows: "80px",
              gap: 1.5,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 12,
                }}
              >
                tile
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Stack>
  )
}

export const DriftingFilmGrain: StoryObj = {
  name: "Drifting Film Grain",
  render: () => <DemoFrame />,
}

/**
 * Self-contained variant — `WaterBackground` paints its own solid
 * fill via `bgcolor`, so the parent only needs `position: relative`.
 */
export const SelfContained: StoryObj = {
  name: "Self-contained (bgcolor prop)",
  render: () => (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          position: "relative",
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          overflow: "hidden",
        }}
      >
        <WaterBackground bgcolor={SOLID_BLUE} />
      </Box>
    </Box>
  ),
}
