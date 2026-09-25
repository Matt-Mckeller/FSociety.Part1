import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { EstimatedCost } from '../components';
import { DEFAULT_LAYERS, lightColors } from '../constants';
import type { FeedbackOptions, Layer } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>{children}</Box>
  </Box>
);

const DEFAULT_FEEDBACK_OPTIONS: FeedbackOptions = {
  enableThemeAlignment: true,
  enableAudienceReview: true,
  enablePainPointAnalysis: true,
  enableToneAnalysis: true,
  enableGoalAlignment: true,
  selectedAudiences: [],
};

const meta: Meta<typeof EstimatedCost> = {
  title: 'Screens/AIGuidedEditorV6/Components/EstimatedCost',
  component: EstimatedCost,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contentType: 'post',
    layers: DEFAULT_LAYERS,
    feedbackOptions: DEFAULT_FEEDBACK_OPTIONS,
  },
};

export const ArticleHighCost: Story = {
  args: {
    contentType: 'article',
    layers: DEFAULT_LAYERS.map((l: Layer) => ({
      ...l,
      enabled: ['initial-generation', 'professional-revision', 'seo-optimization', 'data-stacking', 'audience-review'].includes(l.id),
    })),
    feedbackOptions: DEFAULT_FEEDBACK_OPTIONS,
  },
};

export const MinimalCost: Story = {
  args: {
    contentType: 'story',
    layers: DEFAULT_LAYERS.map((l: Layer) => ({
      ...l,
      enabled: l.id === 'initial-generation',
    })),
    feedbackOptions: {
      ...DEFAULT_FEEDBACK_OPTIONS,
      enableThemeAlignment: false,
      enableAudienceReview: false,
      enablePainPointAnalysis: false,
      enableToneAnalysis: false,
      enableGoalAlignment: false,
    },
  },
};

export const AllFeaturesEnabled: Story = {
  args: {
    contentType: 'newsletter',
    layers: DEFAULT_LAYERS.map((l: Layer) => ({ ...l, enabled: true })),
    feedbackOptions: DEFAULT_FEEDBACK_OPTIONS,
  },
};
