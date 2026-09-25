import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { NameInput } from "./NameInput"

const meta: Meta<typeof NameInput> = {
  title: "Form/Inputs/NameInput",
  component: NameInput,
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
        component: "Full name input field with person icon adornment.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NameInput>

// Interactive wrapper for controlled input
function ControlledNameInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
  autofocus?: boolean
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <NameInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
      autofocus={props.autofocus}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledNameInput />,
}

export const WithValue: Story = {
  render: () => <ControlledNameInput initialValue="Spencer Reid" />,
}

export const WithError: Story = {
  render: () => (
    <ControlledNameInput
      initialValue=""
      error={true}
      helperText="Full name is required"
    />
  ),
}
