import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import type { EditRequest, EditResultImage, ImageEditProvider } from './image.provider.js';

/**
 * No-API-key fallback. Returns the source image with a slight tint overlay
 * so the UI can be developed without burning real API calls.
 */
@Injectable()
export class FakeImageProvider implements ImageEditProvider {
  readonly name = 'fake';
  private readonly log = new Logger(FakeImageProvider.name);

  async edit(req: EditRequest): Promise<EditResultImage[]> {
    this.log.warn(
      `FakeImageProvider: returning tinted copy (prompt="${req.prompt.slice(0, 60)}…")`,
    );
    const src = await readFile(req.sourceAbsPath);
    const n = req.variations ?? 1;
    const out: EditResultImage[] = [];
    for (let i = 0; i < n; i++) {
      const hue = (i * 60) % 360;
      const pngBuffer = await sharp(src)
        .modulate({ hue, saturation: 1.1 })
        .png()
        .toBuffer();
      out.push({ pngBuffer });
    }
    return out;
  }
}
