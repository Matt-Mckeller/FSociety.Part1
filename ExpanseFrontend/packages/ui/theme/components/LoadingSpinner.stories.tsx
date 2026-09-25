import type { Meta, StoryObj } from "@storybook/react"
import {
  ExpanseLoadingSpinner,
  CenteredExpanseLoadingSpinner,
} from "./layout/loadingSpinner.component"
import { Box } from "@mui/material"

/**
 * ExpanseLoadingSpinner displays an animated rotating Expanse logo.
 * Uses GSAP for smooth rotation animation.
 */
const meta: Meta<typeof ExpanseLoadingSpinner> = {
  title: "Theme/Layout/LoadingSpinner",
  component: ExpanseLoadingSpinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ExpanseLoadingSpinner>

/**
 * Default loading spinner with rotating Expanse logo
 */
export const Default: Story = {}

/**
 * Loading spinner in a smaller container
 */
export const SmallContainer: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ width: 100, height: 100, overflow: "hidden" }}>
        <Story />
      </Box>
    ),
  ],
}

/**
 * Loading spinner on dark background
 */
export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 4,
          bgcolor: "grey.900",
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
}

/**
 * Loading spinner on primary color background
 */
export const OnPrimaryBackground: Story = {
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 4,
          bgcolor: "primary.main",
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
}

/**
 * Centered loading spinner with backdrop overlay.
 * Typically used for full-page loading states.
 */
export const CenteredWithBackdrop: StoryObj<
  typeof CenteredExpanseLoadingSpinner
> = {
  render: () => (
    <Box sx={{ height: 400, width: "100%", position: "relative" }}>
      <Box sx={{ p: 4 }}>
        <p>Content behind the loading spinner...</p>
        <p>This demonstrates the backdrop overlay effect.</p>
      </Box>
      <CenteredExpanseLoadingSpinner />
    </Box>
  ),
}
