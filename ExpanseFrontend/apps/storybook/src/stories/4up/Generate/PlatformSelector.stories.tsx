import type { Meta, StoryObj } from '@storybook/react';
import { PlatformSelector } from '@4up-features/generate';

// Note: This component uses usePlatformsStore internally to get connected platforms.
// For full functionality in Storybook, the store needs to be pre-populated.

const meta = {
  title: '4up/Generate/PlatformSelector',
  component: PlatformSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Multi-select interface for choosing target platforms for content generation. Shows connected platforms with their posting schedules. Note: Uses Zustand store internally for platform data.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlatformSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoneSelected: Story = {
  args: {
    selectedPlatforms: [],
    onChange: (platforms) => console.log('Selected platforms:', platforms),
  },
  parameters: {
    docs: {
      description: {
        story: 'No platforms selected. Connected platforms from store will be displayed.',
      },
    },
  },
};

export const LinkedInSelected: Story = {
  args: {
    selectedPlatforms: ['linkedin'],
    onChange: (platforms) => console.log('Selected platforms:', platforms),
  },
};

export const TwitterSelected: Story = {
  args: {
    selectedPlatforms: ['twitter'],
    onChange: (platforms) => console.log('Selected platforms:', platforms),
  },
};

export const MultiplePlatforms: Story = {
  args: {
    selectedPlatforms: ['linkedin', 'twitter', 'instagram'],
    onChange: (platforms) => console.log('Selected platforms:', platforms),
  },
};

export const AllPlatformsSelected: Story = {
  args: {
    selectedPlatforms: ['linkedin', 'twitter', 'instagram', 'facebook'],
    onChange: (platforms) => console.log('Selected platforms:', platforms),
  },
  parameters: {
    docs: {
      description: {
        story: 'All available platforms selected.',
      },
    },
  },
};
