import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AuthStatusDisplay } from "./AuthStatusDisplay"

const meta: Meta<typeof AuthStatusDisplay> = {
  title: "Auth/Components/AuthStatusDisplay",
  component: AuthStatusDisplay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays the current user's authentication status. Shows the user's name when logged in, renders nothing when logged out.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthStatusDisplay>

/**
 * Authenticated state - displays the user's name
 */
export const Authenticated: Story = {
  parameters: {
    auth: {
      isAuthenticated: true,
    },
  },
}

/**
 * Unauthenticated state - renders nothing
 */
export const Unauthenticated: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ border: "1px dashed #666", padding: "1rem", minHeight: "50px" }}>
        <p style={{ color: "#888", marginBottom: "8px" }}>
          (Component renders nothing when not authenticated)
        </p>
        <Story />
      </div>
    ),
  ],
}
