
/**
 * Character — Mood model.
 *
 * Mood is modeled as a two-axis emotional space:
 *   X: Valence (Negative ↔ Positive)
 *   Y: Arousal (Low ↔ High)
 *
 * Key emotion pairs (positive / negative):
 *   Euphoric / Despairing    (high arousal)
 *   Hopeful / Fearful
 *   Joyful / Angry
 *   Content / Frustrated     (medium arousal)
 *   Grateful / Guilty
 *   Serene / Melancholy      (low arousal)
 *   Peaceful / Numb
 *
 * Additional metrics:
 *   - Intensity: 0–100 (how strongly emotions are experienced)
 *   - Mastery: 0–100 (emotional control and regulation capability)
 *
 * Design note: the positive domain is intentionally larger. The deepest levels
 * of positive emotion are rare and largely undiscovered by most people —
 * this is reflected in the higher theoretical ceiling for positives.
 */

export interface EmotionMeta {
  id: string;
  label: string;
  /** Short description of what this emotion feels like. */
  description: string;
  /** Positive or negative valence. */
  valence: "positive" | "negative";
  /** Arousal level 0 (low/calm) to 100 (high/activated). */
  arousal: number;
  /** Hex color. */
  color: string;
  /** Paired opposite emotion id. */
  pairedWith?: string;
  /** Whether this is an elevated / rarely discovered state. */
  elevated?: boolean;
}

export const EMOTIONS: EmotionMeta[] = [
  // ── Positive (valence > 0) ────────────────────────────────────────────────
  {
    id: "euphoric",
    label: "Euphoric",
    description: "Overwhelming joy and aliveness — everything feels electric.",
    valence: "positive",
    arousal: 95,
    color: "#f59e0b",
    pairedWith: "despairing",
    elevated: true,
  },
  {
    id: "ecstatic",
    label: "Ecstatic",
    description: "Peak experience. Transcendence of ordinary sensation.",
    valence: "positive",
    arousal: 100,
    color: "#d97706",
    elevated: true,
  },
  {
    id: "blissful",
    label: "Blissful",
    description: "A deep, radiating contentment that touches everything.",
    valence: "positive",
    arousal: 75,
    color: "#f97316",
    elevated: true,
  },
  {
    id: "hopeful",
    label: "Hopeful",
    description: "Tomorrow looks bright. Energy moves toward the possible.",
    valence: "positive",
    arousal: 70,
    color: "#0EA5E9",
    pairedWith: "fearful",
  },
  {
    id: "joyful",
    label: "Joyful",
    description: "Light, open, fully alive — the world is good.",
    valence: "positive",
    arousal: 80,
    color: "#16a34a",
    pairedWith: "angry",
  },
  {
    id: "happy",
    label: "Happy",
    description: "A warm baseline of wellbeing. Things are good.",
    valence: "positive",
    arousal: 60,
    color: "#22c55e",
    pairedWith: "sad",
  },
  {
    id: "content",
    label: "Content",
    description: "Settled satisfaction — nothing is missing in this moment.",
    valence: "positive",
    arousal: 40,
    color: "#10b981",
    pairedWith: "frustrated",
  },
  {
    id: "grateful",
    label: "Grateful",
    description: "Recognition that what you have is enough — and more.",
    valence: "positive",
    arousal: 50,
    color: "#06b6d4",
    pairedWith: "guilty",
  },
  {
    id: "serene",
    label: "Serene",
    description: "Quiet, undisturbed presence. The noise has stopped.",
    valence: "positive",
    arousal: 20,
    color: "#4F46E5",
    pairedWith: "melancholy",
  },
  {
    id: "peaceful",
    label: "Peaceful",
    description: "Complete inner stillness. No resistance.",
    valence: "positive",
    arousal: 10,
    color: "#6366f1",
    pairedWith: "numb",
  },
  {
    id: "calm",
    label: "Calm",
    description: "Low noise, full capacity. The state most work gets done from.",
    valence: "positive",
    arousal: 30,
    color: "#14b8a6",
    pairedWith: "anxious",
  },
  {
    id: "inspired",
    label: "Inspired",
    description: "A vision has landed. The path forward is clear.",
    valence: "positive",
    arousal: 85,
    color: "#7c3aed",
  },
  {
    id: "excited",
    label: "Excited",
    description: "High energy toward something — aliveness before the plan settles.",
    valence: "positive",
    arousal: 92,
    color: "#f59e0b",
    pairedWith: "anxious",
  },
  {
    id: "motivated",
    label: "Motivated",
    description: "Directed drive. The goal is clear and the body wants to move on it.",
    valence: "positive",
    arousal: 78,
    color: "#3b82f6",
    pairedWith: "frustrated",
  },
  {
    id: "flow",
    label: "In Flow",
    description: "The ideal state: challenge and skill perfectly matched.",
    valence: "positive",
    arousal: 65,
    color: "#8b5cf6",
    elevated: true,
  },
  // ── Negative (valence < 0) ────────────────────────────────────────────────
  {
    id: "despairing",
    label: "Despairing",
    description: "The feeling that nothing will improve. Hope has left the building.",
    valence: "negative",
    arousal: 30,
    color: "#7f1d1d",
    pairedWith: "euphoric",
  },
  {
    id: "fearful",
    label: "Fearful",
    description: "Threat perceived. The body prepares for danger.",
    valence: "negative",
    arousal: 85,
    color: "#dc2626",
    pairedWith: "hopeful",
  },
  {
    id: "angry",
    label: "Angry",
    description: "Boundary violated. Energy spikes toward confrontation.",
    valence: "negative",
    arousal: 90,
    color: "#ef4444",
    pairedWith: "joyful",
  },
  {
    id: "sad",
    label: "Sad",
    description: "Loss registered. Processing and grieving.",
    valence: "negative",
    arousal: 25,
    color: "#6366f1",
    pairedWith: "happy",
  },
  {
    id: "frustrated",
    label: "Frustrated",
    description: "Progress blocked. Effort without result.",
    valence: "negative",
    arousal: 65,
    color: "#f97316",
    pairedWith: "motivated",
  },
  {
    id: "guilty",
    label: "Guilty",
    description: "Awareness of having fallen short of one's own values.",
    valence: "negative",
    arousal: 40,
    color: "#a16207",
    pairedWith: "grateful",
  },
  {
    id: "melancholy",
    label: "Melancholy",
    description: "A quiet, bittersweet sadness — deep but not destructive.",
    valence: "negative",
    arousal: 20,
    color: "#4f46e5",
    pairedWith: "serene",
  },
  {
    id: "numb",
    label: "Numb",
    description: "Disconnected from feeling. Neither suffering nor joy.",
    valence: "negative",
    arousal: 5,
    color: "#64748b",
    pairedWith: "peaceful",
  },
  {
    id: "anxious",
    label: "Anxious",
    description: "Uncertainty felt as threat. Mind races ahead to worst cases.",
    valence: "negative",
    arousal: 80,
    color: "#f59e0b",
    pairedWith: "excited",
  },
];

export interface MoodSnapshot {
  primaryEmotion: string;
  /** 0–100. */
  intensity: number;
  /** 0–100. How much mastery/control over emotions. */
  mastery: number;
  /** Unix ms. */
  recordedAt: number;
}

export const MOOD_SNAPSHOT_SEED: MoodSnapshot = {
  primaryEmotion: "motivated",
  intensity: 96,
  mastery: 94,
  recordedAt: Date.now(),
};
