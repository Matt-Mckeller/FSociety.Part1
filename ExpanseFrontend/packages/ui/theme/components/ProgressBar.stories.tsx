import type { Meta, StoryObj } from "@storybook/react"
import { ProgressBar } from "./ProgressBar.component"
import { Box, Typography } from "@mui/material"

/**
 * ProgressBar displays a stylized progress bar with customizable fill percentage.
 * Uses theme variants for styling (requires ProgressBar variants in theme config).
 * 
 * Features:
 * - Decorative layered SVG design
 * - Percentage display option
 * - Level display option
 * - "Filled" state when at 100%
 */
const meta: Meta<typeof ProgressBar> = {
  title: "Theme/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    aspectRatio: {
      control: { type: "range", min: 2, max: 12, step: 0.5 },
      description: "Width to height ratio of the progress bar",
    },
    percentFilled: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Fill percentage (0 to 1)",
    },
    displayPercentFilled: {
      control: "boolean",
      description: "Whether to show the percentage text",
    },
    displayedLevel: {
      control: "text",
      description: "Optional level label to display",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 60, width: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProgressBar>

/**
 * Default progress bar at 75% filled
 */
export const Default: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 0.75,
    displayPercentFilled: true,
  },
}

/**
 * Empty progress bar (0%)
 */
export const Empty: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 0,
    displayPercentFilled: true,
  },
}

/**
 * Quarter filled (25%)
 */
export const QuarterFilled: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 0.25,
    displayPercentFilled: true,
  },
}

/**
 * Half filled (50%)
 */
export const HalfFilled: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 0.5,
    displayPercentFilled: true,
  },
}

/**
 * Completely filled (100%) - uses "filled" variant styling
 */
export const Complete: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 1,
    displayPercentFilled: true,
  },
}

/**
 * With level display
 */
export const WithLevel: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 0.65,
    displayPercentFilled: true,
    displayedLevel: 5,
  },
}

/**
 * Without percentage text
 */
export const NoPercentageText: Story = {
  args: {
    aspectRatio: 6,
    percentFilled: 0.6,
    displayPercentFilled: false,
  },
}

/**
 * Wide bar (high aspect ratio)
 */
export const WideBar: Story = {
  args: {
    aspectRatio: 10,
    percentFilled: 0.8,
    displayPercentFilled: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 50, width: 600 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Compact bar (low aspect ratio)
 */
export const CompactBar: Story = {
  args: {
    aspectRatio: 3,
    percentFilled: 0.5,
    displayPercentFilled: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 70, width: 250 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Multiple progress states
 */
export const MultipleStates: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}>
      {[0, 0.25, 0.5, 0.75, 1].map((percent) => (
        <Box key={percent}>
          <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
            {Math.round(percent * 100)}% filled
          </Typography>
          <Box sx={{ height: 40 }}>
            <ProgressBar
              aspectRatio={8}
              percentFilled={percent}
              displayPercentFilled={true}
            />
          </Box>
        </Box>
      ))}
    </Box>
  ),
}

/**
 * Level progression example
 */
export const LevelProgression: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}>
      {[
        { level: 1, percent: 0.9 },
        { level: 2, percent: 0.45 },
        { level: 3, percent: 0.1 },
      ].map(({ level, percent }) => (
        <Box key={level} sx={{ height: 45 }}>
          <ProgressBar
            aspectRatio={7}
            percentFilled={percent}
            displayPercentFilled={true}
            displayedLevel={level}
          />
        </Box>
      ))}
    </Box>
  ),
}
