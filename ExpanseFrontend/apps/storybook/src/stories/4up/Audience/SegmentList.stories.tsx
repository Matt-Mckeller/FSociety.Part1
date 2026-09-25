import type { Meta, StoryObj } from '@storybook/react';
import { SegmentList } from '@4up-features/audience';
import { audienceSegments } from '@seed';

const meta = {
  title: '4up/Audience/SegmentList',
  component: SegmentList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays audience segments as selectable chips with priority indicators.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    segments: audienceSegments as any,
    selectedId: null,
    onSelect: (id: string) => console.log('Selected segment:', id),
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    segments: [],
    selectedId: null,
    onSelect: () => {},
    loading: true,
  },
};

export const WithSelection: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    segments: audienceSegments as any,
    selectedId: 'segment-smb-001',
    onSelect: (id: string) => console.log('Selected segment:', id),
    loading: false,
  },
};

export const SingleSegment: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    segments: [audienceSegments[0]] as any,
    selectedId: null,
    onSelect: (id: string) => console.log('Selected segment:', id),
    loading: false,
  },
};

export const AllPriorities: Story = {
  args: {
    segments: [
      { id: 'seg-1', businessId: 'biz-demo-001', name: 'Critical Priority', description: 'Highest priority segment', type: 'enterprise' as const, priority: 1 as const, estimatedSize: 5000 },
      { id: 'seg-2', businessId: 'biz-demo-001', name: 'High Priority', description: 'Second priority segment', type: 'smb' as const, priority: 2 as const, estimatedSize: 15000 },
      { id: 'seg-3', businessId: 'biz-demo-001', name: 'Medium Priority', description: 'Third priority segment', type: 'b2b' as const, priority: 3 as const, estimatedSize: 30000 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    selectedId: 'seg-2',
    onSelect: (id: string) => console.log('Selected segment:', id),
    loading: false,
  },
};

export const ManySegments: Story = {
  args: {
    segments: [
      ...audienceSegments,
      { id: 'seg-4', businessId: 'biz-demo-001', name: 'Enterprise Buyers', description: 'Large enterprise accounts', type: 'enterprise' as const, priority: 2 as const, estimatedSize: 2000 },
      { id: 'seg-5', businessId: 'biz-demo-001', name: 'Solopreneurs', description: 'Individual business owners', type: 'smb' as const, priority: 3 as const, estimatedSize: 100000 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    selectedId: null,
    onSelect: (id: string) => console.log('Selected segment:', id),
    loading: false,
  },
};
