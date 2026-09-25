"use client";

/**
 * ChatActionsPanel — the Actions dock, sourced from the character spell book.
 *
 * Equipped spells are the catalog. Toggling one attaches that cast to the
 * next reply; changing the loadout itself still happens on the Character lens.
 */

import NextLink from "next/link";
import { Box, IconButton, Stack, Tooltip, Typography, alpha } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useContextActionBar } from "@4eye/features";
import { SPELL_CATEGORY_META, SpellGlyph } from "@4eye/web/Tiles/spellbook";
import { useCharacter } from "@4eye/web/Tiles/character/store/CharacterProvider";
import { useChannelInks } from "@4eye/web/Tiles/character/theme/characterPalette";
import { useSurface } from "@4eye/web/components/surface";
import { route } from "@4eye/web/lib/routes";
import { groupSpellsByCategory, resolveEquippedSpells } from "./spellActions";

export function ChatActionsPanel() {
  const surface = useSurface();
  const channels = useChannelInks();
  const tone = channels.invoked.ink;
  const { character } = useCharacter();
  const { actions, toggleAction, resetActions, enabledActions } = useContextActionBar();
  const enabled = new Set(actions.filter((a) => a.enabled).map((a) => a.id));
  const spells = resolveEquippedSpells(character.equippedSpells);
  const groups = groupSpellsByCategory(spells);

  return (
    <Stack sx={{ gap: 1.25, p: 1.25, color: surface.text.hi, height: "100%", minHeight: 0 }}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
            Spell book
          </Typography>
          <Typography sx={{ fontSize: 11, color: surface.text.lo }}>
            {spells.length} equipped
            {enabledActions.length > 0 ? ` · ${enabledActions.length} on this reply` : ""}
          </Typography>
        </Box>
        <Tooltip title="Clear casts on this reply" arrow>
          <IconButton
            size="small"
            onClick={resetActions}
            aria-label="Clear casts on this reply"
            sx={{ color: surface.text.lo }}
          >
            <RestartAltIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        {groups.length === 0 ? (
          <Typography sx={{ fontSize: "0.72rem", color: surface.text.faint, lineHeight: 1.45 }}>
            No spells equipped — open the character spell book to load a set.
          </Typography>
        ) : (
          <Stack sx={{ gap: 1.25 }}>
            {groups.map((group) => (
              <Box key={group.category}>
                <Stack direction="row" sx={{ alignItems: "center", gap: 0.6, mb: 0.4, px: 0.25 }}>
                  <Box
                    sx={{
                      width: 3,
                      height: 10,
                      borderRadius: 0.5,
                      bgcolor: group.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      color: surface.text.faint,
                    }}
                  >
                    {group.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.58rem",
                      color: surface.text.faint,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {group.spells.length}
                  </Typography>
                </Stack>
                {group.spells.map((spell) => {
                  const on = enabled.has(spell.id);
                  const accent = SPELL_CATEGORY_META[spell.category].color;
                  return (
                    <Tooltip key={spell.id} title={spell.details} arrow placement="left">
                      <Box
                        component="button"
                        type="button"
                        onClick={() => toggleAction(spell.id)}
                        aria-pressed={on}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          width: "100%",
                          px: 0.75,
                          py: 0.55,
                          border: 0,
                          borderRadius: 1.5,
                          bgcolor: on ? alpha(tone, 0.12) : "transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          font: "inherit",
                          color: "inherit",
                          transition: "background-color .15s",
                          "&:hover": { bgcolor: alpha(tone, on ? 0.16 : 0.06) },
                        }}
                      >
                        <Box sx={{ color: accent, display: "inline-flex", lineHeight: 0, flexShrink: 0 }}>
                          <SpellGlyph id={spell.id} size={14} title={spell.name} />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "0.72rem",
                            fontWeight: on ? 800 : 600,
                            color: on ? "text.primary" : "text.secondary",
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
                        {on && (
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
                            Cast
                          </Typography>
                        )}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      <Typography sx={{ fontSize: "0.68rem", color: surface.text.faint, lineHeight: 1.4 }}>
        {enabledActions.length > 0
          ? `Next reply casts ${enabledActions.map((a) => a.label).join(" · ")}`
          : "Tap a spell to cast it on the next reply"}
      </Typography>

      <Box
        component={NextLink}
        href={route("/appRealm/profile")}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          fontSize: 11,
          fontWeight: 700,
          color: tone,
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Open character spell book
        <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
      </Box>
    </Stack>
  );
}
