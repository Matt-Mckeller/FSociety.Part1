import type { Meta, StoryObj } from '@storybook/react';
import DesignSystemCard from '@4up-features/business/DesignSystemCard';
import { designSystems } from '@seed';

const mockDesignSystem = designSystems[0];

const meta = {
  title: '4up/Business/DesignSystemCard',
  component: DesignSystemCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays design system elements including taste preferences, symbols, and visual concepts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DesignSystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    designSystem: mockDesignSystem as any,
  },
};

export const WithDetailedSymbols: Story = {
  args: {
    designSystem: {
      ...mockDesignSystem,
      symbolsDetailed: [
        {
          name: 'Rocket',
          shapeType: 'icon',
          priority: 1,
          primaryUse: 'Launch, growth, and progress metaphors',
          variations: ['Simple outline', 'Filled', 'With smoke trail', 'With stars'],
          usageTags: [{ type: 'hero' }, { type: 'accent' }, { type: 'celebration' }],
          notes: 'Use sparingly for maximum impact',
        },
        {
          name: 'Chart',
          shapeType: 'icon',
          priority: 2,
          primaryUse: 'Success metrics and analytics',
          variations: ['Line chart', 'Bar chart', 'Pie chart'],
          usageTags: [{ type: 'data' }, { type: 'success' }],
        },
        {
          name: 'Lightning',
          shapeType: 'icon',
          priority: 2,
          primaryUse: 'Speed, power, and instant results',
          variations: ['Single bolt', 'Double bolt'],
          usageTags: [{ type: 'speed' }, { type: 'power' }],
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  },
};

export const MinimalDesignSystem: Story = {
  args: {
    designSystem: {
      id: 'design-minimal',
      businessId: 'biz-demo-001',
      tastePreferences: ['Clean', 'Modern'],
      symbols: ['Logo', 'Icon'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  },
};
