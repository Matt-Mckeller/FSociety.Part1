import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { BrandProvider } from "../context/BrandContext"
import { DualCircles } from "./DualCircles/DualCircles"
import { MergingCircles } from "./MergingCircles/MergingCircles"
import { TripleDash } from "./TripleDash/TripleDash"
import { ConcentricCircles } from "./ConcentricCircles/ConcentricCircles"
import { PulsatingCircle } from "./PulsatingCircle/PulsatingCircle"
import { DualRectangles } from "./DualRectangles/DualRectangles"

const demoTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4ff" },
    background: { default: "#1a1a2e", paper: "#2a2a3e" },
  },
})

const meta: Meta = {
  title: "BrandCore/Shapes",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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
        <BrandProvider
          config={{ primaryColor: "#00d4ff", accentColor: "#c792ea" }}
        >
          <Story />
        </BrandProvider>
      </ThemeProvider>
    ),
  ],
}

export default meta

// ============================================================================
// DualCircles
// ============================================================================

export const DualCirclesBasic: StoryObj = {
  name: "DualCircles - Basic",
  render: () => (
    <Box sx={{ width: 100, height: 100 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <DualCircles centerX={50} centerY={50} />
      </svg>
    </Box>
  ),
}

export const DualCirclesVariants: StoryObj = {
  name: "DualCircles - Fill Variants",
  render: () => (
    <Stack direction="row" spacing={4}>
      {(["white", "background", "primary"] as const).map((fill) => (
        <Box key={fill} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {fill}
          </Typography>
          <Box sx={{ width: 80, height: 80 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <DualCircles fillVersion={fill} centerX={50} centerY={50} />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// TripleDash
// ============================================================================

export const TripleDashBasic: StoryObj = {
  name: "TripleDash - Basic",
  render: () => (
    <Box sx={{ width: 200, height: 20 }}>
      <TripleDash />
    </Box>
  ),
}

export const TripleDashOrientations: StoryObj = {
  name: "TripleDash - Orientations",
  render: () => (
    <Stack direction="row" spacing={6} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Horizontal
        </Typography>
        <Box sx={{ width: 150, height: 20, mt: 1 }}>
          <TripleDash orientation="horizontal" />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Vertical
        </Typography>
        <Box sx={{ width: 20, height: 150, mt: 1 }}>
          <TripleDash orientation="vertical" />
        </Box>
      </Box>
    </Stack>
  ),
}

export const TripleDashColors: StoryObj = {
  name: "TripleDash - Colors",
  render: () => (
    <Stack spacing={3} sx={{ width: 200 }}>
      <Box sx={{ height: 20 }}>
        <TripleDash color="#00d4ff" />
      </Box>
      <Box sx={{ height: 20 }}>
        <TripleDash color="#ff6b6b" />
      </Box>
      <Box sx={{ height: 20 }}>
        <TripleDash color={["#ff6b6b", "#ffd93d", "#6bffc3"]} />
      </Box>
    </Stack>
  ),
}

export const TripleDashAnimated: StoryObj = {
  name: "TripleDash - Animated",
  render: () => (
    <Stack spacing={4} sx={{ width: 200 }}>
      <Box>
        <Typography variant="caption" sx={{ color: "white" }}>
          Stagger In
        </Typography>
        <Box sx={{ height: 20, mt: 1 }}>
          <TripleDash animation={{ type: "stagger-in" }} />
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: "white" }}>
          Grow
        </Typography>
        <Box sx={{ height: 20, mt: 1 }}>
          <TripleDash animation={{ type: "grow" }} />
        </Box>
      </Box>
    </Stack>
  ),
}

// ============================================================================
// MergingCircles
// ============================================================================

export const MergingCirclesBasic: StoryObj = {
  name: "MergingCircles - Basic",
  render: () => (
    <Box sx={{ width: 650, height: 400 }}>
      <MergingCircles />
    </Box>
  ),
}

export const MergingCirclesCustom: StoryObj = {
  name: "MergingCircles - Custom Text",
  render: () => (
    <Box sx={{ width: 530, height: 300 }}>
      <MergingCircles
        leftCircle={{ size: 120, text: "Tech", color: "#00d4ff" }}
        rightCircle={{ size: 120, text: "Art", color: "#c792ea" }}
        mainCircle={{ size: 150, text: "Innovation" }}
        textArray={["Innovation", "Creation", "Impact"]}
      />
    </Box>
  ),
}

// ============================================================================
// ConcentricCircles
// ============================================================================

export const ConcentricCirclesBasic: StoryObj = {
  name: "ConcentricCircles - Basic",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <ConcentricCircles />
    </Box>
  ),
}

// ============================================================================
// PulsatingCircle
// ============================================================================

export const PulsatingCircleBasic: StoryObj = {
  name: "PulsatingCircle - Basic",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <PulsatingCircle color="#00d4ff" />
    </Box>
  ),
}

export const PulsatingCircleVariants: StoryObj = {
  name: "PulsatingCircle - Variants",
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Stack alignItems="center" spacing={1}>
        <Box sx={{ width: 120, height: 120 }}>
          <PulsatingCircle ringCount={2} color="#00d4ff" />
        </Box>
        <Typography variant="caption">2 Rings</Typography>
      </Stack>
      <Stack alignItems="center" spacing={1}>
        <Box sx={{ width: 120, height: 120 }}>
          <PulsatingCircle ringCount={3} color="#c792ea" />
        </Box>
        <Typography variant="caption">3 Rings (default)</Typography>
      </Stack>
      <Stack alignItems="center" spacing={1}>
        <Box sx={{ width: 120, height: 120 }}>
          <PulsatingCircle ringCount={4} color="#ff6b6b" />
        </Box>
        <Typography variant="caption">4 Rings</Typography>
      </Stack>
    </Stack>
  ),
}

// ============================================================================
// DualRectangles
// ============================================================================

export const DualRectanglesBasic: StoryObj = {
  name: "DualRectangles - Basic",
  render: () => (
    <Box sx={{ width: 150, height: 100 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <DualRectangles centerX={45} centerY={50} />
      </svg>
    </Box>
  ),
}
