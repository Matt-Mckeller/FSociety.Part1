import type { Meta, StoryObj } from '@storybook/react';
import { ModelConfigCard } from '@4up-features/ai-studio';
import { modelConfigs } from '@seed';

const meta = {
  title: '4up/AI Studio/ModelConfigCard',
  component: ModelConfigCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays an AI model configuration with settings like temperature, max tokens, and provider-specific options.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModelConfigCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// GPT-4 (default model)
export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: modelConfigs[0] as any,
    onToggleEnabled: (id, enabled) => console.log('Toggle:', id, enabled),
    onSetDefault: (id) => console.log('Set default:', id),
    onUpdateSettings: (id, settings) => console.log('Update settings:', id, settings),
    showSettings: false,
  },
};

// Claude model
export const ClaudeModel: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: modelConfigs[1] as any,
    onToggleEnabled: (id, enabled) => console.log('Toggle:', id, enabled),
    onSetDefault: (id) => console.log('Set default:', id),
    showSettings: false,
  },
};

// Google Gemini (disabled)
export const DisabledModel: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: modelConfigs[3] as any,
    onToggleEnabled: (id, enabled) => console.log('Toggle:', id, enabled),
    onSetDefault: (id) => console.log('Set default:', id),
    showSettings: false,
  },
};

// With settings panel expanded
export const WithSettings: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: modelConfigs[0] as any,
    onToggleEnabled: (id, enabled) => console.log('Toggle:', id, enabled),
    onSetDefault: (id) => console.log('Set default:', id),
    onUpdateSettings: (id, settings) => console.log('Update settings:', id, settings),
    showSettings: true,
  },
};

// High temperature model
export const HighTemperature: Story = {
  args: {
    config: {
      ...modelConfigs[2],
      settings: {
        ...modelConfigs[2].settings,
        temperature: 0.95,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    showSettings: true,
  },
};
