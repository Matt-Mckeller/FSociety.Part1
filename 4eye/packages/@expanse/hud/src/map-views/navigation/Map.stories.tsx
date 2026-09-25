import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavigationProvider, useNavigation, Minimap } from '@expanse/map';
import { NavigationPad } from '../../hud-components/navigation-pad';
import { Box, Typography, Paper, Chip, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import type { MapGridNavigationConfig, Position } from '@expanse/map';

// Simple HUD Overlay replacement for HudOverlay
interface HudOverlayProps {
  children?: React.ReactNode;
  topCenter?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomCenter?: React.ReactNode;
  bottomRight?: React.ReactNode;
}

function HudOverlay({ children, topCenter, bottomLeft, bottomCenter, bottomRight }: HudOverlayProps) {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}
      {topCenter && (
        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          {topCenter}
        </Box>
      )}
      {bottomLeft && (
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1000 }}>
          {bottomLeft}
        </Box>
      )}
      {bottomCenter && (
        <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          {bottomCenter}
        </Box>
      )}
      {bottomRight && (
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1000 }}>
          {bottomRight}
        </Box>
      )}
    </Box>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title: 'Layout Systems/Spatial Layout/MapGridNavigation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# MapGridNavigation - Spatial Navigation System

The **MapGridNavigation** system provides 2D grid-based navigation for Spatial Layouts. Unlike Basic Web Layout that uses URL routes, MapGridNavigation organizes content as **Tiles** positioned on a grid - like a game map.

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                         HUD                                 │ ← Floating chrome
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │                    Tile Content                       │  │ ← Full viewport
│  │                  (x:0, y:0) = Home                    │  │
│  │                                                       │  │
│  │  ┌──────────────────┬────────────────────────────┐   │  │
│  │  │     Minimap      │        NavigationPad       │   │  │ ← HUD components
│  │  └──────────────────┴────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Key Components

| Component | Role |
|-----------|------|
| **MapGridProvider** | Context for map grid config and navigation state |
| **HUD (HudOverlay)** | Floating chrome layer |
| **Tile** | Content at a specific (x,y) position |
| **Minimap** | Grid overview and quick navigation |
| **NavigationPad** | Directional navigation controls |

## Usage

\`\`\`tsx
<NavigationProvider config={mapGridConfig}>
  <MapGridProvider config={{ grid: mapGridConfig }}>
    <HudOverlay
      bottomLeft={<Minimap />}
      bottomCenter={<NavigationPad />}
    >
      <TileContent />
    </HudOverlay>
  </MapGridProvider>
</NavigationProvider>
\`\`\`

## Navigation Methods

- **Arrow Keys**: Move between adjacent tiles
- **Click Minimap**: Jump to any visible tile
- **NavigationPad**: Touch/click directional controls
- **Swipe Gestures**: Mobile navigation (when enabled)
        `,
      },
    },
  },
};

export default meta;

// =============================================================================
// Sample Map Grid Configuration
// =============================================================================

const createGridConfig = (): MapGridNavigationConfig => ({
  dimensions: {
    width: 3,
    height: 3,
    homePosition: { x: 1, y: 1 },
    wrapAround: false,
  },
  tiles: [
    { id: 'home', position: { x: 1, y: 1 }, seo: { title: 'Home' }, display: { label: 'Home', category: 'Main', colors: { inactive: '#4caf50', active: '#2e7d32' } } },
    { id: 'explore', position: { x: 2, y: 1 }, seo: { title: 'Explore' }, display: { label: 'Explore', category: 'Navigation', colors: { inactive: '#2196f3', active: '#1565c0' } } },
    { id: 'profile', position: { x: 0, y: 1 }, seo: { title: 'Profile' }, display: { label: 'Profile', category: 'User', colors: { inactive: '#9c27b0', active: '#6a1b9a' } } },
    { id: 'settings', position: { x: 1, y: 0 }, seo: { title: 'Settings' }, display: { label: 'Settings', category: 'Config', colors: { inactive: '#ff9800', active: '#e65100' } } },
    { id: 'help', position: { x: 1, y: 2 }, seo: { title: 'Help' }, display: { label: 'Help', category: 'Support', colors: { inactive: '#00bcd4', active: '#00838f' } } },
  ],
});

// =============================================================================
// Tile Content Component
// =============================================================================

function TileContent() {
  const { position, getTileAt, config } = useNavigation();
  const tile = getTileAt(position.x, position.y);
  const currentPosition: Position = position;
  
  const bgColor = tile?.display?.colors?.active || '#1a1a2e';
  
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: bgColor,
        color: 'white',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
        {tile?.display?.label || `Position (${currentPosition.x}, ${currentPosition.y})`}
      </Typography>
      
      <Chip 
        label={tile?.display?.category || 'Unknown'} 
        sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
      />
      
      <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
        Use arrow keys or the navigation controls to move
      </Typography>
      
      <Paper sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Position: ({currentPosition.x}, {currentPosition.y}) • 
          Grid: {config.dimensions.width}×{config.dimensions.height} • 
          {config.tiles.length} tiles
        </Typography>
      </Paper>
    </Box>
  );
}

// =============================================================================
// Top Bar Component
// =============================================================================

function TopBar() {
  const { position, getTileAt, config, navigateTo } = useNavigation();
  const currentPosition = position;
  const tile = getTileAt(currentPosition.x, currentPosition.y);
  const homePos = config.dimensions.homePosition ?? { x: 0, y: 0 };
  const navigate = (p: Position) => navigateTo(p.x, p.y);
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Go Home">
          <IconButton 
            onClick={() => navigate(homePos)} 
            sx={{ color: 'white' }}
            size="small"
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
          {tile?.seo?.title || 'Map'}
        </Typography>
        {tile?.display?.category && (
          <Chip 
            label={tile.display.category} 
            size="small" 
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }} 
          />
        )}
      </Box>
      
      <Tooltip title="Settings">
        <IconButton sx={{ color: 'white' }} size="small">
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const MapConcept: StoryObj = {
  render: () => {
    const config = createGridConfig();
    
    return (
      <NavigationProvider config={config}>
        <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
          <HudOverlay
            topCenter={<TopBar />}
            bottomLeft={
              <Box sx={{ p: 2 }}>
                <Minimap variant="blocks" size="small" />
              </Box>
            }
            bottomCenter={
              <Box sx={{ p: 2 }}>
                <NavigationPad variant="default" />
              </Box>
            }
          >
            <TileContent />
          </HudOverlay>
        </Box>
      </NavigationProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `Interactive demo of the Map concept. Use arrow keys or click the NavigationPad to move between tiles. The minimap shows the current position in the grid.`,
      },
    },
  },
};

export const MapWithMinimalChrome: StoryObj = {
  render: () => {
    const config = createGridConfig();
    
    return (
      <NavigationProvider config={config}>
        <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
          <HudOverlay
            bottomRight={
              <Box sx={{ p: 1 }}>
                <Minimap variant="dots" size="small" />
              </Box>
            }
          >
            <TileContent />
          </HudOverlay>
        </Box>
      </NavigationProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `Minimal chrome setup - just a small minimap in the corner. Content takes full viewport. Perfect for immersive experiences.`,
      },
    },
  },
};

export const MapArchitecture: StoryObj = {
  render: () => (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Map Architecture
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            MapGridProvider
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            The context provider that manages map grid configuration and navigation state. 
            It wraps your spatial layout and provides access via <code>useMapGrid()</code> hook.
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {'<MapGridProvider config={{ grid }}>'}<br />
            {'  <App />'}<br />
            {'</MapGridProvider>'}
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            HudOverlay
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Floating UI chrome layer (absolute positioned). 
            Has 10 anchor slots for placing navigation controls, bars, and widgets.
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {'<HudOverlay slots={{'}<br />
            {'  topCenter: <Header />,'}<br />
            {'  bottomLeft: <Minimap />,'}<br />
            {'}}>'}<br />
            {'  <Content />'}<br />
            {'</HudOverlay>'}
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#4caf50' }}>
            Tiles
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Content units at specific (x,y) positions. Each tile has:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2, fontSize: '0.875rem' }}>
            <li><strong>position</strong> - Grid coordinates</li>
            <li><strong>seo</strong> - Title, description, meta</li>
            <li><strong>display</strong> - Label, colors, category</li>
            <li><strong>behavior</strong> - Disabled, hidden flags</li>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#ff9800' }}>
            Navigation
          </Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Multiple navigation methods:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2, fontSize: '0.875rem' }}>
            <li><strong>useMapGrid()</strong> - Navigate programmatically</li>
            <li><strong>Minimap</strong> - Click to jump</li>
            <li><strong>NavigationPad</strong> - Directional controls</li>
            <li><strong>Keyboard</strong> - Arrow keys</li>
          </Box>
        </Paper>
      </Box>
      
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Map vs Web Layout
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
          <Paper sx={{ p: 3, bgcolor: 'primary.dark', color: 'white' }}>
            <Typography variant="h6" gutterBottom>Spatial (Map) Layout</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              • Navigate by position (x, y)<br />
              • Content in Tiles<br />
              • Chrome floats on top<br />
              • Arrow keys, swipes, minimap<br />
              • Immersive UIs, games, dashboards
            </Typography>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Web (Standard) Layout</Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              • Navigate by URL routes<br />
              • Content in Pages<br />
              • Chrome pushes content<br />
              • Links and buttons<br />
              • Websites, apps, documentation
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual documentation of the Map architecture and how it compares to standard web layouts.',
      },
    },
  },
};
