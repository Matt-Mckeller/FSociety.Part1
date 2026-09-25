import type { Meta, StoryObj } from "@storybook/react"
import { PointExampleSection } from "./PointExampleSection.component"
import { Box } from "@mui/material"
import { PointSelectionContextProvider } from "expanse.ui/points"

const meta: Meta<typeof PointExampleSection> = {
  title: "Points/PointExampleSection",
  component: PointExampleSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    cardWidth: {
      control: { type: "range", min: 200, max: 800, step: 50 },
      description: "Width of the card container in pixels",
    },
  },
  decorators: [
    (Story) => (
      <PointSelectionContextProvider>
        <Box sx={{ width: 600, minHeight: 400 }}>
          <Story />
        </Box>
      </PointSelectionContextProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PointExampleSection>

/**
 * Default view showing the toggle between Card, Chart, and Table views.
 * Users can switch between different visualizations of the point system.
 * Uses cardWidth: 300 to match the production usage in personalNext.
 */
export const Default: Story = {
  args: {
    cardWidth: 300,
  },
}

/**
 * Narrow card width for mobile or compact layouts.
 */
export const NarrowCard: Story = {
  args: {
    cardWidth: 280,
  },
}

/**
 * Wide card width for desktop layouts.
 */
export const WideCard: Story = {
  args: {
    cardWidth: 600,
  },
  decorators: [
    (Story) => (
      <PointSelectionContextProvider>
        <Box sx={{ width: 800, minHeight: 400 }}>
          <Story />
        </Box>
      </PointSelectionContextProvider>
    ),
  ],
}
