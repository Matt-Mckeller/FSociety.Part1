"use client";

/** Loadout seed — Primary / Learn / Love binding templates for expanse_eye. */

import type { LoadoutData } from "../model/types";
import { BINDING_TEMPLATE_PAGES, bindingTemplateById } from "../model/binding-templates";
import { CONTENT_TOPIC_ACTIONS } from "../model/content-topics";

const spell = (spellId: string) => ({ kind: "spell" as const, spellId });

const PRIMARY = bindingTemplateById("primary");

export const LOADOUT_SEED: LoadoutData = {
  bars: {
    planning: [spell("SPELL_PLAN"), spell("SPELL_VISUALIZE"), spell("SPELL_NAVIGATE_PATH")],
    implementation: [spell("SPELL_ACT"), spell("SPELL_SHIP"), spell("SPELL_BUILD")],
    improvement: [spell("SPELL_IMPROVE"), spell("SPELL_QUALITY"), spell("SPELL_CUT")],
  },
  pages: BINDING_TEMPLATE_PAGES,
  activePageId: PRIMARY.pageId,
  activeBindingTemplateId: PRIMARY.id,
  swipe: { ...PRIMARY.swipe },
  quality: {
    "spell:SPELL_PLAN": "crystal",
    "spell:SPELL_ACT": "crystal",
    "spell:SPELL_IMPROVE": "prismatic",
    "spell:SPELL_QUALITY": "crystal",
    "spell:SPELL_COMMUNICATE": "crystal",
    "spell:SPELL_BOND": "prismatic",
    "spell:SPELL_EXPLAIN": "crystal",
    "spell:SPELL_DRAFT": "crystal",
    "spell:SPELL_STACK": "crystal",
    "spell:SPELL_HOOK": "crystal",
    "spell:SPELL_AMPLIFY": "prismatic",
    "spell:SPELL_RALLY": "crystal",
    "custom:CUSTOM_BOOST": "glass",
  },
  customActions: [
    {
      id: "CUSTOM_BOOST",
      name: "Boost",
      lensId: "encourage",
      accent: "pink",
      hint: "A custom pick-me-up — warmth without a lecture",
    },
    ...CONTENT_TOPIC_ACTIONS,
  ],
};

export const LOADOUT_EMPTY: LoadoutData = {
  bars: { planning: [], implementation: [], improvement: [] },
  pages: [
    {
      id: "PAGE_PRIMARY",
      name: "Primary",
      icon: "🎯",
      color: "#15803d",
      groups: [
        {
          id: "G_PRIMARY",
          label: "Primary",
          color: "#15803d",
          grid: "tri",
          slots: [null, null, null],
        },
      ],
    },
  ],
  activePageId: "PAGE_PRIMARY",
  activeBindingTemplateId: "primary",
  swipe: {
    up: null,
    "up-right": null,
    right: null,
    "down-right": null,
    down: null,
    "down-left": null,
    left: null,
    "up-left": null,
  },
  quality: {},
  customActions: [],
};
