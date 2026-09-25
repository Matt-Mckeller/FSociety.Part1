/**
 * LearningChatHeader Stories
 *
 * Header bar with title and controls
 */

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import PsychologyIcon from "@mui/icons-material/Psychology"
import { LearningChatHeader } from "expanse.ui/chat"

const meta: Meta<typeof LearningChatHeader> = {
  title: "LearningChat/LearningChatHeader",
  component: LearningChatHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Header bar with avatar, title, subtitle, and control buttons (close, minimize, expand, clear).",
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ maxWidth: 400 }}>
        <Story />
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LearningChatHeader>

export const Default: Story = {
  args: {
    title: "4eye Assistant",
    subtitle: "AI-powered help",
    avatar: <SmartToyIcon />,
  },
}

export const WithControls: Story = {
  args: {
    title: "Chat Support",
    subtitle: "We're here to help",
    avatar: <SupportAgentIcon />,
    showClose: true,
    showMinimize: true,
    showClear: true,
    onClose: () => console.log("Close clicked"),
    onMinimize: () => console.log("Minimize clicked"),
    onClear: () => console.log("Clear clicked"),
  },
}

export const MinimalHeader: Story = {
  args: {
    title: "Quick Chat",
    showClose: true,
    onClose: () => console.log("Close clicked"),
  },
}

export const FullControls: Story = {
  args: {
    title: "AI Copilot",
    subtitle: "Ask me anything",
    avatar: <PsychologyIcon />,
    showClose: true,
    showMinimize: true,
    showExpand: true,
    showClear: true,
    onClose: () => console.log("Close"),
    onMinimize: () => console.log("Minimize"),
    onExpand: () => console.log("Expand"),
    onClear: () => console.log("Clear"),
  },
}

export const CustomStyling: Story = {
  args: {
    title: "Premium Support",
    subtitle: "24/7 Available",
    avatar: <SupportAgentIcon />,
    showClose: true,
    onClose: () => {},
  },
  decorators: [
    (Story) => (
      <Paper
        sx={{
          maxWidth: 400,
          "& > div": {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            "& .MuiIconButton-root": {
              color: "white",
            },
          },
        }}
      >
        <Story />
      </Paper>
    ),
  ],
}
