/**
 * Chat Response Zod Schema
 * 
 * Runtime validation for AI chat responses.
 * Mirrors the ChatResponse TypeScript interface.
 */

import { z } from 'zod';

export const ChatSuggestionSchema = z.object({
  text: z.string().max(60),
  intent: z.enum(['simplify', 'deep_dive', 'example', 'quiz', 'relate']),
});

export const ChatCitationSchema = z.object({
  text: z.string().max(100),
  timestamp: z.number().optional(),
  segmentId: z.string().optional(),
});

export const ChatResponseDataSchema = z.object({
  message: z.string().min(10).max(4000),
  readingLevel: z.enum(['child', 'standard', 'academic']),
  suggestions: z.array(ChatSuggestionSchema).min(2).max(4),
  citations: z.array(ChatCitationSchema),
  confidence: z.number().min(0).max(1),
  learningMode: z.enum(['triadic', 'visual', 'exercise']).nullable(),
});

export type ChatResponseDataValidated = z.infer<typeof ChatResponseDataSchema>;
