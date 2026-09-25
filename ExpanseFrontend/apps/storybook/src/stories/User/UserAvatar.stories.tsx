import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import { UserAvatar } from "../../../../../packages/ui/user/components/UserAvatar"
import { STATIC_ASSETS } from "expanse.staticAssets"

/**
 * UserAvatar component displays a user's profile photo with various sizes,
 * optional level badges, and editable upload functionality.
 */
const meta: Meta<typeof UserAvatar> = {
  title: "User/UserAvatar",
  component: UserAvatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible avatar component supporting multiple sizes, initials fallback, level badges, and optional photo upload.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "xlarge"],
    },
    variant: {
      control: { type: "select" },
      options: ["circular", "rounded", "square"],
    },
    editable: { control: "boolean" },
    showBadge: { control: "boolean" },
    level: { control: { type: "number", min: 1, max: 100 } },
  },
}

export default meta
type Story = StoryObj<typeof UserAvatar>

// =============================================================================
// Stories
// =============================================================================

/**
 * Default avatar with user initials
 */
export const Default: Story = {
  args: {
    name: "Jane Doe",
    size: "large",
  },
}

/**
 * Avatar with a profile image
 */
export const WithImage: Story = {
  args: {
    src: STATIC_ASSETS.images.profileDarkerLines,
    name: "Jane Doe",
    size: "large",
  },
}

/**
 * All available sizes displayed together
 */
export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="small" />
        <Typography variant="caption" display="block" mt={1}>
          Small
        </Typography>
      </Box>
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="medium" />
        <Typography variant="caption" display="block" mt={1}>
          Medium
        </Typography>
      </Box>
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="large" />
        <Typography variant="caption" display="block" mt={1}>
          Large
        </Typography>
      </Box>
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="xlarge" />
        <Typography variant="caption" display="block" mt={1}>
          XLarge
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * Avatar with level badge showing user's level
 */
export const WithLevelBadge: Story = {
  args: {
    name: "Pro User",
    size: "large",
    level: 42,
    showBadge: true,
  },
}

/**
 * Avatar with image and level badge
 */
export const ImageWithBadge: Story = {
  args: {
    src: STATIC_ASSETS.images.profileDarkerLines,
    name: "Pro User",
    size: "xlarge",
    level: 99,
    showBadge: true,
  },
}

/**
 * Editable avatar with upload button on hover
 */
export const Editable: Story = {
  args: {
    name: "Editable User",
    size: "xlarge",
    editable: true,
    onUpload: (file: File) => {
      alert(`Uploading file: ${file.name}`)
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Hover over the avatar to see the upload overlay.",
      },
    },
  },
}

/**
 * Editable avatar with existing image
 */
export const EditableWithImage: Story = {
  args: {
    src: STATIC_ASSETS.images.profileDarkerLines,
    name: "Editable User",
    size: "xlarge",
    editable: true,
    onUpload: (file: File) => {
      alert(`Replacing with: ${file.name}`)
    },
  },
}

/**
 * Different avatar variants
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="large" variant="default" />
        <Typography variant="caption" display="block" mt={1}>
          Default
        </Typography>
      </Box>
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="large" variant="bordered" />
        <Typography variant="caption" display="block" mt={1}>
          Bordered
        </Typography>
      </Box>
      <Box textAlign="center">
        <UserAvatar name="John Doe" size="large" variant="expanding" />
        <Typography variant="caption" display="block" mt={1}>
          Expanding
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * Loading state while uploading
 */
export const Loading: Story = {
  args: {
    name: "Loading User",
    size: "xlarge",
    editable: true,
    isLoading: true,
  },
}

/**
 * Avatars with various initials
 */
export const InitialsVariations: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <UserAvatar name="John Doe" size="medium" />
      <UserAvatar name="Alice" size="medium" />
      <UserAvatar name="Bob Smith Jr" size="medium" />
      <UserAvatar name="X" size="medium" />
      <UserAvatar name="Maria Garcia Lopez" size="medium" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows how initials are generated from different name formats.",
      },
    },
  },
}
