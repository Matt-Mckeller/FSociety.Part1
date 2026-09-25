import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { Circle } from "./Circle"
import { Triangle } from "./Triangle"
import { Square } from "./Square"
import { Hexagon, Pentagon, Star } from "./Polygon"

/**
 * Shape primitives for the brandCore package.
 * These are the fundamental building blocks for brand visuals.
 */
const meta: Meta = {
  title: "BrandCore/Primitives/Shapes",
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
// Circle
// ============================================================================

export const CircleBasic: StoryObj = {
  name: "Circle - Basic",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <Circle centerX={50} centerY={50} radius={40} fill="#00d4ff" />
      </svg>
    </Box>
  ),
}

export const CircleWithPupil: StoryObj = {
  name: "Circle - With Pupil (Eye)",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0, 45, 90, 180, 270].map((direction) => (
        <Box key={direction} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {direction}°
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Circle
                centerX={50}
                centerY={50}
                radius={35}
                fill="#00d4ff"
                showPupil
                pupilDirection={direction}
                pupilOffset={0.3}
                pupilSize={0.3}
                pupilColor="#0a0a1a"
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const CircleOpacities: StoryObj = {
  name: "Circle - Opacities",
  render: () => (
    <Stack direction="row" spacing={2}>
      {[1, 0.75, 0.5, 0.25, 0.1].map((op) => (
        <Box key={op} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {op * 100}%
          </Typography>
          <Box sx={{ width: 80, height: 80 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Circle
                centerX={50}
                centerY={50}
                radius={40}
                fill="#00d4ff"
                opacity={op}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Triangle
// ============================================================================

export const TriangleOrientations: StoryObj = {
  name: "Triangle - Orientations",
  render: () => (
    <Stack direction="row" spacing={4}>
      {(["up", "down", "left", "right"] as const).map((orientation) => (
        <Box key={orientation} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {orientation}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Triangle
                centerX={50}
                centerY={50}
                radius={35}
                fill="#ff6b6b"
                orientation={orientation}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const TriangleCornerRadius: StoryObj = {
  name: "Triangle - Corner Radius",
  render: () => (
    <Stack direction="row" spacing={3}>
      {[0, 3, 6, 10, 15].map((cr) => (
        <Box key={cr} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            r={cr}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Triangle
                centerX={50}
                centerY={50}
                radius={35}
                fill="#ff6b6b"
                orientation="up"
                cornerRadius={cr}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Square
// ============================================================================

export const SquareBasic: StoryObj = {
  name: "Square - Basic",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0, 15, 30, 45].map((rotation) => (
        <Box key={rotation} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {rotation}°
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Square
                centerX={50}
                centerY={50}
                radius={30}
                fill="#ffd93d"
                transform={`rotate(${rotation}, 50, 50)`}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const SquareCornerRadius: StoryObj = {
  name: "Square - Corner Radius",
  render: () => (
    <Stack direction="row" spacing={3}>
      {[0, 4, 8, 12, 20].map((cr) => (
        <Box key={cr} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            r={cr}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Square
                centerX={50}
                centerY={50}
                radius={30}
                fill="#ffd93d"
                cornerRadius={cr}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Polygons
// ============================================================================

export const PolygonGallery: StoryObj = {
  name: "Polygons - Gallery",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Pentagon
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <Pentagon centerX={50} centerY={50} radius={40} fill="#c792ea" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Hexagon
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <Hexagon centerX={50} centerY={50} radius={40} fill="#6bffc3" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Star (5pt)
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <Star
              centerX={50}
              centerY={50}
              radius={40}
              fill="#ffb86c"
              sides={5}
            />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Star (6pt)
        </Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <Star
              centerX={50}
              centerY={50}
              radius={40}
              fill="#ffb86c"
              sides={6}
            />
          </svg>
        </Box>
      </Box>
    </Stack>
  ),
}

export const StarInnerRadius: StoryObj = {
  name: "Star - Inner Radius Variations",
  render: () => (
    <Stack direction="row" spacing={3}>
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((ir) => (
        <Box key={ir} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {ir}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Star
                centerX={50}
                centerY={50}
                radius={40}
                fill="#ffb86c"
                sides={5}
                innerRadiusRatio={ir}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// All Shapes Combined
// ============================================================================

export const ShapeShowcase: StoryObj = {
  name: "All Shapes - Showcase",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
        Shape Primitives
      </Typography>
      <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Circle centerX={50} centerY={50} radius={35} fill="#00d4ff" />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Circle
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Triangle
                centerX={50}
                centerY={50}
                radius={35}
                fill="#ff6b6b"
                orientation="up"
              />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Triangle
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Square centerX={50} centerY={50} radius={25} fill="#ffd93d" />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Square
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Pentagon centerX={50} centerY={50} radius={35} fill="#c792ea" />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Pentagon
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Hexagon centerX={50} centerY={50} radius={35} fill="#6bffc3" />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Hexagon
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <Star
                centerX={50}
                centerY={50}
                radius={35}
                fill="#ffb86c"
                sides={5}
              />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Star
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}
