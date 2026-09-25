import type { Asset } from '@4eye/scene-studio-shared';
import type { AssetEntity } from '../entities/asset.entity.js';

/** TypeORM entity → plain Asset DTO. */
export function toAsset(e: AssetEntity): Asset {
  return {
    id: e.id,
    kind: e.kind,
    file: {
      folder: e.folder,
      filename: e.filename,
      mimeType: e.mimeType,
      sizeBytes: e.sizeBytes ?? undefined,
      width: e.width,
      height: e.height,
    },
    display: {
      title: e.title,
      description: e.description ?? '',
      sceneCode: e.sceneCode ?? undefined,
    },
    catalog: {
      order: e.order,
      tags: e.tags,
      starred: !!e.starred,
    },
    origin: {
      source: e.source,
      parentIds: e.parentIds,
      prompt: e.prompt ?? undefined,
      model: e.model ?? undefined,
      jobId: e.jobId ?? undefined,
    },
    video: e.video ?? undefined,
    history: (e.history ?? []).map((h) => ({
      filename: h.filename,
      prompt: h.prompt ?? undefined,
      model: h.model ?? undefined,
      createdAt: h.createdAt.toISOString(),
    })),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}
