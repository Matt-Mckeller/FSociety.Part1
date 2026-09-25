import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import {
  ProfileCompleteness,
  ProfileCompletenessItem,
} from "../../../../../packages/ui/user/components/ProfileCompleteness"

/**
 * ProfileCompleteness component displays a gamified progress indicator
 * showing how complete a user's profile is.
 */
const meta: Meta<typeof ProfileCompleteness> = {
  title: "User/ProfileCompleteness",
  component: ProfileCompleteness,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A gamification component showing profile completion progress with multiple display variants (linear, circular, detailed).",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["linear", "circular", "detailed"],
    },
    showChecklist: { control: "boolean" },
    showAchievement: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 350 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProfileCompleteness>

// =============================================================================
// Mock Data
// =============================================================================

const partialItems: ProfileCompletenessItem[] = [
  { id: "avatar", label: "Add profile photo", completed: true },
  { id: "name", label: "Set display name", completed: true },
  { id: "bio", label: "Write a bio", completed: false },
  { id: "phone", label: "Add phone number", completed: false },
  { id: "preferences", label: "Set preferences", completed: false },
]

const almostCompleteItems: ProfileCompletenessItem[] = [
  { id: "avatar", label: "Add profile photo", completed: true },
  { id: "name", label: "Set display name", completed: true },
  { id: "bio", label: "Write a bio", completed: true },
  { id: "phone", label: "Add phone number", completed: true },
  { id: "preferences", label: "Set preferences", completed: false },
]

const completeItems: ProfileCompletenessItem[] = [
  { id: "avatar", label: "Add profile photo", completed: true },
  { id: "name", label: "Set display name", completed: true },
  { id: "bio", label: "Write a bio", completed: true },
  { id: "phone", label: "Add phone number", completed: true },
  { id: "preferences", label: "Set preferences", completed: true },
]

const emptyItems: ProfileCompletenessItem[] = [
  { id: "avatar", label: "Add profile photo", completed: false },
  { id: "name", label: "Set display name", completed: false },
  { id: "bio", label: "Write a bio", completed: false },
]

// =============================================================================
// Stories
// =============================================================================

/**
 * Linear progress bar variant (default)
 */
export const Linear: Story = {
  args: {
    items: partialItems,
    variant: "linear",
  },
}

/**
 * Circular progress indicator variant
 */
export const Circular: Story = {
  args: {
    items: partialItems,
    variant: "circular",
  },
}

/**
 * Detailed variant with checklist
 */
export const Detailed: Story = {
  args: {
    items: partialItems,
    variant: "detailed",
    showChecklist: true,
  },
}

/**
 * Empty profile - just started
 */
export const Empty: Story = {
  args: {
    items: emptyItems,
    variant: "detailed",
    showChecklist: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A new user who hasn't completed any profile items yet.",
      },
    },
  },
}

/**
 * Almost complete - one item left
 */
export const AlmostComplete: Story = {
  args: {
    items: almostCompleteItems,
    variant: "detailed",
    showChecklist: true,
  },
  parameters: {
    docs: {
      description: {
        story: "User is almost done - just one more item to complete!",
      },
    },
  },
}

/**
 * Fully complete profile with achievement
 */
export const Complete: Story = {
  args: {
    items: completeItems,
    variant: "detailed",
    showChecklist: true,
    showAchievement: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "100% complete profile showing the achievement trophy animation.",
      },
    },
  },
}

/**
 * Without checklist - just progress indicator
 */
export const WithoutChecklist: Story = {
  args: {
    items: partialItems,
    variant: "detailed",
    showChecklist: false,
  },
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Linear
        </Typography>
        <ProfileCompleteness items={partialItems} variant="linear" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Circular
        </Typography>
        <ProfileCompleteness items={partialItems} variant="circular" />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Detailed
        </Typography>
        <ProfileCompleteness
          items={partialItems}
          variant="detailed"
          showChecklist
        />
      </Box>
    </Stack>
  ),
}

/**
 * Progress color states
 */
export const ProgressColors: Story = {
  render: () => {
    const createItems = (completed: number): ProfileCompletenessItem[] => {
      const total = 5
      return Array.from({ length: total }, (_, i) => ({
        id: `item-${i}`,
        label: `Task ${i + 1}`,
        completed: i < completed,
      }))
    }

    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            0% - Red
          </Typography>
          <ProfileCompleteness items={createItems(0)} variant="linear" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            20% - Orange
          </Typography>
          <ProfileCompleteness items={createItems(1)} variant="linear" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            60% - Yellow
          </Typography>
          <ProfileCompleteness items={createItems(3)} variant="linear" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            80% - Light Green
          </Typography>
          <ProfileCompleteness items={createItems(4)} variant="linear" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            100% - Green
          </Typography>
          <ProfileCompleteness items={createItems(5)} variant="linear" />
        </Box>
      </Stack>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Progress bar color changes based on completion percentage for gamification feedback.",
      },
    },
  },
}

/**
 * Interactive checklist items
 */
export const InteractiveChecklist: Story = {
  args: {
    items: partialItems,
    variant: "detailed",
    showChecklist: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Checklist items display completion status.",
      },
    },
  },
}
