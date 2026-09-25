import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { DataVisualizationTabDisplay } from "../../../../../../apps/personalNext/src/modules/content/experience/components/DataVisualizationTabDisplay.component"

/**
 * Data Visualization Tab Display shows chart samples in a tabbed interface.
 * Demonstrates Chart.js integration with line and bar chart examples.
 */
const meta: Meta<typeof DataVisualizationTabDisplay> = {
  title: "PersonalNext/Experience/DataVisualizationTabDisplay",
  component: DataVisualizationTabDisplay,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A tabbed container displaying different Chart.js visualizations. Includes line chart and bar chart samples to showcase data visualization capabilities.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DataVisualizationTabDisplay>

/**
 * Default data visualization tabs.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Full width for dashboard-like layouts.
 */
export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Compact view for smaller containers.
 */
export const Compact: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Mobile view.
 */
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 375, mx: "auto", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}
