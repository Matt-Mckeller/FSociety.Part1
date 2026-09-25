import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { ReplaySubject } from 'rxjs';
import sharp from 'sharp';
import type { Asset, Generate, GenerationReferenceResolved } from '@4eye/scene-studio-shared';
import { LibraryService } from '../library/library.service.js';
import { FilesService } from '../files/files.service.js';
import { loadConfig } from '../config/config.service.js';
import { AssetEntity } from '../entities/asset.entity.js';
import { AssetHistoryEntity } from '../entities/asset-history.entity.js';
import { WsGateway } from '../ws/ws.gateway.js';
import { GenerationLogService } from '../generation/generation-log.service.js';
import { SequencesService } from '../sequences/sequences.service.js';
import { loadMarkdownRef, formatContextBlock } from '../markdown/markdown-loader.js';
import { OpenAiImageGenerateProvider } from './providers/openai-image-generate.provider.js';
import { GeminiImageGenerateProvider } from './providers/gemini-image-generate.provider.js';
import { FakeImageGenerateProvider } from './providers/fake-image-generate.provider.js';
import type {
  GenerateImageInput,
  ImageGenerateProvider,
} from './providers/image-generate.provider.js';
import { buildAssetFilename, buildTimestampString } from '../common/persist-asset.util.js';

interface JobChannel {
  /** ReplaySubject so late SSE subscribers get every event since job start. */
  subject: ReplaySubject<Generate.Progress>;
  history: Generate.Progress[];
  done: boolean;
}

@Injectable()
export class GenerateService {
  private readonly log = new Logger(GenerateService.name);
  private readonly jobs = new Map<string, JobChannel>();

  constructor(
    private readonly library: LibraryService,
    private readonly files: FilesService,
    private readonly ws: WsGateway,
    private readonly openai: OpenAiImageGenerateProvider,
    private readonly gemini: GeminiImageGenerateProvider,
    private readonly fake: FakeImageGenerateProvider,
    private readonly genLog: GenerationLogService,
    private readonly sequences: SequencesService,
  ) {}

  private pickProvider(): ImageGenerateProvider {
    const cfg = loadConfig();
    const sel = cfg.providers.imageGenerate;
    if (sel === 'gemini') return this.gemini;
    if (sel === 'openai') return this.openai;
    if (sel === 'fake') return this.fake;
    // auto
    if (cfg.google.apiKey) return this.gemini;
    if (cfg.openai.apiKey) return this.openai;
    return this.fake;
  }

  startJob(dto: Generate.RequestDto): string {
    const jobId = randomUUID();
    const channel: JobChannel = {
      subject: new ReplaySubject<Generate.Progress>(1000),
      history: [],
      done: false,
    };
    this.jobs.set(jobId, channel);

    this.runJob(jobId, dto).catch((err) => {
      this.emit(jobId, {
        jobId,
        stage: 'failed',
        error: err instanceof Error ? err.message : String(err),
      });
    });

    return jobId;
  }

  getChannel(jobId: string): JobChannel | undefined {
    return this.jobs.get(jobId);
  }

  private emit(jobId: string, progress: Generate.Progress): void {
    const ch = this.jobs.get(jobId);
    if (!ch) return;
    ch.history.push(progress);
    ch.subject.next(progress);
    this.ws.broadcast({ type: 'generate:progress', progress });
    if (progress.stage === 'done' || progress.stage === 'failed') {
      ch.done = true;
      setTimeout(() => {
        ch.subject.complete();
        this.jobs.delete(jobId);
      }, 120_000);
    }
  }

  private async runJob(jobId: string, dto: Generate.RequestDto): Promise<void> {
    this.emit(jobId, { jobId, stage: 'queued' });
    const cfg = loadConfig();
    const provider = this.pickProvider();
    const modelName =
      dto.model ?? (provider.name === 'gemini' ? cfg.google.imageModel : cfg.openai.imageModel);

    const { images, resolvedRefs: imageRefs } = await this.resolveImageRefs(dto);

    this.emit(jobId, { jobId, stage: 'composing', percent: 0.05 });
    const { contextBlocks, resolvedRefs: textRefs } = await this.loadContextBlocks(dto, cfg.plansRoot);

    const composedPrompt = this.composePrompt(dto.prompt, contextBlocks);
    const resolvedRefs: GenerationReferenceResolved[] = [...imageRefs, ...textRefs];

    const logId = await this.genLog.start({
      kind: 'generate',
      provider: provider.name,
      model: modelName,
      prompt: composedPrompt,
      promptBody: dto.prompt,
      inputAssetIds: images.map((i) => i.asset.id),
      sceneCode: dto.sceneCode,
      targetSequenceId: dto.insertIntoSequence?.sequenceId,
      seedId: dto.seedId,
      seedGitSha: dto.seedGitSha,
      references: resolvedRefs,
      params: {
        size: dto.size,
        variations: dto.variations,
        tags: dto.tags,
        insertIntoSequence: dto.insertIntoSequence,
      },
      rawRequest: {
        prompt: dto.prompt,
        referenceAssetIds: images.map((i) => i.asset.id),
        referenceFiles: dto.referenceFiles,
        size: dto.size,
        variations: dto.variations,
        model: modelName,
        title: dto.title,
        sceneCode: dto.sceneCode,
        tags: dto.tags,
        insertIntoSequence: dto.insertIntoSequence,
        seedId: dto.seedId,
      },
    });
    this.emit(jobId, { jobId, stage: 'composing', percent: 0.1, logId });

    try {
      this.emit(jobId, {
        jobId,
        stage: 'generating',
        percent: 0.2,
        message: `Calling ${provider.name} (${images.length} ref${images.length > 1 ? 's' : ''})…`,
        logId,
      });

      const results = await provider.generate({
        prompt: composedPrompt,
        images,
        size: dto.size,
        variations: dto.variations,
        model: dto.model,
      });

      this.emit(jobId, {
        jobId,
        stage: 'saving',
        percent: 0.75,
        message: `Saving ${results.length} image(s)…`,
        logId,
      });

      const newAssets = await this.persistOutputs(results, dto, images, jobId, modelName, composedPrompt, cfg);
      const insertedFrameIds = await this.optionallyInsertIntoSequence(newAssets, dto);

      await this.genLog.finishSuccess(logId, {
        outputAssetIds: newAssets.map((a) => a.id),
        targetSequenceFrameIds: insertedFrameIds,
        cost: { outputImages: newAssets.length, inputImages: images.length },
      });

      this.emit(jobId, { jobId, stage: 'done', percent: 1, newAssets, logId });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await this.genLog.finishError(logId, msg).catch(() => {});
      throw err;
    }
  }

  private async resolveImageRefs(dto: Generate.RequestDto): Promise<{
    images: GenerateImageInput[];
    resolvedRefs: GenerationReferenceResolved[];
  }> {
    const specs =
      dto.referenceImages && dto.referenceImages.length > 0
        ? dto.referenceImages
        : dto.referenceAssetIds.map((id) => ({
            assetId: id,
            role: undefined as string | undefined,
            description: undefined as string | undefined,
          }));

    if (specs.length === 0) {
      throw new Error('generate() requires at least one referenceImage / referenceAssetId');
    }

    const images: GenerateImageInput[] = [];
    const resolvedRefs: GenerationReferenceResolved[] = [];
    for (const spec of specs) {
      const asset = await this.library.getAsset(spec.assetId);
      const { absPath } = await this.files.resolveAssetPath(spec.assetId);
      images.push({ asset, absPath });
      resolvedRefs.push({
        selector: `assetId:${spec.assetId}`,
        kind: 'image',
        role: spec.role,
        description: spec.description,
        assetId: spec.assetId,
      });
    }
    return { images, resolvedRefs };
  }

  private async loadContextBlocks(
    dto: Generate.RequestDto,
    plansRoot: string,
  ): Promise<{ contextBlocks: string[]; resolvedRefs: GenerationReferenceResolved[] }> {
    const contextBlocks: string[] = [];
    const resolvedRefs: GenerationReferenceResolved[] = [];
    for (const fileRef of dto.referenceFiles) {
      const loaded = await loadMarkdownRef({
        selector: fileRef.selector,
        baseDir: plansRoot,
        section: fileRef.section,
        concepts: fileRef.concepts,
      });
      contextBlocks.push(formatContextBlock(loaded, fileRef.role ?? 'context', fileRef.description));
      resolvedRefs.push({
        selector: `file:${fileRef.selector}`,
        kind: 'text',
        role: fileRef.role,
        description: fileRef.description,
        filePath: loaded.absPath,
        section: loaded.section,
        charCount: loaded.charCount,
      });
    }
    return { contextBlocks, resolvedRefs };
  }

  private composePrompt(prompt: string, contextBlocks: string[]): string {
    return contextBlocks.length > 0
      ? `${contextBlocks.join('\n\n')}\n\n[GENERATION TASK]\n${prompt}`
      : prompt;
  }

  private async persistOutputs(
    results: Array<{ pngBuffer: Buffer }>,
    dto: Generate.RequestDto,
    images: GenerateImageInput[],
    jobId: string,
    modelName: string,
    composedPrompt: string,
    cfg: ReturnType<typeof loadConfig>,
  ): Promise<Asset[]> {
    const seedAsset = images[0]!.asset;
    const tsStr = buildTimestampString();
    const newAssets: Asset[] = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i]!;
      const contentHash = createHash('sha1').update(result.pngBuffer).digest('hex').slice(0, 8);
      const newFilename = buildAssetFilename({
        title: dto.title ?? seedAsset.display.title,
        sceneCode: dto.sceneCode ?? seedAsset.display.sceneCode,
        extension: 'png',
        contentHash,
        tsStr,
        variant: results.length > 1 ? `v${i + 1}` : undefined,
      });
      await writeFile(join(cfg.generatedDir, newFilename), result.pngBuffer);

      const meta = await sharp(result.pngBuffer).metadata();
      const id = createHash('sha1').update(`07_generated/${newFilename}`).digest('hex').slice(0, 16);

      const entity = new AssetEntity();
      entity.id = id;
      entity.kind = 'image';
      entity.folder = '07_generated';
      entity.filename = newFilename;
      entity.mimeType = 'image/png';
      entity.sizeBytes = result.pngBuffer.byteLength;
      entity.width = meta.width ?? 1024;
      entity.height = meta.height ?? 1024;
      entity.title = dto.title
        ? `${dto.title}${results.length > 1 ? ` (v${i + 1})` : ''}`
        : `${seedAsset.display.title} (gen${results.length > 1 ? ` v${i + 1}` : ''})`;
      entity.description = '';
      entity.sceneCode = dto.sceneCode ?? seedAsset.display.sceneCode ?? null;
      entity.order = (seedAsset.catalog.order ?? 0) + 0.0001 * (i + 1);
      entity.tags = uniq(['generated', ...dto.tags]);
      entity.starred = false;
      entity.source = 'generate';
      entity.parentIds = images.map((img) => img.asset.id);
      entity.prompt = composedPrompt;
      entity.model = modelName;
      entity.jobId = jobId;
      entity.videoJson = null;

      const historyEntry = new AssetHistoryEntity();
      historyEntry.filename = newFilename;
      historyEntry.prompt = composedPrompt;
      historyEntry.model = modelName;
      historyEntry.createdAt = new Date();
      entity.history = [historyEntry];

      newAssets.push(await this.library.upsert(entity));
    }
    return newAssets;
  }

  private async optionallyInsertIntoSequence(
    assets: Asset[],
    dto: Generate.RequestDto,
  ): Promise<string[]> {
    if (!dto.insertIntoSequence) return [];
    const { sequenceId, position } = dto.insertIntoSequence;
    const insertedFrameIds: string[] = [];
    for (let i = 0; i < assets.length; i++) {
      const pos = position === undefined ? undefined : position + i;
      await this.sequences.addFrame(sequenceId, assets[i]!.id, pos);
      insertedFrameIds.push(assets[i]!.id);
    }
    return insertedFrameIds;
  }

  // Internal helper for the SeedRunner (later stage). Uses the same pipeline but
  // returns the resolved log id + assets directly.
  async runOnce(dto: Generate.RequestDto): Promise<{ logId: string; assets: Asset[] }> {
    const jobId = this.startJob(dto);
    const ch = this.jobs.get(jobId);
    if (!ch) throw new NotFoundException('Job channel disappeared');
    return new Promise((resolve, reject) => {
      ch.subject.subscribe({
        next: (p) => {
          if (p.stage === 'done') {
            resolve({ logId: p.logId!, assets: p.newAssets ?? [] });
          } else if (p.stage === 'failed') {
            reject(new Error(p.error ?? 'generate failed'));
          }
        },
        error: reject,
      });
    });
  }
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
