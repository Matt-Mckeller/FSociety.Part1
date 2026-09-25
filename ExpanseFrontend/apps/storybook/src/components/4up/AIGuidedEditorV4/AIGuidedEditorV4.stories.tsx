import type { Meta, StoryObj } from '@storybook/react';
import { AIGuidedEditorV4 } from './AIGuidedEditorV4';
import type { 
  AIFeedback, 
  ContentVariation, 
  PlatformRecommendation, 
  IntentScores, 
  ContentIntent,
  PainPointAlignment,
  GoalAlignmentAdvanced,
  AudienceMatchAdvanced,
  ToneAnalysisAdvanced,
} from './types';
import { platforms, type Platform } from '../../../mocks/4up/mockData';
import ArticleIcon from '@mui/icons-material/Article';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// Typed submit handler
const handleSubmit = (
  content: string, 
  platforms: Platform[], 
  variations: ContentVariation[],
  selectedIntent: ContentIntent | null
) => {
  console.log('Submit:', { content, platforms, variations, selectedIntent });
};

const meta: Meta<typeof AIGuidedEditorV4> = {
  title: 'Generation/AIGuidedEditor V4',
  component: AIGuidedEditorV4,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AIGuidedEditorV4>;

// ============= SAMPLE DATA =============

const samplePrompt = `Share our new AI content tool that helps creators work 10x faster. Focus on how it provides real-time feedback and multi-platform optimization. Target tech-savvy professionals and marketing leaders.`;

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

// ============= INTENT SCORES (with new intents) =============

const intentScores: IntentScores[] = [
  {
    intent: 'educational',
    score: 72,
    strengths: ['Clear explanation of features', 'Step-by-step benefits listed'],
    improvements: ['Add more how-to details', 'Include specific examples'],
    tips: [
      'Break down complex concepts into digestible points',
      'Use numbered lists for sequential information',
      'Include "Did you know?" facts to boost engagement',
    ],
  },
  {
    intent: 'lead-generation',
    score: 65,
    strengths: ['Clear value proposition', 'Mentions specific benefits'],
    improvements: ['Add stronger CTA', 'Include link or next step'],
    tips: [
      'End with a clear call-to-action (link, signup, DM)',
      'Mention limited availability or exclusive access',
      'Use social proof like user numbers',
    ],
  },
  {
    intent: 'sales',
    score: 58,
    strengths: ['Product features highlighted', 'Value proposition clear'],
    improvements: ['Add pricing/offer info', 'Create urgency', 'Include testimonials'],
    tips: [
      'Highlight ROI and cost savings',
      'Use limited-time offers',
      'Include customer success stories',
      'Add clear purchase/trial CTA',
    ],
  },
  {
    intent: 'conversion',
    score: 62,
    strengths: ['Benefits clearly stated', 'Addresses pain points'],
    improvements: ['Simplify next steps', 'Reduce friction points', 'Add guarantees'],
    tips: [
      'Make the next step crystal clear',
      'Address common objections proactively',
      'Use risk-reversal (money-back, free trial)',
      'Show before/after transformations',
    ],
  },
  {
    intent: 'retention',
    score: 70,
    strengths: ['Shows ongoing value', 'Community focused language'],
    improvements: ['Highlight loyalty benefits', 'Reference shared history'],
    tips: [
      'Celebrate customer milestones',
      'Offer exclusive insider content',
      'Create VIP/loyalty program mentions',
      'Ask for feedback to show you care',
    ],
  },
  {
    intent: 'engagement',
    score: 88,
    strengths: ['Ends with a question', 'Uses emojis effectively', 'Conversational tone'],
    improvements: ['Consider adding a poll', 'Ask more specific questions'],
    tips: [
      'Ask open-ended questions that invite sharing',
      'Use "This or That" format for easy responses',
      'Respond to comments quickly to boost algorithm',
    ],
  },
  {
    intent: 'brand-awareness',
    score: 82,
    strengths: ['Showcases company innovation', 'Uses branded hashtags'],
    improvements: ['Add company name mention', 'Include visual brand elements'],
    tips: [
      'Consistently use brand voice and terminology',
      'Tag relevant industry accounts for visibility',
      'Share behind-the-scenes content',
    ],
  },
  {
    intent: 'thought-leadership',
    score: 78,
    strengths: ['Shows expertise in AI/content space', 'Forward-looking perspective'],
    improvements: ['Add industry insights or data', 'Reference trends'],
    tips: [
      'Share unique perspectives or predictions',
      'Reference industry reports or studies',
      'Take a stance on controversial topics',
    ],
  },
  {
    intent: 'community-building',
    score: 70,
    strengths: ['Invites conversation', 'Uses inclusive language'],
    improvements: ['Acknowledge community members', 'Create shared experiences'],
    tips: [
      'Celebrate community wins and milestones',
      'Share user-generated content',
      'Create community-specific references',
    ],
  },
];

// ============= PAIN POINTS ALIGNMENT =============

const painPointAlignment: PainPointAlignment[] = [
  {
    painPoint: 'Time-consuming content creation',
    description: 'Creators spend 4-6 hours per piece of content, limiting output and growth',
    alignmentScore: 92,
    contentExcerpts: [
      'helps creators produce high-quality, engaging content 10x faster',
      'Real-time AI feedback as you write',
    ],
    suggestions: [
      'Include specific time savings ("30 minutes vs 3 hours")',
    ],
  },
  {
    painPoint: 'Inconsistent quality across platforms',
    description: 'Difficulty maintaining quality when adapting content for different channels',
    alignmentScore: 78,
    contentExcerpts: [
      'Multi-platform optimization',
    ],
    suggestions: [
      'Show examples of platform-specific adaptations',
      'Mention specific platforms supported',
    ],
  },
  {
    painPoint: 'Lack of feedback before publishing',
    description: 'No way to know if content will resonate until after it\'s posted',
    alignmentScore: 85,
    contentExcerpts: [
      'Real-time AI feedback as you write',
      'Goal alignment scoring',
      'Audience match predictions',
    ],
    suggestions: [
      'Add specific metrics or accuracy rates',
    ],
  },
  {
    painPoint: 'Difficulty maintaining brand voice',
    description: 'Struggle to keep consistent tone across different content types',
    alignmentScore: 45,
    contentExcerpts: [],
    suggestions: [
      'Mention brand voice analysis feature',
      'Add example of tone consistency checking',
      'Reference customizable brand guidelines',
    ],
  },
  {
    painPoint: 'Content planning overwhelm',
    description: 'Hard to plan and organize content calendar effectively',
    alignmentScore: 25,
    contentExcerpts: [],
    suggestions: [
      'This pain point is not addressed - consider mentioning planning features if available',
    ],
  },
];

// ============= GOAL ALIGNMENT ADVANCED =============

const goalAlignmentAdvanced: GoalAlignmentAdvanced = {
  score: 82,
  matchedGoals: ['Drive engagement', 'Build brand awareness', 'Thought leadership'],
  suggestions: ['Add specific metrics for more credibility', 'Include a direct link or CTA'],
  goalBreakdown: [
    {
      goal: 'Drive engagement',
      alignmentPercent: 92,
      keyPhrases: ['Let me know in the comments', 'What\'s your biggest challenge', 'excited to share'],
      recommendation: 'Strong engagement hooks present. Consider adding a specific question format like "Option A or B?"',
    },
    {
      goal: 'Build brand awareness',
      alignmentPercent: 85,
      keyPhrases: ['our team has built', 'We\'re committed', '#ContentCreation #AI'],
      recommendation: 'Good brand presence. Add company handle/tag for better attribution.',
    },
    {
      goal: 'Thought leadership',
      alignmentPercent: 78,
      keyPhrases: ['breakthrough', 'innovation', 'enhance creativity'],
      recommendation: 'Position strengthened by adding industry statistics or research references.',
    },
    {
      goal: 'Generate leads',
      alignmentPercent: 55,
      keyPhrases: [],
      recommendation: 'Missing clear CTA for lead capture. Add link, signup, or "DM for access" prompt.',
    },
  ],
  missingGoals: ['Direct conversion', 'Product trial signup'],
  priorityActions: [
    'Add a clear call-to-action with link or signup prompt',
    'Include 1-2 specific metrics or case study results',
    'Mention company/product name explicitly',
  ],
};

// ============= AUDIENCE MATCH ADVANCED =============

const audienceMatchAdvanced: AudienceMatchAdvanced = {
  score: 88,
  topPersonas: ['Tech Professionals', 'Marketing Leaders', 'Content Creators'],
  insights: ['Strong appeal to innovation-focused audience', 'Professional tone resonates with decision makers'],
  personaDetails: [
    {
      name: 'Tech Professionals',
      matchScore: 92,
      resonatingElements: ['AI-powered', 'innovation', '10x faster', 'real-time feedback'],
      missingElements: ['Technical specifications', 'Integration details'],
      demographicFit: 'Ages 28-45, Tech industry, Early adopters',
    },
    {
      name: 'Marketing Leaders',
      matchScore: 88,
      resonatingElements: ['content creation', 'multi-platform', 'efficiency'],
      missingElements: ['ROI metrics', 'Team collaboration features'],
      demographicFit: 'Ages 32-50, Marketing/Agency, Director+',
    },
    {
      name: 'Content Creators',
      matchScore: 85,
      resonatingElements: ['10x faster', 'enhance creativity', 'high-quality content'],
      missingElements: ['Pricing transparency', 'Creative control assurance'],
      demographicFit: 'Ages 22-40, Freelance/Agency, Active on social',
    },
  ],
  audienceGaps: [
    'Small business owners may find messaging too tech-focused',
    'Non-English speakers not addressed',
  ],
  toneRecommendations: [
    'Consider adding accessibility language for broader reach',
    'Include beginner-friendly messaging for non-tech audience',
  ],
};

// ============= TONE ANALYSIS ADVANCED =============

const toneAnalysisAdvanced: ToneAnalysisAdvanced = {
  detectedTone: 'Professional & Enthusiastic',
  matchScore: 90,
  brandVoiceAlignment: 85,
  toneBreakdown: [
    { aspect: 'Formality', detected: 'Semi-formal', expected: 'Semi-formal', match: true },
    { aspect: 'Energy', detected: 'High enthusiasm', expected: 'Moderate-high', match: true },
    { aspect: 'Technical level', detected: 'Moderate', expected: 'Moderate', match: true },
    { aspect: 'Emotional appeal', detected: 'Inspirational', expected: 'Practical', match: false },
  ],
  vocabularyAnalysis: {
    onBrand: ['innovative', 'empowering', 'breakthrough', 'creators', 'high-quality'],
    offBrand: ['excited', 'amazing'],
    suggested: ['transform', 'streamline', 'elevate', 'precision', 'intelligent'],
  },
  readabilityScore: 72,
  sentimentAnalysis: {
    overall: 'positive',
    breakdown: [
      { emotion: 'Excitement', percentage: 45 },
      { emotion: 'Confidence', percentage: 35 },
      { emotion: 'Curiosity', percentage: 15 },
      { emotion: 'Urgency', percentage: 5 },
    ],
  },
};

// ============= PLATFORM RECOMMENDATIONS =============

const platformRecommendations: PlatformRecommendation[] = [
  {
    platform: platforms[2], // LinkedIn
    score: 95,
    weight: 100,
    reasoning: 'Professional tone and business insights align perfectly with LinkedIn audience.',
    bestContentTypes: ['Post', 'Article', 'Carousel'],
  },
  {
    platform: platforms[3], // Twitter
    score: 78,
    weight: 70,
    reasoning: 'Good for thought leadership, consider breaking into a thread.',
    bestContentTypes: ['Thread', 'Post'],
  },
  {
    platform: platforms[0], // Instagram
    score: 65,
    weight: 50,
    reasoning: 'Would need visual adaptation, carousel format recommended.',
    bestContentTypes: ['Carousel', 'Reel'],
  },
  {
    platform: platforms[4], // Facebook
    score: 72,
    weight: 60,
    reasoning: 'Good engagement potential with minor adjustments.',
    bestContentTypes: ['Post', 'Video'],
  },
  {
    platform: platforms[1], // TikTok
    score: 45,
    weight: 30,
    reasoning: 'Would require significant adaptation for short-form video.',
    bestContentTypes: ['Short Video'],
  },
];

// ============= CONTENT VARIATIONS =============

const contentVariations: ContentVariation[] = [
  {
    id: 'original',
    type: 'post',
    label: 'Original Post',
    icon: <ArticleIcon />,
    content: sampleContent,
    wordCount: 89,
    platforms: ['LinkedIn', 'Facebook'],
  },
  {
    id: 'video-script-short',
    type: 'video-script',
    label: 'Short Video Script (60s)',
    icon: <VideocamIcon />,
    content: `[HOOK - 0:00-0:03]
"What if you could create content 10x faster?"

[PROBLEM - 0:03-0:12]
Creating quality content is exhausting. You spend hours writing, editing, second-guessing...

[SOLUTION - 0:12-0:30]
That's why we built something different. An AI system that gives you real-time feedback.

[CTA - 0:52-0:60]
Drop a comment below and I'll show you how it works.`,
    estimatedDuration: '60 seconds',
    wordCount: 65,
    platforms: ['TikTok', 'Instagram Reels'],
  },
  {
    id: 'carousel',
    type: 'carousel',
    label: 'Carousel (5 slides)',
    icon: <ImageIcon />,
    content: `SLIDE 1 (HOOK):
"Create Content 10x Faster"

SLIDE 2 (PROBLEM):
The content creation struggle...

SLIDE 3 (SOLUTION):
Introducing AI-powered feedback

SLIDE 4 (PROOF):
Early results: 10x faster, 40% more engagement

SLIDE 5 (CTA):
Comment "AI" below 👇`,
    wordCount: 45,
    platforms: ['Instagram', 'LinkedIn'],
  },
  {
    id: 'thread',
    type: 'thread',
    label: 'Twitter/X Thread',
    icon: <FormatListBulletedIcon />,
    content: `1/ 🧵 We just built something that helps you create content 10x faster.

2/ The problem: Content creation is exhausting.

3/ We asked: What if AI could give you real-time feedback?

4/ Here's what our system does:
✅ Scores goal alignment
✅ Predicts audience match
✅ Optimizes for each platform

5/ Want early access? Drop a "🚀" below!`,
    wordCount: 65,
    platforms: ['Twitter/X', 'Threads'],
  },
];

// ============= FULL FEEDBACK OBJECT =============

const standardFeedback: AIFeedback = {
  goalAlignment: goalAlignmentAdvanced,
  audienceMatch: audienceMatchAdvanced,
  toneAnalysis: toneAnalysisAdvanced,
  painPointAlignment,
  intentScores,
  platformRecommendations,
  contentVariations,
  overallScore: 85,
  improvements: [
    'Include specific data points or case study',
    'Add a direct link or stronger CTA',
    'Mention brand voice consistency features',
  ],
  strengths: [
    'Clear value proposition',
    'Strong hook with emoji',
    'Good use of bullet points',
    'Engaging call-to-action question',
    'Addresses key pain point (time savings)',
    'Professional yet approachable tone',
  ],
};

// ============= STORIES =============

/**
 * Content Generated - Full View
 * 
 * Main editing view with all feedback panels and new intent chips.
 * This is the primary design focus.
 */
export const ContentGenerated: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    initialIntent: 'engagement',
    feedback: standardFeedback,
    showFeedback: true,
  },
};

/**
 * All Intent Chips Displayed
 * 
 * Shows all 9 intent chips including new Sales, Conversion, Retention.
 */
export const AllIntentChips: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    initialIntent: 'sales',
    feedback: standardFeedback,
    showFeedback: true,
  },
};

/**
 * High Score Content
 * 
 * Content with excellent scores across all categories.
 */
export const HighScore: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    initialIntent: 'engagement',
    feedback: {
      ...standardFeedback,
      overallScore: 94,
      goalAlignment: { ...standardFeedback.goalAlignment, score: 96 },
      audienceMatch: { ...standardFeedback.audienceMatch, score: 92 },
      toneAnalysis: { ...standardFeedback.toneAnalysis, matchScore: 95 },
    },
    showFeedback: true,
  },
};

/**
 * Low Score - Needs Improvement
 * 
 * Content that needs significant work.
 */
export const LowScore: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: 'Just launched our new product. Check it out.',
    initialIntent: 'sales',
    feedback: {
      ...standardFeedback,
      overallScore: 45,
      goalAlignment: { ...standardFeedback.goalAlignment, score: 38 },
      audienceMatch: { ...standardFeedback.audienceMatch, score: 42 },
      toneAnalysis: { ...standardFeedback.toneAnalysis, matchScore: 55 },
      improvements: [
        'Content is too short for meaningful engagement',
        'No value proposition or benefits mentioned',
        'Missing call-to-action or next steps',
        'No emotional hooks or storytelling',
        'Lacks platform-specific optimization',
      ],
      strengths: ['Brief and direct'],
    },
    showFeedback: true,
  },
};

/**
 * Analyzing State
 * 
 * Shows loading state during AI analysis.
 */
export const Analyzing: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    initialIntent: 'engagement',
    feedback: standardFeedback,
    isAnalyzing: true,
    showFeedback: true,
  },
};

/**
 * Mobile View
 * 
 * Responsive mobile layout.
 */
export const Mobile: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    initialIntent: 'engagement',
    feedback: standardFeedback,
    showFeedback: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
