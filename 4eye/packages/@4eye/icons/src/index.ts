import type * as React from "react";

import type { BrandIconProps } from "./BrandIcon";
import {
  BadgeIcon,
  BookIcon,
  BoostIcon,
  CardIcon,
  CoinsIcon,
  CosmeticIcon,
  CrystalIcon,
  GemIcon,
  GiftIcon,
  MaterialIcon,
  MysteryIcon,
  PotionIcon,
  ScrollIcon,
  TokenIcon,
  ToolIcon,
  TrophyIcon,
} from "./items";

export { BrandIcon } from "./BrandIcon";
export type { BrandIconProps } from "./BrandIcon";
export * from "./items";

/** Stable keys for item glyphs — mirrors the inventory `ItemKind` union. */
export type ItemIconKey =
  | "currency-earned"
  | "currency-premium"
  | "token"
  | "material"
  | "cosmetic"
  | "functional"
  | "consumable"
  | "permanent"
  | "card"
  | "badge"
  | "trophy"
  | "rare"
  | "quest"
  | "learning"
  | "gift"
  | "mystery";

/** Registry mapping an item kind to its custom brand glyph. */
export const ITEM_ICONS: Record<ItemIconKey, React.ComponentType<BrandIconProps>> = {
  "currency-earned": CoinsIcon,
  "currency-premium": GemIcon,
  token: TokenIcon,
  material: MaterialIcon,
  cosmetic: CosmeticIcon,
  functional: BoostIcon,
  consumable: PotionIcon,
  permanent: ToolIcon,
  card: CardIcon,
  badge: BadgeIcon,
  trophy: TrophyIcon,
  rare: CrystalIcon,
  quest: ScrollIcon,
  learning: BookIcon,
  gift: GiftIcon,
  mystery: MysteryIcon,
};

// ── Profile-surface glyphs ────────────────────────────────────────────────────

import {
  SurfacedIcon, CharacterIcon, TodayIcon, CoreIcon, GearIcon, MindIcon, LifeIcon,
  UsersIcon, HealingIcon, PsychologyIcon, CommunicationIcon, StudentIcon,
  TeacherIcon, ClassroomIcon, ProfessionalIcon, ParentIcon, EngagementIcon,
} from "./lenses";
import {
  GoalsIcon, ActionsIcon, EventsIcon, SummaryIcon, FocusIcon,
  CurrentGoalIcon, NextActionIcon, HighestValueIcon,
} from "./sections";

export * from "./lenses";
export * from "./sections";

/** Stable keys for the profile lens rail — mirrors the `Lens` union. */
export type LensIconKey =
  | "surfaced"
  | "character"
  | "today"
  | "core"
  | "mind"
  | "brain"
  | "engagement"
  | "body"
  | "life"
  | "events"
  | "users"
  | "healing"
  | "psychology"
  | "communication"
  | "student"
  | "teacher"
  | "classroom"
  | "professional"
  | "parent";

/** Registry mapping a lens to its custom brand glyph. */
export const LENS_ICONS: Record<LensIconKey, React.ComponentType<BrandIconProps>> = {
  surfaced: SurfacedIcon,
  character: CharacterIcon,
  today: TodayIcon,
  core: CoreIcon,
  mind: MindIcon,
  brain: MindIcon,
  engagement: EngagementIcon,
  body: HealingIcon,
  life: LifeIcon,
  events: EventsIcon,
  users: UsersIcon,
  healing: HealingIcon,
  psychology: PsychologyIcon,
  communication: CommunicationIcon,
  student: StudentIcon,
  teacher: TeacherIcon,
  classroom: ClassroomIcon,
  professional: ProfessionalIcon,
  parent: ParentIcon,
};

/** Stable keys for surfaced cards and the collapsible sections beneath them. */
export type SectionIconKey =
  | "goals"
  | "actions"
  | "events"
  | "summary"
  | "daily-focus"
  | "current-goal"
  | "next-action"
  | "highest-value"
  | "attributes"
  | "learning-styles";

/** Registry mapping a section or surfaced-card kind to its custom brand glyph. */
export const SECTION_ICONS: Record<SectionIconKey, React.ComponentType<BrandIconProps>> = {
  goals: GoalsIcon,
  actions: ActionsIcon,
  events: EventsIcon,
  summary: SummaryIcon,
  "daily-focus": FocusIcon,
  "current-goal": CurrentGoalIcon,
  "next-action": NextActionIcon,
  "highest-value": HighestValueIcon,
  attributes: SummaryIcon,
  "learning-styles": FocusIcon,
};

// ── Attribute glyphs ─────────────────────────────────────────────────────────

export * from "./attributes";
