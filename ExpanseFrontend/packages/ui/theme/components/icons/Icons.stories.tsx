"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import { CoinIcon } from "./CoinIcon.component"
import { CoinStackIcon } from "./CoinStackIcon.component"
import { GemIcon } from "./GemIcon.component"
import { ExperienceIcon } from "./ExperienceIcon.component"

/**
 * Currency and reward icons used throughout the application.
 * These icons represent different types of in-game currency and rewards.
 */
const meta: Meta = {
  title: "Theme/Icons",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta

// =============================================================================
// CoinIcon Stories
// =============================================================================

export const CoinIconDefault: StoryObj = {
  name: "CoinIcon - Default",
  render: () => (
    <Box sx={{ width: 80, height: 80 }}>
      <CoinIcon color="#FFD700" />
    </Box>
  ),
}

export const CoinIconWithText: StoryObj = {
  name: "CoinIcon - With Text",
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ width: 60, height: 60 }}>
        <CoinIcon color="#FFD700" coinText="5" />
      </Box>
      <Box sx={{ width: 60, height: 60 }}>
        <CoinIcon color="#FFD700" coinText="10" />
      </Box>
      <Box sx={{ width: 60, height: 60 }}>
        <CoinIcon color="#FFD700" coinText="25" />
      </Box>
      <Box sx={{ width: 80, height: 80 }}>
        <CoinIcon color="#FFD700" coinText="100" />
      </Box>
    </Stack>
  ),
}

export const CoinIconColors: StoryObj = {
  name: "CoinIcon - Color Variants",
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 60, height: 60 }}>
          <CoinIcon color="#FFD700" />
        </Box>
        <Typography variant="caption">Gold</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 60, height: 60 }}>
          <CoinIcon color="#C0C0C0" />
        </Box>
        <Typography variant="caption">Silver</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 60, height: 60 }}>
          <CoinIcon color="#CD7F32" />
        </Box>
        <Typography variant="caption">Bronze</Typography>
      </Box>
    </Stack>
  ),
}

export const CoinIconSizes: StoryObj = {
  name: "CoinIcon - Sizes",
  render: () => (
    <Stack direction="row" spacing={3} alignItems="end">
      <Box sx={{ width: 24, height: 24 }}>
        <CoinIcon color="#FFD700" />
      </Box>
      <Box sx={{ width: 40, height: 40 }}>
        <CoinIcon color="#FFD700" />
      </Box>
      <Box sx={{ width: 60, height: 60 }}>
        <CoinIcon color="#FFD700" />
      </Box>
      <Box sx={{ width: 80, height: 80 }}>
        <CoinIcon color="#FFD700" />
      </Box>
      <Box sx={{ width: 120, height: 120 }}>
        <CoinIcon color="#FFD700" />
      </Box>
    </Stack>
  ),
}

// =============================================================================
// CoinStackIcon Stories
// =============================================================================

export const CoinStackIconDefault: StoryObj = {
  name: "CoinStackIcon - Default",
  render: () => (
    <Box sx={{ width: 120, height: 100 }}>
      <CoinStackIcon />
    </Box>
  ),
}

export const CoinStackIconWithOpacity: StoryObj = {
  name: "CoinStackIcon - Ring Opacity",
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 100, height: 80 }}>
          <CoinStackIcon ringOpacity={1} />
        </Box>
        <Typography variant="caption">Opacity: 1</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 100, height: 80 }}>
          <CoinStackIcon ringOpacity={0.5} />
        </Box>
        <Typography variant="caption">Opacity: 0.5</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 100, height: 80 }}>
          <CoinStackIcon ringOpacity={0.25} />
        </Box>
        <Typography variant="caption">Opacity: 0.25</Typography>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// GemIcon Stories
// =============================================================================

export const GemIconDefault: StoryObj = {
  name: "GemIcon - Default",
  render: () => (
    <Box sx={{ width: 80, height: 130 }}>
      <GemIcon variant="default" />
    </Box>
  ),
}

export const GemIconContrastBackground: StoryObj = {
  name: "GemIcon - Contrast Background",
  render: () => (
    <Box
      sx={{
        width: 120,
        height: 180,
        bgcolor: "grey.800",
        borderRadius: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: 70, height: 120 }}>
        <GemIcon variant="contrastBG" />
      </Box>
    </Box>
  ),
}

export const GemIconVariants: StoryObj = {
  name: "GemIcon - All Variants",
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 70, height: 120 }}>
          <GemIcon variant="default" />
        </Box>
        <Typography variant="caption">Default</Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "grey.800",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
        }}
      >
        <Box sx={{ width: 70, height: 120 }}>
          <GemIcon variant="contrastBG" />
        </Box>
        <Typography variant="caption" sx={{ color: "common.white" }}>
          Contrast BG
        </Typography>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// ExperienceIcon Stories
// =============================================================================

export const ExperienceIconDefault: StoryObj = {
  name: "ExperienceIcon - Default",
  render: () => (
    <Box sx={{ width: 24, height: 72 }}>
      <ExperienceIcon variant="default" />
    </Box>
  ),
}

export const ExperienceIconContrast: StoryObj = {
  name: "ExperienceIcon - Contrast Variant",
  render: () => (
    <Box
      sx={{
        bgcolor: "grey.800",
        borderRadius: 2,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: 24, height: 72 }}>
        <ExperienceIcon variant="contrast" />
      </Box>
    </Box>
  ),
}

export const ExperienceIconRingOpacity: StoryObj = {
  name: "ExperienceIcon - Ring Opacity",
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 24, height: 72 }}>
          <ExperienceIcon ringOpacity={1} />
        </Box>
        <Typography variant="caption">Opacity: 1</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 24, height: 72 }}>
          <ExperienceIcon ringOpacity={0.5} />
        </Box>
        <Typography variant="caption">Opacity: 0.5</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 24, height: 72 }}>
          <ExperienceIcon ringOpacity={0} />
        </Box>
        <Typography variant="caption">Opacity: 0</Typography>
      </Box>
    </Stack>
  ),
}

export const ExperienceIconVariants: StoryObj = {
  name: "ExperienceIcon - All Variants",
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ width: 24, height: 72 }}>
          <ExperienceIcon variant="default" />
        </Box>
        <Typography variant="caption">Default</Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "grey.800",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
        }}
      >
        <Box sx={{ width: 24, height: 72 }}>
          <ExperienceIcon variant="contrast" />
        </Box>
        <Typography variant="caption" sx={{ color: "common.white" }}>
          Contrast
        </Typography>
      </Box>
    </Stack>
  ),
}

// =============================================================================
// All Icons Gallery
// =============================================================================

export const AllIcons: StoryObj = {
  name: "All Icons Gallery",
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Currency & Reward Icons
      </Typography>
      <Stack direction="row" spacing={6} alignItems="end" flexWrap="wrap">
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 60, height: 60, mb: 1 }}>
            <CoinIcon color="#FFD700" />
          </Box>
          <Typography variant="caption" display="block">
            CoinIcon
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 90, height: 72, mb: 1 }}>
            <CoinStackIcon />
          </Box>
          <Typography variant="caption" display="block">
            CoinStackIcon
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 50, height: 85, mb: 1 }}>
            <GemIcon variant="default" />
          </Box>
          <Typography variant="caption" display="block">
            GemIcon
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 16, height: 50, mb: 1 }}>
            <ExperienceIcon variant="default" />
          </Box>
          <Typography variant="caption" display="block">
            ExperienceIcon
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}
