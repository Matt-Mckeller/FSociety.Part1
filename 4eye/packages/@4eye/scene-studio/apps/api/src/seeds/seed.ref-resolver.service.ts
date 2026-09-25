import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resolve, isAbsolute } from 'node:path';
import { existsSync } from 'node:fs';
import type { Asset } from '@4eye/scene-studio-shared';
import { AssetEntity } from '../entities/asset.entity.js';
import { LibraryService } from '../library/library.service.js';
import { SequencesService } from '../sequences/sequences.service.js';
import { loadConfig } from '../config/config.service.js';
import type { SeedRefSelector } from './seed.kit.js';

export interface ResolvedImageRef {
  selector: SeedRefSelector;
  assetId: string;
  asset: Asset;
}

export interface ResolvedTextRef {
  selector: SeedRefSelector;
  absPath: string;
  /** Path passed downstream to the markdown loader (absolute). */
  loaderSelector: string;
}

/**
 * Resolves seed reference selectors against the live library, sequence catalog, and
 * filesystem. Pure-ish — no mutations. Throws NotFoundException with the original
 * selector on miss.
 */
@Injectable()
export class SeedRefResolverService {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assets: Repository<AssetEntity>,
    private readonly library: LibraryService,
    private readonly sequences: SequencesService,
  ) {}

  // ── image refs ─────────────────────────────────────────────────────────
  async resolveImage(selector: SeedRefSelector): Promise<ResolvedImageRef> {
    const [scheme, ...rest] = selector.split(':');
    const value = rest.join(':');
    switch (scheme) {
      case 'assetId': {
        const asset = await this.library.getAsset(value);
        return { selector, assetId: asset.id, asset };
      }
      case 'sceneCode': {
        // Prefer starred matches, else order ASC.
        const matches = await this.assets.find({
          where: { sceneCode: value },
          order: { starred: 'DESC', order: 'ASC' },
        });
        const hit = matches[0];
        if (!hit) {
          throw new NotFoundException(`No asset with sceneCode=${value}`);
        }
        return { selector, assetId: hit.id, asset: await this.library.getAsset(hit.id) };
      }
      case 'slug': {
        const seq = await this.sequences.getBySlug(value);
        const firstId = seq.frameIds[0];
        if (!firstId) throw new NotFoundException(`Sequence ${value} has no frames`);
        return { selector, assetId: firstId, asset: await this.library.getAsset(firstId) };
      }
      case 'tag': {
        // `tag:my-tag` or `tag:my-tag:starred`
        const [tag, modifier] = value.split(':');
        if (!tag) throw new NotFoundException(`Empty tag in selector: ${selector}`);
        const onlyStarred = modifier === 'starred';
        const candidates = await this.assets.find({
          where: onlyStarred ? { starred: true } : undefined,
        });
        const matched = candidates.filter((a) => {
          const tags: string[] = a.tagsJson ? JSON.parse(a.tagsJson) : [];
          return tags.includes(tag);
        });
        if (matched.length === 0) {
          throw new NotFoundException(`No asset with tag=${tag}${onlyStarred ? ' (starred)' : ''}`);
        }
        if (matched.length > 1) {
          throw new NotFoundException(
            `Ambiguous tag selector ${selector} matched ${matched.length} assets — narrow with :starred or use assetId:`,
          );
        }
        const hit = matched[0]!;
        return { selector, assetId: hit.id, asset: await this.library.getAsset(hit.id) };
      }
      default:
        throw new NotFoundException(`Unknown image ref scheme: ${scheme}`);
    }
  }

  // ── text refs ──────────────────────────────────────────────────────────
  /**
   * `file:<path>` selectors resolve to an absolute path. The path may be:
   *   - absolute
   *   - relative to the seed file (when `seedDir` is provided and the path starts with `./` or `../`)
   *   - relative to PLANS_ROOT otherwise
   */
  resolveText(selector: SeedRefSelector, seedDir?: string): ResolvedTextRef {
    const [scheme, ...rest] = selector.split(':');
    if (scheme !== 'file') {
      throw new NotFoundException(`Unknown text ref scheme: ${scheme}`);
    }
    const path = rest.join(':');
    const cfg = loadConfig();
    let absPath: string;
    if (isAbsolute(path)) {
      absPath = path;
    } else if (seedDir && (path.startsWith('./') || path.startsWith('../'))) {
      absPath = resolve(seedDir, path);
    } else {
      absPath = resolve(cfg.plansRoot, path);
    }
    if (!existsSync(absPath)) {
      throw new NotFoundException(`file ref not found: ${absPath} (selector=${selector})`);
    }
    return { selector, absPath, loaderSelector: absPath };
  }

  /** Returns true if the selector resolves, false otherwise. Used for preconditions. */
  async exists(selector: SeedRefSelector, seedDir?: string): Promise<boolean> {
    try {
      if (selector.startsWith('file:')) {
        this.resolveText(selector, seedDir);
        return true;
      }
      await this.resolveImage(selector);
      return true;
    } catch {
      return false;
    }
  }
}
