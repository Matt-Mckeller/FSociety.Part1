import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import PageFooter from "../../../../../../apps/personalNext/src/modules/layout/page-footer"

/**
 * Page Footer component for the personal portfolio site.
 * Contains contact information, GitHub link, and legal links.
 */
const meta: Meta<typeof PageFooter> = {
  title: "PersonalNext/Layout/PageFooter",
  component: PageFooter,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site footer with GitHub samples link, phone number, and email. Responsive layout switches between row (desktop) and column (mobile) arrangements.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PageFooter>

// =============================================================================
// PageFooter Stories
// =============================================================================

/**
 * Default footer at full width - shows row layout on desktop.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Footer in a desktop-width container.
 */
export const DesktopWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 1200 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Footer in a mobile-width container - shows stacked layout.
 */
export const MobileWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 375 }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Footer in a tablet-width container.
 */
export const TabletWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 768 }}>
        <Story />
      </Box>
    ),
  ],
}
