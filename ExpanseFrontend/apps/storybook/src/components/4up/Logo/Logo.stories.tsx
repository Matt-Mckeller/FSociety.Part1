/**
 * Logo Stories
 * 
 * Storybook stories for the 4up Logo component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';
import { colorPresets, opacityPresets, overlapPresets, ratioPresets } from './utils/logoConfig';
import { Box, Typography, Grid } from '@mui/material';

const meta: Meta<typeof Logo> = {
  title: '4up/Branding/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The 4up logo with configurable shapes, colors, and features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'SVG size in pixels',
    },
    config: {
      description: 'Logo configuration object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

// ============================================
// Default Story
// ============================================

export const Default: Story = {
  args: {
    size: 300,
  },
};

// ============================================
// Size Variants
// ============================================

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={64} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>64px</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={128} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>128px</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={200} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>200px</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={300} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>300px</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo at different sizes.',
      },
    },
  },
};

// ============================================
// Shape Variants
// ============================================

export const Shapes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={200} config={{ shape: 'circle' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Circle</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={200} config={{ shape: 'square' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Square</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Logo size={200} config={{ shape: 'triangle' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Triangle</Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo with different base shapes.',
      },
    },
  },
};

// ============================================
// Color Variants
// ============================================

export const Colors: Story = {
  render: () => (
    <Grid container spacing={2} sx={{ maxWidth: 800 }}>
      {colorPresets.slice(0, 12).map((preset) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={preset.name}>
          <Box sx={{ textAlign: 'center', p: 1 }}>
            <Logo
              size={100}
              config={{ fillColor: preset.color, waveColor: preset.color }}
            />
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
              {preset.name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo with different color presets.',
      },
    },
  },
};

// ============================================
// Color Modes
// ============================================

export const ColorModes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box sx={{ p: 4, bgcolor: '#0f0f23', borderRadius: 2, textAlign: 'center' }}>
        <Logo size={150} config={{ fillColor: '#1976d2', waveColor: '#1976d2' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#fff' }}>
          Color on Dark
        </Typography>
      </Box>
      <Box sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
        <Logo size={150} config={{ fillColor: '#1976d2', waveColor: '#1976d2' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#333' }}>
          Color on Light
        </Typography>
      </Box>
      <Box sx={{ p: 4, bgcolor: '#0f0f23', borderRadius: 2, textAlign: 'center' }}>
        <Logo size={150} config={{ fillColor: '#ffffff', waveColor: '#ffffff' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#fff' }}>
          White on Dark
        </Typography>
      </Box>
      <Box sx={{ p: 4, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
        <Logo size={150} config={{ fillColor: '#000000', waveColor: '#000000' }} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#333' }}>
          Black on Light
        </Typography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo in different color modes for various backgrounds.',
      },
    },
  },
};

// ============================================
// Opacity Presets
// ============================================

export const OpacityPresets: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {opacityPresets.map((preset) => (
        <Box key={preset.name} sx={{ textAlign: 'center' }}>
          <Logo
            size={120}
            config={{
              baseOpacity: preset.baseOpacity,
              primaryOpacity: preset.primaryOpacity,
              waveOpacity: preset.waveOpacity,
            }}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
            {preset.name}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo with different opacity configurations.',
      },
    },
  },
};

// ============================================
// Overlap Presets
// ============================================

export const OverlapPresets: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {overlapPresets.map((preset) => (
        <Box key={preset.name} sx={{ textAlign: 'center' }}>
          <Logo
            size={120}
            config={{
              innerOverlap: preset.innerOverlap,
              outerOverlap: preset.outerOverlap,
            }}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
            {preset.name}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo with different overlap configurations.',
      },
    },
  },
};

// ============================================
// Ratio Presets
// ============================================

export const RatioPresets: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {ratioPresets.map((preset) => (
        <Box key={preset.name} sx={{ textAlign: 'center' }}>
          <Logo
            size={150}
            config={{
              scaleFactors: preset.scaleFactors,
            }}
          />
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
            {preset.name}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '10px' }}>
            {preset.description}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo with different size ratio presets.',
      },
    },
  },
};

// ============================================
// No Waves
// ============================================

export const NoWaves: Story = {
  args: {
    size: 300,
    config: {
      showWaves: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo without sound wave decorations.',
      },
    },
  },
};

// ============================================
// With 3 Circles
// ============================================

export const ThreeCircles: Story = {
  args: {
    size: 300,
    config: {
      showBaseCircle: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo showing all three circles in the 1:2:4 ratio.',
      },
    },
  },
};

// ============================================
// Minimal
// ============================================

export const Minimal: Story = {
  args: {
    size: 300,
    config: {
      showWaves: false,
      showConnectorLines: false,
      showCenterHole: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal logo without extra features.',
      },
    },
  },
};

// ============================================
// Playground
// ============================================

export const Playground: Story = {
  args: {
    size: 300,
    config: {
      shape: 'circle',
      fillColor: '#1976d2',
      waveColor: '#1976d2',
      baseOpacity: 0.61,
      primaryOpacity: 1.0,
      waveOpacity: 0.8,
      innerOverlap: 55,
      outerOverlap: 29,
      showWaves: true,
      showCenterHole: true,
      showConnectorLines: true,
    },
  },
  argTypes: {
    config: {
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with logo configuration.',
      },
    },
  },
};
