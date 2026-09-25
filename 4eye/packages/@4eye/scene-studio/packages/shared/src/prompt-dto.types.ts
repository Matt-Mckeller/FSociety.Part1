import { z } from 'zod';
import { SavedPrompt, PromptKind } from './prompt.types.js';

export const CreatePromptDto = z.object({
  name: z.string().min(1),
  body: z.string().min(1),
  kind: PromptKind,
  tags: z.array(z.string()).default([]),
});
export type CreatePromptDto = z.infer<typeof CreatePromptDto>;

export const UpdatePromptDto = CreatePromptDto.partial();
export type UpdatePromptDto = z.infer<typeof UpdatePromptDto>;

export { SavedPrompt };
