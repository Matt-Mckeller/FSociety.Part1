import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import type {
  GenerateRequest,
  GenerateResultImage,
  ImageGenerateProvider,
} from './image-generate.provider.js';

/**
 * Local fallback for when OPENAI_API_KEY is absent. Produces a deterministic
 * solid-color PNG annotated with the first reference's title so callers can verify
 * the full pipeline (logging, sequence insertion, etc.) without real API calls.
 */
@Injectable()
export class FakeImageGenerateProvider implements ImageGenerateProvider {
  readonly name = 'fake';
  private readonly log = new Logger(FakeImageGenerateProvider.name);

  async generate(req: GenerateRequest): Promise<GenerateResultImage[]> {
    const n = req.variations ?? 1;
    const [width, height] = parseSize(req.size);
    this.log.log(`FAKE generate · n=${n} size=${width}x${height} refs=${req.images.length}`);

    const out: GenerateResultImage[] = [];
    for (let i = 0; i < n; i++) {
      // hash-ish color so variations differ visibly
      const hue = (i * 67 + req.images.length * 23 + req.prompt.length) % 360;
      const { r, g, b } = hsvToRgb(hue, 0.35, 0.95);
      const png = await sharp({
        create: { width, height, channels: 3, background: { r, g, b } },
      })
        .png()
        .toBuffer();
      out.push({ pngBuffer: png });
    }
    return out;
  }
}

function parseSize(size: GenerateRequest['size']): [number, number] {
  if (!size || size === 'auto') return [1024, 1024];
  const [w, h] = size.split('x').map((s) => Number(s));
  return [w ?? 1024, h ?? 1024];
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}
