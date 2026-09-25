import {
  Controller,
  Get,
  Header,
  Param,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'node:fs';
import { FilesService } from './files.service.js';
import { ThumbService } from './thumb.service.js';

@Controller('files')
export class FilesController {
  constructor(private readonly files: FilesService) {}

  /** GET /api/files/:id — stream original asset bytes. */
  @Get(':id')
  async getOriginal(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { absPath, mimeType } = await this.files.resolveAssetPath(id);
    res.set({
      'Content-Type': mimeType,
      'Cache-Control': 'private, max-age=60',
    });
    return new StreamableFile(createReadStream(absPath));
  }
}

@Controller('thumbs')
export class ThumbsController {
  constructor(
    private readonly files: FilesService,
    private readonly thumbs: ThumbService,
  ) {}

  /** GET /api/thumbs/:id?w=512 — webp thumbnail (cached). Images only. */
  @Get(':id')
  @Header('Cache-Control', 'public, max-age=31536000, immutable')
  async getThumb(
    @Param('id') id: string,
    @Query('w') wRaw: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const w = clampWidth(Number(wRaw ?? 512));
    const { absPath } = await this.files.resolveAssetPath(id);
    const thumbPath = await this.thumbs.getOrCreate(absPath, w);
    res.set({ 'Content-Type': 'image/webp' });
    return new StreamableFile(createReadStream(thumbPath));
  }
}

function clampWidth(w: number): number {
  if (!Number.isFinite(w)) return 512;
  if (w < 128) return 128;
  if (w > 2048) return 2048;
  return Math.round(w);
}
