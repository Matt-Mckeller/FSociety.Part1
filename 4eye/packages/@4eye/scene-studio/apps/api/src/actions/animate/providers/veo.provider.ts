import { Injectable, Logger } from '@nestjs/common';
import { readFile, mkdtemp, readFile as readFileAgain, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { loadConfig } from '../../../config/config.service.js';
import type { AnimateRequest, AnimateResult, VideoProvider } from './video.provider.js';

/**
 * Google Veo provider for image-to-video.
 * Default model: `veo-3.1-generate-preview`.
 *
 * Single-image-to-video: start frame drives the motion; Veo hallucinates the action.
 * Veo 3.1 preview does NOT support end-frame interpolation (lastFrame) — always 400s.
 * Clips: 4 / 6 / 8 seconds at 720p (clamped from durationSec).
 *
 * Returns mp4 bytes downloaded from the SDK file handle, plus the start frame as the poster.
 */
@Injectable()
export class VeoProvider implements VideoProvider {
  readonly name = 'veo';
  private readonly log = new Logger(VeoProvider.name);
  private client: GoogleGenAI | null = null;

  private get ai(): GoogleGenAI {
    if (this.client) return this.client;
    const cfg = loadConfig();
    if (!cfg.google.apiKey) throw new Error('GOOGLE_API_KEY (or GEMINI_API_KEY) is not set');
    this.client = new GoogleGenAI({ apiKey: cfg.google.apiKey });
    return this.client;
  }

  async animate(req: AnimateRequest): Promise<AnimateResult> {
    const cfg = loadConfig();
    const model = req.model ?? cfg.google.videoModel;
    const startBytes = await readFile(req.startAbsPath);
    const startB64 = startBytes.toString('base64');

    const hasRefs = (req.referenceImages?.length ?? 0) > 0;
    const highRes = req.resolution === '1080p' || req.resolution === '4k';

    // Veo durations are 4 / 6 / 8 seconds.
    // Reference images and resolutions above 720p require exactly 8 seconds.
    const requestedDur = Math.round(req.durationSec);
    const durationSeconds =
      hasRefs || highRes ? 8 : requestedDur >= 8 ? 8 : requestedDur >= 6 ? 6 : 4;

    if ((hasRefs || highRes) && requestedDur !== 8) {
      this.log.warn(
        `Veo: durationSec forced to 8 (referenceImages=${hasRefs}, resolution=${req.resolution ?? '720p'})`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: any = {
      aspectRatio: req.aspectRatio ?? '16:9',
      resolution: req.resolution ?? '720p',
      durationSeconds,
      numberOfVideos: 1,
    };

    // Reference images — Veo 3.1 character/style lock (up to 3).
    if (hasRefs) {
      config.referenceImages = req.referenceImages!.map((r) => ({
        image: { imageBytes: r.imageBytes.toString('base64'), mimeType: r.mimeType },
        referenceType: 'asset',
      }));
    }

    this.log.log(
      `Veo create · model=${model} duration=${durationSeconds}s ` +
        `refs=${req.referenceImages?.length ?? 0} res=${config.resolution} ar=${config.aspectRatio}`,
    );
    req.onProgress?.(0.05, 'Submitting to Veo…');

    let operation = await this.ai.models.generateVideos({
      model,
      prompt: req.prompt,
      image: {
        imageBytes: startB64,
        mimeType: req.startAsset.file.mimeType,
      },
      config,
    });

    // Poll until done — Veo is async (typical 11s–6min latency).
    const start = Date.now();
    const timeoutMs = 10 * 60 * 1000;
    let polls = 0;
    while (!operation.done) {
      if (Date.now() - start > timeoutMs) throw new Error('Veo operation timed out');
      await new Promise((r) => setTimeout(r, 5000));
      operation = await this.ai.operations.getVideosOperation({ operation });
      polls++;
      // Veo doesn't report fractional progress, so fake a smooth crawl.
      const fakePct = Math.min(0.85, 0.1 + polls * 0.05);
      req.onProgress?.(fakePct, `Veo: polling (${polls})`);
    }

    if (operation.error) {
      throw new Error(`Veo failed: ${JSON.stringify(operation.error)}`);
    }
    const generated = operation.response?.generatedVideos?.[0];
    const video = generated?.video;
    if (!video) throw new Error('Veo returned no video');

    req.onProgress?.(0.9, 'Downloading video…');
    let mp4Buffer: Buffer;
    if (video.videoBytes) {
      mp4Buffer = Buffer.from(video.videoBytes, 'base64');
    } else if (video.uri) {
      // SDK download writes to disk; round-trip through a temp file.
      const dir = await mkdtemp(join(tmpdir(), 'veo-'));
      const tmpPath = join(dir, 'out.mp4');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await this.ai.files.download({ file: video as any, downloadPath: tmpPath });
      mp4Buffer = await readFileAgain(tmpPath);
      try {
        await unlink(tmpPath);
        await rmdir(dir);
      } catch {
        /* best-effort cleanup */
      }
    } else {
      throw new Error('Veo video had neither videoBytes nor uri');
    }

    return {
      mp4Buffer,
      posterBuffer: startBytes,
      providerJobId: operation.name,
      fps: 24,
    };
  }
}
