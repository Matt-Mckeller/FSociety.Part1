import type { Meta, StoryObj } from '@storybook/react';
import { PromptEditor } from '@4up-features/ai-studio';
import { promptTemplates } from '@seed';

const meta = {
  title: '4up/AI Studio/PromptEditor',
  component: PromptEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Full-featured editor for creating and modifying prompt templates, including variable management.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PromptEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// Creating a new template
export const NewTemplate: Story = {
  args: {
    template: null,
    onSave: (template) => console.log('Save:', template),
    onCancel: () => console.log('Cancel'),
  },
};

// Editing existing LinkedIn template
export const EditLinkedInTemplate: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[0] as any,
    onSave: (template) => console.log('Save:', template),
    onCancel: () => console.log('Cancel'),
  },
};

// Editing Twitter thread template
export const EditTwitterTemplate: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[1] as any,
    onSave: (template) => console.log('Save:', template),
    onCancel: () => console.log('Cancel'),
  },
};

// Editing product announcement template
export const EditProductTemplate: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[2] as any,
    onSave: (template) => console.log('Save:', template),
    onCancel: () => console.log('Cancel'),
  },
};
