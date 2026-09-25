import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"

import { BusinessCardFront } from "../../../../../../apps/personalNext/src/modules/marketing/print/BusinessCardFront"
import { BusinessCardBackV2 } from "../../../../../../apps/personalNext/src/modules/marketing/print/BusinessCardBackV2"

/**
 * Business Card components for print marketing materials.
 * These generate high-resolution images for professional printing.
 */
const meta: Meta<typeof BusinessCardFront> = {
  title: "PersonalNext/Marketing/BusinessCards",
  component: BusinessCardFront,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Print-ready business card designs. The front features profile photo and contact info, while the back showcases services and branding. Both use the ExpandingBorderBox for visual consistency.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BusinessCardFront>

/**
 * Business card front - contact information side.
 */
export const Front: Story = {
  render: () => (
    <Box sx={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
      <BusinessCardFront />
    </Box>
  ),
  decorators: [
    (Story) => (
      <Box sx={{ width: 500, height: 300, overflow: "visible" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Business card back - services and branding side.
 */
export const Back: Story = {
  render: () => (
    <Box sx={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
      <BusinessCardBackV2 />
    </Box>
  ),
  decorators: [
    (Story) => (
      <Box sx={{ width: 500, height: 300, overflow: "visible" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Both sides of the business card displayed together.
 */
export const BothSides: Story = {
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Box>
        <Typography variant="subtitle2" mb={1} textAlign="center">
          Front
        </Typography>
        <Box sx={{ transform: "scale(0.4)", transformOrigin: "top center" }}>
          <BusinessCardFront />
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle2" mb={1} textAlign="center">
          Back
        </Typography>
        <Box sx={{ transform: "scale(0.4)", transformOrigin: "top center" }}>
          <BusinessCardBackV2 />
        </Box>
      </Box>
    </Stack>
  ),
}

/**
 * Business card at actual print size reference (3.5" x 2").
 * Note: Displayed at reduced scale for viewing.
 */
export const PrintSizeReference: Story = {
  render: () => (
    <Box>
      <Typography variant="caption" display="block" mb={2} textAlign="center">
        Standard business card: 3.5" × 2" (displayed at 50% scale)
      </Typography>
      <Stack direction="row" spacing={4}>
        <Box sx={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
          <BusinessCardFront />
        </Box>
      </Stack>
    </Box>
  ),
}
