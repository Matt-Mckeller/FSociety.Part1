/**
 * Feedback Response Zod Schema
 */

import { z } from 'zod';

export const FeedbackItemSchema = z.object({
  category: z.enum(['pacing', 'clarity', 'engagement', 'structure', 'content']),
  observation: z.string(),
  suggestion: z.string(),
  timestamps: z.object({
    start: z.number(),
    end: z.number(),
  }).optional(),
  impact: z.enum(['high', 'medium', 'low']),
});

export const SpeakingMetricSchema = z.object({
  name: z.string(),
  score: z.number().min(1).max(10),
  rationale: z.string(),
});

export const FeedbackResponseDataSchema = z.object({
  overallScore: z.number().min(1).max(10),
  positives: z.string().min(50).max(500),
  areasToImprove: z.string().min(50).max(500),
  feedbackItems: z.array(FeedbackItemSchema).min(1).max(10),
  metrics: z.array(SpeakingMetricSchema).min(3).max(8),
  topPriorities: z.array(z.string()).length(3),
  duration: z.number(),
});

export type FeedbackResponseDataValidated = z.infer<typeof FeedbackResponseDataSchema>;
