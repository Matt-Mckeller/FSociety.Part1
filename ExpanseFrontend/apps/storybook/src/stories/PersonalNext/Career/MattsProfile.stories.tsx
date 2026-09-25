import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack } from "@mui/material"

// Import components from personalNext
import {
  MattsProfile,
  MattProfilePicture,
} from "../../../../../../apps/personalNext/src/modules/content/career/matts-profile.component"
import { MattsProfileWithCta } from "../../../../../../apps/personalNext/src/modules/content/career/matts-profile-with-cta.component"

/**
 * Profile components for displaying Matt's professional information.
 * Used on the personal website for career and about pages.
 */
const meta: Meta<typeof MattsProfile> = {
  title: "PersonalNext/Career/MattsProfile",
  component: MattsProfile,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Professional profile display with photo, name, LinkedIn link, and customizable title. Used across the personal portfolio site.",
      },
    },
  },
  argTypes: {
    displayedTitle: {
      control: "text",
      description: "The professional title displayed below the name",
    },
    displayTitle: {
      control: "boolean",
      description: "Whether to show the title or hide it",
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MattsProfile>

// =============================================================================
// MattsProfile Stories
// =============================================================================

/**
 * Default profile with the standard Software Development Consultant title.
 */
export const Default: Story = {
  args: {
    displayedTitle: "Software Development Consultant",
    displayTitle: true,
  },
}

/**
 * Profile with a custom title for different contexts.
 */
export const CustomTitle: Story = {
  args: {
    displayedTitle: "Full-Stack Developer & Technical Lead",
    displayTitle: true,
  },
}

/**
 * Profile without the title displayed - useful for compact layouts.
 */
export const NoTitle: Story = {
  args: {
    displayTitle: false,
  },
}

/**
 * Profile optimized for product management contexts.
 */
export const ProductManager: Story = {
  args: {
    displayedTitle: "Product Manager & Technical Consultant",
    displayTitle: true,
  },
}

// =============================================================================
// MattProfilePicture Stories
// =============================================================================

/**
 * Standalone profile picture component with various size and shadow options.
 */
export const ProfilePicture: StoryObj<typeof MattProfilePicture> = {
  render: () => (
    <Stack spacing={4} alignItems="center">
      <Box>
        <MattProfilePicture size="60px" />
        <Box textAlign="center" mt={1}>
          60px - Small
        </Box>
      </Box>
      <Box>
        <MattProfilePicture size="100px" />
        <Box textAlign="center" mt={1}>
          100px - Default
        </Box>
      </Box>
      <Box>
        <MattProfilePicture size="150px" boxShadow={2} />
        <Box textAlign="center" mt={1}>
          150px - With Shadow
        </Box>
      </Box>
    </Stack>
  ),
}

/**
 * Profile pictures at different sizes for responsive design reference.
 */
export const PictureSizes: StoryObj<typeof MattProfilePicture> = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="flex-end">
      <MattProfilePicture size="40px" />
      <MattProfilePicture size="60px" />
      <MattProfilePicture size="80px" />
      <MattProfilePicture size="100px" />
      <MattProfilePicture size="120px" />
    </Stack>
  ),
}

/**
 * Profile picture with box shadow variations.
 */
export const PictureWithShadows: StoryObj<typeof MattProfilePicture> = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <MattProfilePicture size="80px" boxShadow={false} />
        <Box mt={1}>No Shadow</Box>
      </Box>
      <Box textAlign="center">
        <MattProfilePicture size="80px" boxShadow={1} />
        <Box mt={1}>Shadow 1</Box>
      </Box>
      <Box textAlign="center">
        <MattProfilePicture size="80px" boxShadow={3} />
        <Box mt={1}>Shadow 3</Box>
      </Box>
      <Box textAlign="center">
        <MattProfilePicture size="80px" boxShadow={6} />
        <Box mt={1}>Shadow 6</Box>
      </Box>
    </Stack>
  ),
}

/**
 * MattsProfileWithCta combines the profile with Call-to-Action buttons
 * including Calendly scheduling and contact options.
 */
export const ProfileWithCTA: StoryObj = {
  render: () => (
    <Box sx={{ maxWidth: "500px" }}>
      <MattsProfileWithCta />
    </Box>
  ),
}
