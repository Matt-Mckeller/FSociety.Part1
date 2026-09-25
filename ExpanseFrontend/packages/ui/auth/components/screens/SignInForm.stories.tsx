import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { SignInForm } from "./sign-in-form"

const meta: Meta<typeof SignInForm> = {
  title: "Auth/Screens/SignInForm",
  component: SignInForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sign in form screen with email and password fields. Validates credentials and handles login flow.",
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
type Story = StoryObj<typeof SignInForm>

/**
 * Default empty sign in form
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Pre-filled with email
 */
export const WithEmail: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialEmail: "existing@example.com",
    },
  },
}
