"use client";

import * as React from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import {
  ACTION_BAR_KINDS,
  ACTION_BAR_META,
  QUALITY_TIERS,
  QUALITY_TIER_META,
  QualityBadge,
  actionKey,
  sameAction,
  useLoadoutOptional,
  type LoadoutActionRef,
} from "@4eye/web/components/loadout";
import { useCharacterOptional } from "@4eye/web/Tiles/character/store/CharacterProvider";

import { SPELL_CATEGORY_META, type Spell } from "../model/types";
import { SPELL_LANE_META, SPELL_PAIRS, spellLane, spellPlacement } from "../model/lanes";
import { useSpellbook } from "../store/SpellbookProvider";
import { SpellGlyph } from "./SpellGlyphs";

/** Invoked-channel cast ink — not every category rainbow. */
const CAST_INK = "#5b21b6";

function resolveAccent(spell: Spell): string {
  return SPELL_LANE_META[spellLane(spell)].color;
}

function SpellMark({ spell, size }: { spell: Spell; size: number }) {
  return (
    <Box sx={{ color: resolveAccent(spell), lineHeight: 0, display: "inline-flex" }}>
      <SpellGlyph id={spell.id} size={size} title={spell.name} />
    </Box>
  );
}

export function SpellCard({ spell }: { spell: Spell }) {
  const { state, dispatch, equippedIds } = useSpellbook();
  const character = useCharacterOptional();
  const accent = resolveAccent(spell);
  const expanded = state.expandedId === spell.id;
  const justCast = state.lastCastId === spell.id;
  const equipped = equippedIds.has(spell.id);
  const pair = SPELL_PAIRS[spell.id];
  const placement = spellPlacement(spell);
  const laneMeta = SPELL_LANE_META[placement.lane];
  const categoryMeta = SPELL_CATEGORY_META[spell.category];

  const loadout = useLoadoutOptional();
  const spellRef = React.useMemo<LoadoutActionRef>(
    () => ({ kind: "spell", spellId: spell.id }),
    [spell.id],
  );
  const quality = loadout?.state.quality[actionKey(spellRef)];
  const [saveAnchor, setSaveAnchor] = React.useState<HTMLElement | null>(null);
  const saveMenuOpenRef = React.useRef(false);
  const openSaveMenu = (e: React.MouseEvent<HTMLElement>) => {
    saveMenuOpenRef.current = true;
    setSaveAnchor(e.currentTarget);
  };
  const closeSaveMenu = () => {
    saveMenuOpenRef.current = false;
    setSaveAnchor(null);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      if (!saveMenuOpenRef.current) setAnchorEl(null);
    }, 130);
  };
  const handleCardEnter = (e: React.MouseEvent<HTMLElement>) => {
    cancelClose();
    setAnchorEl(e.currentTarget);
  };

  const popoverOpen = Boolean(anchorEl);
  const peer = pair ? state.spells.find((s) => s.id === pair.peerId) : null;

  const onCast = () => {
    const hint = character
      ? equipped
        ? "Equipped — Save to a bar or bind on the rose."
        : "Cast ✦ — Equip it on your character, or Save to a bar."
      : "Cast ✦ — Save to a bar from the menu.";
    dispatch({ type: "cast", id: spell.id, hint });
  };

  const onEquip = () => {
    character?.dispatch({ type: "toggle-equip-spell", spellId: spell.id });
  };

  return (
    <>
      <Box
        onMouseEnter={handleCardEnter}
        onMouseLeave={scheduleClose}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.75,
          p: 2,
          borderRadius: 2.5,
          border: "1px solid",
          borderColor: popoverOpen || justCast || equipped ? alpha(accent, 0.5) : "divider",
          bgcolor: popoverOpen || justCast ? alpha(accent, 0.04) : "background.paper",
          cursor: "pointer",
          textAlign: "center",
          position: "relative",
          transition: "border-color 140ms ease, background-color 140ms ease, box-shadow 140ms ease",
          boxShadow: popoverOpen ? `0 0 0 3px ${alpha(accent, 0.12)}` : "none",
          userSelect: "none",
        }}
      >
        <SpellMark spell={spell} size={40} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2, whiteSpace: "nowrap" }}
        >
          {spell.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.68rem",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {spell.shortDescription}
        </Typography>

        {spell.favorite && (
          <Box
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#f59e0b",
              boxShadow: (t) => `0 0 0 1.5px ${t.palette.background.paper}`,
            }}
          />
        )}
        {equipped && (
          <Typography
            sx={{
              position: "absolute",
              top: 5,
              left: 7,
              fontSize: "0.52rem",
              fontWeight: 900,
              letterSpacing: 0.4,
              color: CAST_INK,
              textTransform: "uppercase",
            }}
          >
            Eq
          </Typography>
        )}
        {quality && !equipped && (
          <Box sx={{ position: "absolute", top: 7, left: 7 }}>
            <QualityBadge tier={quality} size={9} />
          </Box>
        )}
      </Box>

      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        disableRestoreFocus
        disableAutoFocus
        disableEnforceFocus
        slotProps={{
          paper: {
            onMouseEnter: cancelClose,
            onMouseLeave: scheduleClose,
            elevation: 6,
            sx: {
              mt: 0.75,
              p: 1.5,
              borderRadius: 2.5,
              width: 268,
              border: "1px solid",
              borderColor: alpha(accent, 0.22),
              borderTop: `3px solid ${accent}`,
            },
          },
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, pr: 3.5 }}>
          <Box sx={{ flexShrink: 0, lineHeight: 0 }}>
            <SpellMark spell={spell} size={28} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
              {spell.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              {laneMeta.label}
              <Box component="span" sx={{ opacity: 0.55 }}>
                {" · "}
                {categoryMeta.label}
              </Box>
              {!spell.alwaysAvailable && (
                <Box component="span" sx={{ opacity: 0.55 }}>
                  {" · contextual"}
                </Box>
              )}
            </Typography>
          </Box>
        </Stack>

        <IconButton
          size="small"
          onClick={() => dispatch({ type: "toggle-favorite", id: spell.id })}
          sx={{ position: "absolute", top: 8, right: 8, p: 0.25 }}
        >
          {spell.favorite ? (
            <StarRoundedIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
          ) : (
            <StarBorderRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          )}
        </IconButton>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mt: 1, lineHeight: 1.4 }}
        >
          {spell.shortDescription}
        </Typography>

        {pair && peer && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.75,
              px: 0.75,
              py: 0.5,
              borderRadius: 1,
              bgcolor: alpha(accent, 0.06),
              color: "text.secondary",
              fontWeight: 600,
              lineHeight: 1.35,
            }}
          >
            Pairs with {peer.name} — {pair.note}
          </Typography>
        )}

        <Stack
          sx={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 0.5, mt: 1.25 }}
        >
          <Button
            size="small"
            variant="contained"
            disableElevation
            onClick={onCast}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.72rem",
              bgcolor: CAST_INK,
              "&:hover": { bgcolor: CAST_INK, filter: "brightness(0.93)" },
              minWidth: 60,
            }}
          >
            {justCast ? "Cast ✦" : "Cast"}
          </Button>
          {character && (
            <Button
              size="small"
              variant="text"
              startIcon={
                equipped ? (
                  <BookmarkAddedRoundedIcon sx={{ fontSize: 14 }} />
                ) : (
                  <BookmarkBorderRoundedIcon sx={{ fontSize: 14 }} />
                )
              }
              onClick={onEquip}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.72rem",
                color: equipped ? CAST_INK : "text.secondary",
              }}
            >
              {equipped ? "Equipped" : "Equip"}
            </Button>
          )}
          {loadout && (
            <Button
              size="small"
              variant="text"
              onClick={openSaveMenu}
              sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.72rem", color: "text.secondary" }}
            >
              Save
            </Button>
          )}
          <Button
            size="small"
            variant="text"
            onClick={() => dispatch({ type: "expand", id: expanded ? null : spell.id })}
            endIcon={
              <ExpandMoreRoundedIcon
                sx={{
                  fontSize: "16px !important",
                  transform: expanded ? "rotate(180deg)" : "none",
                  transition: "transform 150ms ease",
                }}
              />
            }
            sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.72rem", color: "text.secondary", ml: "auto" }}
          >
            Learn
          </Button>
        </Stack>

        {justCast && state.castHint && (
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, color: CAST_INK, fontWeight: 700, lineHeight: 1.35 }}
          >
            {state.castHint}
          </Typography>
        )}

        <Collapse in={expanded} unmountOnExit>
          <Box
            sx={{
              mt: 1,
              p: 1,
              borderRadius: 1.5,
              bgcolor: alpha(accent, 0.05),
              border: `1px solid ${alpha(accent, 0.16)}`,
            }}
          >
            <Typography variant="caption" sx={{ color: "text.primary", lineHeight: 1.45 }}>
              {spell.details}
            </Typography>
          </Box>
        </Collapse>
      </Popover>

      {loadout && (
        <Menu
          anchorEl={saveAnchor}
          open={Boolean(saveAnchor)}
          onClose={closeSaveMenu}
          slotProps={{ paper: { sx: { minWidth: 200 } } }}
        >
          {ACTION_BAR_KINDS.map((kind) => {
            const meta = ACTION_BAR_META[kind];
            const index = loadout.state.bars[kind].findIndex((r) => sameAction(r, spellRef));
            const saved = index >= 0;
            return (
              <MenuItem
                key={kind}
                dense
                onClick={() => {
                  if (saved) loadout.dispatch({ type: "remove-from-bar", bar: kind, index });
                  else loadout.dispatch({ type: "save-to-bar", bar: kind, ref: spellRef });
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color, mr: 1 }} />
                <ListItemText
                  primary={meta.label}
                  slotProps={{ primary: { sx: { fontWeight: 700, fontSize: "0.8rem" } } }}
                />
                {saved && <CheckRoundedIcon sx={{ fontSize: 16, color: meta.color, ml: 1 }} />}
              </MenuItem>
            );
          })}
          <Divider />
          <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mr: "auto" }}>
              Quality
            </Typography>
            {QUALITY_TIERS.map((tier) => {
              const meta = QUALITY_TIER_META[tier];
              const active = quality === tier;
              return (
                <Tooltip key={tier} title={meta.label} arrow>
                  <Box
                    component="button"
                    aria-label={`${meta.label} quality`}
                    onClick={() =>
                      loadout.dispatch({
                        type: "set-quality",
                        ref: spellRef,
                        tier: active ? null : tier,
                      })
                    }
                    sx={{
                      appearance: "none",
                      cursor: "pointer",
                      width: 16,
                      height: 16,
                      p: 0,
                      bgcolor: meta.color,
                      transform: "rotate(45deg)",
                      borderRadius: "3px",
                      border: "2px solid",
                      borderColor: active ? "text.primary" : "transparent",
                    }}
                  />
                </Tooltip>
              );
            })}
          </Box>
        </Menu>
      )}
    </>
  );
}
