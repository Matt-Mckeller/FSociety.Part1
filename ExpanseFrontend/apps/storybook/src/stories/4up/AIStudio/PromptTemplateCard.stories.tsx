import type { Meta, StoryObj } from '@storybook/react';
import { PromptTemplateCard } from '@4up-features/ai-studio';
import { promptTemplates } from '@seed';

const meta = {
  title: '4up/AI Studio/PromptTemplateCard',
  component: PromptTemplateCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card displaying a prompt template with category, variables, and action menu for edit, duplicate, test, and delete.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PromptTemplateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// LinkedIn template
export const Default: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[0] as any,
    isSelected: false,
    onSelect: (t) => console.log('Selected:', t.id),
    onEdit: (t) => console.log('Edit:', t.id),
    onDuplicate: (id) => console.log('Duplicate:', id),
    onTest: (t) => console.log('Test:', t.id),
    onDelete: (id) => console.log('Delete:', id),
  },
};

// Selected state
export const Selected: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[0] as any,
    isSelected: true,
    onSelect: (t) => console.log('Selected:', t.id),
    onEdit: (t) => console.log('Edit:', t.id),
  },
};

// Twitter template
export const TwitterTemplate: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[1] as any,
    isSelected: false,
    onSelect: (t) => console.log('Selected:', t.id),
  },
};

// Product template
export const ProductTemplate: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template: promptTemplates[2] as any,
    isSelected: false,
    onSelect: (t) => console.log('Selected:', t.id),
  },
};

// Inactive template
export const InactiveTemplate: Story = {
  args: {
    template: {
      ...promptTemplates[0],
      isActive: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    isSelected: false,
    onSelect: (t) => console.log('Selected:', t.id),
  },
};
