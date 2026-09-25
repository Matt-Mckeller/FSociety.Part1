import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ResetPassword } from "./reset-password"

const meta: Meta<typeof ResetPassword> = {
  title: "Auth/Screens/ResetPassword",
  component: ResetPassword,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Reset password screen where users enter their new password. Final step in the password recovery flow after email verification.",
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ResetPassword>

/**
 * Default reset password form
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialEmail: "user@example.com", // Email needed for form submission
    },
  },
}
