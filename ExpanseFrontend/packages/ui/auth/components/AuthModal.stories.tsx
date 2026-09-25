import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AuthModal } from "./AuthModal"
import { AuthFormScreen } from "../types/enums"

const meta: Meta<typeof AuthModal> = {
  title: "Auth/Components/AuthModal",
  component: AuthModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal dialog wrapper for authentication flows. Contains the Auth screens with a close button and modal styling. Use this for triggering auth from buttons/links in your app.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthModal>

/**
 * Modal open with Sign Up form (default)
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialScreen: AuthFormScreen.SignUp,
      modalOpen: true,
    },
  },
}

/**
 * Modal open with Sign In form
 */
export const SignIn: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialScreen: AuthFormScreen.SignIn,
      modalOpen: true,
    },
  },
}

/**
 * Modal closed state - renders nothing
 */
export const Closed: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialScreen: AuthFormScreen.SignUp,
      modalOpen: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ border: "1px dashed #666", padding: "1rem", minHeight: "50px" }}>
        <p style={{ color: "#888", marginBottom: "8px" }}>
          (Modal is closed - nothing rendered. Toggle modalOpen parameter to see the modal.)
        </p>
        <Story />
      </div>
    ),
  ],
}
