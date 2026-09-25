/**
 * LearningChatMessageBubble Stories
 *
 * Individual message display with actions and editing support
 */

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PersonIcon from "@mui/icons-material/Person"
import { LearningChatMessageBubble, LearningChatMessage } from "expanse.ui/chat"

const meta: Meta<typeof LearningChatMessageBubble> = {
  title: "LearningChat/LearningChatMessageBubble",
  component: LearningChatMessageBubble,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Individual message bubble with support for markdown, streaming cursor, action buttons, and message editing.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LearningChatMessageBubble>

export const UserMessage: Story = {
  args: {
    message: {
      id: "1",
      role: "user",
      content: "Hello! How can you help me today?",
      timestamp: new Date(),
      status: "complete",
    },
    userAvatar: <PersonIcon />,
  },
}

export const AssistantMessage: Story = {
  args: {
    message: {
      id: "2",
      role: "assistant",
      content:
        "Hello! I'm here to assist you with any questions you might have. Feel free to ask me anything!",
      timestamp: new Date(),
      status: "complete",
    },
    assistantAvatar: <SmartToyIcon />,
  },
}

export const WithMarkdown: Story = {
  args: {
    message: {
      id: "3",
      role: "assistant",
      content: `Here's what I can help with:

## Features
- **Bold text** and *italic text*
- \`inline code\` for technical terms
- [Links](https://example.com) to resources

## Code Example
\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

Let me know what you'd like to explore!`,
      timestamp: new Date(),
      status: "complete",
    },
    assistantAvatar: <SmartToyIcon />,
  },
}

export const Streaming: Story = {
  args: {
    message: {
      id: "4",
      role: "assistant",
      content: "I'm currently generating this response token by token",
      timestamp: new Date(),
      status: "streaming",
    },
    assistantAvatar: <SmartToyIcon />,
  },
}

export const Error: Story = {
  args: {
    message: {
      id: "5",
      role: "assistant",
      content: "Sorry, an error occurred while processing your request.",
      timestamp: new Date(),
      status: "error",
    },
    assistantAvatar: <SmartToyIcon />,
  },
}

export const WithActions: Story = {
  args: {
    message: {
      id: "6",
      role: "assistant",
      content:
        "Hover over this message to see the action buttons: copy, thumbs up, thumbs down, and regenerate.",
      timestamp: new Date(),
      status: "complete",
    },
    assistantAvatar: <SmartToyIcon />,
    showActions: true,
    onCopy: (id) => console.log("Copy clicked:", id),
    onFeedback: (id, type) => console.log("Feedback:", id, type),
    onRegenerate: (id) => console.log("Regenerate:", id),
  },
  parameters: {
    docs: {
      description: {
        story: "Hover over the message to reveal action buttons.",
      },
    },
  },
}

export const UserMessageWithEdit: Story = {
  args: {
    message: {
      id: "7",
      role: "user",
      content: "This is a user message that can be edited and resent.",
      timestamp: new Date(),
      status: "complete",
    },
    userAvatar: <PersonIcon />,
    showActions: true,
    enableResend: true,
    onEdit: (id) => console.log("Edit clicked:", id),
  },
  parameters: {
    docs: {
      description: {
        story:
          "User messages can have an edit button when enableResend is true, allowing users to modify and resend their messages.",
      },
    },
  },
}
