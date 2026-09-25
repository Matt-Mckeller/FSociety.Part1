import type { Meta, StoryObj } from "@storybook/react"
import {
  CurrencyStatusBar,
  CurrencyStatusBarSimple,
  ExperienceStatusBar,
  ProfileIconStatusBar,
  ProfileIconStatusBarSimple,
  ProgressStatusBar,
} from "expanse.ui/game"
import { Box } from "@mui/material"

// ============================================================================
// CurrencyStatusBar Stories
// ============================================================================

const CurrencyStatusBarMeta: Meta<typeof CurrencyStatusBar> = {
  title: "Game/Components/Status Bars/CurrencyStatusBar",
  component: CurrencyStatusBar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays the user's currency (coins and gems) in an expanding bar format.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300 }}>
        <Story />
      </Box>
    ),
  ],
}

export default CurrencyStatusBarMeta

type CurrencyStatusBarStory = StoryObj<typeof CurrencyStatusBar>

export const Default: CurrencyStatusBarStory = {
  name: "Default",
}

export const HighValues: CurrencyStatusBarStory = {
  name: "High Values",
  parameters: {
    game: {
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 999999, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
        gems: { xgems: 5000 },
      },
    },
  },
}

export const ZeroValues: CurrencyStatusBarStory = {
  name: "Zero Values",
  parameters: {
    game: {
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 0, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
        gems: { xgems: 0 },
      },
    },
  },
}

// ============================================================================
// CurrencyStatusBarSimple Stories
// ============================================================================

export const SimpleDefault: StoryObj<typeof CurrencyStatusBarSimple> = {
  name: "Simple - Default",
  render: () => (
    <Box sx={{ width: 200 }}>
      <CurrencyStatusBarSimple />
    </Box>
  ),
}

export const SimpleHighValue: StoryObj<typeof CurrencyStatusBarSimple> = {
  name: "Simple - High Value",
  parameters: {
    game: {
      mockWallet: {
        coins: { xcoins: { coinId: "xcoins", quantity: 50000, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" } },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 200 }}>
      <CurrencyStatusBarSimple />
    </Box>
  ),
}

// ============================================================================
// ExperienceStatusBar Stories
// ============================================================================

export const ExperienceDefault: StoryObj<typeof ExperienceStatusBar> = {
  name: "Experience - Default",
  render: () => (
    <Box sx={{ width: 300 }}>
      <ExperienceStatusBar />
    </Box>
  ),
}

export const ExperienceNearLevelUp: StoryObj<typeof ExperienceStatusBar> = {
  name: "Experience - Near Level Up",
  parameters: {
    game: {
      mockExperience: {
        currentLevelExperience: 950,
        totalExperienceForCurrentLevel: 1000,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ExperienceStatusBar />
    </Box>
  ),
}

export const ExperienceNewLevel: StoryObj<typeof ExperienceStatusBar> = {
  name: "Experience - New Level",
  parameters: {
    game: {
      mockExperience: {
        currentLevelExperience: 50,
        totalExperienceForCurrentLevel: 1500,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ExperienceStatusBar />
    </Box>
  ),
}

// ============================================================================
// ProfileIconStatusBar Stories
// ============================================================================

export const ProfileDefault: StoryObj<typeof ProfileIconStatusBar> = {
  name: "Profile - Default",
  render: () => (
    <Box sx={{ width: 120 }}>
      <ProfileIconStatusBar />
    </Box>
  ),
}

export const ProfileHighLevel: StoryObj<typeof ProfileIconStatusBar> = {
  name: "Profile - High Level",
  parameters: {
    game: {
      mockExperience: {
        currentLevel: 99,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 120 }}>
      <ProfileIconStatusBar />
    </Box>
  ),
}

export const ProfileLowLevel: StoryObj<typeof ProfileIconStatusBar> = {
  name: "Profile - Low Level",
  parameters: {
    game: {
      mockExperience: {
        currentLevel: 1,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 120 }}>
      <ProfileIconStatusBar />
    </Box>
  ),
}

// ============================================================================
// ProfileIconStatusBarSimple Stories
// ============================================================================

export const ProfileSimpleDefault: StoryObj<typeof ProfileIconStatusBarSimple> =
  {
    name: "Profile Simple - Default",
    render: () => (
      <Box sx={{ width: 120 }}>
        <ProfileIconStatusBarSimple />
      </Box>
    ),
  }

export const ProfileSimpleHighLevel: StoryObj<
  typeof ProfileIconStatusBarSimple
> = {
  name: "Profile Simple - High Level",
  parameters: {
    game: {
      mockProgress: {
        progressLevel: 50,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 120 }}>
      <ProfileIconStatusBarSimple />
    </Box>
  ),
}

// ============================================================================
// ProgressStatusBar Stories
// ============================================================================

export const ProgressDefault: StoryObj<typeof ProgressStatusBar> = {
  name: "Progress - Default",
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProgressStatusBar />
    </Box>
  ),
}

export const ProgressAlmostComplete: StoryObj<typeof ProgressStatusBar> = {
  name: "Progress - Almost Complete",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 95,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProgressStatusBar />
    </Box>
  ),
}

export const ProgressJustStarted: StoryObj<typeof ProgressStatusBar> = {
  name: "Progress - Just Started",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 5,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProgressStatusBar />
    </Box>
  ),
}

export const ProgressComplete: StoryObj<typeof ProgressStatusBar> = {
  name: "Progress - Complete",
  parameters: {
    game: {
      mockProgress: {
        progressPercentage: 100,
      },
    },
  },
  render: () => (
    <Box sx={{ width: 300 }}>
      <ProgressStatusBar />
    </Box>
  ),
}

// ============================================================================
// All Status Bars Combined
// ============================================================================

export const AllStatusBars: StoryObj = {
  name: "All Status Bars",
  render: () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
      }}
    >
      <Box>
        <Box sx={{ mb: 0.5, color: "text.secondary", fontSize: 12 }}>
          Currency Status Bar
        </Box>
        <CurrencyStatusBar />
      </Box>
      <Box>
        <Box sx={{ mb: 0.5, color: "text.secondary", fontSize: 12 }}>
          Currency Status Bar Simple
        </Box>
        <CurrencyStatusBarSimple />
      </Box>
      <Box>
        <Box sx={{ mb: 0.5, color: "text.secondary", fontSize: 12 }}>
          Experience Status Bar
        </Box>
        <ExperienceStatusBar />
      </Box>
      <Box>
        <Box sx={{ mb: 0.5, color: "text.secondary", fontSize: 12 }}>
          Profile Icon Status Bar
        </Box>
        <Box sx={{ width: 150 }}>
          <ProfileIconStatusBar />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 0.5, color: "text.secondary", fontSize: 12 }}>
          Profile Icon Status Bar Simple
        </Box>
        <Box sx={{ width: 150 }}>
          <ProfileIconStatusBarSimple />
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 0.5, color: "text.secondary", fontSize: 12 }}>
          Progress Status Bar
        </Box>
        <ProgressStatusBar />
      </Box>
    </Box>
  ),
}
