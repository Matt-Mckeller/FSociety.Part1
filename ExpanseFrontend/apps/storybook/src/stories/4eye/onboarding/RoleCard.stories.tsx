import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RoleCard, ROLE_CONFIGS } from 'expanse.ui/auth'
import { Box, Stack } from '@mui/material'

const meta: Meta<typeof RoleCard> = {
  title: '4eye/Onboarding/RoleCard',
  component: RoleCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Individual role selection card displaying role info, features, and selection state. Supports disabled and coming soon states.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the role is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof RoleCard>

const studentRole = ROLE_CONFIGS.find((r) => r.id === 'student')!
const teacherRole = ROLE_CONFIGS.find((r) => r.id === 'professional_teacher')!
const learnerRole = ROLE_CONFIGS.find((r) => r.id === 'independent_learner')!
const parentRole = ROLE_CONFIGS.find((r) => r.id === 'parent_guardian')!
const adminRole = ROLE_CONFIGS.find((r) => r.id === 'school_administrator')!

export const Student: Story = {
  args: {
    role: studentRole,
    selected: false,
  },
}

export const StudentSelected: Story = {
  args: {
    role: studentRole,
    selected: true,
  },
}

export const Teacher: Story = {
  args: {
    role: teacherRole,
    selected: false,
  },
}

export const TeacherSelected: Story = {
  args: {
    role: teacherRole,
    selected: true,
  },
}

export const IndependentLearner: Story = {
  args: {
    role: learnerRole,
    selected: false,
  },
}

export const ParentGuardian: Story = {
  args: {
    role: parentRole,
    selected: false,
  },
}

export const SchoolAdministrator: Story = {
  args: {
    role: adminRole,
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'School Administrator role is disabled with a "Coming Soon" badge.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    role: studentRole,
    disabled: true,
  },
}

export const AllRoles: Story = {
  render: () => (
    <Stack spacing={2}>
      {ROLE_CONFIGS.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </Stack>
  ),
  decorators: [
    (Story) => (
      <Box sx={{ width: 450 }}>
        <Story />
      </Box>
    ),
  ],
}

export const MultipleSelected: Story = {
  render: () => (
    <Stack spacing={2}>
      <RoleCard role={studentRole} selected />
      <RoleCard role={teacherRole} selected />
      <RoleCard role={learnerRole} />
      <RoleCard role={parentRole} />
      <RoleCard role={adminRole} />
    </Stack>
  ),
  decorators: [
    (Story) => (
      <Box sx={{ width: 450 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Users can select multiple roles. Here Student and Professional Teacher are both selected.',
      },
    },
  },
}
