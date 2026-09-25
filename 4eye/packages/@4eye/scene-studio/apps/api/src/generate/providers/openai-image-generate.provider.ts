import { Injectable, Logger } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { toFile } from 'openai';
import {
  decodeOpenAiImagesResponse,
  getOpenAiClient,
  type OpenAiImagesResponseLike,
} from '../../common/providers/openai-image-client.js';
import { loadConfig } from '../../config/config.service.js';
import type {
  GenerateRequest,
  GenerateResultImage,
  ImageGenerateProvider,
} from './image-generate.provider.js';

/**
 * Multi-reference image generation via OpenAI `images.edit`.
 *
 * gpt-image-1 accepts an array of images via the `image` field; the model
 * treats them as visual references to be composed/styled according to the
 * prompt. The first image's aspect roughly anchors the output unless `size`
 * is provided.
 */
@Injectable()
export class OpenAiImageGenerateProvider implements ImageGenerateProvider {
  readonly name = 'openai';
  private readonly log = new Logger(OpenAiImageGenerateProvider.name);

  async generate(req: GenerateRequest): Promise<GenerateResultImage[]> {
    if (req.images.length === 0) {
      throw new Error('At least one reference image is required for generate()');
    }
    const cfg = loadConfig();
    const model = req.model ?? cfg.openai.imageModel;
    const n = req.variations ?? 1;
    const size = req.size && req.size !== 'auto' ? req.size : '1024x1024';

    this.log.log(
      `OpenAI generate · model=${model} n=${n} size=${size} refs=${req.images.length}`,
    );

    const imageFiles = await Promise.all(
      req.images.map((img) =>
        toFile(createReadStream(img.absPath), img.asset.file.filename, {
          type: img.asset.file.mimeType,
        }),
      ),
    );

    // The SDK accepts `image: File[]` for multi-ref but its typings only
    // expose the single-image overload, so we cast the params object.
    const params = {
      model,
      image: imageFiles,
      prompt: req.prompt,
      n,
      size,
    };

    const response = (await getOpenAiClient().images.edit(
      params as never,
    )) as OpenAiImagesResponseLike;
    const buffers = await decodeOpenAiImagesResponse(response);
    return buffers.map((pngBuffer) => ({ pngBuffer }));
  }
}
