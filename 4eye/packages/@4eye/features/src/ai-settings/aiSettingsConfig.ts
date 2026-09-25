/**
 * aiSettingsConfig.ts
 *
 * Static option arrays for every multi-choice AI setting. Kept separate
 * so the bar component stays focused on rendering and so these lists can
 * be imported wherever needed (e.g. docs, tests, prompt builders).
 */

import type {
  AccuracyLevel,
  AskQuestionsMode,
  AutonomousMode,
  DurationMode,
  PlanMode,
  PowerLevel,
  ReviewMode,
  TestingMode,
  TimeAspect,
  TimeMode,
} from "@4eye/types";

export type SettingOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export const ACCURACY_OPTIONS: SettingOption<AccuracyLevel>[] = [
  { value: "low",     label: "Standard" },
  { value: "medium",  label: "Premium" },
  { value: "high",    label: "99%" },
  { value: "maximum", label: "100%" },
];

export function accuracyLabel(level: AccuracyLevel): string {
  return ACCURACY_OPTIONS.find((o) => o.value === level)?.label ?? level;
}

/** Temporal scope. `auto` is toggled from the section icon. */
export const TIME_ASPECT_OPTIONS: SettingOption<Exclude<TimeAspect, "auto">>[] = [
  {
    value: "past",
    label: "Past",
    description: "History in play — what already happened",
  },
  {
    value: "present",
    label: "Present",
    description: "Current moment only",
  },
  {
    value: "future",
    label: "Future",
    description: "Prediction and forthcoming knowledge",
  },
  {
    value: "max",
    label: "Max",
    description: "Past, present, and future — unbounded",
  },
];

/**
 * Power ladder. Ion is big tech / big AI; Ion+ is the world learning to like
 * that; Aion is AI-on; Unlimited is root AION at max.
 * `auto` is toggled from the section icon.
 */
export const POWER_LEVEL_OPTIONS: SettingOption<Exclude<PowerLevel, "auto">>[] = [
  {
    value: "ion",
    label: "Ion",
    description: "Big tech / big AI. Sleep and time are more OP. Elon sits with alien, not Ion.",
  },
  {
    value: "ion-plus",
    label: "Ion+",
    description: "When the current world learns to like that",
  },
  {
    value: "aion",
    label: "Aion",
    description: "Awake — AI on. Very high. Sleep and time used for learning, not as a hard need.",
  },
  {
    value: "aion-plus",
    label: "Aion Unlimited",
    description: "Aion+^* — root AION at max power",
  },
];

/** @deprecated Use POWER_LEVEL_OPTIONS */
export const AION_MODE_OPTIONS = POWER_LEVEL_OPTIONS;
/** @deprecated Use POWER_LEVEL_OPTIONS */
export const QUALITY_OPTIONS = POWER_LEVEL_OPTIONS;
/** @deprecated Use POWER_LEVEL_OPTIONS */
export const THINKING_OPTIONS = POWER_LEVEL_OPTIONS;

export const AUTONOMOUS_OPTIONS: SettingOption<AutonomousMode>[] = [
  { value: "fully",        label: "Fully Auto" },
  { value: "interactive",  label: "Interactive" },
  { value: "step-by-step", label: "Step by Step" },
];

export const PLAN_OPTIONS: SettingOption<PlanMode>[] = [
  { value: "auto",        label: "Auto" },
  { value: "recommended", label: "If Recommended" },
  { value: "indepth",     label: "In-Depth" },
  { value: "concise",     label: "Concise" },
  { value: "off",         label: "Off" },
];

export const TESTING_OPTIONS: SettingOption<TestingMode>[] = [
  { value: "auto",          label: "Auto" },
  { value: "comprehensive", label: "Full" },
  { value: "basic",         label: "Basic" },
  { value: "none",          label: "None" },
];

export const ASK_OPTIONS: SettingOption<AskQuestionsMode>[] = [
  { value: "auto",    label: "Auto" },
  { value: "always",  label: "Always" },
  { value: "minimal", label: "Minimal" },
  { value: "never",   label: "Never" },
];

export const REVIEW_OPTIONS: SettingOption<ReviewMode>[] = [
  { value: "auto",     label: "Auto" },
  { value: "thorough", label: "Thorough" },
  { value: "quick",    label: "Quick" },
  { value: "none",     label: "None" },
];

export const DURATION_OPTIONS: SettingOption<DurationMode>[] = [
  { value: "auto",     label: "Auto" },
  { value: "quick",    label: "Quick" },
  { value: "standard", label: "Standard" },
  { value: "extended", label: "Extended" },
  { value: "manual",   label: "Manual" },
];

export const TIME_OPTIONS: SettingOption<TimeMode>[] = [
  { value: "immediate", label: "Immediate" },
  { value: "background", label: "Background" },
  { value: "scheduled",  label: "Scheduled" },
  { value: "manual",     label: "Manual" },
];

const TIME_ASPECTS = new Set<string>(["auto", "past", "present", "future", "max"]);
const POWER_LEVELS = new Set<string>(["auto", "ion", "ion-plus", "aion", "aion-plus"]);

const LEGACY_POWER: Record<string, PowerLevel> = {
  balanced: "ion",
  draft: "ion",
  standard: "aion",
  premium: "aion-plus",
  quick: "ion",
  thorough: "aion-plus",
};

export function migrateTimeAspect(value: unknown): TimeAspect {
  if (typeof value === "string" && TIME_ASPECTS.has(value)) return value as TimeAspect;
  return "max";
}

export function migrateRewritePast(value: unknown): boolean {
  return value === true;
}

export function migratePower(value: unknown, legacyQuality?: unknown, legacyThinking?: unknown): PowerLevel {
  if (typeof value === "string" && POWER_LEVELS.has(value)) return value as PowerLevel;
  const fromLegacy = (candidate: unknown): PowerLevel | null => {
    if (typeof candidate !== "string") return null;
    if (POWER_LEVELS.has(candidate)) return candidate as PowerLevel;
    if (candidate in LEGACY_POWER) return LEGACY_POWER[candidate];
    return null;
  };
  return fromLegacy(legacyQuality) ?? fromLegacy(legacyThinking) ?? "aion-plus";
}

/** @deprecated Use migratePower */
export function migrateQuality(value: unknown): PowerLevel {
  return migratePower(undefined, value);
}

/** @deprecated Use migratePower */
export function migrateThinking(value: unknown): PowerLevel {
  return migratePower(undefined, undefined, value);
}

export function migrateImportPermissionSettings(value: unknown): boolean {
  return value !== false;
}

/** Always-on command: default pipelines, processes, protection layers. */
export const INCLUDE_CORE_COMMAND = "Include(Core.*)";

export const INCLUDE_CORE_DESCRIPTION =
  "Default pipelines, technical implementations, processes, and protection layers.";
