/**
 * AI Response Types
 * 
 * This module exports all AI response type definitions for the
 * Typed AI Response System (C8). Each feature has:
 * 
 * 1. TypeScript interface with JSDoc (the "prompt")
 * 2. Zod schema for runtime validation
 * 
 * The JSDoc comments in these types ARE the instructions to the AI.
 * The Type Reader service reads these files at runtime and includes
 * them in prompts.
 * 
 * @module ai
 */

export * from './chat';
export * from './summaries';
export * from './feedback';
export * from './quizzes';
export * from './rl';
export * from './visual';
export * from './audio-search';
// Future: recaps, learning, comparison, transform

// AI behavior settings (used by chat input + UI)
export * from './settings';
export * from './contextSources';
