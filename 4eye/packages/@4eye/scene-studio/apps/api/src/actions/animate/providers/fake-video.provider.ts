import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import type { AnimateRequest, AnimateResult, VideoProvider } from './video.provider.js';

/**
 * Test-mode provider. No API key required. Simulates a 4-step video render
 * and writes a stub mp4 file (NOT a real video — just bytes so the storage
 * pipeline can be exercised). Poster is a JPEG of the start frame.
 */
@Injectable()
export class FakeVideoProvider implements VideoProvider {
  readonly name = 'fake';
  private readonly log = new Logger(FakeVideoProvider.name);

  async animate(req: AnimateRequest): Promise<AnimateResult> {
    this.log.warn(`FakeVideoProvider: simulating render (${req.durationSec}s)`);
    const steps = 4;
    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, 400));
      req.onProgress?.(0.1 + (i / steps) * 0.7, `Simulated frame batch ${i}/${steps}`);
    }
    const posterBuffer = await sharp(await readFile(req.startAbsPath))
      .jpeg({ quality: 85 })
      .toBuffer();
    // Minimal ISO BMFF stub. Will play in nothing — placeholder only.
    const mp4Buffer = Buffer.from(
      '0000001C667479706973' + // 'ftyp' box header
      '6F6D000000016973' +
      '6F6D69736F32' +
      '6D703431',
      'hex',
    );
    return { mp4Buffer, posterBuffer, providerJobId: `fake-${Date.now()}`, fps: 24 };
  }
}
