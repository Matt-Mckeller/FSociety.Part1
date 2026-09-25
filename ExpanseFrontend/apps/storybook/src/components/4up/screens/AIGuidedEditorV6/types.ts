import type { Platform } from '../../../mocks/4up/mockData';

// ============= CONTENT TYPES =============

export type ContentTypeId = 
  | 'post'
  | 'carousel'
  | 'thread'
  | 'article'
  | 'video-script'
  | 'reel-script'
  | 'story'
  | 'newsletter'
  | 'ad-copy';

export interface ContentType {
  id: ContentTypeId;
  label: string;
  icon: string;
  description: string;
  characterLimit?: number;
  wordLimit?: number;
  recommendedLayers: LayerId[];
  baseCost: number; // Base cost multiplier
}

// ============= LAYERS & PIPELINE =============

export type LayerId =
  | 'initial-generation'
  | 'professional-revision'
  | 'vivid-imagery'
  | 'data-stacking'
  | 'conversion-optimization'
  | 'audience-review'
  | 'brand-voice-alignment'
  | 'seo-optimization'
  | 'emotional-resonance'
  | 'clarity-simplification';

export type LayerCategory = 'generation' | 'style' | 'optimization' | 'review';

export interface LayerConfig {
  // Layer-specific configuration
  [key: string]: unknown;
}

export interface ProfessionalRevisionConfig extends LayerConfig {
  formalityLevel: 'casual' | 'balanced' | 'formal' | 'executive';
  industryJargon: boolean;
}

export interface AudienceReviewConfig extends LayerConfig {
  audiences: string[];
  useGeneric: boolean;
}

export interface ConversionOptimizationConfig extends LayerConfig {
  conversionType: 'signup' | 'purchase' | 'download' | 'contact' | 'engagement';
  urgencyLevel: 'none' | 'subtle' | 'moderate' | 'strong';
}

export interface DataStackingConfig extends LayerConfig {
  includeStatistics: boolean;
  includeCaseStudies: boolean;
  includeResearch: boolean;
  maxDataPoints: number;
}

export interface Layer {
  id: LayerId;
  label: string;
  shortLabel: string;
  description: string;
  category: LayerCategory;
  icon: string;
  costMultiplier: number;
  estimatedTokens: number;
  enabled: boolean;
  config?: LayerConfig;
  required?: boolean; // Some layers like initial-generation are required
}

export interface Pipeline {
  layers: Layer[];
  totalEstimatedCost: number;
  totalEstimatedTokens: number;
}

// ============= COST ESTIMATION =============

export interface CostBreakdown {
  layerCosts: { layerId: LayerId; label: string; cost: number; tokens: number }[];
  contentTypeCost: number;
  feedbackCost: number;
  totalTokens: number;
  totalCost: number;
  estimatedTime: string; // e.g., "~15 seconds"
}

export interface CostFactors {
  baseTokenCost: number; // Cost per 1000 tokens
  contentTypeMultipliers: Record<ContentTypeId, number>;
  feedbackOptions: {
    themeAlignment: number;
    audienceReview: number;
    painPointAnalysis: number;
    toneAnalysis: number;
    goalAlignment: number;
  };
}

// ============= CONFIGURATION =============

export type EmojiUsage = 'none' | 'minimal' | 'optimal' | 'expressive';

export interface ContentGuideline {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface EditorConfiguration {
  guidelines: ContentGuideline[];
  emojiUsage: EmojiUsage;
  targetWordCount?: number;
  tonePreference?: string;
}

// ============= FEEDBACK TYPES =============

export interface FeedbackOptions {
  enableThemeAlignment: boolean;
  enableAudienceReview: boolean;
  enablePainPointAnalysis: boolean;
  enableToneAnalysis: boolean;
  enableGoalAlignment: boolean;
  selectedAudiences: string[];
}

export interface ThemeAlignment {
  themeName: string;
  themeType: 'core' | 'secondary';
  weight: number;
  alignmentScore: number;
  description: string;
  keywords: string[];
  usageInContent: string[];
  suggestions: string[];
}

export interface AudienceReview {
  audienceId: string;
  audienceName: string;
  audienceType: 'persona' | 'segment' | 'demographic';
  appealScore: number;
  resonanceFactors: string[];
  concerns: string[];
  recommendations: string[];
  sampleReaction?: string;
}

export interface PainPointAlignment {
  painPoint: string;
  description: string;
  alignmentScore: number;
  contentExcerpts: string[];
  suggestions: string[];
}

export interface GoalAlignment {
  overallScore: number;
  goalBreakdown: {
    goalName: string;
    score: number;
    reasoning: string;
    suggestions: string[];
  }[];
}

export interface ToneAnalysis {
  detectedTone: string;
  matchScore: number;
  brandVoiceAlignment: number;
  toneBreakdown: {
    aspect: string;
    detected: string;
    expected: string;
    match: boolean;
  }[];
  vocabularyAnalysis: {
    onBrand: string[];
    offBrand: string[];
    suggested: string[];
  };
  readabilityScore: number;
}

export interface AIFeedback {
  overallScore: number;
  goalAlignment?: GoalAlignment;
  toneAnalysis?: ToneAnalysis;
  painPointAlignment?: PainPointAlignment[];
  themeAlignment?: ThemeAlignment[];
  audienceReviews?: AudienceReview[];
  strengths: string[];
  improvements: string[];
}

// ============= CONTENT VARIATIONS =============

export interface ContentVariation {
  id: string;
  type: ContentTypeId;
  label: string;
  icon: string;
  content: string;
  wordCount?: number;
  estimatedDuration?: string;
  platforms?: string[];
  layersApplied: LayerId[];
  // Extended variation properties
  focusArea?: string; // e.g., "engagement", "conversion", "education"
  style?: string; // e.g., "concise", "detailed", "storytelling"
  score?: number; // AI quality score (0-100)
  generatedAt?: Date | string;
}

// ============= CONTENT INTENT =============

export type ContentIntent = 
  | 'educational'
  | 'lead-generation'
  | 'engagement'
  | 'brand-awareness'
  | 'thought-leadership'
  | 'community-building'
  | 'sales'
  | 'conversion'
  | 'retention'
  | 'recruitment'
  | 'customer-success'
  | 'advocacy';

// ============= PLATFORM =============

export interface PlatformRecommendation {
  platform: Platform;
  score: number;
  reasoning: string;
  bestContentTypes: ContentTypeId[];
  weight: number;
}

// ============= MAIN COMPONENT PROPS =============

export interface AIGuidedEditorV6Props {
  // Initial state
  initialContent?: string;
  initialPrompt?: string;
  initialContentType?: ContentTypeId;
  initialPipeline?: Layer[];
  initialConfig?: Partial<EditorConfiguration>;
  initialFeedbackOptions?: Partial<FeedbackOptions>;
  
  // Callbacks
  onBack?: () => void;
  onGenerate?: (params: GenerateParams) => void;
  onSave?: (content: string, metadata: ContentMetadata) => void;
  
  // External data
  feedback?: AIFeedback;
  variations?: ContentVariation[];
  platformRecommendations?: PlatformRecommendation[];
  
  // State
  isGenerating?: boolean;
  isAnalyzing?: boolean;
}

export interface GenerateParams {
  content: string;
  contentType: ContentTypeId;
  pipeline: Layer[];
  config: EditorConfiguration;
  feedbackOptions: FeedbackOptions;
}

export interface ContentMetadata {
  contentType: ContentTypeId;
  wordCount: number;
  layersApplied: LayerId[];
  estimatedCost: number;
  selectedPlatforms: Platform[];
}
