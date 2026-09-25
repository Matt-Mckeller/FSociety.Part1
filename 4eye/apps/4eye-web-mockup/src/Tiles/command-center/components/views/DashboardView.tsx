"use client";

/**
 * Command Center — Dashboard view.
 *
 * The at-a-glance command surface. Reworked along the same lines as the profile
 * page: the surface was seven panels of equal weight, all open, which is a
 * report rather than a dashboard — everything shouted and nothing led.
 *
 * What changed:
 *
 *  - **The focus triad reads as one thing.** Blue is what is moving, red is
 *    what is stuck, and green is what is finished; that pairing is the spine of
 *    the surface and it now sits in a single band with the people it belongs to
 *    rather than as four equal grey tiles.
 *  - **People are on the surface, not behind a view.** The dashboard is where
 *    you find out what is being asked of you and who is carrying what, so My
 *    Queue is promoted to the top right and the crew load rides with the stats.
 *  - **Depth is reached by disclosure.** Open Questions, Recent Decisions and
 *    Top by weight are collapsed by default. They are reference, and reference
 *    should be available rather than permanently in the way.
 *  - **The compass is a door.** Strategic Focus was a static snapshot of a view
 *    you had to go and find in the rail; the panel now navigates there.
 */

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import { getTrait, COLOR_MAP, type Entity } from "@4eye/types";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useCommandCenter } from "../../store/CommandCenterProvider";
import {
  STRATEGIC_FOCUSES,
  OPEN_QUESTIONS,
  DECISIONS,
  ROADMAP_CHECKPOINTS,
} from "../../store/strategy-data";
import { CREW } from "../../store/crew";
import { CrewAvatar } from "../CrewAvatar";
import { EntityRow } from "../EntityRow";
import { weightOf, statusOf, summaryOf } from "../EntityControls";
import {
  CompassGlyph,
  WeightGlyph,
  QuestGlyph,
  QueueGlyph,
  TimelineGlyph,
  CodexGlyph,
  LegendGlyph,
} from "../planning-glyphs";
import { FocusGlyph } from "../focus-glyphs";
import { WeightMeter } from "../../../entity-tile/components/slot-visuals";
import { Panel, StatTile } from "./shared";
import { CorporateVisionCard } from "../CorporateVisionCard";

function isWork(e: Entity): boolean {
  return e.type !== "legend";
}

/**
 * A panel whose body is collapsed until asked for.
 *
 * The dashboard's job is to be readable in one glance; three of its panels are
 * reference material that only matters once you have a question. Collapsed,
 * they still announce themselves and their count, which is all a glance needs.
 */
function FoldPanel({
  title,
  glyph,
  count,
  peek,
  defaultOpen = false,
  children,
}: {
  title: string;
  glyph: React.ReactNode;
  count?: number;
  /** One-line tease while collapsed — better than an empty “open to read”. */
  peek?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
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
            bgcolor: "transparent",
            font: "inherit",
            cursor: "pointer",
            color: "text.secondary",
            p: 0,
            "&:hover": { color: "text.primary" },
          }}
        >
          {count !== undefined && (
            <Chip size="small" label={count} sx={{ fontWeight: 700, pointerEvents: "none" }} />
          )}
          <ExpandMoreRoundedIcon
            sx={{
              fontSize: 18,
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 160ms ease",
            }}
          />
        </Stack>
      }
    >
      {open ? (
        children
      ) : (
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {peek ?? "Open for detail."}
        </Typography>
      )}
    </Panel>
  );
}

export function DashboardView() {
  const theme = useTheme();
  const { store, state, queueFor, setView, setActiveCrew } = useCommandCenter();

  const all = store.allEntities();
  const legend = all.find((e) => e.type === "legend");
  const work = all.filter(isWork);

  const active = work.filter((e) => statusOf(e) === "active");
  const blocked = work.filter((e) => statusOf(e) === "blocked");
  const done = work.filter((e) => statusOf(e) === "done");

  // Curated strip: blocked first, then highest-weight active — glanceable, not a dump.
  const curatedActive = [
    ...blocked.sort((a, b) => weightOf(b) - weightOf(a)),
    ...active.sort((a, b) => weightOf(b) - weightOf(a)),
  ].slice(0, 6);

  const topWeight = [...work].sort((a, b) => weightOf(b) - weightOf(a)).slice(0, 5);

  const nextCheckpoint =
    ROADMAP_CHECKPOINTS.find((c) => c.status === "active") ??
    ROADMAP_CHECKPOINTS.find((c) => c.status === "upcoming");

  const openQuestions = OPEN_QUESTIONS.filter((q) => q.status !== "answered");
  const recentDecisions = DECISIONS.slice(0, 3);
  const topFocuses = [...STRATEGIC_FOCUSES]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);

  const accent = theme.palette.primary.main;

  // What is currently being asked of the active crew member.
  const activeCrewId = state.activeCrewId ?? CREW[0]?.id;
  const offered = activeCrewId ? queueFor(activeCrewId, "offered") : [];
  const offeredEntities = offered
    .map((a) => all.find((e) => e.id === a.entityId))
    .filter((e): e is Entity => Boolean(e))
    .slice(0, 3);

  return (
    <Box>
      <CorporateVisionCard defaultExpanded={false} />
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignContent: "start",
        }}
      >
      {/* North-star banner (spans both columns) */}
      {legend && (
        <Box
          sx={{
            gridColumn: { xs: "1", md: "1 / -1" },
            p: 1.75,
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#e0911f", 0.3),
            background: `linear-gradient(135deg, ${alpha("#e0911f", 0.14)}, transparent)`,
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.25 }}>
            <Box sx={{ color: "#e0911f", display: "flex" }}>
              <LegendGlyph size={26} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: "#e0911f", fontWeight: 800, letterSpacing: 0.4 }}>
                NORTH STAR
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                {legend.name}
              </Typography>
            </Box>
          </Stack>
          {typeof legend.meta?.summary === "string" && (
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.75 }}>
              {legend.meta.summary}
            </Typography>
          )}
        </Box>
      )}

      {/*
        The focus band. Blue is moving, red is stuck, green is finished — that
        triad is the whole state of the operation, so it reads as one band
        rather than four equal tiles, and the crew sits inside it because the
        numbers are about people's load, not about rows in a table.
      */}
      <Stack
        sx={{
          gridColumn: { xs: "1", md: "1 / -1" },
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          gap: 1.25,
          p: 1.25,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 1.25, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
          <StatTile value={active.length} label="Active" color={accent} />
          <StatTile value={blocked.length} label="Blocked" color={theme.palette.error.main} />
          <StatTile value={done.length} label="Done" color={theme.palette.success.main} />
        </Stack>

        {/* Who is carrying it. Clicking a face scopes My Queue to that person. */}
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
            flexShrink: 0,
            pl: { md: 1.5 },
            borderLeft: { md: "1px solid" },
            borderColor: { md: "divider" },
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, letterSpacing: 0.4, color: "text.disabled" }}
          >
            CREW
          </Typography>
          {CREW.map((person) => {
            const load = queueFor(person.id, "accepted").length;
            const selected = (state.activeCrewId ?? CREW[0]?.id) === person.id;
            return (
              <Tooltip
                key={person.id}
                title={`${person.name} (@${person.username}) — ${load} in flight. Click: queue · Shift-click: crew board.`}
                arrow
              >
                <Box
                  component="button"
                  onClick={(ev: React.MouseEvent) => {
                    setActiveCrew(person.id);
                    setView(ev.shiftKey ? "crew" : "queue");
                  }}
                  sx={{
                    border: 0,
                    p: 0,
                    bgcolor: "transparent",
                    cursor: "pointer",
                    borderRadius: "50%",
                    opacity: selected ? 1 : 0.65,
                    outline: selected ? `2px solid ${alpha(accent, 0.5)}` : "none",
                    outlineOffset: 2,
                    transition: "opacity 140ms ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <CrewAvatar member={person} size={26} />
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Stack>

      {/*
        Strategic focus — now a door into the Compass rather than a dead
        snapshot of it. It keeps the left slot because it answers "which way
        are we pointed", which is the first question the surface should answer.
      */}
      <Panel
        title="Strategic Focus"
        glyph={<Box sx={{ color: accent, display: "flex" }}><CompassGlyph size={18} /></Box>}
        action={
          <Tooltip title="Open the Compass" arrow>
            <Stack
              component="button"
              onClick={() => setView("strategicFocus")}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                border: 0,
                p: 0,
                bgcolor: "transparent",
                font: "inherit",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.3,
                color: accent,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Compass
              <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
            </Stack>
          </Tooltip>
        }
      >
        <Stack spacing={1}>
          {topFocuses.map((f) => (
            <Stack
              key={f.id}
              component="button"
              onClick={() => setView("strategicFocus")}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                border: 0,
                bgcolor: "transparent",
                font: "inherit",
                textAlign: "left",
                cursor: "pointer",
                px: 0.5,
                py: 0.25,
                mx: -0.5,
                borderRadius: 1,
                "&:hover": { bgcolor: alpha(accent, 0.07) },
              }}
            >
              <Box
                sx={{
                  width: 22,
                  display: "flex",
                  justifyContent: "center",
                  color: COLOR_MAP[f.color],
                  flexShrink: 0,
                }}
              >
                <FocusGlyph id={f.id} size={17} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, flex: 1, minWidth: 0 }}>
                {f.name}
              </Typography>
              <WeightMeter weight={f.weight} width={56} />
            </Stack>
          ))}
        </Stack>
      </Panel>

      {/*
        My Queue, top right. What is being asked of you outranks reference
        material, and on a two-column grid the first right-hand slot is the
        only place that reads as "top right".
      */}
      <Panel
        title="My Queue"
        glyph={<Box sx={{ color: accent, display: "flex" }}><QueueGlyph size={18} /></Box>}
        action={
          <Tooltip title="Open My Queue" arrow>
            <Stack
              component="button"
              onClick={() => setView("queue")}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                border: 0,
                p: 0,
                bgcolor: "transparent",
                font: "inherit",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 800,
                color: accent,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {offered.length} offered
              <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
            </Stack>
          </Tooltip>
        }
      >
        {offeredEntities.length > 0 ? (
          <Stack spacing={0.75}>
            {offeredEntities.map((e) => (
              <Box key={e.id}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {e.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {summaryOf(e)}
                </Typography>
              </Box>
            ))}
            {offered.length > offeredEntities.length && (
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                +{offered.length - offeredEntities.length} more waiting on you.
              </Typography>
            )}
          </Stack>
        ) : (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Nothing waiting on you.
          </Typography>
        )}
      </Panel>

      {/* Next checkpoint */}
      <Panel
        title="Next Milestone"
        glyph={<Box sx={{ color: accent, display: "flex" }}><TimelineGlyph size={18} /></Box>}
      >
        {nextCheckpoint ? (
          <Box>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.5 }}>
              <Chip
                size="small"
                label={nextCheckpoint.track}
                sx={{ fontWeight: 700, textTransform: "capitalize", height: 20 }}
              />
              <Chip
                size="small"
                label={nextCheckpoint.status}
                color={nextCheckpoint.status === "active" ? "primary" : "default"}
                sx={{ fontWeight: 700, textTransform: "capitalize", height: 20 }}
              />
            </Stack>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              {nextCheckpoint.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {nextCheckpoint.description}
            </Typography>
          </Box>
        ) : (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            No upcoming milestones.
          </Typography>
        )}
      </Panel>

      {/* Open questions — reference, so collapsed by default. */}
      <FoldPanel
        title="Open Questions"
        glyph={<Box sx={{ color: accent, display: "flex" }}><CodexGlyph size={18} /></Box>}
        count={openQuestions.length}
        peek={openQuestions[0]?.question}
      >
        <Stack spacing={1}>
          {openQuestions.map((q) => (
            <Box key={q.id}>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
                <Chip
                  size="small"
                  label={q.status}
                  sx={{
                    height: 18,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    bgcolor: alpha(accent, 0.12),
                    color: accent,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {q.question}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </FoldPanel>

      {/* Recent decisions — reference, so collapsed by default. */}
      <FoldPanel
        title="Recent Decisions"
        glyph={<Box sx={{ color: accent, display: "flex" }}><CodexGlyph size={18} /></Box>}
        count={recentDecisions.length}
        peek={recentDecisions[0]?.title}
      >
        <Stack spacing={1}>
          {recentDecisions.map((d) => (
            <Box key={d.id}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {d.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                {d.decision}
              </Typography>
            </Box>
          ))}
        </Stack>
      </FoldPanel>

      {/* Active work — curated, with summaries for glanceability. */}
      <Panel
        title="Active Work"
        glyph={<Box sx={{ color: accent, display: "flex" }}><QuestGlyph size={18} /></Box>}
        action={
          <Chip
            size="small"
            label={`${curatedActive.length}${active.length + blocked.length > curatedActive.length ? `/${active.length + blocked.length}` : ""}`}
            sx={{ fontWeight: 700 }}
          />
        }
      >
        <Stack spacing={0.75}>
          {curatedActive.length > 0 ? (
            curatedActive.map((e) => <EntityRow key={e.id} entity={e} showSummary />)
          ) : (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Nothing active right now.
            </Typography>
          )}
        </Stack>
      </Panel>

      {/* Top by weight — reference, so collapsed by default. */}
      <FoldPanel
        title="Top by weight"
        glyph={<Box sx={{ color: accent, display: "flex" }}><WeightGlyph size={18} /></Box>}
        count={topWeight.length}
        peek={topWeight[0]?.name}
      >
        <Stack spacing={0.75}>
          {topWeight.map((e) => (
            <EntityRow key={e.id} entity={e} showSummary={false} />
          ))}
        </Stack>
      </FoldPanel>
      </Box>
    </Box>
  );
}
