import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { LastNameInput } from "./LastNameInput"

const meta: Meta<typeof LastNameInput> = {
  title: "Form/Inputs/LastNameInput",
  component: LastNameInput,
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
        component: "Last name input field with person icon adornment.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof LastNameInput>

// Interactive wrapper for controlled input
function ControlledLastNameInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <LastNameInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledLastNameInput />,
}

export const WithValue: Story = {
  render: () => <ControlledLastNameInput initialValue="Smith" />,
}

export const WithError: Story = {
  render: () => (
    <ControlledLastNameInput
      initialValue=""
      error={true}
      helperText="Last name is required"
    />
  ),
}
