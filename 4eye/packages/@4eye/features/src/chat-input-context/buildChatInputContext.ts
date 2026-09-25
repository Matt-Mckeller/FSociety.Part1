import type {
  AISettings,
  DomainConfig,
  Goal,
  PipelineTemplate,
  ProfileContextSettings,
  Project,
  SelectedContext,
  Target,
  Audience,
  Location,
  StoryTemplate,
  AnimationTemplate,
  SceneTemplate,
  SequenceTemplate,
  TargetingState,
} from "@4eye/types";
import {
  CHAT_CONTEXT_SOURCE_IDS,
  CHAT_CONTEXT_SOURCE_META,
} from "@4eye/types";
import type { ContextAction } from "../context-actions";
import { includedTargets } from "../targeting/cast";

/** Resolved entity payload — IDs replaced with full objects. */
export interface ResolvedSelectedContext {
  targets: Target[];
  audiences: Audience[];
  locations: Location[];
  stories: StoryTemplate[];
  animations: AnimationTemplate[];
  scenes: SceneTemplate[];
  sequences: SequenceTemplate[];
  pipelines: PipelineTemplate[];
}

/**
 * Final assembled payload that gets sent (alongside the user's message
 * text) to the AI provider. Pure data — no React or DOM in here.
 */
/** Targeting payload — assignments + resolved Target entities. */
export interface ResolvedTargeting {
  state: TargetingState;
  actors: Target[];
  targets: Target[];
}

export interface ChatInputContextPayload {
  domain: DomainConfig;
  goals: Goal[];
  projects: Project[];
  selectedContext: SelectedContext;
  resolvedContext: ResolvedSelectedContext;
  targeting: ResolvedTargeting;
  aiSettings: AISettings;
  contextActions: ContextAction[];
  profile: ProfileContextSettings;
}

interface BuildArgs {
  domain: DomainConfig;
  goals: Goal[];
  projects: Project[];
  selectedContext: SelectedContext;
  resolvedContext: ResolvedSelectedContext;
  targeting: ResolvedTargeting;
  aiSettings: AISettings;
  contextActions: ContextAction[];
  profile: ProfileContextSettings;
}

/**
 * Pure assembly: combines every slice into a single payload.
 * Filters contextActions to only enabled ones.
 */
export function buildChatInputContext(args: BuildArgs): ChatInputContextPayload {
  return {
    domain: args.domain,
    goals: args.goals,
    projects: args.projects,
    selectedContext: args.selectedContext,
    resolvedContext: args.resolvedContext,
    targeting: args.targeting,
    aiSettings: args.aiSettings,
    contextActions: args.contextActions.filter((a) => a.enabled),
    profile: args.profile,
  };
}

/** Human-readable summary used by the chat input header. */
export function summarizeChatInputContext(p: ChatInputContextPayload): string {
  const plural = (n: number, word: string) => `${n} ${word}${n !== 1 ? "s" : ""}`;

  const selectedEntityCount = Object.values(p.selectedContext).reduce(
    (sum, ids) => sum + ids.length,
    0,
  );
  const included = includedTargets(p.resolvedContext.targets, p.targeting.targets);

  const parts = [
    p.domain.label,
    p.targeting.actors.length && plural(p.targeting.actors.length, "actor"),
    p.targeting.targets.length && `${p.targeting.targets.length} aimed`,
    p.resolvedContext.audiences.length &&
      `${p.resolvedContext.audiences.length} who else`,
    included.length && plural(included.length, "included"),
    p.goals.length && plural(p.goals.length, "goal"),
    p.projects.length && plural(p.projects.length, "project"),
    selectedEntityCount         && plural(selectedEntityCount, "entity"),
    p.contextActions.length     && plural(p.contextActions.length, "action"),
    p.profile.enabled && p.profile.includedAspects.length &&
      `profile (${p.profile.includedAspects.length})`,
    p.profile.actingAsRoles?.length &&
      plural(p.profile.actingAsRoles.length, "role"),
    ...enabledContextSourceLabels(p.aiSettings),
  ].filter(Boolean);

  return parts.join(" · ");
}

/** Labels for context sources that are explicitly on. */
function enabledContextSourceLabels(aiSettings: AISettings): string[] {
  if (!aiSettings.contextSources) return [];
  return CHAT_CONTEXT_SOURCE_IDS.filter(
    (id) => aiSettings.contextSources[id] ?? CHAT_CONTEXT_SOURCE_META[id].defaultOn,
  ).map((id) => CHAT_CONTEXT_SOURCE_META[id].label.toLowerCase());
}
