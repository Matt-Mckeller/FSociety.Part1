import { z } from "zod";

export const RewardMarkSchema = z.object({
  signal: z.enum(["vision", "concise", "curtain", "search"]),
  delta: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
  at: z.string(),
  note: z.string().optional(),
});

export const VisionClaimSchema = z.object({
  color: z.string().optional(),
  shape: z.string().optional(),
  count: z.number().int().nonnegative(),
  flying: z.boolean(),
  occluded: z.boolean(),
});

export const AudioSearchHitSchema = z.object({
  tSec: z.number(),
  score: z.number(),
  snippet: z.string(),
  kind: z.enum(["speech", "bounce", "whoosh", "room"]),
});

export const RlEpisodeSchema = z.object({
  id: z.string().min(1),
  subjectId: z.string().min(1),
  seedId: z.string().min(1),
  tStart: z.string(),
  tEnd: z.string().optional(),
  vision: VisionClaimSchema.optional(),
  audioHits: z.array(AudioSearchHitSchema),
  curtainPulled: z.boolean(),
  describedHidden: z.boolean(),
  receipt: z.string(),
  policy: z.object({
    settingsSnapshot: z.object({
      accuracy: z.enum(["low", "medium", "high", "maximum"]),
      timeAspect: z.enum(["auto", "past", "present", "future", "max"]),
      powerLevel: z.enum(["auto", "ion", "ion-plus", "aion", "aion-plus"]),
      planMode: z.enum(["auto", "recommended", "indepth", "concise", "off"]),
    }),
  }),
  rewards: z.array(RewardMarkSchema),
});
