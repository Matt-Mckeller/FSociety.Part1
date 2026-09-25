import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ContentTypeSelector } from '../components';
import { lightColors } from '../constants';
import type { ContentTypeId } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>{children}</Box>
  </Box>
);

const meta: Meta<typeof ContentTypeSelector> = {
  title: 'Screens/AIGuidedEditorV6/Components/ContentTypeSelector',
  component: ContentTypeSelector,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Component = () => {
      const [selectedType, setSelectedType] = React.useState<ContentTypeId>('post');
      return (
        <ContentTypeSelector
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      );
    };
    return <Component />;
  },
};

export const CarouselSelected: Story = {
  render: () => {
    const Component = () => {
      const [selectedType, setSelectedType] = React.useState<ContentTypeId>('carousel');
      return (
        <ContentTypeSelector
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      );
    };
    return <Component />;
  },
};

export const ArticleSelected: Story = {
  render: () => {
    const Component = () => {
      const [selectedType, setSelectedType] = React.useState<ContentTypeId>('article');
      return (
        <ContentTypeSelector
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      );
    };
    return <Component />;
  },
};

export const VideoScriptSelected: Story = {
  render: () => {
    const Component = () => {
      const [selectedType, setSelectedType] = React.useState<ContentTypeId>('video-script');
      return (
        <ContentTypeSelector
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      );
    };
    return <Component />;
  },
};
