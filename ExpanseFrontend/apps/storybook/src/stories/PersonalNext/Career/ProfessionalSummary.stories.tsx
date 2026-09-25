import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { ProfessionalSummary } from "../../../../../../apps/personalNext/src/modules/content/career/professional-summary.component"

/**
 * Professional Summary displays career progression and background.
 * Shows a gamified "level" progression through career milestones.
 */
const meta: Meta<typeof ProfessionalSummary> = {
  title: "PersonalNext/Career/ProfessionalSummary",
  component: ProfessionalSummary,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Career progression displayed as 'levels' with milestones, followed by detailed professional background paragraphs. Uses emoji icons for visual interest.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfessionalSummary>

/**
 * Default professional summary with all content.
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
 * Narrow container for reading-focused layout.
 */
export const NarrowReading: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
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
