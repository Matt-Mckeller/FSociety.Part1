import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AuthCTAButton } from "./AuthCtaButton"

const meta: Meta<typeof AuthCTAButton> = {
  title: "Auth/Components/AuthCTAButton",
  component: AuthCTAButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A call-to-action button for authentication flows. Can trigger sign up, sign in, or navigate to account page when authenticated.",
      },
    },
  },
  argTypes: {
    authDisplayType: {
      control: "select",
      options: ["signIn", "signUp"],
      description: "The type of auth screen to open",
    },
    authenticatedText: {
      control: "text",
      description: "Text to display when user is authenticated",
    },
    unauthenticatedText: {
      control: "text",
      description: "Text to display when user is not authenticated",
    },
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
      description: "MUI Button variant style",
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthCTAButton>

/**
 * Default Sign Up button (unauthenticated user)
 */
export const SignUpDefault: Story = {
  args: {
    authDisplayType: "signUp",
    eventName: "auth-cta-click",
  },
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Sign In button variant (unauthenticated user)
 */
export const SignIn: Story = {
  args: {
    authDisplayType: "signIn",
    eventName: "auth-cta-click",
  },
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Authenticated state - shows "My Account"
 */
export const Authenticated: Story = {
  args: {
    authDisplayType: "signUp",
    eventName: "auth-cta-click",
  },
  parameters: {
    auth: {
      isAuthenticated: true,
    },
  },
}

/**
 * Custom text when unauthenticated
 */
export const CustomUnauthenticatedText: Story = {
  args: {
    authDisplayType: "signUp",
    eventName: "auth-cta-click",
    unauthenticatedText: "Get Started Free",
  },
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Custom text when authenticated
 */
export const CustomAuthenticatedText: Story = {
  args: {
    authDisplayType: "signUp",
    eventName: "auth-cta-click",
    authenticatedText: "Dashboard",
  },
  parameters: {
    auth: {
      isAuthenticated: true,
    },
  },
}

/**
 * Outlined button variant
 */
export const OutlinedVariant: Story = {
  args: {
    authDisplayType: "signUp",
    eventName: "auth-cta-click",
    variant: "outlined",
  },
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}

/**
 * Text button variant
 */
export const TextVariant: Story = {
  args: {
    authDisplayType: "signIn",
    eventName: "auth-cta-click",
    variant: "text",
  },
  parameters: {
    auth: {
      isAuthenticated: false,
    },
  },
}
