import type { Meta, StoryObj } from '@storybook/react';
import { CreateScreen } from './CreateScreen';

const meta: Meta<typeof CreateScreen> = {
  title: 'Screens/CreateScreen',
  component: CreateScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CreateScreen>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onGenerate: (config) => console.log('Generate:', config),
  },
};

export const WithoutBackButton: Story = {
  args: {
    onGenerate: (config) => console.log('Generate:', config),
  },
};
