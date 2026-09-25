import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RoleSelector, UserRole } from 'expanse.ui/auth'
import { Box, Button, Stack } from '@mui/material'

const meta: Meta<typeof RoleSelector> = {
  title: '4eye/Onboarding/RoleSelector',
  component: RoleSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-select role selector with explanation text. Users can select multiple roles except School Administrator which is disabled.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    showExplanation: {
      control: 'boolean',
      description: 'Show the explanation text about role selection',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof RoleSelector>

// Interactive wrapper for stateful stories
const InteractiveRoleSelector = ({
  initialRoles = [],
  ...props
}: {
  initialRoles?: UserRole[]
} & Partial<React.ComponentProps<typeof RoleSelector>>) => {
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(initialRoles)

  return (
    <RoleSelector
      selectedRoles={selectedRoles}
      onChange={setSelectedRoles}
      {...props}
    />
  )
}

export const Default: Story = {
  render: () => <InteractiveRoleSelector />,
}

export const WithoutExplanation: Story = {
  render: () => <InteractiveRoleSelector showExplanation={false} />,
}

export const PreSelectedStudent: Story = {
  render: () => <InteractiveRoleSelector initialRoles={['student']} />,
}

export const PreSelectedMultiple: Story = {
  render: () => (
    <InteractiveRoleSelector initialRoles={['student', 'professional_teacher']} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example with multiple roles pre-selected (Student and Professional Teacher).',
      },
    },
  },
}

export const WithError: Story = {
  render: () => (
    <InteractiveRoleSelector error="Please select at least one role to continue" />
  ),
}

export const WithContinueButton: Story = {
  render: () => {
    const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([])
    const [error, setError] = useState<string>('')

    const handleContinue = () => {
      if (selectedRoles.length === 0) {
        setError('Please select at least one role to continue')
      } else {
        setError('')
        alert(`Selected roles: ${selectedRoles.join(', ')}`)
      }
    }

    return (
      <Stack spacing={3}>
        <RoleSelector
          selectedRoles={selectedRoles}
          onChange={(roles) => {
            setSelectedRoles(roles)
            setError('')
          }}
          error={error}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleContinue}
          fullWidth
          sx={{ height: 48, textTransform: 'none', fontWeight: 600 }}
        >
          Continue
        </Button>
      </Stack>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete role selection step with validation and continue button.',
      },
    },
  },
}

export const AllDisabledExceptStudent: Story = {
  render: () => (
    <InteractiveRoleSelector
      disabledRoles={['professional_teacher', 'independent_learner', 'parent_guardian']}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example where only Student role is selectable (other roles disabled).',
      },
    },
  },
}
