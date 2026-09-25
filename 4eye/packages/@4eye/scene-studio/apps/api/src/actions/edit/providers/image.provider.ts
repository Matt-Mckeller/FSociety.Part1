import type { Asset } from '@4eye/scene-studio-shared';

export interface EditRequest {
  sourceAsset: Asset;
  sourceAbsPath: string;
  prompt: string;
  size?: '1024x1024' | '1536x1024' | '1024x1536' | 'auto';
  variations?: number;
  model?: string;
  maskBase64?: string;
}

export interface EditResultImage {
  /** PNG bytes for one generated image. */
  pngBuffer: Buffer;
}

export interface ImageEditProvider {
  /** Returns one or more PNG buffers. Length matches `variations`. */
  edit(req: EditRequest): Promise<EditResultImage[]>;
  /** Display name for logs. */
  readonly name: string;
}
