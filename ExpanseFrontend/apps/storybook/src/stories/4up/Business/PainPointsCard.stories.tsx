import type { Meta, StoryObj } from '@storybook/react';
import { PainPointsCard } from '@4up-features/business';
import { painPoints } from '@seed';

const meta = {
  title: '4up/Business/PainPointsCard',
  component: PainPointsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays customer pain points with severity levels and content angles.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PainPointsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    painPoints: painPoints as any,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    painPoints: [],
    loading: true,
  },
};

export const SinglePainPoint: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    painPoints: [painPoints[0]] as any,
    loading: false,
  },
};

export const AllCritical: Story = {
  args: {
    painPoints: painPoints.map(p => ({
      ...p,
      severity: 'critical' as const,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })) as any,
    loading: false,
  },
};

export const Paginated: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    painPoints: painPoints as any,
    loading: false,
    itemsPerPage: 2,
  },
};
