/**
 * Quiz Response Zod Schema
 */

import { z } from 'zod';

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
});

export const QuizQuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple_choice', 'true_false', 'fill_blank', 'short_answer']),
  question: z.string(),
  options: z.array(QuizOptionSchema).nullable().optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  timestamp: z.number().optional(),
  topic: z.string().optional(),
});

export const QuizResponseDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(QuizQuestionSchema).min(3).max(20),
  estimatedMinutes: z.number(),
  difficulty: z.object({
    easy: z.number(),
    medium: z.number(),
    hard: z.number(),
  }),
  topicsCovered: z.array(z.string()),
  passThreshold: z.number().min(0).max(100),
});

export type QuizResponseDataValidated = z.infer<typeof QuizResponseDataSchema>;
