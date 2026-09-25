"use client";

/**
 * Character — Status (RAM + Memory + Cold Storage).
 *
 * Three panels:
 *  · RAM: active mood, context line, buffs/debuffs, recent significant events.
 *  · Memory: mid-term journal entries sorted by significance.
 *  · Cold Storage: formative long-term memories (identity-level).
 */

import * as React from "react";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

import {
  MOOD_META,
  type CharacterStatus,
  type StatusEffect,
  type MemoryEntry,
  type Want,
} from "../model/status";
import { EffectGlyph } from "./EffectGlyphs";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { useProfileStore } from "../store/CharacterProfileStore";
import { useCharacterSeedEffects, useCharacterStatus } from "../store/useCharacterPresentation";
import { formatDate } from "../lib/time";
import { LearnedResult, hasLearnedResult, learnedToggleLabel } from "./shared/LearnedResult";
import { CoinStackIcon, COIN_PALETTES } from "@expanse/brand-core";
import { significanceBand, VALENCE, BRAIN_ACCENT, LINK_KIND_COLOR } from "../theme/brainTokens";

/* --------------------------------------------------------------- mood chip */

function MoodChip({ mood, intensity }: { mood: string; intensity: number }) {
  const meta = MOOD_META[mood as keyof typeof MOOD_META];
  if (!meta) return null;
  // Chrome stays on Brain red; valence only tints the status dot.
  // Solid chips (angry black/red, optimistic gray/green) take their own fill.
  const valence =
    meta.valence === "positive"
      ? VALENCE.positive.color
      : meta.valence === "negative"
        ? VALENCE.negative.color
        : VALENCE.neutral.color;
  const c = meta.chipBg ? meta.color : BRAIN_ACCENT;
  const ink = meta.chipBg ? meta.color : "text.primary";
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        ...(meta.chipBg && {
          px: 1,
          py: 0.5,
          borderRadius: 999,
          bgcolor: meta.chipBg,
          border: "1px solid",
          borderColor: meta.color,
        }),
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: meta.chipBg ? meta.color : valence,
          boxShadow: `0 0 8px ${alpha(meta.chipBg ? meta.color : valence, 0.55)}`,
          flexShrink: 0,
        }}
      />
      <Typography variant="body2" sx={{ fontWeight: 800, color: ink }}>
        {meta.label}
      </Typography>
      <Box sx={{ flex: 1, height: 6, borderRadius: 1, bgcolor: alpha(c, 0.12), overflow: "hidden" }}>
        <Box sx={{ width: `${intensity}%`, height: "100%", bgcolor: c, borderRadius: 1 }} />
      </Box>
      <Typography variant="caption" sx={{ color: c, fontWeight: 800, flexShrink: 0 }}>
        {intensity}%
      </Typography>
    </Stack>
  );
}

/* ---------------------------------------------------------- effect badge */

function EffectBadge({ effect }: { effect: StatusEffect }) {
  const isBuff = effect.kind === "buff";
  // Buff / debuff ink from valence — not per-effect rainbow hues.
  const c = isBuff ? VALENCE.positive.color : VALENCE.negative.color;
  const now = Date.now();
  const expiresIn = effect.expiresAt ? effect.expiresAt - now : null;
  const expiresLabel =
    expiresIn == null
      ? "Permanent"
      : expiresIn < 3_600_000
        ? `${Math.ceil(expiresIn / 60_000)} min`
        : `${Math.ceil(expiresIn / 3_600_000)} hr`;

  return (
    <Tooltip
      title={
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.72rem" }}>{effect.label}</Typography>
          <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.8)" }}>{effect.description}</Typography>
          {(effect.attributeModifiers?.length ?? 0) > 0 && (
            <Box sx={{ mt: 0.5 }}>
              {effect.attributeModifiers!.map((m) => (
                <Typography
                  key={m.id}
                  sx={{
                    fontSize: "0.62rem",
                    color: m.delta > 0 ? VALENCE.positive.color : VALENCE.negative.color,
                  }}
                >
                  {m.label}: {m.delta > 0 ? "+" : ""}{m.delta}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      }
      arrow
    >
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: "center",
          px: 0.9,
          py: 0.45,
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(c, 0.3),
          bgcolor: alpha(c, 0.06),
        }}
      >
        {effect.glyph ? (
          <Box sx={{ color: c, display: "flex", alignItems: "center" }}>
            <EffectGlyph id={effect.glyph} size={16} title={effect.label} />
          </Box>
        ) : (
          <Typography sx={{ fontSize: "0.9rem" }}>{effect.emoji ?? (isBuff ? "✦" : "⚠")}</Typography>
        )}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", display: "block", lineHeight: 1.1 }}>
            {effect.label}
          </Typography>
          <Typography sx={{ fontSize: "0.58rem", color: "text.disabled", fontWeight: 600 }}>
            {expiresLabel}
          </Typography>
        </Box>
      </Stack>
    </Tooltip>
  );
}

/* ----------------------------------------------------------- memory card */

/**
 * Report-app reading of a memory: rank chip (significance → 1–10), valence as
 * good/hard/mixed, left border carrying tone. Same MemoryEntry model — denser
 * chrome so Brain Memory / RAM / Cold match how the report timeline ranks.
 */
function MemoryCard({ entry }: { entry: MemoryEntry }) {
  const valence =
    entry.valence === "positive"
      ? VALENCE.positive
      : entry.valence === "negative"
        ? VALENCE.negative
        : VALENCE.neutral;
  const band = significanceBand(entry.significance);

  const dateStr = formatDate(entry.occurredAt);
  const hasDepth = hasLearnedResult(entry);
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      onClick={hasDepth ? () => setOpen((o) => !o) : undefined}
      role={hasDepth ? "button" : undefined}
      tabIndex={hasDepth ? 0 : undefined}
      onKeyDown={
        hasDepth
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }
          : undefined
      }
      sx={{
        p: 1.1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: open ? alpha(valence.color, 0.4) : alpha(band.color, 0.22),
        borderLeft: `3px solid ${valence.color}`,
        bgcolor: "background.paper",
        display: "flex",
        gap: 1,
        ...(hasDepth && {
          cursor: "pointer",
          transition: "border-color .15s, background-color .15s",
          "&:hover": { bgcolor: alpha(valence.color, 0.03), borderColor: alpha(valence.color, 0.35) },
          "&:focus-visible": { outline: `2px solid ${alpha(valence.color, 0.6)}`, outlineOffset: 2 },
        }),
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between", gap: 1, mb: 0.25 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.25 }}>
            {entry.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled", whiteSpace: "nowrap", flexShrink: 0, fontSize: "0.6rem" }}>
            {dateStr}
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
          {entry.summary}
        </Typography>
        <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.4 }}>
          <Chip
            label={`${band.rank10}/10 · ${band.label}`}
            size="small"
            sx={{
              height: 17,
              fontSize: "0.58rem",
              fontWeight: 800,
              bgcolor: alpha(band.color, 0.12),
              color: band.color,
              border: "1px solid",
              borderColor: alpha(band.color, 0.3),
              "& .MuiChip-label": { px: 0.65 },
            }}
          />
          <Chip
            label={valence.short}
            size="small"
            sx={{
              height: 17,
              fontSize: "0.58rem",
              fontWeight: 800,
              bgcolor: alpha(valence.color, 0.1),
              color: valence.color,
              border: "1px solid",
              borderColor: alpha(valence.color, 0.28),
              "& .MuiChip-label": { px: 0.65 },
            }}
          />
          {entry.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ height: 16, fontSize: "0.58rem", fontWeight: 700, "& .MuiChip-label": { px: 0.6 } }}
            />
          ))}
          {hasDepth && (
            <Typography
              sx={{
                fontSize: "0.58rem",
                fontWeight: 800,
                color: alpha(valence.color, 0.9),
                ml: 0.2,
              }}
            >
              {learnedToggleLabel(open)}
            </Typography>
          )}
        </Stack>
        {open && <LearnedResult entry={entry} color={valence.color} />}
      </Box>
      <Box sx={{ flexShrink: 0, textAlign: "right", pt: 0.15, minWidth: 36 }}>
        <Typography sx={{ fontSize: "0.78rem", fontWeight: 900, color: band.color, fontVariantNumeric: "tabular-nums" }}>
          {entry.significance}
        </Typography>
        <Typography sx={{ fontSize: "0.55rem", color: "text.disabled", fontWeight: 700, letterSpacing: 0.3 }}>
          SIG
        </Typography>
      </Box>
    </Box>
  );
}

/* ----------------------------------------------------------------- RAM panel */

function RAMPanel({ status }: { status: CharacterStatus }) {
  const buffs = status.effects.filter((e) => e.kind === "buff");
  const debuffs = status.effects.filter((e) => e.kind === "debuff");
  const sorted = [...status.recentEvents].sort((a, b) => b.significance - a.significance);

  return (
    <Stack spacing={1.5}>
      {/* Mood */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.4, display: "block", mb: 0.5 }}>
          CURRENT MOOD
        </Typography>
        <Stack spacing={0.75}>
          <MoodChip mood={status.mood} intensity={status.moodIntensity} />
          {status.additionalMoods?.map((m) => (
            <MoodChip key={m.id} mood={m.id} intensity={m.intensity} />
          ))}
        </Stack>
      </Box>

      {/* Context */}
      <Box
        sx={{
          p: 1,
          borderRadius: 1.5,
          bgcolor: alpha(BRAIN_ACCENT, 0.06),
          border: "1px solid",
          borderColor: alpha(BRAIN_ACCENT, 0.2),
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
          "{status.currentContext}"
        </Typography>
      </Box>

      {/* Buffs */}
      {buffs.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.4, display: "block", mb: 0.5 }}>
            ACTIVE BUFFS
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
            {buffs.map((e) => <EffectBadge key={e.id} effect={e} />)}
          </Stack>
        </Box>
      )}

      {/* Debuffs */}
      {debuffs.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: VALENCE.negative.color, letterSpacing: 0.4, display: "block", mb: 0.5 }}>
            ACTIVE DEBUFFS
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
            {debuffs.map((e) => <EffectBadge key={e.id} effect={e} />)}
          </Stack>
        </Box>
      )}

      {/* Recent events */}
      {sorted.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.4, display: "block", mb: 0.5 }}>
            RECENT EVENTS
          </Typography>
          <Stack spacing={0.75}>
            {sorted.map((ev) => <MemoryCard key={ev.id} entry={ev} />)}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

/* --------------------------------------------------------------- memory panel */

function MemoryPanel({ entries }: { entries: MemoryEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.significance - a.significance);
  return (
    <Stack spacing={0.75}>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.25, lineHeight: 1.4 }}>
        Ranked by significance (report-style 1–10) · Good / Hard / Mixed from valence.
      </Typography>
      {sorted.map((e) => <MemoryCard key={e.id} entry={e} />)}
      {sorted.length === 0 && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          No memories recorded yet.
        </Typography>
      )}
    </Stack>
  );
}

/* ------------------------------------------------------ cold storage panel */

function ColdStoragePanel({ entries }: { entries: MemoryEntry[] }) {
  const sorted = [...entries].sort((a, b) => b.significance - a.significance);
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          p: 1,
          borderRadius: 1.5,
          bgcolor: alpha(BRAIN_ACCENT, 0.05),
          border: "1px solid",
          borderColor: alpha(BRAIN_ACCENT, 0.18),
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Long-term memories that shaped identity — ranked like the report timeline.
          Open one for the lesson and what it changed (supporting / hard refs live in valence).
        </Typography>
      </Box>
      <Stack spacing={0.75}>
        {sorted.map((e) => <MemoryCard key={e.id} entry={e} />)}
      </Stack>
    </Stack>
  );
}

/* --------------------------------------------------------------- wants panel */

const FORMULA_VISIBLE = 4;

function FormulaMark({ glyph, label, color }: { glyph: string; label: string; color: string }) {
  if (glyph === "coin-stack") {
    return (
      <Tooltip title={label} arrow>
        <Box sx={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
          <CoinStackIcon {...COIN_PALETTES.pink} size={16} title={null} />
        </Box>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={label} arrow>
      <Box sx={{ display: "flex", color, opacity: 0.9 }}>
        <EffectGlyph id={glyph} size={14} title={label} />
      </Box>
    </Tooltip>
  );
}

function WantCard({ want }: { want: Want }) {
  // Identity tint stays on the glyph + left rail; chrome is Brain red.
  const identity = want.color || BRAIN_ACCENT;
  const c = BRAIN_ACCENT;
  const hasDetails = Boolean(
    want.description ||
      want.blockedBy ||
      want.satisfiedBy?.length ||
      want.formula?.length ||
      want.links?.length,
  );
  const formula = want.formula ?? [];
  const formulaHead = formula.slice(0, FORMULA_VISIBLE);
  const formulaHidden = Math.max(0, formula.length - FORMULA_VISIBLE);
  const redirectLink = want.links?.find((l) => l.kind === "redirect");
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    if (hasDetails) setOpen((v) => !v);
  };

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: open ? alpha(c, 0.35) : alpha(c, 0.2),
        borderLeft: `3px solid ${identity}`,
        bgcolor: "background.paper",
        transition: "border-color .15s ease",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          cursor: hasDetails ? "pointer" : "default",
        }}
        onClick={toggle}
        role={hasDetails ? "button" : undefined}
        tabIndex={hasDetails ? 0 : undefined}
        aria-expanded={hasDetails ? open : undefined}
        onKeyDown={
          hasDetails
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              }
            : undefined
        }
      >
        <Box sx={{ color: identity, display: "flex", alignItems: "center", flexShrink: 0 }}>
          {want.glyph === "money" ? (
            <CoinStackIcon {...COIN_PALETTES.pink} size={18} title={want.label} />
          ) : (
            <EffectGlyph id={want.glyph} size={18} title={want.label} />
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              lineHeight: 1.25,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 0.45,
            }}
          >
            <FavoriteRoundedIcon sx={{ fontSize: 14, color: identity, flexShrink: 0 }} />
            {want.cypherWords && want.cypherWords.length > 1 ? (
              <MorphLabel
                motion="scramble"
                words={want.cypherWords}
                color={identity}
                active
                hold={2200}
                maxPasses={null}
                fontSize="0.875rem"
                weight={800}
                letterSpacing={0.3}
              />
            ) : (
              want.label
            )}
          </Typography>
          {!open && want.description && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.35,
              }}
            >
              {want.description}
            </Typography>
          )}
        </Box>
        {redirectLink && !open && (
          <Chip
            size="small"
            label={`→ ${redirectLink.label.split("·")[0].trim()}`}
            onClick={(e) => e.stopPropagation()}
            sx={{
              height: 18,
              fontSize: "0.55rem",
              fontWeight: 800,
              color: LINK_KIND_COLOR.redirect,
              bgcolor: alpha(LINK_KIND_COLOR.redirect, 0.1),
              border: `1px solid ${alpha(LINK_KIND_COLOR.redirect, 0.3)}`,
              flexShrink: 0,
              "& .MuiChip-label": { px: 0.65 },
            }}
          />
        )}
        <Box sx={{ width: 56, height: 6, borderRadius: 1, bgcolor: alpha(c, 0.12), overflow: "hidden", flexShrink: 0 }}>
          <Box sx={{ width: `${Math.min(want.intensity, 100)}%`, height: "100%", bgcolor: c, borderRadius: 1 }} />
        </Box>
        <Typography variant="caption" sx={{ color: c, fontWeight: 800, flexShrink: 0, minWidth: 22, textAlign: "right" }}>
          {want.intensity}
        </Typography>
        {hasDetails && (
          <IconButton
            size="small"
            aria-label={open ? `Collapse ${want.label}` : `Expand ${want.label}`}
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            sx={{
              p: 0.25,
              color: c,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform .18s ease",
            }}
          >
            <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Stack>

      <Collapse in={open} unmountOnExit>
        <Box sx={{ pt: 0.85, pl: 0.25 }}>
          {want.description && (
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.75, lineHeight: 1.45 }}>
              {want.description}
            </Typography>
          )}
          {(want.links?.length ?? 0) > 0 && (
            <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.4, mb: 0.65 }}>
              {want.links!.map((link) => {
                const lc = LINK_KIND_COLOR[link.kind];
                const prefix =
                  link.kind === "goal" ? "GOAL" : link.kind === "priority" ? "PRIORITY" : "→";
                return (
                  <Tooltip
                    key={`${link.kind}-${link.label}`}
                    title={
                      link.kind === "redirect"
                        ? "Redirect to Relationships — color and layout live on that chart"
                        : link.label
                    }
                    arrow
                  >
                    <Chip
                      size="small"
                      label={`${prefix} · ${link.label}`}
                      sx={{
                        height: 18,
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        letterSpacing: 0.2,
                        color: lc,
                        bgcolor: alpha(lc, 0.1),
                        border: `1px solid ${alpha(lc, 0.35)}`,
                        "& .MuiChip-label": { px: 0.7 },
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Stack>
          )}
          {formulaHead.length > 0 && (
            <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.45, mb: 0.65, color: c }}>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em" }}
              >
                FORMULA
              </Typography>
              {formulaHead.map((mark, i) => (
                <React.Fragment key={`${mark.glyph}-${mark.label}`}>
                  {i > 0 && (
                    <Typography
                      component="span"
                      sx={{ color: alpha(c, 0.45), fontSize: "0.65rem", fontWeight: 800, lineHeight: 1 }}
                    >
                      ·
                    </Typography>
                  )}
                  <FormulaMark glyph={mark.glyph} label={mark.label} color={c} />
                </React.Fragment>
              ))}
              {formulaHidden > 0 && (
                <Tooltip title="Maps onto Relationships — open that chart for the rest of the formula" arrow>
                  <Chip
                    size="small"
                    label={`+${formulaHidden} · Relationships`}
                    sx={{
                      height: 17,
                      fontSize: "0.55rem",
                      fontWeight: 800,
                      color: LINK_KIND_COLOR.redirect,
                      bgcolor: alpha(LINK_KIND_COLOR.redirect, 0.1),
                      border: `1px solid ${alpha(LINK_KIND_COLOR.redirect, 0.35)}`,
                      "& .MuiChip-label": { px: 0.65 },
                    }}
                  />
                </Tooltip>
              )}
            </Stack>
          )}
          {want.blockedBy && (
            <Typography variant="caption" sx={{ color: VALENCE.negative.color, display: "block", mb: 0.4 }}>
              <strong>Blocked by:</strong> {want.blockedBy}
            </Typography>
          )}
          {(want.satisfiedBy?.length ?? 0) > 0 && (
            <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.4, mt: 0.25 }}>
              <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, fontSize: "0.6rem" }}>
                FED BY
              </Typography>
              {want.satisfiedBy!.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  sx={{ height: 16, fontSize: "0.58rem", fontWeight: 700, "& .MuiChip-label": { px: 0.6 } }}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

function WantsPanel({ wants }: { wants: Want[] }) {
  return (
    <Stack spacing={0.6}>
      <Typography
        variant="caption"
        sx={{ color: alpha(BRAIN_ACCENT, 0.85), display: "block", mb: 0.25, fontWeight: 600, lineHeight: 1.45 }}
      >
        Loudest pulls right now — expand a card for formula, links, and blockers.
      </Typography>
      {wants.map((w) => (
        <WantCard key={w.id} want={w} />
      ))}
      {wants.length === 0 && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          No wants recorded — which is itself worth recording.
        </Typography>
      )}
    </Stack>
  );
}

/* --------------------------------------------------------------- main */

type StatusTab = "wants" | "ram" | "memory" | "cold";

// Wants first: mood is a readout of state, want is a readout of direction, and
// direction is what the rest of the page is for.
const STATUS_TABS: Array<{ value: StatusTab; label: string; icon: React.ReactNode }> = [
  { value: "wants", label: "Wants", icon: <FavoriteRoundedIcon sx={{ fontSize: 15 }} /> },
  { value: "ram", label: "RAM", icon: <MemoryRoundedIcon sx={{ fontSize: 15 }} /> },
  { value: "memory", label: "Memory", icon: <FlashOnRoundedIcon sx={{ fontSize: 15 }} /> },
  { value: "cold", label: "Cold Storage", icon: <StorageRoundedIcon sx={{ fontSize: 15 }} /> },
];

export function StatusRAMPanel({ status }: { status?: CharacterStatus } = {}) {
  const presented = useCharacterStatus();
  const { state } = useProfileStore();
  const seededEffects = useCharacterSeedEffects();
  const [tab, setTab] = React.useState<StatusTab>("wants");

  // Matthew's live store effects; Janna keeps her own seeded field.
  const liveStatus: CharacterStatus = {
    ...(status ?? presented),
    effects: seededEffects ?? state.activeEffects,
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1.5 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="inherit"
          TabIndicatorProps={{ sx: { bgcolor: BRAIN_ACCENT } }}
          sx={{
            minHeight: 36,
            color: BRAIN_ACCENT,
            "& .MuiTab-root": {
              minHeight: 36,
              py: 0,
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "text.secondary",
              "&.Mui-selected": { color: BRAIN_ACCENT },
            },
          }}
        >
          {STATUS_TABS.map(({ value, label, icon }) => (
            <Tab
              key={value}
              value={value}
              label={
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                  {icon}
                  <span>{label}</span>
                </Stack>
              }
            />
          ))}
        </Tabs>
      </Box>
      {tab === "wants" && <WantsPanel wants={liveStatus.wants} />}
      {tab === "ram" && <RAMPanel status={liveStatus} />}
      {tab === "memory" && <MemoryPanel entries={liveStatus.memory} />}
      {tab === "cold" && <ColdStoragePanel entries={liveStatus.coldStorage} />}
    </Box>
  );
}
