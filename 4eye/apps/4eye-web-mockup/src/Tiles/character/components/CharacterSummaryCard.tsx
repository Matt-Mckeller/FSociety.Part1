"use client";

/**
 * Character — Summary Card.
 *
 * Pinned at the top of the Core tab. Shows level, the emotion lens, the
 * attribute mini-bars (Emotional Intelligence / Technology / Power), active
 * buff badges, and equipped aura orbs.
 *
 * The emotion is the interactive element. It is not a status readout you glance
 * at — it is a switch, and switching it changes what the card thinks is worth
 * showing. See `model/emotions.ts` for the lenses themselves; the short version
 * is that Drive (Excited / Motivated / Angry) leads the lived topography;
 * Create / Relate / See / Regulate organise the rest. Happy still surfaces
 * creating / goals / vision / learning (with partnership and money as named
 * wants). Axes stay valence × arousal for teaching.
 *
 * The visual treatment of the emotion deliberately did not change much — it was
 * already right. What changed is that the LVL and emotion pills are now built
 * from one shared `Pill`, so they share height, radius, padding and alpha ramp
 * and differ only in hue. Previously the level sat in a bordered pill while the
 * mood was a bare dot-and-text at a different optical weight, which is what made
 * the pairing read as misaligned.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { ChevronIcon } from "@4eye/icons";

import { perkHoverHint } from "../model/perks";
import { auraHoverHint } from "./Auras";
import { useProfileStore, useEffectiveAttributes } from "../store/CharacterProfileStore";
import { useCharacterOptional } from "../store/CharacterProvider";
import { useOpenEmotionInspect } from "@4eye/web/components/hud/state";
import { ATTRIBUTES, formatAttributeMark, tierIndex } from "../model/attributes";
import { HABITS } from "../model/habits";
import { MOOD_META, type MoodLabel } from "../model/status";
import {
  useCharacterAuras,
  useCharacterPerks,
  useCharacterSeedEffects,
  useCharacterStatus,
  useFeaturedPerkIds,
} from "../store/useCharacterPresentation";
import { EMOTION_ORDER, emotionLens, emotionMeta, lensIdForMood } from "../model/emotions";
import { dossiersForEmotion } from "../model/emotion-inspect";
import { CHARACTER_ACCENT, CHARACTER_COLORS } from "../theme/tokens";
import { formatLevelMark } from "@yen/content/character/types";
import { CypherAttributeTier } from "./shared/CypherAttributeTier";

/** Summary attribute bar fill — neutral black, not per-attribute hue. */
const ATTR_BAR_COLOR = "#000";

/* ──────────────────────────────────────────────────── pills */

/**
 * The shared shell behind both the LVL badge and the emotion badge. Having one
 * component own the geometry is the fix for the two of them not lining up: they
 * cannot drift apart if there is only one set of numbers.
 */
function Pill({
  color,
  active = true,
  onClick,
  children,
  sx,
}: {
  color: string;
  /** Inactive pills drop to a flat neutral so the active one carries the hue. */
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  sx?: object;
}) {
  const interactive = Boolean(onClick);
  return (
    <Box
      component={interactive ? "button" : "div"}
      type={interactive ? "button" : undefined}
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        height: 26,
        px: 1,
        py: 0,
        m: 0,
        borderRadius: 1.5,
        font: "inherit",
        bgcolor: alpha(color, active ? 0.12 : 0.05),
        border: "1px solid",
        borderColor: alpha(color, active ? 0.3 : 0.15),
        flexShrink: 0,
        ...(interactive && {
          cursor: "pointer",
          transition: "background-color .15s, border-color .15s",
          "&:hover": { bgcolor: alpha(color, 0.2), borderColor: alpha(color, 0.45) },
          "&:focus-visible": { outline: `2px solid ${alpha(color, 0.6)}`, outlineOffset: 2 },
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Mood readout pills. The primary mood opens the lens picker; additional
 * simultaneous moods sit beside it so the card can show the full set.
 */
function MoodReadoutPill({
  mood,
  intensity,
  open,
  onToggle,
}: {
  mood: MoodLabel;
  intensity: number;
  open?: boolean;
  onToggle?: () => void;
}) {
  const meta = MOOD_META[mood];
  if (!meta) return null;
  const c = meta.color;
  const interactive = Boolean(onToggle);
  return (
    <Tooltip
      title={
        interactive
          ? open
            ? "Close lens picker"
            : `${meta.label} · ${intensity}% — switch lens`
          : `${meta.label} · ${intensity}%`
      }
      arrow
    >
      <Box sx={{ display: "flex" }}>
        <Pill
          color={c}
          onClick={onToggle}
          sx={meta.chipBg ? { bgcolor: meta.chipBg, borderColor: c } : undefined}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: c,
              boxShadow: `0 0 8px ${alpha(c, 0.7)}`,
              flexShrink: 0,
            }}
          />
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, color: c, lineHeight: 1 }}>
            {meta.label}
          </Typography>
        </Pill>
      </Box>
    </Tooltip>
  );
}

/** The lens picker — one dot per lensed emotion, revealed under the badge. */
function EmotionPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <Stack
      direction="row"
      sx={{ flexWrap: "wrap", gap: 0.5, mb: 1.25 }}
      role="radiogroup"
      aria-label="Emotion lens"
    >
      {EMOTION_ORDER.map((id) => {
        const meta = emotionMeta(id);
        if (!meta) return null;
        const selected = id === value;
        return (
          <Tooltip key={id} title={emotionLens(id).premise} arrow>
            <Box sx={{ display: "flex" }}>
              <Pill
                color={meta.color}
                active={selected}
                onClick={() => onChange(id)}
                sx={{ height: 22, px: 0.75 }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: selected ? meta.color : alpha(meta.color, 0.45),
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: selected ? 800 : 600,
                    color: selected ? meta.color : "text.disabled",
                    lineHeight: 1,
                  }}
                >
                  {meta.label}
                </Typography>
              </Pill>
            </Box>
          </Tooltip>
        );
      })}
    </Stack>
  );
}

const COMMAND_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

/**
 * Identity readout on the summary card: a command-style description, then the
 * highlight that used to sit as emotion-channel details under it.
 */
function SummaryIdentity({
  emotion,
  onInspect,
}: {
  emotion: string;
  onInspect?: () => void;
}) {
  const c = emotionMeta(emotion)?.color ?? "#64748b";
  const hasDossier = dossiersForEmotion(emotion).length > 0;
  return (
    <Box sx={{ mb: 1.25 }}>
      <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between", gap: 1, mb: 0.75 }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", fontSize: "0.62rem", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.25 }}
          >
            DESCRIPTION
          </Typography>
          <Typography
            sx={{
              fontFamily: COMMAND_FONT,
              fontSize: "0.82rem",
              fontWeight: 800,
              color: "text.primary",
              lineHeight: 1.3,
              letterSpacing: 0.2,
            }}
          >
            Time.Warp() + Game.On()
          </Typography>
        </Box>
        {onInspect ? (
          <Box
            component="button"
            type="button"
            onClick={onInspect}
            sx={{
              appearance: "none",
              cursor: "pointer",
              flexShrink: 0,
              m: 0,
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              border: "1px solid",
              borderColor: alpha(c, 0.35),
              bgcolor: alpha(c, 0.08),
              font: "inherit",
              fontSize: "0.58rem",
              fontWeight: 800,
              color: c,
              letterSpacing: 0.3,
              "&:hover": { bgcolor: alpha(c, 0.16), borderColor: alpha(c, 0.55) },
              "&:focus-visible": { outline: `2px solid ${alpha(c, 0.6)}`, outlineOffset: 2 },
            }}
          >
            {hasDossier ? "INSPECT" : "INSPECT LENS"}
          </Box>
        ) : null}
      </Stack>
      <Typography
        variant="caption"
        sx={{ color: "text.disabled", fontSize: "0.62rem", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.25 }}
      >
        HIGHLIGHTS
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, color: "text.primary", lineHeight: 1.35 }}>
        Continuous Evolution
      </Typography>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── attribute mini-bar */

/**
 * Summary attribute readout for the active emotion lens.
 *
 * Number stays neutral so a row of capped values does not become three identical
 * coloured "100"s. Bars use black fill so hue never competes with the labels;
 * when gear pushes past the display cap the uncapped total is shown so two
 * maxed attributes still differentiate.
 */
function AttrMiniBar({ attrId }: { attrId: string }) {
  const effective = useEffectiveAttributes();
  const prog = effective[attrId] ?? { base: 0, bonus: 0 };
  const raw = prog.base + prog.bonus;
  const infinite = !Number.isFinite(raw);
  const val = infinite ? 100 : Math.min(100, raw);
  const attr = ATTRIBUTES.find((a) => a.id === attrId);
  const tier = tierIndex(raw);
  if (!attr) return null;

  return (
    <Tooltip
      title={`${attr.label}: ${formatAttributeMark(raw)}${Number.isFinite(prog.bonus) && prog.bonus > 0 ? ` (${formatAttributeMark(prog.base)} + ${prog.bonus} gear)` : ""} · ${attr.tiers[tier]}`}
      arrow
    >
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", gap: 0.5 }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.58rem", fontWeight: 700, letterSpacing: 0.3, minWidth: 0 }}
            noWrap
          >
            {attr.label.toUpperCase()}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "0.72rem",
              fontWeight: 800,
              color: "text.primary",
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}
          >
            {formatAttributeMark(raw)}
          </Typography>
        </Stack>
        <Box sx={{ mt: 0.3, height: 5, borderRadius: 1, bgcolor: alpha(ATTR_BAR_COLOR, 0.12), overflow: "hidden" }}>
          <Box
            sx={{
              width: `${val}%`,
              height: "100%",
              bgcolor: ATTR_BAR_COLOR,
              borderRadius: 1,
              opacity: 0.85,
            }}
          />
        </Box>
        <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: "text.secondary", mt: 0.15 }}>
          <CypherAttributeTier attrId={attrId} tier={attr.tiers[tier]} fontSize="0.58rem" />
        </Typography>
      </Box>
    </Tooltip>
  );
}

/* ──────────────────────────────────────────────────── aura orb */

function AuraOrb({
  auraId,
  color,
  label,
  dim = false,
  emphasize = false,
}: {
  auraId: string;
  color: string;
  label: string;
  /** True when the active emotion lens does not resonate with this aura. */
  dim?: boolean;
  /** Soft lift when the emotion lens resonates — never mutes other auras. */
  emphasize?: boolean;
}) {
  const { state } = useProfileStore();
  const auras = useCharacterAuras();
  const aura = auras.find((a) => a.id === auraId);
  const stored = state.auraLevels[auraId];
  const level = stored !== undefined ? stored : aura ? aura.degrees.length - 1 : -1;
  if (!aura || level < 0) return null;
  const featured = Boolean(aura.important || aura.alwaysOn || emphasize);
  const muted = dim && !featured;

  return (
    <Tooltip title={auraHoverHint(aura)} arrow>
      <Box
        sx={{
          width: featured ? 32 : 28,
          height: featured ? 32 : 28,
          borderRadius: "50%",
          bgcolor: alpha(color, muted ? 0.06 : featured ? 0.22 : 0.15),
          border: featured ? "2px solid" : "1.5px solid",
          borderColor: alpha(color, muted ? 0.2 : featured ? 0.85 : 0.55),
          boxShadow: muted ? "none" : `0 0 ${featured ? 12 : 8}px ${alpha(color, featured ? 0.55 : 0.4)}`,
          opacity: muted ? 0.5 : 1,
          transition: "opacity .2s, background-color .2s, border-color .2s, box-shadow .2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
          flexShrink: 0,
        }}
      >
        <Box component="span" sx={{ color, display: "flex" }}><aura.Glyph size={featured ? 16 : 14} /></Box>
      </Box>
    </Tooltip>
  );
}

/* ──────────────────────────────────────────────────── buff badge */

function BuffBadge({
  label,
  color,
  emoji,
  command = false,
  hint,
  important = false,
}: {
  label: string;
  color: string;
  emoji?: string;
  /** Command-style perk labels render in mono. */
  command?: boolean;
  /** Hover copy — examples for perks, otherwise the label. */
  hint?: string;
  /** Standing / featured effect — stronger ring so the shield cannot be missed. */
  important?: boolean;
}) {
  return (
    <Tooltip title={hint ?? label} arrow>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.4,
          px: 0.8,
          py: 0.3,
          borderRadius: 1,
          bgcolor: alpha(color, important ? 0.16 : 0.1),
          border: important ? "1.5px solid" : "1px solid",
          borderColor: alpha(color, important ? 0.55 : 0.3),
          boxShadow: important ? `0 0 10px ${alpha(color, 0.28)}` : "none",
          cursor: "default",
          flexShrink: 0,
        }}
      >
        {emoji && <Typography sx={{ fontSize: "0.65rem", lineHeight: 1 }}>{emoji}</Typography>}
        <Typography
          sx={{
            fontSize: "0.6rem",
            fontWeight: 800,
            color,
            lineHeight: 1.25,
            fontFamily: command ? COMMAND_FONT : undefined,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/* ──────────────────────────────────────────────────── summary card */

/** Tab keys the summary card can jump to (mirrors CharacterProfileSections). */
export type SummaryNavTarget = "today" | "core" | "gear" | "mind" | "life";

/** Pinned summary stats — not emotion-lens driven. */
const SUMMARY_ATTRIBUTES = ["emotional-intelligence", "technology", "power"] as const;

export function CharacterSummaryCard({
  onNavigate,
}: {
  /** When provided, orbs/bars become tap-to-jump affordances. */
  onNavigate?: (tab: SummaryNavTarget) => void;
} = {}) {
  const { state } = useProfileStore();
  const characterCtx = useCharacterOptional();
  const openEmotionInspect = useOpenEmotionInspect();
  const effective = useEffectiveAttributes();
  const status = useCharacterStatus();
  const auras = useCharacterAuras();

  // Prefer the shared CharacterProvider emotion so Inspect and the lens agree.
  // Fall back to local state when the card mounts outside Character (stories).
  const [localEmotion, setLocalEmotion] = React.useState<string>(
    lensIdForMood(status.mood),
  );
  const emotion = characterCtx?.state.activeEmotionId ?? localEmotion;
  const setEmotion = (id: string) => {
    if (characterCtx) characterCtx.dispatch({ type: "set-emotion", id });
    else setLocalEmotion(id);
  };
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [perksOpen, setPerksOpen] = React.useState(false);
  const lens = emotionLens(emotion);
  const openInspect = () => openEmotionInspect(emotion);

  const seededEffects = useCharacterSeedEffects();
  const perks = useCharacterPerks();
  const featuredIds = useFeaturedPerkIds();
  // Standing wards (important) are global defaults — skip them on the card.
  const activeBuffs = (seededEffects ?? state.activeEffects)
    .filter((e) => e.kind === "buff" && !e.important)
    .slice(0, 6);
  const featuredPerks = featuredIds
    .map((id) => perks.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.unlocked));
  const equippedAuras = [...auras.filter((a) => {
    const stored = state.auraLevels[a.id];
    const level = stored !== undefined ? stored : a.degrees.length - 1;
    return level >= 0;
  })].sort((a, b) => Number(!!b.important || !!b.alwaysOn) - Number(!!a.important || !!a.alwaysOn));

  // Equipped auras stay fully lit. Emotion resonance only lifts matching orbs —
  // it must not mute the rest (that read as "turned off" on the profile).
  const resonant = new Set(lens.auras);

  // Compute overall "level" as average of the top 5 effective attribute values
  const topValues = ATTRIBUTES.map((a) => {
    const p = effective[a.id] ?? { base: 0, bonus: 0 };
    const v = p.base + p.bonus;
    return Number.isFinite(v) ? Math.min(100, v) : Infinity;
  }).sort((a, b) => b - a).slice(0, 5);
  const characterLevel = characterCtx?.character.level;
  const finiteTop = topValues.filter((v) => Number.isFinite(v));
  const avgLevel =
    finiteTop.length === 0
      ? Infinity
      : Math.round(finiteTop.reduce((s, v) => s + v, 0) / finiteTop.length);
  const levelMark =
    characterLevel !== undefined && !Number.isFinite(characterLevel)
      ? formatLevelMark(characterLevel)
      : !Number.isFinite(avgLevel)
        ? "∞"
        : String(avgLevel);

  const equippedHabitIds = HABITS.filter((h) => state.habitEquipped[h.id] ?? h.equipped).map((h) => h.id);
  const completedHabits = equippedHabitIds.filter((id) => (state.habitState[id]?.progress ?? 0) >= 1).length;
  const totalHabits = equippedHabitIds.length;

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2.5,
        border: "1.5px solid",
        borderColor: alpha(CHARACTER_ACCENT, 0.2),
        background: `linear-gradient(135deg, ${alpha(CHARACTER_ACCENT, 0.04)} 0%, ${alpha(CHARACTER_COLORS.arcane, 0.03)} 100%)`,
        mb: 1,
      }}
    >
      {/*
        Status bar — level, emotion lens, aura orbs. Owns a full row so the
        three readouts scan as one strip rather than wrapping beside the
        attribute grid. Values are unchanged.
      */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1,
          mb: 1.25,
          flexWrap: "wrap",
          width: "100%",
          px: 1,
          py: 0.75,
          mx: -0.5,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: alpha(CHARACTER_ACCENT, 0.16),
          bgcolor: alpha(CHARACTER_ACCENT, 0.04),
        }}
      >
        <Pill color={CHARACTER_ACCENT}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "text.disabled", lineHeight: 1 }}>LVL</Typography>
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 900, color: CHARACTER_ACCENT, lineHeight: 1 }}>{levelMark}</Typography>
        </Pill>

        <MoodReadoutPill
          mood={status.mood}
          intensity={status.moodIntensity}
          open={pickerOpen}
          onToggle={() => setPickerOpen((o) => !o)}
        />
        {(status.additionalMoods ?? []).map((m) => (
          <MoodReadoutPill key={m.id} mood={m.id} intensity={m.intensity} />
        ))}

        <Box sx={{ flex: 1 }} />

        {/* Aura orbs — resonant ones lift, per the active lens. */}
        <Stack direction="row" spacing={0.6} sx={{ flexShrink: 0 }}>
          {equippedAuras.map((a) => (
            <AuraOrb
              key={a.id}
              auraId={a.id}
              color={a.color}
              label={a.label}
              dim={false}
              emphasize={resonant.has(a.id)}
            />
          ))}
        </Stack>
      </Stack>

      {pickerOpen && <EmotionPicker value={emotion} onChange={setEmotion} />}

      <SummaryIdentity emotion={emotion} onInspect={openInspect} />

      {/* Attribute mini-bars — pinned EI / Technology / Power. Jump to Gear. */}
      <Box
        onClick={onNavigate ? () => onNavigate("gear") : undefined}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          mb: 1.25,
          borderRadius: 1.5,
          ...(onNavigate && {
            cursor: "pointer",
            mx: -0.5,
            px: 0.5,
            py: 0.25,
            transition: "background-color .15s",
            "&:hover": { bgcolor: alpha(CHARACTER_ACCENT, 0.05) },
          }),
        }}
      >
        {SUMMARY_ATTRIBUTES.map((id) => {
          const attr = ATTRIBUTES.find((a) => a.id === id);
          return attr ? <AttrMiniBar key={id} attrId={id} /> : null;
        })}
      </Box>

      {featuredPerks.length > 0 && (
        <Stack sx={{ gap: 0.45, mb: 1 }}>
          <Box
            component="button"
            type="button"
            onClick={() => setPerksOpen((o) => !o)}
            aria-expanded={perksOpen}
            sx={{
              appearance: "none",
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              m: 0,
              p: 0,
              border: "none",
              bgcolor: "transparent",
              cursor: "pointer",
              font: "inherit",
              alignSelf: "flex-start",
              "&:hover .perk-toggle-label": { color: "text.secondary" },
              "&:focus-visible": {
                outline: `2px solid ${alpha(CHARACTER_ACCENT, 0.6)}`,
                outlineOffset: 2,
                borderRadius: 0.5,
              },
            }}
          >
            <Box
              component={ChevronIcon}
              size={11}
              sx={{
                color: "text.disabled",
                flexShrink: 0,
                transition: "transform 180ms ease",
                transform: perksOpen ? "rotate(-90deg)" : "rotate(90deg)",
              }}
            />
            <Typography
              className="perk-toggle-label"
              variant="caption"
              sx={{
                color: "text.disabled",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: 0.4,
                transition: "color .15s",
              }}
            >
              PERKS
              {!perksOpen && (
                <Box component="span" sx={{ ml: 0.5, fontWeight: 600 }}>
                  · {featuredPerks.length}
                </Box>
              )}
            </Typography>
          </Box>
          <Collapse in={perksOpen} unmountOnExit>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5, pt: 0.25 }}>
              {featuredPerks.map((p) => (
                <BuffBadge key={p.id} label={p.label} color={p.color} command hint={perkHoverHint(p)} important={p.id === "shield"} />
              ))}
            </Stack>
          </Collapse>
        </Stack>
      )}

      {/* Active buffs */}
      {activeBuffs.length > 0 && (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5, mb: 1 }}>
          {activeBuffs.map((b) => (
            <BuffBadge key={b.id} label={b.label} color={b.color} emoji={b.emoji} important={b.important} />
          ))}
        </Stack>
      )}

      {/* Routine progress — jump to the Today tab. */}
      <Stack
        direction="row"
        onClick={onNavigate ? () => onNavigate("today") : undefined}
        sx={{
          alignItems: "center",
          gap: 1,
          borderRadius: 1.5,
          ...(onNavigate && {
            cursor: "pointer",
            mx: -0.5,
            px: 0.5,
            py: 0.25,
            transition: "background-color .15s",
            "&:hover": { bgcolor: alpha(CHARACTER_ACCENT, 0.05) },
          }),
        }}
      >
        <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.62rem", fontWeight: 700 }}>
          ROUTINE
        </Typography>
        <Box sx={{ flex: 1, height: 4, borderRadius: 1, bgcolor: alpha(CHARACTER_COLORS.success, 0.1), overflow: "hidden" }}>
          <Box
            sx={{
              width: `${totalHabits ? (completedHabits / totalHabits) * 100 : 0}%`,
              height: "100%",
              bgcolor: CHARACTER_COLORS.success,
              borderRadius: 1,
              transition: "width .4s ease",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: CHARACTER_COLORS.success, fontWeight: 800, fontSize: "0.62rem", flexShrink: 0 }}>
          {completedHabits}/{totalHabits}
        </Typography>
      </Stack>
    </Box>
  );
}
