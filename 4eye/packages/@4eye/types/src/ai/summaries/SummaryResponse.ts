/**
 * Summary Response Types (C8 — Typed AI Response System)
 * 
 * These types define the structure of AI-generated summaries.
 * Used for session summaries, key points, and highlights.
 * 
 * @module ai/summaries
 */

/**
 * A key point extracted from content.
 * 
 * @example
 * {
 *   "point": "Active recall strengthens memory more than passive review",
 *   "importance": "high",
 *   "timestamp": 145000
 * }
 */
export interface KeyPoint {
  /**
   * The key point or insight.
   * Should be a complete, standalone statement.
   * 
   * @minLength 20
   * @maxLength 200
   */
  point: string;

  /**
   * Importance level of this point.
   * 
   * - high: Core concept, must understand
   * - medium: Important supporting detail
   * - low: Nice to know, context
   */
  importance: 'high' | 'medium' | 'low';

  /**
   * Timestamp in milliseconds where this point was discussed.
   */
  timestamp?: number;

  /**
   * Related topic tags for categorization.
   */
  tags?: string[];
}

/**
 * A section within the summary.
 * 
 * @example
 * {
 *   "title": "Introduction",
 *   "content": "The speaker began by...",
 *   "startTime": 0,
 *   "endTime": 300000
 * }
 */
export interface SummarySection {
  /**
   * Section title (e.g., "Introduction", "Main Arguments", "Conclusion").
   * 
   * @maxLength 50
   */
  title: string;

  /**
   * Section content summary.
   * Use markdown formatting.
   * 
   * @minLength 50
   * @maxLength 1000
   */
  content: string;

  /**
   * Start time in milliseconds.
   */
  startTime: number;

  /**
   * End time in milliseconds.
   */
  endTime: number;
}

/**
 * Main summary response data structure.
 * 
 * @example
 * {
 *   "title": "Introduction to Learning Science",
 *   "overview": "This session covered the fundamentals...",
 *   "sections": [...],
 *   "keyPoints": [...],
 *   "duration": 3600000,
 *   "readingLevel": "standard"
 * }
 */
export interface SummaryResponseData {
  /**
   * Generated title for the content.
   * Should capture the main topic/theme.
   * 
   * @maxLength 100
   */
  title: string;

  /**
   * Brief overview (2-3 sentences).
   * Captures the essence of the entire content.
   * 
   * @minLength 50
   * @maxLength 500
   */
  overview: string;

  /**
   * Content broken into logical sections.
   * Typically 3-7 sections depending on length.
   */
  sections: SummarySection[];

  /**
   * Key points extracted from content.
   * Order by importance (high first).
   * Typically 5-10 points.
   */
  keyPoints: KeyPoint[];

  /**
   * Total duration of source content in milliseconds.
   */
  duration: number;

  /**
   * Reading level the summary is written at.
   */
  readingLevel: 'child' | 'standard' | 'academic';

  /**
   * Suggested follow-up topics or questions.
   */
  suggestedTopics?: string[];
}
