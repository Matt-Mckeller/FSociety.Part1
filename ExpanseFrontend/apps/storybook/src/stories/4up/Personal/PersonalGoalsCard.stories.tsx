import type { Meta, StoryObj } from '@storybook/react';
import { PersonalGoalsCard } from '@4up-features/personal';
import { defaultPersonalProfile } from '@seed';

const meta = {
  title: '4up/Personal/PersonalGoalsCard',
  component: PersonalGoalsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays personal goals with categories, weights, and pagination.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalGoalsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: defaultPersonalProfile as any,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    profile: null,
    loading: true,
  },
};

export const SingleGoal: Story = {
  args: {
    profile: {
      ...defaultPersonalProfile,
      personalGoals: [defaultPersonalProfile.personalGoals[0]],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};

export const ManyGoals: Story = {
  args: {
    profile: {
      ...defaultPersonalProfile,
      personalGoals: [
        ...defaultPersonalProfile.personalGoals,
        { goal: 'Write a book on marketing', category: 'professional' as const, weight: 5, description: 'Share accumulated knowledge' },
        { goal: 'Run a marathon', category: 'personal' as const, weight: 4, description: 'Physical fitness goal' },
        { goal: 'Learn a new language', category: 'personal' as const, weight: 3, description: 'Expand communication abilities' },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
    itemsPerPage: 3,
  },
};

export const AllCategories: Story = {
  args: {
    profile: {
      ...defaultPersonalProfile,
      personalGoals: [
        { goal: 'Become a keynote speaker', category: 'communication' as const, weight: 10, description: 'Speaking at major conferences' },
        { goal: 'Get promoted to VP', category: 'professional' as const, weight: 9, description: 'Career advancement' },
        { goal: 'Meditate daily', category: 'personal' as const, weight: 7, description: 'Mental wellness' },
        { goal: 'Build industry network', category: 'relationships' as const, weight: 8, description: 'Connect with leaders' },
        { goal: 'Grow podcast audience', category: 'influence' as const, weight: 8, description: 'Expand reach' },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};
