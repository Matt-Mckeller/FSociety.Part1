"use client";

/**
 * Journal tile — public barrel.
 */

export { JournalTile, default } from "./JournalTile";
export type { JournalTileProps } from "./JournalTile";
export {
  JournalProvider,
  useJournal,
  JOURNAL_STORAGE_KEY,
} from "./store/JournalProvider";
export type {
  JournalState,
  JournalAction,
  KindFilter,
  EditorMode,
} from "./store/JournalProvider";
export { JOURNAL_SEED, JOURNAL_EMPTY } from "./store/seed-data";
export {
  runTransformation,
  TRANSFORM_SPELL_IDS,
} from "./store/transformations";
export {
  JOURNAL_KINDS,
  JOURNAL_KIND_META,
} from "./model/types";
export type {
  JournalEntry,
  JournalData,
  JournalKind,
  ChatTurn,
  TransformResult,
} from "./model/types";
