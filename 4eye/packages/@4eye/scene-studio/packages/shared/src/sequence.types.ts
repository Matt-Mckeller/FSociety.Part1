import { z } from 'zod';

/**
 * A named, ordered list of asset ids defining a narrative/playback sequence.
 * Each frame's display label is computed from `sceneCode` + position
 * (e.g. sceneCode="S1-C", position 0 → "S1-C1").
 */
export const Sequence = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  sceneCode: z.string(),
  description: z.string().default(''),
  frameIds: z.array(z.string()).default([]),
  autoStar: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Sequence = z.infer<typeof Sequence>;

export const CreateSequenceDto = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'lowercase, digits, hyphens only'),
  sceneCode: z.string().min(1),
  description: z.string().default(''),
  frameIds: z.array(z.string()).default([]),
  autoStar: z.boolean().default(false),
});
export type CreateSequenceDto = z.infer<typeof CreateSequenceDto>;

export const UpdateSequenceDto = CreateSequenceDto.partial();
export type UpdateSequenceDto = z.infer<typeof UpdateSequenceDto>;

export const ReorderFramesDto = z.object({
  frameIds: z.array(z.string()),
});
export type ReorderFramesDto = z.infer<typeof ReorderFramesDto>;

export const AddFrameDto = z.object({
  assetId: z.string(),
  position: z.number().int().nonnegative().optional(),
});
export type AddFrameDto = z.infer<typeof AddFrameDto>;

/** Compute the display label for a frame at a 0-based position. */
export function frameLabel(sceneCode: string, position: number): string {
  return `${sceneCode}${position + 1}`;
}
