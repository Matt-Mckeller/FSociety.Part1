import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { TicketWithSlider } from "./TicketWithSlider.component"
import { PointSelectionContextProvider } from "../context/point-selection.context"
import { Box } from "@mui/material"

/**
 * TicketWithSlider combines a TicketCard with a PointSlider,
 * allowing users to interactively select complexity points
 * and see the ticket update in real-time.
 */
const meta: Meta<typeof TicketWithSlider> = {
  title: "Points/TicketWithSlider",
  component: TicketWithSlider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <PointSelectionContextProvider>
        <Box sx={{ p: 4 }}>
          <Story />
        </Box>
      </PointSelectionContextProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TicketWithSlider>

/**
 * Interactive ticket with slider for point selection
 */
export const Default: Story = {}

/**
 * Multiple tickets side by side (for comparison)
 */
export const SideBySide: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      <PointSelectionContextProvider>
        <TicketWithSlider />
      </PointSelectionContextProvider>
      <PointSelectionContextProvider>
        <TicketWithSlider />
      </PointSelectionContextProvider>
    </Box>
  ),
}
