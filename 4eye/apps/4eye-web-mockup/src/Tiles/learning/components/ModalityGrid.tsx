"use client";

/**
 * ModalityGrid — equal chips for ways of engaging, learner-context facets,
 * and brand silhouettes. Multi-select: tapping a chip tags the session so
 * coverage is trackable. Core modalities feed the "covered" tracker.
 * Learner context leads with Auto determine imports (top-left). Named chips
 * stay as a catalog reference and sit quieter while auto-import is on.
 * Custom / Private / Saved are unlocked for ExpanseEye and carry a crown.
 * Money stays a gated stub until pricing lands.
 */

import * as React from "react";
import { Box, Tooltip, Typography, alpha } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { COLOR_MAP } from "@4eye/types";
import { ShapeChip } from "@expanse/brand-core";

import { SovereignPresenceGlyph } from "@4eye/web/Tiles/character/components/SkillGlyphs";
import {
  LEARNING_CONTEXT_FACETS,
  LEARNING_MODALITIES,
  LEARNING_MODALITY_META,
  LEARNING_SHAPE_META,
  LEARNING_SHAPES,
  type LearningModality,
  type LearningShape,
} from "../model/types";
import { useLearning } from "../store/LearningProvider";
import { ModalityIcon } from "./ModalityIcon";

const CROWN_GOLD = COLOR_MAP.amber;
const AUTO_ACCENT = COLOR_MAP.purple;
/** One theme blue for modality and learner-context chips so the catalog reads as a set. */
const CHIP_ACCENT = COLOR_MAP.blue;
const CHIP_H = 28;
const CHIP_GRID = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(152px, 1fr))",
  gap: 0.75,
} as const;

const MAIN_MODALITIES = LEARNING_MODALITIES.filter(
  (id) => LEARNING_MODALITY_META[id].kind !== "context",
);

function SectionHead({
  label,
  hint,
  meta,
  first,
}: {
  label: string;
  hint: string;
  meta?: string;
  first?: boolean;
}) {
  return (
    <Box sx={{ mt: first ? 0 : 1.75, mb: 0.75 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 1,
          mb: 0.25,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 800, letterSpacing: 0.4, lineHeight: 1.2 }}
        >
          {label}
        </Typography>
        {meta && (
          <Typography sx={{ fontSize: 10, fontWeight: 700, color: "text.secondary", whiteSpace: "nowrap" }}>
            {meta}
          </Typography>
        )}
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
        {hint}
      </Typography>
    </Box>
  );
}

function ToggleChip({
  label,
  title,
  on,
  accent,
  onToggle,
  dimmed = false,
  dashed = false,
  icon,
  trailing,
}: {
  label: string;
  title: string;
  on: boolean;
  accent: string;
  onToggle: () => void;
  dimmed?: boolean;
  dashed?: boolean;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <Tooltip title={title} arrow>
      <Box
        role="button"
        aria-pressed={on}
        aria-label={label}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        sx={{
          width: "100%",
          minWidth: 0,
          height: CHIP_H,
          px: 1,
          borderRadius: 1.5,
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: 0.6,
          opacity: dimmed ? 0.42 : 1,
          color: on ? accent : "text.secondary",
          bgcolor: on && !dimmed ? alpha(accent, 0.16) : "transparent",
          border: `${dashed ? "1.5px dashed" : "1.5px solid"} ${
            on ? (dimmed ? alpha(accent, 0.35) : accent) : alpha(accent, 0.28)
          }`,
          transition: "all 140ms ease",
          "&:hover": { bgcolor: alpha(accent, on && !dimmed ? 0.22 : 0.08) },
          "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
        }}
      >
        <Box sx={{ flexShrink: 0, display: "flex", lineHeight: 0, color: accent }}>{icon}</Box>
        <Typography noWrap sx={{ fontSize: 11, fontWeight: 700, lineHeight: 1, minWidth: 0, flex: 1 }}>
          {label}
        </Typography>
        {trailing}
      </Box>
    </Tooltip>
  );
}

function ModalityChip({ id }: { id: LearningModality }) {
  const { session, dispatch } = useLearning();
  const meta = LEARNING_MODALITY_META[id];
  const accent = CHIP_ACCENT;
  const selected = session.modalities.includes(id);
  const placeholder = !!meta.placeholder;
  const expanseEye = meta.unlockedBy === "expanse-eye";
  const title = expanseEye ? `${meta.blurb} Unlocked for ExpanseEye.` : meta.blurb;

  return (
    <ToggleChip
      label={meta.label}
      title={title}
      on={selected}
      accent={accent}
      dimmed={placeholder && !selected}
      dashed={placeholder}
      onToggle={() => dispatch({ type: "toggle-modality", id })}
      icon={<ModalityIcon name={meta.icon} sx={{ fontSize: 16 }} />}
      trailing={
        <>
          {expanseEye && (
            <Box
              sx={{ color: CROWN_GOLD, display: "flex", flexShrink: 0 }}
              aria-label="Unlocked for ExpanseEye"
            >
              <SovereignPresenceGlyph size={12} title="Unlocked for ExpanseEye" />
            </Box>
          )}
          {placeholder && (
            <Typography
              sx={{
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                color: alpha(accent, 0.85),
                flexShrink: 0,
              }}
            >
              Soon
            </Typography>
          )}
        </>
      }
    />
  );
}

/**
 * Top-left of the learner-context group. On by default: the system picks
 * optimally relevant imports and the named facets sit as a quieter catalog.
 */
function AutoDetermineChip() {
  const { session, dispatch } = useLearning();
  const on = session.autoImportContext;
  const title = on
    ? "Auto determine imports is on — optimally relevant context is chosen for you. Named facets below are a catalog reference."
    : "Auto determine imports is off. Pick named facets below to ride with you.";

  return (
    <ToggleChip
      label="Auto determine"
      title={title}
      on={on}
      accent={AUTO_ACCENT}
      onToggle={() => dispatch({ type: "toggle-auto-import" })}
      icon={<AutoAwesomeRounded sx={{ fontSize: 16 }} />}
    />
  );
}

/**
 * Informative chip for a named learner-state facet. When auto-import is on,
 * these are a catalog reference; clicking one leaves auto-import and includes
 * just that facet as user-selected context.
 */
function ContextChip({ id }: { id: LearningModality }) {
  const { session, dispatch } = useLearning();
  const meta = LEARNING_MODALITY_META[id];
  const accent = CHIP_ACCENT;
  const autoOn = session.autoImportContext;
  const on = autoOn || session.modalities.includes(id);
  const title = autoOn
    ? `${meta.blurb} Catalog reference — auto-import is on, so this is covered when the system picks it.`
    : on
      ? `${meta.blurb} On — included as context with you.`
      : `${meta.blurb} Off — not sent with the next message.`;

  return (
    <ToggleChip
      label={meta.label}
      title={title}
      on={on}
      accent={accent}
      dimmed={autoOn}
      onToggle={() => dispatch({ type: "toggle-modality", id })}
      icon={<ModalityIcon name={meta.icon} sx={{ fontSize: 16 }} />}
    />
  );
}

/**
 * Brand silhouette — on means that visual language rides with the learner.
 */
function ShapeToggle({ id }: { id: LearningShape }) {
  const { session, dispatch } = useLearning();
  const meta = LEARNING_SHAPE_META[id];
  const accent = COLOR_MAP[meta.accent];
  const on = session.shapes.includes(id);
  const title = on
    ? `${meta.blurb} On — included as context with you.`
    : `${meta.blurb} Off — not sent with the next message.`;

  return (
    <ToggleChip
      label={meta.label}
      title={title}
      on={on}
      accent={accent}
      onToggle={() => dispatch({ type: "toggle-shape", shape: id })}
      icon={<ShapeChip shape={id} scale="big" filled={on} hex={accent} />}
    />
  );
}

export function ModalityGrid() {
  const { session, modalityCovered, modalityTotal } = useLearning();
  const contextOn = LEARNING_CONTEXT_FACETS.filter((id) =>
    session.modalities.includes(id),
  ).length;
  const shapesOn = session.shapes.length;
  const autoOn = session.autoImportContext;

  return (
    <Box>
      <SectionHead
        first
        label="Ways of engaging"
        hint="Tag the ways you're engaging — coverage is tracked."
        meta={`${modalityCovered} / ${modalityTotal}`}
      />
      <Box sx={CHIP_GRID}>
        {MAIN_MODALITIES.map((id) => (
          <ModalityChip key={id} id={id} />
        ))}
      </Box>
      <SectionHead
        label="Learner context"
        hint={
          autoOn
            ? "Auto determine imports is on. Named facets stay as a quieter catalog."
            : "Pick what rides with you, or turn Auto determine back on."
        }
        meta={autoOn ? "auto" : contextOn > 0 ? `${contextOn} on` : undefined}
      />
      <Box sx={CHIP_GRID}>
        <AutoDetermineChip />
        {LEARNING_CONTEXT_FACETS.map((id) => (
          <ContextChip key={id} id={id} />
        ))}
      </Box>
      <SectionHead
        label="Shapes"
        hint="On silhouettes ride as visual language with you."
        meta={shapesOn > 0 ? `${shapesOn} on` : undefined}
      />
      <Box sx={CHIP_GRID}>
        {LEARNING_SHAPES.map((id) => (
          <ShapeToggle key={id} id={id} />
        ))}
      </Box>
    </Box>
  );
}
