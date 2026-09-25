import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { PasswordInput } from "./PasswordInput"

const meta: Meta<typeof PasswordInput> = {
  title: "Form/Inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: "Password input field with lock icon, optional password requirements display, and validation support.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PasswordInput>

// Interactive wrapper for controlled input
function ControlledPasswordInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
  displayRequirements?: boolean
  autoComplete?: "current-password" | "new-password"
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <PasswordInput
      value={value}
      onChange={setValue}
      error={props.error || false}
      helperText={props.helperText}
      displayRequirements={props.displayRequirements || false}
      autoComplete={props.autoComplete}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledPasswordInput />,
}

export const WithRequirements: Story = {
  render: () => <ControlledPasswordInput displayRequirements={true} />,
  parameters: {
    docs: {
      description: {
        story: "Shows password requirements checklist that updates as user types.",
      },
    },
  },
}

export const WithValue: Story = {
  render: () => <ControlledPasswordInput initialValue="SecurePass123!" displayRequirements={true} />,
}

export const WithError: Story = {
  render: () => (
    <ControlledPasswordInput
      initialValue="weak"
      error={true}
      helperText="Password does not meet requirements"
      displayRequirements={true}
    />
  ),
}

export const NewPassword: Story = {
  render: () => (
    <ControlledPasswordInput
      displayRequirements={true}
      autoComplete="new-password"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Password input configured for creating a new password.",
      },
    },
  },
}
