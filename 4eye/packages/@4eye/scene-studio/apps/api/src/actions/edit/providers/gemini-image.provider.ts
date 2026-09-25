import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import {
  describeGeminiEmptyReason,
  decodeGeminiImageParts,
  getGeminiClient,
  sizeToAspect,
} from '../../../common/providers/gemini-image-client.js';
import { loadConfig } from '../../../config/config.service.js';
import type { EditRequest, EditResultImage, ImageEditProvider } from './image.provider.js';

/**
 * Gemini-backed image-edit provider.
 *
 * Gemini doesn't have a dedicated "edit" endpoint — instead we hand it the
 * source image plus a textual instruction via `generateContent`. The mask is
 * passed as a second inline image with a textual hint, since Gemini doesn't
 * accept a structured mask field today.
 *
 * Like the generate-side provider, Gemini returns one image per call, so we
 * dispatch variations in parallel.
 */
@Injectable()
export class GeminiImageProvider implements ImageEditProvider {
  readonly name = 'gemini';
  private readonly log = new Logger(GeminiImageProvider.name);

  async edit(req: EditRequest): Promise<EditResultImage[]> {
    const cfg = loadConfig();
    const model = req.model ?? cfg.google.imageModel;
    const n = req.variations ?? 1;
    const aspectRatio = sizeToAspect(req.size);

    this.log.log(
      `Gemini edit · model=${model} n=${n} aspect=${aspectRatio ?? 'auto'} mask=${req.maskBase64 ? 'yes' : 'no'}`,
    );

    const sourceBytes = await readFile(req.sourceAbsPath);
    const parts: Array<Record<string, unknown>> = [
      { text: req.prompt },
      {
        inlineData: {
          mimeType: req.sourceAsset.file.mimeType,
          data: sourceBytes.toString('base64'),
        },
      },
    ];
    if (req.maskBase64) {
      parts.push({ text: 'The next image is a mask: white = edit, black = preserve.' });
      parts.push({ inlineData: { mimeType: 'image/png', data: req.maskBase64 } });
    }

    const t0 = Date.now();
    const tasks = Array.from({ length: n }, (_, i) =>
      this.editOne(i + 1, n, model, parts, aspectRatio),
    );
    const out = (await Promise.all(tasks)).flat();
    this.log.log(`Gemini edit done · ${out.length} image(s) in ${seconds(Date.now() - t0)}s`);
    return out;
  }

  private async editOne(
    idx: number,
    total: number,
    model: string,
    parts: Array<Record<string, unknown>>,
    aspectRatio: string | undefined,
  ): Promise<EditResultImage[]> {
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

function seconds(ms: number): number {
  return Math.round(ms / 100) / 10;
}
