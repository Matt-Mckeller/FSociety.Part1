import type { Meta, StoryObj } from "@storybook/react"
import { PointsChart } from "./PointsChart.component"
import { Box } from "@mui/material"

const meta: Meta<typeof PointsChart> = {
  title: "Points/PointsChart",
  component: PointsChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, height: 300 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PointsChart>

/**
 * Default view of the PointsChart showing experience points curve.
 * The chart displays how XP reward increases exponentially with point estimates.
 */
export const Default: Story = {}

/**
 * Small chart variant for compact displays.
 */
export const SmallChart: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 250, height: 200 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Large chart variant for detailed viewing.
 */
export const LargeChart: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 600, height: 400 }}>
        <Story />
      </Box>
    ),
  ],
}
