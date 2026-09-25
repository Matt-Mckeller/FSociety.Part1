import type { Meta, StoryObj } from '@storybook/react';
import { PlatformGrid } from '@4up-features/platforms';
import { platformConfigs } from '@seed';

const meta = {
  title: '4up/Platforms/PlatformGrid',
  component: PlatformGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grid layout displaying connected social media platforms with status toggles and configuration options.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlatformGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platforms: platformConfigs as any,
    onPlatformClick: (id: string) => console.log('Platform clicked:', id),
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    platforms: [],
    onPlatformClick: () => {},
    loading: true,
  },
};

export const SinglePlatform: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platforms: [platformConfigs[0]] as any,
    onPlatformClick: (id: string) => console.log('Platform clicked:', id),
    loading: false,
  },
};

export const AllConnected: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platforms: platformConfigs.map((p) => ({ ...p, connected: true })) as any,
    onPlatformClick: (id: string) => console.log('Platform clicked:', id),
    loading: false,
  },
};

export const NoneConnected: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platforms: platformConfigs.map((p) => ({ ...p, connected: false })) as any,
    onPlatformClick: (id: string) => console.log('Platform clicked:', id),
    loading: false,
  },
};

export const MixedConnectionStatus: Story = {
  args: {
    platforms: [
      { ...platformConfigs[0], connected: true },
      { ...platformConfigs[1], connected: false },
      { ...platformConfigs[2], connected: true },
      { ...platformConfigs[3], connected: false },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    onPlatformClick: (id: string) => console.log('Platform clicked:', id),
    loading: false,
  },
};
