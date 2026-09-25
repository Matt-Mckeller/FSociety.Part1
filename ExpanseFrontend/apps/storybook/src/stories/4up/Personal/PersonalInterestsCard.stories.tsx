import type { Meta, StoryObj } from '@storybook/react';
import { PersonalInterestsCard } from '@4up-features/personal';
import { defaultPersonalProfile } from '@seed';

const meta = {
  title: '4up/Personal/PersonalInterestsCard',
  component: PersonalInterestsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays personal interests and favorite topics.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInterestsCard>;

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

export const Empty: Story = {
  args: {
    profile: {
      id: 'personal-empty',
      name: 'John Doe',
      personalGoals: [],
      interests: [],
      favoriteTopics: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};

export const OnlyInterests: Story = {
  args: {
    profile: {
      ...defaultPersonalProfile,
      favoriteTopics: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};

export const ManyTopics: Story = {
  args: {
    profile: {
      ...defaultPersonalProfile,
      interests: ['AI/ML', 'Marketing', 'Startups', 'Leadership', 'Product', 'Design', 'Psychology', 'Economics'],
      favoriteTopics: ['Content Marketing', 'Brand Building', 'AI Tools', 'Founder Stories', 'Growth Hacking', 'SEO', 'Analytics'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};
