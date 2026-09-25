import type { SelectedContextKey } from "@4eye/types";
import {
  ActorsIcon,
  AudiencesIcon,
  LocationsIcon,
  StoriesIcon,
  AnimationsIcon,
  ScenesIcon,
  SequencesIcon,
  PipelinesIcon,
} from "./entityIcons";
import type { ComponentType } from "react";

export interface EntityKindMeta {
  key: SelectedContextKey;
  label: string;
  singular: string;
  /** Sentence describing what it is (used in detail headers) */
  description: string;
  color: string;
  Icon: ComponentType;
}

/**
 * Metadata for the eight built-in entity kinds. Order here determines
 * the order they appear in the AI Chat dashboard nav and Context bar.
 */
export const ENTITY_KINDS: EntityKindMeta[] = [
  {
    key: "targets",
    label: "Actors",
    singular: "Target",
    description:
      "People and entities that act, that the prompt is aimed at, or that simply ride along as included",
    color: "#3b82f6",
    Icon: ActorsIcon,
  },
  {
    key: "audiences",
    label: "Audiences",
    singular: "Audience",
    description:
      "Who else this is for — the room we are fitting into, not the cursor",
    color: "#22c55e",
    Icon: AudiencesIcon,
  },
  {
    key: "locations",
    label: "Locations",
    singular: "Location",
    description: "Physical or virtual places",
    color: "#ef4444",
    Icon: LocationsIcon,
  },
  {
    key: "stories",
    label: "Stories",
    singular: "Story",
    description: "Narrative templates",
    color: "#f59e0b",
    Icon: StoriesIcon,
  },
  {
    key: "animations",
    label: "Animations",
    singular: "Animation",
    description: "Motion templates",
    color: "#8b5cf6",
    Icon: AnimationsIcon,
  },
  {
    key: "scenes",
    label: "Scenes",
    singular: "Scene",
    description: "Compositions of elements",
    color: "#ec4899",
    Icon: ScenesIcon,
  },
  {
    key: "sequences",
    label: "Sequences",
    singular: "Sequence",
    description: "Ordered chains of scenes & animations played as one timeline",
    color: "#14b8a6",
    Icon: SequencesIcon,
  },
  {
    key: "pipelines",
    label: "Pipelines",
    singular: "Pipeline",
    description:
      "Backend prompt-processing layers (Concise, Healing, …) — selection order = flow order",
    color: "#06b6d4",
    Icon: PipelinesIcon,
  },
];

export const ENTITY_KIND_BY_KEY: Record<SelectedContextKey, EntityKindMeta> =
  ENTITY_KINDS.reduce(
    (acc, k) => {
      acc[k.key] = k;
      return acc;
    },
    {} as Record<SelectedContextKey, EntityKindMeta>,
  );

/**
 * Entity-kind groups — a higher-level grouping used to organize the
 * Context bar / nav into compact clusters. Designed to grow: add a new
 * group here and assign kinds to it. The "Creative" group combines the
 * authoring kinds (stories, animations, scenes, sequences).
 */
export interface EntityKindGroup {
  key: string;
  label: string;
  /** Short accent color for the group header / cluster outline. */
  color: string;
  kinds: SelectedContextKey[];
}

export const ENTITY_KIND_GROUPS: EntityKindGroup[] = [
  {
    key: "subjects",
    label: "Subjects",
    color: "#3b82f6",
    kinds: ["targets", "audiences", "locations"],
  },
  {
    key: "creative",
    label: "Creative",
    color: "#ec4899",
    kinds: ["stories", "animations", "scenes", "sequences"],
  },
  {
    key: "system",
    label: "System",
    color: "#06b6d4",
    kinds: ["pipelines"],
  },
];

/** The group a given entity kind belongs to (first match wins). */
export const ENTITY_GROUP_BY_KIND: Record<SelectedContextKey, EntityKindGroup> =
  ENTITY_KIND_GROUPS.reduce(
    (acc, group) => {
      for (const kind of group.kinds) acc[kind] = group;
      return acc;
    },
    {} as Record<SelectedContextKey, EntityKindGroup>,
  );
