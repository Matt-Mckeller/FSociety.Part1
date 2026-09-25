import type { Meta, StoryObj } from "@storybook/react"
import { TeacherRewardForm, WalletBanner } from "expanse.ui/game"
import { Box, Typography } from "@mui/material"

// ============================================================================
// TeacherRewardForm Stories
// ============================================================================

const TeacherRewardFormMeta: Meta<typeof TeacherRewardForm> = {
  title: "Game/Components/Forms/TeacherRewardForm",
  component: TeacherRewardForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form for teachers to create rewards that students can earn. Includes name, description, cost, class selection, and purchase limits.",
      },
    },
  },
  argTypes: {
    taughtClasses: {
      description: "List of classes the teacher is teaching",
    },
    loadingTaughtClasses: {
      control: "boolean",
      description: "Whether the classes are still loading",
    },
    reward: {
      description: "Existing reward to edit (optional)",
    },
    onSuccess: {
      action: "success",
      description: "Callback when the form is submitted successfully",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

export default TeacherRewardFormMeta

type TeacherRewardFormStory = StoryObj<typeof TeacherRewardForm>

// Mock class data
const mockClasses = [
  { elId: "class-1", name: "Math 101 - Period 1" },
  { elId: "class-2", name: "Math 101 - Period 2" },
  { elId: "class-3", name: "Algebra - Period 3" },
  { elId: "class-4", name: "Geometry - Period 4" },
  { elId: "class-5", name: "Calculus - Period 5" },
]

export const Default: TeacherRewardFormStory = {
  name: "Default (Empty)",
  args: {
    taughtClasses: mockClasses,
    loadingTaughtClasses: false,
  },
}

export const Loading: TeacherRewardFormStory = {
  name: "Loading Classes",
  args: {
    taughtClasses: [],
    loadingTaughtClasses: true,
  },
}

export const NoClasses: TeacherRewardFormStory = {
  name: "No Classes Available",
  args: {
    taughtClasses: [],
    loadingTaughtClasses: false,
  },
}

export const SingleClass: TeacherRewardFormStory = {
  name: "Single Class",
  args: {
    taughtClasses: [{ elId: "class-1", name: "Math 101" }],
    loadingTaughtClasses: false,
  },
}

export const EditExistingReward: TeacherRewardFormStory = {
  name: "Edit Existing Reward",
  args: {
    taughtClasses: mockClasses,
    loadingTaughtClasses: false,
    reward: {
      id: "reward-1",
      name: "Homework Pass",
      description: "Skip one homework assignment",
      cost: 3,
      classification: {
        category: "teacher",
        variant: "default",
      },
      uniqueRewardId: "unique-1",
      isTradeable: false,
      dictionaryIndex: "teacher-reward-1",
      rewardConfiguration: {
        maxPurchaseQuantity: 5,
      },
    } as any,
  },
}

// ============================================================================
// WalletBanner Stories
// ============================================================================

export const WalletBannerDefault: StoryObj<typeof WalletBanner> = {
  name: "Wallet Banner - Default",
  render: () => (
    <Box sx={{ width: 400, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <WalletBanner />
    </Box>
  ),
}

export const WalletBannerWithXCoins: StoryObj<typeof WalletBanner> = {
  name: "Wallet Banner - With XCoins Only",
  parameters: {
    game: {
      mockWallet: {
        coins: {
          xcoins: { coinId: "xcoins", quantity: 1500, name: "XCoins", coinIconText: "X" },
        },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 400, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <WalletBanner />
    </Box>
  ),
}

export const WalletBannerMultipleCoins: StoryObj<typeof WalletBanner> = {
  name: "Wallet Banner - Multiple Coin Types",
  parameters: {
    game: {
      mockWallet: {
        coins: {
          xcoins: { coinId: "xcoins", quantity: 2500, name: "XCoins", coinIconText: "X" },
          familycoins: { coinId: "familycoins", quantity: 150, name: "Family Coins", coinIconText: "FM" },
          class1: { coinId: "class1", quantity: 75, name: "Math 101 Points", coinIconText: "M1" },
          class2: { coinId: "class2", quantity: 50, name: "Science Lab Stars", coinIconText: "SL" },
        },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 600, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <WalletBanner />
    </Box>
  ),
}

export const WalletBannerClassroomCoins: StoryObj<typeof WalletBanner> = {
  name: "Wallet Banner - Classroom Coins",
  parameters: {
    game: {
      mockWallet: {
        coins: {
          xcoins: { coinId: "xcoins", quantity: 1000, name: "XCoins", coinIconText: "X" },
          mathClass: { coinId: "math-class", quantity: 45, name: "Mrs. Johnson's Math Stars", coinIconText: "MJ" },
          scienceClass: { coinId: "science-class", quantity: 30, name: "Mr. Smith's Science Points", coinIconText: "SS" },
        },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 500, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <WalletBanner />
    </Box>
  ),
}

export const WalletBannerEmpty: StoryObj<typeof WalletBanner> = {
  name: "Wallet Banner - Empty (No Coins)",
  parameters: {
    game: {
      mockWallet: {
        coins: {},
      },
    },
  },
  render: () => (
    <Box sx={{ width: 400, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
      <WalletBanner />
    </Box>
  ),
}

// ============================================================================
// Combined Display
// ============================================================================

export const TeacherDashboard: StoryObj = {
  name: "Teacher Dashboard",
  parameters: {
    game: {
      mockWallet: {
        coins: {
          xcoins: { coinId: "xcoins", quantity: 500, name: "XCoins", coinIconText: "X" },
        },
      },
    },
  },
  render: () => (
    <Box sx={{ width: 600, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
        Teacher Dashboard
      </Typography>

      <Box sx={{ mb: 4, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Wallet
        </Typography>
        <WalletBanner />
      </Box>

      <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create New Reward
        </Typography>
        <TeacherRewardForm
          taughtClasses={mockClasses}
          loadingTaughtClasses={false}
        />
      </Box>
    </Box>
  ),
}
