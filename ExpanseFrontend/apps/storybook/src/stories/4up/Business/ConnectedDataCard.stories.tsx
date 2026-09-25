import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedDataCard } from '@4up-features/business';

const meta = {
  title: '4up/Business/ConnectedDataCard',
  component: ConnectedDataCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays links to connected data sources like products, audiences, platforms, and content pillars.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectedDataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
