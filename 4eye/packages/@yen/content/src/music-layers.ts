/**
 * Music layers — optional audio under a recording.
 *
 * A teaching feature first: visitors learn that a video can carry a focus or
 * meditation bed without replacing the talk track. Files land later; until
 * then layers can still run as generated tones (binaural / pad) so the control
 * is real rather than a dead menu.
 *
 * Kept in content so the library and the player share one catalogue.
 */

export type MusicLayerKind = "focus" | "binaural" | "ambient" | "silence";

export interface MusicLayer {
  id: string;
  label: string;
  /** One line — what this layer is for. */
  blurb: string;
  kind: MusicLayerKind;
  /**
   * Optional file under `public/`. Null means generate locally (Web Audio) or
   * stay silent until a file lands — same honesty as video `src: null`.
   */
  src: string | null;
  /** Default mix under the talk track, 0–1. */
  defaultVolume: number;
  /**
   * For generated binaural / focus pads: carrier Hz and beat Hz (difference
   * between ears). Ignored when `src` is set.
   */
  tone?: { carrierHz: number; beatHz: number };
}

export const MUSIC_LAYERS: MusicLayer[] = [
  {
    id: "off",
    label: "No music",
    blurb: "Talk track only — the default.",
    kind: "silence",
    src: null,
    defaultVolume: 0,
  },
  {
    id: "focus-pad",
    label: "Focus pad",
    blurb: "Soft low pad under walkthroughs — keeps hands busy, ears calm.",
    kind: "focus",
    src: null,
    defaultVolume: 0.22,
    tone: { carrierHz: 110, beatHz: 8 },
  },
  {
    id: "binaural-calm",
    label: "Binaural · calm",
    blurb: "Meditation bed — headphones recommended. Teach the layer, then move it.",
    kind: "binaural",
    src: null,
    defaultVolume: 0.18,
    tone: { carrierHz: 200, beatHz: 6 },
  },
  {
    id: "binaural-focus",
    label: "Binaural · focus",
    blurb: "Slightly brighter beat for deep-work recordings.",
    kind: "binaural",
    src: null,
    defaultVolume: 0.18,
    tone: { carrierHz: 220, beatHz: 14 },
  },
  {
    id: "ambient-field",
    label: "Ambient field",
    blurb: "Quiet room tone — for when the recording itself is sparse.",
    kind: "ambient",
    src: null,
    defaultVolume: 0.15,
    tone: { carrierHz: 85, beatHz: 2 },
  },
];

export function getMusicLayer(id: string): MusicLayer {
  return MUSIC_LAYERS.find((l) => l.id === id) ?? MUSIC_LAYERS[0];
}
