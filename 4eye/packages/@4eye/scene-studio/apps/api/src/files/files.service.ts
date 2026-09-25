import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'node:path';
import { statSync, existsSync } from 'node:fs';
import { loadConfig } from '../config/config.service.js';
import { safeResolve } from '../common/path-guard.js';
import { LibraryService } from '../library/library.service.js';

@Injectable()
export class FilesService {
  constructor(private readonly library: LibraryService) {}

  /** Resolve the absolute file path for an asset id (after path-guarding). */
  async resolveAssetPath(id: string): Promise<{ absPath: string; mimeType: string }> {
    const asset = await this.library.getAsset(id);
    const cfg = loadConfig();
    const rel = join(asset.file.folder, asset.file.filename);
    const abs = safeResolve(cfg.galleryRoot, rel);
    if (!existsSync(abs)) {
      throw new NotFoundException(`File missing on disk: ${rel}`);
    }
    return { absPath: abs, mimeType: asset.file.mimeType };
  }

  fileSize(absPath: string): number {
    return statSync(absPath).size;
  }
}
