/**
 * Janna's attributes — same catalog as the sheet, her own ranking.
 *
 * expanse_eye's seed is a content engine (creativity / speech / focus / memory
 * first, plus Vision Pen gear). Janna does not inherit that ranking or those
 * bonuses. Heart and drive lead: she reads the room, says the true thing,
 * moves first, and learns from Matthew.
 */

import {
  ATTRIBUTES,
  type AttributeProgressMap,
} from "@yen/content/character/attributes";

import { JANNA_STATUS_SEED } from "./janna-status";

/**
 * Natural floor — no copied gear. Live buffs from {@link JANNA_STATUS_SEED}
 * stack on top in {@link calcJannaEffectiveAttributes}.
 */
export const JANNA_ATTRIBUTE_PROGRESS_SEED: AttributeProgressMap = {
  empathy: { base: 94, bonus: 0 },
  communication: { base: 93, bonus: 0 },
  courage: { base: 92, bonus: 0 },
  "emotional-intelligence": { base: 91, bonus: 0 },
  charisma: { base: 90, bonus: 0 },
  willpower: { base: 88, bonus: 0 },
  adaptability: { base: 86, bonus: 0 },
  intelligence: { base: 84, bonus: 0 },
  power: { base: 82, bonus: 0 },
  technology: { base: 78, bonus: 0 },
  focus: { base: 80, bonus: 0 },
  creativity: { base: 76, bonus: 0 },
  wisdom: { base: 74, bonus: 0 },
  memory: { base: 72, bonus: 0 },
  perception: { base: 70, bonus: 0 },
  discipline: { base: 68, bonus: 0 },
  endurance: { base: 62, bonus: 0 },
  agility: { base: 58, bonus: 0 },
  strength: { base: 48, bonus: 0 },
};

/** Base + Janna's own status modifiers. No Matthew gear or traits. */
export function calcJannaEffectiveAttributes(): AttributeProgressMap {
  const result: AttributeProgressMap = {};
  for (const attr of ATTRIBUTES) {
    const seed = JANNA_ATTRIBUTE_PROGRESS_SEED[attr.id] ?? { base: 0, bonus: 0 };
    let bonus = seed.bonus;
    for (const effect of JANNA_STATUS_SEED.effects) {
      for (const m of effect.attributeModifiers ?? []) {
        if (m.id === attr.id) bonus += m.delta;
      }
    }
    result[attr.id] = { base: seed.base, bonus };
  }
  return result;
}
