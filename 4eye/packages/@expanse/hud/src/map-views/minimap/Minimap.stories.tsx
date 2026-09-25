import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Minimap } from '@expanse/map';
import { NavigationProvider } from '@expanse/map';
import type { MapGridNavigationConfig } from '@expanse/map';

// Create a larger map grid for better minimap visualization
const createGridConfig = (width: number, height: number): MapGridNavigationConfig => {
  const tiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({
        id: `tile-${x}-${y}`,
        position: { x, y },
        seo: { title: `Tile ${x},${y}` },
        display: {
          label: `${x},${y}`,
          colors: {
            inactive: x === width / 2 && y === height / 2 ? '#ffd700' : '#90caf9',
            active: '#1976d2',
          },
        },
      });
    }
  }
  
  return {
    dimensions: {
      width,
      height,
      homePosition: { x: Math.floor(width / 2), y: Math.floor(height / 2) },
      wrapAround: true,
    },
    tiles,
  };
};

const defaultConfig = createGridConfig(9, 9);

const meta: Meta<typeof Minimap> = {
  title: 'Layout Systems/HUD Components/Minimap',
  component: Minimap,
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <NavigationProvider config={defaultConfig}>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Grid minimap component with multiple visualization styles.
Shows an overview of the grid with the current position highlighted.

**Variants:**
- \`grid\`: Grid lines with tile indicators
- \`dots\`: Minimalist circular dots
- \`blocks\`: Solid rectangular blocks

**Features:**
- Click to navigate to any tile
- Current position highlight
- Hover tooltips with tile labels
- Responsive sizing
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'dots', 'blocks'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size preset',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show tile labels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Minimap>;

export const Default: Story = {
  args: {
    variant: 'grid',
    size: 'medium',
    showLabels: false,
  },
};

export const GridVariant: Story = {
  args: {
    variant: 'grid',
    size: 'medium',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid variant shows a traditional grid layout with lines and intersections.',
      },
    },
  },
};

export const DotsVariant: Story = {
  args: {
    variant: 'dots',
    size: 'medium',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dots variant displays circular indicators for each tile, minimalist and clean.',
      },
    },
  },
};

export const BlocksVariant: Story = {
  args: {
    variant: 'blocks',
    size: 'medium',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Blocks variant shows solid rectangular blocks, clearest visibility.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'grid',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size ideal for corner overlays or constrained spaces.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'grid',
    size: 'large',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size with labels, great for primary navigation interface.',
      },
    },
  },
};

export const WithLabels: Story = {
  args: {
    variant: 'blocks',
    size: 'large',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Labels provide context for each tile position.',
      },
    },
  },
};

export const NonInteractive: Story = {
  args: {
    variant: 'dots',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Non-interactive minimap for display-only purposes.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <NavigationProvider config={defaultConfig}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Grid</h3>
          <Minimap variant="grid" size="medium" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Dots</h3>
          <Minimap variant="dots" size="medium" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Blocks</h3>
          <Minimap variant="blocks" size="medium" />
        </div>
      </div>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comparison of all minimap variants side-by-side.',
      },
    },
  },
};

export const DifferentGridSizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>5×5 Grid</h3>
        <NavigationProvider config={createGridConfig(5, 5)}>
          <Minimap variant="grid" size="medium" showLabels />
        </NavigationProvider>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>9×9 Grid</h3>
        <NavigationProvider config={createGridConfig(9, 9)}>
          <Minimap variant="grid" size="medium" showLabels />
        </NavigationProvider>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>7×5 Grid</h3>
        <NavigationProvider config={createGridConfig(7, 5)}>
          <Minimap variant="grid" size="medium" showLabels />
        </NavigationProvider>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Minimap adapts to different grid dimensions.',
      },
    },
  },
};

// =============================================================================
// MinimapOverlay Stories
// =============================================================================

import { MinimapOverlay } from '@expanse/map';
import { Box, Typography, Paper } from '@mui/material';

export const MinimapOverlayDemo: StoryObj = {
  render: () => (
    <NavigationProvider config={createGridConfig(5, 5)}>
      <Box 
        sx={{ 
          position: 'relative', 
          width: 600, 
          height: 400, 
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {/* Page content */}
        <Paper 
          sx={{ 
            m: 3, 
            p: 3, 
            height: 'calc(100% - 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" sx={{
            color: "text.secondary"
          }}>
            Main Content Area
          </Typography>
        </Paper>
        
        {/* Minimap overlay in bottom-right corner */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 2,
            p: 1,
            backdropFilter: 'blur(8px)',
          }}
        >
          <MinimapOverlay 
            tileSize={20}
            gap={3}
            showLabels
          />
        </Box>
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: `MinimapOverlay is a compact minimap designed for corner positioning.

**Props:**
- \`tileSize\` - Size of each tile in pixels (default: 16)
- \`gap\` - Gap between tiles (default: 2)
- \`showLabels\` - Show tile labels on hover
- \`disabled\` - Disable click navigation

**Use cases:**
- Corner overlay for quick grid navigation
- Floating position indicator
- Dashboard grid overview`,
      },
    },
  },
};

export const MinimapOverlayCompact: StoryObj = {
  render: () => (
    <NavigationProvider config={createGridConfig(9, 9)}>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Compact (16px tiles)
          </Typography>
          <Box sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 1 }}>
            <MinimapOverlay tileSize={16} gap={2} />
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Standard (24px tiles)
          </Typography>
          <Box sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 1 }}>
            <MinimapOverlay tileSize={24} gap={3} />
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Large (32px tiles)
          </Typography>
          <Box sx={{ bgcolor: 'grey.900', p: 1, borderRadius: 1 }}>
            <MinimapOverlay tileSize={32} gap={4} showLabels />
          </Box>
        </Box>
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'MinimapOverlay at different size configurations.',
      },
    },
  },
};

// =============================================================================
// MinimapPanel Stories
// =============================================================================

import { MinimapPanel } from './MinimapPanel';

// Config with rich category + icon data for the panel demo
const createRichGridConfig = (): MapGridNavigationConfig => {
  const categories: Record<string, { color: string }> = {
    Home: { color: '#4caf50' },
    Learning: { color: '#2196f3' },
    Gaming: { color: '#9c27b0' },
    Social: { color: '#ff9800' },
    Tools: { color: '#607d8b' },
  };

  const tiles = [
    { id: 'home', position: { x: 4, y: 1 }, category: 'Home', label: 'Home', color: '#4caf50' },
    { id: 'learn-1', position: { x: 0, y: 0 }, category: 'Learning', label: 'Math', color: '#2196f3' },
    { id: 'learn-2', position: { x: 1, y: 0 }, category: 'Learning', label: 'Science', color: '#2196f3' },
    { id: 'learn-3', position: { x: 2, y: 0 }, category: 'Learning', label: 'History', color: '#2196f3' },
    { id: 'learn-4', position: { x: 3, y: 0 }, category: 'Learning', label: 'English', color: '#2196f3' },
    { id: 'game-1', position: { x: 7, y: 0 }, category: 'Gaming', label: 'Quest', color: '#9c27b0' },
    { id: 'game-2', position: { x: 8, y: 1 }, category: 'Gaming', label: 'Arena', color: '#9c27b0' },
    { id: 'social-1', position: { x: 0, y: 1 }, category: 'Social', label: 'Chat', color: '#ff9800' },
    { id: 'social-2', position: { x: 0, y: 2 }, category: 'Social', label: 'Party', color: '#ff9800' },
    { id: 'social-3', position: { x: 1, y: 2 }, category: 'Social', label: 'Friends', color: '#ff9800' },
    { id: 'tools-1', position: { x: 7, y: 2 }, category: 'Tools', label: 'Settings', color: '#607d8b' },
    { id: 'tools-2', position: { x: 8, y: 2 }, category: 'Tools', label: 'Profile', color: '#607d8b' },
  ].map(({ id, position, category, label, color }) => ({
    id,
    position,
    seo: { title: label },
    display: {
      label,
      category,
      colors: { inactive: color, active: '#fff' },
    },
  }));

  return {
    dimensions: { width: 9, height: 3, homePosition: { x: 4, y: 1 }, wrapAround: false },
    tiles,
  };
};

const richConfig = createRichGridConfig();

/**
 * MinimapPanel — rich togglable panel matching the symbol-grid minimap UX.
 */
export const MinimapPanelDefault: StoryObj = {
  name: 'Panel / Default (Open)',
  render: () => (
    <NavigationProvider config={richConfig}>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <Typography variant="h5" sx={{
            color: "text.secondary"
          }}>Content Area</Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 1
            }}>
            Click the map icon (top-right) to toggle the minimap panel
          </Typography>
        </Box>
        <MinimapPanel position="top-right" defaultOpen title="Navigation Map" />
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
    docs: {
      description: {
        story: `
**MinimapPanel** — rich togglable overlay with full navigation UX.

Features:
- Built-in toggle button (Map icon)
- Animated open/close (MUI Zoom)
- Hover preview: icon, title, coordinates, category
- Current position chip
- Row + column axis headers
- Per-category colored cells; special tiles show their icon
- Current position indicator (white border + glow)
- Auto-derived category legend

Click the map icon in the top-right to toggle the panel open/closed.
        `,
      },
    },
  },
};

export const MinimapPanelPositions: StoryObj = {
  name: 'Panel / All Positions',
  render: () => (
    <NavigationProvider config={richConfig}>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <Typography variant="h5" sx={{
            color: "text.secondary"
          }}>
            MinimapPanel — Four Positions
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 1
            }}>
            Each corner has its own independent panel instance
          </Typography>
        </Box>
        <MinimapPanel position="top-right" defaultOpen={true} title="Top Right" tileSize={18} gap={2} />
        <MinimapPanel position="top-left" defaultOpen={false} title="Top Left" tileSize={18} gap={2} />
        <MinimapPanel position="bottom-right" defaultOpen={false} title="Bottom Right" tileSize={18} gap={2} />
        <MinimapPanel position="bottom-left" defaultOpen={false} title="Bottom Left" tileSize={18} gap={2} />
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
    docs: {
      description: {
        story: 'MinimapPanel can be placed at any corner. Top-right is open by default here; click the others to open them.',
      },
    },
  },
};

export const MinimapPanelControlled: StoryObj = {
  name: 'Panel / Controlled (no toggle button)',
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <NavigationProvider config={richConfig}>
        <Box sx={{ position: 'relative', width: 600, height: 500, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>Controlled MinimapPanel</Typography>
            <button onClick={() => setOpen(o => !o)}>
              {open ? 'Hide' : 'Show'} minimap
            </button>
          </Box>
          <MinimapPanel
            open={open}
            onOpenChange={setOpen}
            showToggleButton={false}
            position="top-right"
            title="Site Map"
          />
        </Box>
      </NavigationProvider>
    );
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
    docs: {
      description: {
        story: 'Controlled mode — open state managed externally. The built-in toggle button is hidden (`showToggleButton={false}`).',
      },
    },
  },
};

export const MinimapPanelCustomLegend: StoryObj = {
  name: 'Panel / Custom Legend',
  render: () => (
    <NavigationProvider config={richConfig}>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh', bgcolor: 'background.default' }}>
        <MinimapPanel
          position="top-right"
          defaultOpen
          title="Custom Legend Demo"
          legend={[
            { label: 'Alpha Zone', color: '#e91e63' },
            { label: 'Beta Zone', color: '#00bcd4' },
            { label: 'Restricted', color: '#f44336' },
          ]}
        />
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
    docs: {
      description: {
        story: 'Pass a `legend` prop to override the auto-derived category legend with your own items.',
      },
    },
  },
};

export const MinimapPanelVariants: StoryObj = {
  name: 'Panel / All Tile Variants',
  render: () => (
    <NavigationProvider config={richConfig}>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh', bgcolor: 'background.default', p: 4, overflowY: 'auto' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          MinimapPanel Tile Variants
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 3 }}>
          {/* Default */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Default</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 1
              }}>
              Rounded corners, standard border
            </Typography>
            <MinimapPanel
              position="top-right"
              defaultOpen
              title="Default"
              tileVariant="default"
              showToggleButton={false}
              sx={{ position: 'relative !important', top: 'auto !important', right: 'auto !important' }}
            />
          </Box>

          {/* Circular */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Circular</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 1
              }}>
              Fully round tiles (50% radius)
            </Typography>
            <MinimapPanel
              position="top-right"
              defaultOpen
              title="Circular"
              tileVariant="circular"
              showToggleButton={false}
              sx={{ position: 'relative !important', top: 'auto !important', right: 'auto !important' }}
            />
          </Box>

          {/* Sharp */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Sharp</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 1
              }}>
              Square corners, crisp edges
            </Typography>
            <MinimapPanel
              position="top-right"
              defaultOpen
              title="Sharp"
              tileVariant="sharp"
              showToggleButton={false}
              sx={{ position: 'relative !important', top: 'auto !important', right: 'auto !important' }}
            />
          </Box>

          {/* Outlined */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Outlined</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 1
              }}>
              Thicker borders, clear boundaries
            </Typography>
            <MinimapPanel
              position="top-right"
              defaultOpen
              title="Outlined"
              tileVariant="outlined"
              showToggleButton={false}
              sx={{ position: 'relative !important', top: 'auto !important', right: 'auto !important' }}
            />
          </Box>

          {/* Minimal */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Minimal</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 1
              }}>
              No borders, subtle background
            </Typography>
            <MinimapPanel
              position="top-right"
              defaultOpen
              title="Minimal"
              tileVariant="minimal"
              showToggleButton={false}
              sx={{ position: 'relative !important', top: 'auto !important', right: 'auto !important' }}
            />
          </Box>

          {/* Glow */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>Glow</Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: 'block',
                mb: 1
              }}>
              Ambient glow on all special tiles
            </Typography>
            <MinimapPanel
              position="top-right"
              defaultOpen
              title="Glow"
              tileVariant="glow"
              showToggleButton={false}
              sx={{ position: 'relative !important', top: 'auto !important', right: 'auto !important' }}
            />
          </Box>
        </Box>
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
    docs: {
      description: {
        story: `
All 6 tile visual variants side-by-side:

- **default**: Rounded corners (4px), standard 1px border, glow on active
- **circular**: Fully round tiles (50% radius), modern look
- **sharp**: Square corners (0px), crisp technical appearance
- **outlined**: Thicker borders (2px), clear boundaries
- **minimal**: No borders, subtle background, ethereal feel
- **glow**: Ambient glow effect on all special tiles, futuristic
        `,
      },
    },
  },
};

export const MinimapPanelNoAnimation: StoryObj = {
  name: 'Panel / No Active Animation',
  render: () => (
    <NavigationProvider config={richConfig}>
      <Box sx={{ position: 'relative', width: '100vw', height: '100vh', bgcolor: 'background.default' }}>
        <MinimapPanel
          position="top-right"
          defaultOpen
          title="No Pulse Animation"
          animateActive={false}
        />
      </Box>
    </NavigationProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
    docs: {
      description: {
        story: 'Disable the pulse animation on the active tile with `animateActive={false}`.',
      },
    },
  },
};
