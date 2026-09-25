import type { Meta, StoryObj } from '@storybook/react';
import UrlsCard from '@4up-features/business/UrlsCard';
import { mockUrls } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/UrlsCard',
  component: UrlsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays business URLs including website, social profiles, and resources.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UrlsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    urls: mockUrls as any,
  },
};

export const SingleUrl: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    urls: [mockUrls[0]] as any,
  },
};

export const ManyUrls: Story = {
  args: {
    urls: [
      ...mockUrls,
      {
        id: 'url-006',
        businessId: 'biz-demo-001',
        label: 'Blog',
        url: 'https://4up.io/blog',
        type: 'website' as const,
        isPrimary: false,
      },
      {
        id: 'url-007',
        businessId: 'biz-demo-001',
        label: 'YouTube',
        url: 'https://youtube.com/@4up',
        type: 'social' as const,
        isPrimary: false,
      },
      {
        id: 'url-008',
        businessId: 'biz-demo-001',
        label: 'TechCrunch Feature',
        url: 'https://techcrunch.com/4up-launch',
        type: 'backlink' as const,
        isPrimary: false,
      },
      {
        id: 'url-009',
        businessId: 'biz-demo-001',
        label: 'API Documentation',
        url: 'https://4up.io/docs/api',
        type: 'resource' as const,
        isPrimary: false,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};

export const SocialOnly: Story = {
  args: {
    urls: [
      {
        id: 'social-001',
        businessId: 'biz-demo-001',
        label: 'LinkedIn',
        url: 'https://linkedin.com/company/4up',
        type: 'social' as const,
        isPrimary: true,
      },
      {
        id: 'social-002',
        businessId: 'biz-demo-001',
        label: 'Twitter/X',
        url: 'https://twitter.com/4up_io',
        type: 'social' as const,
        isPrimary: false,
      },
      {
        id: 'social-003',
        businessId: 'biz-demo-001',
        label: 'Instagram',
        url: 'https://instagram.com/4up_io',
        type: 'social' as const,
        isPrimary: false,
      },
      {
        id: 'social-004',
        businessId: 'biz-demo-001',
        label: 'TikTok',
        url: 'https://tiktok.com/@4up_io',
        type: 'social' as const,
        isPrimary: false,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};
