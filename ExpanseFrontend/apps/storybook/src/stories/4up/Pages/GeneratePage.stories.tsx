import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@mui/material';
import { PageHeader } from '@4up-ui/PageHeader';
import { Card } from '@4up-ui/Card';
import { ContextSelector, PlatformSelector } from '@4up-features/generate';

/**
 * Generate Page Composition
 * 
 * Demonstrates the layout of the content generation page.
 * Note: This page heavily relies on Zustand stores for functionality.
 */

const GeneratePage = () => (
  <Box sx={{ p: 3 }}>
    <PageHeader
      title="Generate"
      subtitle="Create AI-powered content for your brand"
    />

    <Grid container spacing={3} sx={{ mt: 1 }}>
      {/* Context Selection */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card title="Context" subtitle="Select what this content is about">
          <ContextSelector
            context={{}}
            onChange={(ctx) => console.log('Context changed:', ctx)}
          />
        </Card>
      </Grid>

      {/* Platform Selection */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card title="Platforms" subtitle="Choose where to post">
          <PlatformSelector
            selectedPlatforms={['linkedin', 'twitter']}
            onChange={(platforms) => console.log('Platforms changed:', platforms)}
          />
        </Card>
      </Grid>

      {/* Generation Results */}
      <Grid size={{ xs: 12 }}>
        <Card title="Generated Content" subtitle="Review and edit your content">
          <Box sx={{ p: 4, color: 'text.secondary', textAlign: 'center' }}>
            Generated content variations would appear here after clicking Generate.
            <br /><br />
            In the full app, this integrates with useGenerationStore for AI content generation.
          </Box>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const meta = {
  title: '4up/Pages/Generate',
  component: GeneratePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The content generation page with context selection, platform targeting, and AI-generated results. Note: Uses multiple Zustand stores for full functionality.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GeneratePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
