import { Injectable, Logger } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { toFile } from 'openai';
import {
  decodeOpenAiImagesResponse,
  getOpenAiClient,
  type OpenAiImagesResponseLike,
} from '../../../common/providers/openai-image-client.js';
import { loadConfig } from '../../../config/config.service.js';
import type { EditRequest, EditResultImage, ImageEditProvider } from './image.provider.js';

/**
 * OpenAI image-edit provider.
 *
 * Model name defaults to `OPENAI_IMAGE_MODEL` env (e.g. `gpt-image-1`).
 * Endpoint: `images.edit({ model, image, prompt, size, n })` — returns
 * `data[i].b64_json` for each generated variation.
 */
@Injectable()
export class OpenAiImageProvider implements ImageEditProvider {
  readonly name = 'openai';
  private readonly log = new Logger(OpenAiImageProvider.name);

  async edit(req: EditRequest): Promise<EditResultImage[]> {
    const cfg = loadConfig();
    const model = req.model ?? cfg.openai.imageModel;
    const n = req.variations ?? 1;
    const size = req.size && req.size !== 'auto' ? req.size : '1024x1024';

    this.log.log(`OpenAI edit · model=${model} n=${n} size=${size}`);

    const imageFile = await toFile(
      createReadStream(req.sourceAbsPath),
      req.sourceAsset.file.filename,
      { type: req.sourceAsset.file.mimeType },
    );

    const params: Record<string, unknown> = {
      model,
      image: imageFile,
      prompt: req.prompt,
      n,
      size,
    };
    if (req.maskBase64) {
      const maskBuf = Buffer.from(req.maskBase64, 'base64');
      params.mask = await toFile(maskBuf, 'mask.png', { type: 'image/png' });
    }

    const response = (await getOpenAiClient().images.edit(
      params as never,
    )) as OpenAiImagesResponseLike;
    const buffers = await decodeOpenAiImagesResponse(response);
    return buffers.map((pngBuffer) => ({ pngBuffer }));
  }
}
