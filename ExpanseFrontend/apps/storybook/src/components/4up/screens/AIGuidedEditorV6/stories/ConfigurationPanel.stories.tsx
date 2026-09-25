import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ConfigurationPanel } from '../components';
import { DEFAULT_GUIDELINES, lightColors } from '../constants';
import type { EditorConfiguration, ContentGuideline } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>{children}</Box>
  </Box>
);

const meta: Meta<typeof ConfigurationPanel> = {
  title: 'Screens/AIGuidedEditorV6/Components/ConfigurationPanel',
  component: ConfigurationPanel,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Component = () => {
      const [config, setConfig] = React.useState<EditorConfiguration>({
        guidelines: DEFAULT_GUIDELINES,
        emojiUsage: 'optimal',
      });
      return <ConfigurationPanel config={config} onConfigChange={setConfig} />;
    };
    return <Component />;
  },
};

export const NoEmojis: Story = {
  render: () => {
    const Component = () => {
      const [config, setConfig] = React.useState<EditorConfiguration>({
        guidelines: DEFAULT_GUIDELINES,
        emojiUsage: 'none',
      });
      return <ConfigurationPanel config={config} onConfigChange={setConfig} />;
    };
    return <Component />;
  },
};

export const AllGuidelinesEnabled: Story = {
  render: () => {
    const Component = () => {
      const [config, setConfig] = React.useState<EditorConfiguration>({
        guidelines: DEFAULT_GUIDELINES.map((g: ContentGuideline) => ({ ...g, enabled: true })),
        emojiUsage: 'expressive',
      });
      return <ConfigurationPanel config={config} onConfigChange={setConfig} />;
    };
    return <Component />;
  },
};
