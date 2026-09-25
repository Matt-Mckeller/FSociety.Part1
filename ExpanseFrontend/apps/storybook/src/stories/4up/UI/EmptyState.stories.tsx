import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '@4up-ui/EmptyState';
import { Inbox, Search, People, Add } from '@mui/icons-material';

const meta: Meta<typeof EmptyState> = {
  title: '4up/UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: '4up/No items yet',
    description: 'Get started by creating your first item.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Inbox />,
    title: '4up/Your inbox is empty',
    description: 'When you receive messages, they will appear here.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <People />,
    title: '4up/No team members',
    description: 'Add team members to collaborate on your content.',
    action: {
      label: 'Add Team Member',
      onClick: () => alert('Add clicked!'),
      icon: <Add />,
    },
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: <Search />,
    title: '4up/No results found',
    description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
  },
};

export const MinimalWithAction: Story = {
  args: {
    title: '4up/Create your first product',
    action: {
      label: 'Add Product',
      onClick: () => alert('Add product clicked!'),
    },
  },
};
