import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper } from "@mui/material"
import {
  LearningChatReactions,
  MessageReaction,
  DEFAULT_REACTION_EMOJIS,
} from "../../../../../packages/ui/chat"

const meta: Meta<typeof LearningChatReactions> = {
  title: "LearningChat/LearningChatReactions",
  component: LearningChatReactions,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Emoji reaction component for chat messages. Displays existing reactions and provides a picker for adding new ones.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    reactions: {
      description: "Current reactions on the message",
      control: "object",
    },
    reactionEmojis: {
      description: "Available emojis in the picker",
      control: "object",
    },
    showPicker: {
      description: "Whether to show the add reaction button",
      control: "boolean",
    },
    size: {
      description: "Size variant for the reaction chips",
      control: { type: "select", options: ["small", "medium"] },
    },
    onReactionToggle: {
      description: "Handler when a reaction is toggled",
      action: "onReactionToggle",
    },
  },
}

export default meta
type Story = StoryObj<typeof LearningChatReactions>

const sampleReactions: MessageReaction[] = [
  { emoji: "👍", count: 3, userReacted: true },
  { emoji: "❤️", count: 2, userReacted: false },
  { emoji: "😂", count: 1, userReacted: false },
]

export const Default: Story = {
  args: {
    reactions: sampleReactions,
    reactionEmojis: DEFAULT_REACTION_EMOJIS,
    showPicker: true,
    size: "small",
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, minWidth: 300 }}>
        <Story />
      </Paper>
    ),
  ],
}

export const NoReactions: Story = {
  args: {
    reactions: [],
    reactionEmojis: DEFAULT_REACTION_EMOJIS,
    showPicker: true,
    size: "small",
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, minWidth: 300 }}>
        <Box sx={{ mb: 1, color: "text.secondary", fontSize: 14 }}>
          Hover to see the add reaction button
        </Box>
        <Story />
      </Paper>
    ),
  ],
}

export const ManyReactions: Story = {
  args: {
    reactions: [
      { emoji: "👍", count: 12, userReacted: true },
      { emoji: "❤️", count: 8, userReacted: true },
      { emoji: "😂", count: 5, userReacted: false },
      { emoji: "🤔", count: 3, userReacted: false },
      { emoji: "👏", count: 2, userReacted: false },
      { emoji: "🎉", count: 1, userReacted: true },
    ],
    reactionEmojis: DEFAULT_REACTION_EMOJIS,
    showPicker: true,
    size: "small",
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, minWidth: 400 }}>
        <Story />
      </Paper>
    ),
  ],
}

export const MediumSize: Story = {
  args: {
    reactions: sampleReactions,
    reactionEmojis: DEFAULT_REACTION_EMOJIS,
    showPicker: true,
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, minWidth: 300 }}>
        <Story />
      </Paper>
    ),
  ],
}

export const CustomEmojis: Story = {
  args: {
    reactions: [
      { emoji: "🚀", count: 2, userReacted: true },
      { emoji: "💡", count: 1, userReacted: false },
    ],
    reactionEmojis: ["🚀", "💡", "🔥", "⭐", "💪", "🙌", "✨", "🎯"],
    showPicker: true,
    size: "small",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom set of emojis can be provided for domain-specific reactions.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, minWidth: 300 }}>
        <Story />
      </Paper>
    ),
  ],
}

export const NoPicker: Story = {
  args: {
    reactions: sampleReactions,
    showPicker: false,
    size: "small",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Reactions can be displayed without the ability to add new ones.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 2, minWidth: 300 }}>
        <Story />
      </Paper>
    ),
  ],
}
