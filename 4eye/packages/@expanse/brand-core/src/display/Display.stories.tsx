import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Stack,
  Slider,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { ProgressBar } from "@expanse/character/2d"
import { ExpandingBar } from "./ExpandingBar"

// Create a theme with ProgressBar variants for full styling
const demoTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4ff", light: "#4de8ff" },
    success: { main: "#6bffc3", light: "#a3ffd8" },
    grey: { 300: "#2a2a3e" },
  },
  components: {
    ProgressBar: {
      variants: {
        default: {
          outerDecorativeLayerStrokeColor: "#00d4ff",
          outerDecorativeLayerFillColor: "#1a3a4a",
          innerBackgroundLayerFillColor: "#0a1520",
          innerProgressLayerFillColor: "#00d4ff",
        },
        defaultFilled: {
          outerDecorativeLayerStrokeColor: "#6bffc3",
          outerDecorativeLayerFillColor: "#1a4a3a",
          innerBackgroundLayerFillColor: "#0a2015",
          innerProgressLayerFillColor: "#6bffc3",
        },
      },
    },
  } as any,
})

const meta: Meta = {
  title: "BrandCore/Display",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={demoTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta

// ============================================================================
// ProgressBar
// ============================================================================

export const ProgressBarBasic: StoryObj = {
  name: "ProgressBar - Basic",
  render: () => (
    <Box sx={{ height: 50, width: 400 }}>
      <ProgressBar aspectRatio={8} percentFilled={0.65} />
    </Box>
  ),
}

export const ProgressBarInteractive: StoryObj = {
  name: "ProgressBar - Interactive",
  render: () => {
    const [progress, setProgress] = useState(0.5)
    return (
      <Stack spacing={3} sx={{ width: 500 }}>
        <Typography variant="body2" sx={{ color: "white" }}>
          Progress: {Math.round(progress * 100)}%
        </Typography>
        <Slider
          value={progress}
          onChange={(_, v) => setProgress(v as number)}
          min={0}
          max={1}
          step={0.01}
        />
        <Box sx={{ height: 50 }}>
          <ProgressBar aspectRatio={10} percentFilled={progress} />
        </Box>
      </Stack>
    )
  },
}

export const ProgressBarFilled: StoryObj = {
  name: "ProgressBar - Filled (100%)",
  render: () => (
    <Box sx={{ height: 50, width: 400 }}>
      <ProgressBar aspectRatio={8} percentFilled={1} />
    </Box>
  ),
}

export const ProgressBarWithLevel: StoryObj = {
  name: "ProgressBar - With Level Display",
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <Box sx={{ height: 50 }}>
        <ProgressBar aspectRatio={8} percentFilled={0.4} displayedLevel={5} />
      </Box>
      <Box sx={{ height: 50 }}>
        <ProgressBar
          aspectRatio={8}
          percentFilled={0.85}
          displayedLevel="MAX"
        />
      </Box>
    </Stack>
  ),
}

export const ProgressBarAspectRatios: StoryObj = {
  name: "ProgressBar - Aspect Ratios",
  render: () => (
    <Stack spacing={3} sx={{ width: 500 }}>
      {[4, 6, 8, 10, 12].map((ratio) => (
        <Box key={ratio}>
          <Typography variant="caption" sx={{ color: "white" }}>
            Aspect Ratio: {ratio}:1
          </Typography>
          <Box sx={{ height: 40 }}>
            <ProgressBar aspectRatio={ratio} percentFilled={0.6} />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// ExpandingBar
// ============================================================================

export const ExpandingBarBasic: StoryObj = {
  name: "ExpandingBar - Basic",
  render: () => (
    <Box sx={{ height: 60, width: 300 }}>
      <ExpandingBar aspectRatio={5}>
        <Box sx={{ p: 1, color: "white", textAlign: "center" }}>
          Content Here
        </Box>
      </ExpandingBar>
    </Box>
  ),
}

export const ExpandingBarStates: StoryObj = {
  name: "ExpandingBar - Visual States",
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      {(["active", "inactive", "hovered"] as const).map((state) => (
        <Box key={state}>
          <Typography
            variant="caption"
            sx={{ color: "white", textTransform: "capitalize" }}
          >
            {state}
          </Typography>
          <Box sx={{ height: 50 }}>
            <ExpandingBar aspectRatio={6} visualState={state}>
              <Box sx={{ p: 1, color: "white", textAlign: "center" }}>
                {state}
              </Box>
            </ExpandingBar>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const ExpandingBarClickable: StoryObj = {
  name: "ExpandingBar - Clickable",
  render: () => {
    const [clicks, setClicks] = useState(0)
    return (
      <Stack spacing={2} sx={{ width: 300 }}>
        <Typography sx={{ color: "white" }}>Clicks: {clicks}</Typography>
        <Box sx={{ height: 60 }}>
          <ExpandingBar
            aspectRatio={5}
            enableRipple
            onClick={() => setClicks((c) => c + 1)}
          >
            <Box sx={{ p: 1, color: "white", textAlign: "center" }}>
              Click Me
            </Box>
          </ExpandingBar>
        </Box>
      </Stack>
    )
  },
}
