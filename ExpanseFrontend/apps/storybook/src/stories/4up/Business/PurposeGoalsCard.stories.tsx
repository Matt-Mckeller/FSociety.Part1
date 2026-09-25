import type { Meta, StoryObj } from '@storybook/react';
import { PurposeGoalsCard } from '@4up-features/business';
import { defaultCompanyPurpose } from '@seed';

const meta = {
  title: '4up/Business/PurposeGoalsCard',
  component: PurposeGoalsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays purpose-driven goals categorized by customer, industry, and product focus.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PurposeGoalsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    purpose: defaultCompanyPurpose as any,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    purpose: null,
    loading: true,
  },
};

export const ManyGoals: Story = {
  args: {
    purpose: {
      ...defaultCompanyPurpose,
      purposeGoals: [
        ...defaultCompanyPurpose.purposeGoals,
        { goal: 'Become a household name in marketing', category: 'industry' as const, weight: 7 },
        { goal: 'Launch mobile app', category: 'internal' as const, weight: 6 },
        { goal: 'Build partner ecosystem', category: 'customer' as const, weight: 5 },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
    itemsPerPage: 3,
  },
};
