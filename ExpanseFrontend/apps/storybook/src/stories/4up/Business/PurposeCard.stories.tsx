import type { Meta, StoryObj } from '@storybook/react';
import { PurposeCard } from '@4up-features/business';
import { defaultCompanyPurpose } from '@seed';

const meta = {
  title: '4up/Business/PurposeCard',
  component: PurposeCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays company mission, vision, and core values.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PurposeCard>;

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

export const WithExpandButton: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    purpose: defaultCompanyPurpose as any,
    loading: false,
    onExpand: () => alert('Expand clicked!'),
  },
};

export const MinimalPurpose: Story = {
  args: {
    purpose: {
      id: 'purpose-minimal',
      businessId: 'biz-demo-001',
      mission: 'Making marketing simple.',
      vision: 'A world where everyone can market like a pro.',
      coreThemes: [],
      values: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};
