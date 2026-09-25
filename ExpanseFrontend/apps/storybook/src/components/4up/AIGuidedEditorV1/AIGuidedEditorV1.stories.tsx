import type { Meta, StoryObj } from '@storybook/react';
import { AIGuidedEditorV1, type AIFeedbackV1 } from './AIGuidedEditorV1';
import { platforms } from '../../../mocks/4up/mockData';

const meta: Meta<typeof AIGuidedEditorV1> = {
  title: 'Generation/AIGuidedEditor V1 - Real-time Feedback',
  component: AIGuidedEditorV1,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    feedbackPosition: {
      control: 'select',
      options: ['side', 'bottom', 'overlay'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AIGuidedEditorV1>;

// Sample content for populated states
const sampleContent = `🚀 Excited to share our latest breakthrough in AI-powered content creation!

After months of research and development, our team has built a system that helps creators produce high-quality, engaging content 10x faster than before.

Key highlights:
✅ Real-time AI feedback as you write
✅ Goal alignment scoring
✅ Audience match predictions
✅ Multi-platform optimization

This is just the beginning. We're committed to empowering creators with tools that enhance creativity, not replace it.

What's your biggest challenge when creating content? Let me know in the comments! 👇

#ContentCreation #AI #Innovation #MarTech`;

// High-scoring feedback
const highScoreFeedback: AIFeedbackV1 = {
  goalAlignment: {
    score: 95,
    matchedGoals: ['Drive engagement', 'Build brand awareness', 'Thought leadership'],
    suggestions: ['Consider adding a specific metric or case study'],
  },
  audienceMatch: {
    score: 92,
    topPersonas: ['Tech Professionals', 'Marketing Leaders', 'Startup Founders'],
    insights: [
      'Excellent resonance with innovation-focused audience',
      'Strong appeal to decision makers',
      'Clear value proposition for target demographic',
    ],
  },
  toneAnalysis: {
    detectedTone: 'Enthusiastic & Professional',
    matchScore: 94,
    brandVoiceAlignment: 96,
  },
  platformOptimization: [
    { platform: 'LinkedIn', score: 98, tips: ['Perfect length and format for LinkedIn'] },
    { platform: 'Twitter', score: 78, tips: ['Consider a thread format for Twitter'] },
    { platform: 'Facebook', score: 85, tips: ['Add a link preview image'] },
  ],
  overallScore: 93,
  improvements: ['Add a direct link to learn more'],
  strengths: [
    'Compelling hook with emoji',
    'Clear structure with bullet points',
    'Strong call-to-action',
    'Effective use of hashtags',
    'Personal and authentic tone',
  ],
};

// Low-scoring feedback
const lowScoreFeedback: AIFeedbackV1 = {
  goalAlignment: {
    score: 42,
    matchedGoals: ['Build brand awareness'],
    suggestions: [
      'Add a clear call-to-action',
      'Connect content to specific business goals',
      'Include measurable outcomes or benefits',
      'Reference company values or mission',
    ],
  },
  audienceMatch: {
    score: 38,
    topPersonas: ['General Audience'],
    insights: [
      'Content too generic for target personas',
      'Missing pain points that resonate with audience',
      'No clear value proposition',
    ],
  },
  toneAnalysis: {
    detectedTone: 'Neutral & Generic',
    matchScore: 45,
    brandVoiceAlignment: 35,
  },
  platformOptimization: [
    { platform: 'LinkedIn', score: 40, tips: ['Too short for LinkedIn', 'Add professional insights', 'Include industry context'] },
    { platform: 'Twitter', score: 55, tips: ['Add relevant hashtags', 'Include a hook'] },
  ],
  overallScore: 41,
  improvements: [
    'Add a compelling opening hook',
    'Include specific details or examples',
    'End with a clear call-to-action',
    'Align with brand voice guidelines',
    'Add relevant hashtags for discovery',
    'Include a question to encourage engagement',
  ],
  strengths: ['Concise messaging'],
};

// Medium-scoring feedback  
const mediumScoreFeedback: AIFeedbackV1 = {
  goalAlignment: {
    score: 72,
    matchedGoals: ['Drive engagement', 'Build brand awareness'],
    suggestions: [
      'Add a more compelling call-to-action',
      'Include relevant hashtags',
    ],
  },
  audienceMatch: {
    score: 68,
    topPersonas: ['Tech Professionals', 'Early Adopters'],
    insights: [
      'Good resonance with tech-savvy audience',
      'Could better address specific pain points',
    ],
  },
  toneAnalysis: {
    detectedTone: 'Professional',
    matchScore: 75,
    brandVoiceAlignment: 70,
  },
  platformOptimization: [
    { platform: 'LinkedIn', score: 80, tips: ['Good length', 'Consider adding industry data'] },
    { platform: 'Twitter', score: 60, tips: ['Too long for optimal engagement'] },
  ],
  overallScore: 70,
  improvements: [
    'Add a question to boost engagement',
    'Include specific metrics or results',
    'Strengthen the opening hook',
  ],
  strengths: [
    'Clear messaging',
    'Professional tone',
    'Good structure',
  ],
};

/**
 * Default AI Guided Editor V1
 * 
 * The primary editing interface with side-by-side AI feedback panel.
 * Write content and get real-time analysis on goals, audience, and tone.
 * 
 * This is the simpler, direct-editing version focused on real-time feedback.
 */
export const Default: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * With Sample Content
 * 
 * Editor pre-populated with example content showing typical usage.
 */
export const WithContent: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2], platforms[3]], // LinkedIn, Twitter
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * High Score Feedback
 * 
 * Demonstrates the UI when content receives excellent AI ratings.
 * Shows mostly positive feedback with minimal improvement suggestions.
 */
export const HighScore: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2]], // LinkedIn
    feedback: highScoreFeedback,
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * Low Score Feedback
 * 
 * Demonstrates the UI when content needs significant improvement.
 * Shows more warnings and extensive improvement suggestions.
 */
export const LowScore: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: 'Check out our new product.',
    initialPlatforms: [platforms[2], platforms[3]],
    feedback: lowScoreFeedback,
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * Medium Score Feedback
 * 
 * Balanced feedback with room for improvement.
 */
export const MediumScore: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: `We're launching something new next week that we think you'll love.

Our team has been working hard on this project and we can't wait to share it with you.

Stay tuned for more updates!`,
    initialPlatforms: [platforms[2]],
    feedback: mediumScoreFeedback,
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * Analyzing State
 * 
 * Shows the loading/analyzing state when AI is processing content.
 */
export const Analyzing: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2]],
    isAnalyzing: true,
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * Feedback Hidden
 * 
 * Editor without the AI feedback panel visible.
 * Users can toggle it back on via the visibility button.
 */
export const FeedbackHidden: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2]],
    showFeedback: false,
    feedbackPosition: 'side',
  },
};

/**
 * Bottom Feedback Position
 * 
 * Alternative layout with feedback panel below the editor.
 * Better for narrower screens or user preference.
 */
export const FeedbackBottom: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2]],
    showFeedback: true,
    feedbackPosition: 'bottom',
  },
};

/**
 * Overlay Feedback Position
 * 
 * Floating feedback panel that doesn't take up editor width.
 * Good for maximizing editing space while keeping feedback accessible.
 */
export const FeedbackOverlay: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2]],
    showFeedback: true,
    feedbackPosition: 'overlay',
  },
};

/**
 * Mobile View
 * 
 * Responsive layout for mobile devices.
 */
export const Mobile: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[0]], // Instagram
    showFeedback: true,
    feedbackPosition: 'bottom',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Multiple Platforms Selected
 * 
 * Shows platform optimization feedback for multiple platforms.
 */
export const MultiplePlatforms: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[0], platforms[1], platforms[2], platforms[3]], // Instagram, TikTok, LinkedIn, Twitter
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * Empty State
 * 
 * Fresh editor with no content or platforms selected.
 */
export const Empty: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    showFeedback: true,
    feedbackPosition: 'side',
  },
};

/**
 * Without Back Button
 * 
 * Editor without navigation back button (embedded mode).
 */
export const WithoutBackButton: Story = {
  args: {
    onSubmit: (content, platforms) => console.log('Submit:', { content, platforms }),
    initialContent: sampleContent,
    initialPlatforms: [platforms[2]],
    showFeedback: true,
    feedbackPosition: 'side',
  },
};
