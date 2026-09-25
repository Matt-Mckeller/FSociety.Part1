import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { DisplayNameInput } from "../../../../../packages/ui/user/components/DisplayNameInput"

/**
 * DisplayNameInput component provides a validated text field for editing display names
 * with character counting and real-time validation feedback.
 */
const meta: Meta<typeof DisplayNameInput> = {
  title: "User/DisplayNameInput",
  component: DisplayNameInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized text input for display names with built-in validation, character counting, and visual feedback for valid/invalid states.",
      },
    },
  },
  argTypes: {
    maxLength: { control: { type: "number", min: 10, max: 100 } },
    minLength: { control: { type: "number", min: 1, max: 10 } },
    showCharCount: { control: "boolean" },
    showValidIndicator: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DisplayNameInput>

// =============================================================================
// Interactive Wrapper Component
// =============================================================================

const InteractiveDisplayNameInput = (
  props: Partial<React.ComponentProps<typeof DisplayNameInput>>
) => {
  const [value, setValue] = useState(props.value ?? "")
  return (
    <DisplayNameInput
      value={value}
      onChange={setValue}
      showCharCount
      showValidIndicator
      {...props}
    />
  )
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Default empty state
 */
export const Default: Story = {
  render: () => <InteractiveDisplayNameInput />,
}

/**
 * Pre-filled with a valid name
 */
export const WithValue: Story = {
  render: () => <InteractiveDisplayNameInput value="Jane Doe" />,
}

/**
 * Input in error state with custom error message
 */
export const WithError: Story = {
  render: () => (
    <InteractiveDisplayNameInput
      value="X"
      error={true}
      helperText="Display name must be at least 2 characters"
    />
  ),
}

/**
 * Valid input with success indicator
 */
export const Valid: Story = {
  render: () => <InteractiveDisplayNameInput value="Valid Name" />,
  parameters: {
    docs: {
      description: {
        story:
          "When the name meets all requirements, a green checkmark appears.",
      },
    },
  },
}

/**
 * Showing character count
 */
export const WithCharacterCount: Story = {
  render: () => (
    <InteractiveDisplayNameInput
      value="Almost at the limit"
      showCharCount={true}
      maxLength={30}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Character count is displayed below the input.",
      },
    },
  },
}

/**
 * At maximum character limit
 */
export const AtMaxLength: Story = {
  render: () => (
    <InteractiveDisplayNameInput
      value="This name is exactly at max"
      maxLength={27}
      showCharCount
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows warning color when approaching or at the character limit.",
      },
    },
  },
}

/**
 * Without validation indicator
 */
export const NoValidationIndicator: Story = {
  render: () => (
    <InteractiveDisplayNameInput value="No Icon Shown" showValidIndicator={false} />
  ),
}

/**
 * Custom length constraints
 */
export const CustomConstraints: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Min 3, Max 15 characters
        </Typography>
        <InteractiveDisplayNameInput minLength={3} maxLength={15} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom display="block">
          Min 5, Max 50 characters
        </Typography>
        <InteractiveDisplayNameInput minLength={5} maxLength={50} />
      </Box>
    </Stack>
  ),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    value: "Cannot Edit",
    disabled: true,
    onChange: () => {},
  },
}

/**
 * Required field
 */
export const Required: Story = {
  render: () => <InteractiveDisplayNameInput required label="Display Name *" />,
  parameters: {
    docs: {
      description: {
        story: "Required field with asterisk indicator.",
      },
    },
  },
}

/**
 * Full width variant
 */
export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: "100%" }}>
      <InteractiveDisplayNameInput fullWidth value="Full Width Input" />
    </Box>
  ),
}

/**
 * Multiple inputs showing different states
 */
export const AllStates: Story = {
  render: () => (
    <Stack spacing={2}>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Empty
        </Typography>
        <InteractiveDisplayNameInput />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Too Short (Error)
        </Typography>
        <DisplayNameInput
          value="A"
          onChange={() => {}}
          error
          helperText="Name must be at least 2 characters"
          showValidIndicator
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Valid
        </Typography>
        <DisplayNameInput
          value="Valid Name"
          onChange={() => {}}
          showValidIndicator
          showCharCount
        />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Disabled
        </Typography>
        <DisplayNameInput value="Disabled Input" onChange={() => {}} disabled />
      </Box>
    </Stack>
  ),
}
