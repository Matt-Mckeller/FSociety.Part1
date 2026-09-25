import type { Meta, StoryObj } from '@storybook/react';
import { PlatformChip } from '@4up-ui/PlatformChip';
import { Box } from '@mui/material';

const meta: Meta<typeof PlatformChip> = {
  title: '4up/UI/PlatformChip',
  component: PlatformChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    platform: {
      control: 'select',
      options: ['linkedin', 'facebook', 'instagram', 'twitter'],
    },
    showLabel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlatformChip>;

export const LinkedIn: Story = {
  args: {
    platform: 'linkedin',
  },
};

export const Facebook: Story = {
  args: {
    platform: 'facebook',
  },
};

export const Instagram: Story = {
  args: {
    platform: 'instagram',
  },
};

export const Twitter: Story = {
  args: {
    platform: 'twitter',
  },
};

export const IconOnly: Story = {
  args: {
    platform: 'linkedin',
    showLabel: false,
  },
};

export const AllPlatforms: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <PlatformChip platform="linkedin" />
        <PlatformChip platform="facebook" />
        <PlatformChip platform="instagram" />
        <PlatformChip platform="twitter" />
      </Box>
    ),
  ],
};

export const IconsOnly: Story = {
  decorators: [
    () => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <PlatformChip platform="linkedin" showLabel={false} />
        <PlatformChip platform="facebook" showLabel={false} />
        <PlatformChip platform="instagram" showLabel={false} />
        <PlatformChip platform="twitter" showLabel={false} />
      </Box>
    ),
  ],
};
