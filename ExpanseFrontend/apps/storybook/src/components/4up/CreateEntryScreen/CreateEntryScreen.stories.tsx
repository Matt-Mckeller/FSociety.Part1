import type { Meta, StoryObj } from '@storybook/react';
import { CreateEntryScreen } from './CreateEntryScreen';

const meta: Meta<typeof CreateEntryScreen> = {
  title: 'Screens/CreateEntryScreen',
  component: CreateEntryScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CreateEntryScreen>;

/**
 * Create Content Entry Screen
 * 
 * The entry point for content creation with 4 options:
 * 
 * 1. **Preset Prompts** - Pre-configured templates with goals, audiences, 
 *    and data sources. One-click generation with AI recommendations.
 * 
 * 2. **AI Guided Manual Entry** - Write your own content with real-time 
 *    AI feedback on goal alignment and audience fit.
 * 
 * 3. **Full Manual Entry** - Complete creative freedom without AI 
 *    assistance or preset configurations.
 * 
 * 4. **Auto Scheduled** - Automated content generation based on 
 *    preferences (Beta).
 */
export const Default: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSelectOption: (id) => console.log('Selected option:', id),
  },
};

/**
 * Without back button - for when this is the first screen
 */
export const WithoutBackButton: Story = {
  args: {
    onSelectOption: (id) => console.log('Selected option:', id),
  },
};
