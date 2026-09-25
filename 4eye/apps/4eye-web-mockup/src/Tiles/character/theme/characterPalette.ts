"use client";

/**
 * The Character lens's colour language — two axes, and nothing else.
 *
 * Before this, the lens ran five unrelated colour systems at once: perks had a
 * hand-picked hue each (thirteen of them) *plus* a metal tier colour, equipment
 * had rarity colours, spells had category colours, actions had `COLOR_MAP`
 * accents, attributes had one accent. Nothing meant the same thing twice, so
 * none of it could be learned — colour was decoration that happened to be
 * everywhere, which is the same as no colour at all.
 *
 * Two axes replace it:
 *
 *   **Hue = channel.** *How does this thing enter play?* Four answers, and every
 *   section of the lens is one of them: you fire it (`invoked`), it is always on
 *   (`passive`), it fires for you when something happens (`reactive`), or you
 *   carry it (`equipped`). A violet glow means "you press this" on the action
 *   bar, in the spell book and on a perk card alike. Four hues is few enough to
 *   actually learn.
 *
 *   **Rank = one ordinal ramp, shared.** Perk tiers and equipment rarities are
 *   the same idea — how far up the scale is this — so they read from one ramp
 *   rather than two. The ramp is the conventional rarity progression (slate →
 *   green → blue → violet → amber → rose) because that convention is already
 *   learned; tiers map onto it by position, so "Gold" and "Legendary" are the
 *   same colour because they are the same height. The names stay metal, because
 *   the ramp encodes rank, not material. Pips carry the ordinal alongside the
 *   hue, so rank never has to be decoded from colour alone — that is what makes
 *   it safe to reuse the rarity ramp for something that is not rarity.
 *
 * State — locked, unequipped, inactive — is never a hue. It is the *intensity*
 * of the channel hue, so a locked perk is recognisably the same kind of thing as
 * an unlocked one rather than a grey object of unknown type. (The previous card
 * applied `grayscale(0.8)`, which erased the type along with the state.)
 *
 * Every colour here is an ink anchor pair or goes through `useSurface().ink()`,
 * so the lens measures ≥4.5:1 in both modes rather than in whichever one it was
 * eyeballed in.
 */

import { useInk, useSurface, type InkAnchors } from "@4eye/web/components/surface";

import type { PerkKind, PerkTier } from "../model/perks";
import type { EquipmentRarity } from "../model/equipment";

/* ------------------------------------------------------------------ channel */

export type Channel = "invoked" | "passive" | "reactive" | "equipped";

export const CHANNEL_ORDER: readonly Channel[] = ["invoked", "passive", "reactive", "equipped"];

export interface ChannelMeta {
  label: string;
  /** One line, shown as the tooltip wherever the channel is named. */
  hint: string;
  anchors: InkAnchors;
}

export const CHANNEL_META: Record<Channel, ChannelMeta> = {
  invoked: {
    label: "Invoked",
    hint: "You fire it — actions, casts, active perks",
    anchors: { color: "#5b21b6", accentColor: "#a78bfa" },
  },
  passive: {
    label: "Passive",
    hint: "Always on — attributes and standing modifiers",
    anchors: { color: "#1d4ed8", accentColor: "#60a5fa" },
  },
  reactive: {
    label: "Reactive",
    hint: "Fires for you when something happens",
    anchors: { color: "#b45309", accentColor: "#fbbf24" },
  },
  equipped: {
    label: "Equipped",
    hint: "Carried — gear and what it grants",
    anchors: { color: "#0f766e", accentColor: "#2dd4bf" },
  },
};

/** Perk kinds are channels under a different name. */
export const PERK_KIND_CHANNEL: Record<PerkKind, Channel> = {
  active: "invoked",
  passive: "passive",
  reactive: "reactive",
};

export interface ChannelInk {
  label: string;
  hint: string;
  /** Text/glyph colour — contrast-safe in the current mode. */
  ink: string;
  /** Fill/border source — the same hue, tuned for washes rather than text. */
  tint: string;
}

/**
 * All four channels resolved for the current mode.
 *
 * Returned as a record rather than one channel at a time so a component can
 * colour a list of mixed channels without calling a hook inside a loop.
 */
export function useChannelInks(): Record<Channel, ChannelInk> {
  // Four fixed calls, in a fixed order — the count never varies between renders.
  const invoked = useInk(CHANNEL_META.invoked.anchors);
  const passive = useInk(CHANNEL_META.passive.anchors);
  const reactive = useInk(CHANNEL_META.reactive.anchors);
  const equipped = useInk(CHANNEL_META.equipped.anchors);

  return {
    invoked: { ...CHANNEL_META.invoked, ...invoked },
    passive: { ...CHANNEL_META.passive, ...passive },
    reactive: { ...CHANNEL_META.reactive, ...reactive },
    equipped: { ...CHANNEL_META.equipped, ...equipped },
  };
}

/* --------------------------------------------------------------------- rank */

/**
 * Rank is achromatic, and that is the whole point.
 *
 * The first version of this ramp was the conventional rarity progression —
 * slate, green, blue, violet, amber, rose — which collided with the channels
 * almost exactly: passive `#1d4ed8` against rank 2 `#2563eb`, invoked `#5b21b6`
 * against rank 3 `#7c3aed`, reactive `#b45309` against rank 4 `#d97706`. Three
 * of four channels had a near-identical twin one axis over. On a perk card that
 * put an amber "Reactive" label directly above amber "Gold" pips for two
 * unrelated reasons, and across the lens it taught "blue = passive" and "blue =
 * Rare" at the same time. Two axes sharing one vocabulary do not add up to a
 * system; they cancel.
 *
 * So hue is spent entirely on channel, and rank is encoded the two ways that
 * cannot be mistaken for a hue: **how many pips are filled**, and **how much
 * contrast the ink carries**. Higher rank is more emphatic against the page —
 * darkest in light mode, brightest in dark. Nothing on this lens is neutral
 * *and* emphatic except rank, so rank is unambiguous even at a glance.
 *
 * The cost is the rarity convention: a Legendary item is no longer orange. The
 * pips and the word carry it instead, and the convention was not worth breaking
 * the one thing colour on this lens is supposed to do.
 */
const RANK_RAMP_LIGHT = [
  "#64748b", // 0 — lightest that still clears 4.5:1 on the page background
  "#586479",
  "#4b5769",
  "#3f4a5c",
  "#334051",
  "#1e293b", // 5 — near-ink
] as const;

const RANK_RAMP_DARK = [
  "#94a3b8", // 0 — dimmest that still clears 4.5:1 on the dark page
  "#a7b3c4",
  "#b9c3d1",
  "#cbd3de",
  "#dde2ea",
  "#f1f5f9", // 5 — near-paper
] as const;

export const RANK_STEPS = RANK_RAMP_LIGHT.length;

export const RARITY_RANK: Record<EquipmentRarity, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
  mythic: 5,
};

/**
 * Four tiers onto six stops, by height: bronze at the bottom, platinum at the
 * top, and Gold on the same amber as Legendary because they are the same height
 * on the same scale.
 *
 * Bronze takes the slate stop rather than the green one above it. Green is the
 * ramp's "uncommon", which is correct for rarity and reads as a mistake next to
 * the word *Bronze* — a metal name with an obviously non-metal colour is the
 * one place where sharing the ramp costs more than it buys. Slate is the
 * bottom of the scale in both readings, so nothing is lost.
 */
export const TIER_RANK: Record<PerkTier, number> = {
  bronze: 0,
  silver: 2,
  gold: 4,
  platinum: 5,
};

/** Pip count for a rank — how many of `RANK_STEPS` are filled. */
export function rankPips(rank: number): number {
  return Math.max(1, Math.min(RANK_STEPS, rank + 1));
}

/**
 * `rank(n)` → the ink for that step in the current mode.
 *
 * No `ink()` pass: the ramp is already built per mode against the page
 * background, and running an achromatic value through a contrast fixer would
 * flatten the top of it into the bottom.
 */
export function useRankInk() {
  const { mode } = useSurface();
  const ramp = mode === "dark" ? RANK_RAMP_DARK : RANK_RAMP_LIGHT;
  return {
    rank: (n: number) => ramp[Math.max(0, Math.min(RANK_STEPS - 1, n))],
  };
}
