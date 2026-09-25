import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { LayersPipeline } from '../components';
import { DEFAULT_LAYERS, lightColors } from '../constants';
import type { Layer } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>{children}</Box>
  </Box>
);

const meta: Meta<typeof LayersPipeline> = {
  title: 'Screens/AIGuidedEditorV6/Components/LayersPipeline',
  component: LayersPipeline,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Component = () => {
      const [layers, setLayers] = React.useState<Layer[]>(DEFAULT_LAYERS);
      return (
        <LayersPipeline
          layers={layers}
          contentType="post"
          onLayerToggle={(id: string) => {
            setLayers((prev) =>
              prev.map((l) => (l.id === id && !l.required ? { ...l, enabled: !l.enabled } : l))
            );
          }}
          onLayerReorder={setLayers}
        />
      );
    };
    return <Component />;
  },
};

export const ArticleRecommended: Story = {
  render: () => {
    const Component = () => {
      const articleLayers = DEFAULT_LAYERS.map((l: Layer) => ({
        ...l,
        enabled: ['initial-generation', 'professional-revision', 'seo-optimization', 'data-stacking'].includes(l.id),
      }));
      const [layers, setLayers] = React.useState<Layer[]>(articleLayers);
      return (
        <LayersPipeline
          layers={layers}
          contentType="article"
          onLayerToggle={(id: string) => {
            setLayers((prev) =>
              prev.map((l) => (l.id === id && !l.required ? { ...l, enabled: !l.enabled } : l))
            );
          }}
          onLayerReorder={setLayers}
        />
      );
    };
    return <Component />;
  },
};

export const MinimalLayers: Story = {
  render: () => {
    const Component = () => {
      const minimalLayers = DEFAULT_LAYERS.map((l: Layer) => ({
        ...l,
        enabled: l.id === 'initial-generation',
      }));
      const [layers, setLayers] = React.useState<Layer[]>(minimalLayers);
      return (
        <LayersPipeline
          layers={layers}
          contentType="story"
          onLayerToggle={(id: string) => {
            setLayers((prev) =>
              prev.map((l) => (l.id === id && !l.required ? { ...l, enabled: !l.enabled } : l))
            );
          }}
          onLayerReorder={setLayers}
        />
      );
    };
    return <Component />;
  },
};

export const AllLayersEnabled: Story = {
  render: () => {
    const Component = () => {
      const allEnabledLayers = DEFAULT_LAYERS.map((l: Layer) => ({ ...l, enabled: true }));
      const [layers, setLayers] = React.useState<Layer[]>(allEnabledLayers);
      return (
        <LayersPipeline
          layers={layers}
          contentType="newsletter"
          onLayerToggle={(id: string) => {
            setLayers((prev) =>
              prev.map((l) => (l.id === id && !l.required ? { ...l, enabled: !l.enabled } : l))
            );
          }}
          onLayerReorder={setLayers}
        />
      );
    };
    return <Component />;
  },
};
