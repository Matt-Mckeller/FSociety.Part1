import type { Meta, StoryObj } from '@storybook/react';
import StoriesCard from '@4up-features/business/StoriesCard';
import { mockStories } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/StoriesCard',
  component: StoriesCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays business stories including origin, customer success, and product stories.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoriesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stories: mockStories as any,
  },
};

export const SingleStory: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stories: [mockStories[0]] as any,
  },
};

export const ManyStories: Story = {
  args: {
    stories: [
      ...mockStories,
      {
        id: 'story-004',
        businessId: 'biz-demo-001',
        title: '4up/Our Team Culture',
        type: 'team' as const,
        narrative: 'We believe in remote-first work, async communication, and deep focus time.',
        message: 'Great teams build great products',
        weight: 7,
        purpose: 'connect' as const,
        intent: 'emotion' as const,
        usageContext: 'website' as const,
        emotionalTone: 'authentic' as const,
        isPublic: true,
      },
      {
        id: 'story-005',
        businessId: 'biz-demo-001',
        title: '4up/First Million Users',
        type: 'milestone' as const,
        narrative: 'When we hit our first million users, we celebrated with a virtual party.',
        message: 'Milestones matter',
        weight: 8,
        purpose: 'inspire' as const,
        intent: 'memory' as const,
        usageContext: 'social' as const,
        emotionalTone: 'triumphant' as const,
        isPublic: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};

export const CustomerSuccessOnly: Story = {
  args: {
    stories: [
      {
        id: 'story-cs-001',
        businessId: 'biz-demo-001',
        title: '4up/Acme Corp 10x Growth',
        type: 'customer_success' as const,
        narrative: 'Acme Corp went from 100 to 1000 social followers in just 3 months.',
        message: 'Real results from real businesses',
        weight: 10,
        purpose: 'sell' as const,
        intent: 'action' as const,
        usageContext: 'sales' as const,
        emotionalTone: 'triumphant' as const,
        isPublic: true,
      },
      {
        id: 'story-cs-002',
        businessId: 'biz-demo-001',
        title: '4up/StartupXYZ Launch Success',
        type: 'customer_success' as const,
        narrative: 'StartupXYZ used our platform to launch their product and got 50k impressions on day one.',
        message: 'Launch with confidence',
        weight: 9,
        purpose: 'sell' as const,
        intent: 'action' as const,
        usageContext: 'sales' as const,
        emotionalTone: 'triumphant' as const,
        isPublic: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};
