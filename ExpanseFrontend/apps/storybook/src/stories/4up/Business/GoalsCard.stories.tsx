import type { Meta, StoryObj } from '@storybook/react';
import { GoalsCard } from '@4up-features/business';
// Use real seed data from the 4up app
import { defaultCompanyGoals } from '@seed';

const meta = {
  title: '4up/Business/GoalsCard',
  component: GoalsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays company goals including strategic, tactical, and content goals with priority badges.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GoalsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    goals: defaultCompanyGoals,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    goals: null,
    loading: true,
  },
};

export const WithExpandButton: Story = {
  args: {
    goals: defaultCompanyGoals,
    loading: false,
    onExpand: () => alert('Expand clicked!'),
  },
};

export const MinimalGoals: Story = {
  args: {
    goals: {
      ...defaultCompanyGoals,
      strategic: [defaultCompanyGoals.strategic[0]],
      contentGoals: [defaultCompanyGoals.contentGoals[0]],
    },
    loading: false,
  },
};
