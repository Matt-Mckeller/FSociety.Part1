import type { ReactNode } from "react";

/** Stable identifiers for every modality the slide can render. */
export enum ModalityKey {
  Visual = "visual",
  Auditory = "auditory",
  Kinesthetic = "kinesthetic",
  Logic = "logic",
  Associative = "associative",
  Verbal = "verbal",
  Recall = "recall",
  Social = "social",
  Memory = "memory",
  Contextual = "contextual",
  Nonverbal = "nonverbal",
  // Micro accent orbs
  Attention = "attention",
  Perspectives = "perspectives",
  Feedback = "feedback",
  Emotion = "emotion",
  Encoding = "encoding",
  Speed = "speed",
  Executive = "executive",
  Pattern = "pattern",
}

/**
 * Visual size tier for a modality.
 *  - {@link ModalityTier.Plus}: large pill that participates in the central plus/cross.
 *  - {@link ModalityTier.Chip}: small satellite chip placed at corners / edges.
 */
export enum ModalityTier {
  Plus = "plus",
  Chip = "chip",
  /** Icon-only accent dot — no label, tooltip-only. */
  Micro = "micro",
}

/** Sentinel marking an empty cell in the grid layout. */
export enum GridSlot {
  Empty = "empty",
}

export interface ModalityDef {
  key: ModalityKey;
  label: string;
  icon: ReactNode;
  color: string;
  tier: ModalityTier;
}

/** A single row of the {@link MODALITY_GRID_LAYOUT}. */
export type ModalityGridRow = readonly (ModalityKey | GridSlot.Empty)[];

/** 2D grid layout of modalities, rows top → bottom, cells left → right. */
export type ModalityGridLayout = readonly ModalityGridRow[];
