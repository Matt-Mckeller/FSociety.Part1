import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TwoFactorSetup } from 'expanse.ui/auth'
import { Box, Button, Stack, Typography } from '@mui/material'

const meta: Meta<typeof TwoFactorSetup> = {
  title: '4eye/Onboarding/TwoFactorSetup',
  component: TwoFactorSetup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Email-based two-factor authentication setup. Users enter a 6-digit code sent to their email. Includes resend functionality and attempt limiting.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    email: {
      control: 'text',
      description: 'User email address (will be partially masked)',
    },
    codeSent: {
      control: 'boolean',
      description: 'Whether the verification code has been sent',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    maxAttempts: {
      control: 'number',
      description: 'Maximum verification attempts allowed',
    },
    error: {
      control: 'text',
      description: 'External error message',
    },
  },
}

export default meta
type Story = StoryObj<typeof TwoFactorSetup>

export const Default: Story = {
  args: {
    email: 'user@example.com',
    codeSent: true,
    onComplete: () => alert('2FA verification complete!'),
    onResendCode: () => alert('Code resent!'),
  },
}

export const ShortEmail: Story = {
  args: {
    email: 'ab@test.com',
    codeSent: true,
    onComplete: () => {},
  },
}

export const LongEmail: Story = {
  args: {
    email: 'verylongemailaddress@educational-institution.edu',
    codeSent: true,
    onComplete: () => {},
  },
}

export const Loading: Story = {
  args: {
    email: 'user@example.com',
    loading: true,
    onComplete: () => {},
  },
}

export const WithError: Story = {
  args: {
    email: 'user@example.com',
    codeSent: true,
    error: 'The code you entered is incorrect. Please try again.',
    onComplete: () => {},
  },
}

export const CompleteTwoFactorFlow: Story = {
  render: () => {
    const [step, setStep] = useState<'send' | 'verify' | 'complete'>('send')
    const [codeSent, setCodeSent] = useState(false)
    const email = 'student@school.edu'

    if (step === 'complete') {
      return (
        <Box textAlign="center" py={4}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            🎉 All Set!
          </Typography>
          <Typography color="text.secondary">
            Your account is now protected with 2FA.
          </Typography>
        </Box>
      )
    }

    if (step === 'send') {
      return (
        <Stack spacing={3} textAlign="center">
          <Typography variant="h5" fontWeight={600}>
            Secure Your Account
          </Typography>
          <Typography color="text.secondary">
            We'll send a verification code to your email to enable two-factor authentication.
          </Typography>
          <Typography fontWeight={500}>{email}</Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setCodeSent(true)
              setStep('verify')
            }}
            sx={{ height: 48, textTransform: 'none', fontWeight: 600 }}
          >
            Send Verification Code
          </Button>
        </Stack>
      )
    }

    return (
      <TwoFactorSetup
        email={email}
        codeSent={codeSent}
        onComplete={() => setStep('complete')}
        onResendCode={() => alert('New code sent!')}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete 2FA flow from code sending to verification.',
      },
    },
  },
}

export const MaxAttemptsReached: Story = {
  args: {
    email: 'user@example.com',
    codeSent: true,
    maxAttempts: 0,
    onComplete: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'State when user has exceeded maximum verification attempts.',
      },
    },
  },
}
