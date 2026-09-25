import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AuthFormSubmitActions } from "./AuthFormSubmitActions"

const meta: Meta<typeof AuthFormSubmitActions> = {
  title: "Auth/Components/AuthFormSubmitActions",
  component: AuthFormSubmitActions,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form submission actions component with Cancel and Submit buttons. Used across all auth forms for consistent styling and behavior.",
      },
    },
  },
  argTypes: {
    submitDisabled: {
      control: "boolean",
      description: "Whether the submit button is disabled",
    },
    loading: {
      control: "boolean",
      description: "Whether the form is currently submitting",
    },
    submitText: {
      control: "text",
      description: "Text to display on the submit button",
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthFormSubmitActions>

/**
 * Default state with submit enabled
 */
export const Default: Story = {
  args: {
    submitDisabled: false,
    loading: false,
    submitText: "Submit",
    handleOnSubmit: () => console.log("Form submitted"),
  },
}

/**
 * Submit button disabled state
 */
export const Disabled: Story = {
  args: {
    submitDisabled: true,
    loading: false,
    submitText: "Submit",
    handleOnSubmit: () => console.log("Form submitted"),
  },
}

/**
 * Loading state while form is submitting
 */
export const Loading: Story = {
  args: {
    submitDisabled: false,
    loading: true,
    submitText: "Submitting...",
    handleOnSubmit: () => console.log("Form submitted"),
  },
}

/**
 * Sign In form variant
 */
export const SignIn: Story = {
  args: {
    submitDisabled: false,
    loading: false,
    submitText: "Sign In",
    handleOnSubmit: () => console.log("Sign in submitted"),
  },
}

/**
 * Sign Up form variant
 */
export const SignUp: Story = {
  args: {
    submitDisabled: false,
    loading: false,
    submitText: "Create Account",
    handleOnSubmit: () => console.log("Sign up submitted"),
  },
}

/**
 * Reset Password form variant
 */
export const ResetPassword: Story = {
  args: {
    submitDisabled: false,
    loading: false,
    submitText: "Reset Password",
    handleOnSubmit: () => console.log("Reset password submitted"),
  },
}
