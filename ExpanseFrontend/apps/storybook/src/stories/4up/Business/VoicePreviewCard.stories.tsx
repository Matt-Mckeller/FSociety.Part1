import type { Meta, StoryObj } from '@storybook/react';
import { VoicePreviewCard } from '@4up-features/business';
// Use real seed data from the 4up app
import { defaultBrandVoice } from '@seed';

const meta = {
  title: '4up/Business/VoicePreviewCard',
  component: VoicePreviewCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Preview of brand voice settings including tone, formality, and personality traits.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VoicePreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    voice: defaultBrandVoice,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    voice: null,
    loading: true,
  },
};

export const FormalVoice: Story = {
  args: {
    voice: {
      ...defaultBrandVoice,
      formality: 'formal' as const,
      tone: {
        ...defaultBrandVoice.tone,
        primaryTone: 'professional',
        emojiUsage: 'none' as const,
      },
    },
    loading: false,
  },
};

export const PlayfulVoice: Story = {
  args: {
    voice: {
      ...defaultBrandVoice,
      formality: 'very_casual' as const,
      tone: {
        ...defaultBrandVoice.tone,
        primaryTone: 'playful',
        emojiUsage: 'frequent' as const,
      },
      personality: {
        ...defaultBrandVoice.personality,
        traits: ['fun', 'energetic', 'bold', 'quirky'],
      },
    },
    loading: false,
  },
};
