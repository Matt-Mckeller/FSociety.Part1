import type { Meta, StoryObj } from '@storybook/react';
import { PromptTester } from '@4up-features/ai-studio';
import { promptTemplates, modelConfigs } from '@seed';

const meta = {
  title: '4up/AI Studio/PromptTester',
  component: PromptTester,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive component for testing prompt templates with variable inputs and viewing AI-generated results.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PromptTester>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state - ready to test
export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[0] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    models: modelConfigs as any,
    onTest: async (templateId, variables) => {
      console.log('Testing:', templateId, variables);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 'Sample generated content would appear here...';
    },
    isLoading: false,
    result: null,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[0] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    models: modelConfigs as any,
    onTest: async () => '',
    isLoading: true,
    result: null,
  },
};

// With result displayed
export const WithResult: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[0] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    models: modelConfigs as any,
    onTest: async () => '',
    isLoading: false,
    result: `🚀 The future of marketing isn't about working harder—it's about working smarter.

After helping 500+ businesses automate their content creation, here's what I've learned:

1️⃣ AI doesn't replace creativity. It amplifies it.
2️⃣ The best content still needs a human touch.
3️⃣ Consistency beats perfection every time.

The companies seeing the biggest gains? They're using AI to handle the repetitive tasks so their teams can focus on strategy and storytelling.

What's holding you back from embracing AI in your marketing stack? 👇`,
    onClearResult: () => console.log('Clear result'),
  },
};

// Twitter thread template
export const TwitterThreadTest: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[1] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    models: modelConfigs as any,
    onTest: async () => '',
    isLoading: false,
    result: null,
  },
};

// Product announcement template
export const ProductAnnouncementTest: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[2] as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    models: modelConfigs as any,
    onTest: async () => '',
    isLoading: false,
    result: null,
  },
};
