import { Injectable, Logger } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { Subject } from 'rxjs';
import type { Animate, Asset, VideoInfo } from '@4eye/scene-studio-shared';
import { LibraryService } from '../../library/library.service.js';
import { FilesService } from '../../files/files.service.js';
import { loadConfig } from '../../config/config.service.js';
import { AssetEntity } from '../../entities/asset.entity.js';
import { AssetHistoryEntity } from '../../entities/asset-history.entity.js';
import { WsGateway } from '../../ws/ws.gateway.js';
import { GenerationLogService } from '../../generation/generation-log.service.js';
import { RunwayProvider } from './providers/runway.provider.js';
import { VeoProvider } from './providers/veo.provider.js';
import { FakeVideoProvider } from './providers/fake-video.provider.js';
import type { VideoProvider } from './providers/video.provider.js';
import { buildAssetFilename, buildTimestampString } from '../../common/persist-asset.util.js';

interface JobChannel {
  subject: Subject<Animate.Progress>;
  history: Animate.Progress[];
  done: boolean;
}

@Injectable()
export class AnimateService {
  private readonly log = new Logger(AnimateService.name);
  private readonly jobs = new Map<string, JobChannel>();

  constructor(
    private readonly library: LibraryService,
    private readonly files: FilesService,
    private readonly ws: WsGateway,
    private readonly runway: RunwayProvider,
    private readonly veo: VeoProvider,
    private readonly fake: FakeVideoProvider,
    private readonly genLog: GenerationLogService,
  ) {}

  private pickProvider(override?: 'veo' | 'runway' | 'fake'): VideoProvider {
    const cfg = loadConfig();
    const sel = override ?? cfg.providers.animate;
    if (sel === 'veo') return this.veo;
    if (sel === 'runway') return this.runway;
    if (sel === 'fake') return this.fake;
    // auto
    if (cfg.google.apiKey) return this.veo;
    if (cfg.runway.apiKey) return this.runway;
    return this.fake;
  }

  startJob(dto: Animate.RequestDto): string {
    const jobId = randomUUID();
    const channel: JobChannel = {
      subject: new Subject<Animate.Progress>(),
      history: [],
      done: false,
    };
    this.jobs.set(jobId, channel);
    this.runJob(jobId, dto).catch((err) => {
      this.emit(jobId, {
        jobId,
        status: 'failed',
        error: (err as Error).message,
      });
    });
    return jobId;
  }

  getChannel(jobId: string): JobChannel | undefined {
    return this.jobs.get(jobId);
  }

  private emit(jobId: string, progress: Animate.Progress): void {
    const ch = this.jobs.get(jobId);
    if (!ch) return;
    ch.history.push(progress);
    ch.subject.next(progress);
    this.ws.broadcast({ type: 'animate:progress', progress });
    if (
      progress.status === 'succeeded' ||
      progress.status === 'failed' ||
      progress.status === 'cancelled'
    ) {
      ch.done = true;
      setTimeout(() => {
        ch.subject.complete();
        this.jobs.delete(jobId);
      }, 120_000);
    }
  }

  private async runJob(jobId: string, dto: Animate.RequestDto): Promise<void> {
    this.emit(jobId, { jobId, status: 'queued', percent: 0 });

    const start = await this.library.getAsset(dto.startAssetId);
    const { absPath: startAbsPath } = await this.files.resolveAssetPath(start.id);
    const provider = this.pickProvider(dto.provider);
    const cfg = loadConfig();
    const modelName =
      dto.model ?? (provider.name === 'veo' ? cfg.google.videoModel : cfg.runway.videoModel);

    const referenceImages = await this.resolveReferenceImages(dto.referenceAssetIds ?? []);

    const logId = await this.genLog.start({
      kind: 'animate',
      provider: provider.name,
      model: modelName,
      prompt: dto.prompt,
      inputAssetIds: [start.id],
      sceneCode: start.display.sceneCode ?? undefined,
      references: [{ selector: `assetId:${start.id}`, kind: 'image' as const, role: 'start-frame', assetId: start.id }],
      params: { durationSec: dto.durationSec },
      rawRequest: {
        startAssetId: start.id,
        prompt: dto.prompt,
        durationSec: dto.durationSec,
        model: modelName,
      },
    });

    try {
      this.emit(jobId, {
        jobId,
        status: 'running',
        percent: 0.05,
        message: `Submitting to ${provider.name}…`,
      });

      const result = await provider.animate({
        startAsset: start,
        startAbsPath,
        prompt: dto.prompt,
        durationSec: dto.durationSec,
        model: dto.model,
        ...(referenceImages.length ? { referenceImages } : {}),
        aspectRatio: dto.aspectRatio,
        resolution: dto.resolution,
        onProgress: (percent, message) => {
          this.emit(jobId, { jobId, status: 'running', percent, message });
        },
      });

      const asset = await this.persistVideoOutput(result, start, dto, jobId, modelName, cfg);

      await this.genLog.finishSuccess(logId, {
        outputAssetIds: [asset.id],
        providerJobId: result.providerJobId,
      });

      this.emit(jobId, { jobId, status: 'succeeded', percent: 1, asset });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await this.genLog.finishError(logId, msg).catch(() => {});
      throw err;
    }
  }

  private async resolveReferenceImages(
    ids: string[],
  ): Promise<Array<{ imageBytes: Buffer; mimeType: string }>> {
    const out: Array<{ imageBytes: Buffer; mimeType: string }> = [];
    for (const refId of ids) {
      const refAsset = await this.library.getAsset(refId);
      const { absPath } = await this.files.resolveAssetPath(refId);
      out.push({ imageBytes: await readFile(absPath), mimeType: refAsset.file.mimeType });
    }
    return out;
  }

  private async persistVideoOutput(
    result: { mp4Buffer: Buffer; posterBuffer: Buffer; fps?: number; providerJobId?: string },
    start: Asset,
    dto: Animate.RequestDto,
    jobId: string,
    modelName: string,
    cfg: ReturnType<typeof loadConfig>,
  ): Promise<Asset> {
    const tsStr = buildTimestampString();
    const contentHash = createHash('sha1').update(result.mp4Buffer).digest('hex').slice(0, 8);
    const baseName = buildAssetFilename({
      title: start.display.title,
      sceneCode: start.display.sceneCode,
      extension: 'mp4',
      contentHash,
      tsStr,
    });
    // Derive poster name from the same base (replace extension)
    const posterFilename = baseName.replace(/\.mp4$/, '.poster.jpg');
    const newFilename = baseName;

    await writeFile(join(cfg.videosDir, newFilename), result.mp4Buffer);
    await writeFile(join(cfg.videosDir, posterFilename), result.posterBuffer);

    const id = createHash('sha1').update(`05_videos/${newFilename}`).digest('hex').slice(0, 16);

    const video: VideoInfo = {
      durationSec: dto.durationSec,
      fps: result.fps ?? 24,
      posterFilename,
      startAssetId: start.id,
    };

    const entity = new AssetEntity();
    entity.id = id;
    entity.kind = 'video';
    entity.folder = '05_videos';
    entity.filename = newFilename;
    entity.mimeType = 'video/mp4';
    entity.sizeBytes = result.mp4Buffer.byteLength;
    entity.width = start.file.width;
    entity.height = start.file.height;
    entity.title = `${start.display.title} (anim)`;
    entity.description = '';
    entity.sceneCode = start.display.sceneCode ?? null;
    entity.order = (start.catalog.order ?? 0) + 0.5;
    entity.tags = ['animation'];
    entity.starred = false;
    entity.source = 'animation';
    entity.parentIds = [start.id];
    entity.prompt = dto.prompt;
    entity.model = modelName;
    entity.jobId = result.providerJobId ?? jobId;
    entity.video = video;

    const historyEntry = new AssetHistoryEntity();
    historyEntry.filename = newFilename;
    historyEntry.prompt = dto.prompt;
    historyEntry.model = modelName;
    historyEntry.createdAt = new Date();
    entity.history = [historyEntry];

    return this.library.upsert(entity);
  }
}
