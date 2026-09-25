"use client";

/**
 * Character tile — public barrel.
 */

export { CharacterTile, default } from "./CharacterTile";
export type { CharacterTileProps } from "./CharacterTile";
export { CharacterProvider, useCharacter } from "./store/CharacterProvider";
export type {
  CharacterState,
  CharacterAction,
} from "./store/CharacterProvider";
export { CHARACTER_SEED, CHARACTER_EMPTY } from "./store/seed-data";
export {
  WORK_KIND_LABEL,
  WORK_STATUS_LABEL,
  WORK_STATUS_COLOR,
} from "./model/types";
export type {
  Character,
  CharacterData,
  CharacterStat,
  EquippedAction,
  EquippedSpell,
  EquippedWorkItem,
  EquippedGoal,
  WorkKind,
  WorkStatus,
} from "./model/types";
