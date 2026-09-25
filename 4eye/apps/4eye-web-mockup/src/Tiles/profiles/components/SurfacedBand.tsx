"use client";

/**
 * SurfacedBand — "What Matters Now".
 *
 * Renders whatever {@link surfaceProfile} returns, in weight order, through a
 * kind → component registry. The band knows nothing about *why* something
 * surfaced; it only knows how to draw each kind. That separation is the point —
 * when surfacing stops being hard-coded, this file does not change.
 *
 * Each card carries its `reason` behind an info glyph, so the user can always
 * ask "why am I being shown this?" and the answer is already wired.
 *
 * Density is a user control rather than a breakpoint: the same five cards are
 * useful both as a scannable strip and as a fuller readout, and which one you
 * want depends on the moment, not the viewport.
 *
 * Status sits as its own full-width bar above the cards so mood / want / buffs
 * scan as one row instead of competing for a column.
 */

import * as React from "react";
import { Box, Card, CardContent, Collapse, Grid, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { SECTION_ICONS, DensityIcon, ChevronIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { CharacterSummaryCard } from "@4eye/web/Tiles/character/components/CharacterSummaryCard";
import { LearningStylesTable } from "@4eye/web/Tiles/character/components/LearningStylesTable";
import { StatusStrip } from "@4eye/web/Tiles/character/components/DailyGrids";
import { AttributesCard, ATTRIBUTE_VARIANTS, type AttributeVariant } from "./AttributesCard";
import { DailyFocusToggle } from "./DailyFocusToggle";
import { CycleControl, usePersistedChoice } from "./ProfileControls";
import { ProgressionDisclosure } from "./ProgressionDisclosure";
import { HighestValueStrip } from "./shared/HighestValueData";
import { useProfiles } from "../store/ProfileProvider";
import { ACTION_ONBOARDING_STEPS, GOAL_LEARNING_PHASES } from "../model/progression";
import {
  surfaceProfile,
  EMPHASIS_THRESHOLD,
  SPAN,
  type SurfacedItem,
  type SurfacedKind,
} from "../model/surfacing";
import { useFocusStack } from "@4eye/web/Tiles/character/store/useFocusStack";
import { FocusEditDialog } from "@4eye/web/Tiles/character/components/shared/FocusEditDialog";
import { NextActionsDialog } from "@4eye/web/Tiles/character/components/shared/NextActionsDialog";
import { resolveFocusedGoals } from "@4eye/web/Tiles/character/model/focusedGoals";
import { GoalGlyphs } from "@4eye/web/Tiles/integration-layers/goals";

export type Density = "comfortable" | "compact";

/**
 * Placeholder for a free-form drag-and-resize dashboard.
 *
 * Deliberately not implemented: the layout is still moving, and a grid engine
 * is expensive to build and more expensive to change. The control exists so the
 * idea has a visible home and the preference key is already reserved; the move
 * and minimise controls on each card cover reordering meanwhile.
 */
export type DashboardMode = "off" | "on";
export const DASHBOARD_MODES: DashboardMode[] = ["off", "on"];
const DENSITY_KEY = "4eye.profile.density";

/* ------------------------------------------------------------------ shell */

function ChromeButton({
  label, ink, disabled, onClick, children,
}: {
  label: string; ink: string; disabled?: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <Tooltip title={label} arrow>
      <Box
        component="span"
        role="button"
        aria-label={label}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onClick()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick();
          }
        }}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 18,
          height: 18,
          borderRadius: "50%",
          color: disabled ? "text.disabled" : ink,
          cursor: disabled ? "default" : "pointer",
          "&:hover": disabled ? {} : { bgcolor: alpha(ink, 0.12) },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 1 },
        }}
      >
        {children}
      </Box>
    </Tooltip>
  );
}

function SurfacedCard({
  kind,
  title,
  reason,
  accent,
  emphasised,
  density,
  minimised,
  onToggleMinimise,
  onMove,
  canMoveUp,
  canMoveDown,
  children,
}: {
  kind: SurfacedKind;
  title: string;
  reason: string;
  accent: string;
  emphasised: boolean;
  density: Density;
  minimised: boolean;
  onToggleMinimise: () => void;
  onMove: (dir: -1 | 1) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  children: React.ReactNode;
}) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const Icon = SECTION_ICONS[kind];
  const pad = density === "compact" ? 1.25 : 2;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: "none",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: emphasised ? alpha(accent, 0.45) : "divider",
        transition: "border-color 160ms ease",
        "&:hover": { borderColor: alpha(accent, 0.6), "& .card-chrome": { opacity: 1 } },
        "&:focus-within .card-chrome": { opacity: 1 },
      }}
    >
      <CardContent sx={{ position: "relative", p: pad, "&:last-child": { pb: pad } }}>
        <Tooltip title={`Why this is shown — ${reason}`} arrow placement="top-start">
          <Stack
            tabIndex={0}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.75,
              mb: density === "compact" ? 0.75 : 1,
              cursor: "help",
              width: "fit-content",
              borderRadius: 0.5,
              "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
            }}
          >
            {Icon && <Box component={Icon} size={14} sx={{ color: ink, flexShrink: 0 }} />}
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ink,
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Tooltip>

        {/* Card chrome: reorder and minimise. Kept low-contrast until hover so
            it doesn't compete with the content it manages. */}
        <Stack
          className="card-chrome"
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            flexDirection: "row",
            gap: 0.25,
            opacity: 0,
            transition: "opacity .15s ease",
          }}
        >
          <ChromeButton label="Move earlier" ink={ink} disabled={!canMoveUp} onClick={() => onMove(-1)}>
            <Box component={ChevronIcon} size={11} sx={{ transform: "rotate(-90deg)" }} />
          </ChromeButton>
          <ChromeButton label="Move later" ink={ink} disabled={!canMoveDown} onClick={() => onMove(1)}>
            <Box component={ChevronIcon} size={11} sx={{ transform: "rotate(90deg)" }} />
          </ChromeButton>
          <ChromeButton label={minimised ? `Expand ${title}` : `Minimise ${title}`} ink={ink} onClick={onToggleMinimise}>
            <Box component={ChevronIcon} size={11} sx={{ transform: minimised ? "rotate(90deg)" : "rotate(-90deg)" }} />
          </ChromeButton>
        </Stack>

        <Collapse in={!minimised} unmountOnExit>
          {children}
        </Collapse>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ cards */

function CurrentGoalCard({
  accent,
  onOpenProcesses,
}: {
  accent: string;
  onOpenProcesses?: () => void;
}) {
  const { profile } = useProfiles();
  const { currentGoal, focusedGoalIds, revisions, dispatch } = useFocusStack();
  const [editing, setEditing] = React.useState(false);
  const goal =
    profile.id === "PROFILE_JANNA"
      ? profile.data.professional?.currentGoal
      : currentGoal || profile.data.professional?.currentGoal;
  const focused = resolveFocusedGoals(focusedGoalIds, currentGoal);
  const visionGoals = focused.filter((f) => f.visionGoal).map((f) => f.visionGoal!);

  if (profile.id === "PROFILE_JANNA") {
    return (
      <Stack sx={{ gap: 0.75 }}>
        <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 700 }}>
          {goal}
        </Typography>
        {onOpenProcesses && (
          <Typography
            component="button"
            type="button"
            onClick={onOpenProcesses}
            sx={{
              p: 0,
              border: "none",
              bgcolor: "transparent",
              color: accent,
              fontWeight: 700,
              fontSize: "0.7rem",
              cursor: "pointer",
              textAlign: "left",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Open on Processes
          </Typography>
        )}
      </Stack>
    );
  }
  return (
    <>
      <ProgressionDisclosure
        storageKey="4eye.profile.goalPhases"
        accent={accent}
        label="learning phases"
        progression={GOAL_LEARNING_PHASES}
      >
        <Stack sx={{ gap: 0.85 }}>
          {visionGoals.length > 0 && (
            <GoalGlyphs goals={visionGoals} size={20} label="Focused goals" />
          )}
          <Stack sx={{ gap: 0.45 }}>
            {focused.map((f) => (
              <Typography
                key={f.id}
                variant="body2"
                onClick={f.id === "unicorn" && dispatch ? () => setEditing(true) : undefined}
                sx={{
                  color: "text.primary",
                  fontWeight: f.id === "unicorn" ? 800 : 700,
                  cursor: f.id === "unicorn" && dispatch ? "pointer" : "default",
                  fontSize: f.id === "unicorn" ? "0.82rem" : "0.74rem",
                  lineHeight: 1.35,
                  "&:hover": f.id === "unicorn" && dispatch ? { color: accent } : undefined,
                }}
              >
                <Box component="span" sx={{ color: f.accent, mr: 0.5 }}>●</Box>
                {f.label}
                {f.id === "unicorn" && dispatch ? (
                  <Typography component="span" sx={{ ml: 0.75, fontSize: "0.58rem", fontWeight: 800, color: "text.disabled" }}>
                    edit
                  </Typography>
                ) : null}
              </Typography>
            ))}
          </Stack>
          {onOpenProcesses && (
            <Typography
              component="button"
              type="button"
              onClick={onOpenProcesses}
              sx={{
                p: 0,
                border: "none",
                bgcolor: "transparent",
                color: accent,
                fontWeight: 700,
                fontSize: "0.7rem",
                cursor: "pointer",
                textAlign: "left",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              Entity & ongoing goals → Processes
            </Typography>
          )}
        </Stack>
      </ProgressionDisclosure>
      {dispatch && (
        <FocusEditDialog
          open={editing}
          onClose={() => setEditing(false)}
          slot="goal"
          label={goal ?? ""}
          detail=""
          revisions={revisions}
          onSave={({ label }) => dispatch({ type: "set-current-goal", label })}
        />
      )}
    </>
  );
}

function NextActionCard({ accent }: { accent: string }) {
  const { profile } = useProfiles();
  const { todayPin, todayActions, todaySubjects, revisions, dispatch } = useFocusStack();
  const [editing, setEditing] = React.useState(false);
  if (profile.id === "PROFILE_JANNA") {
    return (
      <Stack sx={{ gap: 0.75 }}>
        <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 700 }}>
          Stay in the conversation — honestly.
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.45 }}>
          Pursue Matthew more actively. Say the true thing. Ask about the work, and other things that are actually good.
        </Typography>
      </Stack>
    );
  }
  const lead = todayActions[0];
  return (
    <>
      <ProgressionDisclosure
        storageKey="4eye.profile.actionSteps"
        accent={accent}
        label="onboarding steps"
        progression={ACTION_ONBOARDING_STEPS}
      >
        <Stack
          onClick={dispatch ? () => setEditing(true) : undefined}
          sx={{
            gap: 0.7,
            minWidth: 0,
            cursor: dispatch ? "pointer" : "default",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.3 }}>
            {lead?.label}
            {dispatch ? (
              <Typography component="span" sx={{ ml: 0.75, fontSize: "0.58rem", fontWeight: 800, color: "text.disabled" }}>
                edit
              </Typography>
            ) : null}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.45 }}>
            {lead?.detail} Then {todayPin.label.toLowerCase()}.
          </Typography>
          <Stack sx={{ gap: 0.35 }}>
            {todayActions.map((a, i) => (
              <Typography
                key={a.id}
                sx={{
                  fontSize: "0.66rem",
                  fontWeight: i === 0 ? 800 : 600,
                  color: i === 0 ? "text.primary" : "text.secondary",
                  lineHeight: 1.35,
                }}
              >
                {i + 1}. {a.label}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.4, pt: 0.15 }}>
            {todaySubjects.map((s) => (
              <Typography
                key={s.id}
                title={s.detail}
                sx={{
                  fontSize: "0.58rem",
                  fontWeight: 800,
                  px: 0.65,
                  py: 0.15,
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                }}
              >
                {s.label}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </ProgressionDisclosure>
      {dispatch && (
        <NextActionsDialog
          open={editing}
          onClose={() => setEditing(false)}
          actions={todayActions}
          revisions={revisions}
          onAdd={(next) => dispatch({ type: "add-today-action", ...next })}
          onUpdate={(id, next) => dispatch({ type: "update-today-action", id, ...next })}
          onRemove={(id) => dispatch({ type: "remove-today-action", id })}
          onLead={(id) => dispatch({ type: "lead-today-action", id })}
        />
      )}
    </>
  );
}

/**
 * Highest Value — the five brand themes this person aligns to, plus the things
 * that make the alignment mean something.
 *
 * The strip alone is a static readout: it says *what* someone values but never
 * *why you are being told now*, which is the one job of a surfaced card. Three
 * additions, each answering a question the strip raises:
 *
 *   movement   which theme shifted, and in which direction — the reason this
 *              card surfaced at all
 *   evidence   what the person actually did that moved it, so the number is
 *              traceable rather than asserted
 *   strongest  their own highest-value words within the leading theme, which is
 *              the part that is theirs rather than the brand's
 */
function HighestValueCard() {
  const { profile } = useProfiles();
  const alignments = profile.highestValueData ?? [];
  if (alignments.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        No value alignment recorded yet.
      </Typography>
    );
  }

  const leading = [...alignments].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))[0];
  const isJanna = profile.id === "PROFILE_JANNA";

  return (
    <Stack sx={{ gap: 1 }}>
      <HighestValueStrip alignments={alignments} />

      {/* Movement — why this surfaced. Seeded for now; a real ranker emits it. */}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
        <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em", color: "text.secondary" }}>
          THIS WEEK
        </Typography>
        <Typography sx={{ fontSize: "0.68rem", color: "text.primary" }}>
          {isJanna ? (
            <>
              Heal <strong style={{ color: "#16a34a" }}>▲ 8</strong>
              {"  ·  "}
              Evolve <strong style={{ color: "#16a34a" }}>▲ 5</strong>
            </>
          ) : (
            <>
              Heal <strong style={{ color: "#16a34a" }}>▲ 6</strong>
              {"  ·  "}
              Win <strong style={{ color: "#dc2626" }}>▼ 3</strong>
            </>
          )}
        </Typography>
      </Stack>

      {/* Evidence — what moved it, so the number is traceable. */}
      <Typography sx={{ fontSize: "0.66rem", color: "text.secondary", lineHeight: 1.45 }}>
        {isJanna
          ? "Leaned in, stayed in an honest conversation, and asked about the work — happy, confident, curious."
          : "Three recovery habits completed and a rest day taken after a 9-day streak."}
      </Typography>

      {/* The person's own words within the leading theme. */}
      {leading?.words && leading.words.length > 0 && (
        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
          {leading.words.slice(0, 4).map((t) => (
            <Typography
              key={t}
              sx={{
                fontSize: "0.6rem",
                fontWeight: 700,
                px: 0.7,
                py: 0.2,
                borderRadius: 999,
                border: "1px solid",
                borderColor: "divider",
                color: "text.secondary",
              }}
            >
              {t}
            </Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

/** Registry — one entry per {@link SurfacedKind}. */
interface CardCtx {
  density: Density;
  accent: string;
  attributeVariant: AttributeVariant;
  onOpenProcesses?: () => void;
}

const CARDS: Record<SurfacedKind, { title: string; render: (c: CardCtx) => React.ReactNode }> = {
  summary:         { title: "Summary",       render: () => <CharacterSummaryCard /> },
  "daily-focus":   { title: "Daily Focus",   render: (c) => <DailyFocusToggle accent={c.accent} /> },
  attributes:      { title: "Attributes",    render: (c) => <AttributesCard accent={c.accent} variant={c.attributeVariant} /> },
  "learning-styles": {
    title: "Learning",
    render: (c) => <LearningStylesTable accent={c.accent} />,
  },
  "current-goal":  {
    title: "Current Goals",
    render: (c) => <CurrentGoalCard accent={c.accent} onOpenProcesses={c.onOpenProcesses} />,
  },
  "next-action":   { title: "Next Action",   render: (c) => <NextActionCard accent={c.accent} /> },
  "highest-value": { title: "Highest Value", render: () => <HighestValueCard /> },
};

/* ---------------------------------------------------------------- density */

function DensityToggle({ density, accent, onChange }: { density: Density; accent: string; onChange: (d: Density) => void }) {
  const surface = useSurface();
  const ink = surface.ink(accent);
  const next: Density = density === "compact" ? "comfortable" : "compact";
  return (
    <Tooltip title={`Switch to ${next} density`} arrow>
      <Stack
        role="button"
        tabIndex={0}
        aria-label={`Switch to ${next} density`}
        onClick={() => onChange(next)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(next);
          }
        }}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          px: 0.75,
          py: 0.25,
          borderRadius: 999,
          cursor: "pointer",
          flexShrink: 0,
          border: "1px solid",
          borderColor: density === "compact" ? alpha(accent, 0.5) : "transparent",
          bgcolor: density === "compact" ? alpha(accent, 0.12) : "transparent",
          "&:hover": { bgcolor: alpha(accent, 0.1) },
          "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
        }}
      >
        <Box component={DensityIcon} size={13} sx={{ color: density === "compact" ? ink : "text.secondary" }} />
        <Typography sx={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: density === "compact" ? ink : "text.secondary" }}>
          {density}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

/* ------------------------------------------------------------------- band */

const ORDER_KEY = "4eye.profile.surfacedOrder";
const MINIMISED_KEY = "4eye.profile.surfacedMinimised";

/** Reads a persisted string[] without throwing on private-mode storage. */
function readList(key: string): string[] | null {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : null;
  } catch {
    return null;
  }
}

function writeList(key: string, value: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignored */
  }
}

export function SurfacedBand({
  accent,
  lens,
  onOpenProcesses,
}: {
  accent: string;
  lens?: string;
  onOpenProcesses?: () => void;
}) {
  const { profile } = useProfiles();
  const ranked: SurfacedItem[] = React.useMemo(() => surfaceProfile({ lens }), [lens]);

  // User order overrides ranked order once anything has been moved. Unknown ids
  // are dropped and new ones appended, so a change to `surfaceProfile` never
  // strands a card.
  const [order, setOrder] = React.useState<string[] | null>(null);
  const [minimised, setMinimised] = React.useState<string[]>([]);

  React.useEffect(() => {
    setOrder(readList(ORDER_KEY));
    setMinimised(readList(MINIMISED_KEY) ?? []);
  }, []);

  const items = React.useMemo(() => {
    if (!order) return ranked;
    const byId = new Map(ranked.map((i) => [i.id, i]));
    const chosen = order.map((id) => byId.get(id)).filter((i): i is SurfacedItem => Boolean(i));
    const rest = ranked.filter((i) => !order.includes(i.id));
    return [...chosen, ...rest];
  }, [ranked, order]);

  const move = React.useCallback(
    (id: string, dir: -1 | 1) => {
      const ids = items.map((i) => i.id);
      const from = ids.indexOf(id);
      const to = from + dir;
      if (from < 0 || to < 0 || to >= ids.length) return;
      [ids[from], ids[to]] = [ids[to], ids[from]];
      setOrder(ids);
      writeList(ORDER_KEY, ids);
    },
    [items],
  );

  const toggleMinimise = React.useCallback((id: string) => {
    setMinimised((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeList(MINIMISED_KEY, next);
      return next;
    });
  }, []);
  const [density, setDensity] = React.useState<Density>("comfortable");
  const [dashboard, setDashboard] = usePersistedChoice(
    "4eye.profile.dashboard", "off" as DashboardMode, DASHBOARD_MODES);
  const [attributeVariant, setAttributeVariant] = usePersistedChoice(
    "4eye.profile.attributeVariant", "grid" as AttributeVariant, ATTRIBUTE_VARIANTS);

  // Adopt the stored preference after mount — reading storage during render
  // would hydrate-mismatch.
  React.useEffect(() => {
    try {
      const v = window.localStorage.getItem(DENSITY_KEY);
      if (v === "compact" || v === "comfortable") setDensity(v);
    } catch {
      /* storage unavailable — density just won't persist */
    }
  }, []);

  const changeDensity = React.useCallback((d: Density) => {
    setDensity(d);
    try {
      window.localStorage.setItem(DENSITY_KEY, d);
    } catch {
      /* ignored */
    }
  }, []);

  return (
    <>
      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 0.75, mb: 1 }}>
        <Tooltip
          title="Free-form drag-and-resize dashboard — not built yet. The move and minimise controls on each card cover reordering for now."
          arrow
        >
          <span>
            <CycleControl
              label="Dashboard"
              value={dashboard}
              options={DASHBOARD_MODES}
              accent={accent}
              onChange={setDashboard}
            />
          </span>
        </Tooltip>
        <CycleControl
          label="Attribute treatment"
          value={attributeVariant}
          options={ATTRIBUTE_VARIANTS}
          accent={accent}
          onChange={setAttributeVariant}
        />
        <DensityToggle density={density} accent={accent} onChange={changeDensity} />
      </Stack>

      <Box
        sx={{
          mb: density === "compact" ? 1.5 : 2,
          px: density === "compact" ? 1 : 1.25,
          py: density === "compact" ? 0.75 : 1,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <StatusStrip fill />
      </Box>

      <Grid container spacing={density === "compact" ? 1.5 : 2.5}>
        {items.map((item, idx) => {
          const card = CARDS[item.kind];
          if (!card) return null;
          return (
            <Grid
              key={item.id}
              size={{
                zero: 12,
                tablet: item.kind === "summary" || (profile.id === "PROFILE_JANNA" && item.kind === "current-goal") ? 12 : 6,
                laptop: profile.id === "PROFILE_JANNA" && item.kind === "current-goal" ? 12 : SPAN[item.kind],
              }}
            >
              <SurfacedCard
                kind={item.kind}
                title={card.title}
                reason={item.reason}
                accent={accent}
                emphasised={item.weight >= EMPHASIS_THRESHOLD}
                density={density}
                minimised={minimised.includes(item.id)}
                onToggleMinimise={() => toggleMinimise(item.id)}
                onMove={(dir) => move(item.id, dir)}
                canMoveUp={idx > 0}
                canMoveDown={idx < items.length - 1}
              >
                {card.render({ density, accent, attributeVariant, onOpenProcesses })}
              </SurfacedCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
