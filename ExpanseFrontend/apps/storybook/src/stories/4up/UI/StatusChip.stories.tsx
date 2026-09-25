import type { Meta, StoryObj } from '@storybook/react';
import { StatusChip } from '@4up-ui/StatusChip';
import { Box } from '@mui/material';

const meta: Meta<typeof StatusChip> = {
  title: '4up/UI/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['draft', 'active', 'scheduled', 'posted', 'archived', 'paused', 'pending', 'approved', 'rejected'],
    },
    showDot: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Draft: Story = {
  args: {
    status: 'draft',
  },
};

export const Active: Story = {
  args: {
    status: 'active',
  },
};

export const Scheduled: Story = {
  args: {
    status: 'scheduled',
  },
};

export const Posted: Story = {
  args: {
    status: 'posted',
  },
};

export const Archived: Story = {
  args: {
    status: 'archived',
  },
};

export const Paused: Story = {
  args: {
    status: 'paused',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Approved: Story = {
  args: {
    status: 'approved',
  },
};

export const Rejected: Story = {
  args: {
    status: 'rejected',
  },
};

export const WithDot: Story = {
  args: {
    status: 'active',
    showDot: true,
  },
};

export const AllStatuses: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <StatusChip status="draft" />
        <StatusChip status="active" />
        <StatusChip status="scheduled" />
        <StatusChip status="posted" />
        <StatusChip status="archived" />
        <StatusChip status="paused" />
        <StatusChip status="pending" />
        <StatusChip status="approved" />
        <StatusChip status="rejected" />
      </Box>
    ),
  ],
};
