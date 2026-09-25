import type { Asset } from '@4eye/scene-studio-shared';

/** One image input to multi-reference generation. */
export interface GenerateImageInput {
  asset: Asset;
  absPath: string;
}

export interface GenerateRequest {
  prompt: string;
  images: GenerateImageInput[];
  size?: '1024x1024' | '1536x1024' | '1024x1536' | 'auto';
  variations?: number;
  model?: string;
}

export interface GenerateResultImage {
  pngBuffer: Buffer;
}

export interface ImageGenerateProvider {
  readonly name: string;
  generate(req: GenerateRequest): Promise<GenerateResultImage[]>;
}
