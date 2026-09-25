import type { ContentFeedback } from '../types';

export const SAMPLE_FEEDBACK: ContentFeedback = {
  overallScore: 82,
  strengths: [
    'Clear value proposition communicated effectively',
    'Engaging opening hook captures attention',
    'Strong call-to-action placement',
  ],
  tips: [
    {
      id: 'tip-1',
      text: 'Add a concrete metric or case-study number near the CTA',
      source: 'general',
      priority: 'high',
    },
    {
      id: 'tip-2',
      text: 'Include a short customer quote for social proof',
      source: 'audience',
      priority: 'high',
    },
    {
      id: 'tip-3',
      text: 'Tighten the middle paragraph for mobile skim-reading',
      source: 'platforms',
      priority: 'medium',
    },
    {
      id: 'tip-4',
      text: 'Swap “basically” and “stuff” for on-brand vocabulary',
      source: 'tone',
      priority: 'medium',
    },
    {
      id: 'tip-5',
      text: 'Mention scalability for ops leaders who worry about growth',
      source: 'pain-points',
      priority: 'low',
    },
  ],
  goals: {
    overallScore: 78,
    breakdown: [
      {
        name: 'Lead Generation',
        score: 85,
        reasoning: 'Strong CTA and clear next step drive conversions',
        suggestions: ['Add a low-friction secondary CTA for browsers'],
      },
      {
        name: 'Brand Awareness',
        score: 72,
        reasoning: 'Messaging is clear but reach hooks are limited',
        suggestions: ['Lead with a shareable insight or statistic'],
      },
      {
        name: 'Thought Leadership',
        score: 68,
        reasoning: 'Could use more unique point of view',
        suggestions: ['Add one contrarian or experience-based insight'],
      },
    ],
  },
  audience: [
    {
      id: 'aud-1',
      name: 'Tech Professionals',
      type: 'persona',
      appealScore: 84,
      resonanceFactors: ['Technical benefits are clear', 'Automation framing lands'],
      concerns: ['Wants more implementation specifics'],
      recommendations: ['Name two integrations they already use'],
      sampleReaction: 'This speaks to my challenges with legacy systems.',
    },
    {
      id: 'aud-2',
      name: 'C-Suite Executives',
      type: 'segment',
      appealScore: 76,
      resonanceFactors: ['ROI is mentioned', 'Time savings angle'],
      concerns: ['Needs harder numbers'],
      recommendations: ['Lead with a dollar or hours-saved figure'],
      sampleReaction: 'I need more ROI data before considering.',
    },
    {
      id: 'aud-3',
      name: 'Small Business Owners',
      type: 'demographic',
      appealScore: 71,
      resonanceFactors: ['Cost savings feel relevant'],
      concerns: ['Worried about complexity'],
      recommendations: ['Reassure with a simple setup path'],
      sampleReaction: 'Sounds good but worried about complexity.',
    },
  ],
  platforms: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      score: 88,
      reasoning: 'Professional tone and outcome framing fit the feed',
      bestContentTypes: ['post', 'carousel', 'article'],
      suggestions: ['Add a line break before the CTA for scannability'],
    },
    {
      id: 'x',
      name: 'X / Twitter',
      score: 64,
      reasoning: 'Too long for native attention patterns',
      bestContentTypes: ['post', 'thread'],
      suggestions: ['Cut to one insight + link; move detail to a thread'],
    },
    {
      id: 'instagram',
      name: 'Instagram',
      score: 58,
      reasoning: 'Copy-heavy; needs visual hook pairing',
      bestContentTypes: ['carousel', 'reel-script', 'story'],
      suggestions: ['Pair with a before/after visual and shorter caption'],
    },
  ],
  tone: {
    detectedTone: 'Professional, Confident',
    matchScore: 86,
    brandVoiceAlignment: 80,
    onBrandWords: ['innovative', 'transform', 'solutions', 'empower', 'accelerate'],
    offBrandWords: ['basically', 'stuff'],
    suggestedWords: ['leverage', 'optimize', 'streamline'],
    readabilityScore: 75,
    toneBreakdown: [
      { aspect: 'Formality', detected: 'Professional', expected: 'Professional', match: true },
      { aspect: 'Energy', detected: 'Confident', expected: 'Energetic', match: false },
    ],
  },
  themes: [
    {
      name: 'Innovation',
      type: 'core',
      alignmentScore: 88,
      description: 'Focus on new solutions',
      keywords: ['AI', 'automation'],
      usageInContent: ['AI-powered automation'],
      suggestions: [],
    },
    {
      name: 'Efficiency',
      type: 'core',
      alignmentScore: 82,
      description: 'Time and cost savings',
      keywords: ['save', 'reduce'],
      usageInContent: ['reduce costs by 40%'],
      suggestions: [],
    },
    {
      name: 'Trust',
      type: 'secondary',
      alignmentScore: 72,
      description: 'Building credibility',
      keywords: ['proven', 'trusted'],
      usageInContent: ['500+ companies'],
      suggestions: [],
    },
    {
      name: 'Growth',
      type: 'secondary',
      alignmentScore: 65,
      description: 'Business expansion',
      keywords: ['scale', 'grow'],
      usageInContent: [],
      suggestions: ['Add growth-focused messaging'],
    },
  ],
  painPoints: [
    {
      painPoint: 'Time-consuming manual processes',
      description: 'Addresses automation benefits directly',
      alignmentScore: 90,
      contentExcerpts: ['Automate repetitive tasks'],
      suggestions: [],
    },
    {
      painPoint: 'High operational costs',
      description: 'Cost savings mentioned but lightly',
      alignmentScore: 65,
      contentExcerpts: ['Reduce costs by 40%'],
      suggestions: ['Add specific dollar amounts'],
    },
    {
      painPoint: 'Difficulty scaling operations',
      description: 'Not directly addressed',
      alignmentScore: 45,
      contentExcerpts: [],
      suggestions: ['Mention scalability benefits'],
    },
  ],
};

export const HIGH_SCORE_FEEDBACK: ContentFeedback = {
  ...SAMPLE_FEEDBACK,
  overallScore: 94,
  strengths: [
    'Precise value proposition with proof',
    'Hook and CTA are tightly aligned',
    'Tone matches brand voice throughout',
  ],
  tips: [
    {
      id: 'tip-h1',
      text: 'Optional: add a secondary CTA for newsletter subscribers',
      source: 'general',
      priority: 'low',
    },
  ],
  goals: {
    overallScore: 92,
    breakdown: SAMPLE_FEEDBACK.goals.breakdown.map((g) => ({
      ...g,
      score: Math.min(98, g.score + 12),
      suggestions: [],
    })),
  },
  audience: SAMPLE_FEEDBACK.audience.map((a) => ({
    ...a,
    appealScore: Math.min(98, a.appealScore + 10),
    concerns: [],
  })),
  platforms: SAMPLE_FEEDBACK.platforms.map((p) => ({
    ...p,
    score: Math.min(98, p.score + 8),
    suggestions: [],
  })),
  tone: {
    ...SAMPLE_FEEDBACK.tone,
    matchScore: 95,
    brandVoiceAlignment: 93,
    offBrandWords: [],
    readabilityScore: 88,
  },
};

export const LOW_SCORE_FEEDBACK: ContentFeedback = {
  ...SAMPLE_FEEDBACK,
  overallScore: 42,
  strengths: ['Topic is relevant to the audience'],
  tips: [
    {
      id: 'tip-l1',
      text: 'Rewrite the opening with a concrete problem statement',
      source: 'general',
      priority: 'high',
    },
    {
      id: 'tip-l2',
      text: 'Add an explicit CTA — none is present',
      source: 'goals',
      priority: 'high',
    },
    {
      id: 'tip-l3',
      text: 'Remove off-brand slang and match brand formality',
      source: 'tone',
      priority: 'high',
    },
    {
      id: 'tip-l4',
      text: 'Shorten by 40% for LinkedIn and X',
      source: 'platforms',
      priority: 'medium',
    },
  ],
  goals: {
    overallScore: 38,
    breakdown: SAMPLE_FEEDBACK.goals.breakdown.map((g) => ({
      ...g,
      score: Math.max(20, g.score - 40),
    })),
  },
  audience: SAMPLE_FEEDBACK.audience.map((a) => ({
    ...a,
    appealScore: Math.max(25, a.appealScore - 35),
  })),
  platforms: SAMPLE_FEEDBACK.platforms.map((p) => ({
    ...p,
    score: Math.max(20, p.score - 30),
  })),
  tone: {
    ...SAMPLE_FEEDBACK.tone,
    matchScore: 40,
    brandVoiceAlignment: 35,
    readabilityScore: 48,
    offBrandWords: ['basically', 'stuff', 'kinda', 'amazing'],
  },
};

export const PARTIAL_FEEDBACK: ContentFeedback = {
  overallScore: 70,
  strengths: ['Solid structure'],
  tips: [
    {
      id: 'tip-p1',
      text: 'Enable audience review for persona-level feedback',
      source: 'general',
      priority: 'medium',
    },
  ],
  goals: {
    overallScore: 70,
    breakdown: [
      {
        name: 'Lead Generation',
        score: 70,
        reasoning: 'CTA present but generic',
        suggestions: ['Make the offer specific'],
      },
    ],
  },
  audience: [],
  platforms: [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      score: 75,
      reasoning: 'Fits professional feed length',
      bestContentTypes: ['post'],
      suggestions: [],
    },
  ],
  tone: {
    detectedTone: 'Neutral',
    matchScore: 68,
    brandVoiceAlignment: 65,
    onBrandWords: ['solutions'],
    offBrandWords: [],
    suggestedWords: ['transform'],
    readabilityScore: 70,
    toneBreakdown: [
      { aspect: 'Formality', detected: 'Neutral', expected: 'Professional', match: false },
    ],
  },
};
