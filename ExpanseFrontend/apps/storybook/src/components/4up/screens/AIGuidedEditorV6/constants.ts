import type { 
  ContentType, 
  Layer, 
  ContentGuideline, 
  CostFactors,
  ContentTypeId,
} from './types';

// ============= CONTENT TYPES =============

export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'post',
    label: 'Post',
    icon: '📝',
    description: 'Standard social media post',
    characterLimit: 3000,
    wordLimit: 500,
    recommendedLayers: ['initial-generation', 'professional-revision', 'conversion-optimization'],
    baseCost: 1.0,
  },
  {
    id: 'carousel',
    label: 'Carousel',
    icon: '🎠',
    description: 'Multi-slide visual content',
    wordLimit: 1500,
    recommendedLayers: ['initial-generation', 'vivid-imagery', 'data-stacking'],
    baseCost: 1.5,
  },
  {
    id: 'thread',
    label: 'Thread',
    icon: '🧵',
    description: 'Connected series of posts',
    wordLimit: 2000,
    recommendedLayers: ['initial-generation', 'data-stacking', 'audience-review'],
    baseCost: 1.3,
  },
  {
    id: 'article',
    label: 'Article',
    icon: '📰',
    description: 'Long-form written content',
    wordLimit: 5000,
    recommendedLayers: ['initial-generation', 'professional-revision', 'seo-optimization', 'data-stacking'],
    baseCost: 2.0,
  },
  {
    id: 'video-script',
    label: 'Video Script',
    icon: '🎬',
    description: 'Script for video content',
    wordLimit: 3000,
    recommendedLayers: ['initial-generation', 'emotional-resonance', 'clarity-simplification'],
    baseCost: 1.8,
  },
  {
    id: 'reel-script',
    label: 'Reel/Short',
    icon: '📱',
    description: 'Short-form video script',
    wordLimit: 300,
    recommendedLayers: ['initial-generation', 'vivid-imagery', 'conversion-optimization'],
    baseCost: 1.2,
  },
  {
    id: 'story',
    label: 'Story',
    icon: '⏱️',
    description: 'Ephemeral story content',
    wordLimit: 150,
    recommendedLayers: ['initial-generation', 'vivid-imagery'],
    baseCost: 0.8,
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    icon: '📧',
    description: 'Email newsletter content',
    wordLimit: 2500,
    recommendedLayers: ['initial-generation', 'professional-revision', 'conversion-optimization', 'audience-review'],
    baseCost: 1.6,
  },
  {
    id: 'ad-copy',
    label: 'Ad Copy',
    icon: '📢',
    description: 'Advertising content',
    wordLimit: 500,
    recommendedLayers: ['initial-generation', 'conversion-optimization', 'audience-review'],
    baseCost: 1.4,
  },
];

// ============= LAYERS =============

export const DEFAULT_LAYERS: Layer[] = [
  {
    id: 'initial-generation',
    label: 'Initial Generation',
    shortLabel: 'Generate',
    description: 'Create the initial content based on your prompt and guidelines',
    category: 'generation',
    icon: '✨',
    costMultiplier: 1.0,
    estimatedTokens: 500,
    enabled: true,
    required: true,
  },
  {
    id: 'professional-revision',
    label: 'Professional Revision',
    shortLabel: 'Professional',
    description: 'Refine tone and language for professional contexts',
    category: 'style',
    icon: '👔',
    costMultiplier: 0.4,
    estimatedTokens: 300,
    enabled: false,
    config: {
      formalityLevel: 'balanced',
      industryJargon: false,
    },
  },
  {
    id: 'vivid-imagery',
    label: 'Vivid Imagery',
    shortLabel: 'Imagery',
    description: 'Enhance with descriptive, sensory language',
    category: 'style',
    icon: '🎨',
    costMultiplier: 0.35,
    estimatedTokens: 250,
    enabled: false,
  },
  {
    id: 'data-stacking',
    label: 'Data Stacking',
    shortLabel: 'Data',
    description: 'Layer in statistics, facts, and evidence for depth',
    category: 'optimization',
    icon: '📊',
    costMultiplier: 0.5,
    estimatedTokens: 400,
    enabled: false,
    config: {
      includeStatistics: true,
      includeCaseStudies: false,
      includeResearch: true,
      maxDataPoints: 3,
    },
  },
  {
    id: 'conversion-optimization',
    label: 'Conversion Optimization',
    shortLabel: 'Convert',
    description: 'Optimize for driving specific actions',
    category: 'optimization',
    icon: '🎯',
    costMultiplier: 0.45,
    estimatedTokens: 350,
    enabled: false,
    config: {
      conversionType: 'engagement',
      urgencyLevel: 'subtle',
    },
  },
  {
    id: 'audience-review',
    label: 'Audience Review',
    shortLabel: 'Audience',
    description: 'Analyze appeal across different audience segments',
    category: 'review',
    icon: '👥',
    costMultiplier: 0.6,
    estimatedTokens: 500,
    enabled: false,
    config: {
      audiences: [],
      useGeneric: true,
    },
  },
  {
    id: 'brand-voice-alignment',
    label: 'Brand Voice Alignment',
    shortLabel: 'Brand',
    description: 'Ensure consistency with brand voice and guidelines',
    category: 'review',
    icon: '🎙️',
    costMultiplier: 0.4,
    estimatedTokens: 300,
    enabled: false,
  },
  {
    id: 'seo-optimization',
    label: 'SEO Optimization',
    shortLabel: 'SEO',
    description: 'Optimize for search engine visibility',
    category: 'optimization',
    icon: '🔍',
    costMultiplier: 0.35,
    estimatedTokens: 250,
    enabled: false,
  },
  {
    id: 'emotional-resonance',
    label: 'Emotional Resonance',
    shortLabel: 'Emotion',
    description: 'Enhance emotional connection and impact',
    category: 'style',
    icon: '💝',
    costMultiplier: 0.4,
    estimatedTokens: 300,
    enabled: false,
  },
  {
    id: 'clarity-simplification',
    label: 'Clarity & Simplification',
    shortLabel: 'Clarity',
    description: 'Simplify language for broader accessibility',
    category: 'style',
    icon: '💡',
    costMultiplier: 0.3,
    estimatedTokens: 200,
    enabled: false,
  },
];

// ============= DEFAULT GUIDELINES =============

export const DEFAULT_GUIDELINES: ContentGuideline[] = [
  { id: 'engaging', label: 'Make it engaging', description: 'Add hooks, questions, relatable language', enabled: true },
  { id: 'cta', label: 'Include CTA', description: 'Add a call-to-action appropriate for the context', enabled: false },
  { id: 'storytelling', label: 'Use storytelling', description: 'Incorporate narrative elements', enabled: false },
  { id: 'social-proof', label: 'Include social proof', description: 'Mention testimonials, numbers, or endorsements', enabled: false },
  { id: 'question-hook', label: 'Start with a question', description: 'Open with an engaging question', enabled: false },
  { id: 'value-first', label: 'Lead with value', description: 'Front-load the most valuable information', enabled: true },
];

// ============= COST FACTORS =============

export const COST_FACTORS: CostFactors = {
  baseTokenCost: 0.00003, // $0.03 per 1000 tokens
  contentTypeMultipliers: {
    'post': 1.0,
    'carousel': 1.5,
    'thread': 1.3,
    'article': 2.0,
    'video-script': 1.8,
    'reel-script': 1.2,
    'story': 0.8,
    'newsletter': 1.6,
    'ad-copy': 1.4,
  },
  feedbackOptions: {
    themeAlignment: 0.15,
    audienceReview: 0.20,
    painPointAnalysis: 0.15,
    toneAnalysis: 0.10,
    goalAlignment: 0.12,
  },
};

// ============= DEFAULT AUDIENCES =============

export const DEFAULT_AUDIENCES = [
  { id: 'busy-professional', name: 'Busy Professional', type: 'persona' as const },
  { id: 'curious-learner', name: 'Curious Learner', type: 'persona' as const },
  { id: 'skeptical-buyer', name: 'Skeptical Buyer', type: 'persona' as const },
  { id: 'early-adopter', name: 'Early Adopter', type: 'segment' as const },
  { id: 'budget-conscious', name: 'Budget Conscious', type: 'segment' as const },
  { id: 'decision-maker', name: 'Decision Maker', type: 'demographic' as const },
  { id: 'technical-expert', name: 'Technical Expert', type: 'demographic' as const },
];

// ============= EMOJI OPTIONS =============

export const EMOJI_OPTIONS = [
  { value: 'none' as const, label: 'None', icon: '🚫' },
  { value: 'minimal' as const, label: 'Minimal', icon: '✨' },
  { value: 'optimal' as const, label: 'Optimal', icon: '🎯' },
  { value: 'expressive' as const, label: 'Expressive', icon: '🔥' },
];

// ============= LIGHT THEME COLORS =============

export const lightColors = {
  background: '#f8fafc',
  paper: '#ffffff',
  paperHover: '#f1f5f9',
  border: '#e2e8f0',
  borderHover: '#cbd5e1',
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  primaryLight: '#e0e7ff',
  secondary: '#8b5cf6',
  secondaryLight: '#ede9fe',
  success: '#10b981',
  successLight: '#d1fae5',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  error: '#ef4444',
  errorLight: '#fee2e2',
  info: '#3b82f6',
  infoLight: '#dbeafe',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    muted: '#94a3b8',
  },
};

// ============= LAYER CATEGORY COLORS =============

export const LAYER_CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  generation: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  style: { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
  optimization: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  review: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
};

// ============= SCORE COLOR HELPER =============

export function getScoreColor(score: number): string {
  if (score >= 80) return lightColors.success;
  if (score >= 60) return lightColors.info;
  if (score >= 40) return lightColors.warning;
  return lightColors.error;
}

// ============= COST CALCULATION HELPER =============

export function calculateCost(
  layers: Layer[],
  contentType: ContentTypeId,
  feedbackOptions: { [key: string]: boolean }
): { totalCost: number; totalTokens: number; breakdown: { label: string; cost: number; tokens: number }[] } {
  const breakdown: { label: string; cost: number; tokens: number }[] = [];
  let totalTokens = 0;
  
  const contentTypeMultiplier = COST_FACTORS.contentTypeMultipliers[contentType];
  
  // Calculate layer costs
  layers.filter(l => l.enabled).forEach(layer => {
    const tokens = Math.round(layer.estimatedTokens * contentTypeMultiplier);
    const cost = tokens * COST_FACTORS.baseTokenCost;
    breakdown.push({ label: layer.label, cost, tokens });
    totalTokens += tokens;
  });
  
  // Calculate feedback costs
  Object.entries(feedbackOptions).forEach(([key, enabled]) => {
    if (enabled && key in COST_FACTORS.feedbackOptions) {
      const feedbackKey = key as keyof typeof COST_FACTORS.feedbackOptions;
      const tokens = Math.round(300 * COST_FACTORS.feedbackOptions[feedbackKey] * contentTypeMultiplier);
      const cost = tokens * COST_FACTORS.baseTokenCost;
      breakdown.push({ label: key.replace(/([A-Z])/g, ' $1').trim(), cost, tokens });
      totalTokens += tokens;
    }
  });
  
  const totalCost = breakdown.reduce((sum, item) => sum + item.cost, 0);
  
  return { totalCost, totalTokens, breakdown };
}
