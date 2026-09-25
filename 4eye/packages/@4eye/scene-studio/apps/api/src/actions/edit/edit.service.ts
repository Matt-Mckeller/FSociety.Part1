import { Injectable, Logger } from '@nestjs/common';
import { writeFile } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import sharp from 'sharp';
import { Subject } from 'rxjs';
import type { Asset, Edit } from '@4eye/scene-studio-shared';
import { LibraryService } from '../../library/library.service.js';
import { FilesService } from '../../files/files.service.js';
import { loadConfig } from '../../config/config.service.js';
import { AssetEntity } from '../../entities/asset.entity.js';
import { AssetHistoryEntity } from '../../entities/asset-history.entity.js';
import { WsGateway } from '../../ws/ws.gateway.js';
import { GenerationLogService } from '../../generation/generation-log.service.js';
import { OpenAiImageProvider } from './providers/openai-image.provider.js';
import { GeminiImageProvider } from './providers/gemini-image.provider.js';
import { FakeImageProvider } from './providers/fake-image.provider.js';
import type { ImageEditProvider } from './providers/image.provider.js';

interface JobChannel {
  subject: Subject<Edit.Progress>;
  /** keep events for late SSE subscribers */
  history: Edit.Progress[];
  done: boolean;
}

@Injectable()
export class EditService {
  private readonly log = new Logger(EditService.name);
  private readonly jobs = new Map<string, JobChannel>();

  constructor(
    private readonly library: LibraryService,
    private readonly files: FilesService,
    private readonly ws: WsGateway,
    private readonly openai: OpenAiImageProvider,
    private readonly gemini: GeminiImageProvider,
    private readonly fake: FakeImageProvider,
    private readonly genLog: GenerationLogService,
  ) {}

  private pickProvider(): ImageEditProvider {
    const cfg = loadConfig();
    const sel = cfg.providers.imageEdit;
    if (sel === 'gemini') return this.gemini;
    if (sel === 'openai') return this.openai;
    if (sel === 'fake') return this.fake;
    // auto: prefer gemini, then openai, else fake — mirrors imageGenerate.
    if (cfg.google.apiKey) return this.gemini;
    if (cfg.openai.apiKey) return this.openai;
    return this.fake;
  }

  /** Kick off an edit job; returns the jobId for SSE subscription. */
  startJob(dto: Edit.RequestDto): string {
    const jobId = randomUUID();
    const channel: JobChannel = {
      subject: new Subject<Edit.Progress>(),
      history: [],
      done: false,
    };
    this.jobs.set(jobId, channel);

    // run async (don't await)
    this.runJob(jobId, dto).catch((err) => {
      this.emit(jobId, {
        sourceAssetId: dto.sourceAssetId,
        stage: 'failed',
        error: (err as Error).message,
      });
    });

    return jobId;
  }
  getChannel(jobId: string): JobChannel | undefined {
    return this.jobs.get(jobId);
  }

  // ── internals ──────────────────────────────────────────────
  private emit(jobId: string, progress: Edit.Progress): void {
    const ch = this.jobs.get(jobId);
    if (!ch) return;
    ch.history.push(progress);
    ch.subject.next(progress);
    this.ws.broadcast({ type: 'edit:progress', progress });
    if (progress.stage === 'done' || progress.stage === 'failed') {
      ch.done = true;
      // delay completion so late subscribers can replay; cleanup after 2 min
      setTimeout(() => {
        ch.subject.complete();
        this.jobs.delete(jobId);
      }, 120_000);
    }
  }

  private async runJob(jobId: string, dto: Edit.RequestDto): Promise<void> {
    this.emit(jobId, { sourceAssetId: dto.sourceAssetId, stage: 'queued' });

    const source = await this.library.getAsset(dto.sourceAssetId);
    const { absPath } = await this.files.resolveAssetPath(source.id);
    const provider = this.pickProvider();
    const cfg = loadConfig();
    const modelName =
      dto.model ?? (provider.name === 'gemini' ? cfg.google.imageModel : cfg.openai.imageModel);

    const logId = await this.genLog.start({
      kind: 'edit',
      provider: provider.name,
      model: modelName,
      prompt: dto.prompt,
      inputAssetIds: [source.id],
      sceneCode: source.display.sceneCode ?? undefined,
      references: [
        {
          selector: `assetId:${source.id}`,
          kind: 'image',
          role: 'source',
          assetId: source.id,
        },
      ],
      params: {
        size: dto.size,
        variations: dto.variations,
        hasMask: !!dto.maskBase64,
      },
      rawRequest: {
        sourceAssetId: source.id,
        prompt: dto.prompt,
        size: dto.size,
        variations: dto.variations,
        model: modelName,
        hasMask: !!dto.maskBase64,
      },
    });

    try {
      this.emit(jobId, {
        sourceAssetId: source.id,
        stage: 'generating',
        percent: 0.1,
        message: `Calling ${provider.name}…`,
      });

      const results = await provider.edit({
        sourceAsset: source,
        sourceAbsPath: absPath,
        prompt: dto.prompt,
        size: dto.size,
        variations: dto.variations,
        model: dto.model,
        maskBase64: dto.maskBase64,
      });

      this.emit(jobId, {
        sourceAssetId: source.id,
        stage: 'saving',
        percent: 0.7,
        message: `Saving ${results.length} image(s)…`,
      });

      const newAssets: Asset[] = [];
      for (let i = 0; i < results.length; i++) {
        const result = results[i]!;
        const stamp = Date.now();
        const baseNoExt = basename(source.file.filename, extname(source.file.filename));
        const variantSuffix = results.length > 1 ? `_v${i + 1}` : '';
        const newFilename = `${baseNoExt}_edit_${stamp}${variantSuffix}.png`;
        const absOut = join(cfg.editsDir, newFilename);
        await writeFile(absOut, result.pngBuffer);

        // measure dimensions
        const meta = await sharp(result.pngBuffer).metadata();
        const width = meta.width ?? source.file.width;
        const height = meta.height ?? source.file.height;

        const id = createHash('sha1')
          .update(`06_edits/${newFilename}`)
          .digest('hex')
          .slice(0, 16);

        const entity = new AssetEntity();
        entity.id = id;
        entity.kind = 'image';
        entity.folder = '06_edits';
        entity.filename = newFilename;
        entity.mimeType = 'image/png';
        entity.sizeBytes = result.pngBuffer.byteLength;
        entity.width = width;
        entity.height = height;
        entity.title = `${source.display.title} (edit)`;
        entity.description = '';
        entity.sceneCode = source.display.sceneCode ?? null;
        entity.order = (source.catalog.order ?? 0) + 0.001 * (i + 1);
        entity.tags = [...source.catalog.tags, 'edit'];
        entity.starred = false;
        entity.source = 'edit';
        entity.parentIds = [source.id];
        entity.prompt = dto.prompt;
        entity.model = modelName;
        entity.jobId = jobId;
        entity.videoJson = null;

        const historyEntry = new AssetHistoryEntity();
        historyEntry.filename = newFilename;
        historyEntry.prompt = dto.prompt;
        historyEntry.model = entity.model;
        historyEntry.createdAt = new Date();
        entity.history = [historyEntry];

        const asset = await this.library.upsert(entity);
        newAssets.push(asset);
      }

      await this.genLog.finishSuccess(logId, {
        outputAssetIds: newAssets.map((a) => a.id),
        cost: { outputImages: newAssets.length, inputImages: 1 },
      });

      this.emit(jobId, {
        sourceAssetId: source.id,
        stage: 'done',
        percent: 1,
        newAssets,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await this.genLog.finishError(logId, msg).catch(() => {
        // swallow — we don't want logging errors to mask the original failure
      });
      throw err;
    }
  }
}
