import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { loadConfig } from '../../../config/config.service.js';
import type { AnimateRequest, AnimateResult, VideoProvider } from './video.provider.js';

/**
 * RunwayML provider for image_to_video using gen4_turbo.
 * REST API: POST /v1/image_to_video → { id }
 *           GET  /v1/tasks/{id}      → { status, output: [url], ... }
 *
 * Auth: `Authorization: Bearer <KEY>` + `X-Runway-Version: 2024-11-06`
 */
@Injectable()
export class RunwayProvider implements VideoProvider {
  readonly name = 'runway';
  private readonly log = new Logger(RunwayProvider.name);
  private readonly baseUrl = 'https://api.dev.runwayml.com';
  private readonly apiVersion = '2024-11-06';

  async animate(req: AnimateRequest): Promise<AnimateResult> {
    const cfg = loadConfig();
    if (!cfg.runway.apiKey) throw new Error('RUNWAY_API_KEY is not set');
    const model = req.model ?? cfg.runway.videoModel;
    const headers = {
      Authorization: `Bearer ${cfg.runway.apiKey}`,
      'X-Runway-Version': this.apiVersion,
      'Content-Type': 'application/json',
    };

    const startB64 = (await readFile(req.startAbsPath)).toString('base64');
    const promptImage = [
      { uri: `data:${req.startAsset.file.mimeType};base64,${startB64}`, position: 'first' as const },
    ];

    const createBody = {
      model,
      promptImage,
      promptText: req.prompt,
      duration: Math.round(req.durationSec),
      ratio: '1280:720',
    };

    this.log.log(`Runway create · model=${model} duration=${createBody.duration}s`);
    req.onProgress?.(0.05, 'Submitting to Runway…');

    const createRes = await fetch(`${this.baseUrl}/v1/image_to_video`, {
      method: 'POST',
      headers,
      body: JSON.stringify(createBody),
    });
    if (!createRes.ok) {
      throw new Error(`Runway create failed ${createRes.status}: ${await createRes.text()}`);
    }
    const { id: taskId } = (await createRes.json()) as { id: string };

    // poll
    let videoUrl: string | null = null;
    const start = Date.now();
    const timeoutMs = 8 * 60 * 1000;
    while (Date.now() - start < timeoutMs) {
      await new Promise((r) => setTimeout(r, 5000));
      const taskRes = await fetch(`${this.baseUrl}/v1/tasks/${taskId}`, { headers });
      if (!taskRes.ok) {
        throw new Error(`Runway poll failed ${taskRes.status}: ${await taskRes.text()}`);
      }
      const task = (await taskRes.json()) as {
        status: string;
        progress?: number;
        output?: string[];
        failure?: string;
      };
      const pct = typeof task.progress === 'number' ? 0.1 + task.progress * 0.8 : undefined;
      req.onProgress?.(pct ?? 0.5, `Runway: ${task.status}`);
      if (task.status === 'SUCCEEDED' && task.output?.[0]) {
        videoUrl = task.output[0];
        break;
      }
      if (task.status === 'FAILED' || task.status === 'CANCELLED') {
        throw new Error(`Runway task ${task.status}: ${task.failure ?? 'unknown'}`);
      }
    }
    if (!videoUrl) throw new Error('Runway task timed out');

    req.onProgress?.(0.9, 'Downloading video…');
    const dl = await fetch(videoUrl);
    if (!dl.ok) throw new Error(`Download failed ${dl.status}`);
    const mp4Buffer = Buffer.from(await dl.arrayBuffer());

    // poster = start frame
    const posterBuffer = await readFile(req.startAbsPath);

    return { mp4Buffer, posterBuffer, providerJobId: taskId, fps: 24 };
  }
}
