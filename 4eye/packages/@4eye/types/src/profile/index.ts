/**
 * Profile types (stub).
 *
 * Profile context controls which aspects of a user's profile are
 * injected into chat prompts. Implementation lands later — this is
 * the contract so chat input context can already include a `profile`
 * slice in its payload.
 */

export type ProfileAspectGroup = "standing" | "equipped" | "heading" | "orbit" | "person";

export type ProfileAspect =
  | "characteristics"
  | "attributes"
  | "traits"
  | "skills"
  | "equipment"
  | "perks"
  | "auras"
  | "spells"
  | "pipelines"
  | "currentRole"
  | "currentGoal"
  | "direction"
  | "status"
  | "otherPeopleGoals"
  | "relationshipGoals"
  | "parentGoals"
  | "compass"
  | "planning"
  | "relationships"
  | "history"
  | "preferences"
  | "learning";

export const PROFILE_ASPECTS: ProfileAspect[] = [
  "characteristics",
  "attributes",
  "traits",
  "skills",
  "equipment",
  "perks",
  "auras",
  "spells",
  "pipelines",
  "currentRole",
  "currentGoal",
  "direction",
  "status",
  "otherPeopleGoals",
  "relationshipGoals",
  "parentGoals",
  "compass",
  "planning",
  "relationships",
  "history",
  "preferences",
  "learning",
];

export const PROFILE_ASPECT_GROUPS: ProfileAspectGroup[] = [
  "standing",
  "equipped",
  "heading",
  "orbit",
  "person",
];

export interface ProfileAspectGroupMeta {
  id: ProfileAspectGroup;
  label: string;
  hint: string;
}

export const PROFILE_ASPECT_GROUP_META: Record<ProfileAspectGroup, ProfileAspectGroupMeta> = {
  standing: {
    id: "standing",
    label: "Standing",
    hint: "Who you are on paper",
  },
  equipped: {
    id: "equipped",
    label: "Equipped",
    hint: "What you carry into the reply",
  },
  heading: {
    id: "heading",
    label: "Heading",
    hint: "Where you are pointed right now",
  },
  orbit: {
    id: "orbit",
    label: "Orbit",
    hint: "Other people, planning, and the compass",
  },
  person: {
    id: "person",
    label: "Person",
    hint: "How you relate and take things in",
  },
};

export interface ProfileAspectMeta {
  id: ProfileAspect;
  label: string;
  description: string;
  group: ProfileAspectGroup;
}

export const PROFILE_ASPECT_META: Record<ProfileAspect, ProfileAspectMeta> = {
  characteristics: {
    id: "characteristics",
    label: "Characteristics",
    description: "Personality and identity",
    group: "standing",
  },
  attributes: {
    id: "attributes",
    label: "Attributes",
    description: "Mind, Heart, Drive, Body — base plus gear",
    group: "standing",
  },
  traits: {
    id: "traits",
    label: "Traits",
    description: "Standing qualities, by tier",
    group: "standing",
  },
  skills: {
    id: "skills",
    label: "Skills",
    description: "Mastery across skill trees",
    group: "standing",
  },
  equipment: {
    id: "equipment",
    label: "Equipment",
    description: "What is currently equipped, by slot",
    group: "equipped",
  },
  perks: {
    id: "perks",
    label: "Perks",
    description: "Modifiers that change how the other sections behave",
    group: "equipped",
  },
  auras: {
    id: "auras",
    label: "Auras",
    description: "What you project, and what it costs to hold",
    group: "equipped",
  },
  spells: {
    id: "spells",
    label: "Spells",
    description: "Castable and equipped spells",
    group: "equipped",
  },
  pipelines: {
    id: "pipelines",
    label: "Pipelines",
    description: "Equipped flows, by layer and body slot",
    group: "equipped",
  },
  currentRole: {
    id: "currentRole",
    label: "Current Role",
    description: "Role being acted as right now",
    group: "heading",
  },
  currentGoal: {
    id: "currentGoal",
    label: "Current Goals",
    description: "Up to three profile-specific goals in focus",
    group: "heading",
  },
  direction: {
    id: "direction",
    label: "Work direction",
    description: "Character heading: vision, growth, belief, money — not the plan",
    group: "heading",
  },
  status: {
    id: "status",
    label: "Status",
    description: "Mood, effects, and live condition",
    group: "heading",
  },
  otherPeopleGoals: {
    id: "otherPeopleGoals",
    label: "Other people",
    description: "Goals held for other people — heal, open, grow",
    group: "orbit",
  },
  relationshipGoals: {
    id: "relationshipGoals",
    label: "Relationship goals",
    description: "Shared aims on the relationship graph",
    group: "orbit",
  },
  parentGoals: {
    id: "parentGoals",
    label: "Children",
    description: "Parent-facet goals — spark, pride, notice, together",
    group: "orbit",
  },
  compass: {
    id: "compass",
    label: "Compass",
    description: "Strategic compass — top-weighted Plan-tile focuses",
    group: "orbit",
  },
  planning: {
    id: "planning",
    label: "Planning",
    description: "Command Center plan: product, clarity, health, launch",
    group: "orbit",
  },
  relationships: {
    id: "relationships",
    label: "Relationships",
    description: "Connections to other profiles",
    group: "person",
  },
  history: {
    id: "history",
    label: "History",
    description: "Relevant past activity",
    group: "person",
  },
  preferences: {
    id: "preferences",
    label: "Preferences",
    description: "Personal preferences and tastes",
    group: "person",
  },
  learning: {
    id: "learning",
    label: "Learning",
    description: "How you take things in",
    group: "person",
  },
};

export function aspectsInGroup(group: ProfileAspectGroup): ProfileAspect[] {
  return PROFILE_ASPECTS.filter((a) => PROFILE_ASPECT_META[a].group === group);
}

export const MAX_SELECTED_ROLES = 3;

export interface ProfileContextSettings {
  enabled: boolean;
  /** Which aspects of the profile to include in chat prompts */
  includedAspects: ProfileAspect[];
  /**
   * Roles the user is acting as for this session (max {@link MAX_SELECTED_ROLES}).
   * Migrated from the legacy single `actingAsRole` field on load.
   */
  actingAsRoles: string[];
  /** @deprecated Prefer {@link actingAsRoles}. Kept so older persisted blobs still parse. */
  actingAsRole?: string;
  /** Optional goal the user is working on for this profile */
  activeGoalId?: string;
}

export const DEFAULT_PROFILE_CONTEXT_SETTINGS: ProfileContextSettings = {
  enabled: false,
  includedAspects: [],
  actingAsRoles: [],
};
