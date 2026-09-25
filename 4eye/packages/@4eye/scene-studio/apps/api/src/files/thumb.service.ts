import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadConfig } from '../config/config.service.js';

@Injectable()
export class ThumbService {
  private readonly log = new Logger(ThumbService.name);

  /**
   * Returns the absolute path to a cached thumbnail of `srcAbs` at width `w`.
   * Generates it on first request, then serves from disk.
   * Videos: callers should pass the poster frame, not the mp4.
   */
  async getOrCreate(srcAbs: string, w: number): Promise<string> {
    const cfg = loadConfig();
    const s = await stat(srcAbs);
    const key = createHash('sha1')
      .update(srcAbs)
      .update(String(s.mtimeMs))
      .update(String(w))
      .digest('hex')
      .slice(0, 20);
    const out = join(cfg.thumbsDir, `${key}.webp`);
    if (existsSync(out)) return out;

    await mkdir(cfg.thumbsDir, { recursive: true });
    const buf = await sharp(srcAbs)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    await writeFile(out, buf);
    return out;
  }
}
