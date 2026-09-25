import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { FeedbackPanel } from '../components';
import { lightColors } from '../constants';
import type { AIFeedback, FeedbackOptions } from '../types';

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ bgcolor: lightColors.background, p: 3, minHeight: '100vh' }}>
    <Box sx={{ maxWidth: 450, mx: 'auto' }}>{children}</Box>
  </Box>
);

const SAMPLE_FEEDBACK: AIFeedback = {
  overallScore: 82,
  strengths: [
    'Clear value proposition communicated effectively',
    'Engaging opening hook captures attention',
    'Strong call-to-action placement',
  ],
  improvements: [
    'Consider adding more specific metrics or data points',
    'Could include a customer testimonial or social proof',
    'Shorten the middle section for better readability',
  ],
  goalAlignment: {
    overallScore: 78,
    goalBreakdown: [
      { goalName: 'Lead Generation', score: 85, reasoning: 'Strong CTA drives conversions', suggestions: [] },
      { goalName: 'Brand Awareness', score: 72, reasoning: 'Good messaging but limited reach factors', suggestions: [] },
      { goalName: 'Thought Leadership', score: 68, reasoning: 'Could use more unique insights', suggestions: [] },
    ],
  },
  toneAnalysis: {
    detectedTone: 'Professional, Confident',
    matchScore: 86,
    brandVoiceAlignment: 80,
    toneBreakdown: [
      { aspect: 'Formality', detected: 'Professional', expected: 'Professional', match: true },
      { aspect: 'Energy', detected: 'Confident', expected: 'Energetic', match: false },
    ],
    vocabularyAnalysis: {
      onBrand: ['innovative', 'transform', 'solutions', 'empower', 'accelerate'],
      offBrand: ['basically', 'stuff'],
      suggested: ['leverage', 'optimize', 'streamline'],
    },
    readabilityScore: 75,
  },
  themeAlignment: [
    { themeName: 'Innovation', themeType: 'core', weight: 0.9, alignmentScore: 88, description: 'Focus on new solutions', keywords: ['AI', 'automation'], usageInContent: ['AI-powered automation'], suggestions: [] },
    { themeName: 'Efficiency', themeType: 'core', weight: 0.85, alignmentScore: 82, description: 'Time and cost savings', keywords: ['save', 'reduce'], usageInContent: ['reduce costs by 40%'], suggestions: [] },
    { themeName: 'Trust', themeType: 'secondary', weight: 0.7, alignmentScore: 72, description: 'Building credibility', keywords: ['proven', 'trusted'], usageInContent: ['500+ companies'], suggestions: [] },
    { themeName: 'Growth', themeType: 'secondary', weight: 0.6, alignmentScore: 65, description: 'Business expansion', keywords: ['scale', 'grow'], usageInContent: [], suggestions: ['Add growth-focused messaging'] },
  ],
  audienceReviews: [
    { audienceId: '1', audienceName: 'Tech Professionals', audienceType: 'persona', appealScore: 84, resonanceFactors: ['Technical benefits clear'], concerns: ['Needs more specifics'], recommendations: [], sampleReaction: 'This speaks to my challenges with legacy systems.' },
    { audienceId: '2', audienceName: 'C-Suite Executives', audienceType: 'segment', appealScore: 76, resonanceFactors: ['ROI mentioned'], concerns: ['Need concrete numbers'], recommendations: [], sampleReaction: 'I need more ROI data before considering.' },
    { audienceId: '3', audienceName: 'Small Business Owners', audienceType: 'demographic', appealScore: 71, resonanceFactors: ['Cost savings appealing'], concerns: ['Implementation concerns'], recommendations: [], sampleReaction: 'Sounds good but worried about complexity.' },
  ],
  painPointAlignment: [
    { painPoint: 'Time-consuming manual processes', description: 'Addresses automation benefits', alignmentScore: 90, contentExcerpts: ['Automate repetitive tasks'], suggestions: [] },
    { painPoint: 'High operational costs', description: 'Could mention cost savings more explicitly', alignmentScore: 65, contentExcerpts: ['Reduce costs by 40%'], suggestions: ['Add specific dollar amounts'] },
    { painPoint: 'Difficulty scaling operations', description: 'Not directly addressed', alignmentScore: 45, contentExcerpts: [], suggestions: ['Mention scalability benefits'] },
  ],
};

const DEFAULT_FEEDBACK_OPTIONS: FeedbackOptions = {
  enableThemeAlignment: true,
  enableAudienceReview: true,
  enablePainPointAnalysis: true,
  enableToneAnalysis: true,
  enableGoalAlignment: true,
  selectedAudiences: [],
};

const meta: Meta<typeof FeedbackPanel> = {
  title: 'Screens/AIGuidedEditorV6/Components/FeedbackPanel',
  component: FeedbackPanel,
  decorators: [(Story) => <ComponentWrapper><Story /></ComponentWrapper>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Component = () => {
      const [options, setOptions] = React.useState<FeedbackOptions>(DEFAULT_FEEDBACK_OPTIONS);
      return (
        <FeedbackPanel
          feedback={SAMPLE_FEEDBACK}
          feedbackOptions={options}
          onFeedbackOptionsChange={setOptions}
        />
      );
    };
    return <Component />;
  },
};

export const HighScore: Story = {
  render: () => {
    const Component = () => {
      const [options, setOptions] = React.useState<FeedbackOptions>(DEFAULT_FEEDBACK_OPTIONS);
      const highScoreFeedback: AIFeedback = {
        ...SAMPLE_FEEDBACK,
        overallScore: 95,
        goalAlignment: { ...SAMPLE_FEEDBACK.goalAlignment!, overallScore: 92 },
        toneAnalysis: { ...SAMPLE_FEEDBACK.toneAnalysis!, matchScore: 94, brandVoiceAlignment: 91 },
      };
      return (
        <FeedbackPanel
          feedback={highScoreFeedback}
          feedbackOptions={options}
          onFeedbackOptionsChange={setOptions}
        />
      );
    };
    return <Component />;
  },
};

export const LowScore: Story = {
  render: () => {
    const Component = () => {
      const [options, setOptions] = React.useState<FeedbackOptions>(DEFAULT_FEEDBACK_OPTIONS);
      const lowScoreFeedback: AIFeedback = {
        ...SAMPLE_FEEDBACK,
        overallScore: 45,
        goalAlignment: { ...SAMPLE_FEEDBACK.goalAlignment!, overallScore: 38 },
        toneAnalysis: { ...SAMPLE_FEEDBACK.toneAnalysis!, matchScore: 42, brandVoiceAlignment: 35 },
      };
      return (
        <FeedbackPanel
          feedback={lowScoreFeedback}
          feedbackOptions={options}
          onFeedbackOptionsChange={setOptions}
        />
      );
    };
    return <Component />;
  },
};

export const MinimalFeedbackOptions: Story = {
  render: () => {
    const Component = () => {
      const [options, setOptions] = React.useState<FeedbackOptions>({
        ...DEFAULT_FEEDBACK_OPTIONS,
        enableThemeAlignment: false,
        enableAudienceReview: false,
        enablePainPointAnalysis: false,
      });
      return (
        <FeedbackPanel
          feedback={SAMPLE_FEEDBACK}
          feedbackOptions={options}
          onFeedbackOptionsChange={setOptions}
        />
      );
    };
    return <Component />;
  },
};
