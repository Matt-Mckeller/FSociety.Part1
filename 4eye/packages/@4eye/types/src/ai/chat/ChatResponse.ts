/**
 * Chat Response Types (C8 — Typed AI Response System)
 * 
 * These types define the structure of AI chat responses.
 * The JSDoc documentation IS the prompt - it tells the AI how to respond.
 * 
 * @module ai/chat
 */

/**
 * A suggestion for continuing the conversation.
 * 
 * @example
 * {
 *   "text": "Tell me more about the learning techniques mentioned",
 *   "intent": "deep_dive"
 * }
 */
export interface ChatSuggestion {
  /**
   * The suggested follow-up question or action.
   * Should be phrased as something the user might say.
   * Keep under 60 characters.
   * 
   * @example "Explain that in simpler terms"
   * @example "Give me a quiz on this topic"
   */
  text: string;

  /**
   * The intent category for this suggestion.
   * Helps route the follow-up to appropriate handlers.
   * 
   * - simplify: User wants simpler explanation
   * - deep_dive: User wants more detail
   * - example: User wants a concrete example
   * - quiz: User wants to test understanding
   * - relate: User wants to connect to other concepts
   */
  intent: 'simplify' | 'deep_dive' | 'example' | 'quiz' | 'relate';
}

/**
 * A citation reference to source material.
 * 
 * @example
 * {
 *   "text": "The sermon mentioned Matthew 5:9",
 *   "timestamp": 1234567,
 *   "segmentId": "seg-123"
 * }
 */
export interface ChatCitation {
  /**
   * Brief description of what's being cited.
   * Keep under 100 characters.
   */
  text: string;

  /**
   * Timestamp in milliseconds from session start.
   * Used for seeking to source.
   */
  timestamp?: number;

  /**
   * Reference to transcript segment ID.
   */
  segmentId?: string;
}

/**
 * Main chat response data structure.
 * 
 * The AI MUST respond with valid JSON matching this structure.
 * All fields are required unless marked optional.
 * 
 * @example
 * {
 *   "message": "Great question! The concept of spaced repetition...",
 *   "readingLevel": "standard",
 *   "suggestions": [
 *     { "text": "How do I apply this?", "intent": "example" }
 *   ],
 *   "citations": [],
 *   "confidence": 0.92,
 *   "learningMode": null
 * }
 */
export interface ChatResponseData {
  /**
   * The main response message to show the user.
   * 
   * Guidelines:
   * - Adapt complexity to the user's reading level
   * - Be concise but complete
   * - Use markdown for formatting (headers, lists, bold)
   * - Include examples when helpful
   * - For ADHD mode: use bullet points, bold key terms
   * - For dyslexia mode: use simple vocabulary, short sentences
   * 
   * @minLength 10
   * @maxLength 4000
   */
  message: string;

  /**
   * The reading level this response is written at.
   * Should match user's preference unless they requested otherwise.
   * 
   * - child: Simple words, short sentences, ages 8-12
   * - standard: Normal adult level, clear explanations
   * - academic: Technical terms, sophisticated analysis
   */
  readingLevel: 'child' | 'standard' | 'academic';

  /**
   * 2-4 suggested follow-up questions or actions.
   * Help user continue learning productively.
   */
  suggestions: ChatSuggestion[];

  /**
   * Citations to source material if response references session content.
   * Empty array if response is general knowledge.
   */
  citations: ChatCitation[];

  /**
   * Confidence score for this response (0-1).
   * Lower confidence may trigger disclaimers or clarification requests.
   * 
   * @minimum 0
   * @maximum 1
   */
  confidence: number;

  /**
   * If the response triggers a learning mode transformation.
   * null for normal chat responses.
   */
  learningMode: 'triadic' | 'visual' | 'exercise' | null;
}
