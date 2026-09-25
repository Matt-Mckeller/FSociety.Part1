import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper } from "@mui/material"
import { BackgroundGradient1 } from "./BackgroundGradient1"

/**
 * Style components for gradients and visual effects.
 * These are typically used as SVG definitions that can be referenced in other SVGs.
 */
const meta: Meta = {
  title: "DynamicAssets/Style",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// BackgroundGradient1
// ============================================================================

export const BackgroundGradientDemo: StoryObj = {
  name: "BackgroundGradient1",
  render: () => (
    <Box sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h6" mb={2}>
        Background Gradient
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        An SVG linear gradient definition that uses the theme's
        gradient.background palette. This is intended to be used as a gradient
        definition inside SVG elements.
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle2" mb={2}>
          Usage Example
        </Typography>
        <svg width="400" height="200" viewBox="0 0 400 200">
          <defs>
            <BackgroundGradient1 id="demoGradient" />
          </defs>
          <rect
            x="0"
            y="0"
            width="400"
            height="200"
            rx="16"
            fill="url(#demoGradient)"
          />
          <text
            x="200"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
          >
            Theme Gradient Background
          </text>
        </svg>
      </Paper>

      <Paper sx={{ p: 2, mt: 3, bgcolor: "grey.100" }}>
        <Typography
          variant="caption"
          component="pre"
          sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
        >
          {
            '// Usage in SVG:\n<svg>\n  <defs>\n    <BackgroundGradient1 id="myGradient" />\n  </defs>\n  <rect fill="url(#myGradient)" ... />\n</svg>'
          }
        </Typography>
      </Paper>
    </Box>
  ),
}

export const BackgroundGradientShapes: StoryObj = {
  name: "BackgroundGradient1 - Various Shapes",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" mb={3}>
        Gradient Applied to Shapes
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="caption"
            mb={1}
            display="block"
            textAlign="center"
          >
            Circle
          </Typography>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <BackgroundGradient1 id="circleGradient" />
            </defs>
            <circle cx="60" cy="60" r="50" fill="url(#circleGradient)" />
          </svg>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography
            variant="caption"
            mb={1}
            display="block"
            textAlign="center"
          >
            Rounded Rect
          </Typography>
          <svg width="150" height="120" viewBox="0 0 150 120">
            <defs>
              <BackgroundGradient1 id="rectGradient" />
            </defs>
            <rect
              x="10"
              y="10"
              width="130"
              height="100"
              rx="20"
              fill="url(#rectGradient)"
            />
          </svg>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography
            variant="caption"
            mb={1}
            display="block"
            textAlign="center"
          >
            Star
          </Typography>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <BackgroundGradient1 id="starGradient" />
            </defs>
            <polygon
              points="60,10 72,45 110,45 80,70 90,105 60,85 30,105 40,70 10,45 48,45"
              fill="url(#starGradient)"
            />
          </svg>
        </Paper>
      </Box>
    </Box>
  ),
}
