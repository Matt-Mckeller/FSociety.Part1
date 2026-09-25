import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Paper } from "@mui/material"
import {
  BackgroundGradient,
  GRADIENT_PRESETS,
  type GradientSplit,
  type GradientDirection,
} from "./BackgroundGradient"

/**
 * Gradient Primitives
 *
 * Theme-aware diagonal gradients following the "darkness to light" brand theme.
 * These gradients represent growth, progression, and transformation.
 *
 * ## Split Modes
 * - **soft**: Smooth transition (default) - subtle, natural feel
 * - **hard**: 50/50 with small transition zone - defined but smooth
 * - **sharp**: Pure 50/50 split - strong contrast, distinct halves
 */
const meta: Meta = {
  title: "BrandCore/Primitives/Gradients",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#1a1a2e" },
      ],
    },
  },
}

export default meta

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface GradientSwatchProps {
  id: string
  label: string
  children: React.ReactNode
  width?: number
  height?: number
}

function GradientSwatch({
  id,
  label,
  children,
  width = 150,
  height = 100,
}: GradientSwatchProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
        {label}
      </Typography>
      <svg
        width={width}
        height={height}
        style={{ borderRadius: 8, overflow: "hidden" }}
      >
        <defs>{children}</defs>
        <rect x={0} y={0} width={width} height={height} fill={`url(#${id})`} />
      </svg>
    </Box>
  )
}

// ============================================================================
// SPLIT MODES
// ============================================================================

export const SplitModesShowcase: StoryObj = {
  name: "Split Modes",
  render: () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Gradient Split Modes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Control how the gradient transitions between colors
      </Typography>
      <Stack direction="row" spacing={4}>
        <GradientSwatch id="split-soft" label="soft (default)">
          <BackgroundGradient id="split-soft" split="soft" />
        </GradientSwatch>
        <GradientSwatch id="split-hard" label="hard">
          <BackgroundGradient id="split-hard" split="hard" />
        </GradientSwatch>
        <GradientSwatch id="split-sharp" label="sharp">
          <BackgroundGradient id="split-sharp" split="sharp" />
        </GradientSwatch>
      </Stack>
    </Paper>
  ),
}

export const SplitModesComparison: StoryObj = {
  name: "Split Modes - Large Comparison",
  render: () => (
    <Stack spacing={3}>
      {(["soft", "hard", "sharp"] as const).map((split) => (
        <Box key={split}>
          <Typography variant="subtitle2" gutterBottom>
            {split.charAt(0).toUpperCase() + split.slice(1)} Split
          </Typography>
          <svg width={400} height={80} style={{ borderRadius: 8 }}>
            <defs>
              <BackgroundGradient id={`large-${split}`} split={split} />
            </defs>
            <rect
              x={0}
              y={0}
              width={400}
              height={80}
              fill={`url(#large-${split})`}
            />
          </svg>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// DIRECTIONS
// ============================================================================

export const DirectionVariants: StoryObj = {
  name: "Direction Variants",
  render: () => {
    const directions: GradientDirection[] = [
      "bottom-left-to-top-right",
      "top-left-to-bottom-right",
      "left-to-right",
      "bottom-to-top",
    ]
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Gradient Directions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          "Darkness to light" follows the bottom-left to top-right direction by
          default
        </Typography>
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 3 }}>
          {directions.map((direction) => (
            <GradientSwatch
              key={direction}
              id={`dir-${direction}`}
              label={direction}
            >
              <BackgroundGradient
                id={`dir-${direction}`}
                direction={direction}
              />
            </GradientSwatch>
          ))}
        </Stack>
      </Paper>
    )
  },
}

// ============================================================================
// PRESETS
// ============================================================================

export const GradientPresets: StoryObj = {
  name: "Gradient Presets",
  render: () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Gradient Presets
      </Typography>
      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", gap: 3 }}>
        {Object.entries(GRADIENT_PRESETS).map(([name, config]) => (
          <Box key={name} sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
              {name}
            </Typography>
            <svg width={120} height={80} style={{ borderRadius: 6 }}>
              <defs>
                <BackgroundGradient id={`preset-${name}`} {...config} />
              </defs>
              <rect
                x={0}
                y={0}
                width={120}
                height={80}
                fill={`url(#preset-${name})`}
              />
            </svg>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5, fontSize: "0.6rem" }}
            >
              {config.split ?? "soft"}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  ),
}

// ============================================================================
// PRACTICAL APPLICATIONS
// ============================================================================

export const GradientInCards: StoryObj = {
  name: "Gradients in Cards",
  render: () => (
    <Stack direction="row" spacing={3}>
      {(["soft", "hard", "sharp"] as const).map((split) => (
        <Paper
          key={split}
          elevation={3}
          sx={{ width: 200, overflow: "hidden", borderRadius: 2 }}
        >
          <svg width={200} height={100}>
            <defs>
              <BackgroundGradient id={`card-${split}`} split={split} />
            </defs>
            <rect
              x={0}
              y={0}
              width={200}
              height={100}
              fill={`url(#card-${split})`}
            />
          </svg>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              {split.charAt(0).toUpperCase() + split.slice(1)} Gradient
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Card header with {split} split
            </Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  ),
}

export const GradientWithOverlay: StoryObj = {
  name: "Gradient with Content Overlay",
  render: () => (
    <Box
      sx={{
        position: "relative",
        width: 300,
        height: 200,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <svg
        width={300}
        height={200}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <BackgroundGradient id="overlay-gradient" split="hard" />
        </defs>
        <rect
          x={0}
          y={0}
          width={300}
          height={200}
          fill="url(#overlay-gradient)"
        />
      </svg>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          Growth Theme
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
          Darkness to light represents progression
        </Typography>
      </Box>
    </Box>
  ),
}

export const GradientCircles: StoryObj = {
  name: "Gradients on Shapes",
  render: () => (
    <Stack direction="row" spacing={4}>
      {(["soft", "hard", "sharp"] as const).map((split) => (
        <svg key={split} width={100} height={100}>
          <defs>
            <BackgroundGradient id={`circle-${split}`} split={split} />
          </defs>
          <circle cx={50} cy={50} r={45} fill={`url(#circle-${split})`} />
        </svg>
      ))}
    </Stack>
  ),
}

// ============================================================================
// BRAND THEME
// ============================================================================

export const DarknessToLight: StoryObj = {
  name: "Darkness to Light Theme",
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        "Darkness to Light" Brand Theme
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        The diagonal gradient from bottom-left (dark) to top-right (light)
        represents growth, progression, and the journey from uncertainty to
        clarity.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <svg width="100%" height={120} style={{ borderRadius: 8 }}>
          <defs>
            <BackgroundGradient
              id="brand-theme"
              split="soft"
              direction="bottom-left-to-top-right"
            />
          </defs>
          <rect
            x={0}
            y={0}
            width="100%"
            height={120}
            fill="url(#brand-theme)"
          />
          {/* Arrow indicating direction */}
          <path
            d="M 30 90 L 420 30"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
            strokeDasharray="8 4"
            fill="none"
          />
          <polygon points="420,30 408,25 410,38" fill="rgba(255,255,255,0.5)" />
          {/* Labels */}
          <text x={40} y={105} fill="rgba(255,255,255,0.7)" fontSize={12}>
            Dark (Origin)
          </text>
          <text x={360} y={25} fill="rgba(255,255,255,0.7)" fontSize={12}>
            Light (Growth)
          </text>
        </svg>
      </Box>

      <Typography variant="body2">
        <strong>Use cases:</strong>
      </Typography>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <Typography component="li" variant="body2">
          Card headers and hero sections
        </Typography>
        <Typography component="li" variant="body2">
          Progress indicators and XP meters
        </Typography>
        <Typography component="li" variant="body2">
          Achievement and completion states
        </Typography>
        <Typography component="li" variant="body2">
          Loading and transition animations
        </Typography>
      </ul>
    </Paper>
  ),
}
