/**
 * Status Targets display sizes — compact summary tile → full grid → hero grid.
 */

export type StatusTargetSize = "compact" | "grid" | "large";

export const STATUS_TARGET_SIZES: readonly StatusTargetSize[] = ["compact", "grid", "large"] as const;

export const STATUS_TARGET_SIZE_STORAGE_KEY = "4eye:status-targets:size:v1";

export interface StatusTargetSizeTokens {
  label: string;
  hint: string;
  minTile: number;
  markSize: number;
  auraGlyphsSize: number;
  gridGap: number;
  sectionGap: number;
  maxWidth: number;
  summaryMaxWidth: number;
  hudMarkSize: number;
  tileScale: number;
  headerFontSize: string;
}

export const STATUS_TARGET_SIZE_META: Record<StatusTargetSize, StatusTargetSizeTokens> = {
  compact: {
    label: "Compact",
    hint: "One summary square — expands into the grid below",
    minTile: 82,
    markSize: 16,
    auraGlyphsSize: 24,
    gridGap: 0.75,
    sectionGap: 1.75,
    maxWidth: 120,
    summaryMaxWidth: 96,
    hudMarkSize: 26,
    tileScale: 1,
    headerFontSize: "0.62rem",
  },
  grid: {
    label: "Grid",
    hint: "Full Mood · Auras · Gear · Buffs grid at standard tile size",
    minTile: 82,
    markSize: 20,
    auraGlyphsSize: 28,
    gridGap: 0.75,
    sectionGap: 1.75,
    maxWidth: 720,
    summaryMaxWidth: 96,
    hudMarkSize: 26,
    tileScale: 1,
    headerFontSize: "0.62rem",
  },
  large: {
    label: "Large",
    hint: "Hero grid — larger tiles and HUD for focus display",
    minTile: 120,
    markSize: 28,
    auraGlyphsSize: 44,
    gridGap: 1.25,
    sectionGap: 2.5,
    maxWidth: 960,
    summaryMaxWidth: 128,
    hudMarkSize: 36,
    tileScale: 1.35,
    headerFontSize: "0.72rem",
  },
};

export function statusTargetSizeTokens(size: StatusTargetSize): StatusTargetSizeTokens {
  return STATUS_TARGET_SIZE_META[size];
}

export function cycleStatusTargetSize(current: StatusTargetSize): StatusTargetSize {
  const i = STATUS_TARGET_SIZES.indexOf(current);
  const next = (i + 1) % STATUS_TARGET_SIZES.length;
  return STATUS_TARGET_SIZES[next] ?? "grid";
}
