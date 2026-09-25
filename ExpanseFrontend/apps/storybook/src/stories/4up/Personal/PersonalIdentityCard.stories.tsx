import type { Meta, StoryObj } from '@storybook/react';
import { PersonalIdentityCard } from '@4up-features/personal';
import { defaultPersonalProfile } from '@seed';

const meta = {
  title: '4up/Personal/PersonalIdentityCard',
  component: PersonalIdentityCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays personal identity information including name, tagline, title, location, and traits.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalIdentityCard>;

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

export const MinimalProfile: Story = {
  args: {
    profile: {
      id: 'personal-minimal',
      name: 'Jane Smith',
      personalGoals: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};

export const FullProfile: Story = {
  args: {
    profile: {
      ...defaultPersonalProfile,
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/alexmorgan' },
        { platform: 'twitter', url: 'https://twitter.com/alexmorgan' },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};
