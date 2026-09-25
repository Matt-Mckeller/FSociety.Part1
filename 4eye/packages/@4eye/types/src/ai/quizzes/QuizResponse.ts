/**
 * Quiz Response Types (C8 — Typed AI Response System)
 * 
 * These types define the structure of AI-generated quizzes.
 * Supports multiple question types for active recall.
 * 
 * @module ai/quizzes
 */

/**
 * Question type enumeration.
 */
export type QuestionType = 
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'short_answer';

/**
 * An option for multiple choice questions.
 */
export interface QuizOption {
  /**
   * Option identifier (A, B, C, D).
   */
  id: string;

  /**
   * Option text.
   */
  text: string;

  /**
   * Whether this is the correct answer.
   */
  isCorrect: boolean;
}

/**
 * A single quiz question.
 */
export interface QuizQuestion {
  /**
   * Question identifier.
   */
  id: string;

  /**
   * Question type.
   */
  type: QuestionType;

  /**
   * The question text.
   * Use markdown formatting as needed.
   */
  question: string;

  /**
   * Options for multiple choice (null for other types).
   */
  options?: QuizOption[] | null;

  /**
   * Correct answer(s).
   * For multiple choice: option ID
   * For true/false: "true" or "false"
   * For fill blank: the word/phrase
   * For short answer: key concepts that should be mentioned
   */
  correctAnswer: string | string[];

  /**
   * Explanation shown after answering.
   * Helps reinforce learning.
   */
  explanation: string;

  /**
   * Difficulty level.
   */
  difficulty: 'easy' | 'medium' | 'hard';

  /**
   * Timestamp in source content where this topic was discussed.
   */
  timestamp?: number;

  /**
   * Topic/concept this question tests.
   */
  topic?: string;
}

/**
 * Main quiz response data structure.
 */
export interface QuizResponseData {
  /**
   * Quiz title based on content.
   */
  title: string;

  /**
   * Brief description of what the quiz covers.
   */
  description: string;

  /**
   * The questions in recommended order.
   * Start easier, get progressively harder.
   */
  questions: QuizQuestion[];

  /**
   * Estimated time to complete in minutes.
   */
  estimatedMinutes: number;

  /**
   * Difficulty distribution.
   */
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };

  /**
   * Topics/concepts covered by this quiz.
   */
  topicsCovered: string[];

  /**
   * Pass threshold (percentage correct needed to "pass").
   */
  passThreshold: number;
}
