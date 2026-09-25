"use client";

/**
 * EquippedSpells — the character's equipped spells + a Spellbook launcher.
 *
 * Resolves each equipped spell id against the Spellbook registry and renders a
 * compact spell chip (custom glyph + name). "Open Spellbook" dispatches the
 * overlay open action handled by the Character tile.
 */

import * as React from "react";
import { Box, Button, Stack, Tooltip, Typography, alpha } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import { SPELLBOOK_SEED, SPELL_CATEGORY_META, SpellGlyph, type Spell } from "@4eye/web/Tiles/spellbook";
import { useCharacter } from "../store/CharacterProvider";
import { useChannelInks } from "../theme/characterPalette";
import { Empty, Section } from "./shared/EquipSlot";

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

export function EquippedSpells() {
  const { character, dispatch } = useCharacter();
  const channels = useChannelInks();
  const tone = channels.invoked.ink;
  const spells = character.equippedSpells
    .map((e) => SPELL_BY_ID[e.spellId])
    .filter((s): s is Spell => Boolean(s));

  return (
    <Section
      title="Spells"
      action={
        <Button
          size="small"
          variant="text"
          startIcon={<AutoStoriesRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={() => dispatch({ type: "open-spellbook" })}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          Open Spellbook
        </Button>
      }
    >
      {spells.length > 0 ? (
        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
          {spells.map((s) => (
            <SpellChip key={s.id} spell={s} tone={tone} />
          ))}
        </Stack>
      ) : (
        <Box>
          <Empty label="No spells equipped — open the Spellbook to learn some." />
        </Box>
      )}
    </Section>
  );
}
