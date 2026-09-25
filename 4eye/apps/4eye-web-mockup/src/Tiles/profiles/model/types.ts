/**
 * Profiles tile — domain model.
 *
 * One Profile entity drives every sub-view (Users, Healing, Psychology,
 * Student, Teacher, Classroom, Professional, Parent). Profiles are modular and
 * optional: which slices surface depends on the active view and the privacy
 * level — we never expose everything at once.
 *
 * UI-first per the canonical plan
 * (Planning/roadmap/2026/plans/_current/plans/profiles-and-inventory/profiles-plan.md):
 * shells + example data only. No backend, auth, or AI prompt-injection logic.
 *
 * The aspect contract (`ProfileAspect`) is re-used from `@4eye/types/profile`
 * so a profile slice can opt aspects in/out of chat context.
 */

import type { ProfileAspect, SymbolColor } from "@4eye/types";
import type { RoleKey } from "@4eye/web/components/hud/mapContent/types";
import type { ValueThemeAlignment } from "./highest-value-data";

/** The nine switchable profile sub-views, all hosted in one tile. */
export type ProfileView =
  | "users"
  | "healing"
  | "psychology"
  | "communication"
  | "student"
  | "teacher"
  | "classroom"
  | "professional"
  | "parent";

export const PROFILE_VIEWS: ProfileView[] = [
  "users",
  "healing",
  "psychology",
  "communication",
  "student",
  "teacher",
  "classroom",
  "professional",
  "parent",
];

export interface ProfileViewMeta {
  id: ProfileView;
  label: string;
  description: string;
}

export const PROFILE_VIEW_META: Record<ProfileView, ProfileViewMeta> = {
  users: {
    id: "users",
    label: "Users",
    description: "General identity profile",
  },
  healing: {
    id: "healing",
    label: "Healing",
    description: "Wellness & recovery tracking",
  },
  psychology: {
    id: "psychology",
    label: "Psychology",
    description: "Mental-health profile — how you process, cope, and what helps",
  },
  communication: {
    id: "communication",
    label: "Communication",
    description: "How to reach & support this person",
  },
  student: {
    id: "student",
    label: "Student",
    description: "Learner profile",
  },
  teacher: {
    id: "teacher",
    label: "Teacher",
    description: "Educator profile",
  },
  classroom: {
    id: "classroom",
    label: "Classroom",
    description: "Institutional profile",
  },
  professional: {
    id: "professional",
    label: "Professional",
    description: "Work identity",
  },
  parent: {
    id: "parent",
    label: "Parent",
    description: "Guardian profile",
  },
};

/** How publicly visible a field is. Privacy is user-controlled per the plan. */
export type PrivacyLevel = "private" | "friends" | "public";

/** A labelled value with its own privacy control (e.g. an attribute or skill). */
export interface ProfileField {
  id: string;
  label: string;
  value: string;
  privacy?: PrivacyLevel;
}

/** A measurable stat with an optional unit and progress fraction (0..1). */
export interface ProfileStat {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  /** 0..1 progress for bar-style stats (XP, completion, attendance). */
  progress?: number;
}

/** A timestamped moment for history/mood/recovery timelines. */
export interface ProfileMoment {
  id: string;
  label: string;
  detail?: string;
  /** Epoch ms — numeric, consistent with the planning ECS model. */
  at: number;
}

/* ----------------------------------------------------- Per-view content */

export interface UsersViewData {
  whoAmI: string;
  attributes: ProfileField[];
  interests: string[];
  favoriteTopics: string[];
  personality: string[];
  /**
   * Standout media takes (videos, music, shows) — label = title, value = the take.
   * Optional so demo / sparse profiles can omit it.
   */
  mediaHighlights?: ProfileField[];
  /** Sample or real favorite songs — fill / swap freely. */
  favoriteSongs?: string[];
  /** Favorite entertainment (videos, shows, games, live sets, etc.). */
  favoriteEntertainment?: string[];
}

/**
 * Live body vitals — heart rate and related presence signals for the Body
 * dashboard. Mocked for the UI-first surface; later these can stream from a
 * wearable.
 */
export interface BodyVitals {
  /** Resting or current heart rate in bpm. */
  heartRate: number;
  /** Zone label (e.g. Rest · Fat burn · Cardio). */
  heartRateZone?: string;
  /** Blood oxygen 0–100. */
  spo2?: number;
  stepsToday?: number;
  activeMinutes?: number;
  /** Epoch ms of last vitals sample. */
  sampledAt?: number;
}

/**
 * Appearance / anthropometrics — seeded from portrait analysis for Matthew,
 * editable later. Used on the Body lens dashboard.
 */
export interface AppearanceProfile {
  weight?: string;
  height?: string;
  bodyType: string;
  hairType: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  skinTone: string;
  faceShape?: string;
  /** Colour reads from recent photos (shirt, shorts, palette). */
  colorDescriptions: ProfileField[];
  /** Apparel / body sizing estimates. */
  sizing: ProfileField[];
  /** Provenance — e.g. which portraits informed the seed. */
  source?: string;
}

/** Physical context for the Body lens — where the body is, not Brain perspectives. */
export interface BodyEnvironment {
  place: string;
  setting: string;
  lighting?: string;
  ambient?: ProfileField[];
  notes?: string;
}

/**
 * Game / place coordinates for the Human IP surface — display location, not
 * raw GPS tracking. Optional lat/lng for map hooks later.
 */
export interface ProfileCoordinates {
  /** Human-readable place (e.g. "Austin · TX"). */
  label: string;
  latitude?: number;
  longitude?: number;
  /** Optional place id shared with command-center / domains. */
  placeId?: string;
  timezone?: string;
  /** Short coded readout shown beside Human IP (e.g. "30.27N · 97.74W"). */
  coded?: string;
}

export interface HealingViewData {
  motivation: string;
  tactics: ProfileField[];
  /** Mood readings over time (progress = 0..1 normalised wellbeing). */
  mood: ProfileMoment[];
  stats: ProfileStat[];
  /** Live vitals strip (heart rate, steps, …). */
  vitals?: BodyVitals;
  /** Physical appearance from portraits / self-report. */
  appearance?: AppearanceProfile;
  /** Where the body is right now. */
  environment?: BodyEnvironment;
}

/** A single intensity reading (anxiety, focus, etc.) for psychology / comms. */
export type FactorLevel = "low" | "medium" | "high";

export interface MentalStateFactor {
  id: string;
  factor: string;
  level: FactorLevel;
  description: string;
}

/**
 * Psychology — first-person mental-health profile.
 *
 * Shares the Communication Planner shape (mental state, cognitive style,
 * preferences, defenses) but owned here as *self* knowledge. Communication
 * projects the same clusters in second person and keeps goals / strategy.
 * Thin seeds may omit the planner fields and only fill perspectives / coping /
 * stories.
 */
export interface PsychologyViewData {
  /** Short first-person summary of the mental landscape. */
  summary?: string;
  perspectives: ProfileField[];
  copingTactics: ProfileField[];
  stories: ProfileMoment[];
  mentalState?: MentalStateFactor[];
  cognitiveStrengths?: string[];
  processingStyle?: string;
  memoryStyle?: string;
  respondsWellTo?: string[];
  strugglesWith?: string[];
  optimalFormat?: string[];
  defensePatterns?: string[];
}

/**
 * Communication view — a support-oriented "how to reach this person" lens,
 * mirroring the Communication Planner's recipient profile (mental state,
 * cognitive style, preferences, defenses, observations, strategy).
 */
export interface CommunicationViewData {
  summary: string;
  goals: ProfileField[];
  mentalState: MentalStateFactor[];
  cognitiveStrengths: string[];
  processingStyle: string;
  memoryStyle: string;
  respondsWellTo: string[];
  strugglesWith: string[];
  optimalFormat: string[];
  defensePatterns: string[];
  observations: ProfileField[];
  strategy: ProfileField[];
}

export interface StudentViewData {
  readingLevel: string;
  language: string;
  stats: ProfileStat[];
  enrolledClasses: ProfileField[];
  assignments: ProfileField[];
}

export interface TeacherViewData {
  classesTaught: ProfileField[];
  rewardsIssued: ProfileStat[];
  differentiationNeeds: string[];
}

export interface ClassroomViewData {
  schoolName: string;
  highlights: ProfileField[];
  stats: ProfileStat[];
}

/**
 * Professional skill level — qualitative scale mapped from mastery signals
 * (KB weight / profile “High” / craft-lens weights). Prefer this over prose.
 */
export type SkillLevel = "expert" | "advanced" | "proficient" | "working";

export const SKILL_LEVEL_LABEL: Record<SkillLevel, string> = {
  expert: "Expert",
  advanced: "Advanced",
  proficient: "Proficient",
  working: "Working",
};

/** One skill under a ranked category — label + level only (no description). */
export interface RankedSkill {
  id: string;
  label: string;
  level: SkillLevel;
  /** Lower = higher emphasis within the category. */
  rank?: number;
  privacy?: PrivacyLevel;
}

/**
 * Large skill area (Architecture, Design, UX, …) with an overall level and
 * a short ranked skill list. This is the primary Professional facet content.
 */
export interface SkillCategory {
  id: string;
  label: string;
  level: SkillLevel;
  /** Lower = higher emphasis on the page. */
  rank: number;
  skills: RankedSkill[];
  privacy?: PrivacyLevel;
}

/** Compact work line — title · org · dates. No bullet descriptions in v1. */
export interface WorkEntry {
  id: string;
  title: string;
  org: string;
  /** Year or "YYYY-MM"; omit when unknown. */
  start?: string;
  /** Year, "YYYY-MM", or "Present". */
  end?: string;
  privacy?: PrivacyLevel;
}

export interface ProfessionalViewData {
  role: string;
  /** Optional / demoted — skills + experience carry the page. */
  summary?: string;
  /**
   * Legacy flat skill rows. Prefer `categories` when present; still used by
   * thin profiles and as a chat-aspect projection of top categories.
   */
  skills: ProfileField[];
  /** Ranked skill areas — primary Professional content when authored. */
  categories?: SkillCategory[];
  /** Compact experience timeline (no job blurbs). */
  experience?: WorkEntry[];
  currentGoal?: string;
}

export interface ParentViewData {
  linkedStudents: ProfileField[];
  approvals: ProfileField[];
  involvement: string;
}

/** Optional per-view payloads. A profile only fills the views it uses. */
export interface ProfileViewData {
  users?: UsersViewData;
  healing?: HealingViewData;
  psychology?: PsychologyViewData;
  communication?: CommunicationViewData;
  student?: StudentViewData;
  teacher?: TeacherViewData;
  classroom?: ClassroomViewData;
  professional?: ProfessionalViewData;
  parent?: ParentViewData;
}

/* --------------------------------------------------------------- Profile */

/**
 * Crew ring on the Command Center board.
 *   t1 — inner / operational (daily assignable seats)
 *   t2 — outer orbit (public figures, aspirational, clarify-later)
 * Omitted defaults to t1 so existing personal seats stay inner.
 */
export type CrewTier = "t1" | "t2";

export interface Profile {
  id: string;
  /** Display username (we prefer usernames over real names per the plan). */
  username: string;
  /** Optional real name — gated behind a display toggle. */
  realName?: string;
  /** Optional avatar image URL; views fall back to an initial badge. */
  avatarUrl?: string;
  /** Brand symbol color used for the avatar accent when no image is set. */
  accent?: SymbolColor;
  /** Command Center crew ring. Defaults to t1 when omitted. */
  crewTier?: CrewTier;
  /** Finite rank, or `Infinity` — shown as ∞. */
  level: number;
  /** Earned titles/badges shown beside the name. */
  titles: string[];
  /** Which aspects this profile opts into chat context (from @4eye/types). */
  includedAspects: ProfileAspect[];
  /**
   * Highest-value data: this individual's weighted alignment to the brand's
   * core value themes (Evolve / Innovate / Win / Heal / Protect), each with
   * their own highest-value words. Optional — only surfaces when present.
   */
  highestValueData?: ValueThemeAlignment[];
  /** Canonical audience roles this profile carries (e.g. student, teacher). */
  roles?: RoleKey[];
  /** The role-specific goal currently active for this profile. */
  activeRoleGoal?: string;
  /** Place / coordinates for the identity band (Human IP adjacent). */
  coordinates?: ProfileCoordinates;
  /** Per-view content. */
  data: ProfileViewData;
}

export interface ProfilesData {
  profiles: Profile[];
  /** Id of the profile shown by default. */
  activeProfileId: string;
}
