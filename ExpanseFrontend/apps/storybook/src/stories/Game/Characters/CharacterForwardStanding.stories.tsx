"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { CharacterForwardStanding } from "expanse.ui/game"

const meta: Meta<typeof CharacterForwardStanding> = {
  title: "Game/Characters/CharacterForwardStanding",
  component: CharacterForwardStanding,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Character in a forward-facing standing pose with customizable padding and limb opacity.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    containerPaddingX: {
      control: { type: "number", min: 0, max: 50 },
      description: "Horizontal padding around the character",
    },
    containerPaddingY: {
      control: { type: "number", min: 0, max: 50 },
      description: "Vertical padding around the character",
    },
    limbOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Opacity of the character limbs",
    },
    enableTestingBorders: {
      control: "boolean",
      description: "Show borders for debugging positioning",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 200, width: 100 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CharacterForwardStanding>

export const Default: Story = {
  args: {
    containerPaddingX: 0,
    containerPaddingY: 0,
    limbOpacity: 0.5,
    enableTestingBorders: false,
  },
}

export const WithPadding: Story = {
  args: {
    containerPaddingX: 10,
    containerPaddingY: 10,
    limbOpacity: 0.5,
    enableTestingBorders: false,
  },
}

export const FullOpacity: Story = {
  args: {
    containerPaddingX: 0,
    containerPaddingY: 0,
    limbOpacity: 1,
    enableTestingBorders: false,
  },
}

export const LowOpacity: Story = {
  args: {
    containerPaddingX: 0,
    containerPaddingY: 0,
    limbOpacity: 0.3,
    enableTestingBorders: false,
  },
}
