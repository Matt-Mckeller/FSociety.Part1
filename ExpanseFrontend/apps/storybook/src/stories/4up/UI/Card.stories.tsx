import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@4up-ui/Card';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Business, Person, Settings } from '@mui/icons-material';

const meta: Meta<typeof Card> = {
  title: '4up/UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    loading: {
      control: 'boolean',
    },
    noPadding: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: '4up/Card Title',
    subtitle: '4up/A helpful description of this card',
    children: (
      <Typography>
        This is the card content. You can put any React components here.
      </Typography>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: '4up/Business Profile',
    subtitle: '4up/Company information and settings',
    icon: <Business />,
    children: (
      <Typography>
        Card with an icon in the header for better visual identification.
      </Typography>
    ),
  },
};

export const WithAction: Story = {
  args: {
    title: '4up/Team Members',
    subtitle: '4up/5 active members',
    icon: <Person />,
    onMoreClick: () => alert('More clicked!'),
    children: (
      <List dense>
        <ListItem><ListItemText primary="John Doe" secondary="Admin" /></ListItem>
        <ListItem><ListItemText primary="Jane Smith" secondary="Editor" /></ListItem>
        <ListItem><ListItemText primary="Bob Wilson" secondary="Viewer" /></ListItem>
      </List>
    ),
  },
};

export const Outlined: Story = {
  args: {
    title: '4up/Outlined Card',
    subtitle: '4up/With outlined variant',
    icon: <Settings />,
    variant: 'outlined',
    children: (
      <Typography>
        This card uses the outlined variant for a more subtle appearance.
      </Typography>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: '4up/Elevated Card',
    subtitle: '4up/With elevated variant',
    icon: <Settings />,
    variant: 'elevated',
    children: (
      <Typography>
        This card uses the elevated variant with more prominent shadow.
      </Typography>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: '4up/Loading Card',
    subtitle: '4up/Data is being fetched',
    loading: true,
    children: (
      <Typography>This content won't be visible while loading.</Typography>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    title: '4up/No Padding',
    subtitle: '4up/Content goes edge to edge',
    noPadding: true,
    children: (
      <Box sx={{ bgcolor: 'grey.100', p: 2 }}>
        <Typography>
          This card has no padding, useful for tables or full-width content.
        </Typography>
      </Box>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: '4up/Card with Footer',
    subtitle: '4up/Actions at the bottom',
    children: (
      <Typography>
        Main content area of the card.
      </Typography>
    ),
    footer: (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Typography variant="caption" color="text.secondary">
          Last updated: 2 hours ago
        </Typography>
      </Box>
    ),
  },
};
