import type { Meta, StoryObj } from '@storybook/react';
import { VoiceSpectrumCard } from '@4up-features/business';
import { defaultBrandVoice } from '@seed';

const meta = {
  title: '4up/Business/VoiceSpectrumCard',
  component: VoiceSpectrumCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Visual sliders showing brand voice attributes like formality, emoji usage, and CTA style.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VoiceSpectrumCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    voice: defaultBrandVoice as any,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    voice: null,
    loading: true,
  },
};

export const Editable: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    voice: defaultBrandVoice as any,
    loading: false,
    editable: true,
  },
};

export const FormalSettings: Story = {
  args: {
    voice: {
      ...defaultBrandVoice,
      formality: 'very_formal' as const,
      tone: {
        ...defaultBrandVoice.tone,
        emojiUsage: 'none' as const,
        hashtagStyle: 'none' as const,
        ctaStyle: 'subtle' as const,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};
