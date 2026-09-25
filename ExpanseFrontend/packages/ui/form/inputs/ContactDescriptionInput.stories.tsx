import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { ContactDescriptionInput } from "./ContactDescriptionInput"

const meta: Meta<typeof ContactDescriptionInput> = {
  title: "Form/Inputs/ContactDescriptionInput",
  component: ContactDescriptionInput,
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
        component: "Multiline text input for contact form details/descriptions.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ContactDescriptionInput>

// Interactive wrapper for controlled input
function ControlledContactDescriptionInput(props: {
  initialValue?: string
  error?: boolean
  helperText?: string
}) {
  const [value, setValue] = useState(props.initialValue || "")
  return (
    <ContactDescriptionInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledContactDescriptionInput />,
}

export const WithValue: Story = {
  render: () => (
    <ControlledContactDescriptionInput 
      initialValue="I'm interested in learning more about your premium features and pricing options for enterprise teams."
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <ControlledContactDescriptionInput
      initialValue=""
      error={true}
      helperText="Please provide some details about your inquiry"
    />
  ),
}
