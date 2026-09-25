import type { Meta, StoryObj } from '@storybook/react';
import ResearchCard from '@4up-features/business/ResearchCard';
import { mockStatistics } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/ResearchCard',
  component: ResearchCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays research statistics, market data, and SEO keywords with category filtering.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResearchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    statistics: mockStatistics as any,
  },
};

export const SingleStatistic: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    statistics: [mockStatistics[0]] as any,
  },
};

export const ManyStatistics: Story = {
  args: {
    statistics: [
      ...mockStatistics,
      {
        id: 'stat-005',
        businessId: 'biz-demo-001',
        title: '4up/SMB Marketing Budget',
        value: '$10k-50k/mo',
        category: 'user_behavior' as const,
        source: 'Industry Survey',
        confidence: 'estimated' as const,
        contentRelevance: 7,
        usageContext: 'sales' as const,
      },
      {
        id: 'stat-006',
        businessId: 'biz-demo-001',
        title: '4up/Competitor Market Share',
        value: '23%',
        category: 'competitive' as const,
        source: 'Analyst Report',
        confidence: 'verified' as const,
        contentRelevance: 6,
        usageContext: 'all' as const,
      },
      {
        id: 'stat-007',
        businessId: 'biz-demo-001',
        title: '4up/content marketing tools',
        value: '8,100 searches/mo',
        category: 'seo_keyword' as const,
        source: 'Ahrefs',
        confidence: 'verified' as const,
        contentRelevance: 9,
        usageContext: 'website' as const,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};

export const SEOKeywordsOnly: Story = {
  args: {
    statistics: [
      {
        id: 'seo-001',
        businessId: 'biz-demo-001',
        title: '4up/AI marketing automation',
        value: '12,100 searches/mo',
        category: 'seo_keyword' as const,
        source: 'Ahrefs',
        confidence: 'verified' as const,
        contentRelevance: 10,
        usageContext: 'website' as const,
      },
      {
        id: 'seo-002',
        businessId: 'biz-demo-001',
        title: '4up/content marketing tools',
        value: '8,100 searches/mo',
        category: 'seo_keyword' as const,
        source: 'Ahrefs',
        confidence: 'verified' as const,
        contentRelevance: 9,
        usageContext: 'website' as const,
      },
      {
        id: 'seo-003',
        businessId: 'biz-demo-001',
        title: '4up/social media scheduler',
        value: '5,400 searches/mo',
        category: 'seo_keyword' as const,
        source: 'Ahrefs',
        confidence: 'verified' as const,
        contentRelevance: 8,
        usageContext: 'website' as const,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};
