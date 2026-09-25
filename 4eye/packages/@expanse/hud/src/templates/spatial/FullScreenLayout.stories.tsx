import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FullScreenLayout } from './FullScreenLayout';
import { NavigationProvider } from '@expanse/map/navigation';
import type { MapGridNavigationConfig } from '@expanse/map/navigation/types';
import type { Position } from '@expanse/map/navigation/types/Position.types';
import type { TileConfig } from '@expanse/map/navigation/types';
import { Box, Typography, Paper } from '@mui/material';

// Sample map grid configuration
const sampleConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 3,
    height: 3,
    homePosition: { x: 1, y: 1 },
    wrapAround: true,
  },
  tiles: [
    {
      id: 'home',
      position: { x: 1, y: 1 },
      seo: { title: 'Home' },
      display: { label: 'Home', colors: { inactive: '#555', active: '#0cf' } },
    },
    {
      id: 'about',
      position: { x: 2, y: 1 },
      seo: { title: 'About' },
      display: { label: 'About', colors: { inactive: '#555', active: '#0cf' } },
    },
    {
      id: 'contact',
      position: { x: 1, y: 2 },
      seo: { title: 'Contact' },
      display: { label: 'Contact', colors: { inactive: '#555', active: '#0cf' } },
    },
  ],
};

const meta: Meta<typeof FullScreenLayout> = {
  title: 'Layout Systems/Spatial Layout/FullScreenLayout',
  component: FullScreenLayout,
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={sampleConfig}>
        <Story />
      </NavigationProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Full-screen layout for grid navigation apps.

** Features:**
- 100vw × 100vh viewport
- Fixed position overlays (minimap, controls)
- Fixed position bars (top/bottom/left/right)
- CSS page transitions
- Optional chat zone for chat interfaces
        `,
      },
    },
  },
  argTypes: {
    showMinimap: {
      control: 'boolean',
      description: 'Show minimap overlay',
    },
    showNavigationControls: {
      control: 'boolean',
      description: 'Show navigation controls',
    },
    minimapPosition: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Minimap position',
    },
    transitionType: {
      control: 'select',
      options: ['fade', 'slide', 'slide-fade', 'none'],
      description: 'Page transition type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FullScreenLayout>;

// Sample page content
const SamplePage = ({ title }: { title?: string }) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        {title || 'Page Content'}
      </Typography>
      <Typography sx={{
        color: "text.secondary"
      }}>
        Navigate with arrow keys or click minimap
      </Typography>
    </Paper>
  </Box>
);

export const Default: Story = {
  args: {
    children: <SamplePage />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic full-screen layout without overlays.',
      },
    },
  },
};

export const WithMinimap: Story = {
  args: {
    showMinimap: true,
    minimapPosition: 'bottom-right',
    children: <SamplePage title="With Minimap" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-screen layout with minimap overlay.',
      },
    },
  },
};

export const WithNavControls: Story = {
  args: {
    showNavigationControls: true,
    children: <SamplePage title="With Nav Controls" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-screen layout with navigation controls.',
      },
    },
  },
};

export const Complete: Story = {
  args: {
    showMinimap: true,
    showNavigationControls: true,
    minimapPosition: 'bottom-right',
    navControlsPosition: 'bottom-left',
    children: (position: Position, tile: TileConfig | null) => (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 4, textAlign: 'center', minWidth: 400 }}>
          <Typography variant="h3" gutterBottom>
            {tile?.seo.title || 'Unknown'}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 2
            }}>
            Position: ({position.x}, {position.y})
          </Typography>
          <Typography variant="body2">
            Navigate with arrow keys, WASD, or the controls below
          </Typography>
        </Paper>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete layout with minimap, navigation controls, and dynamic content.',
      },
    },
  },
};

export const WithTopBar: Story = {
  args: {
    showMinimap: true,
    bars: {
      top: (
        <Box
          sx={{
            bgcolor: 'rgba(20, 28, 36, 0.92)',
            backdropFilter: 'blur(12px)',
            px: 3,
            py: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <Typography variant="h6">My App</Typography>
        </Box>
      ),
    },
    children: <SamplePage />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with fixed top bar.',
      },
    },
  },
};

export const WithTransitions: Story = {
  args: {
    showMinimap: true,
    minimapPosition: 'bottom-right',
    transitionType: 'slide-fade',
    transitionDuration: 500,
    children: (position: Position, tile: TileConfig | null) => (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            {tile?.seo.title || 'Page'}
          </Typography>
          <Typography variant="h6" sx={{
            color: "text.secondary"
          }}>
            Navigate to see slide-fade transition
          </Typography>
        </Paper>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with slide-fade page transitions. Navigate to see the effect.',
      },
    },
  },
};
