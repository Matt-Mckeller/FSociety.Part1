"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { CharacterCelebration1 } from "expanse.ui/game"

const meta: Meta<typeof CharacterCelebration1> = {
  title: "Game/Characters/CharacterCelebration1",
  component: CharacterCelebration1,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Character in a celebration pose with arms raised.",
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
type Story = StoryObj<typeof CharacterCelebration1>

export const Default: Story = {}
