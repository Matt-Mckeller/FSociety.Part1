"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { CharacterRightStanding } from "expanse.ui/game"

const meta: Meta<typeof CharacterRightStanding> = {
  title: "Game/Characters/CharacterRightStanding",
  component: CharacterRightStanding,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Character facing right in a standing pose.",
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
type Story = StoryObj<typeof CharacterRightStanding>

export const Default: Story = {}
