import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"

import { Resume } from "../../../../../../apps/personalNext/src/modules/content/resume/resume.component"

/**
 * Resume component displays a full professional resume.
 * Supports multiple resume types (developer, product) via URL params.
 */
const meta: Meta<typeof Resume> = {
  title: "PersonalNext/Resume/Resume",
  component: Resume,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Full resume component displaying executive summary, work experience, skills, and education. Content is loaded from JSON files and supports different resume variants.",
      },
    },
    // Mock the Next.js useSearchParams
    nextjs: {
      navigation: {
        query: {
          type: "development",
        },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Resume>

/**
 * Developer resume - the default variant.
 */
export const DeveloperResume: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 900, mx: "auto", p: 4, bgcolor: "background.paper" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Resume displayed in a narrow/mobile container.
 */
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 375, mx: "auto", p: 2, bgcolor: "background.paper" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Resume at full page width.
 */
export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", p: 4, bgcolor: "background.paper" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Print-optimized layout (max 8.5" width).
 */
export const PrintLayout: Story = {
  decorators: [
    (Story) => (
      <Box
        sx={{
          maxWidth: "8.5in",
          mx: "auto",
          p: "0.5in",
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Story />
      </Box>
    ),
  ],
}
