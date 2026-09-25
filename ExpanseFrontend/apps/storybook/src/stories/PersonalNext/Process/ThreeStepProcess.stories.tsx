import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import LoopIcon from "@mui/icons-material/Loop"
import CodeIcon from "@mui/icons-material/Code"
import BugReportIcon from "@mui/icons-material/BugReport"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"

import { ThreeStepProcess } from "../../../../../../apps/personalNext/src/modules/content/process/sections/threeStepProcess"

/**
 * Three Step Process section illustrating the development workflow.
 * Features animated expanding circles with customizable icons.
 */
const meta: Meta<typeof ThreeStepProcess> = {
  title: "PersonalNext/Process/ThreeStepProcess",
  component: ThreeStepProcess,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A visual representation of the three-step development process with animated expanding circle containers. Each step can have a custom icon. Content is loaded from processContent.json.",
      },
    },
  },
  argTypes: {
    Icon1: {
      control: false,
      description: "Custom icon for step 1 (defaults to PlaylistAddIcon)",
    },
    Icon2: {
      control: false,
      description: "Custom icon for step 2 (defaults to DesignServicesIcon)",
    },
    Icon3: {
      control: false,
      description: "Custom icon for step 3 (defaults to LoopIcon)",
    },
  },
}

export default meta
type Story = StoryObj<typeof ThreeStepProcess>

// =============================================================================
// ThreeStepProcess Stories
// =============================================================================

/**
 * Default three-step process with standard icons.
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
 * Process displayed in a narrow container (mobile simulation).
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

/**
 * Process with custom development-focused icons.
 */
export const CustomDevelopmentIcons: Story = {
  args: {
    Icon1: <CodeIcon />,
    Icon2: <BugReportIcon />,
    Icon3: <RocketLaunchIcon />,
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
 * Full width display for landing page integration.
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
