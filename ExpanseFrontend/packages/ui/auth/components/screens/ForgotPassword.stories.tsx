import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ForgotPassword } from "./forgot-password"

const meta: Meta<typeof ForgotPassword> = {
  title: "Auth/Screens/ForgotPassword",
  component: ForgotPassword,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Forgot password screen where users enter their email to receive a password reset code. First step in the password recovery flow.",
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
type Story = StoryObj<typeof ForgotPassword>

/**
 * Default empty forgot password form
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Pre-filled with email address
 */
export const WithEmail: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialEmail: "user@example.com",
    },
  },
}
