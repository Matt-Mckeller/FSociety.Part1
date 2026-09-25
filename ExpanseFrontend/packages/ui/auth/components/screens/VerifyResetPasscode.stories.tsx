import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { VerifyResetPasswordPasscode } from "./verify-reset-passcode"

const meta: Meta<typeof VerifyResetPasswordPasscode> = {
  title: "Auth/Screens/VerifyResetPasscode",
  component: VerifyResetPasswordPasscode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Verification code entry screen for password reset. Users enter the code sent to their email. Second step in the password recovery flow.",
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
type Story = StoryObj<typeof VerifyResetPasswordPasscode>

/**
 * Default empty verification form
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialEmail: "user@example.com", // Email needed for resend functionality
    },
  },
}
