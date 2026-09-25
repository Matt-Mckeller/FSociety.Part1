import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SocialAuthButton } from 'expanse.ui/auth'
import { Box } from '@mui/material'

const meta: Meta<typeof SocialAuthButton> = {
  title: '4eye/Onboarding/SocialAuthButton',
  component: SocialAuthButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Individual social authentication button for a specific OAuth provider. Supports Google, Microsoft, Apple, and GitHub.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 320 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    provider: {
      control: 'select',
      options: ['google', 'microsoft', 'apple', 'github'],
      description: 'OAuth provider',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
}

export default meta
type Story = StoryObj<typeof SocialAuthButton>

export const Google: Story = {
  args: {
    provider: 'google',
  },
}

export const Microsoft: Story = {
  args: {
    provider: 'microsoft',
  },
}

export const Apple: Story = {
  args: {
    provider: 'apple',
  },
}

export const GitHub: Story = {
  args: {
    provider: 'github',
  },
}

export const Small: Story = {
  args: {
    provider: 'google',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    provider: 'google',
    size: 'large',
  },
}

export const Loading: Story = {
  args: {
    provider: 'google',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    provider: 'google',
    disabled: true,
  },
}

export const AllProviders: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <SocialAuthButton provider="google" />
      <SocialAuthButton provider="microsoft" />
      <SocialAuthButton provider="apple" />
      <SocialAuthButton provider="github" />
    </Box>
  ),
}
