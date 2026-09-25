import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SocialAuthButtons } from 'expanse.ui/auth'
import { Box, Typography } from '@mui/material'

const meta: Meta<typeof SocialAuthButtons> = {
  title: '4eye/Onboarding/SocialAuthButtons',
  component: SocialAuthButtons,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Container component displaying all social authentication options with an optional divider. Used as the primary auth entry point.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 360, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    providers: {
      control: 'object',
      description: 'Array of OAuth providers to display',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of all buttons',
    },
    showDivider: {
      control: 'boolean',
      description: 'Show "OR" divider below buttons',
    },
    dividerText: {
      control: 'text',
      description: 'Text to display in divider',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all buttons',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state on all buttons',
    },
  },
}

export default meta
type Story = StoryObj<typeof SocialAuthButtons>

export const Default: Story = {
  args: {
    showDivider: true,
  },
}

export const WithoutDivider: Story = {
  args: {
    showDivider: false,
  },
}

export const CustomDividerText: Story = {
  args: {
    showDivider: true,
    dividerText: 'continue with email',
  },
}

export const LimitedProviders: Story = {
  args: {
    providers: ['google', 'apple'],
    showDivider: true,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'small',
    showDivider: true,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'large',
    showDivider: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    showDivider: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    showDivider: true,
  },
}

export const WithEmailSignup: Story = {
  render: () => (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
        Create Account
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        Choose how you want to sign up
      </Typography>
      <SocialAuthButtons showDivider dividerText="or sign up with email" />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account? <a href="#">Sign in</a>
        </Typography>
      </Box>
    </Box>
  ),
}
