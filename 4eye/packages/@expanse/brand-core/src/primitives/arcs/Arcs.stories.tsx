import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { BorderArc, BorderArcsGroup, Arc1, Arc2, Arc3 } from "./BorderArc"
import { OrbitalRing, OrbitalRingSet, DualOrbitalRings } from "./OrbitalRing"

/**
 * Arc primitives for the brandCore package.
 * These include border arcs (logo style) and orbital rings (Saturn-like effects).
 */
const meta: Meta = {
  title: "BrandCore/Primitives/Arcs",
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
// Border Arcs
// ============================================================================

export const BorderArcs: StoryObj = {
  name: "Border Arcs",
  render: () => (
    <Box sx={{ width: 300, height: 300 }}>
      <svg viewBox="0 0 409 409" width="100%" height="100%">
        <Arc1 color="#00d4ff" opacity={0.8} />
        <Arc2 color="#00d4ff" opacity={0.5} />
        <Arc3 color="#00d4ff" opacity={0.3} />
      </svg>
    </Box>
  ),
}

export const BorderArcsIndividual: StoryObj = {
  name: "Border Arcs - Individual",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Arc 1
        </Typography>
        <Box sx={{ width: 120, height: 120 }}>
          <svg viewBox="0 0 409 409" width="100%" height="100%">
            <Arc1 color="#00d4ff" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Arc 2
        </Typography>
        <Box sx={{ width: 120, height: 120 }}>
          <svg viewBox="0 0 409 409" width="100%" height="100%">
            <Arc2 color="#00d4ff" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Arc 3
        </Typography>
        <Box sx={{ width: 120, height: 120 }}>
          <svg viewBox="0 0 409 409" width="100%" height="100%">
            <Arc3 color="#00d4ff" />
          </svg>
        </Box>
      </Box>
    </Stack>
  ),
}

export const BorderArcsGroupStory: StoryObj = {
  name: "Border Arcs Group",
  render: () => (
    <Box sx={{ width: 300, height: 300 }}>
      <svg viewBox="0 0 409 409" width="100%" height="100%">
        <BorderArcsGroup color="#ff6b6b" />
      </svg>
    </Box>
  ),
}

// ============================================================================
// Orbital Rings
// ============================================================================

export const OrbitalRingBasic: StoryObj = {
  name: "Orbital Ring - Basic",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <OrbitalRing
          centerX={50}
          centerY={50}
          extent={{ rx: 45, ry: 20 }}
          color="#00d4ff"
          strokeWidth={2}
        />
      </svg>
    </Box>
  ),
}

export const OrbitalRingRotations: StoryObj = {
  name: "Orbital Ring - Rotations",
  render: () => (
    <Stack direction="row" spacing={3}>
      {[0, 15, 30, 45, 60].map((rot) => (
        <Box key={rot} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {rot}°
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <OrbitalRing
                centerX={50}
                centerY={50}
                extent={{ rx: 40, ry: 15 }}
                rotation={rot}
                color="#c792ea"
                strokeWidth={2}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const OrbitalRingPresets: StoryObj = {
  name: "Orbital Ring - Extent Presets",
  render: () => (
    <Stack direction="row" spacing={3}>
      {(
        ["arcEdge", "arcCenter", "innerArc", "outerArc", "compact"] as const
      ).map((preset) => (
        <Box key={preset} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {preset}
          </Typography>
          <Box sx={{ width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <OrbitalRing
                centerX={50}
                centerY={50}
                extent={preset}
                color="#6bffc3"
                strokeWidth={2}
                rotation={15}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Orbital Ring Sets
// ============================================================================

export const OrbitalRingSetBasic: StoryObj = {
  name: "Orbital Ring Set - Basic",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <OrbitalRingSet
          centerX={50}
          centerY={50}
          extent={{ rx: 45, ry: 18 }}
          ringCount={3}
          color="#00d4ff"
          strokeWidth={1.5}
          rotation={10}
        />
      </svg>
    </Box>
  ),
}

export const OrbitalRingSetCounts: StoryObj = {
  name: "Orbital Ring Set - Ring Counts",
  render: () => (
    <Stack direction="row" spacing={4}>
      {([1, 2, 3] as const).map((count) => (
        <Box key={count} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {count} ring{count > 1 ? "s" : ""}
          </Typography>
          <Box sx={{ width: 120, height: 120 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <OrbitalRingSet
                centerX={50}
                centerY={50}
                extent={{ rx: 45, ry: 18 }}
                ringCount={count}
                color="#ffb86c"
                strokeWidth={1.5}
                rotation={15}
              />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Dual Orbital Rings
// ============================================================================

export const DualOrbitalRingsStory: StoryObj = {
  name: "Dual Orbital Rings",
  render: () => (
    <Box sx={{ width: 250, height: 250 }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <DualOrbitalRings
          centerX={50}
          centerY={50}
          extent={{ rx: 45, ry: 18 }}
          color="#ff6b6b"
          strokeWidth={1.5}
        />
      </svg>
    </Box>
  ),
}

export const DualOrbitalRingsModes: StoryObj = {
  name: "Dual Orbital Rings - Visibility Options",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Both
        </Typography>
        <Box sx={{ width: 150, height: 150 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <DualOrbitalRings
              centerX={50}
              centerY={50}
              extent={{ rx: 45, ry: 18 }}
              color="#c792ea"
              strokeWidth={1.5}
              showPrimary
              showMirrored
            />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "white" }}>
          Primary Only
        </Typography>
        <Box sx={{ width: 150, height: 150 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <DualOrbitalRings
              centerX={50}
              centerY={50}
              extent={{ rx: 45, ry: 18 }}
              color="#c792ea"
              strokeWidth={1.5}
              showPrimary
              showMirrored={false}
            />
          </svg>
        </Box>
      </Box>
    </Stack>
  ),
}

// ============================================================================
// Combined Showcase
// ============================================================================

export const ArcsShowcase: StoryObj = {
  name: "Arcs - Showcase",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
        Arc Primitives
      </Typography>
      <Stack direction="row" spacing={4} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 150, height: 150 }}>
            <svg viewBox="0 0 40 40" width="100%" height="100%">
              <BorderArcsGroup color="#00d4ff" />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            V4 Border Arcs
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 150, height: 150 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <OrbitalRingSet
                centerX={50}
                centerY={50}
                extent={{ rx: 45, ry: 18 }}
                ringCount={3}
                color="#ff6b6b"
                strokeWidth={1.5}
                rotation={10}
              />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Orbital Ring Set
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 150, height: 150 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <DualOrbitalRings
                centerX={50}
                centerY={50}
                extent={{ rx: 45, ry: 18 }}
                color="#6bffc3"
                strokeWidth={1.5}
              />
            </svg>
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            Dual Rings
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}
