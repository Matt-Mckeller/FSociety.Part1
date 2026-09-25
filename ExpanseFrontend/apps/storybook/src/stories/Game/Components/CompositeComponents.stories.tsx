import type { Meta, StoryObj } from "@storybook/react"
import { ProfileStatusDisplay } from "expanse.ui/game"
import ExperienceProgressBarSimple from "../../../../../../packages/ui/game/components/ExperienceProgressBarSimple"
import { Box, Typography } from "@mui/material"

// ============================================================================
// ExperienceProgressBarSimple Stories
// ============================================================================

const ExperienceProgressBarMeta: Meta<typeof ExperienceProgressBarSimple> = {
  title: "Game/Components/Composite/ExperienceProgressBarSimple",
  component: ExperienceProgressBarSimple,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated progress bar that displays experience progress with level-up animations. Shows percentage progress towards the next level.",
      },
    },
  },
  argTypes: {
    aspectRatio: {
      control: { type: "range", min: 2, max: 12, step: 1 },
      description: "Aspect ratio of the progress bar",
    },
    displayLevelText: {
      control: "boolean",
      description: "Whether to display the level text",
    },
    levelUpPauseDuration: {
      control: { type: "range", min: 0, max: 3000, step: 100 },
      description: "Pause duration at 100% when leveling up (ms)",
    },
    animationDuration: {
      control: { type: "range", min: 100, max: 3000, step: 100 },
      description: "Duration of the progress animation (ms)",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export default ExperienceProgressBarMeta

type ExperienceStory = StoryObj<typeof ExperienceProgressBarSimple>

export const Default: ExperienceStory = {
  name: "Default",
  args: {
    aspectRatio: 6,
    displayLevelText: false,
  },
}

export const WithLevelText: ExperienceStory = {
  name: "With Level Text",
  args: {
    aspectRatio: 6,
    displayLevelText: true,
  },
}

export const NarrowAspectRatio: ExperienceStory = {
  name: "Narrow Aspect Ratio",
  args: {
    aspectRatio: 3,
    displayLevelText: true,
  },
}

export const WideAspectRatio: ExperienceStory = {
  name: "Wide Aspect Ratio",
  args: {
    aspectRatio: 10,
    displayLevelText: true,
  },
}

export const LowProgress: ExperienceStory = {
  name: "Low Progress (10%)",
  args: {
    aspectRatio: 6,
    displayLevelText: true,
  },
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 10,
        progressLevel: 5,
      },
    },
  },
}

export const MidProgress: ExperienceStory = {
  name: "Mid Progress (50%)",
  args: {
    aspectRatio: 6,
    displayLevelText: true,
  },
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 50,
        progressLevel: 8,
      },
    },
  },
}

export const HighProgress: ExperienceStory = {
  name: "High Progress (90%)",
  args: {
    aspectRatio: 6,
    displayLevelText: true,
  },
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 90,
        progressLevel: 15,
      },
    },
  },
}

export const NearLevelUp: ExperienceStory = {
  name: "Near Level Up (99%)",
  args: {
    aspectRatio: 6,
    displayLevelText: true,
  },
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 99,
        progressLevel: 20,
      },
    },
  },
}

export const HighLevel: ExperienceStory = {
  name: "High Level Player",
  args: {
    aspectRatio: 6,
    displayLevelText: true,
  },
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 45,
        progressLevel: 99,
      },
    },
  },
}

// ============================================================================
// ProfileStatusDisplay Stories
// ============================================================================

export const ProfileDisplayDefault: StoryObj<typeof ProfileStatusDisplay> = {
  name: "Profile Display - Default (Staircase)",
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProfileStatusDisplay layout="staircase" />
    </Box>
  ),
}

export const ProfileDisplayHorizontal: StoryObj<typeof ProfileStatusDisplay> = {
  name: "Profile Display - Horizontal",
  render: () => (
    <Box sx={{ width: 400 }}>
      <ProfileStatusDisplay layout="horizontal" />
    </Box>
  ),
}

export const ProfileDisplayWithHighValues: StoryObj<
  typeof ProfileStatusDisplay
> = {
  name: "Profile Display - High Values",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 85,
        progressLevel: 50,
      },
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 99999, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
        gems: { xgems: 500 },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProfileStatusDisplay layout="staircase" />
    </Box>
  ),
}

export const ProfileDisplayNewPlayer: StoryObj<typeof ProfileStatusDisplay> = {
  name: "Profile Display - New Player",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 5,
        progressLevel: 1,
      },
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 50, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
        gems: { xgems: 0 },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProfileStatusDisplay layout="staircase" />
    </Box>
  ),
}

export const ProfileDisplayCustomBarHeight: StoryObj<typeof ProfileStatusDisplay> = {
  name: "Profile Display - Custom Bar Height",
  render: () => (
    <Box sx={{ width: 400 }}>
      <ProfileStatusDisplay layout="staircase" barHeight={36} />
    </Box>
  ),
}

// ============================================================================
// Combined Display
// ============================================================================

export const CompositeDashboard: StoryObj = {
  name: "Composite Dashboard",
  render: () => (
    <Box sx={{ width: 400 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        Player Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Experience Progress
        </Typography>
        <ExperienceProgressBarSimple aspectRatio={6} displayLevelText={true} />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Status Overview
        </Typography>
        <ProfileStatusDisplay gridContainerProps={{ spacing: 1 }} />
      </Box>
    </Box>
  ),
}
