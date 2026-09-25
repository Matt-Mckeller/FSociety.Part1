import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack } from "@mui/material"
import { ProfileCard } from "../../../../../packages/ui/user/components/ProfileCard"
import { STATIC_ASSETS } from "expanse.staticAssets"

/**
 * ProfileCard component displays a user's profile summary with avatar,
 * name, email, role, and optional gamification elements.
 */
const meta: Meta<typeof ProfileCard> = {
  title: "User/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A profile display card with multiple variants (compact, standard, expanded) featuring avatar, user info, level badges, and action buttons.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["compact", "standard", "expanded"],
    },
    level: { control: { type: "number", min: 1, max: 100 } },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProfileCard>

// =============================================================================
// Mock Data
// =============================================================================

const baseUser = {
  displayName: "Jane Doe",
  email: "jane.doe@example.com",
  role: "Student" as const,
  memberSince: new Date("2023-06-15"),
}

const proUser = {
  displayName: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
  role: "Teacher" as const,
  level: 42,
  memberSince: new Date("2022-01-10"),
}

const adminUser = {
  displayName: "Sarah Administrator",
  email: "sarah.admin@example.com",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
  role: "Admin" as const,
  level: 99,
  memberSince: new Date("2021-03-20"),
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Compact variant - minimal display for sidebars or lists
 */
export const Compact: Story = {
  args: {
    ...baseUser,
    variant: "compact",
  },
}

/**
 * Standard variant - default card display
 */
export const Standard: Story = {
  args: {
    ...proUser,
    variant: "standard",
  },
}

/**
 * Expanded variant - full profile with stats and actions
 */
export const Expanded: Story = {
  args: {
    ...adminUser,
    variant: "expanded",
    onEdit: () => alert("Edit clicked"),
    onSettings: () => alert("Settings clicked"),
  },
}

/**
 * Without avatar - uses initials
 */
export const WithoutAvatar: Story = {
  args: {
    ...baseUser,
    variant: "standard",
  },
}

/**
 * With avatar image
 */
export const WithAvatar: Story = {
  args: {
    ...proUser,
    variant: "standard",
  },
}

/**
 * With level badge
 */
export const WithLevel: Story = {
  args: {
    ...baseUser,
    level: 25,
    variant: "standard",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the user's level badge on the avatar.",
      },
    },
  },
}

/**
 * All three variants side by side
 */
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <ProfileCard {...baseUser} variant="compact" />
      </Box>
      <Box>
        <ProfileCard {...proUser} variant="standard" />
      </Box>
      <Box sx={{ width: 480 }}>
        <ProfileCard
          {...adminUser}
          variant="expanded"
          onEdit={() => {}}
          onSettings={() => {}}
        />
      </Box>
    </Stack>
  ),
}

/**
 * Different roles displayed
 */
export const DifferentRoles: Story = {
  render: () => (
    <Stack spacing={2}>
      <ProfileCard
        displayName="Student User"
        email="student@example.com"
        role="Student"
        variant="compact"
      />
      <ProfileCard
        displayName="Teacher User"
        email="teacher@example.com"
        role="Teacher"
        variant="compact"
        avatarSrc={STATIC_ASSETS.images.profileDarkerLines}
      />
      <ProfileCard
        displayName="Admin User"
        email="admin@example.com"
        role="Admin"
        variant="compact"
        avatarSrc={STATIC_ASSETS.images.profileDarkerLines}
      />
    </Stack>
  ),
}

/**
 * With action buttons
 */
export const WithActions: Story = {
  args: {
    ...proUser,
    variant: "expanded",
    onEdit: () => alert("Edit Profile"),
    onSettings: () => alert("Open Settings"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Expanded variant includes action buttons for editing and settings.",
      },
    },
  },
}

/**
 * New user - recently joined
 */
export const NewUser: Story = {
  args: {
    displayName: "New Member",
    email: "newmember@example.com",
    role: "Student",
    level: 1,
    memberSince: new Date(),
    variant: "expanded",
  },
  parameters: {
    docs: {
      description: {
        story: "A new user who just joined, starting at level 1.",
      },
    },
  },
}

/**
 * Long text handling
 */
export const LongText: Story = {
  args: {
    displayName: "Alexandria Bartholomew Constantine III",
    email: "alexandria.bartholomew.constantine.the.third@verylongdomainname.example.com",
    role: "Teacher",
    variant: "standard",
  },
  parameters: {
    docs: {
      description: {
        story: "Tests text overflow handling for long names and emails.",
      },
    },
  },
}
