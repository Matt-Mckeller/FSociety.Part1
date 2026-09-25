import type { Asset } from '@4eye/scene-studio-shared';

export interface AnimateRequest {
  startAsset: Asset;
  startAbsPath: string;
  prompt: string;
  durationSec: number;
  model?: string;
  /**
   * Pre-resolved reference images (bytes + mime) for Veo's character/style lock.
   * Up to 3. Veo 3.1 only — other providers ignore this.
   * When present, Veo will force durationSeconds = 8.
   */
  referenceImages?: Array<{ imageBytes: Buffer; mimeType: string }>;
  /** Aspect ratio. Default '16:9'. Veo 3.1 only. */
  aspectRatio?: '16:9' | '9:16';
  /** Output resolution. '1080p' and '4k' require 8s clips. Default '720p'. Veo 3.1 only. */
  resolution?: '720p' | '1080p' | '4k';
  /** Called by the provider to report progress (0..1). */
  onProgress?: (percent: number, message?: string) => void;
}

export interface AnimateResult {
  /** Final mp4 bytes. */
  mp4Buffer: Buffer;
  /** Poster JPEG bytes (first frame). */
  posterBuffer: Buffer;
  /** Provider-side job/task id, for cross-reference. */
  providerJobId?: string;
  fps?: number;
}

export interface VideoProvider {
  readonly name: string;
  animate(req: AnimateRequest): Promise<AnimateResult>;
}
