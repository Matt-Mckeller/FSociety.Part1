import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { CurrencyStatusBar } from "./CurrencyStatusBar.component"
import { CurrencyStatusBarSimple } from "./CurrencyStatusBarSimple.component"
import { ExperienceStatusBar } from "./ExperienceStatusBar.component"
import { ProfileIconStatusBar } from "./ProfileIconStatusBar.component"
import { ProfileIconStatusBarSimple } from "./ProfileIconStatusBarSimple.component"
import { ProgressStatusBar } from "./ProgressStatusBar.component"

/**
 * Status bar components display game stats like currency, experience, and level.
 * These are typically used in game headers or HUD displays.
 *
 * All components use game contexts (Wallet, Experience, Progress) which are
 * provided via MockGameProvider in the Storybook decorator.
 */
const meta: Meta = {
  title: "Game/Components/StatusBars",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// Currency Status Bars
// ============================================================================

export const CurrencyStatusBarStory: StoryObj = {
  name: "CurrencyStatusBar",
  render: () => (
    <Box sx={{ width: 250 }}>
      <CurrencyStatusBar />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Displays coins and gems from the WalletContext.",
      },
    },
  },
}

export const CurrencyStatusBarSimpleStory: StoryObj = {
  name: "CurrencyStatusBarSimple",
  render: () => (
    <Box sx={{ width: 200 }}>
      <CurrencyStatusBarSimple />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simplified version showing only coins.",
      },
    },
  },
}

// ============================================================================
// Experience & Progress Status Bars
// ============================================================================

export const ExperienceStatusBarStory: StoryObj = {
  name: "ExperienceStatusBar",
  render: () => (
    <Box sx={{ width: 300 }}>
      <ExperienceStatusBar />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows current experience / experience needed for next level.",
      },
    },
  },
}

export const ProgressStatusBarStory: StoryObj = {
  name: "ProgressStatusBar",
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProgressStatusBar />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows percentage progress toward next reward.",
      },
    },
  },
}

// ============================================================================
// Profile Icon Status Bars
// ============================================================================

export const ProfileIconStatusBarStory: StoryObj = {
  name: "ProfileIconStatusBar",
  render: () => (
    <Box sx={{ width: 120 }}>
      <ProfileIconStatusBar />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Displays current level with profile icon from ExperienceContext.",
      },
    },
  },
}

export const ProfileIconStatusBarSimpleStory: StoryObj = {
  name: "ProfileIconStatusBarSimple",
  render: () => (
    <Box sx={{ width: 120 }}>
      <ProfileIconStatusBarSimple />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Displays progress level from ProgressContext.",
      },
    },
  },
}

// ============================================================================
// Gallery - All Status Bars
// ============================================================================

export const AllStatusBars: StoryObj = {
  name: "Gallery - All Status Bars",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}>
      <Typography variant="h5">Status Bar Components</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        These components display game statistics and use game contexts for data.
      </Typography>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3 }}
      >
        <Box>
          <Typography variant="subtitle2" mb={1}>
            CurrencyStatusBar
          </Typography>
          <Box sx={{ width: 250 }}>
            <CurrencyStatusBar />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>
            CurrencyStatusBarSimple
          </Typography>
          <Box sx={{ width: 200 }}>
            <CurrencyStatusBarSimple />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>
            ExperienceStatusBar
          </Typography>
          <Box sx={{ width: 300 }}>
            <ExperienceStatusBar />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>
            ProgressStatusBar
          </Typography>
          <Box sx={{ width: 300 }}>
            <ProgressStatusBar />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>
            ProfileIconStatusBar
          </Typography>
          <Box sx={{ width: 120 }}>
            <ProfileIconStatusBar />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>
            ProfileIconStatusBarSimple
          </Typography>
          <Box sx={{ width: 120 }}>
            <ProfileIconStatusBarSimple />
          </Box>
        </Box>
      </Box>
    </Box>
  ),
}
