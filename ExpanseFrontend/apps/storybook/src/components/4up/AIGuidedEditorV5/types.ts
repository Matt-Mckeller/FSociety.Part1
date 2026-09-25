import type { Platform } from '../../../mocks/4up/mockData';

// ============= CONTENT INTENTS =============

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

// ============= PROMPT CONFIGURATION =============

export type EmojiUsage = 'none' | 'minimal' | 'optimal' | 'expressive';

export type VariationStyle = 
  | 'ai-default'
  | 'short-powerful'
  | 'vivid-imagery'
  | 'storytelling'
  | 'conversational'
  | 'professional'
  | 'provocative';

export interface PromptGuideline {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface AudienceSelection {
  id: string;
  name: string;
  type: 'persona' | 'segment' | 'demographic';
  description?: string;
  selected: boolean;
}

export interface PromptConfig {
  guidelines: PromptGuideline[];
  variationStyles: VariationStyle[];
  emojiUsage: EmojiUsage;
  audienceSelections: AudienceSelection[];
  useGenericAudience: boolean;
  enableAudienceReviews: boolean;
  enableDataStacking: boolean; // Layered generation phases
}

// ============= THEME ALIGNMENT =============

export interface ThemeAlignment {
  themeName: string;
  themeType: 'core' | 'secondary';
  weight: number;
  alignmentScore: number;
  description: string;
  keywords: string[];
  usageInContent: string[]; // Excerpts showing how theme was used
  suggestions: string[];
}

// ============= AUDIENCE REVIEW =============

export interface AudienceReview {
  audienceId: string;
  audienceName: string;
  audienceType: 'persona' | 'segment' | 'demographic';
  appealScore: number;
  resonanceFactors: string[];
  concerns: string[];
  recommendations: string[];
  sampleReaction?: string; // How this audience might react
}

// ============= PAIN POINTS =============

export interface PainPointAlignment {
  painPoint: string;
  description: string;
  alignmentScore: number;
  contentExcerpts: string[];
  suggestions: string[];
}

// ============= INTENT SCORES =============

export interface IntentScores {
  intent: ContentIntent;
  score: number;
  reasoning: string;
}

// ============= PLATFORM =============

export interface PlatformRecommendation {
  platform: Platform;
  score: number;
  reasoning: string;
  bestContentTypes: string[];
  weight: number;
}

// ============= VARIATIONS =============

export interface ContentVariation {
  id: string;
  type: 'long-form' | 'short-form' | 'video-script' | 'audio-script' | 'carousel' | 'thread';
  label: string;
  icon: string;
  content: string;
  wordCount?: number;
  estimatedDuration?: string;
  platforms?: string[];
}

// ============= ADVANCED FEEDBACK =============

export interface GoalAlignmentAdvanced {
  overallScore: number;
  goalBreakdown: {
    goalName: string;
    score: number;
    reasoning: string;
    suggestions: string[];
  }[];
}

export interface AudienceMatchAdvanced {
  overallScore: number;
  personaDetails: {
    personaName: string;
    matchScore: number;
    resonancePoints: string[];
    gapAreas: string[];
  }[];
}

export interface ToneAnalysisAdvanced {
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
  sentimentAnalysis: {
    overall: 'positive' | 'neutral' | 'negative';
    breakdown: { emotion: string; percentage: number }[];
  };
}

// ============= MAIN FEEDBACK =============

export interface AIFeedback {
  goalAlignment: GoalAlignmentAdvanced;
  audienceMatch: AudienceMatchAdvanced;
  toneAnalysis: ToneAnalysisAdvanced;
  painPointAlignment: PainPointAlignment[];
  themeAlignment: ThemeAlignment[];
  audienceReviews: AudienceReview[];
  intentScores: IntentScores[];
  platformRecommendations: PlatformRecommendation[];
  contentVariations: ContentVariation[];
  overallScore: number;
  improvements: string[];
  strengths: string[];
}

// ============= COMPONENT PROPS =============

export interface AIGuidedEditorV5Props {
  onBack?: () => void;
  onSubmit?: (content: string, selectedPlatforms: Platform[], variations: ContentVariation[], selectedIntent: ContentIntent | null, config: PromptConfig) => void;
  initialPrompt?: string;
  initialContent?: string;
  initialIntent?: ContentIntent;
  initialConfig?: Partial<PromptConfig>;
  feedback?: AIFeedback;
  showFeedback?: boolean;
  isAnalyzing?: boolean;
  availableAudiences?: AudienceSelection[];
}
