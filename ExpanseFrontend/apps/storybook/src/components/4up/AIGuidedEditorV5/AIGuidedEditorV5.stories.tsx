import type { Meta, StoryObj } from '@storybook/react';
import { AIGuidedEditorV5 } from './AIGuidedEditorV5';
import type { AIFeedback, ThemeAlignment, AudienceReview } from './types';
import { platforms } from '../../../mocks/4up/mockData';

const meta: Meta<typeof AIGuidedEditorV5> = {
  title: 'Components/AIGuidedEditorV5',
  component: AIGuidedEditorV5,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AI Guided Editor V5

Version 5 introduces:
- **Prompt Configuration Panel**: Collapsible config at top with guidelines, variation styles, and emoji usage
- **Theme/Purpose Alignment**: Shows top 3 core and secondary themes with usage excerpts
- **Audience Reviews**: Per-audience appeal scores with reactions and recommendations
- **Data Stacking**: Layered generation through multiple review phases
- **12 Content Intents**: Added recruitment, customer-success, and advocacy
- **Fixed text visibility**: Black text on light backgrounds
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============= SAMPLE THEME ALIGNMENT DATA =============

const sampleThemeAlignment: ThemeAlignment[] = [
  {
    themeName: 'Innovation & Progress',
    themeType: 'core',
    weight: 0.35,
    alignmentScore: 92,
    description: 'Driving forward with cutting-edge solutions and continuous improvement',
    keywords: ['innovative', 'forward-thinking', 'progress', 'breakthrough'],
    usageInContent: [
      'Our cutting-edge approach revolutionizes how businesses operate',
      'Breaking new ground with AI-powered solutions',
    ],
    suggestions: ['Consider adding a specific innovation example or case study'],
  },
  {
    themeName: 'Customer Empowerment',
    themeType: 'core',
    weight: 0.30,
    alignmentScore: 85,
    description: 'Enabling customers to achieve more with our tools and support',
    keywords: ['empower', 'enable', 'achieve', 'success'],
    usageInContent: [
      'Giving you the tools to take control of your content strategy',
      'Empowering teams to create at scale',
    ],
    suggestions: ['Add a testimonial or success metric'],
  },
  {
    themeName: 'Trust & Reliability',
    themeType: 'core',
    weight: 0.25,
    alignmentScore: 78,
    description: 'Building lasting relationships through consistent, dependable service',
    keywords: ['trust', 'reliable', 'consistent', 'dependable'],
    usageInContent: [
      'Trusted by over 10,000 businesses worldwide',
    ],
    suggestions: ['Include specific uptime or reliability stats', 'Add security certifications mention'],
  },
  {
    themeName: 'Simplicity & Ease',
    themeType: 'secondary',
    weight: 0.20,
    alignmentScore: 88,
    description: 'Making complex tasks simple and accessible to everyone',
    keywords: ['simple', 'easy', 'intuitive', 'accessible'],
    usageInContent: [
      'Get started in minutes, not hours',
      'No technical expertise required',
    ],
    suggestions: [],
  },
  {
    themeName: 'Data-Driven Decisions',
    themeType: 'secondary',
    weight: 0.15,
    alignmentScore: 72,
    description: 'Leveraging analytics and insights for smarter choices',
    keywords: ['data', 'analytics', 'insights', 'metrics'],
    usageInContent: [
      'Real-time analytics to track your content performance',
    ],
    suggestions: ['Add specific data points or metrics', 'Include a visualization mention'],
  },
  {
    themeName: 'Community & Collaboration',
    themeType: 'secondary',
    weight: 0.10,
    alignmentScore: 65,
    description: 'Building connections and fostering teamwork',
    keywords: ['community', 'together', 'collaborate', 'team'],
    usageInContent: [
      'Join thousands of creators in our community',
    ],
    suggestions: ['Mention community features or forums', 'Add collaboration use cases'],
  },
];

// ============= SAMPLE AUDIENCE REVIEWS =============

const sampleAudienceReviews: AudienceReview[] = [
  {
    audienceId: 'busy-professional',
    audienceName: 'Busy Professional',
    audienceType: 'persona',
    appealScore: 88,
    resonanceFactors: [
      'Time-saving messaging speaks directly to their pain point',
      'ROI-focused language matches their decision criteria',
      'Quick-start promise reduces perceived commitment',
    ],
    concerns: [
      'May want more specific time estimates',
      'Could benefit from integration mentions for their existing tools',
    ],
    recommendations: ['Add "5-minute setup" claim', 'Mention Slack/Teams integration'],
    sampleReaction: 'Finally, something that doesn\'t require a 3-hour onboarding. I can test this during my lunch break.',
  },
  {
    audienceId: 'skeptical-buyer',
    audienceName: 'Skeptical Buyer',
    audienceType: 'persona',
    appealScore: 72,
    resonanceFactors: [
      'Trust signals (10,000 businesses) provide social proof',
      'Specific features rather than vague promises',
    ],
    concerns: [
      'May want to see competitor comparisons',
      'Could be skeptical of "AI-powered" claims without evidence',
      'Might question the "free trial" - what\'s the catch?',
    ],
    recommendations: ['Add customer logos', 'Include a comparison chart', 'Be explicit about trial terms'],
    sampleReaction: 'The numbers sound good, but I\'d need to see case studies and talk to actual users before committing.',
  },
  {
    audienceId: 'early-adopter',
    audienceName: 'Early Adopter',
    audienceType: 'segment',
    appealScore: 95,
    resonanceFactors: [
      'Innovation language ("cutting-edge", "revolutionizes") is highly appealing',
      'AI-powered features are exciting to this audience',
      'Being ahead of the curve is a key motivator',
    ],
    concerns: [
      'May want more technical depth',
      'Could be curious about the technology stack',
    ],
    recommendations: ['Add a "How it works" link', 'Mention the AI model or technology'],
    sampleReaction: 'This looks like the next big thing in content creation. I want to be one of the first to master it!',
  },
  {
    audienceId: 'budget-conscious',
    audienceName: 'Budget Conscious',
    audienceType: 'segment',
    appealScore: 68,
    resonanceFactors: [
      'Free trial removes initial barrier',
      'Scale language implies good value proposition',
    ],
    concerns: [
      'No pricing information makes them wary',
      'Worried about hidden costs or limitations',
      'Want to understand what they get for free vs paid',
    ],
    recommendations: ['Add pricing transparency', 'Highlight free tier features', 'Include ROI calculator mention'],
    sampleReaction: 'Sounds interesting, but what\'s it going to cost me? I need to see pricing before I invest time.',
  },
];

// ============= SAMPLE FEEDBACK DATA =============

const sampleFeedback: AIFeedback = {
  overallScore: 85,
  goalAlignment: {
    overallScore: 88,
    goalBreakdown: [
      { goalName: 'Increase Brand Awareness', score: 92, reasoning: 'Strong brand messaging throughout', suggestions: ['Add brand hashtag'] },
      { goalName: 'Drive Engagement', score: 85, reasoning: 'Good hooks and CTAs', suggestions: ['Add a question to prompt discussion'] },
      { goalName: 'Generate Leads', score: 78, reasoning: 'CTA could be stronger', suggestions: ['Include a lead magnet offer', 'Add urgency element'] },
    ],
  },
  audienceMatch: {
    overallScore: 82,
    personaDetails: [
      { personaName: 'Marketing Manager', matchScore: 88, resonancePoints: ['ROI focus', 'Time savings'], gapAreas: ['Technical depth'] },
      { personaName: 'Startup Founder', matchScore: 85, resonancePoints: ['Scale messaging', 'Innovation'], gapAreas: ['Pricing clarity'] },
      { personaName: 'Content Creator', matchScore: 78, resonancePoints: ['Creative freedom'], gapAreas: ['Template examples'] },
    ],
  },
  toneAnalysis: {
    detectedTone: 'Professional yet approachable',
    matchScore: 87,
    brandVoiceAlignment: 84,
    toneBreakdown: [
      { aspect: 'Formality', detected: 'Balanced', expected: 'Balanced', match: true },
      { aspect: 'Enthusiasm', detected: 'High', expected: 'Moderate', match: false },
      { aspect: 'Authority', detected: 'Strong', expected: 'Strong', match: true },
    ],
    vocabularyAnalysis: {
      onBrand: ['innovative', 'empower', 'transform', 'seamless'],
      offBrand: ['disrupt', 'crush it'],
      suggested: ['elevate', 'streamline', 'unlock'],
    },
    readabilityScore: 72,
    sentimentAnalysis: {
      overall: 'positive',
      breakdown: [
        { emotion: 'confidence', percentage: 45 },
        { emotion: 'excitement', percentage: 30 },
        { emotion: 'trust', percentage: 25 },
      ],
    },
  },
  painPointAlignment: [
    {
      painPoint: 'Content Creation Takes Too Long',
      description: 'Teams spend hours creating content that could be automated',
      alignmentScore: 92,
      contentExcerpts: ['Create content 10x faster with AI assistance', 'What used to take hours now takes minutes'],
      suggestions: [],
    },
    {
      painPoint: 'Inconsistent Brand Voice',
      description: 'Different team members produce different quality and tone',
      alignmentScore: 85,
      contentExcerpts: ['Maintain consistent brand voice across all channels'],
      suggestions: ['Add example of voice consistency feature'],
    },
    {
      painPoint: 'Scaling Content is Expensive',
      description: 'Hiring more writers to increase output is costly',
      alignmentScore: 78,
      contentExcerpts: ['Scale your content production without scaling your team'],
      suggestions: ['Include specific cost savings or ROI numbers'],
    },
    {
      painPoint: 'Platform Optimization is Complex',
      description: 'Each platform has different requirements and best practices',
      alignmentScore: 70,
      contentExcerpts: ['Automatically optimize for each platform'],
      suggestions: ['List specific platforms supported', 'Show before/after example'],
    },
  ],
  themeAlignment: sampleThemeAlignment,
  audienceReviews: sampleAudienceReviews,
  intentScores: [
    { intent: 'brand-awareness', score: 88, reasoning: 'Strong brand positioning and value props' },
    { intent: 'lead-generation', score: 82, reasoning: 'Good CTA but could be more compelling' },
    { intent: 'educational', score: 75, reasoning: 'Explains benefits but could add more how-to' },
    { intent: 'engagement', score: 70, reasoning: 'Limited interactive elements' },
  ],
  platformRecommendations: [
    { platform: platforms[0], score: 92, reasoning: 'Perfect for professional B2B messaging', bestContentTypes: ['Article', 'Carousel'], weight: 40 },
    { platform: platforms[1], score: 85, reasoning: 'Great for quick tips and engagement', bestContentTypes: ['Thread', 'Single Tweet'], weight: 30 },
    { platform: platforms[2], score: 78, reasoning: 'Good for visual storytelling', bestContentTypes: ['Story', 'Reel'], weight: 20 },
    { platform: platforms[3], score: 65, reasoning: 'Suitable for community building', bestContentTypes: ['Post', 'Group Share'], weight: 10 },
  ],
  contentVariations: [
    {
      id: 'linkedin-article',
      type: 'long-form',
      label: 'LinkedIn Article',
      icon: '📝',
      content: `The Future of Content Creation is Here

In today's fast-paced digital landscape, content is king. But creating quality content consistently? That's where most businesses struggle.

I've spent the last decade helping companies scale their content operations, and I've never seen anything quite like what AI-powered content tools can do today.

Here's what's changed:
✅ Speed: What took a team of writers days now takes hours
✅ Consistency: Brand voice stays on-point across every piece
✅ Scale: Produce 10x more content without 10x the budget

The businesses that embrace this shift will win. Those that don't? They'll be playing catch-up for years.

Ready to transform your content strategy? Let's connect.

#ContentMarketing #AI #DigitalTransformation`,
      wordCount: 118,
      platforms: ['LinkedIn'],
    },
    {
      id: 'twitter-thread',
      type: 'thread',
      label: 'Twitter/X Thread',
      icon: '🧵',
      content: `🧵 The content creation landscape is changing FAST. Here's what you need to know:

1/ Speed matters more than ever. Your competitors are publishing daily. Can you keep up?

2/ AI isn't replacing writers—it's empowering them. Think of it as a creative co-pilot.

3/ The businesses winning at content right now all have one thing in common: they've automated the tedious stuff.

4/ Quality + Quantity is no longer a trade-off. You can have both.

5/ Want to see how? Check out how we helped @ExampleBrand 10x their output while improving engagement by 45%.

Follow for more content strategy insights 🚀`,
      wordCount: 95,
      platforms: ['Twitter/X'],
    },
  ],
  strengths: [
    'Strong value proposition clearly communicated',
    'Good use of social proof (10,000 businesses)',
    'Clear benefits-focused messaging',
    'Appropriate tone for target audience',
  ],
  improvements: [
    'Add more specific numbers and metrics',
    'Include a customer testimonial or quote',
    'Strengthen the call-to-action with urgency',
    'Add visual elements or formatting for better scanning',
  ],
};

// ============= STORIES =============

export const Default: Story = {
  args: {
    showFeedback: true,
    isAnalyzing: false,
    initialContent: `🚀 Transform Your Content Strategy with AI

Tired of spending hours on content that doesn't convert? 

Our AI-powered platform helps you:
✅ Create content 10x faster
✅ Maintain consistent brand voice
✅ Scale without scaling your team

Join 10,000+ businesses already revolutionizing their content workflow.

Start your free trial today → [Link]`,
    feedback: sampleFeedback,
  },
};

export const EmptyEditor: Story = {
  args: {
    showFeedback: false,
    isAnalyzing: false,
    initialContent: '',
  },
};

export const Analyzing: Story = {
  args: {
    showFeedback: true,
    isAnalyzing: true,
    initialContent: 'Analyzing this content...',
    feedback: sampleFeedback,
  },
};

export const WithPrompt: Story = {
  args: {
    showFeedback: true,
    isAnalyzing: false,
    initialPrompt: 'Write a LinkedIn post about the benefits of AI in content marketing. Target B2B marketers.',
    initialContent: `AI is revolutionizing how B2B marketers approach content creation.

Here's why you should pay attention:

1️⃣ Efficiency at Scale
No more bottlenecks. Create weeks worth of content in hours.

2️⃣ Data-Driven Optimization  
AI analyzes what works and adapts your content strategy automatically.

3️⃣ Personalization Power
Deliver the right message to the right audience, every time.

The future of marketing is here. Are you ready?

#B2BMarketing #AIMarketing #ContentStrategy`,
    feedback: sampleFeedback,
  },
};

export const WithInitialIntent: Story = {
  args: {
    showFeedback: true,
    isAnalyzing: false,
    initialIntent: 'thought-leadership',
    initialContent: `The next decade of content marketing will be defined by those who master the intersection of human creativity and AI capability.

I've spent 15 years in this industry, and I can tell you: the shift we're seeing now is unprecedented.

Here's my prediction:

By 2026, companies that haven't integrated AI into their content workflows will be operating at a 10x disadvantage.

Not because AI replaces human insight—but because it amplifies it.

The question isn't whether to adopt AI. It's how quickly you can make it your competitive advantage.

What's your take? Drop your thoughts below 👇`,
    feedback: sampleFeedback,
  },
};

export const RecruitmentIntent: Story = {
  args: {
    showFeedback: true,
    isAnalyzing: false,
    initialIntent: 'recruitment',
    initialContent: `🎯 We're Hiring: Senior Content Strategist

Ready to work on the cutting edge of AI-powered content?

What you'll do:
• Shape the voice of a fast-growing startup
• Lead content strategy across multiple channels
• Collaborate with product, design, and engineering

What we offer:
✨ Remote-first culture
💰 Competitive salary + equity
🚀 Work with the latest AI technology
🌴 Unlimited PTO

If you're passionate about content and excited about AI, we want to hear from you.

Apply now → [Link]

#Hiring #ContentJobs #RemoteWork`,
    feedback: {
      ...sampleFeedback,
      intentScores: [
        { intent: 'recruitment', score: 95, reasoning: 'Perfect job posting structure with clear benefits' },
        { intent: 'brand-awareness', score: 75, reasoning: 'Good company culture showcase' },
        ...sampleFeedback.intentScores.slice(2),
      ],
    },
  },
};
