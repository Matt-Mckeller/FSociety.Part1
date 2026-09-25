import type { Meta, StoryObj } from '@storybook/react';
import { BusinessIdentityCard } from '@4up-features/business';
// Use real seed data from the 4up app
import { defaultBusiness } from '@seed';

const meta = {
  title: '4up/Business/BusinessIdentityCard',
  component: BusinessIdentityCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays core business identity information including name, logo, tagline, industry, and key metadata.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BusinessIdentityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profile: defaultBusiness,
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
      ...defaultBusiness,
      tagline: undefined,
      website: undefined,
      companySize: undefined,
      stage: undefined,
    },
    loading: false,
  },
};
