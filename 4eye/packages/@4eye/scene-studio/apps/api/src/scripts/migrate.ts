/**
 * One-time migration: existing manifest.json → library.db
 *
 *   pnpm migrate
 *
 * Safe to re-run: upserts by stable id (sha1 of original filename).
 * Skips entries whose file isn't a supported image/video.
 */
import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { lookup as mimeLookup } from 'mime-types';
import { imageSize } from 'image-size';
import { readFile } from 'node:fs/promises';
import { loadConfig } from '../config/config.service.js';
import { AssetEntity } from '../entities/asset.entity.js';
import { AssetHistoryEntity } from '../entities/asset-history.entity.js';
import { PromptEntity } from '../entities/prompt.entity.js';
import { assetIdFromFilename } from '../common/id.util.js';
import { parseFilename } from '../common/filename.util.js';
import type { AssetKind } from '@4eye/scene-studio-shared';

interface OldManifestEntry {
  folder: string;
  filename: string;
  description?: string;
  source_path?: string;
  dimensions?: string;
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm']);

function kindFor(filename: string): AssetKind | null {
  const ext = extname(filename).toLowerCase();
  if (IMAGE_EXTS.has(ext)) return 'image';
  if (VIDEO_EXTS.has(ext)) return 'video';
  return null;
}

async function parseDimensions(
  s: string | undefined,
  absPath: string,
): Promise<{ width: number; height: number } | null> {
  if (s && /^\d+x\d+$/.test(s)) {
    const [w, h] = s.split('x').map(Number);
    return { width: w!, height: h! };
  }
  try {
    const buf = await readFile(absPath);
    const r = imageSize(buf);
    if (r.width && r.height) return { width: r.width, height: r.height };
  } catch {
    /* not an image */
  }
  return null;
}

async function main() {
  const cfg = loadConfig();
  const manifestPath = join(cfg.galleryRoot, 'manifest.json');
  if (!existsSync(manifestPath)) {
    console.error(`No manifest.json at ${manifestPath}`);
    process.exit(1);
  }

  const ds = new DataSource({
    type: 'better-sqlite3',
    database: cfg.dbPath,
    entities: [AssetEntity, AssetHistoryEntity, PromptEntity],
    synchronize: true,
    logging: false,
  });
  await ds.initialize();
  const assets = ds.getRepository(AssetEntity);

  const raw: OldManifestEntry[] = JSON.parse(readFileSync(manifestPath, 'utf8'));
  let imported = 0;
  let skipped = 0;
  let order = 0;

  for (const entry of raw) {
    const kind = kindFor(entry.filename);
    if (!kind) {
      console.warn(`  skip (unsupported type): ${entry.folder}/${entry.filename}`);
      skipped++;
      continue;
    }

    const absPath = join(cfg.galleryRoot, entry.folder, entry.filename);
    if (!existsSync(absPath)) {
      console.warn(`  skip (file missing on disk): ${entry.folder}/${entry.filename}`);
      skipped++;
      continue;
    }

    const dims = await parseDimensions(entry.dimensions, absPath);
    if (!dims) {
      console.warn(`  skip (no dimensions): ${entry.folder}/${entry.filename}`);
      skipped++;
      continue;
    }

    const id = assetIdFromFilename(entry.filename);
    const parsed = parseFilename(entry.filename);
    const mimeType = (mimeLookup(entry.filename) || 'application/octet-stream') as string;
    const fileStat = statSync(absPath);

    const existing = await assets.findOne({ where: { id } });
    const e = existing ?? new AssetEntity();
    e.id = id;
    e.kind = kind;
    e.folder = entry.folder;
    e.filename = entry.filename;
    e.mimeType = mimeType;
    e.sizeBytes = fileStat.size;
    e.width = dims.width;
    e.height = dims.height;
    if (!existing) {
      e.title = parsed.title;
      e.description = entry.description ?? '';
      e.sceneCode = parsed.sceneCode;
      e.order = order;
      e.tags = [];
      e.starred = false;
      e.source = 'imported';
      e.parentIds = [];
      e.prompt = null;
      e.model = null;
      e.jobId = null;
      e.video = null;
      e.history = [];
    }
    await assets.save(e);
    imported++;
    order++;
  }

  console.log(`\n✓ migrated ${imported} asset${imported === 1 ? '' : 's'}, skipped ${skipped}`);
  console.log(`  db:     ${cfg.dbPath}`);
  console.log(`  root:   ${cfg.galleryRoot}`);
  await ds.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
