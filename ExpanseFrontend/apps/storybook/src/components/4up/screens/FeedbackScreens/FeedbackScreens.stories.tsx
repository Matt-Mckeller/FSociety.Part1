import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import {
  ScoreOverviewScreen,
  SectionExplorerScreen,
  ActionFirstScreen,
  SAMPLE_FEEDBACK,
  HIGH_SCORE_FEEDBACK,
  LOW_SCORE_FEEDBACK,
  PARTIAL_FEEDBACK,
  feedbackColors,
} from './index';

/**
 * Three independent AI feedback screen variations for 4up.
 * Existing AIGuidedEditor V1–V6 feedback panels are left unchanged.
 *
 * Product feedback types (create-content): Goal Alignment, Audience Match,
 * Platform Optimization, Tone Analysis, Improvement Tips.
 */
const meta: Meta = {
  title: 'Screens/FeedbackScreens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'New feedback screen module with three design variations.',
          'A = Score overview (glanceable).',
          'B = Section explorer (deep dive, simple/advanced).',
          'C = Action-first (tips drive edits; ratings opt-in).',
        ].join(' '),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const ScreenFrame = ({
  children,
  label,
  width = 420,
}: {
  children: ReactNode;
  label?: string;
  width?: number | string;
}) => (
  <Box sx={{ width, maxWidth: '100%' }}>
    {label && (
      <Typography
        variant="overline"
        sx={{
          display: 'block',
          mb: 1,
          color: feedbackColors.text.secondary,
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        {label}
      </Typography>
    )}
    {children}
  </Box>
);

const Page = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      minHeight: '100vh',
      bgcolor: feedbackColors.background,
      backgroundImage:
        'radial-gradient(ellipse at top, rgba(15,118,110,0.06), transparent 55%), linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
      p: { xs: 2, md: 3 },
    }}
  >
    {children}
  </Box>
);

export const CompareAllThree: Story = {
  name: 'Compare All Three',
  render: () => (
    <Page>
      <Typography
        variant="h5"
        fontWeight={700}
        color={feedbackColors.text.primary}
        sx={{ mb: 0.5 }}
      >
        Feedback screen variations
      </Typography>
      <Typography variant="body2" color={feedbackColors.text.secondary} sx={{ mb: 3, maxWidth: 720 }}>
        Same ContentFeedback fixture across three information architectures. Use this story for
        design review.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 3,
          alignItems: 'start',
        }}
      >
        <ScreenFrame label="A · Score overview" width="100%">
          <ScoreOverviewScreen feedback={SAMPLE_FEEDBACK} />
        </ScreenFrame>
        <ScreenFrame label="B · Section explorer" width="100%">
          <SectionExplorerScreen feedback={SAMPLE_FEEDBACK} />
        </ScreenFrame>
        <ScreenFrame label="C · Action-first" width="100%">
          <ActionFirstScreen feedback={SAMPLE_FEEDBACK} />
        </ScreenFrame>
      </Box>
    </Page>
  ),
};

export const VariationA_Default: Story = {
  name: 'Variation A / Default',
  render: () => (
    <Page>
      <ScreenFrame>
        <ScoreOverviewScreen feedback={SAMPLE_FEEDBACK} />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationA_HighScore: Story = {
  name: 'Variation A / High Score',
  render: () => (
    <Page>
      <ScreenFrame>
        <ScoreOverviewScreen feedback={HIGH_SCORE_FEEDBACK} />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationA_LowScore: Story = {
  name: 'Variation A / Low Score',
  render: () => (
    <Page>
      <ScreenFrame>
        <ScoreOverviewScreen feedback={LOW_SCORE_FEEDBACK} />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationA_Analyzing: Story = {
  name: 'Variation A / Analyzing',
  render: () => (
    <Page>
      <ScreenFrame>
        <ScoreOverviewScreen feedback={SAMPLE_FEEDBACK} status="analyzing" />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_Default: Story = {
  name: 'Variation B / Default',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen feedback={SAMPLE_FEEDBACK} />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_Goals: Story = {
  name: 'Variation B / Goals',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen
          feedback={SAMPLE_FEEDBACK}
          initialSection="goals"
          initialViewMode="advanced"
        />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_Audience: Story = {
  name: 'Variation B / Audience',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen
          feedback={SAMPLE_FEEDBACK}
          initialSection="audience"
          initialViewMode="advanced"
        />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_Platforms: Story = {
  name: 'Variation B / Platforms',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen
          feedback={SAMPLE_FEEDBACK}
          initialSection="platforms"
          initialViewMode="advanced"
        />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_Tone: Story = {
  name: 'Variation B / Tone',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen
          feedback={SAMPLE_FEEDBACK}
          initialSection="tone"
          initialViewMode="advanced"
        />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_Advanced: Story = {
  name: 'Variation B / Advanced',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen
          feedback={SAMPLE_FEEDBACK}
          initialSection="overview"
          initialViewMode="advanced"
        />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationB_PartialData: Story = {
  name: 'Variation B / Partial Data',
  render: () => (
    <Page>
      <ScreenFrame width={480}>
        <SectionExplorerScreen feedback={PARTIAL_FEEDBACK} initialSection="audience" />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationC_Default: Story = {
  name: 'Variation C / Default',
  render: () => (
    <Page>
      <ScreenFrame width={460}>
        <ActionFirstScreen feedback={SAMPLE_FEEDBACK} />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationC_RatingsVisible: Story = {
  name: 'Variation C / Ratings Visible',
  render: () => (
    <Page>
      <ScreenFrame width={460}>
        <ActionFirstScreen feedback={SAMPLE_FEEDBACK} initialShowRatings />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationC_Analyzing: Story = {
  name: 'Variation C / Analyzing',
  render: () => (
    <Page>
      <ScreenFrame width={460}>
        <ActionFirstScreen feedback={SAMPLE_FEEDBACK} status="analyzing" />
      </ScreenFrame>
    </Page>
  ),
};

export const VariationC_LowScore: Story = {
  name: 'Variation C / Low Score',
  render: () => (
    <Page>
      <ScreenFrame width={460}>
        <ActionFirstScreen feedback={LOW_SCORE_FEEDBACK} />
      </ScreenFrame>
    </Page>
  ),
};
