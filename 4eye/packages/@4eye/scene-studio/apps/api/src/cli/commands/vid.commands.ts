import type { NestFactory } from '@nestjs/core';
import { AnimateService } from '../../actions/animate/animate.service.js';
import { LibraryService } from '../../library/library.service.js';
import { SeedRegistryService } from '../../seeds/seed.registry.service.js';
import { SeedRefResolverService } from '../../seeds/seed.ref-resolver.service.js';
import { loadConfig } from '../../config/config.service.js';
import { AssetEntity } from '../../entities/asset.entity.js';
import { AssetHistoryEntity } from '../../entities/asset-history.entity.js';
import { assertKnownModel } from '../../common/providers/model-registry.js';
import type { AnimateSeedDefinition } from '../../seeds/seed.kit.js';
import { imageSize } from 'image-size';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile as writeFileAsync, unlink as unlinkAsync } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { boolFlag, numFlag, strFlag, type ParsedArgs } from '../args.util.js';
import { buildAssetFilename, buildTimestampString } from '../../common/persist-asset.util.js';

type App = Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;

export async function cmdVidRun(app: App, args: ParsedArgs): Promise<void> {
  const seedId = strFlag(args.flags, 'seed');
  const providerFlag = strFlag(args.flags, 'provider') as 'veo' | 'runway' | 'fake' | undefined;
  const dryRun = boolFlag(args.flags, 'dry-run');

  const svc = app.get(AnimateService);
  const lib = app.get(LibraryService);
  const registry = app.get(SeedRegistryService);
  const resolver = app.get(SeedRefResolverService);

  let startId: string;
  let prompt: string;
  let duration: number;
  let model: string | undefined;
  const referenceAssetIds: string[] = [];
  let aspectRatio: '16:9' | '9:16' | undefined;
  let resolution: '720p' | '1080p' | '4k' | undefined;

  if (seedId) {
    const seeds = await registry.list();
    const raw = seeds.find((s) => s.id === seedId);
    if (!raw) {
      console.error(`No seed found with id "${seedId}". Run seed:list to see available seeds.`);
      process.exitCode = 1;
      return;
    }
    if (raw.kind !== 'animate') {
      console.error(`Seed "${seedId}" has kind="${raw.kind}". Only kind=animate seeds work with vid:run.`);
      process.exitCode = 1;
      return;
    }
    const seed = raw as unknown as AnimateSeedDefinition;
    const startResolved = await resolver.resolveImage(seed.startRef);
    startId = startResolved.assetId;
    prompt = strFlag(args.flags, 'prompt') ?? seed.prompt;
    duration = numFlag(args.flags, 'duration') ?? seed.durationSec ?? 5;
    model = strFlag(args.flags, 'model') ?? seed.model;

    if (seed.references?.length) {
      for (const r of seed.references) {
        try {
          const resolved = await resolver.resolveImage(r.ref);
          referenceAssetIds.push(resolved.assetId);
        } catch (err) {
          if (r.required === false) {
            console.warn(`[vid:run] optional ref ${r.ref} did not resolve — skipping`);
          } else {
            throw err;
          }
        }
      }
    }

    aspectRatio = seed.aspectRatio;
    resolution = seed.resolution;
  } else {
    const rawStart = strFlag(args.flags, 'start');
    const rawPrompt = strFlag(args.flags, 'prompt');
    if (!rawStart || !rawPrompt) {
      console.error(
        'Usage: vid:run --seed <id> [--provider veo|runway|fake] [--dry-run]\n' +
        '       vid:run --start <assetId> --prompt "..." [--duration N] [--provider veo|runway|fake] [--model NAME] [--dry-run]',
      );
      process.exitCode = 1;
      return;
    }
    startId = rawStart;
    prompt = rawPrompt;
    duration = numFlag(args.flags, 'duration') ?? 5;
    model = strFlag(args.flags, 'model');
  }

  const startAsset = await lib.getAsset(startId);
  if (model) assertKnownModel(model, 'video');

  console.log(`\nAnimation job${seedId ? ` (seed: ${seedId})` : ''}`);
  console.log(`  Start   : ${startAsset.display.title} (${startId})`);
  console.log(`  Prompt  : ${prompt}`);
  console.log(`  Duration: ${duration}s`);
  console.log(`  Provider: ${providerFlag ?? 'auto'}${model ? ` / model=${model}` : ''}`);
  if (referenceAssetIds.length) console.log(`  Refs    : ${referenceAssetIds.join(', ')}`);
  if (aspectRatio) console.log(`  AR      : ${aspectRatio}`);
  if (resolution)  console.log(`  Res     : ${resolution}`);

  if (dryRun) {
    console.log('\n[dry-run] Not sending to provider.');
    return;
  }

  const dto: Parameters<typeof svc.startJob>[0] = {
    startAssetId: startId,
    prompt,
    durationSec: duration,
    ...(model ? { model } : {}),
    ...(providerFlag ? { provider: providerFlag } : {}),
    ...(referenceAssetIds.length ? { referenceAssetIds } : {}),
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(resolution ? { resolution } : {}),
  };
  const jobId = svc.startJob(dto);
  const channel = svc.getChannel(jobId);
  if (!channel) { console.error('Could not get job channel.'); process.exitCode = 1; return; }

  console.log(`\nJob ${jobId}`);

  await new Promise<void>((resolve) => {
    channel.subject.subscribe({
      next: (progress) => {
        const pct = progress.percent != null ? ` ${Math.round(progress.percent * 100)}%` : '';
        const msg = progress.message ? ` — ${progress.message}` : '';
        console.log(`  [${progress.status}]${pct}${msg}`);
        if (progress.status === 'succeeded') {
          if (progress.asset) {
            console.log(`\n✓ Saved: ${progress.asset.file.folder}/${progress.asset.file.filename}`);
            console.log(`  ID    : ${progress.asset.id}`);
          }
          resolve();
        } else if (progress.status === 'failed' || progress.status === 'cancelled') {
          console.error(`\n✗ ${progress.status}: ${progress.error ?? '(no details)'}`);
          process.exitCode = 1;
          resolve();
        }
      },
      error: (err) => { console.error('\nJob error:', err); process.exitCode = 1; resolve(); },
      complete: resolve,
    });
  });
}

export async function cmdVidExtractFrame(app: App, args: ParsedArgs): Promise<void> {
  const videoId = strFlag(args.flags, 'video');
  if (!videoId) {
    console.error('Usage: vid:extract-frame --video <assetId> [--at last|first|<N>]');
    process.exitCode = 1;
    return;
  }
  const atFlag = (strFlag(args.flags, 'at') ?? 'last').toLowerCase();

  const lib = app.get(LibraryService);
  const { galleryRoot } = loadConfig();
  const asset = await lib.getAsset(videoId);
  if (asset.kind !== 'video') {
    console.error(`Asset ${videoId} is kind="${asset.kind}" — expected "video".`);
    process.exitCode = 1;
    return;
  }

  const videoPath = join(galleryRoot, asset.file.folder, asset.file.filename);
  let ffmpegArgs: string[];
  if (atFlag === 'last') {
    ffmpegArgs = ['-sseof', '-0.5', '-i', videoPath, '-vframes', '1', '-q:v', '2'];
  } else if (atFlag === 'first') {
    ffmpegArgs = ['-i', videoPath, '-vf', "select='eq(n,0)'", '-vframes', '1'];
  } else {
    const frameN = parseInt(atFlag, 10);
    if (isNaN(frameN)) {
      console.error(`--at must be "last", "first", or a frame number. Got: ${atFlag}`);
      process.exitCode = 1;
      return;
    }
    ffmpegArgs = ['-i', videoPath, '-vf', `select='eq(n,${frameN})'`, '-vframes', '1'];
  }

  const tmpPath = join(tmpdir(), `gallery-frame-${randomUUID()}.png`);
  ffmpegArgs.push('-f', 'image2', tmpPath);
  console.log(`\nExtracting frame (${atFlag}) from ${asset.display.title} (${videoId})…`);

  await new Promise<void>((resolve, reject) => {
    const proc = spawn('ffmpeg', ['-y', ...ffmpegArgs], { stdio: ['ignore', 'pipe', 'pipe'] });
    const stderr: Buffer[] = [];
    proc.stderr?.on('data', (chunk: Buffer) => stderr.push(chunk));
    proc.on('error', (err) => {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        reject(new Error('ffmpeg not found. Install it: brew install ffmpeg'));
      } else {
        reject(err);
      }
    });
    proc.on('close', (code) => {
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}:\n${Buffer.concat(stderr).toString().slice(-500)}`));
    });
  });

  const { readFile } = await import('node:fs/promises');
  const pngBuffer = await readFile(tmpPath);
  try { await unlinkAsync(tmpPath); } catch { /* best-effort */ }

  const dims = imageSize(pngBuffer);
  const width = dims.width ?? 1280;
  const height = dims.height ?? 720;

  const contentHash = createHash('sha1').update(pngBuffer).digest('hex').slice(0, 8);
  const filename = buildAssetFilename({
    title: `${asset.display.title} frame-${atFlag}`,
    sceneCode: asset.display.sceneCode,
    extension: 'png',
    contentHash,
    tsStr: buildTimestampString(),
  });
  const outFolder = '07_generated';
  const outDir = join(galleryRoot, outFolder);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  await writeFileAsync(join(outDir, filename), pngBuffer);

  const id = createHash('sha1').update(`${outFolder}/${filename}`).digest('hex').slice(0, 16);
  const entity = new AssetEntity();
  entity.id = id;
  entity.kind = 'image';
  entity.folder = outFolder;
  entity.filename = filename;
  entity.mimeType = 'image/png';
  entity.sizeBytes = pngBuffer.byteLength;
  entity.width = width;
  entity.height = height;
  entity.title = `${asset.display.title} (frame:${atFlag})`;
  entity.description = '';
  entity.sceneCode = asset.display.sceneCode ?? null;
  entity.order = asset.catalog.order ?? 0;
  entity.tags = ['frame-extract'];
  entity.starred = false;
  entity.source = 'frame-extract';
  entity.parentIds = [videoId];
  entity.prompt = '';
  entity.model = null;
  entity.jobId = null;

  const historyEntry = new AssetHistoryEntity();
  historyEntry.filename = filename;
  historyEntry.prompt = `Extracted ${atFlag} frame from ${videoId}`;
  historyEntry.createdAt = new Date();
  entity.history = [historyEntry];

  const saved = await lib.upsert(entity);
  console.log(`\n✓ Saved: ${outFolder}/${filename}`);
  console.log(`  ID    : ${saved.id}`);
  console.log(`\nUse as start frame:`);
  console.log(`  pnpm -F @4eye/scene-studio-api cli vid:run --start ${saved.id} --prompt "..." --provider runway`);
}
