import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import {
  DualCircleGroup1,
  DualRectGroup1,
  ExpandingCircleContainer,
  ExpandingCircleContainerV2,
  ExpandingCirclesAnimation,
} from "./index"

/**
 * Shape components for decorative visual elements.
 * These components are used for backgrounds, accents, and animated visual effects.
 */
const meta: Meta = {
  title: "DynamicAssets/Shapes",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// DualCircleGroup1
// ============================================================================

export const DualCircleGroup1Story: StoryObj = {
  name: "DualCircleGroup1",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <svg viewBox="-50 -50 100 100" width="100%" height="100%">
        <DualCircleGroup1 />
      </svg>
    </Box>
  ),
}

export const DualCircleGroup1Variants: StoryObj = {
  name: "DualCircleGroup1 - Variants",
  render: () => (
    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption">Default</Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="-50 -50 100 100" width="100%" height="100%">
            <DualCircleGroup1 fillVersion="default" strokeVersion="default" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption">White Fill</Typography>
        <Box
          sx={{
            width: 100,
            height: 100,
            bgcolor: "primary.main",
            borderRadius: 1,
          }}
        >
          <svg viewBox="-50 -50 100 100" width="100%" height="100%">
            <DualCircleGroup1 fillVersion="white" strokeVersion="white" />
          </svg>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption">Background Fill</Typography>
        <Box sx={{ width: 100, height: 100 }}>
          <svg viewBox="-50 -50 100 100" width="100%" height="100%">
            <DualCircleGroup1
              fillVersion="background"
              strokeVersion="contrastBG"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  ),
}

// ============================================================================
// DualRectGroup1
// ============================================================================

export const DualRectGroup1Story: StoryObj = {
  name: "DualRectGroup1",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <svg viewBox="-50 -50 100 100" width="100%" height="100%">
        <DualRectGroup1 />
      </svg>
    </Box>
  ),
}

// ============================================================================
// ExpandingCircleContainer
// ============================================================================

export const ExpandingCircleContainerStory: StoryObj = {
  name: "ExpandingCircleContainer",
  render: () => (
    <Box sx={{ width: 300, height: 300, position: "relative" }}>
      <ExpandingCircleContainer />
    </Box>
  ),
}

// ============================================================================
// ExpandingCircleContainerV2
// ============================================================================

export const ExpandingCircleContainerV2Story: StoryObj = {
  name: "ExpandingCircleContainerV2",
  render: () => (
    <Box sx={{ width: 300, height: 300, position: "relative" }}>
      <ExpandingCircleContainerV2 />
    </Box>
  ),
}

// ============================================================================
// ExpandingCirclesAnimation
// ============================================================================

export const ExpandingCirclesAnimationStory: StoryObj = {
  name: "ExpandingCirclesAnimation",
  render: () => (
    <Box sx={{ width: 300, height: 300, position: "relative" }}>
      <ExpandingCirclesAnimation />
    </Box>
  ),
}

// ============================================================================
// All Shapes Gallery
// ============================================================================

export const AllShapes: StoryObj = {
  name: "Gallery - All Shapes",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h5">Shape Components Gallery</Typography>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" mb={1}>
            DualCircleGroup1
          </Typography>
          <Box sx={{ width: 150, height: 150, mx: "auto" }}>
            <svg viewBox="-50 -50 100 100" width="100%" height="100%">
              <DualCircleGroup1 />
            </svg>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" mb={1}>
            DualRectGroup1
          </Typography>
          <Box sx={{ width: 150, height: 150, mx: "auto" }}>
            <svg viewBox="-50 -50 100 100" width="100%" height="100%">
              <DualRectGroup1 />
            </svg>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" mb={1}>
            ExpandingCircleContainer
          </Typography>
          <Box
            sx={{ width: 150, height: 150, mx: "auto", position: "relative" }}
          >
            <ExpandingCircleContainer />
          </Box>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" mb={1}>
            ExpandingCircleContainerV2
          </Typography>
          <Box
            sx={{ width: 150, height: 150, mx: "auto", position: "relative" }}
          >
            <ExpandingCircleContainerV2 />
          </Box>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2" mb={1}>
            ExpandingCirclesAnimation
          </Typography>
          <Box
            sx={{ width: 150, height: 150, mx: "auto", position: "relative" }}
          >
            <ExpandingCirclesAnimation />
          </Box>
        </Box>
      </Box>
    </Box>
  ),
}
