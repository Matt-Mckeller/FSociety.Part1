import type { Meta, StoryObj } from '@storybook/react';
import LogosCard from '@4up-features/business/LogosCard';
import { mockLogos } from '../../../mocks/4up/businessMockData';

const meta = {
  title: '4up/Business/LogosCard',
  component: LogosCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays logo variants with format info, use case filtering, and preview.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogosCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logos: mockLogos as any,
  },
};

export const SingleLogo: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logos: [mockLogos[0]] as any,
  },
};

export const ManyLogos: Story = {
  args: {
    logos: [
      ...mockLogos,
      {
        id: 'logo-005',
        businessId: 'biz-demo-001',
        name: 'Email Signature',
        format: 'png' as const,
        background: 'light' as const,
        useCase: 'email' as const,
        isPrimary: false,
        width: 150,
        height: 50,
      },
      {
        id: 'logo-006',
        businessId: 'biz-demo-001',
        name: 'Print Logo',
        format: 'svg' as const,
        background: 'light' as const,
        useCase: 'print' as const,
        isPrimary: false,
        width: 300,
        height: 100,
      },
      {
        id: 'logo-007',
        businessId: 'biz-demo-001',
        name: 'Watermark',
        format: 'png' as const,
        background: 'light' as const,
        useCase: 'watermark' as const,
        isPrimary: false,
        width: 100,
        height: 100,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};

export const DarkModeLogos: Story = {
  args: {
    logos: [
      {
        id: 'logo-dark-001',
        businessId: 'biz-demo-001',
        name: 'Primary Dark',
        format: 'svg' as const,
        background: 'dark' as const,
        useCase: 'all' as const,
        isPrimary: true,
        width: 200,
        height: 60,
      },
      {
        id: 'logo-dark-002',
        businessId: 'biz-demo-001',
        name: 'Icon Dark',
        format: 'svg' as const,
        background: 'dark' as const,
        useCase: 'social' as const,
        isPrimary: false,
        width: 100,
        height: 100,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
};
