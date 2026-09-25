import type { Meta, StoryObj } from '@storybook/react';
import { GenerationResults } from '@4up-features/generate';

// Note: This component uses Zustand stores internally:
// - useGenerationStore (for content variations and actions)
// - usePlatformsStore (for platform display info)
// Without populated stores, the component will show empty state.

const meta = {
  title: '4up/Generate/GenerationResults',
  component: GenerationResults,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays generated content variations with options to edit, copy, save, and schedule. Includes platform-specific tabs and feedback controls. Note: Uses Zustand store internally for generated content.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenerationResults>;

export default meta;
type Story = StoryObj<typeof meta>;

// This component has no props - it reads everything from the store
// We can only show the default (empty) state without mocking the store

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default state. Without store mock, shows empty or loading state. In the full app, this would display AI-generated content variations with edit, copy, save, and schedule options.',
      },
    },
  },
};

/**
 * To see this component with content, the generationStore needs to contain:
 * 
 * {
 *   currentVariations: [
 *     {
 *       id: 'var-1',
 *       platform: 'linkedin',
 *       content: 'Your AI-generated content here...',
 *       metadata: { hashtags: ['#marketing'], engagement_score: 0.85 }
 *     },
 *     // ... more variations
 *   ],
 *   selectedVariationId: 'var-1',
 *   isGenerating: false,
 * }
 * 
 * Consider adding store decorators for full Storybook functionality.
 */
