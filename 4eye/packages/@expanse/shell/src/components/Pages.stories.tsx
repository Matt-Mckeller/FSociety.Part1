import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PlaceholderPage } from './PlaceholderPage';
import { PageContent } from './PageContent';
import { Box, Typography, Paper, Button } from '@mui/material';
import type { TileConfig } from '@expanse/map/navigation/types';

// =============================================================================
// PlaceholderPage Stories
// =============================================================================

const meta: Meta<typeof PlaceholderPage> = {
  title: 'Layout Systems/Core/Page Content',
  component: PlaceholderPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Utility components for rendering page content in spatial navigation grids.

**PlaceholderPage** - Default page shown for undefined positions. Displays position info and customizable patterns.

**PageContent** - Registry-based page renderer that matches positions to custom components.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlaceholderPage>;

const sampleTile: TileConfig = {
  id: 'sample',
  position: { x: 1, y: 2 },
  seo: { title: 'Sample Page', description: 'A sample tile for demonstration' },
  display: {
    label: 'Sample',
    category: 'Demo',
    colors: { inactive: '#555', active: '#0cf' },
  },
};

export const Default: Story = {
  args: {
    position: { x: 1, y: 2 },
    tile: sampleTile,
    showPosition: true,
  },
  render: (args) => (
    <Box sx={{ height: 400, bgcolor: 'background.default' }}>
      <PlaceholderPage {...args} />
    </Box>
  ),
};

export const DotsPattern: Story = {
  args: {
    position: { x: 0, y: 0 },
    pattern: 'dots',
    title: 'Dots Pattern',
    description: 'Placeholder with dotted background pattern',
    showPosition: true,
  },
  render: (args) => (
    <Box sx={{ height: 400 }}>
      <PlaceholderPage {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PlaceholderPage with dots pattern - creates a subtle, polished look.',
      },
    },
  },
};

export const GridPattern: Story = {
  args: {
    position: { x: 2, y: 1 },
    pattern: 'grid',
    title: 'Grid Pattern',
    description: 'Placeholder with grid lines background',
    showPosition: true,
  },
  render: (args) => (
    <Box sx={{ height: 400 }}>
      <PlaceholderPage {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PlaceholderPage with grid pattern - technical/blueprint aesthetic.',
      },
    },
  },
};

export const NoPattern: Story = {
  args: {
    position: { x: -1, y: 3 },
    pattern: 'none',
    title: 'Coming Soon',
    description: 'This area is under construction.',
    showPosition: false,
  },
  render: (args) => (
    <Box sx={{ height: 400 }}>
      <PlaceholderPage {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Clean placeholder without background pattern.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  args: {
    position: { x: 0, y: 0 },
    pattern: 'dots',
    showPosition: true,
  },
  render: (args) => (
    <Box sx={{ height: 400 }}>
      <PlaceholderPage {...args}>
        <Paper sx={{ mt: 3, p: 3, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Custom Content
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              marginBottom: "16px"
            }}>
            PlaceholderPage can include custom children for more complex layouts.
          </Typography>
          <Button variant="outlined" size="small">
            Take Action
          </Button>
        </Paper>
      </PlaceholderPage>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PlaceholderPage with custom children content.',
      },
    },
  },
};

// =============================================================================
// PageContent Stories
// =============================================================================

const sampleRegistry = {
  'home': () => (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>Home Page</Typography>
      <Typography sx={{
        color: "text.secondary"
      }}>
        This content is registered for the "home" tile ID.
      </Typography>
    </Box>
  ),
  'dashboard': () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {[1, 2, 3].map((i) => (
          <Paper key={i} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5">{i * 100}</Typography>
            <Typography variant="caption">Metric {i}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  ),
  '1,1': () => (
    <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white', height: '100%' }}>
      <Typography variant="h5">Position-Based Renderer</Typography>
      <Typography>This was matched by position "1,1"</Typography>
    </Box>
  ),
};

const homeTile: TileConfig = {
  id: 'home',
  position: { x: 0, y: 0 },
  seo: { title: 'Home' },
  display: { label: 'Home', colors: { inactive: '#e0e0e0', active: '#1976d2' } },
};

const dashboardTile: TileConfig = {
  id: 'dashboard',
  position: { x: 1, y: 0 },
  seo: { title: 'Dashboard' },
  display: { label: 'Dashboard', colors: { inactive: '#e0e0e0', active: '#1976d2' } },
};

const positionBasedTile: TileConfig = {
  id: 'position-example',
  position: { x: 1, y: 1 },
  seo: { title: 'Position Example' },
  display: { label: 'Position', colors: { inactive: '#e0e0e0', active: '#1976d2' } },
};

export const PageContentById: StoryObj = {
  render: () => (
    <Box sx={{ height: 400, bgcolor: 'background.default' }}>
      <PageContent
        position={{ x: 0, y: 0 }}
        tile={homeTile}
        registry={sampleRegistry}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: `PageContent resolves renderers by tile ID first.

**Resolution order:**
1. Tile ID (e.g., "home", "dashboard")
2. Position string (e.g., "1,1", "0,0")
3. "default" fallback
4. Built-in PlaceholderPage`,
      },
    },
  },
};

export const PageContentByPosition: StoryObj = {
  render: () => (
    <Box sx={{ height: 400 }}>
      <PageContent
        position={{ x: 1, y: 1 }}
        tile={positionBasedTile}
        registry={sampleRegistry}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PageContent matching by position string when tile ID is not found.',
      },
    },
  },
};

export const PageContentFallback: StoryObj = {
  render: () => (
    <Box sx={{ height: 400 }}>
      <PageContent
        position={{ x: 5, y: 5 }}
        tile={null}
        registry={sampleRegistry}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PageContent falls back to PlaceholderPage when no match is found.',
      },
    },
  },
};

export const PageContentCustomFallback: StoryObj = {
  render: () => (
    <Box sx={{ height: 400 }}>
      <PageContent
        position={{ x: 99, y: 99 }}
        tile={null}
        registry={sampleRegistry}
        fallback={(pos) => (
          <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'warning.light', height: '100%' }}>
            <Typography variant="h5">Custom Fallback</Typography>
            <Typography>No content at ({pos.x}, {pos.y})</Typography>
          </Box>
        )}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PageContent with a custom fallback renderer.',
      },
    },
  },
};
