import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"

import { BarChartSample } from "../../../../../../apps/personalNext/src/modules/content/samples/BarChartSample.component"
import { LineChartSample } from "../../../../../../apps/personalNext/src/modules/content/samples/LineChartSample.component"

/**
 * Chart Samples demonstrate Chart.js integration.
 * Used on the samples page to showcase data visualization capabilities.
 */
const meta: Meta<typeof BarChartSample> = {
  title: "PersonalNext/Samples/Charts",
  component: BarChartSample,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chart.js examples showing bar and line charts with theming support. Charts adapt to light/dark mode and use the Expanse color palette.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BarChartSample>

// =============================================================================
// BarChartSample Stories
// =============================================================================

/**
 * Bar chart showing inefficiencies vs opportunities.
 */
export const BarChart: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
        <Typography variant="h6" mb={2}>
          Bar Chart Sample
        </Typography>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Bar chart in a compact container.
 */
export const BarChartCompact: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

// =============================================================================
// LineChartSample Stories
// =============================================================================

/**
 * Line chart with interactive features.
 */
export const LineChart: StoryObj<typeof LineChartSample> = {
  render: () => (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 4 }}>
      <Typography variant="h6" mb={2}>
        Line Chart Sample
      </Typography>
      <LineChartSample />
    </Box>
  ),
}

/**
 * Line chart in full width layout.
 */
export const LineChartFullWidth: StoryObj<typeof LineChartSample> = {
  render: () => (
    <Box sx={{ width: "100%", p: 4 }}>
      <LineChartSample />
    </Box>
  ),
}

// =============================================================================
// Combined Stories
// =============================================================================

/**
 * Both chart types displayed together.
 */
export const BothCharts: Story = {
  render: () => (
    <Stack spacing={6} sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Box>
        <Typography variant="h6" mb={2}>
          Bar Chart
        </Typography>
        <BarChartSample />
      </Box>
      <Box>
        <Typography variant="h6" mb={2}>
          Line Chart
        </Typography>
        <LineChartSample />
      </Box>
    </Stack>
  ),
}

/**
 * Charts in a dashboard-like grid layout.
 */
export const DashboardLayout: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={4}>
        Analytics Dashboard
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Box flex={1}>
          <BarChartSample />
        </Box>
        <Box flex={1}>
          <LineChartSample />
        </Box>
      </Stack>
    </Box>
  ),
}

/**
 * Mobile view of charts.
 */
export const MobileView: Story = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 375, mx: "auto", p: 2 }}>
      <BarChartSample />
      <LineChartSample />
    </Stack>
  ),
}
