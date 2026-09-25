/**
 * LearningChatTypingIndicator Stories
 *
 * Animated typing/thinking indicator
 */

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper } from "@mui/material"
import { LearningChatTypingIndicator } from "expanse.ui/chat"

const meta: Meta<typeof LearningChatTypingIndicator> = {
  title: "LearningChat/LearningChatTypingIndicator",
  component: LearningChatTypingIndicator,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Animated indicator showing that the AI is thinking/generating a response.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 3, bgcolor: "grey.50" }}>
        <Story />
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LearningChatTypingIndicator>

export const Default: Story = {
  args: {},
}

export const CustomSize: Story = {
  args: {
    size: 12,
  },
}

export const CustomColor: Story = {
  args: {
    color: "primary.main",
  },
}

export const InContext: Story = {
  render: () => (
    <Box>
      <Box
        sx={{
          mb: 2,
          p: 2,
          bgcolor: "primary.light",
          borderRadius: 2,
          color: "primary.contrastText",
          maxWidth: 300,
        }}
      >
        What's the weather like today?
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "grey.300",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🤖
        </Box>
        <LearningChatTypingIndicator />
      </Box>
    </Box>
  ),
}
