import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { LogoutButton } from "./LogoutButton"

const meta: Meta<typeof LogoutButton> = {
  title: "Auth/Components/LogoutButton",
  component: LogoutButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A button component that triggers user logout. Displays a logout icon and customizable text.",
      },
    },
    auth: {
      isAuthenticated: true,
    },
  },
  argTypes: {
    customText: {
      control: "text",
      description: "Custom text to display on the button",
    },
  },
}

export default meta
type Story = StoryObj<typeof LogoutButton>

/**
 * Default logout button with standard text
 */
export const Default: Story = {
  args: {},
}

/**
 * Logout button with custom text
 */
export const CustomText: Story = {
  args: {
    customText: "Sign Out",
  },
}

/**
 * Logout button with longer custom text
 */
export const LongText: Story = {
  args: {
    customText: "Log Out of Account",
  },
}
