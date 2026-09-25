import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { SignUpForm } from "./sign-up-form"

const meta: Meta<typeof SignUpForm> = {
  title: "Auth/Screens/SignUpForm",
  component: SignUpForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sign up form screen with fields for full name, email, password, and privacy policy agreement. Handles form validation and submission.",
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
type Story = StoryObj<typeof SignUpForm>

/**
 * Default empty sign up form
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Pre-filled form with user data
 */
export const PreFilled: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialEmail: "newuser@example.com",
      initialFullName: "Jane Smith",
    },
  },
}
