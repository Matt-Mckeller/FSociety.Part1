"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { CharacterCelebration2 } from "expanse.ui/game"

const meta: Meta<typeof CharacterCelebration2> = {
  title: "Game/Characters/CharacterCelebration2",
  component: CharacterCelebration2,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Character in an alternate celebration pose.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ height: 200, width: 120 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CharacterCelebration2>

export const Default: Story = {}
