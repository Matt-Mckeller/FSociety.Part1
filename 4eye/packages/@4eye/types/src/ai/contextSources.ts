/**
 * Chat context sources — what ambient data rides on the next reply.
 *
 * Each source is an on/off flag on AISettings. This file owns the catalog
 * so the panel, picker, summary, and export all read from one definition.
 */

export type ChatContextSourceId =
  | "screen"
  | "camera"
  | "companion"
  | "mic"
  | "memory"
  | "trail"
  | "family"
  | "relationships";

export const CHAT_CONTEXT_SOURCE_IDS: ChatContextSourceId[] = [
  "screen",
  "camera",
  "companion",
  "mic",
  "memory",
  "trail",
  "family",
  "relationships",
];

export type ChatContextSourceGroup = "senses" | "presence" | "session" | "people";

export interface ChatContextSourceMeta {
  id: ChatContextSourceId;
  label: string;
  group: ChatContextSourceGroup;
  /** Longer description shown in tooltips. */
  gloss: string;
  defaultOn: boolean;
}

export const CHAT_CONTEXT_SOURCE_GROUP_LABEL: Record<ChatContextSourceGroup, string> = {
  senses: "Senses",
  presence: "Presence",
  session: "Session",
  people: "People",
};

export const CHAT_CONTEXT_SOURCE_META: Record<ChatContextSourceId, ChatContextSourceMeta> = {
  screen: {
    id: "screen",
    label: "Screen",
    group: "senses",
    gloss: "What's on the display",
    defaultOn: false,
  },
  camera: {
    id: "camera",
    label: "Camera",
    group: "senses",
    gloss: "Camera frame",
    defaultOn: false,
  },
  mic: {
    id: "mic",
    label: "Mic",
    group: "senses",
    gloss: "Ambient listen — not voice-as-input",
    defaultOn: false,
  },
  companion: {
    id: "companion",
    label: "Companion",
    group: "presence",
    gloss: "Companion character and bond state",
    defaultOn: true,
  },
  memory: {
    id: "memory",
    label: "Memory",
    group: "session",
    gloss: "Prior turns and stored chat memory",
    defaultOn: true,
  },
  trail: {
    id: "trail",
    label: "Trail",
    group: "session",
    gloss: "What I just did — HUD, spell, and app actions",
    defaultOn: true,
  },
  family: {
    id: "family",
    label: "Family",
    group: "people",
    gloss: "Family details",
    defaultOn: false,
  },
  relationships: {
    id: "relationships",
    label: "Relationships",
    group: "people",
    gloss: "Relationship details",
    defaultOn: false,
  },
};

export const CHAT_CONTEXT_SOURCE_GROUPS: ChatContextSourceGroup[] = [
  "senses",
  "presence",
  "session",
  "people",
];

/** Default map — all sources at their default on/off value. */
export function defaultContextSources(): Record<ChatContextSourceId, boolean> {
  const result = {} as Record<ChatContextSourceId, boolean>;
  for (const id of CHAT_CONTEXT_SOURCE_IDS) {
    result[id] = CHAT_CONTEXT_SOURCE_META[id].defaultOn;
  }
  return result;
}

/**
 * Merge a stored blob with defaults. Missing keys from new catalog entries
 * are filled with their default so old persisted blobs stay valid.
 */
export function mergeContextSources(
  stored: Partial<Record<ChatContextSourceId, boolean>>,
): Record<ChatContextSourceId, boolean> {
  const defaults = defaultContextSources();
  return { ...defaults, ...stored };
}
