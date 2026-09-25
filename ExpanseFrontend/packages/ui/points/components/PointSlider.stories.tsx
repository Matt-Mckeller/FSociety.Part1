import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { PointSlider } from "./PointSlider.component"
import { TICKET_POINT_OPTIONS } from "../types/Points.types"
import { Box, Typography } from "@mui/material"

/**
 * PointSlider is a custom MUI Slider for selecting task complexity points.
 * Uses Fibonacci-like point values (1, 2, 3, 5, 9, 18, 81) common in agile estimation.
 */
const meta: Meta<typeof PointSlider> = {
  title: "Points/PointSlider",
  component: PointSlider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultPoints: {
      control: "select",
      options: Object.values(TICKET_POINT_OPTIONS).filter(
        (v) => typeof v === "number",
      ),
      description: "Initial point value for the slider",
    },
    onChange: {
      action: "changed",
      description: "Callback when slider value changes",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PointSlider>

/**
 * Default slider starting at 3 points
 */
export const Default: Story = {
  args: {
    defaultPoints: TICKET_POINT_OPTIONS.THREE_POINTS,
  },
}

/**
 * Slider starting at 1 point (simplest task)
 */
export const StartAtOne: Story = {
  args: {
    defaultPoints: TICKET_POINT_OPTIONS.ONE_POINT,
  },
}

/**
 * Slider starting at 9 points (complex task)
 */
export const StartAtNine: Story = {
  args: {
    defaultPoints: TICKET_POINT_OPTIONS.NINE_POINTS,
  },
}

/**
 * Interactive demo showing the selected value
 */
export const Interactive: Story = {
  render: () => {
    const [points, setPoints] = useState<TICKET_POINT_OPTIONS>(
      TICKET_POINT_OPTIONS.THREE_POINTS,
    )
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Selected Points: {points}
        </Typography>
        <PointSlider defaultPoints={points} onChange={setPoints} />
      </Box>
    )
  },
}
