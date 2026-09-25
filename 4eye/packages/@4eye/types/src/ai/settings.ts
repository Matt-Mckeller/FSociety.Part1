/**
 * AI Settings
 *
 * Configuration for AI behavior and interaction modes.
 */

import type { ChatContextSourceId } from "./contextSources";
import { defaultContextSources } from "./contextSources";

export type AccuracyLevel = "low" | "medium" | "high" | "maximum";
/**
 * Temporal scope of knowledge. `auto` is set by clicking the section icon.
 * Max is all three — past, present, and future — unbounded.
 */
export type TimeAspect = "auto" | "past" | "present" | "future" | "max";
/**
 * Power ladder. Ion is big tech / big AI; Aion is AI-on; Aion+^* is Unlimited
 * (root AION at max). `auto` is set by clicking the section icon.
 */
export type PowerLevel = "auto" | "ion" | "ion-plus" | "aion" | "aion-plus";
/** @deprecated Use PowerLevel. Kept so old snapshots hydrate. */
export type AionMode = PowerLevel;
/** @deprecated Use PowerLevel. */
export type QualityLevel = PowerLevel;
/** @deprecated Use PowerLevel. */
export type ThinkingMode = PowerLevel;
export type AutonomousMode = "fully" | "interactive" | "step-by-step";
export type PlanMode = "auto" | "recommended" | "indepth" | "concise" | "off";
export type TestingMode = "none" | "basic" | "comprehensive" | "auto";
export type AskQuestionsMode = "auto" | "always" | "minimal" | "never";
export type ReviewMode = "auto" | "thorough" | "quick" | "none";
export type DurationMode = "auto" | "quick" | "standard" | "extended" | "manual";
export type TimeMode = "immediate" | "background" | "scheduled" | "manual";

export interface InstructionItem {
  id: string;
  label: string;
  enabled: boolean;
  description?: string;
}

export interface AISettings {
  accuracy: AccuracyLevel;
  /** 0–1 — temperature/creativity */
  randomness: number;
  /** Past / present / future / max. Default max. */
  timeAspect: TimeAspect;
  /** When past is in scope — may the past be rewritten, or only read? */
  rewritePast: boolean;
  /** Ion (big AI) → Ion+ (world likes it) → Aion → Unlimited (Aion+^*). Default Unlimited. */
  powerLevel: PowerLevel;
  autonomousMode: AutonomousMode;
  planMode: PlanMode;
  testingMode: TestingMode;
  askQuestionsMode: AskQuestionsMode;
  reviewMode: ReviewMode;
  durationMode: DurationMode;
  /** When durationMode === "manual" */
  durationMinutes?: number;
  timeMode: TimeMode;
  /** ISO string when timeMode === "scheduled" | "manual" */
  scheduledTime?: string;
  instructionsIncluded: InstructionItem[];
  /** Pull encrypted AI permission settings into the chat payload. */
  importPermissionSettings: boolean;
  /**
   * Always-on: default pipelines, technical implementations, processes,
   * and protection layers. Literal `true` — not user-toggleable.
   */
  includeCore: true;
  /**
   * Which ambient context sources ride on the next reply.
   * Each key maps to an on/off boolean; missing keys fall back to
   * the catalog default on hydrate.
   */
  contextSources: Record<ChatContextSourceId, boolean>;
}

export const DEFAULT_AI_SETTINGS: AISettings = {
  accuracy: "high",
  randomness: 0.7,
  timeAspect: "max",
  rewritePast: false,
  powerLevel: "aion-plus",
  autonomousMode: "interactive",
  planMode: "auto",
  testingMode: "auto",
  askQuestionsMode: "auto",
  reviewMode: "auto",
  durationMode: "auto",
  timeMode: "immediate",
  instructionsIncluded: [],
  importPermissionSettings: true,
  includeCore: true,
  contextSources: defaultContextSources(),
};

/** Founder RL loop — accuracy 100%, time all, concise, extra-high power. */
export const RL_PERSONAL_AI_SETTINGS: AISettings = {
  ...DEFAULT_AI_SETTINGS,
  accuracy: "maximum",
  randomness: 0.15,
  timeAspect: "max",
  powerLevel: "aion-plus",
  planMode: "concise",
  askQuestionsMode: "minimal",
  reviewMode: "quick",
};

export function matchesRlPersonal(settings: Pick<AISettings, "accuracy" | "timeAspect" | "powerLevel" | "planMode">): boolean {
  return (
    settings.accuracy === RL_PERSONAL_AI_SETTINGS.accuracy &&
    settings.timeAspect === RL_PERSONAL_AI_SETTINGS.timeAspect &&
    settings.powerLevel === RL_PERSONAL_AI_SETTINGS.powerLevel &&
    settings.planMode === RL_PERSONAL_AI_SETTINGS.planMode
  );
}
