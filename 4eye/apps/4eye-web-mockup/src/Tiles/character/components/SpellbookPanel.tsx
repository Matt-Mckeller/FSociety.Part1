"use client";

/**
 * SpellbookPanel — the spell book as it appears on the Character lens, in
 * whichever of its two readings you prefer.
 *
 * The full `SpellbookTile` is its own surface: header, preset selector,
 * toolbar, keypad grid. Dropping that into a column of panels would put a
 * second page inside the page. Both views here are simplified reads of the same
 * data, and they answer different questions:
 *
 * - `browse` — every castable spell, grouped by category, one compact row each.
 *   Answers "what exists, and what am I carrying?" It is dense on purpose.
 * - `equipped` — only what is equipped, as lens-glyph chips. Answers "what can I
 *   cast right now?" at a glance. This is the original treatment, kept because
 *   the dense list trades away the thing the chips were good at: the glyphs are
 *   recognisable at a distance in a way a column of 0.72rem rows is not.
 *
 * Which one belongs here is genuinely arguable, so it ships as a control rather
 * than as a decision — the same call `ActionBand` makes about its arrangement.
 * `browse` stays the default because the panel sits in a browsing column.
 *
 * It sits before Skills & Mastery and before Equipment because casting is the
 * thing you actually came to do; gear and progression describe what you can
 * cast *with*.
 *
 * Reading straight from the seed keeps this independent of `SpellbookProvider`
 * — the panel is a browse-and-jump view, and anything that needs real spellbook
 * state opens the full surface.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { SPELLBOOK_SEED } from "@4eye/web/Tiles/spellbook/store/seed-data";
import { SPELL_CATEGORIES, SPELL_CATEGORY_META, type Spell, type SpellCategory } from "@4eye/web/Tiles/spellbook/model/types";
import { SpellGlyph } from "@4eye/web/Tiles/spellbook/components/SpellGlyphs";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";
import { useCharacter } from "../store/CharacterProvider";
import { useChannelInks } from "../theme/characterPalette";
import { Empty } from "./shared/EquipSlot";
import { ShowMore } from "./shared/ShowMore";

export const SPELLBOOK_VIEWS = ["browse", "equipped"] as const;
export type SpellbookView = (typeof SPELLBOOK_VIEWS)[number];

/**
 * How many rows a category shows before "show all": everything equipped in it,
 * and at least one either way.
 *
 * Nine categories at three rows each was still two thirds of a screen, and it
 * sat beside Equipment, which is a dozen chips — the pair left a hole. This
 * rule answers both questions the panel is asked at the size of the smaller
 * one: *what am I carrying* completely, because every equipped spell survives
 * the cut, and *what exists* as a sample, because every category still shows a
 * row and its own count. Thirty-seven spells collapse to about eleven rows.
 */
function headCount(equippedInCategory: number): number {
  return Math.max(1, equippedInCategory);
}

function SpellRow({ spell, equipped, tone }: { spell: Spell; equipped: boolean; tone: string }) {
  const c = SPELL_CATEGORY_META[spell.category].color;

  return (
    <Tooltip title={spell.details} arrow placement="left">
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1,
          px: 0.75,
          py: 0.5,
          borderRadius: 1.5,
          cursor: "default",
          transition: "background-color .15s",
          "&:hover": { bgcolor: alpha(c, 0.06) },
        }}
      >
        <Box sx={{ color: c, display: "inline-flex", lineHeight: 0, flexShrink: 0 }}>
          <SpellGlyph id={spell.id} size={14} title={spell.name} />
        </Box>
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: equipped ? 800 : 600,
            color: equipped ? "text.primary" : "text.secondary",
            flexShrink: 0,
          }}
        >
          {spell.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.66rem",
            color: "text.disabled",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {spell.shortDescription}
        </Typography>
        {equipped && (
          <Typography
            sx={{
              fontSize: "0.55rem",
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              color: tone,
              flexShrink: 0,
            }}
          >
            Equipped
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
}

/**
 * The equipped-only reading: a lens glyph and a name per chip.
 *
 * Lifted from the original `EquippedSpells` without its `Section` shell — the
 * enclosing `Panel` already supplies the title and the header actions, and
 * nesting the two would draw the heading twice.
 */
const SPELL_BY_ID: Record<string, Spell> = Object.fromEntries(
  SPELLBOOK_SEED.spells.map((s) => [s.id, s]),
);

function SpellChip({ spell, tone }: { spell: Spell; tone: string }) {
  const accent = SPELL_CATEGORY_META[spell.category].color;

  return (
    <Tooltip title={spell.shortDescription} arrow>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
          px: 1,
          height: 32,
          borderRadius: 1.5,
          bgcolor: alpha(tone, 0.08),
          border: `1px solid ${alpha(tone, 0.28)}`,
        }}
      >
        <Box sx={{ color: accent, display: "inline-flex", lineHeight: 0 }}>
          <SpellGlyph id={spell.id} size={16} title={spell.name} />
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", whiteSpace: "nowrap" }}>
          {spell.name}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

function EquippedView({ tone }: { tone: string }) {
  const { character } = useCharacter();
  const spells = character.equippedSpells
    .map((e) => SPELL_BY_ID[e.spellId])
    .filter((s): s is Spell => Boolean(s));

  if (spells.length === 0) {
    return <Empty label="No spells equipped — open the Spellbook to learn some." />;
  }

  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
      {spells.map((s) => (
        <SpellChip key={s.id} spell={s} tone={tone} />
      ))}
    </Stack>
  );
}

function BrowseView({ tone, accent }: { tone: string; accent: string }) {
  const { character } = useCharacter();
  const [expanded, setExpanded] = React.useState(false);
  const equippedIds = new Set(character.equippedSpells.map((s) => s.spellId));

  // Only categories that actually have spells, in the registry's own order.
  // Equipped first inside each category, so the capped head is never the part
  // you do not have.
  const groups = SPELL_CATEGORIES.map((cat: SpellCategory) => ({
    cat,
    spells: SPELLBOOK_SEED.spells
      .filter((s) => s.category === cat)
      .sort((a, b) => Number(equippedIds.has(b.id)) - Number(equippedIds.has(a.id))),
  })).filter((g) => g.spells.length > 0);

  const headOf = (spells: Spell[]) =>
    headCount(spells.filter((s) => equippedIds.has(s.id)).length);

  const total = groups.reduce((n, g) => n + g.spells.length, 0);
  const shown = expanded
    ? total
    : groups.reduce((n, g) => n + Math.min(headOf(g.spells), g.spells.length), 0);

  return (
    <Stack sx={{ gap: 1.25 }}>
      {groups.map(({ cat, spells }) => {
        const meta = SPELL_CATEGORY_META[cat];
        const rows = expanded ? spells : spells.slice(0, headOf(spells));
        return (
          <Box key={cat}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.6, mb: 0.4, px: 0.75 }}>
              <Box sx={{ width: 3, height: 10, borderRadius: 0.5, bgcolor: meta.color, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontSize: "0.58rem",
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  color: "text.disabled",
                }}
              >
                {meta.label}
              </Typography>
              <Typography sx={{ fontSize: "0.58rem", color: "text.disabled", fontVariantNumeric: "tabular-nums" }}>
                {rows.length < spells.length ? `${rows.length}/${spells.length}` : spells.length}
              </Typography>
            </Stack>
            {rows.map((s) => (
              <SpellRow key={s.id} spell={s} equipped={equippedIds.has(s.id)} tone={tone} />
            ))}
          </Box>
        );
      })}

      <ShowMore
        capped={{
          expanded,
          toggle: () => setExpanded((v) => !v),
          hidden: total - shown,
          total,
        }}
        accent={accent}
        noun="spells"
      />
    </Stack>
  );
}

/**
 * The panel itself: the view control, then whichever view is chosen.
 *
 * The control sits in the body rather than in the `Panel` header actions
 * because the choice and the content have to share one piece of state, and
 * `usePersistedChoice` is per-instance — two hooks on the same key would write
 * the same storage slot but keep separate React state and drift apart on click.
 * `ActionBand` puts its control in the same place for the same reason.
 */
export function SpellbookPanel({ accent }: { accent: string }) {
  const [view, setView] = usePersistedChoice<SpellbookView>(
    "4eye.character.spellbookView",
    "browse",
    SPELLBOOK_VIEWS,
  );
  const channels = useChannelInks();
  const tone = channels.invoked.ink;

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "flex-end", alignItems: "center", mb: 0.75 }}>
        <CycleControl
          label="Spell book view"
          value={view}
          options={SPELLBOOK_VIEWS}
          accent={accent}
          onChange={setView}
        />
      </Stack>

      {view === "equipped" ? <EquippedView tone={tone} /> : <BrowseView tone={tone} accent={accent} />}
    </Box>
  );
}

/**
 * Header action: the way through to the full spellbook.
 *
 * The spellbook is an overlay rather than a route — the same one the Cast
 * action opens — so this dispatches instead of navigating.
 */
export function SpellbookPanelLink() {
  const { dispatch } = useCharacter();
  return (
    <Box
      component="button"
      type="button"
      onClick={() => dispatch({ type: "open-spellbook" })}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.4,
        border: 0,
        p: 0,
        m: 0,
        bgcolor: "transparent",
        font: "inherit",
        cursor: "pointer",
        fontSize: "0.62rem",
        fontWeight: 800,
        color: "text.secondary",
        "&:hover": { color: "text.primary" },
      }}
    >
      Open full
      <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
    </Box>
  );
}
