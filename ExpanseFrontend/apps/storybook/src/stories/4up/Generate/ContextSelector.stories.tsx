import type { Meta, StoryObj } from '@storybook/react';
import { ContextSelector } from '@4up-features/generate';

// Note: This component uses multiple Zustand stores internally:
// - useAudienceStore (for personas)
// - useProductsStore (for products)
// - useMarketingStore (for campaigns and pillars)
// For full functionality in Storybook, these stores need to be pre-populated.

const meta = {
  title: '4up/Generate/ContextSelector',
  component: ContextSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Allows users to select context for content generation including target persona, product, campaign, and custom context. Note: Uses Zustand stores internally for data.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    context: {},
    onChange: (ctx) => console.log('Context changed:', ctx),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty context selector. Without store data, options will be limited.',
      },
    },
  },
};

export const WithPersonaSelected: Story = {
  args: {
    context: {
      personaId: 'persona-marcus-001',
    },
    onChange: (ctx) => console.log('Context changed:', ctx),
  },
};

export const WithProductSelected: Story = {
  args: {
    context: {
      productId: 'product-pro-001',
    },
    onChange: (ctx) => console.log('Context changed:', ctx),
  },
};

export const WithCampaignSelected: Story = {
  args: {
    context: {
      campaignId: 'campaign-001',
    },
    onChange: (ctx) => console.log('Context changed:', ctx),
  },
};

export const WithCustomContext: Story = {
  args: {
    context: {
      customContext: 'Launching a new feature for Q4. Focus on ROI and time savings for marketing teams.',
    },
    onChange: (ctx) => console.log('Context changed:', ctx),
  },
};

export const FullContext: Story = {
  args: {
    context: {
      personaId: 'persona-marcus-001',
      productId: 'product-pro-001',
      campaignId: 'campaign-001',
      pillarId: 'pillar-001',
      customContext: 'Highlight the new AI features',
    },
    onChange: (ctx) => console.log('Context changed:', ctx),
  },
  parameters: {
    docs: {
      description: {
        story: 'Full context with all options selected.',
      },
    },
  },
};
