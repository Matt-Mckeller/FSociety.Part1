"use client";

/**
 * Map the character's equipped spell book onto chat context actions.
 *
 * The Actions dock is the same loadout as the Character lens Spell Book —
 * ids, names, and copy come from the Spellbook registry, not a second list.
 */

import type { ContextAction } from "@4eye/features";
import type { EquippedSpell } from "@4eye/web/Tiles/character/model/types";
import {
  SPELLBOOK_SEED,
  SPELL_CATEGORIES,
  SPELL_CATEGORY_META,
  type Spell,
  type SpellCategory,
} from "@4eye/web/Tiles/spellbook";

export const SPELL_BY_ID: Record<string, Spell> = Object.fromEntries(
  SPELLBOOK_SEED.spells.map((s) => [s.id, s]),
);

export function resolveEquippedSpells(equipped: EquippedSpell[]): Spell[] {
  return equipped
    .map((e) => SPELL_BY_ID[e.spellId])
    .filter((s): s is Spell => Boolean(s));
}

export function contextActionsFromEquippedSpells(
  equipped: EquippedSpell[],
): ContextAction[] {
  return resolveEquippedSpells(equipped).map((s) => ({
    id: s.id,
    label: s.name,
    description: s.shortDescription,
    enabled: false,
  }));
}

export interface SpellActionGroup {
  category: SpellCategory;
  label: string;
  color: string;
  spells: Spell[];
}

export function groupSpellsByCategory(spells: Spell[]): SpellActionGroup[] {
  return SPELL_CATEGORIES.map((category) => ({
    category,
    label: SPELL_CATEGORY_META[category].label,
    color: SPELL_CATEGORY_META[category].color,
    spells: spells.filter((s) => s.category === category),
  })).filter((g) => g.spells.length > 0);
}
