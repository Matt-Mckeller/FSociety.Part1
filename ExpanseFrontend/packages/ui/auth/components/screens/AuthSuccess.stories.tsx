import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AuthSuccessScreen } from "./auth-success"
import { AuthFormScreen } from "../../types/enums"

const meta: Meta<typeof AuthSuccessScreen> = {
  title: "Auth/Screens/AuthSuccess",
  component: AuthSuccessScreen,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Success screen displayed after completing sign up or password reset. Shows a confirmation message and continue button.",
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
type Story = StoryObj<typeof AuthSuccessScreen>

/**
 * Sign Up Success - shown after successful registration
 */
export const SignUpSuccess: Story = {
  parameters: {
    auth: {
      isAuthenticated: true,
      initialScreen: AuthFormScreen.SignUpSuccess,
    },
  },
}

/**
 * Reset Password Success - shown after successful password reset
 */
export const ResetPasswordSuccess: Story = {
  parameters: {
    auth: {
      isAuthenticated: true,
      initialScreen: AuthFormScreen.ResetPasswordSuccess,
    },
  },
}
