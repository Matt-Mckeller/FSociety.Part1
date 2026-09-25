"use client";

/**
 * Command Center — Strategic Focus view.
 *
 * Leads with **Active phase** and **Next phase** (`process` entities from the
 * planning store), then ranked Strategic Focus areas, Core Values, and
 * Strategic Pillars. Character → Direction is a separate compass and is not a
 * slice of this view. Read-only; rendered inside the Compass tabbed section.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { COLOR_MAP, type Entity } from "@4eye/types";

import { STRATEGIC_FOCUSES } from "../../store/strategy-data";
import corporateVision from "../../store/corporateVision.json";
import { WeightMeter } from "../../../entity-tile/components/slot-visuals";
import { ProcessGlyph, StrategicFocusGlyph } from "../planning-glyphs";
import { useCommandCenter } from "../../store/CommandCenterProvider";
import {
  planProcessesByPhase,
  processMeta,
  type PlanPhase,
} from "../../store/plan-processes";
import { PriorityGlyph } from "../../../character/components/PriorityGlyphs";
import { CURRENT_GOAL_SEED } from "../../../character/model/today";
import { resolveFocusedGoal } from "../../../character/model/focusedGoals";
import { Panel } from "./shared";
import { BulletItem, SubPanel } from "../VisionShared";

const VISION = "#7C3AED";

/** How many focuses are worth showing before the list becomes a document. */
const LEAD_COUNT = 4;

const URGENCY_HEX: Record<string, string> = {
  low: "#64748b",
  medium: "#3b82f6",
  high: "#e0911f",
  critical: "#f91a4b",
};

function Trend({ delta }: { delta: number }) {
  const theme = useTheme();
  if (delta > 0)
    return (
      <Stack sx={{ flexDirection: "row", alignItems: "center", color: theme.palette.success.main }}>
        <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          +{delta}
        </Typography>
      </Stack>
    );
  if (delta < 0)
    return (
      <Stack sx={{ flexDirection: "row", alignItems: "center", color: theme.palette.error.main }}>
        <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {delta}
        </Typography>
      </Stack>
    );
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", color: "text.disabled" }}>
      <TrendingFlatRoundedIcon sx={{ fontSize: 16 }} />
    </Stack>
  );
}

/** A caret that states its own open/closed state. Shared by every fold here. */
function Caret({ open }: { open: boolean }) {
  return (
    <ExpandMoreRoundedIcon
      sx={{
        fontSize: 18,
        flexShrink: 0,
        color: "text.disabled",
        transform: open ? "rotate(0deg)" : "rotate(-90deg)",
        transition: "transform 160ms ease",
      }}
    />
  );
}

/** A panel whose whole body is behind a click. */
function FoldPanel({
  title,
  glyph,
  meta,
  children,
}: {
  title: string;
  glyph?: React.ReactNode;
  meta?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Panel
      title={title}
      glyph={glyph}
      action={
        <Stack
          component="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            border: 0,
            p: 0,
            bgcolor: "transparent",
            font: "inherit",
            cursor: "pointer",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          {meta && (
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {meta}
            </Typography>
          )}
          <Caret open={open} />
        </Stack>
      }
    >
      {open ? (
        children
      ) : (
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          Collapsed — open to read.
        </Typography>
      )}
    </Panel>
  );
}

function FocusRow({
  focus,
}: {
  focus: (typeof STRATEGIC_FOCUSES)[number];
}) {
  const [open, setOpen] = React.useState(false);
  const urgency = URGENCY_HEX[focus.urgency];

  return (
    <Box>
      <Stack
        component="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        sx={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          border: 0,
          bgcolor: "transparent",
          font: "inherit",
          textAlign: "left",
          cursor: "pointer",
          px: 0.5,
          py: 0.4,
          mx: -0.5,
          borderRadius: 1,
          "&:hover": { bgcolor: alpha(VISION, 0.06) },
        }}
      >
        <Typography sx={{ fontSize: 18, width: 26, textAlign: "center", flexShrink: 0 }}>
          {focus.glyph}
        </Typography>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {focus.name}
          </Typography>
          <Chip
            size="small"
            label={focus.urgency}
            sx={{
              height: 17,
              fontSize: 9.5,
              fontWeight: 700,
              textTransform: "uppercase",
              flexShrink: 0,
              bgcolor: alpha(urgency, 0.14),
              color: urgency,
              pointerEvents: "none",
            }}
          />
        </Stack>
        <Trend delta={focus.weight - focus.previousWeight} />
        <WeightMeter weight={focus.weight} width={56} />
        <Caret open={open} />
      </Stack>
      {open && (
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", pl: 4.5, pr: 1, pb: 0.75, mt: 0.25 }}
        >
          {focus.description}
        </Typography>
      )}
    </Box>
  );
}

function PillarCard({
  pillar,
}: {
  pillar: { id: string; icon: string; title: string; description: string; items: string[] };
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <SubPanel tone={VISION}>
      <Stack
        component="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        sx={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
          mb: 0.5,
          border: 0,
          p: 0,
          bgcolor: "transparent",
          font: "inherit",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <Box component="span" sx={{ fontSize: "1rem", lineHeight: 1 }}>
          {pillar.icon}
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
          {pillar.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700 }}>
          {pillar.items.length}
        </Typography>
        <Caret open={open} />
      </Stack>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
        {pillar.description}
      </Typography>
      {open && (
        <Stack spacing={0.5} sx={{ mt: 0.75 }}>
          {pillar.items.map((item, idx) => (
            <BulletItem key={idx} text={item} color={VISION} />
          ))}
        </Stack>
      )}
    </SubPanel>
  );
}

function ProcessRow({ entity }: { entity: Entity }) {
  const meta = processMeta(entity);
  if (!meta) return null;

  if (meta.processKind === "life-code") {
    const c = COLOR_MAP[meta.color ?? "slate"];
    return (
      <Tooltip title={meta.hint ?? entity.name} arrow placement="left">
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 1,
            px: 0.75,
            py: 0.55,
            borderRadius: 1.25,
            border: "1px solid",
            borderColor: alpha(c, 0.22),
            bgcolor: alpha(c, 0.05),
            cursor: "default",
            "&:hover": { bgcolor: alpha(c, 0.1), borderColor: alpha(c, 0.4) },
          }}
        >
          <Box
            sx={{
              width: 22,
              display: "flex",
              justifyContent: "center",
              color: c,
              flexShrink: 0,
            }}
          >
            <PriorityGlyph id={meta.sourceId} size={18} />
          </Box>
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 800,
              fontFamily: "monospace",
              letterSpacing: 0.2,
              color: c,
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {meta.code ?? entity.name}
          </Typography>
        </Stack>
      </Tooltip>
    );
  }

  const goal = resolveFocusedGoal(meta.goalId ?? meta.sourceId, CURRENT_GOAL_SEED);
  return (
    <Tooltip title={goal.label} arrow placement="left">
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 1,
          px: 0.75,
          py: 0.55,
          borderRadius: 1.25,
          border: "1px solid",
          borderColor: alpha(goal.accent, 0.22),
          bgcolor: alpha(goal.accent, 0.05),
          cursor: "default",
          "&:hover": { bgcolor: alpha(goal.accent, 0.1), borderColor: alpha(goal.accent, 0.4) },
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: goal.accent,
            flexShrink: 0,
            ml: 0.75,
          }}
        />
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "text.primary",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {goal.label}
        </Typography>
      </Stack>
    </Tooltip>
  );
}

function PhasePanel({
  phase,
  title,
  blurb,
  processes,
}: {
  phase: PlanPhase;
  title: string;
  blurb: string;
  processes: Entity[];
}) {
  const glyph =
    phase === "active" ? (
      <Box sx={{ color: "primary.main", display: "flex" }}>
        <PriorityGlyph id="pri-controller" size={18} />
      </Box>
    ) : (
      <Box sx={{ color: "primary.main", display: "flex" }}>
        <ProcessGlyph size={18} />
      </Box>
    );

  return (
    <Panel
      title={title}
      glyph={glyph}
      action={
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700 }}>
          {processes.length} {phase === "active" ? "active" : "queued"}
        </Typography>
      }
    >
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", mb: 1, lineHeight: 1.45 }}
      >
        {blurb}
      </Typography>
      <Stack spacing={0.5}>
        {processes.map((entity) => (
          <ProcessRow key={entity.id} entity={entity} />
        ))}
      </Stack>
    </Panel>
  );
}

export function StrategicFocusView() {
  const { store } = useCommandCenter();
  const focuses = React.useMemo(
    () => [...STRATEGIC_FOCUSES].sort((a, b) => b.weight - a.weight),
    [],
  );
  const [showAll, setShowAll] = React.useState(false);

  const allProcesses = React.useMemo(() => store.entitiesOfType("process"), [store]);
  const activeProcesses = React.useMemo(
    () => planProcessesByPhase(allProcesses, "active"),
    [allProcesses],
  );
  const nextProcesses = React.useMemo(
    () => planProcessesByPhase(allProcesses, "next"),
    [allProcesses],
  );

  const { coreValues, strategicPillars } = corporateVision.corporateVision;
  const visible = showAll ? focuses : focuses.slice(0, LEAD_COUNT);
  const hidden = focuses.length - visible.length;

  return (
    <Stack spacing={1.5}>
      <PhasePanel
        phase="active"
        title="Active phase"
        blurb="Controller, money, love, and the live unicorn goal — steering the plan right now. Character Direction is a different surface."
        processes={activeProcesses}
      />

      <PhasePanel
        phase="next"
        title="Next phase"
        blurb="Optimally gaining money and Value — queued for the next plan pull."
        processes={nextProcesses}
      />

      <Panel
        title="Strategic Focus"
        glyph={
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <StrategicFocusGlyph size={18} />
          </Box>
        }
        action={
          <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700 }}>
            {focuses.length} areas
          </Typography>
        }
      >
        <Stack spacing={0.25}>
          {visible.map((f) => (
            <FocusRow key={f.id} focus={f} />
          ))}
        </Stack>
        {(hidden > 0 || showAll) && (
          <Box
            component="button"
            onClick={() => setShowAll((s) => !s)}
            sx={{
              mt: 0.75,
              border: 0,
              p: 0,
              bgcolor: "transparent",
              font: "inherit",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 800,
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {showAll ? "Show top four only" : `Show ${hidden} lower-weighted`}
          </Box>
        )}
      </Panel>

      <FoldPanel
        title="Core Values"
        meta={`${coreValues.length}`}
        glyph={<Box sx={{ color: VISION, display: "flex", fontSize: 16, lineHeight: 1 }}>★</Box>}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
          {coreValues.map((value, idx) => (
            <Chip
              key={idx}
              label={value}
              size="small"
              sx={{
                height: "auto",
                py: 0.3,
                fontSize: 10,
                fontWeight: 600,
                bgcolor: alpha(VISION, 0.09),
                color: "text.primary",
                "& .MuiChip-label": { whiteSpace: "normal", lineHeight: 1.4 },
              }}
            />
          ))}
        </Box>
      </FoldPanel>

      <FoldPanel title="Strategic Pillars" meta={`${strategicPillars.length}`}>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          }}
        >
          {strategicPillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </Box>
      </FoldPanel>
    </Stack>
  );
}
