import type { Meta, StoryObj } from '@storybook/react';
import { AIGuidedEditor } from './AIGuidedEditor';
import type { AIFeedback, ContentVariation, PlatformRecommendation } from './AIGuidedEditor';
import { platforms, type Platform } from '../../../mocks/4up/mockData';
import ArticleIcon from '@mui/icons-material/Article';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// Typed submit handler
const handleSubmit = (content: string, platforms: Platform[], variations: ContentVariation[]) => {
  console.log('Submit:', { content, platforms, variations });
};

const meta: Meta<typeof AIGuidedEditor> = {
  title: 'Generation/AIGuidedEditor V2 - Prompt & Variations',
  component: AIGuidedEditor,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AIGuidedEditor>;

// Sample prompt
const samplePrompt = `Share our new AI content tool that helps creators work 10x faster. Focus on how it provides real-time feedback and multi-platform optimization. Target tech-savvy professionals and marketing leaders.`;

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

// Platform recommendations
const standardPlatformRecs: PlatformRecommendation[] = [
  {
    platform: platforms[2], // LinkedIn
    score: 95,
    weight: 100,
    reasoning: 'Professional tone and business insights align perfectly with LinkedIn audience',
    bestContentTypes: ['Post', 'Article', 'Carousel'],
  },
  {
    platform: platforms[3], // Twitter
    score: 78,
    weight: 70,
    reasoning: 'Good for thought leadership, consider breaking into a thread',
    bestContentTypes: ['Thread', 'Post'],
  },
  {
    platform: platforms[0], // Instagram
    score: 65,
    weight: 50,
    reasoning: 'Would need visual adaptation, carousel format recommended',
    bestContentTypes: ['Carousel', 'Reel'],
  },
  {
    platform: platforms[4], // Facebook
    score: 72,
    weight: 60,
    reasoning: 'Good engagement potential with minor adjustments',
    bestContentTypes: ['Post', 'Video'],
  },
  {
    platform: platforms[1], // TikTok
    score: 45,
    weight: 30,
    reasoning: 'Would require significant adaptation for short-form video',
    bestContentTypes: ['Short Video'],
  },
];

// Content variations
const standardVariations: ContentVariation[] = [
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
Creating quality content is exhausting. You spend hours writing, editing, second-guessing... and still wonder if it'll resonate with your audience.

[SOLUTION - 0:12-0:30]
That's why we built something different. An AI system that gives you real-time feedback as you write.

[FEATURES - 0:30-0:45]
It scores your goal alignment. Predicts audience match. Optimizes for every platform automatically.

[PROOF - 0:45-0:52]
Our early users are creating content 10x faster with better engagement.

[CTA - 0:52-0:60]
Ready to transform your content game? Drop a comment below and I'll show you how it works.`,
    estimatedDuration: '60 seconds',
    wordCount: 108,
    platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts'],
  },
  {
    id: 'video-script-long',
    type: 'video-script',
    label: 'Long Video Script (3-5 min)',
    icon: <VideocamIcon />,
    content: `[INTRO - 0:00-0:30]
Hey everyone! Today I want to share something we've been working on for months that I think is going to change how you create content forever.

If you've ever stared at a blank page, wondering what to write... or spent hours tweaking a post only to get crickets... this is for you.

[CONTEXT - 0:30-1:30]
Let me give you some context. The average content creator spends 4-6 hours per piece of content. And here's the crazy part - most of that time isn't writing. It's:
- Researching what works
- Second-guessing your message
- Wondering if it matches your brand
- Trying to optimize for different platforms

What if AI could handle all of that... in real-time?

[DEMO - 1:30-3:00]
Let me show you what I mean. [Screen share]

As I type, the system is analyzing my content against my business goals. See this score? That's telling me how well this aligns with what I'm trying to achieve.

And look at this - audience match predictions. It's showing me exactly which personas will resonate with this message.

The best part? Platform optimization. I write once, and it tells me how to adapt for LinkedIn, Twitter, Instagram - automatically.

[RESULTS - 3:00-4:00]
Early users are seeing incredible results:
- 10x faster content creation
- 40% higher engagement rates
- Consistent brand voice across all platforms

[CTA - 4:00-4:30]
If you want to try this for yourself, drop "CONTENT" in the comments and I'll send you early access.

And if you found this valuable, smash that like button and subscribe for more content like this.

See you in the next one!`,
    estimatedDuration: '4-5 minutes',
    wordCount: 287,
    platforms: ['YouTube', 'LinkedIn Video'],
  },
  {
    id: 'audio-script',
    type: 'audio-script',
    label: 'Podcast/Audio Script',
    icon: <MicIcon />,
    content: `[INTRO MUSIC FADE]

Hey, welcome back to the show. I'm really excited about today's topic because it's something that's been a game-changer for our team.

We're talking about AI-powered content creation - but not in the way you might think. This isn't about replacing human creativity. It's about amplifying it.

[PAUSE]

So here's the thing. We've been working on a system that gives you real-time feedback as you write. Think of it like having a content strategist looking over your shoulder, but without the awkwardness.

It analyzes your content against your business goals. It predicts which audience segments will resonate. It even optimizes for different platforms automatically.

[PAUSE]

And the results? Our early users are creating content ten times faster. That's not an exaggeration. Ten times.

But here's what I love most about it - it's not about shortcuts. It's about removing the friction so you can focus on what matters: your unique perspective and voice.

[TRANSITION MUSIC]

In the next segment, I'll break down exactly how this works and share some specific examples...

[FADE]`,
    estimatedDuration: '2-3 minutes',
    wordCount: 195,
    platforms: ['Podcast', 'Audiogram'],
  },
  {
    id: 'carousel',
    type: 'carousel',
    label: 'Carousel (5 slides)',
    icon: <ImageIcon />,
    content: `SLIDE 1 (HOOK):
"Create Content 10x Faster"
[Visual: Bold text with AI graphic]

SLIDE 2 (PROBLEM):
The content creation struggle:
• Hours of writing and editing
• Constant second-guessing
• No idea if it'll resonate
[Visual: Frustrated creator illustration]

SLIDE 3 (SOLUTION):
Introducing AI-powered feedback:
✓ Real-time analysis
✓ Goal alignment scoring
✓ Audience predictions
[Visual: Dashboard mockup]

SLIDE 4 (PROOF):
Early results:
• 10x faster creation
• 40% higher engagement
• Consistent brand voice
[Visual: Stats/graphs]

SLIDE 5 (CTA):
Ready to transform your content?
Comment "AI" below 👇
[Visual: Arrow pointing to comments]`,
    wordCount: 98,
    platforms: ['Instagram', 'LinkedIn'],
  },
  {
    id: 'thread',
    type: 'thread',
    label: 'Twitter/X Thread',
    icon: <FormatListBulletedIcon />,
    content: `1/ 🧵 We just built something that helps you create content 10x faster.

Here's how it works (and why it matters):

2/ The problem: Content creation is exhausting.

You spend hours writing, editing, second-guessing... and still wonder if it'll resonate.

Sound familiar?

3/ We asked: What if AI could give you real-time feedback as you write?

Not generic tips. Actual analysis against YOUR goals, audience, and brand voice.

4/ Here's what our system does:

✅ Scores goal alignment
✅ Predicts audience match
✅ Analyzes tone & brand voice
✅ Optimizes for each platform

All in real-time.

5/ The results?

• 10x faster content creation
• 40% higher engagement
• Consistent brand voice across platforms

And this is just the beginning.

6/ The best part?

It doesn't replace your creativity. It removes the friction so you can focus on what matters: your unique voice.

7/ Want early access?

Drop a "🚀" below and I'll DM you.

[END THREAD]`,
    wordCount: 167,
    platforms: ['Twitter/X', 'Threads'],
  },
];

// Full feedback object
const standardFeedback: AIFeedback = {
  goalAlignment: {
    score: 82,
    matchedGoals: ['Drive engagement', 'Build brand awareness', 'Thought leadership'],
    suggestions: ['Add specific metrics for more credibility'],
  },
  audienceMatch: {
    score: 88,
    topPersonas: ['Tech Professionals', 'Marketing Leaders', 'Content Creators'],
    insights: ['Strong appeal to innovation-focused audience', 'Professional tone resonates with decision makers'],
  },
  toneAnalysis: {
    detectedTone: 'Professional & Enthusiastic',
    matchScore: 90,
    brandVoiceAlignment: 85,
  },
  platformRecommendations: standardPlatformRecs,
  contentVariations: standardVariations,
  overallScore: 85,
  improvements: [
    'Include specific data points or case study',
    'Add a direct link or CTA',
  ],
  strengths: [
    'Clear value proposition',
    'Strong hook with emoji',
    'Good use of bullet points',
    'Engaging call-to-action question',
  ],
};

/**
 * Step 1: Prompt Entry
 * 
 * The initial state where users enter their content idea/prompt.
 * AI will analyze and generate content from this prompt.
 */
export const PromptEntry: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    showFeedback: true,
    startAtStep: 'prompt',
  },
};

/**
 * With Prompt Filled
 * 
 * Prompt step with content already filled in, ready to generate.
 */
export const PromptFilled: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    showFeedback: true,
    startAtStep: 'prompt',
  },
};

/**
 * Content Generated - Full View
 * 
 * After content is generated, showing platform recommendations
 * and content variations panel.
 */
export const ContentGenerated: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
};

/**
 * Platform Recommendations Focus
 * 
 * Highlighting the platform ranking and weight adjustment feature.
 */
export const PlatformRecommendations: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows AI-ranked platform recommendations with match scores. Users can select platforms and adjust priority weights.',
      },
    },
  },
};

/**
 * Video Script Variations
 * 
 * Demonstrating content transformed into video scripts
 * (short 60s and long 3-5 min formats).
 */
export const VideoScriptVariations: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the original content is automatically transformed into video scripts with timing markers, hooks, and CTAs.',
      },
    },
  },
};

/**
 * Audio/Podcast Script
 * 
 * Content adapted for podcast or audio format with pauses and transitions.
 */
export const AudioScriptVariation: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
};

/**
 * Carousel & Thread Variations
 * 
 * Content transformed for visual carousel and Twitter thread formats.
 */
export const CarouselAndThread: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
};

/**
 * Analyzing State
 * 
 * Shows the loading state when AI is generating content and variations.
 */
export const Analyzing: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    isAnalyzing: true,
    showFeedback: true,
    startAtStep: 'content',
  },
};

/**
 * Feedback Panel Hidden
 * 
 * Editor with the AI panel hidden for more writing space.
 */
export const FeedbackHidden: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: false,
    startAtStep: 'content',
  },
};

/**
 * Mobile View - Prompt
 * 
 * Responsive mobile layout for the prompt entry step.
 */
export const MobilePrompt: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    showFeedback: true,
    startAtStep: 'prompt',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Mobile View - Content
 * 
 * Responsive mobile layout for the content editing step.
 */
export const MobileContent: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Empty State
 * 
 * Fresh editor with no prompt entered.
 */
export const Empty: Story = {
  args: {
    onBack: () => console.log('Back clicked'),
    onSubmit: handleSubmit,
    showFeedback: true,
    startAtStep: 'prompt',
  },
};

/**
 * Without Back Button
 * 
 * Editor without navigation back button (embedded mode).
 */
export const WithoutBackButton: Story = {
  args: {
    onSubmit: handleSubmit,
    initialPrompt: samplePrompt,
    initialContent: sampleContent,
    feedback: standardFeedback,
    showFeedback: true,
    startAtStep: 'content',
  },
};
