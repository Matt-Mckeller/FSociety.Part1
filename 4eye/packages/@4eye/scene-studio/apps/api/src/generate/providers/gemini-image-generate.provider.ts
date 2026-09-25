import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import {
  describeGeminiEmptyReason,
  decodeGeminiImageParts,
  getGeminiClient,
  sizeToAspect,
} from '../../common/providers/gemini-image-client.js';
import { loadConfig } from '../../config/config.service.js';
import type {
  GenerateRequest,
  GenerateResultImage,
  ImageGenerateProvider,
} from './image-generate.provider.js';

/**
 * Multi-reference image generation via Google Gemini ("Nano Banana" family).
 *
 * Default model: `gemini-3.1-flash-image-preview` — low-latency image generation
 * with strong instruction following for iterative seed workflows.
 *
 * Request shape: `models.generateContent` with `contents` = [text prompt, ...inlineData parts].
 * Response shape: `response.candidates[0].content.parts[].inlineData.data` (base64 PNG).
 *
 * Gemini image models return one image per call, so variations are dispatched
 * in parallel — wall time ≈ slowest single call, not n × single call.
 */
@Injectable()
export class GeminiImageGenerateProvider implements ImageGenerateProvider {
  readonly name = 'gemini';
  private readonly log = new Logger(GeminiImageGenerateProvider.name);

  async generate(req: GenerateRequest): Promise<GenerateResultImage[]> {
    if (req.images.length === 0) {
      throw new Error('At least one reference image is required for generate()');
    }
    const cfg = loadConfig();
    const model = req.model ?? cfg.google.imageModel;
    const n = req.variations ?? 1;
    const aspectRatio = sizeToAspect(req.size);

    this.log.log(
      `Gemini generate · model=${model} n=${n} aspect=${aspectRatio ?? 'auto'} refs=${req.images.length}`,
    );

    const parts = await buildPromptParts(req.prompt, req.images);

    const t0 = Date.now();
    const tasks = Array.from({ length: n }, (_, i) =>
      this.generateOne(i + 1, n, model, parts, aspectRatio),
    );
    const out = (await Promise.all(tasks)).flat();
    this.log.log(`Gemini generate done · ${out.length} image(s) in ${seconds(Date.now() - t0)}s`);
    return out;
  }

  private async generateOne(
    idx: number,
    total: number,
    model: string,
    parts: Array<Record<string, unknown>>,
    aspectRatio: string | undefined,
  ): Promise<GenerateResultImage[]> {
    const tag = `v${idx}/${total}`;
    const started = Date.now();
    this.log.log(`Gemini ${tag} → POST generateContent (model=${model})`);

    let response;
    try {
      response = await getGeminiClient().models.generateContent({
        model,
        contents: [{ role: 'user', parts: parts as never }],
        config: {
          responseModalities: ['IMAGE'],
          imageConfig: aspectRatio ? { aspectRatio } : undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      });
    } catch (err) {
      const elapsed = seconds(Date.now() - started);
      this.log.error(`Gemini ${tag} fetch failed after ${elapsed}s:`, err);
      throw new Error(
        `Gemini API call failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    const elapsed = seconds(Date.now() - started);

    const buffers = decodeGeminiImageParts(response);
    if (buffers.length === 0) {
      const reason = describeGeminiEmptyReason(response);
      this.log.warn(`Gemini ${tag} ✖ no image after ${elapsed}s (${reason})`);
      throw new Error(`Gemini returned no image (${reason})`);
    }
    this.log.log(`Gemini ${tag} ✓ ${buffers.length} image(s) in ${elapsed}s`);
    return buffers.map((pngBuffer) => ({ pngBuffer }));
  }
}

/** Build the `[text, ...inlineData]` content parts that Gemini expects. */
async function buildPromptParts(
  prompt: string,
  images: GenerateRequest['images'],
): Promise<Array<Record<string, unknown>>> {
  const parts: Array<Record<string, unknown>> = [{ text: prompt }];
  for (const img of images) {
    let bytes = await readFile(img.absPath);
    let mimeType = img.asset.file.mimeType;
    // Gemini does not support SVG — rasterize to PNG on the fly
    if (mimeType === 'image/svg+xml') {
      bytes = await sharp(bytes).png().toBuffer();
      mimeType = 'image/png';
    }
    parts.push({
      inlineData: {
        mimeType,
        data: bytes.toString('base64'),
      },
    });
  }
  return parts;
}

function seconds(ms: number): number {
  return Math.round(ms / 100) / 10;
}
