/**
 * Status Targets — Mood, Auras, Gear, Buffs as one pinable entity family.
 *
 * Profile Today (and loadout bars / HUD) treat these four as the same shape:
 * a thin ref + display fields. Full panels on Character still manage depth;
 * this module is the shared contract for grid tiles, HUD displays, and pins.
 */

import type { MoodLabel } from "./status";

export type StatusTargetKind = "mood" | "aura" | "gear" | "buff";

export type StatusTargetRef =
  | { kind: "mood"; moodId: MoodLabel }
  | { kind: "aura"; auraId: string }
  | { kind: "gear"; itemId: string }
  | { kind: "buff"; effectId: string };

export const STATUS_TARGET_KINDS: readonly StatusTargetKind[] = [
  "mood",
  "aura",
  "gear",
  "buff",
] as const;

export const STATUS_TARGET_KIND_META: Record<
  StatusTargetKind,
  { label: string; section: string; color: string }
> = {
  mood: { label: "Mood", section: "MOOD", color: "#f59e0b" },
  aura: { label: "Aura", section: "AURAS", color: "#818cf8" },
  gear: { label: "Gear", section: "GEAR", color: "#35c99b" },
  buff: { label: "Buff", section: "BUFFS", color: "#16a34a" },
};

/** Stable map key — also used as SquareTile id and loadout actionKey. */
export function statusTargetKey(ref: StatusTargetRef): string {
  switch (ref.kind) {
    case "mood":
      return `mood:${ref.moodId}`;
    case "aura":
      return `aura:${ref.auraId}`;
    case "gear":
      return `gear:${ref.itemId}`;
    case "buff":
      return `buff:${ref.effectId}`;
  }
}

export function sameStatusTarget(a: StatusTargetRef, b: StatusTargetRef): boolean {
  return statusTargetKey(a) === statusTargetKey(b);
}

export function parseStatusTargetKey(key: string): StatusTargetRef | null {
  const colon = key.indexOf(":");
  if (colon < 0) return null;
  const kind = key.slice(0, colon);
  const id = key.slice(colon + 1);
  if (!id) return null;
  if (kind === "mood") return { kind: "mood", moodId: id as MoodLabel };
  if (kind === "aura") return { kind: "aura", auraId: id };
  if (kind === "gear") return { kind: "gear", itemId: id };
  if (kind === "buff") return { kind: "buff", effectId: id };
  return null;
}
