import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "@mui/material"
import { UserProfile } from "../../../../../packages/ui/user"
import {
  MockUserProvider,
  mockUsers,
  createMockUserFull,
  createMockUserPartial,
  createMockUserNew,
  createMockUserLongText,
} from "../../mocks/user-context"

/**
 * UserProfile component displays account information including
 * name, email, previous sign-in date, account creation date, and logout button.
 */
const meta: Meta<typeof UserProfile> = {
  title: "User/UserProfile",
  component: UserProfile,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Account information display showing user details with a logout button. Requires UserContext and auth context for the LogoutButton.",
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get user from story parameters or use default
      const user = context.parameters?.mockUser ?? mockUsers.full
      return (
        <MockUserProvider user={user}>
          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Story />
          </Box>
        </MockUserProvider>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof UserProfile>

// =============================================================================
// Stories
// =============================================================================

/**
 * Default state with a fully populated user
 */
export const Default: Story = {
  parameters: {
    mockUser: createMockUserFull(),
  },
}

/**
 * User with partial data - missing phone number and some optional fields
 */
export const PartialData: Story = {
  parameters: {
    mockUser: createMockUserPartial(),
    docs: {
      description: {
        story: "User profile with missing optional fields like phone number.",
      },
    },
  },
}

/**
 * New user who just signed up - no previous login recorded
 */
export const NewUser: Story = {
  parameters: {
    mockUser: createMockUserNew(),
    docs: {
      description: {
        story:
          "Recently created account with no previous sign-in. Tests display of empty/null login date.",
      },
    },
  },
}

/**
 * User with very long name and email to test text overflow/ellipsis behavior
 */
export const LongTextOverflow: Story = {
  parameters: {
    mockUser: createMockUserLongText(),
    docs: {
      description: {
        story:
          "Tests ellipsis overflow handling for long names and email addresses.",
      },
    },
  },
}

/**
 * Edge case: No user data (null user)
 */
export const NoUser: Story = {
  parameters: {
    mockUser: null,
    docs: {
      description: {
        story:
          "Edge case when user context has no user. Displays placeholder text.",
      },
    },
  },
}
