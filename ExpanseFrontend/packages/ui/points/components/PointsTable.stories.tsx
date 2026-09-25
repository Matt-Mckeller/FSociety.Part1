import type { Meta, StoryObj } from "@storybook/react"
import { PointsTable } from "./PointsTable.component"
import { Box } from "@mui/material"

const meta: Meta<typeof PointsTable> = {
  title: "Points/PointsTable",
  component: PointsTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PointsTable>

/**
 * Default view of the PointsTable showing all point estimates and their complexity ratios.
 */
export const Default: Story = {}

/**
 * Narrow width version of the table.
 */
export const NarrowWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 280 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Wide width version of the table.
 */
export const WideWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
}
