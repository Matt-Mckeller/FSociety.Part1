/**
 * Character — Routine model.
 *
 * Recurring practices treated as lightweight tasks with a time slot, frequency,
 * and streak. Seeded for expanse_eye (Matthew): work, computer, content creation,
 * teaching, and the supporting body / mind load that keeps shipping possible.
 *
 * The UI surfaces this as "Routine" — habits are the library items; the equipped
 * set is today's routine.
 */

export type HabitFrequency = "daily" | "weekly" | "multiple-daily" | "monthly";
export type HabitTimeSlot = "morning" | "midday" | "afternoon" | "evening" | "night" | "anytime";
export type HabitCategory =
  | "work"
  | "mindfulness"
  | "physical"
  | "nutrition"
  | "learning"
  | "social"
  | "creative"
  | "rest"
  | "productivity"
  | "vice"; // Intentionally included — honest tracking

export interface HabitSchedule {
  frequency: HabitFrequency;
  /** Which slots this habit is suggested for. */
  timeSlots: HabitTimeSlot[];
  /** Duration in minutes (approximate). */
  durationMin?: number;
}

export interface HabitMeta {
  id: string;
  label: string;
  description: string;
  category: HabitCategory;
  schedule: HabitSchedule;
  /** Attribute this habit primarily builds. */
  primaryAttribute?: string;
  /** Color accent. */
  color: string;
  /** Emoji fallback (glyphs are preferred in UI). */
  emoji: string;
  /** Whether the habit is currently equipped / active for this character. */
  equipped: boolean;
  /** Current streak in days/weeks. */
  streak?: number;
  /** Total completions. */
  completions?: number;
  /** 0–1 progress toward today's target. */
  todayProgress?: number;
}

/**
 * expanse_eye default routine + library.
 * Equipped items are what Matthew actually runs; unequipped stay available to add.
 */
export const HABITS: HabitMeta[] = [
  /* ── Core work load (equipped) ─────────────────────────────────────── */
  {
    id: "morning-planning",
    label: "Morning Planning",
    description: "Set the one thing that must ship today. Rank the rest.",
    category: "productivity",
    schedule: { frequency: "daily", timeSlots: ["morning"], durationMin: 10 },
    primaryAttribute: "discipline",
    color: "#1e293b",
    emoji: "🎯",
    equipped: true,
    streak: 14,
    completions: 95,
    todayProgress: 1,
  },
  {
    id: "deep-work",
    label: "Deep Work",
    description: "Protected focus blocks on yen / 4eye / Expanse — no chat, no scroll.",
    category: "work",
    schedule: { frequency: "daily", timeSlots: ["morning", "afternoon"], durationMin: 120 },
    primaryAttribute: "focus",
    color: "#0f766e",
    emoji: "⚡",
    equipped: true,
    streak: 11,
    completions: 74,
    todayProgress: 0.5,
  },
  {
    id: "computer",
    label: "Computer / Build",
    description: "Code, systems, spatial UX, and the product surface itself.",
    category: "work",
    schedule: { frequency: "daily", timeSlots: ["midday", "afternoon", "evening"], durationMin: 180 },
    primaryAttribute: "intelligence",
    color: "#2563eb",
    emoji: "💻",
    equipped: true,
    streak: 18,
    completions: 210,
    todayProgress: 0.4,
  },
  {
    id: "content-creation",
    label: "Content Creation",
    description: "Recordings, walkthroughs, Storybooks, media — teach what was built.",
    category: "creative",
    schedule: { frequency: "daily", timeSlots: ["afternoon", "evening"], durationMin: 60 },
    primaryAttribute: "creativity",
    color: "#ea580c",
    emoji: "🎬",
    equipped: true,
    streak: 6,
    completions: 38,
    todayProgress: 0,
  },
  {
    id: "teach-ship",
    label: "Teach & Ship",
    description: "Release something visible — a polish pass, a recording, a doc, a demo.",
    category: "work",
    schedule: { frequency: "daily", timeSlots: ["afternoon", "evening"], durationMin: 45 },
    primaryAttribute: "discipline",
    color: "#b45309",
    emoji: "🚀",
    equipped: true,
    streak: 8,
    completions: 52,
    todayProgress: 0,
  },
  {
    id: "money-recovery",
    label: "Financial Recovery",
    description: "Tokens, offers, outreach, and the money work that funds the vision.",
    category: "work",
    schedule: { frequency: "daily", timeSlots: ["midday", "anytime"], durationMin: 40 },
    primaryAttribute: "willpower",
    color: "#ca8a04",
    emoji: "🪙",
    equipped: true,
    streak: 4,
    completions: 28,
    todayProgress: 0,
  },

  /* ── Relationship & mind ───────────────────────────────────────────── */
  {
    id: "keep-in-touch",
    label: "Keep in Touch",
    description: "Reach people who matter — Love, family, collaborators. Tend the bond.",
    category: "social",
    schedule: { frequency: "daily", timeSlots: ["anytime"], durationMin: 20 },
    primaryAttribute: "charisma",
    color: "#e11d48",
    emoji: "💬",
    equipped: true,
    streak: 5,
    completions: 40,
    todayProgress: 0,
  },
  {
    id: "journaling",
    label: "Journaling",
    description: "Process the day. Capture insights. Observe patterns.",
    category: "mindfulness",
    schedule: { frequency: "daily", timeSlots: ["evening", "night"], durationMin: 15 },
    primaryAttribute: "wisdom",
    color: "#7c3aed",
    emoji: "📝",
    equipped: true,
    streak: 9,
    completions: 65,
    todayProgress: 0,
  },
  {
    id: "deep-reading",
    label: "Research",
    description: "Source study — docs, papers, systems. Feed the build, not a reading streak.",
    category: "learning",
    schedule: { frequency: "daily", timeSlots: ["morning", "evening"], durationMin: 30 },
    primaryAttribute: "intelligence",
    color: "#d97706",
    emoji: "🔎",
    equipped: true,
    streak: 21,
    completions: 180,
    todayProgress: 1,
  },
  {
    id: "mindfulness",
    label: "Mindfulness",
    description: "Check in with the present moment. Notice thoughts without reacting.",
    category: "mindfulness",
    schedule: { frequency: "multiple-daily", timeSlots: ["morning", "afternoon", "evening"], durationMin: 10 },
    primaryAttribute: "empathy",
    color: "#0891b2",
    emoji: "🌊",
    equipped: true,
    streak: 14,
    completions: 200,
    todayProgress: 0.67,
  },

  /* ── Body load ─────────────────────────────────────────────────────── */
  {
    id: "exercise",
    label: "Exercise",
    description: "Move the body to build the mind. Strength, endurance, vitality.",
    category: "physical",
    schedule: { frequency: "daily", timeSlots: ["morning"], durationMin: 45 },
    primaryAttribute: "endurance",
    color: "#16a34a",
    emoji: "🏋️",
    equipped: true,
    streak: 7,
    completions: 45,
    todayProgress: 0,
  },
  {
    id: "healthy-eating",
    label: "Healthy Eating",
    description: "Fuel the system with food that performs. Protein, plants, water.",
    category: "nutrition",
    schedule: { frequency: "multiple-daily", timeSlots: ["morning", "midday", "evening"], durationMin: 30 },
    primaryAttribute: "endurance",
    color: "#15803d",
    emoji: "🥗",
    equipped: true,
    streak: 5,
    completions: 120,
    todayProgress: 0.33,
  },
  {
    id: "sleep-hygiene",
    label: "Sleep Hygiene",
    description: "Consistent sleep and wake times. Protect recovery so tomorrow ships.",
    category: "rest",
    schedule: { frequency: "daily", timeSlots: ["night"], durationMin: 480 },
    primaryAttribute: "endurance",
    color: "#6366f1",
    emoji: "😴",
    equipped: true,
    streak: 5,
    completions: 50,
    todayProgress: 0,
  },

  /* ── Library (unequipped) ──────────────────────────────────────────── */
  {
    id: "meditation",
    label: "Meditation",
    description: "Sit in stillness. Observe the mind without judgment. Return to center.",
    category: "mindfulness",
    schedule: { frequency: "daily", timeSlots: ["morning", "evening"], durationMin: 20 },
    primaryAttribute: "focus",
    color: "#4F46E5",
    emoji: "🧘",
    equipped: false,
    streak: 0,
    completions: 88,
    todayProgress: 0,
  },
  {
    id: "cold-shower",
    label: "Cold Shower",
    description: "Discomfort as a training tool. Build willpower through deliberate hardship.",
    category: "physical",
    schedule: { frequency: "daily", timeSlots: ["morning"], durationMin: 5 },
    primaryAttribute: "willpower",
    color: "#0EA5E9",
    emoji: "🧊",
    equipped: false,
    streak: 0,
    completions: 12,
    todayProgress: 0,
  },
  {
    id: "creative-practice",
    label: "Creative Practice",
    description: "Make something that is not product — draw, write, design for its own sake.",
    category: "creative",
    schedule: { frequency: "weekly", timeSlots: ["evening"], durationMin: 45 },
    primaryAttribute: "creativity",
    color: "#f97316",
    emoji: "🎨",
    equipped: false,
    streak: 2,
    completions: 30,
    todayProgress: 0,
  },
  {
    id: "smoking-weed",
    label: "Trees",
    description: "Quiet evening canopy — stillness with the buddha frame. Kept soft; not a billboard.",
    category: "vice",
    schedule: { frequency: "daily", timeSlots: ["evening", "night"], durationMin: 30 },
    color: "#3f6212",
    emoji: "🌲",
    equipped: true,
    streak: 3,
    completions: 40,
    todayProgress: 0,
  },
];

/**
 * Habit symbol groups — related practices share one cluster so the routine
 * reads as a few marks rather than a long checklist. Expand a group to act on
 * individual habits.
 */
export interface HabitGroup {
  id: string;
  label: string;
  hint: string;
  color: string;
  /** Habit ids in display order inside the cluster. */
  habitIds: string[];
}

export const HABIT_GROUPS: HabitGroup[] = [
  {
    id: "grp-ship",
    label: "Ship",
    hint: "Plan · deep work · build · teach",
    color: "#0f766e",
    habitIds: ["morning-planning", "deep-work", "computer", "teach-ship", "content-creation"],
  },
  {
    id: "grp-fund",
    label: "Fund",
    hint: "Money work that keeps the vision alive",
    color: "#ca8a04",
    habitIds: ["money-recovery"],
  },
  {
    id: "grp-bond",
    label: "Bond",
    hint: "People who matter",
    color: "#e11d48",
    habitIds: ["keep-in-touch"],
  },
  {
    id: "grp-mind",
    label: "Mind",
    hint: "Journal · research · mindfulness",
    color: "#7c3aed",
    habitIds: ["journaling", "deep-reading", "mindfulness"],
  },
  {
    id: "grp-body",
    label: "Body",
    hint: "Move · fuel · sleep",
    color: "#16a34a",
    habitIds: ["exercise", "healthy-eating", "sleep-hygiene"],
  },
  {
    id: "grp-trees",
    label: "Trees & Buddha",
    hint: "Evening canopy + stillness — quiet marks, not a vice billboard",
    color: "#3f6212",
    habitIds: ["smoking-weed", "meditation"],
  },
  {
    id: "grp-spark",
    label: "Spark",
    hint: "Library extras",
    color: "#f97316",
    habitIds: ["creative-practice", "cold-shower"],
  },
];

export const CATEGORY_META: Record<HabitCategory, { label: string; color: string }> = {
  work:         { label: "Work",          color: "#0f766e" },
  mindfulness:  { label: "Mindfulness",   color: "#4F46E5" },
  physical:     { label: "Physical",      color: "#16a34a" },
  nutrition:    { label: "Nutrition",     color: "#15803d" },
  learning:     { label: "Learning",      color: "#d97706" },
  social:       { label: "Social",        color: "#f43f5e" },
  creative:     { label: "Creative",      color: "#f97316" },
  rest:         { label: "Rest",          color: "#6366f1" },
  productivity: { label: "Productivity",  color: "#1e293b" },
  vice:         { label: "Vice",          color: "#64748b" },
};

export const TIME_SLOT_LABEL: Record<HabitTimeSlot, string> = {
  morning:   "Morning",
  midday:    "Midday",
  afternoon: "Afternoon",
  evening:   "Evening",
  night:     "Night",
  anytime:   "Any Time",
};
