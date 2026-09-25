export type AudienceType = 'persona' | 'segment' | 'demographic';
export type ThemeType = 'core' | 'secondary';

export interface GoalFeedback {
  name: string;
  score: number;
  reasoning: string;
  suggestions: string[];
}

export interface AudienceFeedback {
  id: string;
  name: string;
  type: AudienceType;
  appealScore: number;
  resonanceFactors: string[];
  concerns: string[];
  recommendations: string[];
  sampleReaction?: string;
}

export interface PlatformFeedback {
  id: string;
  name: string;
  score: number;
  reasoning: string;
  bestContentTypes: string[];
  suggestions: string[];
}

export interface ToneFeedback {
  detectedTone: string;
  matchScore: number;
  brandVoiceAlignment: number;
  onBrandWords: string[];
  offBrandWords: string[];
  suggestedWords: string[];
  readabilityScore: number;
  toneBreakdown: {
    aspect: string;
    detected: string;
    expected: string;
    match: boolean;
  }[];
}

export interface ThemeFeedback {
  name: string;
  type: ThemeType;
  alignmentScore: number;
  description: string;
  keywords: string[];
  usageInContent: string[];
  suggestions: string[];
}

export interface PainPointFeedback {
  painPoint: string;
  description: string;
  alignmentScore: number;
  contentExcerpts: string[];
  suggestions: string[];
}

export interface ImprovementTip {
  id: string;
  text: string;
  source: 'general' | 'goals' | 'audience' | 'platforms' | 'tone' | 'themes' | 'pain-points';
  priority: 'high' | 'medium' | 'low';
}

/** Shared feedback payload for all three variation screens. */
export interface ContentFeedback {
  overallScore: number;
  strengths: string[];
  tips: ImprovementTip[];
  goals: {
    overallScore: number;
    breakdown: GoalFeedback[];
  };
  audience: AudienceFeedback[];
  platforms: PlatformFeedback[];
  tone: ToneFeedback;
  themes?: ThemeFeedback[];
  painPoints?: PainPointFeedback[];
}

export type FeedbackScreenStatus = 'ready' | 'analyzing' | 'empty';

export interface FeedbackScreenProps {
  feedback: ContentFeedback;
  status?: FeedbackScreenStatus;
  title?: string;
}
