import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FloatingToolbar } from './FloatingToolbar';
import { LayoutTypeSwitcher } from './LayoutTypeSwitcher';
import { MinimapToggle } from './MinimapToggle';
import { SettingsButton } from './SettingsButton';
import { LayoutConfigProvider } from '@expanse/shell/core/providers';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const meta: Meta<typeof FloatingToolbar> = {
  title: 'Layout Systems/HUD Components/Floating Controls',
  component: FloatingToolbar,
  tags: ['autodocs'],
  parameters: {
   layout: 'fullscreen',
    docs: {
      description: {
        component: `
Reusable floating toolbar container with glass-morphism effect.

Provides consistent styling for floating UI controls:
- Glass-morphism background
- Fixed positioning
- High z-index (1300)

Position options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Screen position',
    },
    zIndex: {
      control: 'number',
      description: 'Z-index value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingToolbar>;

export const IconButtons: Story = {
  args: {
    position: 'top-center',
    children: (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Grid view">
          <IconButton size="small" color="inherit">
            <GridViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="List view">
          <IconButton size="small" color="inherit">
            <ViewListIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Floating toolbar with icon buttons.',
      },
    },
  },
};

export const WithZoomControls: Story = {
  args: {
    position: 'bottom-right',
    children: (
      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
        <IconButton size="small" color="inherit">
          <ZoomOutIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption" sx={{ mx: 1, minWidth: 40, textAlign: 'center' }}>
          100%
        </Typography>
        <IconButton size="small" color="inherit">
          <ZoomInIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Zoom controls in bottom-right position.',
      },
    },
  },
};

export const WithToggleButtons: Story = {
  args: {
    position: 'top-left',
    children: (
      <ToggleButtonGroup size="small" exclusive value="grid">
        <ToggleButton value="grid">
          <GridViewIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="list">
          <ViewListIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle button group for view switching.',
      },
    },
  },
};

export const WithLayoutSwitcher: Story = {
  args: {
    position: 'top-center',
    children: <LayoutTypeSwitcher />,
  },
  decorators: [
    (Story) => (
      <LayoutConfigProvider>
        <Story />
      </LayoutConfigProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Built-in LayoutTypeSwitcher component.',
      },
    },
  },
};

export const WithMinimapToggle: Story = {
  args: {
    position: 'bottom-left',
    children: <MinimapToggle />,
  },
  decorators: [
    (Story) => (
      <LayoutConfigProvider>
        <Story />
      </LayoutConfigProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Built-in MinimapToggle component.',
      },
    },
  },
};

export const WithSettingsButton: Story = {
  args: {
    position: 'bottom-right',
    children: <SettingsButton />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Built-in SettingsButton component.',
      },
    },
  },
};

export const MultipleToolbars: Story = {
  render: () => (
    <LayoutConfigProvider>
      <Box sx={{ height: '100vh', position: 'relative', bgcolor: 'background.default' }}>
        <FloatingToolbar position="top-left">
          <LayoutTypeSwitcher />
        </FloatingToolbar>

      <FloatingToolbar position="top-center">
        <ToggleButtonGroup size="small" exclusive value="grid">
          <ToggleButton value="grid">
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </FloatingToolbar>

      <FloatingToolbar position="top-right">
        <SettingsButton />
      </FloatingToolbar>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h4" sx={{
          color: "text.secondary"
        }}>
          Main Content Area
        </Typography>
      </Box>

      <FloatingToolbar position="bottom-left">
        <MinimapToggle />
      </FloatingToolbar>

      <FloatingToolbar position="bottom-right">
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <IconButton size="small" color="inherit">
            <ZoomOutIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" sx={{ mx: 1, minWidth: 40, textAlign: 'center' }}>
            100%
          </Typography>
          <IconButton size="small" color="inherit">
            <ZoomInIcon fontSize="small" />
          </IconButton>
        </Box>
      </FloatingToolbar>
    </Box>
    </LayoutConfigProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple toolbars in different positions covering all corners.',
      },
    },
  },
};
