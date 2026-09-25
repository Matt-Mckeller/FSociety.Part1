import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '@4up-ui/PageHeader';
import { Box, Button } from '@mui/material';
import { Add, Settings, FilterList } from '@mui/icons-material';

const meta: Meta<typeof PageHeader> = {
  title: '4up/UI/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: '4up/Page Title',
    subtitle: '4up/A helpful description of this page',
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: '4up/Business Profile',
    subtitle: '4up/Manage your company information and brand settings',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Business' },
    ],
  },
};

export const WithDeepBreadcrumbs: Story = {
  args: {
    title: '4up/Edit Voice Settings',
    subtitle: '4up/Customize how your brand sounds',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Business', href: '/business' },
      { label: 'Voice', href: '/business/voice' },
      { label: 'Edit' },
    ],
  },
};

export const WithPrimaryAction: Story = {
  args: {
    title: '4up/Products',
    subtitle: '4up/Manage your product catalog',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Products' },
    ],
    action: {
      label: 'Add Product',
      onClick: () => alert('Add product clicked!'),
      icon: <Add />,
    },
  },
};

export const WithBothActions: Story = {
  args: {
    title: '4up/Team Members',
    subtitle: '4up/5 active members in your organization',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Team' },
    ],
    action: {
      label: 'Invite Member',
      onClick: () => alert('Invite clicked!'),
      icon: <Add />,
    },
    secondaryAction: {
      label: 'Settings',
      onClick: () => alert('Settings clicked!'),
      variant: 'outlined',
    },
  },
};

export const WithTextSecondaryAction: Story = {
  args: {
    title: '4up/Content Calendar',
    subtitle: '4up/Schedule and manage your posts',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Calendar' },
    ],
    action: {
      label: 'Create Post',
      onClick: () => alert('Create clicked!'),
    },
    secondaryAction: {
      label: 'Import',
      onClick: () => alert('Import clicked!'),
      variant: 'text',
    },
  },
};

export const WithChildrenSlot: Story = {
  args: {
    title: '4up/Content Library',
    subtitle: '4up/All your generated content',
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Content' },
    ],
    children: (
      <Button
        variant="outlined"
        size="small"
        startIcon={<FilterList />}
      >
        Filters
      </Button>
    ),
    action: {
      label: 'Generate',
      onClick: () => alert('Generate clicked!'),
    },
  },
};

export const MinimalTitle: Story = {
  args: {
    title: '4up/Dashboard',
  },
};

export const FullExample: Story = {
  decorators: [
    () => (
      <Box sx={{ bgcolor: 'background.default', p: 3 }}>
        <PageHeader
          title="Audience Personas"
          subtitle="Define and manage your target audience segments"
          breadcrumbs={[
            { label: 'Dashboard', href: '/' },
            { label: 'Audience', href: '/audience' },
            { label: 'Personas' },
          ]}
          action={{
            label: 'Create Persona',
            onClick: () => alert('Create clicked!'),
            icon: <Add />,
          }}
          secondaryAction={{
            label: 'Import',
            onClick: () => alert('Import clicked!'),
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<Settings />}
          >
            Configure
          </Button>
        </PageHeader>
        
        <Box sx={{ 
          bgcolor: 'grey.100', 
          p: 4, 
          borderRadius: 1, 
          textAlign: 'center',
          color: 'text.secondary',
        }}>
          Page content would go here
        </Box>
      </Box>
    ),
  ],
};
