/**
 * LearningChatInput Stories
 *
 * Message input with suggested prompts and editing support
 */

import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper, Typography } from "@mui/material"
import { LearningChatInput } from "expanse.ui/chat"

const meta: Meta<typeof LearningChatInput> = {
  title: "LearningChat/LearningChatInput",
  component: LearningChatInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Message input field with optional suggested prompts, loading state, and message editing support.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ maxWidth: 500, p: 0 }}>
        <Story />
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LearningChatInput>

export const Default: Story = {
  args: {
    placeholder: "Type your message...",
    onSend: (msg) => console.log("Sent:", msg),
  },
}

export const WithSuggestedPrompts: Story = {
  args: {
    placeholder: "Ask me anything...",
    suggestedPrompts: [
      "What can you help with?",
      "Tell me about features",
      "How do I get started?",
    ],
    onSend: (msg) => console.log("Sent:", msg),
  },
}

export const Loading: Story = {
  args: {
    placeholder: "Type your message...",
    isLoading: true,
    onSend: (msg) => console.log("Sent:", msg),
    onStop: () => console.log("Stopped"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "When loading, the send button becomes a stop button to cancel generation.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Chat is disabled...",
    disabled: true,
    onSend: (msg) => console.log("Sent:", msg),
  },
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [messages, setMessages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = (msg: string) => {
      setMessages((prev) => [...prev, msg])
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 2000)
    }

    return (
      <Box>
        <Paper sx={{ p: 2, mb: 2, minHeight: 100 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Sent Messages:
          </Typography>
          {messages.length === 0 ? (
            <Typography variant="body2" color="text.disabled">
              No messages yet
            </Typography>
          ) : (
            messages.map((msg, i) => (
              <Typography key={i} variant="body2">
                • {msg}
              </Typography>
            ))
          )}
        </Paper>
        <Paper sx={{ p: 0 }}>
          <LearningChatInput
            placeholder="Try sending a message..."
            suggestedPrompts={["Hello!", "How are you?", "Help me"]}
            isLoading={isLoading}
            onSend={handleSend}
            onStop={() => setIsLoading(false)}
          />
        </Paper>
      </Box>
    )
  },
}

export const EditingMode: Story = {
  args: {
    placeholder: "Edit your message...",
    isEditing: true,
    editingContent: "This is the message being edited",
    onSend: (msg) => console.log("Edited message:", msg),
    onCancelEdit: () => console.log("Edit cancelled"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "When in editing mode, the input shows the message being edited with save and cancel options.",
      },
    },
  },
}
