"use client";

/**
 * Profile-aware character presentation — Matthew's sheet by default,
 * Janna's auras, perks, attributes, and status when her profile is active.
 */

import * as React from "react";
import { useProfilesOptional } from "@4eye/web/Tiles/profiles/store/ProfileProvider";

import { AURAS, JANNA_AURAS, type AuraMeta } from "../components/Auras";
import { calcJannaEffectiveAttributes } from "../model/janna-attributes";
import { JANNA_FEATURED_PERK_IDS, JANNA_PERKS } from "../model/janna-perks";
import { JANNA_STATUS_SEED } from "../model/janna-status";
import {
  FEATURED_PERK_IDS,
  PERKS,
  type PerkMeta,
} from "../model/perks";
import { CHARACTER_STATUS_SEED, type CharacterStatus, type StatusEffect } from "../model/status";
import type { AttributeProgressMap } from "../model/attributes";

export const JANNA_PROFILE_ID = "PROFILE_JANNA";

export function useIsJannaProfile(): boolean {
  return useProfilesOptional()?.profile.id === JANNA_PROFILE_ID;
}

export function useCharacterStatus(): CharacterStatus {
  return useIsJannaProfile() ? JANNA_STATUS_SEED : CHARACTER_STATUS_SEED;
}

export function useCharacterAuras(): readonly AuraMeta[] {
  return useIsJannaProfile() ? JANNA_AURAS : AURAS;
}

export function useCharacterPerks(): readonly PerkMeta[] {
  return useIsJannaProfile() ? JANNA_PERKS : PERKS;
}

export function useFeaturedPerkIds(): readonly string[] {
  return useIsJannaProfile() ? JANNA_FEATURED_PERK_IDS : FEATURED_PERK_IDS;
}

/** Janna's own effects; `null` means use the live store (Matthew). */
export function useCharacterSeedEffects(): StatusEffect[] | null {
  return useIsJannaProfile() ? JANNA_STATUS_SEED.effects : null;
}

export function useJannaEffectiveAttributes(): AttributeProgressMap | null {
  const isJanna = useIsJannaProfile();
  return React.useMemo(() => (isJanna ? calcJannaEffectiveAttributes() : null), [isJanna]);
}
