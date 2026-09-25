import OpenAI from 'openai';
import { loadConfig } from '../../config/config.service.js';

/**
 * Shared lazy OpenAI client + response-decoding helpers used by image-edit and
 * image-generate providers. Centralising the client avoids holding multiple
 * instances when both providers are loaded, and the decoder kills the ~30 lines
 * of duplicated `b64_json`-or-`url` handling that lived in each provider.
 */

let cached: OpenAI | null = null;

/** Lazily construct (and cache) an OpenAI client. Throws if no key is configured. */
export function getOpenAiClient(): OpenAI {
  if (cached) return cached;
  const cfg = loadConfig();
  if (!cfg.openai.apiKey) throw new Error('OPENAI_API_KEY is not set');
  cached = new OpenAI({ apiKey: cfg.openai.apiKey });
  return cached;
}

/** Minimal shape we care about from `images.{generate,edit}` responses. */
export interface OpenAiImagesResponseLike {
  data?: Array<{ b64_json?: string; url?: string }>;
}

/**
 * Decode an OpenAI images-API response into raw PNG buffers. Handles both the
 * inline (`b64_json`) and hosted (`url`) result shapes; throws if the response
 * has no images at all.
 */
export async function decodeOpenAiImagesResponse(
  response: OpenAiImagesResponseLike,
): Promise<Buffer[]> {
  const data = response?.data ?? [];
  if (data.length === 0) throw new Error('OpenAI returned no images');

  const out: Buffer[] = [];
  for (const entry of data) {
    if (entry.b64_json) {
      out.push(Buffer.from(entry.b64_json, 'base64'));
      continue;
    }
    if (entry.url) {
      const res = await fetch(entry.url);
      if (!res.ok) throw new Error(`Fetch generated image failed: ${res.status}`);
      out.push(Buffer.from(await res.arrayBuffer()));
    }
  }
  if (out.length === 0) throw new Error('OpenAI response contained no decodable images');
  return out;
}
