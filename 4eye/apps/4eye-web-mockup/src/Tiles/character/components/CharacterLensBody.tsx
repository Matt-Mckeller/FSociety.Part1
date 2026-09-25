"use client";

/**
 * CharacterLensBody — the Character lens: act at the top, gear underneath.
 *
 * Lifted out of `LensBody`, which had grown a hundred-line `case` and is better
 * off as a router. Three things changed in the move:
 *
 * **The panels are arrangeable.** One-per-row read well for Tasks and Direction
 * and badly for Spell Book and Equipment, which are the same shape of thing —
 * two inventories you compare — and were stacked a screen apart. Rather than
 * pick once, the lens ships the three arrangements that are actually
 * defensible, the way the Surfaced lens ships its dashboard and density
 * choices: `paired` puts the natural couples side by side on desktop, `single`
 * is the full-width column, `flow` is the masonry that fits the most on screen.
 * The choice persists.
 *
 * **Every panel collapses and remembers it.** Skills & Mastery matters on the
 * day you are planning progression and is dead weight the rest of the time.
 *
 * **Length is controlled by heads, not by scrollbars.** Attributes, the spell
 * book, equipment and the locked perks each show a ranked head with "show all
 * N" underneath (see `shared/ShowMore`). Only Tasks still scrolls, because it
 * is a queue with no natural cut. The lens went from roughly four screens to
 * roughly one and a half without hiding a single thing behind a scroll box.
 *
 * Colour throughout follows `characterPalette`: the panel dot and title say
 * which channel the section belongs to — invoked, passive, equipped — and those
 * hues mean the same thing inside the panels as they do on the action band.
 */

import * as React from "react";
import { Box, Stack } from "@mui/material";

import { Panel } from "@4eye/web/components/surface";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

import { useChannelInks } from "../theme/characterPalette";
import { ActionBand } from "./ActionBand";
import { AttributesTable } from "./AttributesTable";
import { LearningStylesTable } from "./LearningStylesTable";
import {
  AurasGrid,
  AURA_PROGRESS_MAX,
  AURA_ACTIVE_DEFAULT,
  JANNA_AURAS,
  JANNA_AURA_PROGRESS_MAX,
  JANNA_AURA_ACTIVE_DEFAULT,
} from "./Auras";
import { AuraGlyphs, useAuraGlyphsVariant } from "./shared/AuraGlyphs";
import { useIsJannaProfile } from "../store/useCharacterPresentation";
import { TraitsGrid } from "./Traits";
import { DirectionPanel, PlanningLink } from "./DirectionPanel";
import { EquipmentPanel } from "./Equipment";
import { EquippedPipelines } from "./EquippedPipelines";
import { EquippedWorkList } from "./EquippedWorkList";
import { PerksGrid } from "./Perks";
import { SkillsTree } from "./SkillsTree";
import { SpellbookPanel, SpellbookPanelLink } from "./SpellbookPanel";

function AuraPanelBadge() {
  const { variant, cycle, canCycle } = useAuraGlyphsVariant();
  return (
    <Box
      onClick={
        canCycle
          ? (e) => {
              e.stopPropagation();
              cycle();
            }
          : undefined
      }
      sx={canCycle ? { cursor: "pointer", borderRadius: 1, "&:hover": { opacity: 0.88 } } : undefined}
      title={canCycle ? "Click to cycle aura view" : undefined}
    >
      <AuraGlyphs size={20} variant={variant} />
    </Box>
  );
}

export const PANEL_LAYOUTS = ["paired", "single", "flow"] as const;
export type PanelLayout = (typeof PANEL_LAYOUTS)[number];

/**
 * Which panels want to share a row in `paired`.
 *
 * Each pair is two readings of one question, so putting them side by side is
 * the comparison rather than a space saving that happens to work:
 *   Tasks | Direction    — what I am doing, next to the heading (not the Plan tile)
 *   Auras | Traits       — what I project, next to what I am
 *   Spell Book | Equipment — what I cast with, next to what I carry
 *   Pipelines              — equipped flows, by body layer (foundational / content / daily)
 *   Attributes | Learning  — where I stand, next to how I take things in
 *   Skills                 — where that standing is going
 *
 * Perks stays full width: it is a card grid that reflows on its own, and it is
 * the section that changes how everything else behaves.
 *
 * Auras and Traits moved here from the Core lens. Core is where the person is
 * summarised; these two are equipment in everything but name — both are tiered,
 * both cost Influence to advance, both modify attributes, and both are things
 * you choose and apply. They belong beside the other loadouts, and having them
 * a lens away from the perks and gear they interact with was the reason nobody
 * ever equipped one while looking at the other.
 */
const PAIRS: string[][] = [
  ["work", "direction"],
  ["perks"],
  ["auras", "traits"],
  ["spells", "equipment"],
  ["pipelines"],
  ["attributes", "learning"],
  ["skills"],
];

export function CharacterLensBody({ accent }: { accent: string }) {
  const [layout, setLayout] = usePersistedChoice<PanelLayout>(
    "4eye.character.panelLayout",
    "paired",
    PANEL_LAYOUTS,
  );
  const channels = useChannelInks();
  const isJanna = useIsJannaProfile();

  const panels: Record<string, React.ReactNode> = {
    work: (
      <Panel
        key="work"
        id="character-work"
        title="Tasks"
        description="Equipped work, heaviest first"
        // The one section that still scrolls: a task queue has no natural head,
        // and cutting it at five would hide the tail you are trying to clear.
        scroll={260}
      >
        <EquippedWorkList />
      </Panel>
    ),
    direction: (
      <Panel
        key="direction"
        id="character-direction"
        title="Direction"
        description="Heading today — not the Plan tile"
        actions={<PlanningLink />}
      >
        <DirectionPanel />
      </Panel>
    ),
    perks: (
      <Panel
        key="perks"
        id="character-perks.v2"
        title="Perks"
        description="Modifiers that change how the other sections behave"
        defaultCollapsed
      >
        <PerksGrid key={isJanna ? "janna" : "matthew"} accent={accent} />
      </Panel>
    ),
    /*
      Both carry the equipped channel's tone rather than the passive one. They
      look passive — you do not invoke an aura — but you choose them, apply
      them and pay to advance them, which is what the equipped hue means on the
      action band and inside Equipment.
    */
    auras: (
      <Panel
        key="auras"
        id="character-auras.v2"
        title="Auras"
        description="What you project, and what it costs to hold"
        tone={channels.equipped.ink}
        toneHint={channels.equipped.hint}
        defaultCollapsed
        actions={<AuraPanelBadge />}
      >
        <AurasGrid
          key={isJanna ? "janna" : "matthew"}
          auras={isJanna ? JANNA_AURAS : undefined}
          progress={isJanna ? JANNA_AURA_PROGRESS_MAX : AURA_PROGRESS_MAX}
          active={isJanna ? JANNA_AURA_ACTIVE_DEFAULT : AURA_ACTIVE_DEFAULT}
          cap={isJanna ? JANNA_AURAS.length : 6}
          plan={isJanna ? "Bond" : "Elite"}
          persistKey={isJanna ? "4eye:auras:janna:v2" : "4eye:auras:matthew:v4"}
        />
      </Panel>
    ),
    traits: (
      <Panel
        key="traits"
        id="character-traits.v2"
        title="Traits"
        description="Standing passives, by tier"
        tone={channels.equipped.ink}
        toneHint={channels.equipped.hint}
        defaultCollapsed
      >
        <TraitsGrid />
      </Panel>
    ),
    attributes: (
      <Panel
        key="attributes"
        id="character-attributes.v2"
        title="Attributes"
        description="Base value plus gear bonus, highest first · Mind · Heart · Drive · Body"
        tone={channels.passive.ink}
        toneHint={channels.passive.hint}
        defaultCollapsed
      >
        <AttributesTable accent={channels.passive.ink} />
      </Panel>
    ),
    learning: (
      <Panel
        key="learning"
        id="character-learning.v1"
        title="Learning styles & preferences"
        description="How you take things in — same ranked read as attributes"
        tone={channels.passive.ink}
        toneHint={channels.passive.hint}
        defaultCollapsed
      >
        <LearningStylesTable accent={channels.passive.ink} />
      </Panel>
    ),
    spells: (
      <Panel
        key="spells"
        id="character-spells.v2"
        title="Spell Book"
        description="Everything castable, or just what is equipped"
        tone={channels.invoked.ink}
        toneHint={channels.invoked.hint}
        actions={<SpellbookPanelLink />}
        defaultCollapsed
      >
        <SpellbookPanel accent={accent} />
      </Panel>
    ),
    equipment: (
      <Panel
        key="equipment"
        id="character-equipment.v2"
        title="Equipment"
        description="What is currently equipped, by slot"
        tone={channels.equipped.ink}
        toneHint={channels.equipped.hint}
        defaultCollapsed
      >
        <EquipmentPanel accent={accent} />
      </Panel>
    ),
    pipelines: (
      <Panel
        key="pipelines"
        id="character-pipelines.v1"
        title="Pipelines"
        description="Equipped flows, by layer and body slot"
        tone={channels.equipped.ink}
        toneHint={channels.equipped.hint}
      >
        <EquippedPipelines />
      </Panel>
    ),
    skills: (
      <Panel
        key="skills"
        id="character-skills.v2"
        title="Skills & Mastery"
        description="Progression across skill trees"
        defaultCollapsed
      >
        <SkillsTree />
      </Panel>
    ),
  };

  const order = PAIRS.flat();

  return (
    <Stack sx={{ gap: 3 }}>
      <ActionBand accent={accent} />

      <Box>
        <Stack direction="row" sx={{ justifyContent: "flex-end", mb: 1 }}>
          <CycleControl
            label="Panel layout"
            value={layout}
            options={PANEL_LAYOUTS}
            accent={accent}
            onChange={setLayout}
          />
        </Stack>

        {layout === "flow" ? (
          // Masonry: fits the most on screen, at the cost of the pairings — the
          // browser balances the columns, so which panel lands beside which is
          // whatever the heights happen to make it.
          <Box
            sx={{
              columnGap: 2,
              columnCount: { zero: 1, laptop: 2 },
              "& > *": { breakInside: "avoid", mb: 2 },
              "& > *:last-child": { mb: 0 },
            }}
          >
            {order.map((k) => (
              <Box key={k}>{panels[k]}</Box>
            ))}
          </Box>
        ) : layout === "single" ? (
          <Stack sx={{ gap: 2 }}>{order.map((k) => panels[k])}</Stack>
        ) : (
          <Stack sx={{ gap: 2 }}>
            {PAIRS.map((row) => (
              <Box
                key={row.join("+")}
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    zero: "1fr",
                    laptop: row.length > 1 ? "1fr 1fr" : "1fr",
                  },
                  // Panels in a pair collapse independently, so letting them
                  // stretch to a shared height would leave one of them a tall
                  // empty box the moment its neighbour is the taller one.
                  alignItems: "start",
                }}
              >
                {row.map((k) => panels[k])}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
