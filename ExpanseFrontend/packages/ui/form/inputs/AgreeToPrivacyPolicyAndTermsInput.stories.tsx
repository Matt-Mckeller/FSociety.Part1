import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { AgreeToPrivacyPolicyAndTermsInput } from "./AgreeToPrivacyPolicyAndTermsInput"

const meta: Meta<typeof AgreeToPrivacyPolicyAndTermsInput> = {
  title: "Form/Inputs/AgreeToPrivacyPolicyAndTermsInput",
  component: AgreeToPrivacyPolicyAndTermsInput,
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
        component: "Checkbox input for agreeing to Privacy Policy and Terms of Service with links.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AgreeToPrivacyPolicyAndTermsInput>

// Interactive wrapper for controlled input
function ControlledCheckbox(props: {
  initialValue?: boolean
  error?: boolean
  helperText?: string
}) {
  const [value, setValue] = useState(props.initialValue || false)
  return (
    <AgreeToPrivacyPolicyAndTermsInput
      value={value}
      onChange={setValue}
      error={props.error}
      helperText={props.helperText}
    />
  )
}

export const Unchecked: Story = {
  render: () => <ControlledCheckbox />,
}

export const Checked: Story = {
  render: () => <ControlledCheckbox initialValue={true} />,
}

export const WithError: Story = {
  render: () => (
    <ControlledCheckbox
      initialValue={false}
      error={true}
      helperText="You must agree to the Privacy Policy and Terms of Service"
    />
  ),
}
