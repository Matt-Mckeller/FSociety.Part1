import type { SymbolColor, SymbolName } from "../symbols";

export interface StoryTemplate {
  id: string;
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  content: string;
  identifiers: string[];
  createdAt: number;
}

export interface AnimationTemplate {
  id: string;
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  keyframes: string[];
  identifiers: string[];
  createdAt: number;
}

export interface SceneTemplate {
  id: string;
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  elements: string[];
  identifiers: string[];
  createdAt: number;
}

/**
 * SequenceTemplate — an ordered chain of scenes/animations played back
 * as a single timeline. Shares the Creative group with stories,
 * animations, and scenes. `steps` are read-only labels in this phase.
 */
export interface SequenceTemplate {
  id: string;
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  /** Ordered step labels (scenes/animations chained into a sequence). */
  steps: string[];
  identifiers: string[];
  createdAt: number;
}

/**
 * PipelineTemplate — an ordered chain of processing stages the AI
 * can execute against the current selection (modeled after backend
 * pipelines like TranscriptionPipeline).
 *
 * Phase 1 ships with a minimal shape: a free-text `summary` plus a
 * read-only ordered list of `stages` (string labels). The detailed
 * stage editor is a deliberate follow-up (see plan).
 */
export interface PipelineStage {
  /** Short human label, e.g. "Transcribe", "Diarize". */
  name: string;
  /** Optional one-line description shown when the row is expanded. */
  description?: string;
}

export interface PipelineTemplate {
  id: string;
  name: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  /** One-line summary surfaced in the row's collapsed state. */
  summary: string;
  /** Ordered stages — read-only in this phase, editor comes later. */
  stages: PipelineStage[];
  identifiers: string[];
  createdAt: number;
}
