import type { Meta, StoryObj } from "@storybook/react"
import { RewardCard, REWARD_POINT_OPTIONS } from "expanse.ui/game"
import { Box, Typography } from "@mui/material"

// ============================================================================
// Mock Reward Data
// ============================================================================

const createMockReward = (overrides: any = {}) => ({
  id: "reward-1",
  value: 100,
  classification: {
    category: "teacher",
    variant: "default",
    productAttributes: [],
  },
  uniqueRewardId: "unique-reward-1",
  dictionaryIndex: "teacherReward1",
  isTradeable: false,
  name: "Homework Pass",
  description: "Skip one homework assignment of your choice!",
  cost: REWARD_POINT_OPTIONS.THREE_POINTS,
  ...overrides,
})

const teacherReward = createMockReward({
  name: "Homework Pass",
  description: "Skip one homework assignment of your choice!",
  classification: { category: "teacher", variant: "default" },
  cost: REWARD_POINT_OPTIONS.THREE_POINTS,
})

const familyReward = createMockReward({
  id: "reward-2",
  name: "Extra Screen Time",
  description: "Earn 30 minutes of extra screen time this weekend!",
  classification: { category: "family", variant: "default" },
  cost: REWARD_POINT_OPTIONS.FIVE_POINTS,
})

const schoolReward = createMockReward({
  id: "reward-3",
  name: "Pizza Party Entry",
  description: "Entry into the monthly pizza party raffle for top performers.",
  classification: { category: "school", variant: "default" },
  cost: REWARD_POINT_OPTIONS.NINE_POINTS,
})

const noDescriptionReward = createMockReward({
  id: "reward-4",
  name: "Mystery Reward",
  description: null,
  cost: REWARD_POINT_OPTIONS.TWO_POINTS,
})

const longNameReward = createMockReward({
  id: "reward-5",
  name: "Super Amazing Incredibly Long Reward Name That Overflows",
  description: "A reward with a very long name to test text overflow handling.",
  cost: REWARD_POINT_OPTIONS.FIVE_POINTS,
})

const longDescriptionReward = createMockReward({
  id: "reward-6",
  name: "Detailed Reward",
  description:
    "This is a very detailed description that explains exactly what this reward entails. It includes multiple sentences to test how the card handles longer text content and whether it properly truncates or wraps the text as expected.",
  cost: REWARD_POINT_OPTIONS.NINE_POINTS,
})

const classroomReward = createMockReward({
  id: "reward-7",
  name: "Class Helper",
  description: "Be the class helper for a day!",
  classification: { category: "teacher", variant: "default" },
  cost: REWARD_POINT_OPTIONS.FIVE_POINTS,
  classStore: {
    id: "class-1",
    name: "Math 101",
  },
})

// ============================================================================
// RewardCard Stories
// ============================================================================

const meta: Meta<typeof RewardCard> = {
  title: "Game/Components/Rewards/RewardCard",
  component: RewardCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A card component that displays reward information including name, description, cost, and category icon.",
      },
    },
  },
  argTypes: {
    reward: {
      description: "The reward data to display",
    },
    state: {
      control: "select",
      options: ["default", "selected"],
      description: "Visual state of the card",
    },
    onClick: {
      action: "clicked",
      description: "Callback when the card is clicked",
    },
  },
}

export default meta

type Story = StoryObj<typeof RewardCard>

export const Default: Story = {
  name: "Default",
  args: {
    reward: teacherReward,
  },
}

export const Selected: Story = {
  name: "Selected State",
  args: {
    reward: teacherReward,
    state: "selected",
  },
}

export const TeacherCategory: Story = {
  name: "Teacher Category",
  args: {
    reward: teacherReward,
  },
}

export const FamilyCategory: Story = {
  name: "Family Category",
  args: {
    reward: familyReward,
  },
}

export const SchoolCategory: Story = {
  name: "School Category",
  args: {
    reward: schoolReward,
  },
}

export const NoDescription: Story = {
  name: "No Description",
  args: {
    reward: noDescriptionReward,
  },
}

export const LongName: Story = {
  name: "Long Name (Overflow)",
  args: {
    reward: longNameReward,
  },
}

export const LongDescription: Story = {
  name: "Long Description (Truncated)",
  args: {
    reward: longDescriptionReward,
  },
}

export const WithClassroom: Story = {
  name: "With Classroom Association",
  args: {
    reward: classroomReward,
  },
}

export const Clickable: Story = {
  name: "Clickable",
  args: {
    reward: teacherReward,
    onClick: (reward) => console.log("Reward clicked:", reward),
  },
}

// ============================================================================
// Multiple Cards Display
// ============================================================================

export const AllCategories: Story = {
  name: "All Categories",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Teacher Reward
        </Typography>
        <RewardCard reward={teacherReward} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Family Reward
        </Typography>
        <RewardCard reward={familyReward} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          School Reward
        </Typography>
        <RewardCard reward={schoolReward} />
      </Box>
    </Box>
  ),
}

export const SelectionComparison: Story = {
  name: "Selection Comparison",
  render: () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          Default State
        </Typography>
        <RewardCard reward={teacherReward} state="default" />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          Selected State
        </Typography>
        <RewardCard reward={teacherReward} state="selected" />
      </Box>
    </Box>
  ),
}

export const RewardGrid: Story = {
  name: "Reward Grid",
  render: () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        maxWidth: 650,
      }}
    >
      <RewardCard reward={teacherReward} />
      <RewardCard reward={familyReward} />
      <RewardCard reward={schoolReward} />
      <RewardCard reward={noDescriptionReward} />
    </Box>
  ),
}
