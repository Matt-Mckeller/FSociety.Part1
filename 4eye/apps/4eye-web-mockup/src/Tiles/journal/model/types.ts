"use client";

/**
 * Journal tile — domain model (V1 mockup).
 *
 * A single place to take notes, keep a journal, and track AI chats. Every
 * record is a {@link JournalEntry} with a markdown `body`; `kind` distinguishes
 * a quick note from a dated journal entry from a saved AI conversation.
 *
 * Learning Transformations (mocked, deterministic) reshape an entry's body —
 * the same taxonomy the Spellbook exposes via its `learn`-category spells. See
 * `store/transformations.ts`.
 */

/** What kind of record this is — drives iconography + the "New" menu. */
export type JournalKind = "note" | "journal" | "ai-chat";

export const JOURNAL_KINDS: JournalKind[] = ["note", "journal", "ai-chat"];

export interface JournalKindMeta {
  id: JournalKind;
  label: string;
  /** Plural label used by the filter chips. */
  plural: string;
  /** MUI icon key (resolved in components, kept data-only here). */
  icon: string;
  color: string;
}

export const JOURNAL_KIND_META: Record<JournalKind, JournalKindMeta> = {
  note: { id: "note", label: "Note", plural: "Notes", icon: "StickyNote2Rounded", color: "#3b82f6" },
  journal: { id: "journal", label: "Journal", plural: "Journal", icon: "MenuBookRounded", color: "#8b5cf6" },
  "ai-chat": { id: "ai-chat", label: "AI Chat", plural: "AI Chats", icon: "ForumRounded", color: "#22c55e" },
};

/** One turn in an AI-chat entry's transcript. */
export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
  at: number;
}

export interface JournalEntry {
  id: string;
  kind: JournalKind;
  title: string;
  /** Markdown body. For `ai-chat` entries this is an optional summary. */
  body: string;
  tags: string[];
  /** Transcript — present (and meaningful) only for `kind === "ai-chat"`. */
  chat?: ChatTurn[];
  pinned?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface JournalData {
  entries: JournalEntry[];
}

/** Result of casting a Learning Transformation on an entry's body. */
export interface TransformResult {
  /** Spellbook spell id, e.g. "SPELL_CONCISE". */
  spellId: string;
  /** Human label, e.g. "Concise". */
  label: string;
  /** The transformed markdown. */
  output: string;
  at: number;
}
