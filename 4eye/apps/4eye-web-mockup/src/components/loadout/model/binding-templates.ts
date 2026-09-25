"use client";

/**
 * Binding templates — named swipe + page presets for the Character Bindings
 * surface.
 *
 * Selecting a template loads its swipe-direction → spell map and switches the
 * active loadout page to the matching keypad.
 *
 * Life family  — Primary · Learn · Love
 * Engine family — Create · Engage · Influence · Content (content-creation set)
 */

import type { LoadoutActionRef, LoadoutPage, SwipeDirection, BindingTemplateId } from "../model/types";
import type { EquippedAction } from "@yen/content/character/types";
import { makeSlots, LOADOUT_TIER_META } from "../model/types";
import { contentTopicRef } from "./content-topics";

/**
 * Content Engine ink — one hue per mode, not one red for the whole family.
 *
 * Create is amber (make), Engage is violet (spark), Influence is teal (reach),
 * Content is sky (the 9-topic pad). Love keeps deep rose (`#be123c`); these
 * four must not collapse into it. Applied as a card tint and chip accent —
 * each action still wears its own `COLOR_MAP` hue so the bar stays learnable.
 */
export const ENGINE_INK = {
  create: "#d97706",
  engage: "#7c3aed",
  influence: "#0f766e",
  content: "#0369a1",
} as const;

/** @deprecated Use {@link ENGINE_INK}. Kept so older imports keep resolving. */
export const ENGINE_RED = ENGINE_INK;

export const ENGINE_TEMPLATE_IDS: readonly BindingTemplateId[] = [
  "create",
  "engage",
  "influence",
  "content",
];

export function isEngineTemplate(id: BindingTemplateId | null | undefined): boolean {
  return Boolean(id && (ENGINE_TEMPLATE_IDS as readonly string[]).includes(id));
}

const spell = (spellId: string): LoadoutActionRef => ({ kind: "spell", spellId });

export type { BindingTemplateId };

export interface BindingTemplate {
  id: BindingTemplateId;
  label: string;
  /** Short line under the chip — what this rose is for. */
  blurb: string;
  /** Matching loadout page id (must exist in LOADOUT_SEED.pages). */
  pageId: string;
  accent: string;
  /** Full 8-direction swipe map. */
  swipe: Record<SwipeDirection, LoadoutActionRef | null>;
}

function group(
  id: string,
  grid: "tri" | "quad" | "keypad" | "row",
  refs: (LoadoutActionRef | null)[],
  extra: { label?: string; color?: string } = {},
) {
  return { id, grid, slots: makeSlots(grid, refs), ...extra };
}

/** The three loadout pages that pair with the binding templates. */
export const BINDING_TEMPLATE_PAGES: LoadoutPage[] = [
  {
    id: "PAGE_PRIMARY",
    name: "Primary",
    icon: "🎯",
    color: "#15803d",
    groups: [
      group(
        "G_PRI_PLAN",
        "tri",
        [spell("SPELL_PLAN"), spell("SPELL_VISUALIZE"), spell("SPELL_NAVIGATE_PATH")],
        { label: "Plan", color: "#1d4ed8" },
      ),
      group(
        "G_PRI_ACT",
        "tri",
        [spell("SPELL_ACT"), spell("SPELL_SHIP"), spell("SPELL_BUILD")],
        { label: "Act", color: "#6d28d9" },
      ),
      group(
        "G_PRI_IMPROVE",
        "tri",
        [spell("SPELL_IMPROVE"), spell("SPELL_QUALITY"), spell("SPELL_CUT")],
        { label: "Improve · Quality", color: "#15803d" },
      ),
      group(
        "G_PRI_COMM",
        "tri",
        [spell("SPELL_COMMUNICATE"), spell("SPELL_TEACH"), spell("SPELL_RECORD")],
        { label: "Communicate", color: "#0f766e" },
      ),
    ],
  },
  {
    id: "PAGE_LEARN",
    name: "Learn",
    icon: "📚",
    color: "#2563eb",
    groups: [
      group(
        "G_LEARN_PAD",
        "keypad",
        [
          spell("SPELL_EXPLAIN"),
          spell("SPELL_EXAMPLE"),
          spell("SPELL_ANALOGIZE"),
          spell("SPELL_SOCRATIC"),
          spell("SPELL_QUIZ"),
          spell("SPELL_FLASHCARD"),
          spell("SPELL_ANALYZE"),
          spell("SPELL_EXPAND"),
          spell("SPELL_CHALLENGE"),
        ],
        { label: "Study", color: "#2563eb" },
      ),
    ],
  },
  {
    id: "PAGE_LOVE",
    name: "Love",
    icon: "♥",
    color: "#be123c",
    groups: [
      group(
        "G_LOVE_CARE",
        "tri",
        [spell("SPELL_BOND"), spell("SPELL_FISH"), spell("SPELL_CHECK_IN")],
        { label: "Bond · Fish", color: "#be123c" },
      ),
      group(
        "G_LOVE_NAME",
        "tri",
        [spell("SPELL_NAME_IT"), spell("SPELL_ENCOURAGE"), spell("SPELL_LIFT")],
        { label: "Name · Care", color: "#9f1239" },
      ),
      group(
        "G_LOVE_PLAY",
        "tri",
        [spell("SPELL_PLAY"), spell("SPELL_RECOVER"), spell("SPELL_CELEBRATE")],
        { label: "Play · Recover", color: "#c2410c" },
      ),
    ],
  },

  // ── Engine family ────────────────────────────────────────────────────────

  {
    id: "PAGE_CREATE",
    name: "Create",
    icon: "🎬",
    color: ENGINE_INK.create,
    groups: [
      group(
        "G_CREATE_DRAFT",
        "tri",
        [spell("SPELL_DRAFT"), spell("SPELL_STORYBOARD"), spell("SPELL_STACK")],
        { label: "Draft", color: ENGINE_INK.create },
      ),
      group(
        "G_CREATE_CAPTURE",
        "tri",
        [spell("SPELL_RECORD"), spell("SPELL_CUT"), spell("SPELL_QUALITY")],
        { label: "Capture · Craft", color: ENGINE_INK.engage },
      ),
      group(
        "G_CREATE_SHIP",
        "tri",
        [spell("SPELL_SHIP"), spell("SPELL_TEACH"), spell("SPELL_COMMUNICATE")],
        { label: "Ship", color: ENGINE_INK.influence },
      ),
    ],
  },
  {
    id: "PAGE_ENGAGE",
    name: "Engage",
    icon: "⚡",
    color: ENGINE_INK.engage,
    groups: [
      group(
        "G_ENGAGE_HOOK",
        "tri",
        [spell("SPELL_HOOK"), spell("SPELL_INVITE"), spell("SPELL_SPARK")],
        { label: "Hook · Invite", color: ENGINE_INK.engage },
      ),
      group(
        "G_ENGAGE_RECEIVE",
        "tri",
        [spell("SPELL_REPLY"), spell("SPELL_ENCOURAGE"), spell("SPELL_CHECK_IN")],
        { label: "Receive", color: ENGINE_INK.create },
      ),
      group(
        "G_ENGAGE_LIFT",
        "tri",
        [spell("SPELL_CELEBRATE"), spell("SPELL_CONNECT"), spell("SPELL_LIFT")],
        { label: "Lift", color: ENGINE_INK.influence },
      ),
    ],
  },
  {
    id: "PAGE_INFLUENCE",
    name: "Influence",
    icon: "📡",
    color: ENGINE_INK.influence,
    groups: [
      group(
        "G_INF_AMPLIFY",
        "tri",
        [spell("SPELL_AMPLIFY"), spell("SPELL_BROADCAST"), spell("SPELL_FISH")],
        { label: "Amplify", color: ENGINE_INK.influence },
      ),
      group(
        "G_INF_UNLOCK",
        "tri",
        [spell("SPELL_UNLOCK"), spell("SPELL_COMPREHEND"), spell("SPELL_COMPREHEND")],
        { label: "Unlock · Lead", color: ENGINE_INK.create },
      ),
      group(
        "G_INF_CONVERT",
        "tri",
        [spell("SPELL_TEACH"), spell("SPELL_COMPETE"), spell("SPELL_RALLY")],
        { label: "Convert", color: ENGINE_INK.content },
      ),
    ],
  },
  {
    id: "PAGE_CONTENT",
    name: "Content",
    icon: "▦",
    color: ENGINE_INK.content,
    groups: [
      group(
        "G_CONTENT_PAD",
        "keypad",
        [
          contentTopicRef("life"),
          contentTopicRef("heart"),
          contentTopicRef("mind"),
          contentTopicRef("craft"),
          contentTopicRef("build"),
          contentTopicRef("intel"),
          contentTopicRef("body"),
          contentTopicRef("lead"),
          contentTopicRef("value"),
        ],
        { label: "Topics · layers", color: ENGINE_INK.content },
      ),
    ],
  },
];

/**
 * Optimal swipe bindings per template.
 *
 * Compass logic (clock from up): intent → do → refine → relate, with the
 * diagonal corners as the supporting commons for that mode.
 */
export const BINDING_TEMPLATES: BindingTemplate[] = [
  {
    id: "primary",
    label: "Primary",
    blurb: "Plan · Act · Improve · Quality · Communicate",
    pageId: "PAGE_PRIMARY",
    accent: "#15803d",
    swipe: {
      up: spell("SPELL_PLAN"),
      "up-right": spell("SPELL_ACT"),
      right: spell("SPELL_SHIP"),
      "down-right": spell("SPELL_IMPROVE"),
      down: spell("SPELL_QUALITY"),
      "down-left": spell("SPELL_CUT"),
      left: spell("SPELL_COMMUNICATE"),
      "up-left": spell("SPELL_TEACH"),
    },
  },
  {
    id: "learn",
    label: "Learn",
    blurb: "Explain · Anchor · Test · Go deeper",
    pageId: "PAGE_LEARN",
    accent: "#2563eb",
    swipe: {
      up: spell("SPELL_EXPLAIN"),
      "up-right": spell("SPELL_EXAMPLE"),
      right: spell("SPELL_ANALOGIZE"),
      "down-right": spell("SPELL_QUIZ"),
      down: spell("SPELL_FLASHCARD"),
      "down-left": spell("SPELL_SOCRATIC"),
      left: spell("SPELL_ANALYZE"),
      "up-left": spell("SPELL_EXPAND"),
    },
  },
  {
    id: "love",
    label: "Love",
    blurb: "Bond · Fish · Play · Recover",
    pageId: "PAGE_LOVE",
    accent: "#be123c",
    swipe: {
      up: spell("SPELL_BOND"),
      "up-right": spell("SPELL_FISH"),
      right: spell("SPELL_CHECK_IN"),
      "down-right": spell("SPELL_NAME_IT"),
      down: spell("SPELL_ENCOURAGE"),
      "down-left": spell("SPELL_RECOVER"),
      left: spell("SPELL_PLAY"),
      "up-left": spell("SPELL_CELEBRATE"),
    },
  },
  {
    id: "create",
    label: "Create",
    blurb: "Draft · Record · Cut · Quality · Ship",
    pageId: "PAGE_CREATE",
    accent: ENGINE_INK.create,
    swipe: {
      up: spell("SPELL_DRAFT"),
      "up-right": spell("SPELL_STORYBOARD"),
      right: spell("SPELL_RECORD"),
      "down-right": spell("SPELL_CUT"),
      down: spell("SPELL_QUALITY"),
      "down-left": spell("SPELL_SHIP"),
      left: spell("SPELL_TEACH"),
      "up-left": spell("SPELL_STACK"),
    },
  },
  {
    id: "engage",
    label: "Engage",
    blurb: "Hook · Invite · Reply · Spark · Encourage",
    pageId: "PAGE_ENGAGE",
    accent: ENGINE_INK.engage,
    swipe: {
      up: spell("SPELL_HOOK"),
      "up-right": spell("SPELL_INVITE"),
      right: spell("SPELL_REPLY"),
      "down-right": spell("SPELL_SPARK"),
      down: spell("SPELL_ENCOURAGE"),
      "down-left": spell("SPELL_CHECK_IN"),
      left: spell("SPELL_CELEBRATE"),
      "up-left": spell("SPELL_CONNECT"),
    },
  },
  {
    id: "influence",
    label: "Influence",
    blurb: "Amplify · Unlock · Comprehend · Teach · Compete",
    pageId: "PAGE_INFLUENCE",
    accent: ENGINE_INK.influence,
    swipe: {
      up: spell("SPELL_AMPLIFY"),
      "up-right": spell("SPELL_UNLOCK"),
      right: spell("SPELL_COMPREHEND"),
      "down-right": spell("SPELL_TEACH"),
      down: spell("SPELL_COMPETE"),
      "down-left": spell("SPELL_BROADCAST"),
      left: spell("SPELL_FISH"),
      "up-left": spell("SPELL_RALLY"),
    },
  },
  {
    id: "content",
    label: "Content",
    blurb: "Life · Heart · Mind · Craft · Build · Intel · Body · Lead · Value",
    pageId: "PAGE_CONTENT",
    accent: ENGINE_INK.content,
    swipe: {
      up: contentTopicRef("life"),
      "up-right": contentTopicRef("heart"),
      right: contentTopicRef("mind"),
      "down-right": contentTopicRef("intel"),
      down: contentTopicRef("value"),
      "down-left": contentTopicRef("lead"),
      left: contentTopicRef("body"),
      "up-left": contentTopicRef("craft"),
    },
  },
];

/** Which templates belong to each family (used to split the picker UI). */
export const TEMPLATE_FAMILIES: {
  id: string;
  label: string;
  ink?: string;
  ids: BindingTemplateId[];
}[] = [
  { id: "life", label: "Life", ids: ["primary", "learn", "love"] },
  {
    id: "engine",
    label: "Content Engine",
    ink: ENGINE_INK.content,
    ids: ["create", "engage", "influence", "content"],
  },
];

/**
 * Always-on craft actions — Shorts · Emotion · Engage · Gamify · Edit · Human.
 *
 * Merged onto every template's bar so they stay reachable when Create / Engage
 * / Influence swap the direct+people set. Deduped by id, so Primary can keep
 * Emotion in the hero row (same id as Inspect) without showing it twice.
 */
export const CRAFT_ACTIONS: EquippedAction[] = [
  {
    id: "act-shorts",
    label: "Shorts",
    icon: "MovieFilterRounded",
    accent: "amber",
    hint: "Cut a short from what's in front of you — one beat, one point",
    group: "craft",
  },
  {
    id: "act-inspect-emotion",
    label: "Emotion",
    icon: "MoodRounded",
    accent: "pink",
    hint: "Inspect the active emotion — events, perspectives, ideas, comments",
    group: "craft",
  },
  {
    id: "act-engage",
    label: "Engage",
    icon: "ForumRounded",
    accent: "purple",
    hint: "Hook, invite, spark — close the loop with the people in front of you",
    group: "craft",
  },
  {
    id: "act-gamify",
    label: "Gamify",
    icon: "SportsEsportsRounded",
    accent: "green",
    hint: "Turn this into a playable loop — quest, score, reward",
    group: "craft",
  },
  {
    id: "act-edit",
    label: "Edit",
    icon: "EditRounded",
    accent: "blue",
    hint: "Revise the draft in front of you — cut, shape, raise the bar",
    group: "craft",
  },
  {
    id: "act-human",
    label: "Human",
    icon: "PersonRounded",
    accent: "teal",
    hint: "Ground it in the Human Layer — real self, real world, real stakes",
    group: "craft",
  },
];

/** Append craft actions that the base set does not already carry. */
export function withCraftActions(actions: EquippedAction[]): EquippedAction[] {
  const seen = new Set(actions.map((a) => a.id));
  return [...actions, ...CRAFT_ACTIONS.filter((a) => !seen.has(a.id))];
}

/**
 * Template-specific equipped action overrides.
 *
 * Indexed by BindingTemplateId. Templates not present here fall back to the
 * character seed actions. Each entry carries the same 4+4 direct/people split
 * as the seed; craft actions are merged on at render time.
 */
export const EQUIPPED_ACTIONS_BY_TEMPLATE: Partial<Record<BindingTemplateId, EquippedAction[]>> = {
  create: [
    { id: "create-draft",       label: "Draft",       icon: "EditNoteRounded",          accent: "amber",  hint: "Start a draft — beat the blank page", group: "direct" },
    { id: "create-record",      label: "Record",      icon: "FiberManualRecordRounded", accent: "red",    hint: "Capture the walkthrough while it is still true", group: "direct" },
    { id: "create-cut",         label: "Cut",         icon: "ContentCutRounded",        accent: "slate",  hint: "Remove what dilutes the point", group: "direct" },
    { id: "create-quality",     label: "Quality",     icon: "VerifiedRounded",          accent: "green",  hint: "Hold the bar before ship", group: "direct" },
    { id: "create-teach",       label: "Teach",       icon: "SchoolRounded",            accent: "purple", hint: "Turn what you made into something others can run", group: "people" },
    { id: "create-share",       label: "Share",       icon: "IosShareRounded",          accent: "blue",   hint: "Publish what you have learned", group: "people" },
    { id: "create-communicate", label: "Communicate", icon: "ChatRounded",              accent: "teal",   hint: "Say it so another human can run with it", group: "people" },
    { id: "create-ship",        label: "Ship",        icon: "RocketLaunchRounded",      accent: "pink",   hint: "Release it into the world", group: "people" },
  ],
  engage: [
    { id: "engage-hook",       label: "Hook",       icon: "FlashOnRounded",            accent: "amber",  hint: "Open with something that stops the scroll", group: "direct" },
    { id: "engage-invite",     label: "Invite",     icon: "AddCircleOutlineRounded",   accent: "purple", hint: "Invite them in — ask, prompt, open the door", group: "direct" },
    { id: "engage-reply",      label: "Reply",      icon: "ReplyRounded",              accent: "blue",   hint: "Close the loop — respond and acknowledge", group: "direct" },
    { id: "engage-spark",      label: "Spark",      icon: "BoltRounded",               accent: "pink",   hint: "Ignite the next exchange — leave them wanting more", group: "direct" },
    { id: "engage-encourage",  label: "Encourage",  icon: "FavoriteRounded",           accent: "red",    hint: "Lift their effort — name it, validate it", group: "people" },
    { id: "engage-check-in",   label: "Check In",   icon: "CheckCircleOutlineRounded", accent: "teal",   hint: "Post a quick status update", group: "people" },
    { id: "engage-celebrate",  label: "Celebrate",  icon: "CelebrationRounded",        accent: "amber",  hint: "Mark the win so it registers", group: "people" },
    { id: "engage-connect",    label: "Connect",    icon: "HubRounded",                accent: "purple", hint: "Link ideas or people that strengthen each other", group: "people" },
  ],
  influence: [
    { id: "inf-amplify",    label: "Amplify",    icon: "CampaignRounded",    accent: "amber",  hint: "Turn a win into signal, tokens, reach", group: "direct" },
    { id: "inf-unlock",     label: "Unlock",     icon: "LockOpenRounded",    accent: "teal",   hint: "Open capacity / leverage / the next door", group: "direct" },
    { id: "inf-comprehend", label: "Comprehend", icon: "AccountTreeRounded", accent: "purple", hint: "See the system clearly enough to lead it", group: "direct" },
    { id: "inf-compete",    label: "Compete",    icon: "EmojiEventsRounded", accent: "red",    hint: "Aim at #1 without making it ugly", group: "direct" },
    { id: "inf-teach",      label: "Teach",      icon: "SchoolRounded",      accent: "blue",   hint: "Turn what you know into something others can run", group: "people" },
    { id: "inf-rally",      label: "Rally",      icon: "GroupsRounded",      accent: "green",  hint: "Align and energise the people around the vision", group: "people" },
    { id: "inf-broadcast",  label: "Broadcast",  icon: "PublicRounded",      accent: "teal",   hint: "Send the signal wide — reach beyond the room", group: "people" },
    { id: "inf-fish",       label: "Fish",       icon: "WavesRounded",       accent: "pink",   hint: "Cast toward Perfect Loves — notice, invite, protect", group: "people" },
  ],
};

export function bindingTemplateById(id: BindingTemplateId): BindingTemplate {
  return BINDING_TEMPLATES.find((t) => t.id === id) ?? BINDING_TEMPLATES[0]!;
}

/** @deprecated kept so callers that imported tier meta for Primary still resolve. */
export { LOADOUT_TIER_META };
