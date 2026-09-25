/**
 * scanWaves.ts — data-driven wave animation definitions for MapScanOverlay.
 *
 * Each WaveDef fully describes one scan animation:
 *   - kfName    : unique CSS @keyframes name (emotion inlines these per-element)
 *   - barWidth  : px width of each animated bar
 *   - cycleDur  : total CSS animation duration (active sweep + silent pause)
 *   - bars      : per-bar specs — each bar shares the same keyframes but
 *                 starts at a different delayMs offset, producing multi-wave
 *                 effects while remaining forward-only (translateX never decreases)
 *   - gradient  : color → CSS background gradient string
 *   - boxShadow : (optional) color → CSS box-shadow string
 *   - keyframes : object placed verbatim under `"@keyframes kfName"` in MUI sx
 *
 * Speed philosophy:
 *   All waves accelerate (slow → fast) and never reverse.
 *   "Hold" phases use identical transform values in consecutive keyframe stops.
 *   The bar fades to opacity: 0 before the final translateX is reached, so
 *   the 2 000 px exit value is only a safe upper bound — the actual visual
 *   exit is opacity-driven, working on any map width.
 *
 * Weight distribution (WideGlide = 50%, others share the remaining 50%):
 *   surge: 1  burstHover: 1  stutter: 1  wideGlide: 4  rapidTriple: 1  (total 8)
 */

export type WaveId =
  | "surge"
  | "burstHover"
  | "stutter"
  | "wideGlide"
  | "rapidTriple";

export const WAVE_WEIGHTS: Record<WaveId, number> = {
  surge:        1,
  burstHover:   1,
  stutter:      1,
  wideGlide:    4,  // 4/8 = 50 %
  rapidTriple:  1,
};

export const WAVE_IDS = Object.keys(WAVE_WEIGHTS) as WaveId[];

/** Pick a wave at random, honouring the weight table. */
export function pickWeightedWave(): WaveId {
  const total = WAVE_IDS.reduce((s, id) => s + WAVE_WEIGHTS[id], 0);
  let r = Math.random() * total;
  for (const id of WAVE_IDS) {
    r -= WAVE_WEIGHTS[id];
    if (r <= 0) return id;
  }
  return "wideGlide";
}

export interface WaveBarSpec {
  /** Milliseconds to delay the start of this bar's animation. */
  delayMs: number;
}

export interface WaveDef {
  readonly kfName:    string;
  readonly barWidth:  number;
  readonly cycleDur:  string;
  readonly bars:      readonly WaveBarSpec[];
  readonly gradient:  (color: string) => string;
  readonly boxShadow?: (color: string) => string;
  /** Keyframe stops placed verbatim under `"@keyframes kfName"` in MUI sx. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly keyframes: Record<string, any>;
}

// ── Shared gradient recipes ────────────────────────────────────────────────

/** Standard 90 px comet: transparent tail → bright leading right edge. */
const stdGradient = (c: string) =>
  `linear-gradient(90deg, transparent 0%, ${c}08 20%, ${c}44 60%, ${c}ee 100%)`;

/** Wide 160 px version: gentler leading-edge ramp, soft glow. */
const wideGradient = (c: string) =>
  `linear-gradient(90deg, transparent 0%, ${c}06 15%, ${c}20 45%, ${c}70 75%, ${c}ee 100%)`;

// ── Wave definitions ───────────────────────────────────────────────────────

export const WAVE_DEFS: Record<WaveId, WaveDef> = {
  /**
   * W1 — Surge
   * Smooth 3-phase ramp: slow creep → medium → sprint off right.
   * Two bars 220 ms apart for a subtle double-wave feel.
   * 5.5 s cycle (≈ 2.3 s active + 3.2 s silence).
   *
   * Visible-phase speeds (900 px reference map):
   *   slow  :  -90 px → 135 px  over 0.83 s  → ~270 px/s
   *   medium: 135 px → 450 px  over 0.99 s  → ~318 px/s
   *   sprint: 450 px → 2000 px over 0.77 s  → ~2014 px/s (fade covers exit)
   */
  surge: {
    kfName:   "mapScan_surge",
    barWidth: 90,
    cycleDur: "5.5s",
    bars:     [{ delayMs: 0 }, { delayMs: 220 }],
    gradient: stdGradient,
    keyframes: {
      "0%":   { transform: "translateX(-90px)",   opacity: 0    },
      "4%":   {                                   opacity: 0.9  },
      "15%":  { transform: "translateX(135px)"                  },
      "33%":  { transform: "translateX(450px)"                  },
      "47%":  { transform: "translateX(2000px)",  opacity: 0    },
      "100%": { transform: "translateX(2000px)",  opacity: 0    },
    },
  },

  /**
   * W2 — Burst · Hover · Sprint
   * Rockets onto screen → almost-stalls mid-map (search lock feel) →
   * hard sprint off right. Single bar, 5.5 s cycle.
   *
   *   burst : -90 px → 315 px  over 0.66 s  → ~613 px/s
   *   hover : 315 px → 333 px  over 1.10 s  →  ~16 px/s  (drift / lock)
   *   sprint: 333 px → 2000 px over 0.66 s  → ~2525 px/s (fade covers exit)
   */
  burstHover: {
    kfName:   "mapScan_burstHover",
    barWidth: 90,
    cycleDur: "5.5s",
    bars:     [{ delayMs: 0 }],
    gradient: stdGradient,
    keyframes: {
      "0%":   { transform: "translateX(-90px)",   opacity: 0    },
      "2%":   {                                   opacity: 0.88 },
      "12%":  { transform: "translateX(315px)"                  },  // burst
      "32%":  { transform: "translateX(333px)"                  },  // hover
      "44%":  { transform: "translateX(2000px)",  opacity: 0    },  // sprint
      "100%": { transform: "translateX(2000px)",  opacity: 0    },
    },
  },

  /**
   * W3 — Stutter Advance
   * Three forward bursts with hard stops between each.
   * Hold phases: identical transform values in consecutive keyframe stops →
   * animation pauses; translateX NEVER decreases.
   * Single bar, 5.5 s cycle.
   *
   *   burst 1: -90 px → 180 px  over 0.50 s  → ~540 px/s
   *   hold  1: 180 px → 180 px  over 0.38 s  (frozen)
   *   burst 2: 180 px → 495 px  over 0.38 s  → ~829 px/s
   *   hold  2: 495 px → 495 px  over 0.28 s  (frozen)
   *   sprint : 495 px → 2000 px over 0.50 s  → ~3010 px/s (fade covers exit)
   */
  stutter: {
    kfName:   "mapScan_stutter",
    barWidth: 90,
    cycleDur: "5.5s",
    bars:     [{ delayMs: 0 }],
    gradient: stdGradient,
    keyframes: {
      "0%":   { transform: "translateX(-90px)",   opacity: 0    },
      "2%":   {                                   opacity: 0.85 },
      "9%":   { transform: "translateX(180px)"                  },  // burst 1
      "16%":  { transform: "translateX(180px)"                  },  // hold  1
      "23%":  { transform: "translateX(495px)"                  },  // burst 2
      "28%":  { transform: "translateX(495px)"                  },  // hold  2
      "37%":  { transform: "translateX(2000px)",  opacity: 0    },  // sprint
      "100%": { transform: "translateX(2000px)",  opacity: 0    },
    },
  },

  /**
   * W4 — Wide Glide  (plays 50 % of the time)
   * 160 px bar creeps onto screen very slowly, then accelerates hard.
   * Long 6.5 s cycle — rare and impactful. Single bar, soft box-shadow glow.
   *
   *   very slow: -160 px → -40 px  over 1.30 s  →  ~92 px/s
   *   medium   :  -40 px → 350 px  over 1.17 s  → ~333 px/s
   *   fast exit: 350 px → 2000 px over 0.98 s  → ~1684 px/s (fade covers exit)
   */
  wideGlide: {
    kfName:   "mapScan_wideGlide",
    barWidth: 160,
    cycleDur: "6.5s",
    bars:     [{ delayMs: 0 }],
    gradient: wideGradient,
    boxShadow: (c) => `4px 0 24px 4px ${c}28`,
    keyframes: {
      "0%":   { transform: "translateX(-160px)",  opacity: 0    },
      "3%":   {                                   opacity: 0.80 },
      "20%":  { transform: "translateX(-40px)"                  },  // very slow
      "38%":  { transform: "translateX(350px)"                  },  // medium
      "53%":  { transform: "translateX(2000px)",  opacity: 0    },  // fast exit
      "100%": { transform: "translateX(2000px)",  opacity: 0    },
    },
  },

  /**
   * W5 — Rapid Triple
   * Three tight waves (170 ms apart), each accelerating, followed by
   * a long ~5 s silence. 6.5 s cycle.
   *
   *   slow  : -90 px → -20 px  over 0.46 s  → ~152 px/s
   *   medium: -20 px → 220 px  over 0.52 s  → ~462 px/s
   *   sprint: 220 px → 2000 px over 0.52 s  → ~3423 px/s (fade covers exit)
   */
  rapidTriple: {
    kfName:   "mapScan_rapidTriple",
    barWidth: 90,
    cycleDur: "6.5s",
    bars:     [{ delayMs: 0 }, { delayMs: 170 }, { delayMs: 340 }],
    gradient: stdGradient,
    keyframes: {
      "0%":   { transform: "translateX(-90px)",   opacity: 0    },
      "2%":   {                                   opacity: 0.85 },
      "7%":   { transform: "translateX(-20px)"                  },  // slow
      "15%":  { transform: "translateX(220px)"                  },  // medium
      "23%":  { transform: "translateX(2000px)",  opacity: 0    },  // sprint
      "100%": { transform: "translateX(2000px)",  opacity: 0    },
    },
  },
};

/** Shared vertical fade mask — all waves use this on the bar element. */
export const WAVE_V_MASK =
  "linear-gradient(180deg, transparent 0%, #fff 12%, #fff 88%, transparent 100%)";
