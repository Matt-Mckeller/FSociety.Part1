import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Auth } from "./Auth"
import { AuthFormScreen } from "../types/enums"

const meta: Meta<typeof Auth> = {
  title: "Auth/Components/Auth",
  component: Auth,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Main authentication container component that renders different auth screens based on the current screen state. This is typically used for full-page auth layouts. For modal-based auth, use AuthModal instead. See Auth/Screens for individual screen components.",
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Auth>

/**
 * Default state - Sign Up form (the default starting screen)
 */
export const Default: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialScreen: AuthFormScreen.SignUp,
    },
  },
}

/**
 * Sign In variant - for returning users
 */
export const SignInScreen: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialScreen: AuthFormScreen.SignIn,
    },
  },
}

/**
 * Password recovery flow - Forgot Password screen
 */
export const PasswordRecoveryFlow: Story = {
  parameters: {
    auth: {
      isAuthenticated: false,
      initialScreen: AuthFormScreen.ForgotPassword,
    },
  },
}

/**
 * Success state - shown after successful sign up
 */
export const SuccessState: Story = {
  parameters: {
    auth: {
      isAuthenticated: true,
      initialScreen: AuthFormScreen.SignUpSuccess,
    },
  },
}
