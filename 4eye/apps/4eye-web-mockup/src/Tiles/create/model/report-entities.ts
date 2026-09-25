/**
 * Report entities — lightweight lens scaffold (plan §2.2).
 *
 * Report (life-documentation) entities — Symbols, Connections, Communications,
 * Perspectives — feed seeds / animation / marketing. These are deliberately
 * thin, self-contained shapes (decoupled from the Report app) so the Create
 * screen can browse and hand them to chat today; they map onto the real
 * Report `types.ts` (Symbol / Connection / Communication / Perspective) and
 * the shared Entity base later.
 */

import type { GlyphName } from "../components/brand-glyphs";

export type ReportEntityKind =
  | "symbol"
  | "connection"
  | "communication"
  | "perspective";

interface ReportEntityBase {
  id: string;
  slug: string;
  kind: ReportEntityKind;
  label: string;
  glyph?: GlyphName;
}

/** A recurring symbol / pattern (cf. Report `Symbol`). */
export interface ReportSymbol extends ReportEntityBase {
  kind: "symbol";
  meaning: string;
  /** How many times it has occurred across events. */
  occurrences: number;
}

/** A relationship edge between two entities (cf. Report `Connection`). */
export interface ReportConnection extends ReportEntityBase {
  kind: "connection";
  from: string;
  to: string;
  strength: "weak" | "moderate" | "strong";
}

/** A communication / message (cf. Report `Communication`). */
export interface ReportCommunication extends ReportEntityBase {
  kind: "communication";
  channel: string;
  perceivedMeaning?: string;
  reality?: string;
}

/** A target interpretation / point of view (cf. Report `Perspective`). */
export interface ReportPerspective extends ReportEntityBase {
  kind: "perspective";
  interpretation: string;
  likelihood?: "low" | "medium" | "high";
}

export type ReportEntity =
  | ReportSymbol
  | ReportConnection
  | ReportCommunication
  | ReportPerspective;

/** Display metadata per kind (label + glyph + accent color). */
export const REPORT_KIND_META: Record<
  ReportEntityKind,
  { label: string; glyph: GlyphName; color: string }
> = {
  symbol: { label: "Symbols", glyph: "vision", color: "#7c3aed" },
  connection: { label: "Connections", glyph: "connection", color: "#0891b2" },
  communication: { label: "Communications", glyph: "prompt", color: "#d97706" },
  perspective: { label: "Perspectives", glyph: "perspective", color: "#2c4f76" },
};

// ── Fixture ──────────────────────────────────────────────────────────────────
export const REPORT_SYMBOLS: ReportSymbol[] = [
  { id: "rs-1", slug: "symbol-eye", kind: "symbol", glyph: "perspective", label: "The Eye", meaning: "Awareness / being seen and seeing clearly.", occurrences: 7 },
  { id: "rs-2", slug: "symbol-growth", kind: "symbol", glyph: "grow", label: "Growth bars", meaning: "1:2:3 progression — small to large.", occurrences: 4 },
  { id: "rs-3", slug: "symbol-link", kind: "symbol", glyph: "connection", label: "Linked rings", meaning: "Connection / healing between people.", occurrences: 5 },
  { id: "rs-4", slug: "symbol-agi-rib", kind: "symbol", glyph: "rib", label: "AGI Rib", meaning: "Structure gifted to Emily Cart — holds the heart while she builds.", occurrences: 3 },
  { id: "rs-5", slug: "symbol-rib-clip", kind: "symbol", glyph: "rib-clip", label: "Rib Clip", meaning: "Marketing / video combo: rib nest with a play frame for the Pur Meow handoff.", occurrences: 2 },
  { id: "rs-6", slug: "symbol-pur-meow", kind: "symbol", glyph: "pur-meow", label: "Pur Meow", meaning: "Cat brand logo — name and stewardship open; discover together.", occurrences: 1 },
];

export const REPORT_CONNECTIONS: ReportConnection[] = [
  { id: "rc-1", slug: "conn-teacher-student", kind: "connection", glyph: "connection", label: "Teacher → Students", from: "Teacher", to: "Students", strength: "strong" },
  { id: "rc-2", slug: "conn-cafe-pair", kind: "connection", glyph: "connection", label: "Café pair", from: "Person A", to: "Person B", strength: "moderate" },
];

export const REPORT_COMMUNICATIONS: ReportCommunication[] = [
  { id: "rm-1", slug: "comm-hud-activation", kind: "communication", glyph: "prompt", label: "HUD activation", channel: "in-world", perceivedMeaning: "A gift is received.", reality: "Capability unlocked." },
  { id: "rm-2", slug: "comm-neural-share", kind: "communication", glyph: "prompt", label: "Neural share", channel: "dream", perceivedMeaning: "Shared knowledge.", reality: "Aspirational future." },
];

export const REPORT_PERSPECTIVES: ReportPerspective[] = [
  { id: "rp-1", slug: "persp-objective", kind: "perspective", glyph: "perspective", label: "Objective", interpretation: "Engagement transformation — disengaged → excited to learn.", likelihood: "high" },
  { id: "rp-2", slug: "persp-business", kind: "perspective", glyph: "perspective", label: "Business", interpretation: "Relationships deepen through shared understanding.", likelihood: "medium" },
  { id: "rp-3", slug: "persp-ai", kind: "perspective", glyph: "perspective", label: "AI", interpretation: "Vision of shared knowledge and human empowerment.", likelihood: "high" },
];

export const REPORT_ENTITIES: ReportEntity[] = [
  ...REPORT_SYMBOLS,
  ...REPORT_CONNECTIONS,
  ...REPORT_COMMUNICATIONS,
  ...REPORT_PERSPECTIVES,
];

/** Group the entities by kind, preserving fixture order. */
export function groupReportEntities(
  entities: ReportEntity[] = REPORT_ENTITIES,
): Record<ReportEntityKind, ReportEntity[]> {
  return {
    symbol: entities.filter((e) => e.kind === "symbol"),
    connection: entities.filter((e) => e.kind === "connection"),
    communication: entities.filter((e) => e.kind === "communication"),
    perspective: entities.filter((e) => e.kind === "perspective"),
  };
}

/** A one-line detail string for an entity (used in chat hand-off + tooltips). */
export function reportEntityDetail(e: ReportEntity): string {
  switch (e.kind) {
    case "symbol":
      return `${e.meaning} · ${e.occurrences}×`;
    case "connection":
      return `${e.from} → ${e.to} · ${e.strength}`;
    case "communication":
      return `${e.channel}${e.reality ? ` · ${e.reality}` : ""}`;
    case "perspective":
      return `${e.interpretation}${e.likelihood ? ` · ${e.likelihood}` : ""}`;
  }
}
