import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tile } from './Tile';
import { TileSkeleton } from './TileSkeleton';
import { Box, Typography, Paper, Card, CardContent } from '@mui/material';
import type { TileConfig } from '../../navigation/types';
import { TileProvider } from '../providers/TileProvider';

const meta: Meta<typeof Tile> = {
  title: 'Layout Systems/Spatial Layout/Tiles',
  component: Tile,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TileProvider>
        <Story />
      </TileProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Visual representation of a tile in the grid.

**Variants:**
- \`default\`: Standard tile view
- \`thumbnail\`: Compact preview
- \`card\`: Card-style with elevation

**States:**
- Active, Hovered, Disabled, Loading
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'thumbnail', 'card'],
      description: 'Visual variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

const sampleConfig: TileConfig = {
  id: 'sample',
  position: { x: 0, y: 0 },
  seo: { title: 'Sample Tile' },
  display: {
    label: 'Sample',
    colors: { inactive: '#555', active: '#0cf' },
  },
};

export const Default: Story = {
  args: {
    config: sampleConfig,
    children: (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Tile Content</Typography>
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          Default tile variant
        </Typography>
      </Box>
    ),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <Box sx={{ width: 300, height: 200, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <Story />
      </Box>
    ),
  ],
};

export const Active: Story = {
  args: {
    config: sampleConfig,
    state: { isActive: true },
    children: (
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', height: '100%' }}>
        <Typography variant="h6">Active Tile</Typography>
      </Box>
    ),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <Box sx={{ width: 300, height: 200 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Loading: Story = {
  args: {
    config: sampleConfig,
    state: { isLoading: true },
    children: (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          Loading...
        </Typography>
      </Box>
    ),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <Box sx={{ width: 300, height: 200, bgcolor: 'background.paper' }}>
        <Story />
      </Box>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    config: sampleConfig,
    state: { isDisabled: true },
    children: (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{
          color: "text.disabled"
        }}>
          Disabled Tile
        </Typography>
      </Box>
    ),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <Box sx={{ width: 300, height: 200, bgcolor: 'background.paper' }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithCardContent: Story = {
  args: {
    config: sampleConfig,
    variant: 'preview',
    children: (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Card Tile
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Tile with preview styling and elevation
          </Typography>
        </CardContent>
      </Card>
    ),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <Box sx={{ width: 300, height: 200 }}>
        <Story />
      </Box>
    ),
  ],
};

// TileSkeleton stories
export const SkeletonLoading: StoryObj = {
  render: () => (
    <Box sx={{ width: 300, height: 200, bgcolor: 'background.paper', p: 2 }}>
      <TileSkeleton />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton placeholder while tile content loads.',
      },
    },
  },
};

export const MultipleSkeletons: StoryObj = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, p: 2 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Box key={i} sx={{ width: 200, height: 150, bgcolor: 'background.paper', p: 2 }}>
          <TileSkeleton />
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple tile skeletons in a grid layout.',
      },
    },
  },
};

// =============================================================================
// TileGrid Stories
// =============================================================================

import { TileGrid } from './TileGrid';
import type { MapGridNavigationConfig } from '../../navigation/types';

const sampleTiles = [
  { id: '0-0', position: { x: 0, y: 0 }, seo: { title: 'Home' }, display: { label: 'Home', colors: { inactive: '#555', active: '#0cf' } } },
  { id: '1-0', position: { x: 1, y: 0 }, seo: { title: 'Products' }, display: { label: 'Products', colors: { inactive: '#555', active: '#0cf' } } },
  { id: '2-0', position: { x: 2, y: 0 }, seo: { title: 'About' }, display: { label: 'About', colors: { inactive: '#555', active: '#0cf' } } },
  { id: '0-1', position: { x: 0, y: 1 }, seo: { title: 'Contact' }, display: { label: 'Contact', colors: { inactive: '#555', active: '#0cf' } } },
  { id: '1-1', position: { x: 1, y: 1 }, seo: { title: 'Blog' }, display: { label: 'Blog', colors: { inactive: '#555', active: '#0cf' } } },
  { id: '2-1', position: { x: 2, y: 1 }, seo: { title: 'Support' }, display: { label: 'Support', colors: { inactive: '#555', active: '#0cf' } } },
];

const sampleGridConfig: MapGridNavigationConfig = {
  dimensions: {
    width: 3,
    height: 2,
    homePosition: { x: 0, y: 0 },
    wrapAround: true,
  },
  tiles: sampleTiles,
};

const SimpleTileContent = ({ label }: { label: string }) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
    }}
  >
    <Typography variant="subtitle1">{label}</Typography>
  </Box>
);

const sampleRegistry = {
  render: (tileId: string) => <SimpleTileContent label={tileId} />,
};

export const GridSingleView: StoryObj = {
  render: () => (
    <TileProvider>
      <Box sx={{ width: 400, height: 300, p: 2 }}>
        <TileGrid
          config={sampleGridConfig}
          registry={sampleRegistry}
          currentPosition={{ x: 1, y: 0 }}
          variant="single"
        />
      </Box>
    </TileProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: `TileGrid with "single" variant - shows only the current tile.

**Props:**
- \`config\` - Grid configuration with tile definitions
- \`registry\` - Render functions for tile content
- \`currentPosition\` - Currently focused position
- \`variant\` - Display mode (single | with-neighbors | overview)`,
      },
    },
  },
};

export const GridWithNeighbors: StoryObj = {
  render: () => (
    <TileProvider>
      <Box sx={{ width: 500, height: 400, p: 2 }}>
        <TileGrid
          config={sampleGridConfig}
          registry={sampleRegistry}
          currentPosition={{ x: 1, y: 0 }}
          variant="with-neighbors"
        />
      </Box>
    </TileProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TileGrid with "with-neighbors" variant - shows current tile and adjacent tiles.',
      },
    },
  },
};

export const GridOverview: StoryObj = {
  render: () => (
    <TileProvider>
      <Box sx={{ width: 700, height: 400, p: 2 }}>
        <TileGrid
          config={sampleGridConfig}
          registry={sampleRegistry}
          currentPosition={{ x: 0, y: 0 }}
          variant="overview"
        />
      </Box>
    </TileProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TileGrid with "overview" variant - shows all tiles in the grid.',
      },
    },
  },
};

export const GridWithClickHandler: StoryObj = {
  render: () => {
    const [selected, setSelected] = React.useState({ x: 0, y: 0 });
    
    return (
      <TileProvider>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected: ({selected.x}, {selected.y})
          </Typography>
          <Box sx={{ width: 600, height: 350 }}>
            <TileGrid
              config={sampleGridConfig}
              registry={sampleRegistry}
              currentPosition={selected}
              variant="overview"
              onTileClick={(pos) => setSelected(pos)}
            />
          </Box>
        </Box>
      </TileProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive TileGrid with click handling to select tiles.',
      },
    },
  },
};

// =============================================================================
// TileContent Stories
// =============================================================================

import { TileContent } from './TileContent';

const LazyLoadedContent = React.lazy(() => 
  new Promise<{ default: React.ComponentType }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <Box sx={{ p: 4, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="h6">Content Loaded!</Typography>
            <Typography variant="body2">
              This content was loaded asynchronously.
            </Typography>
          </Box>
        ),
      });
    }, 1500);
  })
);

export const TileContentWithSuspense: StoryObj = {
  render: () => (
    <TileProvider>
      <Box sx={{ width: 400, height: 200, p: 2 }}>
        <TileContent>
          <LazyLoadedContent />
        </TileContent>
      </Box>
    </TileProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: `TileContent provides a Suspense boundary for lazy-loaded tile content.

**Features:**
- Automatic fallback to TileSkeleton while loading
- Custom fallback support via \`fallback\` prop
- Seamless integration with React.lazy

*Note: Refresh the story to see the loading state again.*`,
      },
    },
  },
};

export const TileContentCustomFallback: StoryObj = {
  render: () => (
    <TileProvider>
      <Box sx={{ width: 400, height: 200, p: 2 }}>
        <TileContent
          fallback={
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                bgcolor: 'action.hover',
                borderRadius: 1,
              }}
            >
              <Typography sx={{
                color: "text.secondary"
              }}>Custom loading...</Typography>
            </Box>
          }
        >
          <LazyLoadedContent />
        </TileContent>
      </Box>
    </TileProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TileContent with a custom fallback component instead of TileSkeleton.',
      },
    },
  },
};
