import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { AccountSettings } from "../../../../../packages/ui/user/components/AccountSettings"
import { UserProfileData } from "../../../../../packages/ui/user/components/EditProfileForm"
import { STATIC_ASSETS } from "expanse.staticAssets"

/**
 * AccountSettings component provides a complete account settings page
 * with profile editing, security settings, and preferences.
 */
const meta: Meta<typeof AccountSettings> = {
  title: "User/AccountSettings",
  component: AccountSettings,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive account settings page layout with multiple sections for profile, security, preferences, and danger zone actions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["tabs", "sections"],
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 700, minHeight: 600 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AccountSettings>

// =============================================================================
// Mock Data
// =============================================================================

const mockUserData: UserProfileData = {
  displayName: "Jane Doe",
  email: "jane.doe@example.com",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
}

const newUserData: UserProfileData = {
  displayName: "New User",
  email: "newuser@example.com",
  avatarSrc: undefined,
}

const adminUserData: UserProfileData = {
  displayName: "Admin User",
  email: "admin@example.com",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
}

// =============================================================================
// Handler Functions
// =============================================================================

const handlers = {
  onSaveProfile: async (data: Partial<UserProfileData>) => {
    console.log("Saving profile:", data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(`Profile saved: ${data.displayName}`)
  },
  onChangePassword: async () => {
    console.log("Change password requested")
    alert("Password change dialog would open")
  },
  onDeleteAccount: async () => {
    console.log("Delete account requested")
    alert("Account deletion flow would start")
  },
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Sections variant - all sections visible on page
 */
export const Sections: Story = {
  args: {
    userData: mockUserData,
    variant: "sections",
    ...handlers,
  },
}

/**
 * Tabs variant - sections organized in tabs
 */
export const Tabs: Story = {
  args: {
    userData: mockUserData,
    variant: "tabs",
    ...handlers,
  },
}

/**
 * New user - minimal data
 */
export const NewUser: Story = {
  args: {
    userData: newUserData,
    variant: "sections",
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Account settings for a newly created user with minimal data.",
      },
    },
  },
}

/**
 * Admin user
 */
export const AdminUser: Story = {
  args: {
    userData: adminUserData,
    variant: "sections",
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Account settings for an admin user.",
      },
    },
  },
}

/**
 * Teacher profile
 */
export const TeacherProfile: Story = {
  args: {
    userData: mockUserData,
    variant: "tabs",
    ...handlers,
  },
}

/**
 * Without delete option
 */
export const WithoutDelete: Story = {
  args: {
    userData: mockUserData,
    variant: "sections",
    onSaveProfile: handlers.onSaveProfile,
    onChangePassword: handlers.onChangePassword,
    // No onDeleteAccount - hides danger zone
  },
  parameters: {
    docs: {
      description: {
        story:
          "Settings without the delete account option (e.g., for managed accounts).",
      },
    },
  },
}

/**
 * Profile section only
 */
export const ProfileOnly: Story = {
  args: {
    userData: mockUserData,
    variant: "sections",
    onSaveProfile: handlers.onSaveProfile,
    // Only profile save, no other actions
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal settings with only profile editing capability.",
      },
    },
  },
}

/**
 * Interactive demo with save simulation
 */
export const InteractiveDemo: Story = {
  render: () => {
    return (
      <AccountSettings
        userData={mockUserData}
        variant="tabs"
        onSaveProfile={async (data) => {
          console.log("Saving:", data)
          await new Promise((resolve) => setTimeout(resolve, 1500))
          console.log("Saved!")
        }}
        onChangePassword={async () => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          alert("Password change email sent!")
        }}
        onDeleteAccount={async () => {
          const confirmed = window.confirm(
            "Are you sure you want to delete your account? This cannot be undone."
          )
          if (confirmed) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            alert("Account deleted")
          }
        }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo with simulated save, password change, and delete flows.",
      },
    },
  },
}

/**
 * Long display name handling
 */
export const LongDisplayName: Story = {
  args: {
    userData: {
      ...mockUserData,
      displayName: "Alexandria Bartholomew Constantine the Third",
      email: "alexandria.b.constantine@verylongdomainname.example.com",
    },
    variant: "sections",
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Tests layout with very long display names and emails.",
      },
    },
  },
}

/**
 * Mobile-friendly sections
 */
export const MobileView: Story = {
  args: {
    userData: mockUserData,
    variant: "sections",
    ...handlers,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 375, minHeight: 600 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Settings page at mobile viewport width (375px).",
      },
    },
  },
}

/**
 * Variant comparison
 */
export const VariantComparison: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      <Box sx={{ flex: 1, minWidth: 400 }}>
        <Box sx={{ mb: 1, fontWeight: "bold" }}>Sections Variant</Box>
        <AccountSettings userData={mockUserData} variant="sections" {...handlers} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 400 }}>
        <Box sx={{ mb: 1, fontWeight: "bold" }}>Tabs Variant</Box>
        <AccountSettings userData={mockUserData} variant="tabs" {...handlers} />
      </Box>
    </Box>
  ),
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of sections and tabs variants.",
      },
    },
  },
}
