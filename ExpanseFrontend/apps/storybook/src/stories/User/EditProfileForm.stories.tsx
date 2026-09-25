import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Box } from "@mui/material"
import {
  EditProfileForm,
  UserProfileData,
} from "../../../../../packages/ui/user/components/EditProfileForm"
import { STATIC_ASSETS } from "expanse.staticAssets"

/**
 * EditProfileForm component provides a complete form for editing user profile
 * including avatar upload, display name editing, and completeness tracking.
 */
const meta: Meta<typeof EditProfileForm> = {
  title: "User/EditProfileForm",
  component: EditProfileForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive profile editing form with avatar upload, display name input, unsaved changes tracking, and optional profile completeness indicator.",
      },
    },
  },
  argTypes: {
    showAvatarUpload: { control: "boolean" },
    showCompleteness: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EditProfileForm>

// =============================================================================
// Mock Data
// =============================================================================

const emptyProfile: UserProfileData = {
  displayName: "",
  avatarSrc: undefined,
}

const partialProfile: UserProfileData = {
  displayName: "Jane Doe",
  avatarSrc: undefined,
}

const completeProfile: UserProfileData = {
  displayName: "Alex Johnson",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
}

// =============================================================================
// Interactive Wrapper
// =============================================================================

const InteractiveEditProfileForm = (
  props: Partial<React.ComponentProps<typeof EditProfileForm>> & { initialData?: UserProfileData }
) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async (data: Partial<UserProfileData>) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    console.log("Saved:", data)
    alert(`Saved: ${data.displayName}`)
  }

  return (
    <EditProfileForm
      initialData={props.initialData ?? partialProfile}
      onSave={handleSave}
      onCancel={() => alert("Cancelled")}
      isLoading={isLoading}
      showAvatarUpload
      showCompleteness
      {...props}
    />
  )
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Empty form for new users
 */
export const Empty: Story = {
  render: () => <InteractiveEditProfileForm initialData={emptyProfile} />,
}

/**
 * Form with existing display name
 */
export const WithDisplayName: Story = {
  render: () => <InteractiveEditProfileForm initialData={partialProfile} />,
}

/**
 * Form with complete profile data
 */
export const WithCompleteProfile: Story = {
  render: () => <InteractiveEditProfileForm initialData={completeProfile} />,
}

/**
 * Loading state during save
 */
export const Loading: Story = {
  args: {
    initialData: completeProfile,
    isLoading: true,
    onSave: async () => {},
    onCancel: () => {},
  },
}

/**
 * Without avatar upload
 */
export const WithoutAvatarUpload: Story = {
  render: () => (
    <InteractiveEditProfileForm
      initialData={partialProfile}
      showAvatarUpload={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Form without the avatar upload section.",
      },
    },
  },
}

/**
 * Without completeness indicator
 */
export const WithoutCompleteness: Story = {
  render: () => (
    <InteractiveEditProfileForm
      initialData={partialProfile}
      showCompleteness={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Form without the profile completeness progress indicator.",
      },
    },
  },
}

/**
 * Minimal form - no extras
 */
export const Minimal: Story = {
  render: () => (
    <InteractiveEditProfileForm
      initialData={partialProfile}
      showAvatarUpload={false}
      showCompleteness={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal form with just the display name input.",
      },
    },
  },
}

/**
 * Form with validation error demonstration
 */
export const ValidationDemo: Story = {
  render: () => {
    const ValidationForm = () => {
      const [data, setData] = useState<UserProfileData>({
        displayName: "A",
        avatarSrc: undefined,
      })

      return (
        <Box>
          <EditProfileForm
            initialData={data}
            onSave={async (newData) => {
              if (!newData.displayName || newData.displayName.length < 2) {
                alert("Display name must be at least 2 characters")
                return
              }
              alert(`Saved: ${newData.displayName}`)
            }}
            onCancel={() => setData({ displayName: "A", avatarSrc: undefined })}
            showAvatarUpload
          />
        </Box>
      )
    }
    return <ValidationForm />
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates validation behavior with a name that's too short.",
      },
    },
  },
}

/**
 * Full featured form
 */
export const FullFeatured: Story = {
  render: () => (
    <InteractiveEditProfileForm
      initialData={{
        displayName: "Taylor Smith",
        avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
      }}
      showAvatarUpload
      showCompleteness
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete form with all features enabled: avatar upload, display name, and completeness tracking.",
      },
    },
  },
}

/**
 * Save simulation with delay
 */
export const SaveSimulation: Story = {
  render: () => {
    const SimulatedForm = () => {
      const [isLoading, setIsLoading] = useState(false)
      const [savedData, setSavedData] = useState<UserProfileData | null>(null)

      const handleSave = async (data: Partial<UserProfileData>) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSavedData(data as UserProfileData)
        setIsLoading(false)
      }

      return (
        <Box>
          <EditProfileForm
            initialData={completeProfile}
            onSave={handleSave}
            onCancel={() => setSavedData(null)}
            isLoading={isLoading}
            showAvatarUpload
          />
          {savedData && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "success.light",
                borderRadius: 1,
                color: "success.contrastText",
              }}
            >
              Saved: {savedData.displayName}
            </Box>
          )}
        </Box>
      )
    }
    return <SimulatedForm />
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the full save flow with loading state and success feedback.",
      },
    },
  },
}
