/**
 * LogoConfigurator Stories
 * 
 * Storybook stories for the interactive logo configurator
 */

import type { Meta, StoryObj } from '@storybook/react';
import { LogoConfigurator } from './LogoConfigurator';
import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { LogoConfig } from './types';

const meta: Meta<typeof LogoConfigurator> = {
  title: '4up/Branding/LogoConfigurator',
  component: LogoConfigurator,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive configurator for customizing the 4up logo appearance.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoConfigurator>;

// ============================================
// Default
// ============================================

export const Default: Story = {
  args: {
    showExport: true,
  },
};

// ============================================
// With Initial Config
// ============================================

export const WithInitialConfig: Story = {
  args: {
    initialConfig: {
      fillColor: '#e91e63',
      waveColor: '#e91e63',
    },
    showExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configurator initialized with custom values.',
      },
    },
  },
};

// ============================================
// Dark Theme Preview
// ============================================

export const DarkThemePreview: Story = {
  args: {
    initialConfig: {
      fillColor: '#ffffff',
      waveColor: '#ffffff',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: '#0f0f23', minHeight: '100vh' }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Configurator with dark theme background.',
      },
    },
  },
};

// ============================================
// No Export Button
// ============================================

export const NoExportButton: Story = {
  args: {
    showExport: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Configurator without the export button.',
      },
    },
  },
};

// ============================================
// With Change Callback
// ============================================

const ConfigWithCallback = () => {
  const [lastChange, setLastChange] = useState<Partial<LogoConfig> | null>(null);

  return (
    <Box>
      <LogoConfigurator
        onChange={(config) => setLastChange(config)}
      />
      <Paper sx={{ p: 2, m: 2, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>Last Change:</Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: 10, overflow: 'auto' }}>
          {lastChange ? JSON.stringify(lastChange, null, 2).slice(0, 500) + '...' : 'None'}
        </Typography>
      </Paper>
    </Box>
  );
};

export const WithChangeCallback: Story = {
  render: () => <ConfigWithCallback />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the onChange callback for config updates.',
      },
    },
  },
};

// ============================================
// Minimal Config Start
// ============================================

export const MinimalStart: Story = {
  args: {
    initialConfig: {
      showWaves: false,
      showCenterHole: false,
      showConnectorLines: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Start with a minimal logo configuration.',
      },
    },
  },
};
