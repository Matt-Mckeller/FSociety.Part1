import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { EmailAddressInput } from "./EmailAddressInput"

const meta: Meta<typeof EmailAddressInput> = {
  title: "Form/Inputs/EmailAddressInput",
  component: EmailAddressInput,
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
        component: "Email address input field with email icon adornment and validation support.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmailAddressInput>

// Interactive wrapper for controlled input
function ControlledEmailInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
  autoFocus?: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <EmailAddressInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
      autoFocus={props.autoFocus}
      placeholder={props.placeholder}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledEmailInput />,
}

export const WithValue: Story = {
  render: () => <ControlledEmailInput initialValue="user@example.com" />,
}

export const WithError: Story = {
  render: () => (
    <ControlledEmailInput
      initialValue="invalid-email"
      error={true}
      helperText="Please enter a valid email address"
    />
  ),
}

export const CustomPlaceholder: Story = {
  render: () => <ControlledEmailInput placeholder="your.email@company.com" />,
}
