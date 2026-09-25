import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { ScrumBoardProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/scrumBoardProcess"

/**
 * Scrum Board Process section showcasing agile methodology.
 * Features an animated scrum board visualization.
 */
const meta: Meta<typeof ScrumBoardProcess> = {
  title: "PersonalNext/Process/ScrumBoardProcess",
  component: ScrumBoardProcess,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Displays an animated Scrum Board graphic with a title from processContent.json. Used to illustrate agile development practices.",
      },
    },
  },
  argTypes: {
    assetWidth: {
      control: { type: "text" },
      description: "Width of the scrum board asset",
    },
    maxAssetWidth: {
      control: { type: "text" },
      description: "Maximum width constraint for the asset",
    },
    isMobile: {
      control: "boolean",
      description: "Whether to render in mobile mode",
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrumBoardProcess>

// =============================================================================
// ScrumBoardProcess Stories
// =============================================================================

/**
 * Default scrum board with standard sizing.
 */
export const Default: Story = {
  args: {
    assetWidth: 500,
    maxAssetWidth: "100%",
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Scrum board optimized for mobile display.
 */
export const Mobile: Story = {
  args: {
    assetWidth: "100%",
    maxAssetWidth: 350,
    isMobile: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 375, mx: "auto", p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Large scrum board for desktop landing pages.
 */
export const Large: Story = {
  args: {
    assetWidth: 700,
    maxAssetWidth: "100%",
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Compact scrum board for sidebar or smaller sections.
 */
export const Compact: Story = {
  args: {
    assetWidth: 300,
    maxAssetWidth: 300,
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}
