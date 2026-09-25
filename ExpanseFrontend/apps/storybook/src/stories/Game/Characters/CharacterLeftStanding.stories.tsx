"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { CharacterLeftStanding } from "expanse.ui/game"

const meta: Meta<typeof CharacterLeftStanding> = {
  title: "Game/Characters/CharacterLeftStanding",
  component: CharacterLeftStanding,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Character facing left in a standing pose.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ height: 200, width: 50 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CharacterLeftStanding>

export const Default: Story = {}
