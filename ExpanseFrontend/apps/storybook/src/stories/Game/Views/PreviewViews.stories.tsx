import type { Meta, StoryObj } from "@storybook/react"
import {
  CharacterPreview,
  ProgressBarPreview,
  ProfileDisplay,
} from "expanse.ui/game"
import { Box, Typography } from "@mui/material"

// ============================================================================
// CharacterPreview Stories
// ============================================================================

const CharacterPreviewMeta: Meta<typeof CharacterPreview> = {
  title: "Game/Views/Previews/CharacterPreview",
  component: CharacterPreview,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A preview component showing the character in various poses and states. Useful for testing character rendering and animations.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, bgcolor: "background.default" }}>
        <Story />
      </Box>
    ),
  ],
}

export default CharacterPreviewMeta

type CharacterPreviewStory = StoryObj<typeof CharacterPreview>

export const Default: CharacterPreviewStory = {
  name: "Character States Preview",
}

// ============================================================================
// ProgressBarPreview Stories
// ============================================================================

export const ProgressBarPreviewStory: StoryObj<typeof ProgressBarPreview> = {
  name: "Progress Bar Preview (Animated)",
  render: () => (
    <Box sx={{ p: 2, bgcolor: "background.default" }}>
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        Progress Bar States & Animation
      </Typography>
      <ProgressBarPreview />
    </Box>
  ),
}

// ============================================================================
// ProfileDisplay Stories
// ============================================================================

export const ProfileDisplayDefault: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - Default",
  render: () => (
    <Box sx={{ p: 2, width: 400, bgcolor: "background.paper", borderRadius: 2 }}>
      <ProfileDisplay />
    </Box>
  ),
}

export const ProfileDisplayWithLabels: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - With Labels",
  render: () => (
    <Box sx={{ p: 2, width: 500, bgcolor: "background.paper", borderRadius: 2 }}>
      <ProfileDisplay enableLabels={true} />
    </Box>
  ),
}

export const ProfileDisplayWithoutLabels: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - Without Labels",
  render: () => (
    <Box sx={{ p: 2, width: 300, bgcolor: "background.paper", borderRadius: 2 }}>
      <ProfileDisplay enableLabels={false} />
    </Box>
  ),
}

export const ProfileDisplayWithIcons: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - With Icons",
  render: () => (
    <Box sx={{ p: 2, width: 500, bgcolor: "background.paper", borderRadius: 2 }}>
      <ProfileDisplay displayIcons={true} />
    </Box>
  ),
}

export const ProfileDisplayCustomRowHeight: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - Custom Bar Height",
  render: () => (
    <Box sx={{ p: 2, width: 400, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", mb: 1 }}>
        Bar Height: 70px
      </Typography>
      <ProfileDisplay barHeight={70} enableLabels={true} />
    </Box>
  ),
}

export const ProfileDisplayCompact: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - Compact",
  render: () => (
    <Box sx={{ p: 2, width: 350, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", mb: 1 }}>
        Bar Height: 35px
      </Typography>
      <ProfileDisplay barHeight={35} enableLabels={false} />
    </Box>
  ),
}

// ============================================================================
// Profile Display with Different Game States
// ============================================================================

export const ProfileDisplayNewPlayer: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - New Player",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 5,
        progressLevel: 1,
      },
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 25, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
        gems: { xgems: 0 },
      },
    },
  },
  render: () => (
    <Box sx={{ p: 2, width: 400, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
        New Player (Level 1)
      </Typography>
      <ProfileDisplay enableLabels={true} />
    </Box>
  ),
}

export const ProfileDisplayVeteranPlayer: StoryObj<typeof ProfileDisplay> = {
  name: "Profile Display - Veteran Player",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 78,
        progressLevel: 45,
      },
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 25000, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
        gems: { xgems: 350 },
      },
    },
  },
  render: () => (
    <Box sx={{ p: 2, width: 400, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
        Veteran Player (Level 45)
      </Typography>
      <ProfileDisplay enableLabels={true} />
    </Box>
  ),
}

// ============================================================================
// Combined Preview
// ============================================================================

export const AllPreviews: StoryObj = {
  name: "All Preview Components",
  render: () => (
    <Box sx={{ p: 3, bgcolor: "background.default" }}>
      <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
        Game Preview Components
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
          Profile Display
        </Typography>
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, maxWidth: 400 }}>
          <ProfileDisplay enableLabels={true} />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
          Progress Bar States
        </Typography>
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
          <ProgressBarPreview />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
          Character States
        </Typography>
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
          <CharacterPreview />
        </Box>
      </Box>
    </Box>
  ),
}
