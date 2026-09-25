"use client";

/**
 * Journal — Learning Transformations (mocked).
 *
 * Deterministic, no-network string transforms keyed by Spellbook spell id.
 * These mirror the Spellbook's `learn`-category spells (see
 * `Tiles/spellbook/store/seed-data.ts`) so casting a "learning spell" on a
 * journal entry visibly reshapes its markdown. In V1 this is a mockup of the
 * AI action — swap the body of each fn for a real call later.
 */

import type { TransformResult } from "../model/types";

/** Spell ids this tile knows how to apply, in display order. */
export const TRANSFORM_SPELL_IDS = [
  "SPELL_CONCISE",
  "SPELL_OUTLINE",
  "SPELL_EXPAND",
  "SPELL_EXPLAIN",
  "SPELL_ANALOGIZE",
  "SPELL_EXAMPLE",
  "SPELL_QUIZ",
  "SPELL_FLASHCARD",
] as const;

export type TransformSpellId = (typeof TRANSFORM_SPELL_IDS)[number];

/** Split prose into trimmed, non-empty sentences. */
function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Split into trimmed, non-empty lines. */
function lines(text: string): string[] {
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^[-*+]\s+/, "").trim())
    .filter(Boolean);
}

const TRANSFORMS: Record<TransformSpellId, (text: string) => string> = {
  SPELL_CONCISE: (text) => {
    const top = sentences(text).slice(0, 3);
    if (top.length === 0) return text;
    return ["**Concise**", "", ...top.map((s) => `- ${s}`)].join("\n");
  },
  SPELL_OUTLINE: (text) => {
    const items = lines(text);
    if (items.length === 0) return text;
    const [head, ...rest] = items;
    return [`## ${head}`, "", ...rest.map((l) => `- ${l}`)].join("\n");
  },
  SPELL_EXPAND: (text) => {
    return [
      text.trim(),
      "",
      "### Going deeper",
      "- _Why it matters:_ …",
      "- _A second angle:_ …",
      "- _An edge case to watch:_ …",
    ].join("\n");
  },
  SPELL_EXPLAIN: (text) => {
    const first = sentences(text)[0] ?? text.trim();
    return [
      "### In plain terms",
      "",
      `Think of it like this: ${first.replace(/[.!?]+$/, "")} — broken down step by step so a beginner could follow.`,
      "",
      text.trim(),
    ].join("\n");
  },
  SPELL_ANALOGIZE: (text) => {
    const first = sentences(text)[0] ?? "this idea";
    return [
      `> **Analogy:** ${first.replace(/[.!?]+$/, "")} is like a garden — it only grows with steady attention.`,
      "",
      text.trim(),
    ].join("\n");
  },
  SPELL_EXAMPLE: (text) => {
    return [
      text.trim(),
      "",
      "### Example",
      "_Concrete case:_ Imagine applying the above to a real situation you faced this week …",
    ].join("\n");
  },
  SPELL_QUIZ: (text) => {
    const pts = sentences(text).slice(0, 3);
    const qs =
      pts.length > 0
        ? pts.map((s, i) => `${i + 1}. ${s.replace(/[.!?]+$/, "")}? _(recall)_`)
        : ["1. What is the core idea here? _(recall)_"];
    return [text.trim(), "", "### Quiz yourself", ...qs].join("\n");
  },
  SPELL_FLASHCARD: (text) => {
    const pts = sentences(text).slice(0, 3);
    const cards =
      pts.length > 0
        ? pts.map((s) => `- **Q:** ${s.replace(/[.!?]+$/, "")}?\n  **A:** …`)
        : ["- **Q:** Key term?\n  **A:** …"];
    return ["### Flashcards", "", ...cards].join("\n");
  },
};

export function isTransformSpell(spellId: string): spellId is TransformSpellId {
  return (TRANSFORM_SPELL_IDS as readonly string[]).includes(spellId);
}

/**
 * Run a learning transformation. Returns a {@link TransformResult} (preview),
 * or `null` if the spell isn't a known transform. `label` is the human spell
 * name for display.
 */
export function runTransformation(
  spellId: string,
  label: string,
  text: string,
): TransformResult | null {
  if (!isTransformSpell(spellId)) return null;
  return {
    spellId,
    label,
    output: TRANSFORMS[spellId](text),
    at: Date.now(),
  };
}
