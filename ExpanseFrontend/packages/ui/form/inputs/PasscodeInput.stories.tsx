import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { PasscodeInput } from "./PasscodeInput"

const meta: Meta<typeof PasscodeInput> = {
  title: "Form/Inputs/PasscodeInput",
  component: PasscodeInput,
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
        component: "Passcode input field for verification codes, with optional numbers-only mode.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PasscodeInput>

// Interactive wrapper for controlled input
function ControlledPasscodeInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
  allowOnlyNumbers?: boolean
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <PasscodeInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
      allowOnlyNumbers={props.allowOnlyNumbers}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledPasscodeInput />,
  parameters: {
    docs: {
      description: {
        story: "Default passcode input that only allows numeric characters.",
      },
    },
  },
}

export const WithValue: Story = {
  render: () => <ControlledPasscodeInput initialValue="123456" />,
}

export const AllowText: Story = {
  render: () => <ControlledPasscodeInput allowOnlyNumbers={false} />,
  parameters: {
    docs: {
      description: {
        story: "Passcode input that allows alphanumeric characters.",
      },
    },
  },
}

export const WithError: Story = {
  render: () => (
    <ControlledPasscodeInput
      initialValue="123"
      error={true}
      helperText="Invalid passcode. Please try again."
    />
  ),
}
