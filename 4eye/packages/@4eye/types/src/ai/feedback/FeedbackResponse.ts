/**
 * Speaker Feedback Response Types (C8 — Typed AI Response System)
 * 
 * These types define the structure of AI-generated speaker feedback.
 * Provides improvement suggestions for presenters.
 * 
 * @module ai/feedback
 */

/**
 * A specific feedback item with actionable suggestion.
 */
export interface FeedbackItem {
  /**
   * Category of feedback.
   * 
   * - pacing: Speaking speed, pauses, rhythm
   * - clarity: Word choice, sentence structure, explanations
   * - engagement: Audience connection, questions, stories
   * - structure: Organization, transitions, flow
   * - content: Depth, accuracy, relevance
   */
  category: 'pacing' | 'clarity' | 'engagement' | 'structure' | 'content';

  /**
   * The observation or issue.
   * What the AI noticed.
   * 
   * @example "You spoke quickly during the technical explanation section"
   */
  observation: string;

  /**
   * Actionable suggestion for improvement.
   * 
   * @example "Consider pausing after key points to let ideas sink in"
   */
  suggestion: string;

  /**
   * Timestamp range in milliseconds where this applies.
   */
  timestamps?: {
    start: number;
    end: number;
  };

  /**
   * Impact level of this feedback.
   * 
   * - high: Address this first
   * - medium: Would improve quality
   * - low: Minor polish opportunity
   */
  impact: 'high' | 'medium' | 'low';
}

/**
 * Overall metric score for a speaking dimension.
 */
export interface SpeakingMetric {
  /**
   * Metric name.
   */
  name: string;

  /**
   * Score from 1-10.
   */
  score: number;

  /**
   * Brief explanation of the score.
   */
  rationale: string;
}

/**
 * Main feedback response data structure.
 */
export interface FeedbackResponseData {
  /**
   * Overall score from 1-10.
   * Weighted average of metrics.
   */
  overallScore: number;

  /**
   * Positive summary of what went well.
   * Be encouraging and specific.
   * 
   * @minLength 50
   * @maxLength 500
   */
  positives: string;

  /**
   * Summary of areas for improvement.
   * Be constructive and actionable.
   * 
   * @minLength 50
   * @maxLength 500
   */
  areasToImprove: string;

  /**
   * Specific feedback items, ordered by impact (high first).
   */
  feedbackItems: FeedbackItem[];

  /**
   * Scored metrics for different speaking dimensions.
   */
  metrics: SpeakingMetric[];

  /**
   * Top 3 priorities for the speaker to focus on next time.
   */
  topPriorities: string[];

  /**
   * Duration of analyzed content in milliseconds.
   */
  duration: number;
}
