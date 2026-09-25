import type { NestFactory } from '@nestjs/core';
import { ValidateService } from '../../validate/validate.service.js';
import { LibraryService } from '../../library/library.service.js';
import { loadConfig } from '../../config/config.service.js';
import { AssetEntity } from '../../entities/asset.entity.js';
import { AssetHistoryEntity } from '../../entities/asset-history.entity.js';
import { imageSize } from 'image-size';
import { renameSync, existsSync, mkdirSync, statSync, copyFileSync } from 'node:fs';
import { writeFile as writeFileAsync, unlink as unlinkAsync } from 'node:fs/promises';
import { join, resolve, basename, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { boolFlag, strFlag, pad, type ParsedArgs } from '../args.util.js';

type App = Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;

const MIME_MAP: Record<string, string> = {
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
};

export async function cmdAssetImport(app: App, args: ParsedArgs): Promise<void> {
  const srcPath = args.positional[0];
  if (!srcPath) {
    console.error('Usage: asset:import <path> [--to <folder>] [--star] [--scene-code CODE] [--title "..."]');
    process.exitCode = 1;
    return;
  }

  const { galleryRoot } = loadConfig();
  const to         = strFlag(args.flags, 'to') ?? '00_reference';
  const sceneCode  = strFlag(args.flags, 'scene-code') ?? null;
  const star       = boolFlag(args.flags, 'star');
  const titleArg   = strFlag(args.flags, 'title');

  const resolvedSrc = resolve(process.cwd(), srcPath);
  if (!existsSync(resolvedSrc)) {
    console.error(`File not found: ${resolvedSrc}`);
    process.exitCode = 1;
    return;
  }

  const filename = basename(resolvedSrc);
  const ext      = extname(filename).toLowerCase();
  const mimeType = MIME_MAP[ext] ?? 'application/octet-stream';
  const sizeBytes = statSync(resolvedSrc).size;

  let width = 0;
  let height = 0;
  try {
    const dims = imageSize(resolvedSrc);
    width  = dims.width  ?? 0;
    height = dims.height ?? 0;
  } catch { /* vector/unsupported — leave 0x0 */ }

  const destDir  = join(galleryRoot, to);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
  const destPath = join(destDir, filename);
  copyFileSync(resolvedSrc, destPath);

  const lib    = app.get(LibraryService);
  const entity = new AssetEntity();
  entity.id           = randomUUID().replace(/-/g, '').slice(0, 16);
  entity.kind         = 'image';
  entity.folder       = to;
  entity.filename     = filename;
  entity.mimeType     = mimeType;
  entity.sizeBytes    = sizeBytes;
  entity.width        = width;
  entity.height       = height;
  entity.title        = titleArg ?? filename.replace(/\.[^.]+$/, '');
  entity.description  = '';
  entity.sceneCode    = sceneCode;
  entity.order        = Date.now();
  entity.tagsJson     = '[]';
  entity.starred      = star;
  entity.source       = 'imported';
  entity.parentIdsJson = '[]';
  entity.prompt       = null;
  entity.model        = null;
  entity.jobId        = null;
  entity.videoJson    = null;
  entity.history      = [];

  const saved = await lib.upsert(entity);
  console.log(`Imported : ${filename}`);
  console.log(`  id     : ${saved.id}`);
  console.log(`  folder : ${to}`);
  if (width || height) console.log(`  size   : ${width}x${height}`);
  if (sceneCode) console.log(`  scene  : ${sceneCode}`);
  if (star)      console.log(`  starred: ★`);
}

export async function cmdAssetTest(app: App, args: ParsedArgs): Promise<void> {
  const assetId = args.positional[0];
  if (!assetId) {
    console.error('Usage: asset:test <assetId> [--verbose]');
    process.exitCode = 1;
    return;
  }
  const svc = app.get(ValidateService);
  console.log(`\nRunning 4eye spec validation on asset ${assetId}...\n`);
  const report = await svc.testAsset(assetId);

  const PASS = '\x1b[32m✓ PASS\x1b[0m';
  const FAIL = '\x1b[31m✗ FAIL\x1b[0m';
  const UNCLEAR = '\x1b[33m? UNCLEAR\x1b[0m';
  const fmt = (r: string) => r === 'pass' ? PASS : r === 'fail' ? FAIL : UNCLEAR;

  const COL_CRIT = 26;
  const COL_RES = 10;
  console.log(`File: ${report.filename}`);
  console.log('─'.repeat(72));
  console.log(pad('CRITERION', COL_CRIT) + pad('RESULT', COL_RES) + 'NOTE');
  console.log('─'.repeat(72));
  for (const c of report.criteria) {
    console.log(pad(c.id, COL_CRIT) + fmt(c.result).padEnd(COL_RES + 10) + (c.note ?? ''));
  }
  console.log('─'.repeat(72));
  const passCount = report.criteria.filter((c) => c.result === 'pass').length;
  const total = report.criteria.length;
  const overallLabel = report.overall === 'pass' ? `\x1b[32mPASS\x1b[0m` : `\x1b[31mFAIL\x1b[0m`;
  console.log(`OVERALL: ${overallLabel} (${passCount}/${total})`);
  if (report.summary) console.log(`\n${report.summary}\n`);
  if (report.overall === 'fail') process.exitCode = 1;
}

export async function cmdAssetPromote(app: App, args: ParsedArgs): Promise<void> {
  const assetId = args.positional[0];
  if (!assetId) {
    console.error('Usage: asset:promote <id> --to <folder> [--star] [--scene-code CODE]');
    process.exitCode = 1;
    return;
  }
  const to = strFlag(args.flags, 'to');
  if (!to) { console.error('--to <folder> is required'); process.exitCode = 1; return; }
  const lib = app.get(LibraryService);
  const { galleryRoot } = loadConfig();
  const asset = await lib.getAsset(assetId);
  const oldPath = join(galleryRoot, asset.file.folder, asset.file.filename);
  const newDir = join(galleryRoot, to);
  const newPath = join(newDir, asset.file.filename);
  if (!existsSync(newDir)) mkdirSync(newDir, { recursive: true });
  if (oldPath !== newPath) {
    if (!existsSync(oldPath)) {
      console.error(`Source file not found on disk: ${oldPath}`);
      process.exitCode = 1;
      return;
    }
    renameSync(oldPath, newPath);
    console.log(`  moved  : ${asset.file.folder}/${asset.file.filename} → ${to}/`);
  }
  const sceneCode = strFlag(args.flags, 'scene-code');
  const star = boolFlag(args.flags, 'star');
  await lib.patch(assetId, (e) => {
    e.folder = to;
    if (star) e.starred = true;
    if (sceneCode) e.sceneCode = sceneCode;
  });
  const flags = [star ? '★ starred' : '', sceneCode ? `sceneCode=${sceneCode}` : ''].filter(Boolean).join(', ');
  console.log(`Promoted ${assetId.slice(0, 16)}… → ${to}${flags ? ` (${flags})` : ''}`);
}

export async function cmdAssetDemote(app: App, args: ParsedArgs): Promise<void> {
  const assetId = args.positional[0];
  if (!assetId) {
    console.error('Usage: asset:demote <id> --to <folder> [--unstar]');
    process.exitCode = 1;
    return;
  }
  const to = strFlag(args.flags, 'to');
  if (!to) { console.error('--to <folder> is required'); process.exitCode = 1; return; }
  const lib = app.get(LibraryService);
  const { galleryRoot } = loadConfig();
  const asset = await lib.getAsset(assetId);
  const oldPath = join(galleryRoot, asset.file.folder, asset.file.filename);
  const newDir = join(galleryRoot, to);
  const newPath = join(newDir, asset.file.filename);
  if (!existsSync(newDir)) mkdirSync(newDir, { recursive: true });
  if (oldPath !== newPath) {
    if (!existsSync(oldPath)) {
      console.error(`Source file not found on disk: ${oldPath}`);
      process.exitCode = 1;
      return;
    }
    renameSync(oldPath, newPath);
    console.log(`  moved  : ${asset.file.folder}/${asset.file.filename} → ${to}/`);
  }
  const unstar = boolFlag(args.flags, 'unstar');
  const sceneCode = strFlag(args.flags, 'scene-code');
  await lib.patch(assetId, (e) => {
    e.folder = to;
    if (unstar) e.starred = false;
    if (sceneCode) e.sceneCode = sceneCode;
  });
  const flags = [unstar ? '☆ unstarred' : '', sceneCode ? `sceneCode=${sceneCode}` : ''].filter(Boolean).join(', ');
  console.log(`Demoted  ${assetId.slice(0, 16)}… → ${to}${flags ? ` (${flags})` : ''}`);
}
