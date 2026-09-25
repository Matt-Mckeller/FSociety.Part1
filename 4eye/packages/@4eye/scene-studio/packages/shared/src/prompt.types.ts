import { z } from 'zod';

export const PromptKind = z.enum(['edit', 'animate', 'chat']);
export type PromptKind = z.infer<typeof PromptKind>;

export const SavedPrompt = z.object({
  id: z.string(),
  name: z.string(),
  body: z.string(),
  kind: PromptKind,
  tags: z.array(z.string()).default([]),
  usageCount: z.number().int().nonnegative().default(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type SavedPrompt = z.infer<typeof SavedPrompt>;
