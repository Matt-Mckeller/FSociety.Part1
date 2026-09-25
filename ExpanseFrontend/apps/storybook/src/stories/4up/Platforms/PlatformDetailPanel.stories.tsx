import type { Meta, StoryObj } from '@storybook/react';
import { PlatformDetailPanel } from '@4up-features/platforms';
import { platformConfigs } from '@seed';

const meta = {
  title: '4up/Platforms/PlatformDetailPanel',
  component: PlatformDetailPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Detailed panel showing platform configuration, settings, and voice adjustments.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlatformDetailPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// LinkedIn platform
export const LinkedIn: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platform: platformConfigs[0] as any,
    onClose: () => console.log('Panel closed'),
  },
};

// Twitter platform
export const Twitter: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platform: platformConfigs[1] as any,
    onClose: () => console.log('Panel closed'),
  },
};

// Instagram platform
export const Instagram: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platform: platformConfigs[2] as any,
    onClose: () => console.log('Panel closed'),
  },
};

// Disconnected platform
export const Disconnected: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    platform: platformConfigs[3] as any,
    onClose: () => console.log('Panel closed'),
  },
};

// Platform with full voice adjustments
export const WithVoiceAdjustments: Story = {
  args: {
    platform: {
      ...platformConfigs[0],
      voiceAdjustments: {
        formalityShift: 2,
        emojiUsage: 'none' as const,
        hashtagStyle: 'minimal' as const,
        toneNotes: 'Keep it professional and polished for LinkedIn audience',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    onClose: () => console.log('Panel closed'),
  },
};
