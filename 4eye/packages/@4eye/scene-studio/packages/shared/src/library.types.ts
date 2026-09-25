import { z } from 'zod';
import { Asset } from './asset.types.js';

export const LIBRARY_SCHEMA_VERSION = 2 as const;

export const Library = z.object({
  schemaVersion: z.literal(LIBRARY_SCHEMA_VERSION),
  rootDir: z.string(),
  assets: z.array(Asset),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Library = z.infer<typeof Library>;
