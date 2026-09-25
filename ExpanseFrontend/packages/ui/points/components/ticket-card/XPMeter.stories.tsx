import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TicketXPMeter } from "./xp-meter.component"
import { TICKET_POINT_OPTIONS } from "../../types/Points.types"
import { Box } from "@mui/material"

/**
 * TicketXPMeter displays a heart-based XP level indicator.
 * More filled hearts = higher experience points reward.
 */
const meta: Meta<typeof TicketXPMeter> = {
  title: "Points/XPMeter",
  component: TicketXPMeter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    ticketPoints: {
      control: "select",
      options: Object.values(TICKET_POINT_OPTIONS).filter(
        (v) => typeof v === "number",
      ),
      description: "Point value to display XP level for",
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "common.white",
          borderRadius: 1,
        }}
      >
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TicketXPMeter>

/**
 * 1 Point - Beginner level (1 heart)
 */
export const OnePoint: Story = {
  args: {
    ticketPoints: TICKET_POINT_OPTIONS.ONE_POINT,
  },
}

/**
 * 3 Points - Beginner level (2 hearts)
 */
export const ThreePoints: Story = {
  args: {
    ticketPoints: TICKET_POINT_OPTIONS.THREE_POINTS,
  },
}

/**
 * 5 Points - Intermediate level (3 hearts)
 */
export const FivePoints: Story = {
  args: {
    ticketPoints: TICKET_POINT_OPTIONS.FIVE_POINTS,
  },
}

/**
 * 9 Points - Advanced level (4 hearts)
 */
export const NinePoints: Story = {
  args: {
    ticketPoints: TICKET_POINT_OPTIONS.NINE_POINTS,
  },
}

/**
 * 18 Points - Advanced level (5 hearts)
 */
export const EighteenPoints: Story = {
  args: {
    ticketPoints: TICKET_POINT_OPTIONS.EIGHTEEN_POINTS,
  },
}

/**
 * All XP levels
 */
export const AllLevels: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {[
        TICKET_POINT_OPTIONS.ONE_POINT,
        TICKET_POINT_OPTIONS.TWO_POINTS,
        TICKET_POINT_OPTIONS.THREE_POINTS,
        TICKET_POINT_OPTIONS.FIVE_POINTS,
        TICKET_POINT_OPTIONS.NINE_POINTS,
        TICKET_POINT_OPTIONS.EIGHTEEN_POINTS,
      ].map((points) => (
        <Box key={points} sx={{ textAlign: "center" }}>
          <TicketXPMeter ticketPoints={points} />
          <Box sx={{ mt: 1, fontSize: "0.75rem" }}>{points} pts</Box>
        </Box>
      ))}
    </Box>
  ),
}
