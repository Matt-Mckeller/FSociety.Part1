import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ScoreIndicator } from '../components';
import { lightColors } from '../constants';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>{children}</Box>
  </Box>
);

const meta: Meta<typeof ScoreIndicator> = {
  title: 'Screens/AIGuidedEditorV6/Components/ScoreIndicator',
  component: ScoreIndicator,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
  argTypes: {
    score: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    showLabel: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    score: 82,
    label: 'Overall Score',
    size: 'medium',
    showLabel: true,
  },
};

export const Large: Story = {
  args: {
    score: 95,
    label: 'Excellent',
    size: 'large',
    showLabel: true,
  },
};

export const Small: Story = {
  args: {
    score: 65,
    label: 'Average',
    size: 'small',
    showLabel: true,
  },
};

export const NoLabel: Story = {
  args: {
    score: 78,
    size: 'medium',
    showLabel: false,
  },
};

export const AllVariants = () => (
  <ComponentWrapper>
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end' }}>
      <ScoreIndicator score={95} label="Excellent" size="large" />
      <ScoreIndicator score={78} label="Good" size="medium" />
      <ScoreIndicator score={55} label="Average" size="small" />
      <ScoreIndicator score={35} label="Needs Work" size="small" showLabel={false} />
    </Box>
  </ComponentWrapper>
);
