import type { ReactNode } from 'react';
import type { Platform } from '../../../mocks/4up/mockData';

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
  | 'retention';

export interface ContentIntentConfig {
  id: ContentIntent;
  label: string;
  icon: ReactNode;
  color: string;
  description: string;
}

// ============= PAIN POINTS =============

export interface PainPointAlignment {
  painPoint: string;
  description: string;
  alignmentScore: number;
  contentExcerpts: string[];  // Highlighted parts of content that address this
  suggestions: string[];
}

// ============= INTENT SCORES =============

export interface IntentScores {
  intent: ContentIntent;
  score: number;
  strengths: string[];
  improvements: string[];
  tips: string[];
}

// ============= PLATFORM =============

export interface PlatformRecommendation {
  platform: Platform;
  score: number;
  weight: number;
  reasoning: string;
  bestContentTypes: string[];
}

// ============= CONTENT VARIATIONS =============

export interface ContentVariation {
  id: string;
  type: 'post' | 'video-script' | 'audio-script' | 'carousel' | 'thread';
  label: string;
  icon: ReactNode;
  content: string;
  wordCount?: number;
  estimatedDuration?: string;
  platforms?: string[];
}

// ============= ADVANCED DETAIL DATA =============

export interface GoalAlignmentAdvanced {
  score: number;
  matchedGoals: string[];
  suggestions: string[];
  // Advanced fields
  goalBreakdown: {
    goal: string;
    alignmentPercent: number;
    keyPhrases: string[];
    recommendation: string;
  }[];
  missingGoals: string[];
  priorityActions: string[];
}

export interface AudienceMatchAdvanced {
  score: number;
  topPersonas: string[];
  insights: string[];
  // Advanced fields
  personaDetails: {
    name: string;
    matchScore: number;
    resonatingElements: string[];
    missingElements: string[];
    demographicFit: string;
  }[];
  audienceGaps: string[];
  toneRecommendations: string[];
}

export interface ToneAnalysisAdvanced {
  detectedTone: string;
  matchScore: number;
  brandVoiceAlignment: number;
  // Advanced fields
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
  intentScores: IntentScores[];
  platformRecommendations: PlatformRecommendation[];
  contentVariations: ContentVariation[];
  overallScore: number;
  improvements: string[];
  strengths: string[];
}

// ============= COMPONENT PROPS =============

export interface AIGuidedEditorV4Props {
  onBack?: () => void;
  onSubmit?: (content: string, selectedPlatforms: Platform[], variations: ContentVariation[], selectedIntent: ContentIntent | null) => void;
  initialPrompt?: string;
  initialContent?: string;
  initialIntent?: ContentIntent;
  feedback?: AIFeedback;
  showFeedback?: boolean;
  isAnalyzing?: boolean;
}
