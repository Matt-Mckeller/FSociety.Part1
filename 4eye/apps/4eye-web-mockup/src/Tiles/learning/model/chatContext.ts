/**
 * The bridge between a learning session and the chat that runs it.
 *
 * A session is a description of *how* the assistant should work — pace as a
 * throughput rating (Super Sonic = 200 APM), depth, support style, output format,
 * which modalities to engage, which step is next.
 * That is chat context, so it says so here rather than staying a decoration on
 * a separate tab.
 *
 * These are pure derivations for two reasons. First, the HUD composer renders
 * at a slot *outside* the provider tree (see `AiChatInputBar`), so its values
 * have to be read here and passed down as props — a hook wouldn't reach. Second,
 * the session deliberately does *not* get pushed into `ChatInputContextProvider`
 * in `@4eye/features`: that package composes provider-shaped slices and has no
 * business knowing this app's tile stores. The summary composes as a suffix, so
 * the coupling stays one-way and in the app.
 */

import {
  LEARNING_CORE_MODALITIES,
  LEARNING_INPUT_TYPE_META,
  LEARNING_MODALITY_META,
  LEARNING_OPTION_GROUPS,
  LEARNING_OPTION_GROUP_LABEL,
  LEARNING_SHAPE_META,
  OPT_DEPTH_AUTO,
  OPT_OUTPUT_CUSTOM,
  type LearningChecklistItem,
  type LearningModality,
  type LearningOption,
  type LearningOptionGroup,
  type LearningSession,
  type LearningShape,
  isSessionStep,
  sessionSteps,
} from "./types";
import { apmRangeLabel, formatApm } from "./apm";

/** The chosen option in each group, in group order. Groups with no pick are skipped. */
export function selectedOptions(session: LearningSession): LearningOption[] {
  return LEARNING_OPTION_GROUPS.map((group) =>
    session.options.find((o) => o.group === group && o.selected),
  ).filter((o): o is LearningOption => Boolean(o));
}

export function selectedOption(
  session: LearningSession,
  group: LearningOptionGroup,
): LearningOption | undefined {
  return session.options.find((o) => o.group === group && o.selected);
}

/** The next unchecked pre-flight step — amplifiers and reminders do not count. */
export function activeStep(session: LearningSession): LearningChecklistItem | undefined {
  return session.checklist.find((c) => isSessionStep(c) && !c.done);
}

/** 1-based position of the active step, and the total. `{ 0, 0 }` when there is no checklist. */
export function stepPosition(session: LearningSession): { index: number; total: number } {
  const steps = sessionSteps(session.checklist);
  const total = steps.length;
  if (total === 0) return { index: 0, total: 0 };
  const next = steps.findIndex((c) => !c.done);
  // Every step done — report the last one rather than 0, so the strip reads
  // "step 5/5" at completion instead of collapsing to nothing.
  return { index: next === -1 ? total : next + 1, total };
}

export function coreModalityCount(session: LearningSession): number {
  return LEARNING_CORE_MODALITIES.filter((m) => session.modalities.includes(m)).length;
}

export function taggedContextFacets(session: LearningSession): LearningModality[] {
  if (session.autoImportContext) return [];
  return session.modalities.filter((m) => LEARNING_MODALITY_META[m].kind === "context");
}

export function taggedLearningModalities(session: LearningSession): LearningModality[] {
  return session.modalities.filter((m) => LEARNING_MODALITY_META[m].kind === "modality");
}

export function taggedShapes(session: LearningSession): LearningShape[] {
  return session.shapes;
}

/**
 * The one-line version, appended to the chat's own context summary.
 *
 * Pace and depth earn their words because they change the shape of an answer;
 * the APM rating rides with pace so the strip says 200, not only "Super Sonic".
 * Support and output are in the directive but not here, because a strip that
 * runs past its line stops being readable at a glance. Modalities and the step
 * collapse to counts for the same reason.
 */
export function summarizeLearningSession(session: LearningSession): string {
  const covered = coreModalityCount(session);
  const context = taggedContextFacets(session).length;
  const shapes = taggedShapes(session).length;
  const { index, total } = stepPosition(session);
  const pace = selectedOption(session, "pace")?.label;
  const depth = selectedOption(session, "depth")?.label;
  const apm = session.throughput && session.throughput.apm > 0
    ? formatApm(session.throughput.apm)
    : null;

  const parts = [
    pace && apm ? `${pace} · ${apm}` : pace,
    depth && depth.toLowerCase(),
    covered > 0 && `${covered} ${covered === 1 ? "modality" : "modalities"}`,
    session.autoImportContext
      ? "ORC (auto)"
      : context > 0 && `context (${context})`,
    shapes > 0 && `shapes (${shapes})`,
    total > 0 && `step ${index}/${total}`,
  ].filter(Boolean);

  return parts.join(" · ");
}

/**
 * The full instruction the session contributes — shown read-only in the Learn
 * panel so the wiring is visible rather than implied. This is the string a real
 * backend would prepend; with no backend yet it is the honest stand-in.
 */
export function learningDirective(session: LearningSession): string {
  const lines: string[] = [`Working on: ${session.title}.`];

  const opts = selectedOptions(session);
  if (opts.length > 0) {
    lines.push(
      opts
        .map((o) => {
          if (o.group === "pace" && o.apmBand) {
            return `${LEARNING_OPTION_GROUP_LABEL[o.group]}: ${o.label.toLowerCase()} (${apmRangeLabel(o.apmBand)})`;
          }
          if (o.group === "depth" && o.id === OPT_DEPTH_AUTO) {
            return "Depth: auto (follows the prompt)";
          }
          if (o.group === "output") {
            const note = session.outputNote?.trim();
            if (o.id === OPT_OUTPUT_CUSTOM) {
              return note
                ? `Output format: custom — ${note}`
                : "Output format: custom (describe the shape in the note)";
            }
            return note
              ? `Output format: ${o.label.toLowerCase()} (note: ${note})`
              : `Output format: ${o.label.toLowerCase()}`;
          }
          return `${LEARNING_OPTION_GROUP_LABEL[o.group]}: ${o.label.toLowerCase()}`;
        })
        .join(", ") + ".",
    );
  }

  const ways = taggedLearningModalities(session);
  if (ways.length > 0) {
    lines.push(
      `Engage these ways of learning: ${ways
        .map((m) => LEARNING_MODALITY_META[m].label.toLowerCase())
        .join(", ")}.`,
    );
  }

  if (session.autoImportContext) {
    lines.push(
      "Auto-import optimally relevant context — or all relevant context, depending on availability and system coins.",
    );
  } else {
    const context = taggedContextFacets(session);
    if (context.length > 0) {
      lines.push(
        `Include this about the learner: ${context
          .map((m) => LEARNING_MODALITY_META[m].label.toLowerCase())
          .join(", ")}.`,
      );
    }
  }

  const shapes = taggedShapes(session);
  if (shapes.length > 0) {
    lines.push(
      `Use these shapes as visual language: ${shapes
        .map((s) => LEARNING_SHAPE_META[s].label.toLowerCase())
        .join(", ")}.`,
    );
  }

  const step = activeStep(session);
  if (step) {
    lines.push(`Next step: ${step.label}${step.hint ? ` (${step.hint})` : ""}.`);
  } else if (session.checklist.length > 0) {
    lines.push("Every step is done — check understanding and wrap up.");
  }

  return lines.join(" ");
}

/**
 * What the composer should invite you to type. The active step is a better
 * prompt than "Ask anything" because the session already knows what you are
 * meant to be doing next.
 */
export function composerPlaceholder(session: LearningSession): string {
  const step = activeStep(session);
  if (step) return `${step.label}…`;
  if (session.checklist.length > 0) return "Explain it back — every step is done.";
  const type = session.inputType;
  if (type) return LEARNING_INPUT_TYPE_META[type].blurb;
  return "Ask anything…";
}
