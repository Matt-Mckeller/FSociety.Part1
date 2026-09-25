import { GoogleGenAI } from '@google/genai';
import { loadConfig } from '../../config/config.service.js';

/**
 * Shared lazy Gemini client + helpers for image providers. Centralising means
 * one cached client and one source of truth for size → aspectRatio mapping and
 * the response-decoding loop.
 */

let cached: GoogleGenAI | null = null;

/** Lazily construct (and cache) a Gemini client. Throws if no key is configured. */
export function getGeminiClient(): GoogleGenAI {
  if (cached) return cached;
  const cfg = loadConfig();
  if (!cfg.google.apiKey) {
    throw new Error('GOOGLE_API_KEY (or GEMINI_API_KEY) is not set');
  }
  cached = new GoogleGenAI({ apiKey: cfg.google.apiKey });
  return cached;
}

/** Internal canonical size strings used across our providers. */
export type CanonicalSize = '1024x1024' | '1536x1024' | '1024x1536' | 'auto' | undefined;

/** Map our internal size strings to a Gemini `aspectRatio`. Returns undefined for 'auto'/missing. */
export function sizeToAspect(size: CanonicalSize): string | undefined {
  switch (size) {
    case '1024x1024':
      return '1:1';
    case '1536x1024':
      return '3:2';
    case '1024x1536':
      return '2:3';
    default:
      return undefined;
  }
}

/** Loose shape of a Gemini `generateContent` response — enough to decode image parts. */
export interface GeminiGenerateResponseLike {
  candidates?: Array<{
    content?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
}

/**
 * Pull image buffers out of a Gemini `generateContent` response. Returns an
 * empty array if none are present so callers can decide how to surface that
 * (Gemini reports the reason via `promptFeedback` / `finishReason`).
 */
export function decodeGeminiImageParts(response: GeminiGenerateResponseLike): Buffer[] {
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const out: Buffer[] = [];
  for (const part of parts) {
    const data = part.inlineData?.data;
    const mime = part.inlineData?.mimeType ?? '';
    if (data && mime.startsWith('image/')) {
      out.push(Buffer.from(data, 'base64'));
    }
  }
  return out;
}

/** Best-effort reason string when Gemini returns zero images. */
export function describeGeminiEmptyReason(response: GeminiGenerateResponseLike): string {
  return (
    response.promptFeedback?.blockReason ??
    response.candidates?.[0]?.finishReason ??
    'no image in response'
  );
}
