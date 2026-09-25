import type { Meta, StoryObj } from '@storybook/react';
import { DosDontsCard } from '@4up-features/business';
import { defaultBrandVoice } from '@seed';

const meta = {
  title: '4up/Business/DosDontsCard',
  component: DosDontsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays do\'s and don\'ts guidelines for content creation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DosDontsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dos: defaultBrandVoice.doExamples,
    donts: defaultBrandVoice.dontExamples,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    dos: [],
    donts: [],
    loading: true,
  },
};

export const Editable: Story = {
  args: {
    dos: defaultBrandVoice.doExamples,
    donts: defaultBrandVoice.dontExamples,
    loading: false,
    editable: true,
    onAddDo: () => alert('Add Do clicked!'),
    onAddDont: () => alert('Add Don\'t clicked!'),
  },
};

export const ManyItems: Story = {
  args: {
    dos: [
      'Use active voice',
      'Keep sentences short and punchy',
      'Include clear calls to action',
      'Use data to back up claims',
      'Address the reader directly',
      'Show empathy and understanding',
    ],
    donts: [
      'Don\'t use jargon or buzzwords',
      'Avoid passive voice',
      'Never make claims without proof',
      'Don\'t be condescending',
      'Avoid long-winded explanations',
      'Never ignore customer concerns',
    ],
    loading: false,
  },
};
