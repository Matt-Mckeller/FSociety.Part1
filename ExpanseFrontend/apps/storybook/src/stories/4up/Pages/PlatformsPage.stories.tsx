import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { PlatformGrid } from '@4up-features/platforms';
import { platformConfigs } from '@seed';

/**
 * Platforms Page Composition
 * 
 * Demonstrates the layout of the platforms configuration page.
 */

const PlatformsPage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="Platforms"
      subtitle="Configure your connected social media platforms"
      action={{
        label: 'Connect Platform',
        onClick: () => console.log('Connect platform clicked'),
      }}
    />

    <Box sx={{ mt: 3 }}>
      <PlatformGrid
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        platforms={platformConfigs as any}
        onPlatformClick={(id) => console.log('Platform clicked:', id)}
        loading={false}
      />
    </Box>
  </Box>
);

const meta = {
  title: '4up/Pages/Platforms',
  component: PlatformsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The platforms page showing connected social accounts with configuration options.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlatformsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
