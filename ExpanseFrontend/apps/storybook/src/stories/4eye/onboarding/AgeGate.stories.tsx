import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AgeGate } from 'expanse.ui/auth'
import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const meta: Meta<typeof AgeGate> = {
  title: '4eye/Onboarding/AgeGate',
  component: AgeGate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Age verification component with date of birth input. Calculates age and shows COPPA notice for users under 13.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: 400, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Story />
        </Box>
      </LocalizationProvider>
    ),
  ],
  argTypes: {
    minAge: {
      control: 'number',
      description: 'Minimum age requirement',
    },
    showCOPPANotice: {
      control: 'boolean',
      description: 'Show COPPA notice for minors',
    },
    error: {
      control: 'text',
      description: 'External error message',
    },
  },
}

export default meta
type Story = StoryObj<typeof AgeGate>

export const Default: Story = {
  args: {
    onVerified: (isMinor, dob) => {
      alert(`Age verified! Minor: ${isMinor}, DOB: ${dob.toLocaleDateString()}`)
    },
  },
}

export const WithMinimumAge: Story = {
  args: {
    minAge: 18,
    onVerified: (isMinor, dob) => {
      alert(`Age verified! Minor: ${isMinor}, DOB: ${dob.toLocaleDateString()}`)
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'With a minimum age requirement of 18 years.',
      },
    },
  },
}

export const WithoutCOPPANotice: Story = {
  args: {
    showCOPPANotice: false,
    onVerified: (isMinor, dob) => {
      alert(`Age verified! Minor: ${isMinor}, DOB: ${dob.toLocaleDateString()}`)
    },
  },
}

export const WithExternalError: Story = {
  args: {
    error: 'Unable to verify age. Please try again.',
    onVerified: () => {},
  },
}

// Note: The interactive states (showing COPPA notice for under-13)
// are best demonstrated by interacting with the Default story
// and entering a DOB that makes the user under 13 years old.
