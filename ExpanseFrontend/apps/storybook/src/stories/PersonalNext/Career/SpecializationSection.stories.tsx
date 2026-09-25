import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { SpecializationSection } from "../../../../../../apps/personalNext/src/modules/content/career/specialization-section.component"

/**
 * Specialization Section displays areas of expertise.
 * Uses icon cards to showcase different development specializations.
 */
const meta: Meta<typeof SpecializationSection> = {
  title: "PersonalNext/Career/SpecializationSection",
  component: SpecializationSection,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A grid of specialization cards with icons representing different development areas: Frontend/Backend, APIs, Data Analytics, UI/UX, DevOps, and more.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SpecializationSection>

/**
 * Default layout showing all specialization areas.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Mobile view with stacked specialization cards.
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
 * Tablet view.
 */
export const TabletView: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 768, mx: "auto", p: 3 }}>
        <Story />
      </Box>
    ),
  ],
}
