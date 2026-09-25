import type { Meta, StoryObj } from '@storybook/react';
import { VocabularyCard } from '@4up-features/business';
import { defaultBrandVoice } from '@seed';

const meta = {
  title: '4up/Business/VocabularyCard',
  component: VocabularyCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays vocabulary guidelines including preferred phrases, avoid terms, and industry terms.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VocabularyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vocabulary: defaultBrandVoice.vocabulary as any,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    vocabulary: undefined,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    vocabulary: undefined,
    loading: false,
  },
};

export const OnlyPreferred: Story = {
  args: {
    vocabulary: {
      preferredPhrases: ['Let\'s build together', 'Level up your marketing', 'Supercharge growth'],
      avoidTerms: [],
      industryTerms: [],
      competitorTerms: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};

export const ManyTerms: Story = {
  args: {
    vocabulary: {
      preferredPhrases: ['Let\'s build', 'Level up', 'Supercharge', 'Automate', 'Grow faster', 'Scale smart'],
      avoidTerms: ['utilize', 'leverage', 'synergy', 'paradigm', 'scalable', 'disrupt', 'innovative'],
      industryTerms: ['AI', 'automation', 'content strategy', 'engagement', 'analytics', 'ROI', 'conversion'],
      competitorTerms: ['Hootsuite', 'Buffer', 'Sprout Social', 'HubSpot'],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    loading: false,
  },
};
