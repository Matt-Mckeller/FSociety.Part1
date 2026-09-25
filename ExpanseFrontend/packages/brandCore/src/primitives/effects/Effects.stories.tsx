import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { GlowFilter, SimpleGlowFilter } from "./GlowFilter"
import {
  LinearGradientDef,
  RadialGradientDef,
  SphereGradientDef,
} from "./GradientDef"
import { Circle } from "../shapes/Circle"

/**
 * Effect primitives for the brandCore package.
 * These include filters (glow) and gradient definitions.
 */
const meta: Meta = {
  title: "BrandCore/Primitives/Effects",
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
}

export default meta

// ============================================================================
// Glow Filters
// ============================================================================

export const GlowFilterBasic: StoryObj = {
  name: "Glow Filter - Basic",
  render: () => (
    <Stack direction="row" spacing={6}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Without Glow
        </Typography>
        <Box sx={{ width: 120, height: 120 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <Circle centerX={50} centerY={50} radius={30} fill="#00d4ff" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          With Glow
        </Typography>
        <Box sx={{ width: 120, height: 120 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <GlowFilter
                id="glow-demo"
                blur={4}
                color="#00d4ff"
                intensity={1}
              />
            </defs>
            <Circle
              centerX={50}
              centerY={50}
              radius={30}
              fill="#00d4ff"
              shadowFilterId="glow-demo"
            />
          </svg>
        </Box>
      </Box>
    </Stack>
  ),
}

export const GlowFilterIntensities: StoryObj = {
  name: "Glow Filter - Intensities",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0.3, 0.6, 1, 1.5, 2].map((intensity, i) => (
        <Box key={intensity} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {intensity}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <GlowFilter
                  id={`glow-int-${i}`}
                  blur={4}
                  color="#ff6b6b"
                  intensity={intensity}
                />
              </defs>
              <Circle
                centerX={50}
                centerY={50}
                radius={25}
                fill="#ff6b6b"
                shadowFilterId={`glow-int-${i}`}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const GlowFilterColors: StoryObj = {
  name: "Glow Filter - Colors",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[
        { color: "#00d4ff", name: "Cyan" },
        { color: "#ff6b6b", name: "Red" },
        { color: "#6bffc3", name: "Green" },
        { color: "#c792ea", name: "Purple" },
        { color: "#ffd93d", name: "Yellow" },
      ].map(({ color, name }, i) => (
        <Box key={name} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {name}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <GlowFilter
                  id={`glow-color-${i}`}
                  blur={5}
                  color={color}
                  intensity={1}
                />
              </defs>
              <Circle
                centerX={50}
                centerY={50}
                radius={25}
                fill={color}
                shadowFilterId={`glow-color-${i}`}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Gradients
// ============================================================================

export const LinearGradients: StoryObj = {
  name: "Linear Gradients",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Horizontal
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <LinearGradientDef
                id="linear-h"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stops={[
                  { offset: 0, color: "#00d4ff" },
                  { offset: 1, color: "#c792ea" },
                ]}
              />
            </defs>
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              rx="8"
              fill="url(#linear-h)"
            />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Vertical
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <LinearGradientDef
                id="linear-v"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                stops={[
                  { offset: 0, color: "#ff6b6b" },
                  { offset: 1, color: "#ffd93d" },
                ]}
              />
            </defs>
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              rx="8"
              fill="url(#linear-v)"
            />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Diagonal
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <LinearGradientDef
                id="linear-d"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                stops={[
                  { offset: 0, color: "#6bffc3" },
                  { offset: 0.5, color: "#00d4ff" },
                  { offset: 1, color: "#c792ea" },
                ]}
              />
            </defs>
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              rx="8"
              fill="url(#linear-d)"
            />
          </svg>
        </Box>
      </Box>
    </Stack>
  ),
}

export const RadialGradients: StoryObj = {
  name: "Radial Gradients",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Center
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <RadialGradientDef
                id="radial-c"
                stops={[
                  { offset: 0, color: "#ffffff" },
                  { offset: 1, color: "#00d4ff" },
                ]}
              />
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#radial-c)" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Off-center
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <RadialGradientDef
                id="radial-o"
                cx="30%"
                cy="30%"
                stops={[
                  { offset: 0, color: "#ffffff" },
                  { offset: 0.5, color: "#ff6b6b" },
                  { offset: 1, color: "#990000" },
                ]}
              />
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#radial-o)" />
          </svg>
        </Box>
      </Box>
    </Stack>
  ),
}

export const SphereGradients: StoryObj = {
  name: "Sphere Gradient (3D Effect)",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[
        { color: "#00d4ff", name: "Cyan" },
        { color: "#ff6b6b", name: "Red" },
        { color: "#6bffc3", name: "Green" },
        { color: "#ffd93d", name: "Yellow" },
      ].map(({ color, name }, i) => (
        <Box key={name} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {name}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <SphereGradientDef
                  id={`sphere-${i}`}
                  color={color}
                  lightAngle={315}
                  highlightIntensity={0.8}
                />
              </defs>
              <circle cx="50" cy="50" r="35" fill={`url(#sphere-${i})`} />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Combined Showcase
// ============================================================================

export const EffectsShowcase: StoryObj = {
  name: "Effects - Showcase",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
        Effect Primitives
      </Typography>
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ color: "white", mb: 2 }}>
            Glow Effects
          </Typography>
          <Stack direction="row" spacing={4}>
            {["#00d4ff", "#ff6b6b", "#6bffc3", "#c792ea"].map((color, i) => (
              <Box key={i} sx={{ width: 80, height: 80 }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <defs>
                    <GlowFilter
                      id={`showcase-glow-${i}`}
                      blur={5}
                      color={color}
                      intensity={1.2}
                    />
                  </defs>
                  <Circle
                    centerX={50}
                    centerY={50}
                    radius={25}
                    fill={color}
                    shadowFilterId={`showcase-glow-${i}`}
                  />
                </svg>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ color: "white", mb: 2 }}>
            Gradient Fills
          </Typography>
          <Stack direction="row" spacing={4}>
            <Box sx={{ width: 80, height: 80 }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <defs>
                  <LinearGradientDef
                    id="showcase-linear"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                    stops={[
                      { offset: 0, color: "#00d4ff" },
                      { offset: 1, color: "#c792ea" },
                    ]}
                  />
                </defs>
                <circle cx="50" cy="50" r="35" fill="url(#showcase-linear)" />
              </svg>
            </Box>
            <Box sx={{ width: 80, height: 80 }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <defs>
                  <RadialGradientDef
                    id="showcase-radial"
                    cx="30%"
                    cy="30%"
                    stops={[
                      { offset: 0, color: "#ffffff", opacity: 0.9 },
                      { offset: 0.5, color: "#ff6b6b" },
                      { offset: 1, color: "#660000" },
                    ]}
                  />
                </defs>
                <circle cx="50" cy="50" r="35" fill="url(#showcase-radial)" />
              </svg>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
}
