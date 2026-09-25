import { Injectable } from '@nestjs/common';
import type { Asset, Browse } from '@4eye/scene-studio-shared';
import { LibraryService } from '../../library/library.service.js';

@Injectable()
export class BrowseService {
  constructor(private readonly library: LibraryService) {}

  /** Patch display + catalog fields on a single asset. */
  updateAsset(id: string, dto: Browse.UpdateAssetDto): Promise<Asset> {
    return this.library.patch(id, (e) => {
      if (dto.display) {
        if (dto.display.title !== undefined) e.title = dto.display.title;
        if (dto.display.description !== undefined) e.description = dto.display.description;
        if (dto.display.sceneCode !== undefined) e.sceneCode = dto.display.sceneCode ?? null;
      }
      if (dto.catalog) {
        if (dto.catalog.order !== undefined) e.order = dto.catalog.order;
        if (dto.catalog.tags !== undefined) e.tags = dto.catalog.tags;
        if (dto.catalog.starred !== undefined) e.starred = dto.catalog.starred;
      }
    });
  }

  async reorder(dto: Browse.ReorderDto): Promise<void> {
    const entries = Object.entries(dto.orders);
    if (entries.length === 0) return;
    const ids = entries.map(([id]) => id);
    const orderMap = new Map(entries);
    await this.library.patchMany(ids, (e) => {
      const v = orderMap.get(e.id);
      if (v !== undefined) e.order = v;
    });
  }

  bulkTag(dto: Browse.BulkTagDto): Promise<Asset[]> {
    const addSet = new Set(dto.add);
    const removeSet = new Set(dto.remove);
    return this.library.patchMany(dto.assetIds, (e) => {
      const next = new Set(e.tags);
      for (const t of addSet) next.add(t);
      for (const t of removeSet) next.delete(t);
      e.tags = [...next];
    });
  }
}
