"use client";

/**
 * ResourceCornerHud — the live Mind/Body resource HUD docked to the bottom
 * corners (Mind = amber, bottom-left · Body = red, bottom-right). Replaces the
 * old XP/Coins/Energy header tiles on the Character & Profile screens.
 *
 * Mounted by the Character and Profile pages only (not globally), so the corner
 * widgets appear exactly on those two screens. Each widget is editable (pencil
 * in the detail view) via {@link ResourceBarsProvider}, which the page must
 * wrap around both this HUD and any Body-lens unlock calls.
 */

import * as React from "react";
import { ActionDock } from "@expanse/hud";

import { ResourceWidget } from "./ResourceWidget";
import {
  SharedKeyframes,
  MIND_ACCENT,
  BODY_ACCENT,
  MIND_WORDS,
  BODY_WORDS,
} from "./widgets";

export function ResourceCornerHud({
  /** Distance from the viewport corner; bump to clear other HUD chrome. */
  offset = 24,
}: {
  offset?: number;
} = {}) {
  return (
    <>
      <SharedKeyframes />
      <ActionDock position="bottom-left" offset={offset}>
        <ResourceWidget
          domain="mind"
          align="left"
          accent={MIND_ACCENT}
          centerGlyph="brain"
          centerWords={MIND_WORDS}
          detailTitle="MIND · NEUROTRANSMITTERS"
          neuralTitle="MIND MAP"
        />
      </ActionDock>
      <ActionDock position="bottom-right" offset={offset}>
        <ResourceWidget
          domain="body"
          align="right"
          accent={BODY_ACCENT}
          centerGlyph="heart"
          centerWords={BODY_WORDS}
          detailTitle="BODY · PRESENCE"
          neuralTitle="PRESENCE MAP"
        />
      </ActionDock>
    </>
  );
}
