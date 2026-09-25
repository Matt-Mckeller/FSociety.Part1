import catalog from "@/content/media-platforms.json";

export type MediaPlatform = {
  id: string;
  label: string;
  placement: string;
  network: string;
  width: number;
  height: number;
  ratio: string;
  fit: string;
  blurb: string;
};

export type SourceKind = {
  id: string;
  match: { width: number; height: number };
  label: string;
  note: string;
};

export const MEDIA_PLATFORMS = catalog.platforms as MediaPlatform[];
export const SOURCE_KINDS = catalog.sourceKinds as SourceKind[];
export const DEFAULT_EXPORT_PLATFORMS = catalog.defaultExportPlatforms as string[];

export function platformById(id: string): MediaPlatform | undefined {
  return MEDIA_PLATFORMS.find((p) => p.id === id);
}

export function detectSourceKind(
  width: number | null | undefined,
  height: number | null | undefined,
): SourceKind | null {
  if (!width || !height) return null;
  return (
    SOURCE_KINDS.find((k) => k.match.width === width && k.match.height === height) ?? null
  );
}

export function sizeFitsPlatform(
  width: number | null | undefined,
  height: number | null | undefined,
  platform: MediaPlatform,
): "exact" | "same-ratio" | "needs-crop" | "unknown" {
  if (!width || !height) return "unknown";
  if (width === platform.width && height === platform.height) return "exact";
  const sRatio = width / height;
  const pRatio = platform.width / platform.height;
  if (Math.abs(sRatio - pRatio) < 0.02) return "same-ratio";
  return "needs-crop";
}

export function formatDims(width?: number | null, height?: number | null): string {
  if (!width || !height) return "—";
  return `${width}×${height}`;
}
