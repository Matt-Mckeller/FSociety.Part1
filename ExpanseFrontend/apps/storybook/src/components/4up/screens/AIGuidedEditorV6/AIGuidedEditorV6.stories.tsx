import type { Meta, StoryObj } from '@storybook/react';
import { AIGuidedEditorV6 } from './AIGuidedEditorV6';
import type { AIFeedback, ContentVariation } from './types';

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
      onBrand: ['innovative', 'transform', 'solutions'],
      offBrand: ['basically', 'stuff'],
      suggested: ['leverage', 'optimize', 'accelerate'],
    },
    readabilityScore: 75,
  },
  themeAlignment: [
    { themeName: 'Innovation', themeType: 'core', weight: 0.9, alignmentScore: 88, description: '', keywords: [], usageInContent: [], suggestions: [] },
    { themeName: 'Trust', themeType: 'secondary', weight: 0.7, alignmentScore: 72, description: '', keywords: [], usageInContent: [], suggestions: [] },
  ],
  audienceReviews: [
    { audienceId: '1', audienceName: 'Tech Professionals', audienceType: 'persona', appealScore: 84, resonanceFactors: [], concerns: [], recommendations: [], sampleReaction: 'This speaks to my challenges with legacy systems.' },
    { audienceId: '2', audienceName: 'C-Suite Executives', audienceType: 'segment', appealScore: 76, resonanceFactors: [], concerns: [], recommendations: [], sampleReaction: 'I need more ROI data before considering.' },
  ],
  painPointAlignment: [
    { painPoint: 'Time-consuming manual processes', description: 'Addresses automation benefits', alignmentScore: 90, contentExcerpts: [], suggestions: [] },
    { painPoint: 'High operational costs', description: 'Could mention cost savings more explicitly', alignmentScore: 65, contentExcerpts: [], suggestions: [] },
  ],
};

const SAMPLE_VARIATIONS: ContentVariation[] = [
  {
    id: 'var-1',
    type: 'post',
    label: 'Original',
    icon: '📝',
    content: `🚀 Transform your business with AI-powered automation!\n\nTired of manual processes eating up your team's valuable time? Our platform helps you:\n\n✅ Automate repetitive tasks\n✅ Reduce operational costs by 40%\n✅ Free your team for strategic work\n\nJoin 500+ companies already seeing results.\n\n👉 Start your free trial today!`,
    layersApplied: ['initial-generation', 'professional-revision'],
    focusArea: 'engagement',
    style: 'balanced',
    score: 82,
    generatedAt: new Date(),
  },
  {
    id: 'var-2',
    type: 'post',
    label: 'Alternative A',
    icon: '📝',
    content: `The average knowledge worker spends 2.5 hours/day on repetitive tasks.\n\nThat's 30% of your workday. Gone.\n\nWe help companies reclaim that time with intelligent automation that:\n\n→ Learns from your workflows\n→ Integrates with existing tools\n→ Scales with your growth\n\nReady to give your team their time back?\n\n🔗 Link in bio for your free assessment.`,
    layersApplied: ['initial-generation', 'data-stacking'],
    focusArea: 'education',
    style: 'data-driven',
    score: 78,
    generatedAt: new Date(),
  },
  {
    id: 'var-3',
    type: 'post',
    label: 'Alternative B',
    icon: '📝',
    content: `"I used to dread Monday mornings."\n\n10 hours of data entry. Every. Single. Week.\n\nNow? That same work takes 12 minutes.\n\nNot because I work faster—because I don't do it at all.\n\nOur AI handles the mundane so you can focus on what matters.\n\nThe future of work isn't about working harder.\nIt's about working smarter.\n\n#Automation #FutureOfWork #AI`,
    layersApplied: ['initial-generation', 'emotional-resonance'],
    focusArea: 'storytelling',
    style: 'narrative',
    score: 85,
    generatedAt: new Date(),
  },
];

const meta: Meta<typeof AIGuidedEditorV6> = {
  title: 'Screens/AIGuidedEditorV6',
  component: AIGuidedEditorV6,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    initialContentType: {
      control: 'select',
      options: ['post', 'carousel', 'thread', 'article', 'video-script', 'reel-script', 'story', 'newsletter', 'ad-copy'],
    },
    isGenerating: { control: 'boolean' },
    isAnalyzing: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialContent: SAMPLE_VARIATIONS[0].content,
    initialContentType: 'post',
    feedback: SAMPLE_FEEDBACK,
    variations: SAMPLE_VARIATIONS,
    isGenerating: false,
  },
};

export const EmptyState: Story = {
  args: {
    initialContent: '',
    initialPrompt: 'Write a LinkedIn post about the benefits of AI automation for small businesses',
    initialContentType: 'post',
    feedback: SAMPLE_FEEDBACK,
    variations: [],
    isGenerating: false,
  },
};

export const Generating: Story = {
  args: {
    initialContent: SAMPLE_VARIATIONS[0].content,
    initialContentType: 'post',
    feedback: SAMPLE_FEEDBACK,
    variations: SAMPLE_VARIATIONS,
    isGenerating: true,
  },
};

export const ArticleType: Story = {
  args: {
    initialContent: `# The Future of AI in Business Automation

## Introduction

Artificial intelligence is revolutionizing how businesses operate. From customer service to supply chain management, AI-powered solutions are helping companies achieve unprecedented levels of efficiency and productivity.

## Key Benefits

### 1. Time Savings
Automation can reduce manual task time by up to 80%, freeing employees to focus on strategic work.

### 2. Cost Reduction
Companies report an average of 40% reduction in operational costs after implementing AI automation.

### 3. Improved Accuracy
AI systems consistently outperform humans in data-intensive tasks, reducing errors by up to 95%.

## Case Study: TechCorp Solutions

When TechCorp implemented our AI automation platform, they saw immediate results:
- Customer response time decreased from 24 hours to 15 minutes
- Data entry errors reduced by 98%
- Employee satisfaction increased by 35%

## Conclusion

The question isn't whether to adopt AI automation—it's when. Early adopters are already reaping the benefits while competitors struggle to keep up.

Ready to transform your business? [Start your free trial today]`,
    initialContentType: 'article',
    feedback: SAMPLE_FEEDBACK,
    variations: SAMPLE_VARIATIONS,
    isGenerating: false,
  },
};

export const CarouselType: Story = {
  args: {
    initialContent: `[Slide 1 - Hook]
🚀 5 Ways AI is Transforming Small Businesses in 2024

[Slide 2]
1. Automated Customer Support
24/7 response time without hiring more staff
→ Save up to $50,000/year

[Slide 3]
2. Smart Inventory Management
AI predicts demand and optimizes stock
→ Reduce waste by 30%

[Slide 4]
3. Personalized Marketing
Target the right customer at the right time
→ 3x higher conversion rates

[Slide 5]
4. Financial Forecasting
Accurate predictions for better planning
→ Make data-driven decisions

[Slide 6]
5. Process Automation
Eliminate repetitive manual tasks
→ Free up 10+ hours/week

[Slide 7 - CTA]
Ready to transform YOUR business?
👉 Link in bio for your free AI readiness assessment`,
    initialContentType: 'carousel',
    feedback: SAMPLE_FEEDBACK,
    variations: SAMPLE_VARIATIONS,
    isGenerating: false,
  },
};
