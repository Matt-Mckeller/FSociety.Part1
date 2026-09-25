import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import {
  LighteningCloud,
  SpiralBrowserScreen,
  WebAndMobileAppScreens,
  ScrumBoard,
  OneTwoThreeLine,
  AnimatedExpandingCircle,
  ContactUsGraphic,
  AgileLifecycleLoopGraphic,
  ContactUsCharacter,
  Curtains,
} from "./index"

/**
 * Graphics components for marketing pages, illustrations, and decorative visuals.
 * These components are primarily used on landing pages and informational sections.
 */
const meta: Meta = {
  title: "DynamicAssets/Graphics",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// Animated Graphics
// ============================================================================

export const AnimatedExpandingCircleStory: StoryObj = {
  name: "AnimatedExpandingCircle",
  render: () => (
    <Box sx={{ width: 200, height: 200 }}>
      <AnimatedExpandingCircle />
    </Box>
  ),
}

export const LighteningCloudStory: StoryObj = {
  name: "LighteningCloud",
  render: () => (
    <Box sx={{ width: 300, height: 200 }}>
      <LighteningCloud />
    </Box>
  ),
}

// ============================================================================
// Browser & App Graphics
// ============================================================================

export const SpiralBrowserScreenStory: StoryObj = {
  name: "SpiralBrowserScreen",
  render: () => (
    <Box sx={{ width: 400, height: 300 }}>
      <SpiralBrowserScreen />
    </Box>
  ),
}

export const WebAndMobileAppScreensStory: StoryObj = {
  name: "WebAndMobileAppScreens",
  render: () => (
    <Box sx={{ width: 500, height: 350 }}>
      <WebAndMobileAppScreens />
    </Box>
  ),
}

// ============================================================================
// Agile & Development Graphics
// ============================================================================

export const ScrumBoardStory: StoryObj = {
  name: "ScrumBoard",
  render: () => (
    <Box sx={{ width: 400, height: 300 }}>
      <ScrumBoard />
    </Box>
  ),
}

export const AgileLifecycleLoopGraphicStory: StoryObj = {
  name: "AgileLifecycleLoopGraphic",
  render: () => (
    <Box sx={{ width: 400, height: 400 }}>
      <AgileLifecycleLoopGraphic />
    </Box>
  ),
}

// ============================================================================
// Step & Process Graphics
// ============================================================================

export const OneTwoThreeLineStory: StoryObj = {
  name: "OneTwoThreeLine",
  render: () => (
    <Box sx={{ width: 600, height: 100 }}>
      <OneTwoThreeLine />
    </Box>
  ),
}

// ============================================================================
// Contact & Character Graphics
// ============================================================================

export const ContactUsGraphicStory: StoryObj = {
  name: "ContactUsGraphic",
  render: () => (
    <Box sx={{ width: 400, height: 300 }}>
      <ContactUsGraphic />
    </Box>
  ),
}

export const ContactUsCharacterStory: StoryObj = {
  name: "ContactUsCharacter",
  render: () => (
    <Box sx={{ width: 300, height: 400 }}>
      <ContactUsCharacter />
    </Box>
  ),
}

// ============================================================================
// Decorative Graphics
// ============================================================================

export const CurtainsStory: StoryObj = {
  name: "Curtains",
  render: () => (
    <Box
      sx={{ width: 600, height: 400, position: "relative", overflow: "hidden" }}
    >
      <Curtains />
    </Box>
  ),
}

// ============================================================================
// Gallery - All Graphics
// ============================================================================

export const AllGraphics: StoryObj = {
  name: "Gallery - All Graphics",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Typography variant="h5">Graphics Components Gallery</Typography>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 }}
      >
        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            AnimatedExpandingCircle
          </Typography>
          <Box sx={{ width: 150, height: 150, mx: "auto" }}>
            <AnimatedExpandingCircle />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            LighteningCloud
          </Typography>
          <Box sx={{ width: 200, height: 150, mx: "auto" }}>
            <LighteningCloud />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            SpiralBrowserScreen
          </Typography>
          <Box sx={{ width: 250, height: 180, mx: "auto" }}>
            <SpiralBrowserScreen />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            WebAndMobileAppScreens
          </Typography>
          <Box sx={{ width: 300, height: 200, mx: "auto" }}>
            <WebAndMobileAppScreens />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            ScrumBoard
          </Typography>
          <Box sx={{ width: 250, height: 180, mx: "auto" }}>
            <ScrumBoard />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            OneTwoThreeLine
          </Typography>
          <Box sx={{ width: 300, height: 60, mx: "auto" }}>
            <OneTwoThreeLine />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            ContactUsGraphic
          </Typography>
          <Box sx={{ width: 250, height: 180, mx: "auto" }}>
            <ContactUsGraphic />
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            ContactUsCharacter
          </Typography>
          <Box sx={{ width: 180, height: 250, mx: "auto" }}>
            <ContactUsCharacter />
          </Box>
        </Box>
      </Box>
    </Box>
  ),
}
