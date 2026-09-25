/**
 * Plan document persistence + download.
 * Browser localStorage for the live draft; markdown and JSON files for a copy you can keep.
 */

import { accuracyLabel, includedTargets, type ChatInputContextPayload } from "@4eye/features";
import {
  CHAT_CONTEXT_SOURCE_GROUPS,
  CHAT_CONTEXT_SOURCE_GROUP_LABEL,
  CHAT_CONTEXT_SOURCE_IDS,
  CHAT_CONTEXT_SOURCE_META,
  PROFILE_ASPECT_META,
  type ChatContextSourceId,
  type DomainType,
  type PlanAttachment,
  type PlanAttachmentKind,
  type Project,
} from "@4eye/types";

export type { PlanAttachment, PlanAttachmentKind };

export interface PlanDraft {
  /** Stable id once this draft has been saved as a Project. */
  id?: string;
  title: string;
  body: string;
  attachments: PlanAttachment[];
}

export const PLAN_STORAGE_KEY = "4eye.aiChat.plan.v1";
export const PLAN_EXPORT_VERSION = 1;

export const COMPOSER_COLLAPSED_HEIGHT = 48;
/** Multiline writing surface. Flanking cast columns stay top-aligned with it. */
export const COMPOSER_EXPANDED_HEIGHT = 196;
export const COMPOSER_SIZES = ["collapsed", "expanded"] as const;
export type ComposerSize = (typeof COMPOSER_SIZES)[number];

const EMPTY_DRAFT: PlanDraft = { title: "Untitled plan", body: "", attachments: [] };

const ATTACHMENT_KINDS: PlanAttachmentKind[] = ["text", "voice", "image", "link", "template"];

export function createPlanAttachment(
  kind: PlanAttachmentKind,
  label: string,
  value: string,
  extra?: Pick<PlanAttachment, "dataUrl">,
): PlanAttachment {
  return {
    id: `att-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    kind,
    label,
    value,
    addedAt: Date.now(),
    ...extra,
  };
}

function isPlanAttachment(value: unknown): value is PlanAttachment {
  if (!value || typeof value !== "object") return false;
  const a = value as Partial<PlanAttachment>;
  return (
    typeof a.id === "string" &&
    typeof a.kind === "string" &&
    ATTACHMENT_KINDS.includes(a.kind) &&
    typeof a.label === "string" &&
    typeof a.value === "string" &&
    typeof a.addedAt === "number"
  );
}

export function loadPlanDraft(): PlanDraft {
  if (typeof window === "undefined") return EMPTY_DRAFT;
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return EMPTY_DRAFT;
    const parsed = JSON.parse(raw) as Partial<PlanDraft>;
    if (typeof parsed.title === "string" && typeof parsed.body === "string") {
      return {
        title: parsed.title,
        body: parsed.body,
        attachments: Array.isArray(parsed.attachments)
          ? parsed.attachments.filter(isPlanAttachment)
          : [],
        ...(typeof parsed.id === "string" ? { id: parsed.id } : {}),
      };
    }
  } catch {
    /* ignore corrupt drafts */
  }
  return EMPTY_DRAFT;
}

export function savePlanDraft(draft: PlanDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* quota / private mode */
  }
}

export function excerptPlanBody(body: string, max = 80): string | undefined {
  const line = body
    .split("\n")
    .map((l) => l.replace(/^#+\s*/, "").trim())
    .find(Boolean);
  if (!line) return undefined;
  return line.length > max ? `${line.slice(0, max - 1)}…` : line;
}

export function hasPlanContent(draft: PlanDraft): boolean {
  return Boolean(draft.body.trim()) || (draft.attachments?.length ?? 0) > 0;
}

export function shouldPersistPlan(draft: PlanDraft): boolean {
  const title = draft.title.trim();
  return (
    Boolean(draft.body.trim()) ||
    (draft.attachments?.length ?? 0) > 0 ||
    (Boolean(title) && title !== "Untitled plan")
  );
}

export function planDraftToProjectInput(
  draft: PlanDraft,
  domain: DomainType,
): Omit<Project, "id" | "createdAt"> & { id?: string } {
  return {
    id: draft.id,
    name: draft.title.trim() || "Untitled plan",
    description: excerptPlanBody(draft.body),
    symbol: "Diamond",
    symbolColor: "purple",
    domain,
    status: "active",
    source: "plan",
    planBody: draft.body,
    planAttachments: draft.attachments ?? [],
  };
}

export function projectToPlanDraft(project: Project): PlanDraft {
  return {
    id: project.id,
    title: project.name,
    body: project.planBody ?? "",
    attachments: project.planAttachments ?? [],
  };
}

function names(items: Array<{ name?: string; word?: string }>): string {
  if (items.length === 0) return "—";
  return items.map((i) => i.name ?? i.word ?? "").filter(Boolean).join(", ");
}

function namedList(items: Array<{ id: string; name?: string; word?: string }>) {
  return items.map((i) => ({ id: i.id, name: i.name ?? i.word ?? "" })).filter((i) => i.name);
}

export interface PlanExportContext {
  draft: PlanDraft;
  payload: ChatInputContextPayload;
  sessionTitle?: string;
  stepLabel?: string;
}

function profileLabels(payload: ChatInputContextPayload): string[] {
  if (!payload.profile.enabled) return [];
  return payload.profile.includedAspects.map((id) => PROFILE_ASPECT_META[id]?.label ?? id);
}

function worldGroups(payload: ChatInputContextPayload) {
  return (
    [
      ["locations", "Locations", payload.resolvedContext.locations],
      ["stories", "Stories", payload.resolvedContext.stories],
      ["scenes", "Scenes", payload.resolvedContext.scenes],
      ["sequences", "Sequences", payload.resolvedContext.sequences],
      ["animations", "Animations", payload.resolvedContext.animations],
    ] as const
  ).filter(([, , list]) => list.length > 0);
}

/** Selected Context import options, grouped like the settings picker. */
export function enabledContextGroups(payload: ChatInputContextPayload) {
  const enabled = new Set(enabledSourceIds(payload));
  return CHAT_CONTEXT_SOURCE_GROUPS.map((group) => {
    const sources = CHAT_CONTEXT_SOURCE_IDS.filter(
      (id) => CHAT_CONTEXT_SOURCE_META[id].group === group && enabled.has(id),
    ).map((id) => ({
      id,
      label: CHAT_CONTEXT_SOURCE_META[id].label,
    }));
    return {
      id: group,
      label: CHAT_CONTEXT_SOURCE_GROUP_LABEL[group],
      sources,
    };
  }).filter((g) => g.sources.length > 0);
}

export function serializePlanMarkdown({
  draft,
  payload,
  sessionTitle,
  stepLabel,
}: PlanExportContext): string {
  const title = draft.title.trim() || "Untitled plan";
  const world = worldGroups(payload).map(([, label, list]) => `- ${label}: ${names(list)}`);
  const profile = profileLabels(payload).join(", ") || "—";
  const context = enabledContextGroups(payload).map(
    (g) => `- ${g.label}: ${g.sources.map((s) => s.label).join(", ")}`,
  );
  const attachments = (draft.attachments ?? []).map((a) => `- [${a.kind}] ${a.label}${a.value && a.value !== a.label ? `: ${a.value}` : ""}`);

  const lines = [
    `# ${title}`,
    "",
    `Domain: ${payload.domain.label}`,
    "",
    "## Cast",
    "",
    "Actors aim through who else — or include without aiming.",
    "",
    `- Actors: ${names(payload.targeting.actors)}`,
    `- Who else: ${names(payload.resolvedContext.audiences)}`,
    `- Aim: ${names(payload.targeting.targets)}`,
    `- Included: ${names(includedTargets(payload.resolvedContext.targets, payload.targeting.targets))}`,
    "",
    "## Direction",
    "",
    `- Goals: ${names(payload.goals.map((g) => ({ word: g.ephemeral && g.description ? g.description : g.word })))}`,
    `- Projects: ${names(payload.projects)}`,
  ];

  if (world.length > 0) {
    lines.push("", "## World", "", ...world);
  }

  lines.push(
    "",
    "## Method",
    "",
    `- Pipelines: ${names(payload.resolvedContext.pipelines)}`,
    `- Actions: ${payload.contextActions.map((a) => a.label).join(", ") || "—"}`,
    `- Session: ${sessionTitle ?? "—"}${stepLabel ? ` · ${stepLabel}` : ""}`,
    `- Profile: ${profile}`,
    `- AI: ${accuracyLabel(payload.aiSettings.accuracy)} · time ${payload.aiSettings.timeAspect}${payload.aiSettings.rewritePast ? " · rewrite past" : ""} · power ${payload.aiSettings.powerLevel} · plan ${payload.aiSettings.planMode}${payload.aiSettings.importPermissionSettings ? " · import permissions" : ""} · Include(Core.*)`,
    "",
    "## Context",
    "",
    ...(context.length > 0 ? context : ["_(none selected)_"]),
  );

  if (attachments.length > 0) {
    lines.push("", "## Attachments", "", ...attachments);
  }

  lines.push("", "## Notes", "", draft.body.trim() || "_(no notes)_", "");

  return lines.join("\n");
}

/** Structured snapshot of the live plan — same facts as the markdown, machine-readable. */
export function serializePlanJson({
  draft,
  payload,
  sessionTitle,
  stepLabel,
}: PlanExportContext): string {
  const world = Object.fromEntries(
    worldGroups(payload).map(([key, , list]) => [key, namedList(list)]),
  );

  return JSON.stringify(
    {
      version: PLAN_EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      id: draft.id ?? null,
      title: draft.title.trim() || "Untitled plan",
      notes: draft.body,
      attachments: draft.attachments ?? [],
      domain: { id: payload.domain.id, label: payload.domain.label },
      cast: {
        actors: namedList(payload.targeting.actors),
        whoElse: namedList(payload.resolvedContext.audiences),
        aim: namedList(payload.targeting.targets),
        included: namedList(
          includedTargets(payload.resolvedContext.targets, payload.targeting.targets),
        ),
        audiences: namedList(payload.resolvedContext.audiences),
        targets: namedList(payload.targeting.targets),
      },
    direction: {
      goals: namedList(
        payload.goals.map((g) => ({
          id: g.id,
          word: g.ephemeral && g.description ? g.description : g.word,
        })),
      ),
      projects: namedList(payload.projects),
    },
      world,
      method: {
        pipelines: namedList(payload.resolvedContext.pipelines),
        actions: payload.contextActions.map((a) => a.label),
        session: sessionTitle ?? null,
        step: stepLabel ?? null,
        profile: profileLabels(payload),
        ai: {
          accuracy: payload.aiSettings.accuracy,
          timeAspect: payload.aiSettings.timeAspect,
          rewritePast: payload.aiSettings.rewritePast,
          powerLevel: payload.aiSettings.powerLevel,
          planMode: payload.aiSettings.planMode,
          importPermissionSettings: payload.aiSettings.importPermissionSettings,
          includeCore: payload.aiSettings.includeCore,
        },
      },
      context: {
        sources: enabledSourceIds(payload).map((id) => ({
          id,
          label: CHAT_CONTEXT_SOURCE_META[id].label,
          group: CHAT_CONTEXT_SOURCE_META[id].group,
        })),
        groups: enabledContextGroups(payload),
      },
    },
    null,
    2,
  );
}

function enabledSourceIds(payload: ChatInputContextPayload): ChatContextSourceId[] {
  const sources = payload.aiSettings.contextSources;
  if (!sources) return [];
  return CHAT_CONTEXT_SOURCE_IDS.filter(
    (id) => sources[id] ?? CHAT_CONTEXT_SOURCE_META[id].defaultOn,
  );
}

function planFilename(title: string, ext: string): string {
  const slug =
    title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "untitled-plan";
  const stamp = new Date().toISOString().slice(0, 10);
  return `${slug}-${stamp}.${ext}`;
}

function downloadTextFile(contents: string, filename: string, mime: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadPlanMarkdown(markdown: string, title: string) {
  downloadTextFile(markdown, planFilename(title, "md"), "text/markdown;charset=utf-8");
}

export function downloadPlanJson(json: string, title: string) {
  downloadTextFile(json, planFilename(title, "json"), "application/json;charset=utf-8");
}

export function downloadPlanExports(ctx: PlanExportContext) {
  if (typeof window === "undefined") return;
  const title = ctx.draft.title.trim() || "Untitled plan";
  downloadPlanMarkdown(serializePlanMarkdown(ctx), title);
  // A second download in the same tick is often swallowed; yield one frame.
  window.setTimeout(() => {
    downloadPlanJson(serializePlanJson(ctx), title);
  }, 80);
}
