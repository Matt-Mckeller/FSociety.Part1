import type { LearningModality, VisualizationType } from "./enums.js";


/**
 * Minimal output format for quick real-time educational content analysis.
 * Designed for fast processing with essential classification, summarization, and visualization suggestions.
 * Use this for real-time classroom applications where latency is critical.
 */
export interface v1_MinimalOutput {
  /** Overall confidence in the analysis quality (0-1 scale) */
  confidence: number;
  
  /** Age and context appropriateness score (0-1 scale). 1.0 = fully appropriate */
  appropriatenessScore?: number;
  
  /** Array of warnings or concerns (e.g., PII detected, inappropriate content, low quality) */
  warnings?: { [key: string]: any }[];
  
  /** Confidence that content is main instructional/lecture material (0-1 scale) */
  isMainLectureContent_confidence: number;
  
  /** Confidence that content is side conversation or off-topic discussion (0-1 scale) */
  isSideConversation_confidence: number;
  
  /** Confidence that content is irrelevant (noise, unclear speech, non-educational) (0-1 scale) */
  isIrrelevantContent_confidence: number;

  /** Whether the content should be summarized (false if too low quality or not educational) */
  shouldSummarize: boolean;
  
  /** Explanation if shouldSummarize is false */
  shouldSummarizeFalseReason: string | null;
  
  /** Whether to wait for more content before providing complete summary */
  waitForMoreContent: boolean;

  /** Ultra-concise summary (15-25 words) capturing core educational concept */
  oneLineSummarization: string;
  
  /** Whether visualizations would significantly improve learning for this content */
  recommendVisualizationToImproveLearning: boolean;
  
  /** Score indicating how effective visualizations would be (0-1 scale) */
  visualizationEffectivenessScore?: number;

  /** Array of 1-3 visualization suggestions ranked by effectiveness */
  visualizationSuggestions: {
    /** Estimated effectiveness level for learning enhancement */
    effectiveness: "low" | "medium" | "high" | "very_high";
    
    /** Relative weight of this visualization's effectiveness (0-1 scale) */
    relativeEffectivenessWeight: number;
    
    /** Whether this visualization should be displayed to users */
    recommendedToDisplay: boolean;
    
    /** Comparative ranking against other suggestions (0-1 scale, 1.0 = most valuable) */
    comparativeValueToOtherSuggestions: number;
    
    /** Type of visualization from VisualizationType enum */
    coreType: string;
    
    /** Brief title for the visualization */
    title: string;
    
    /** Description of what the visualization would show */
    description: string;
    
    /** Pedagogical reasoning for why this visualization would help learning */
    reasonForSuggestion: string;
    
    /** Detailed prompt for separate visualization generation AI to create the actual visualization */
    promptForGeneration: string;
  }[];

}

/**
 * Comprehensive output format for detailed educational content analysis.
 * Includes multiple summarization formats, learning modalities, detailed visualizations,
 * and teacher recommendations. Use this when quality and depth are prioritized over speed.
 */
export interface v1_ExtraOutput {
  /** Overall confidence in the analysis quality (0-1 scale) */
  confidence: number;
  
  /** Age and context appropriateness score (0-1 scale). 1.0 = fully appropriate */
  appropriatenessScore?: number;
  
  /** Array of warnings or concerns (e.g., PII detected, inappropriate content, low quality) */
  warnings?: { [key: string]: any }[];
  
  /** Confidence that content is main instructional/lecture material (0-1 scale) */
  isMainLectureContent_confidence: number;
  
  /** Confidence that content is side conversation or off-topic discussion (0-1 scale) */
  isSideConversation_confidence: number;
  
  /** Confidence that content is irrelevant (noise, unclear speech, non-educational) (0-1 scale) */
  isIrrelevantContent_confidence: number;

  /** True if this is a partial/streaming response that's incomplete */
  isPartialResponse?: boolean;
  
  /** Estimated seconds until complete analysis is ready (if waiting for more content) */
  expectedCompletionTime?: number;

  /** Array of topic/concept tags for categorization (e.g., ["math", "fractions", "grade_5"]) */
  tags: string[];
  
  /** Whether the content should be summarized (false if too low quality or not educational) */
  shouldSummarize: boolean;
  
  /** Explanation if shouldSummarize is false */
  shouldSummarizeFalseReason: string | null;
  
  /** Whether to wait for more content before providing complete summary */
  waitForMoreContent: boolean;

  /** Comprehensive summary with full context and detail */
  summarization: string;
  
  /** Best summarization approach for this content (references additionalSummarizationOptions version) */
  recommendedSummarization: string;
  
  /** Multiple summarization formats to support different learning preferences */
  additionalSummarizationOptions: {
    /** Type of summarization format */
    version:
      | "concise"         // 2-3 sentences, key points only
      | "detailed"        // Comprehensive explanation with context
      | "bullet_points"   // Structured list of main ideas
      | "narrative"       // Story-like explanation with flow
      | "technical"       // Precise terminology and detailed mechanics
      | "layman_friendly"; // Simple language, relatable examples
    
    /** Comparative effectiveness vs recommended format (0-1 scale) */
    comparativeValueToRecommendedModality: number;
    
    /** The actual summary text in this format */
    text: string;
  }[];
  
  /** Ultra-concise summary (15-25 words) capturing core educational concept */
  oneLineSummarization: string;
  
  /** Whether visualizations would significantly improve learning for this content */
  recommendVisualizationToImproveLearning: boolean;
  
  /** Score indicating how effective visualizations would be (0-1 scale) */
  visualizationEffectivenessScore?: number;

  /**
   * Content transformed into different learning modalities (3-6 variations).
   * Each modality represents the same educational content adapted to different learning styles.
   */
  learningModalityText: {
    /** Estimated effectiveness level for learning enhancement */
    effectiveness: "low" | "medium" | "high" | "very_high";
    
    /** Type of learning modality */
    type: LearningModality;
    
    /** Relative weight of this modality's effectiveness (0-1 scale) */
    relativeEffectivenessWeight: number;
    
    /** Whether this modality should be displayed to users */
    recommendedToDisplay: boolean;
    
    /** Comparative ranking against other modalities (0-1 scale, 1.0 = most valuable) */
    comparativeValueToOtherModalities: number;
    
    /** Content presented in this learning modality (3-5 sentences minimum) */
    text: string;
  }[];

  /**
   * Detailed visualization suggestions (2-5 suggestions) ranked by educational effectiveness.
   * These will be passed to a separate visualization generation system.
   */
  visualizationSuggestions: {
    /** Estimated effectiveness level for learning enhancement */
    effectiveness: "low" | "medium" | "high" | "very_high";
    
    /** Relative weight of this visualization's effectiveness (0-1 scale) */
    relativeEffectivenessWeight: number;
    
    /** Whether this visualization should be displayed to users */
    recommendedToDisplay: boolean;
    
    /** Comparative ranking against other suggestions (0-1 scale, 1.0 = most valuable) */
    comparativeValueToOtherSuggestions: number;
    
    /** Primary visualization type from VisualizationType enum */
    coreType: VisualizationType;
    
    /** Additional type specification if coreType is CUSTOM or AI_GENERATED */
    otherCoreType: string | null;
    
    /** Secondary visualization types that could be combined for hybrid approach */
    secondaryTypes: VisualizationType[];
    
    /** Brief title for the visualization */
    title: string;
    
    /** Pedagogical reasoning for why this visualization would help learning */
    reasonForSuggestion: string;
    
    /** 
     * Detailed prompt for separate visualization generation AI.
     * Must include: specific content, visual structure, styling, educational context,
     * interactivity specs, labels, and accessibility considerations.
     */
    promptForGeneration: string;

  }[];

  /** Explanation of why this content is academically important and how it builds knowledge */
  purpose: string;
  
  /** Compelling reason why students should care, connecting to their lives and interests */
  motivation: string;
  
  /** Educational value score of the content (0-1 scale) */
  learningValueScore: number;

  /** Interactive actions students can take to deepen learning (2-5 actions) */
  availableActions: {
    /** 1-3 word action label (e.g., "See Example", "Try Problem") */
    actionLabel: string;
    
    /** Brief explanation of how this action helps learning */
    reason: string;
    
    /** Priority level for recommending this action */
    recommendationPriority:
      | "critical"
      | "very_high"
      | "high"
      | "medium"
      | "low";
  }[];

  /** Optional vocabulary support with definitions, etymology, and usage examples */
  vocabularyEnhancements?: { [key: string]: any };
  
  /** Optional array of related research, resources, or connections to explore */
  relatedResearch?: { [key: string]: any }[];

  /** Actionable insights and recommendations for teachers (1-3 suggestions) */
  recommendationsToTeacher: string[];
  
  /** Actionable insights and recommendations for school administrators (0-3 suggestions) */
  advisoryToAdministration: string[];
}

// interface ExampleAIResponse {
//   // Request metadata
//   requestId: string;
//   timestamp: Date;
//   processingTime: number; // Milliseconds

//   // Core outputs
//   summary: ContentSummary;
//   formattedContent: FormattedContent;

//   // Variations
//   variants: ContentVariant[];
//   learningModalities: LearningModalityContent[];

//   // Visualizations
//   visualizationSuggestions: VisualizationSuggestion[];
//   generatedVisualizations?: GeneratedVisualization[]; // May be empty initially

//   // Interactivity
//   availableActions: AvailableAction[];

//   // Additional enhancements
//   vocabularyEnhancements?: VocabularyItem[];
//   relatedResearch?: RelatedResearch[];

//   // Quality metrics
//   confidence: number; // 0-1 confidence in response quality
//   appropriatenessScore?: number; // 0-1 age/context appropriateness
//   warnings?: string[]; // Any concerns or limitations

//   // For real-time processing
//   isPartialResponse?: boolean; // True if streaming/incomplete
//   expectedCompletionTime?: number; // Seconds until fully processed
// }
