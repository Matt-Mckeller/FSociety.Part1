/**
 * Summary Response Zod Schema
 * 
 * Runtime validation for AI summary responses.
 */

import { z } from 'zod';

export const KeyPointSchema = z.object({
  point: z.string().min(20).max(200),
  importance: z.enum(['high', 'medium', 'low']),
  timestamp: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

export const SummarySectionSchema = z.object({
  title: z.string().max(50),
  content: z.string().min(50).max(1000),
  startTime: z.number(),
  endTime: z.number(),
});

export const SummaryResponseDataSchema = z.object({
  title: z.string().max(100),
  overview: z.string().min(50).max(500),
  sections: z.array(SummarySectionSchema).min(1).max(10),
  keyPoints: z.array(KeyPointSchema).min(3).max(15),
  duration: z.number(),
  readingLevel: z.enum(['child', 'standard', 'academic']),
  suggestedTopics: z.array(z.string()).optional(),
});

export type SummaryResponseDataValidated = z.infer<typeof SummaryResponseDataSchema>;
