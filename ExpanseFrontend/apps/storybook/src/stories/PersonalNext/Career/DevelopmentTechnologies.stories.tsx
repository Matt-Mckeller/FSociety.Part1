import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { DevelopmentTechnologies } from "../../../../../../apps/personalNext/src/modules/content/career/development-technologies.component"

/**
 * Development Technologies displays the tech stack and skills.
 * Shows frontend, backend, and database technologies in a grid of cards.
 */
const meta: Meta<typeof DevelopmentTechnologies> = {
  title: "PersonalNext/Career/DevelopmentTechnologies",
  component: DevelopmentTechnologies,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A responsive grid of technology cards showing frontend, backend, and database skills. Each card displays a title with a list of technologies.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DevelopmentTechnologies>

/**
 * Default layout showing all technology categories.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Mobile view with stacked cards.
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
 * Tablet view with different breakpoint behavior.
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
