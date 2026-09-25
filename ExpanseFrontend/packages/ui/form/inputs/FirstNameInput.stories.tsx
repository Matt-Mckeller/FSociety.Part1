import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { FirstNameInput } from "./FirstNameInput"

const meta: Meta<typeof FirstNameInput> = {
  title: "Form/Inputs/FirstNameInput",
  component: FirstNameInput,
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
        component: "First name input field with person icon adornment.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof FirstNameInput>

// Interactive wrapper for controlled input
function ControlledFirstNameInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <FirstNameInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledFirstNameInput />,
}

export const WithValue: Story = {
  render: () => <ControlledFirstNameInput initialValue="John" />,
}

export const WithError: Story = {
  render: () => (
    <ControlledFirstNameInput
      initialValue=""
      error={true}
      helperText="First name is required"
    />
  ),
}
