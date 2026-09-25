import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { PhoneNumberInput } from "./PhoneNumberInput"

const meta: Meta<typeof PhoneNumberInput> = {
  title: "Form/Inputs/PhoneNumberInput",
  component: PhoneNumberInput,
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
        component: "Phone number input field with phone icon adornment and automatic formatting (US format).",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PhoneNumberInput>

// Interactive wrapper for controlled input
function ControlledPhoneNumberInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <PhoneNumberInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledPhoneNumberInput />,
}

export const WithValue: Story = {
  render: () => <ControlledPhoneNumberInput initialValue="8163140123" />,
  parameters: {
    docs: {
      description: {
        story: "Phone number is automatically formatted as (816) 314-0123.",
      },
    },
  },
}

export const PartialValue: Story = {
  render: () => <ControlledPhoneNumberInput initialValue="816314" />,
  parameters: {
    docs: {
      description: {
        story: "Partial phone numbers are formatted progressively as user types.",
      },
    },
  },
}

export const WithError: Story = {
  render: () => (
    <ControlledPhoneNumberInput
      initialValue="123"
      error={true}
      helperText="Please enter a valid 10-digit phone number"
    />
  ),
}
