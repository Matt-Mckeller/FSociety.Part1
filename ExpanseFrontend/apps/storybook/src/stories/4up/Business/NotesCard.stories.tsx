import type { Meta, StoryObj } from '@storybook/react';
import NotesCard from '@4up-features/business/NotesCard';
import { mockNotes } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/NotesCard',
  component: NotesCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays business notes with category filtering and content-usable toggle.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notes: mockNotes as any,
  },
};

export const SingleNote: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notes: [mockNotes[0]] as any,
  },
};

export const ManyNotes: Story = {
  args: {
    notes: [
      ...mockNotes,
      {
        id: 'note-004',
        businessId: 'biz-demo-001',
        title: '4up/New partnership opportunity',
        content: 'Reached out by potential integration partner. Follow up next week.',
        category: 'strategy' as const,
        priority: 6,
        status: 'active' as const,
        forContent: false,
        tags: ['partnership', 'growth'],
      },
      {
        id: 'note-005',
        businessId: 'biz-demo-001',
        title: '4up/Content idea: AI trends 2025',
        content: 'Write thought leadership piece on AI marketing trends for 2025.',
        category: 'insight' as const,
        priority: 8,
        status: 'active' as const,
        forContent: true,
        tags: ['content', 'thought-leadership'],
      },
      {
        id: 'note-006',
        businessId: 'biz-demo-001',
        title: '4up/Product roadmap update',
        content: 'Added video generation to Q2 roadmap based on customer demand.',
        category: 'product' as const,
        priority: 9,
        status: 'active' as const,
        forContent: false,
        tags: ['roadmap', 'video'],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};

export const ArchivedNotes: Story = {
  args: {
    notes: [
      {
        id: 'note-archived-001',
        businessId: 'biz-demo-001',
        title: '4up/Old strategy note',
        content: 'This strategy was superseded by new approach.',
        category: 'strategy' as const,
        priority: 5,
        status: 'archived' as const,
        forContent: false,
        tags: ['archived'],
      },
      {
        id: 'note-archived-002',
        businessId: 'biz-demo-001',
        title: '4up/Completed competitor analysis',
        content: 'Analysis completed and incorporated into product decisions.',
        category: 'competitor' as const,
        priority: 7,
        status: 'archived' as const,
        forContent: false,
        tags: ['completed', 'research'],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};
