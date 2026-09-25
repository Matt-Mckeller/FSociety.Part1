"use client";

/**
 * Command Center — Crew view.
 *
 * Content modes (tab strip):
 *   • All         — tasks and goals on one stream per person (default)
 *   • Tasks       — assignable work from the My Queue deck
 *   • Bond        — goals toward the relationship with this person
 *   • Personal    — things you want to help them achieve
 *   • Creative    — sequences, scenes, projects
 *
 * Layout modes (header toggle):
 *   • Cards — game-style task cards + goal cards in one row (default)
 *   • Board — horizontal kanban columns, one per crew member
 *
 * Clicking any task card opens the entity Inspector with full detail.
 */

import * as React from "react";
import {
  Box,
  ButtonBase,
  Chip,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import type { Entity } from "@4eye/types";
import { getTrait } from "@4eye/types";

import {
  useCommandCenter,
  type AssignmentState,
} from "../../store/CommandCenterProvider";
import {
  CREW,
  CREW_CHILDREN_ID,
  CREW_JANNA_ID,
  CREW_PIN,
  crewVisionGoals,
  isAssignable,
  assignmentConfigFor,
  visionGoalBySeedId,
  type CrewMember,
  type EntityGoal,
  type GoalPriority,
  type GoalStatus,
  type GoalType,
} from "../../store/crew";
import { PROFILES_SEED } from "../../../profiles";
import { CrewAvatar } from "../CrewAvatar";
import { CrewGlyph } from "../planning-glyphs";
import { CrewGoalCard } from "../CrewGoalCard";
import { EntityRow } from "../EntityRow";
import { summaryOf } from "../EntityControls";
import { EmptyState } from "./shared";

import { GoalsShowcase } from "@4eye/web/Tiles/integration-layers/goals";
import type { VisionGoal } from "@4eye/web/Tiles/integration-layers/goals";
import { HomeworkTaskCard, TaskStatus } from "@expanse/brand-core/game/points/components/TaskCard";
import { TICKET_POINT_OPTIONS } from "expanse.ui/points";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContentType = "all" | "tasks" | "relationship" | "personal" | "creative";
type LayoutMode = "board" | "cards";

// ─── Constants ────────────────────────────────────────────────────────────────

const CREATIVE_TYPES = new Set(["sequence", "scene", "project"]);

const CONTENT_TABS: Array<{
  value: ContentType;
  label: string;
  Icon: React.ElementType;
}> = [
  { value: "all",          label: "All",      Icon: LayersRoundedIcon },
  { value: "tasks",        label: "Tasks",    Icon: AssignmentRoundedIcon },
  { value: "relationship", label: "Bond",     Icon: FavoriteRoundedIcon },
  { value: "personal",     label: "Personal", Icon: StarRoundedIcon },
  { value: "creative",     label: "Creative", Icon: MovieCreationRoundedIcon },
];

const ASSIGNMENT_STATE_COLOR: Record<AssignmentState, string> = {
  offered:  "#f59e0b",
  accepted: "#22c55e",
  declined: "#ef4444",
  done:     "#64748b",
};

const POINT_OPTIONS: TICKET_POINT_OPTIONS[] = [
  TICKET_POINT_OPTIONS.ONE_POINT,
  TICKET_POINT_OPTIONS.TWO_POINTS,
  TICKET_POINT_OPTIONS.THREE_POINTS,
  TICKET_POINT_OPTIONS.FIVE_POINTS,
  TICKET_POINT_OPTIONS.NINE_POINTS,
  TICKET_POINT_OPTIONS.EIGHTEEN_POINTS,
];

const PRIORITY_OPTIONS: Array<{ value: GoalPriority; color: string }> = [
  { value: "low",    color: "#475569" },
  { value: "medium", color: "#f59e0b" },
  { value: "high",   color: "#f43f5e" },
];

// ─── Utility: map Entity → TaskCard props ─────────────────────────────────────

function entityStatusToTaskStatus(value: string | undefined): TaskStatus {
  if (value === "done" || value === "complete" || value === "completed") return TaskStatus.COMPLETED;
  if (value === "active" || value === "in-progress") return TaskStatus.IN_PROGRESS;
  return TaskStatus.NOT_STARTED;
}

function weightToPoints(w: number): TICKET_POINT_OPTIONS {
  if (w <= 1)  return TICKET_POINT_OPTIONS.ONE_POINT;
  if (w <= 3)  return TICKET_POINT_OPTIONS.TWO_POINTS;
  if (w <= 6)  return TICKET_POINT_OPTIONS.THREE_POINTS;
  if (w <= 12) return TICKET_POINT_OPTIONS.FIVE_POINTS;
  if (w <= 25) return TICKET_POINT_OPTIONS.NINE_POINTS;
  return TICKET_POINT_OPTIONS.EIGHTEEN_POINTS;
}

function entityToTaskCardProps(entity: Entity, subject?: string) {
  const statusTrait = getTrait(entity.traits, "status")?.value;
  const weight      = getTrait(entity.traits, "weight")?.value ?? 3;
  const status      = entityStatusToTaskStatus(statusTrait);
  const progress    = status === TaskStatus.COMPLETED ? 100 : status === TaskStatus.IN_PROGRESS ? 50 : 0;

  return {
    id:          entity.id,
    title:       entity.name,
    description: summaryOf(entity),
    subject:     subject ?? entity.type,
    status,
    progress,
    points:      weightToPoints(weight),
  };
}

// ─── Sub-components: Board ────────────────────────────────────────────────────

/** Lifecycle pill on a task row. */
function StateChip({ state, entityType }: { state: AssignmentState; entityType: string }) {
  const config = assignmentConfigFor(entityType);
  const label =
    state === "offered"  ? config.stateLabels.offered :
    state === "accepted" ? config.stateLabels.accepted :
    state === "declined" ? config.stateLabels.declined :
    config.stateLabels.done;
  const color = ASSIGNMENT_STATE_COLOR[state];
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 17,
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: 0.3,
        textTransform: "uppercase",
        color,
        bgcolor: alpha(color, 0.14),
        border: "1px solid",
        borderColor: alpha(color, 0.4),
        "& .MuiChip-label": { px: 0.75 },
      }}
    />
  );
}

/** Assign / reassign menu for one entity. */
function AssignControl({ entity }: { entity: Entity }) {
  const { assignmentsFor, assign, unassign } = useCommandCenter();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const assignments = assignmentsFor(entity.id);
  const assignedTo = new Set(
    assignments.filter((a) => a.state !== "declined").map((a) => a.profileId),
  );

  return (
    <>
      <Tooltip title="Assign to…" arrow>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => { e.stopPropagation(); setAnchor(e.currentTarget); }}
          sx={{ p: 0.5 }}
        >
          <PersonAddAlt1RoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
      {anchor && (
        <Box
          component="div"
          sx={{
            position: "fixed",
            zIndex: 1300,
            top: anchor.getBoundingClientRect().bottom + 4,
            left: anchor.getBoundingClientRect().left,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
            boxShadow: 6,
            minWidth: 180,
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{ position: "fixed", inset: 0, zIndex: -1 }}
            onClick={() => setAnchor(null)}
          />
          {CREW.map((m) => {
            const already = assignedTo.has(m.id);
            return (
              <Stack
                key={m.id}
                component="button"
                onClick={() => {
                  if (already) unassign(entity.id, m.id);
                  else assign(entity.id, m.id);
                  setAnchor(null);
                }}
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 0.85,
                  width: "100%",
                  border: "none",
                  bgcolor: "transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <CrewAvatar member={m} size={22} />
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  {m.name}
                  {m.crewTier === "t2" ? (
                    <Typography component="span" variant="caption" sx={{ ml: 0.75, color: "text.disabled", fontWeight: 800 }}>
                      T2
                    </Typography>
                  ) : null}
                </Box>
                {already && (
                  <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                    Remove
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Box>
      )}
    </>
  );
}

/** A single kanban column. */
function Column({
  title,
  header,
  accent,
  children,
  onAdd,
}: {
  title: string;
  header?: React.ReactNode;
  accent: string;
  children: React.ReactNode;
  onAdd?: () => void;
}) {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: 280,
        flexShrink: 0,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: alpha(theme.palette.background.default, 0.4),
        overflow: "hidden",
      }}
    >
      <Stack
        sx={{
          px: 1.25,
          py: 0.9,
          borderBottom: "1px solid",
          borderColor: "divider",
          borderTop: `2px solid ${accent}`,
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {header ?? (
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
          )}
        </Box>
        {onAdd && (
          <Tooltip title="Add" arrow>
            <IconButton size="small" onClick={onAdd} sx={{ p: 0.4 }}>
              <AddRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Stack spacing={0.6} sx={{ p: 1, flex: 1, minHeight: 0, overflowY: "auto" }}>
        {children}
      </Stack>
    </Stack>
  );
}

/** Column header for a crew member. */
function CrewColumnHeader({ member, count, subtitle }: { member: CrewMember; count: number; subtitle: string }) {
  const profile = PROFILES_SEED.profiles.find((p) => p.id === member.id);
  const intentLine =
    profile?.activeRoleGoal ??
    profile?.data.communication?.goals?.[0]?.value ??
    member.username;

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
      <CrewAvatar member={member} size={28} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.15 }} noWrap>
            {member.name}
          </Typography>
          {member.crewTier === "t2" && (
            <Chip
              size="small"
              label="T2"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 0.4,
                bgcolor: alpha("#64748b", 0.16),
                color: "text.secondary",
              }}
            />
          )}
        </Stack>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          @{member.username} · {intentLine}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600 }}>
          {count} {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}

// ─── Board: Task mode ─────────────────────────────────────────────────────────

function TaskBoardContent({ onAdd, isCreative }: { onAdd: (memberId?: string) => void; isCreative?: boolean }) {
  const theme = useTheme();
  const { store, state } = useCommandCenter();

  const work = React.useMemo(
    () => store.allEntities().filter((e) =>
      isCreative ? CREATIVE_TYPES.has(e.type) : isAssignable(e) && !CREATIVE_TYPES.has(e.type)
    ),
    [store, isCreative],
  );

  const activeByEntity = React.useMemo(() => {
    const map = new Map<string, { profileId: string; state: AssignmentState }>();
    for (const a of state.assignments) {
      if (a.state === "offered" || a.state === "accepted") {
        map.set(a.entityId, { profileId: a.profileId, state: a.state });
      }
    }
    return map;
  }, [state.assignments]);

  const unassigned = work.filter((e) => !activeByEntity.has(e.id));
  const weightOf = (e: Entity) => getTrait(e.traits, "weight")?.value ?? 0;

  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{ alignItems: "stretch", height: "100%", overflowX: "auto", p: 1, pb: 1.5 }}
    >
      <Column
        title="Unassigned"
        accent={theme.palette.text.disabled}
        onAdd={() => onAdd(undefined)}
      >
        {unassigned.length === 0 ? (
          <EmptyState>All work is assigned</EmptyState>
        ) : (
          unassigned.map((entity) => (
            <EntityRow
              key={entity.id}
              entity={entity}
              showSummary={false}
              showTypeGlyph
              trailing={<AssignControl entity={entity} />}
            />
          ))
        )}
      </Column>

      {CREW.map((member) => {
        const mine = work
          .filter((e) => activeByEntity.get(e.id)?.profileId === member.id)
          .map((entity) => ({ entity, state: activeByEntity.get(entity.id)!.state }));
        const owned   = mine.filter((m) => m.state === "accepted").length;
        const offered = mine.filter((m) => m.state === "offered").length;
        const totalW  = mine.reduce((s, m) => s + weightOf(m.entity), 0);

        return (
          <Column
            key={member.id}
            title={member.name}
            accent={ASSIGNMENT_STATE_COLOR.accepted}
            header={
              <CrewColumnHeader
                member={member}
                count={mine.length}
                subtitle={`task${mine.length !== 1 ? "s" : ""} · ${owned} owned · ${offered} offered · ${totalW}w`}
              />
            }
            onAdd={() => onAdd(member.id)}
          >
            {mine.length === 0 ? (
              <EmptyState>No tasks assigned</EmptyState>
            ) : (
              mine.map(({ entity, state }) => (
                <EntityRow
                  key={entity.id}
                  entity={entity}
                  showSummary={false}
                  showTypeGlyph
                  trailing={
                    <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
                      <StateChip state={state} entityType={entity.type} />
                      <AssignControl entity={entity} />
                    </Stack>
                  }
                />
              ))
            )}
          </Column>
        );
      })}
    </Stack>
  );
}

// ─── Board: Goal mode ─────────────────────────────────────────────────────────

function GoalBoardContent({ goalType, onAdd }: { goalType: GoalType; onAdd: (memberId: string) => void }) {
  const { goalsFor, updateEntityGoalStatus } = useCommandCenter();
  const accent = goalType === "relationship" ? "#22d3ee" : "#a78bfa";
  const [inspectVision, setInspectVision] = React.useState<VisionGoal | null>(null);

  return (
    <>
    <Stack
      direction="row"
      spacing={1.25}
      sx={{ alignItems: "stretch", height: "100%", overflowX: "auto", p: 1, pb: 1.5 }}
    >
      {CREW.map((member) => {
        const goals = goalsFor(member.id, goalType);
        const active = goals.filter((g) => g.status === "active").length;

        return (
          <Column
            key={member.id}
            title={member.name}
            accent={accent}
            header={<CrewColumnHeader member={member} count={active} subtitle={`active · ${goals.length} total`} />}
            onAdd={() => onAdd(member.id)}
          >
            {goals.length === 0 ? (
              <EmptyState>No goals yet</EmptyState>
            ) : (
              <Stack spacing={0.75}>
                {goals.map((goal) => (
                  <CompactGoalRow
                    key={goal.id}
                    goal={goal}
                    accent={accent}
                    onToggle={updateEntityGoalStatus}
                    onInspect={() => {
                      const v = visionGoalBySeedId(goal.id);
                      if (v) setInspectVision(v);
                    }}
                  />
                ))}
              </Stack>
            )}
          </Column>
        );
      })}
    </Stack>
    <VisionGoalDrawer goal={inspectVision} onClose={() => setInspectVision(null)} />
    </>
  );
}

// ─── Cards: section header ────────────────────────────────────────────────────

function MemberSectionHeader({ member, count, subtitle, onAdd }: { member: CrewMember; count: number; subtitle: string; onAdd: () => void }) {
  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 1.25 }}>
      <CrewAvatar member={member} size={30} />
      <Box sx={{ flex: 1 }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{member.name}</Typography>
          {member.crewTier === "t2" && (
            <Chip
              size="small"
              label="T2"
              sx={{
                height: 18,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 0.4,
                bgcolor: alpha("#64748b", 0.16),
                color: "text.secondary",
              }}
            />
          )}
        </Stack>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>{count} {subtitle}</Typography>
      </Box>
      <Tooltip title="Add" arrow>
        <IconButton size="small" onClick={onAdd} sx={{ p: 0.5 }}>
          <AddRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

// ─── Cards: Task mode ─────────────────────────────────────────────────────────

function TaskCardsContent({ onAdd, isCreative }: { onAdd: (memberId: string) => void; isCreative?: boolean }) {
  const { store, state, inspect } = useCommandCenter();

  const work = React.useMemo(
    () => store.allEntities().filter((e) =>
      isCreative ? CREATIVE_TYPES.has(e.type) : isAssignable(e) && !CREATIVE_TYPES.has(e.type)
    ),
    [store, isCreative],
  );

  const tasksByMember = React.useMemo(() => {
    const map = new Map<string, Array<{ entity: Entity; astate: AssignmentState }>>()
    for (const a of state.assignments) {
      if (a.state === "offered" || a.state === "accepted") {
        const entity = store.getEntity(a.entityId);
        if (!entity) continue;
        if (isCreative ? !CREATIVE_TYPES.has(entity.type) : CREATIVE_TYPES.has(entity.type)) continue;
        const list = map.get(a.profileId) ?? [];
        list.push({ entity, astate: a.state });
        map.set(a.profileId, list);
      }
    }
    return map;
  }, [store, state.assignments, isCreative]);

  return (
    <Stack spacing={3} sx={{ overflowY: "auto", height: "100%", p: 1.5 }}>
      {CREW.map((member) => {
        const items = tasksByMember.get(member.id) ?? [];

        return (
          <Box key={member.id}>
            <MemberSectionHeader
              member={member}
              count={items.length}
              subtitle={`${isCreative ? "creative item" : "task"}${items.length !== 1 ? "s" : ""} assigned`}
              onAdd={() => onAdd(member.id)}
            />
            <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1, minHeight: 196 }}>
              {items.length === 0 ? (
                <Box
                  sx={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 220, height: 180, borderRadius: 2,
                    border: "1px dashed", borderColor: "divider",
                    color: "text.disabled", fontSize: 13, fontWeight: 600,
                  }}
                >
                  {isCreative ? "No creative work" : "No tasks"}
                </Box>
              ) : (
                items.map(({ entity, astate }) => {
                  const config = assignmentConfigFor(entity.type);
                  const stateLabel =
                    astate === "offered"  ? config.stateLabels.offered :
                    astate === "accepted" ? config.stateLabels.accepted :
                    astate === "declined" ? config.stateLabels.declined :
                    config.stateLabels.done;
                  const stateColor = ASSIGNMENT_STATE_COLOR[astate];
                  const props = entityToTaskCardProps(entity, member.name);
                  return (
                    <Box
                      key={entity.id}
                      onClick={() => inspect(entity.id)}
                      sx={{ position: "relative", cursor: "pointer", "&:hover .inspect-hint": { opacity: 1 } }}
                    >
                      <HomeworkTaskCard {...props} />
                      {/* State label overlay */}
                      <Chip
                        label={stateLabel}
                        size="small"
                        sx={{
                          position: "absolute", top: 6, right: 6,
                          height: 18, fontSize: 9, fontWeight: 800,
                          color: stateColor, bgcolor: alpha(stateColor, 0.15),
                          border: "1px solid", borderColor: alpha(stateColor, 0.3),
                          "& .MuiChip-label": { px: 0.75 },
                        }}
                      />
                    </Box>
                  );
                })
              )}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

// ─── Cards: Goal mode ─────────────────────────────────────────────────────────

function GoalCardsContent({ goalType, onAdd }: { goalType: GoalType; onAdd: (memberId: string) => void }) {
  const { goalsFor, updateEntityGoalStatus } = useCommandCenter();

  return (
    <Stack spacing={3} sx={{ overflowY: "auto", height: "100%", p: 1.5 }}>
      {CREW.map((member) => {
        const goals = goalsFor(member.id, goalType);
        const visionGoals = crewVisionGoals(member.id, goalType);
        const extraGoals = goals.filter((g) => !visionGoalBySeedId(g.id));
        const active = goals.filter((g) => g.status === "active").length;
        const empty = visionGoals.length === 0 && extraGoals.length === 0;

        return (
          <Box key={member.id}>
            <MemberSectionHeader
              member={member}
              count={active}
              subtitle={`active · ${goals.length} total`}
              onAdd={() => onAdd(member.id)}
            />
            {empty ? (
              <Box
                sx={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 220, height: 180, borderRadius: 2,
                  border: "1px dashed", borderColor: "divider",
                  color: "text.disabled", fontSize: 13, fontWeight: 600,
                }}
              >
                No goals yet
              </Box>
            ) : (
              <Stack spacing={1.5}>
                <JannaGoalCards goals={visionGoals} />
                {extraGoals.length > 0 && (
                  <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
                    {extraGoals.map((goal) => (
                      <CrewGoalCard key={goal.id} goal={goal} onStatusChange={updateEntityGoalStatus} />
                    ))}
                  </Stack>
                )}
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

function JannaGoalCards({ goals }: { goals: VisionGoal[] }) {
  if (goals.length === 0) return null;
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <GoalsShowcase goals={goals} layout="row" variant="paper" />
    </Box>
  );
}

function VisionGoalDrawer({
  goal,
  onClose,
}: {
  goal: VisionGoal | null;
  onClose: () => void;
}) {
  return (
    <Drawer
      anchor="right"
      open={Boolean(goal)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { zero: "100%", tablet: 480 },
            maxWidth: "100%",
            p: 2,
            bgcolor: "background.paper",
          },
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", mb: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1 }}>
          Goal
        </Typography>
        <IconButton size="small" onClick={onClose} aria-label="Close">
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
      {goal ? <GoalsShowcase goals={[goal]} layout="stack" variant="paper" /> : null}
    </Drawer>
  );
}

function CompactGoalRow({
  goal,
  accent,
  onToggle,
  onInspect,
}: {
  goal: EntityGoal;
  accent: string;
  onToggle: (id: string, next: GoalStatus) => void;
  onInspect?: () => void;
}) {
  const theme = useTheme();
  const done = goal.status === "done";
  const vision = visionGoalBySeedId(goal.id);
  return (
    <Box
      onClick={onInspect}
      sx={{
        p: 1.25,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: done ? alpha(theme.palette.text.disabled, 0.2) : alpha(accent, 0.25),
        bgcolor: done ? alpha(theme.palette.text.disabled, 0.04) : alpha(accent, 0.05),
        cursor: onInspect ? "pointer" : "default",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 0.75 }}>
        <Box
          component="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(goal.id, done ? "active" : "done");
          }}
          sx={{
            flexShrink: 0, mt: 0.2,
            width: 16, height: 16,
            borderRadius: "50%",
            border: "1.5px solid",
            borderColor: alpha(accent, done ? 0.5 : 0.4),
            bgcolor: done ? alpha(accent, 0.2) : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", background: "none", p: 0,
            "&:hover": { borderColor: accent, bgcolor: alpha(accent, 0.15) },
          }}
        >
          {done && <CheckRoundedIcon sx={{ fontSize: 10, color: accent }} />}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700, lineHeight: 1.3,
              textDecoration: done ? "line-through" : "none",
              color: done ? "text.disabled" : "text.primary",
            }}
          >
            {vision?.targetPlain ?? goal.title}
          </Typography>
          {(vision?.tags?.length || vision?.points != null) && (
            <Stack direction="row" sx={{ gap: 0.5, mt: 0.4, flexWrap: "wrap" }}>
              {vision?.points != null && (
                <Typography sx={{ fontSize: 10, fontWeight: 800, color: accent }}>
                  {vision.points}p
                </Typography>
              )}
              {(vision?.tags ?? []).map((tag) => (
                <Typography key={tag} sx={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.4, color: "text.secondary", textTransform: "uppercase" }}>
                  {tag}
                </Typography>
              ))}
            </Stack>
          )}
        </Box>
        <Box
          sx={{
            width: 6, height: 6, borderRadius: "50%", flexShrink: 0, mt: 0.4,
            bgcolor: goal.priority === "high" ? "#f43f5e" : goal.priority === "medium" ? "#f59e0b" : "#475569",
          }}
        />
      </Stack>
    </Box>
  );
}

function MixedBoardContent({ onAdd }: { onAdd: (memberId?: string) => void }) {
  const theme = useTheme();
  const { store, state, goalsFor, updateEntityGoalStatus } = useCommandCenter();
  const [inspectVision, setInspectVision] = React.useState<VisionGoal | null>(null);

  const work = React.useMemo(
    () => store.allEntities().filter(isAssignable),
    [store],
  );

  const activeByEntity = React.useMemo(() => {
    const map = new Map<string, { profileId: string; state: AssignmentState }>();
    for (const a of state.assignments) {
      if (a.state === "offered" || a.state === "accepted") {
        map.set(a.entityId, { profileId: a.profileId, state: a.state });
      }
    }
    return map;
  }, [state.assignments]);

  const unassigned = work.filter((e) => !activeByEntity.has(e.id));
  const weightOf = (e: Entity) => getTrait(e.traits, "weight")?.value ?? 0;

  return (
    <>
    <Stack
      direction="row"
      spacing={1.25}
      sx={{ alignItems: "stretch", height: "100%", overflowX: "auto", p: 1, pb: 1.5 }}
    >
      <Column
        title="Unassigned"
        accent={theme.palette.text.disabled}
        onAdd={() => onAdd(undefined)}
      >
        {unassigned.length === 0 ? (
          <EmptyState>All work is assigned</EmptyState>
        ) : (
          unassigned.map((entity) => (
            <EntityRow
              key={entity.id}
              entity={entity}
              showSummary={false}
              showTypeGlyph
              trailing={<AssignControl entity={entity} />}
            />
          ))
        )}
      </Column>

      {CREW.map((member) => {
        const mine = work
          .filter((e) => activeByEntity.get(e.id)?.profileId === member.id)
          .map((entity) => ({ entity, state: activeByEntity.get(entity.id)!.state }));
        const goals = goalsFor(member.id);
        const owned = mine.filter((m) => m.state === "accepted").length;
        const totalW = mine.reduce((s, m) => s + weightOf(m.entity), 0);
        const activeGoals = goals.filter((g) => g.status === "active").length;
        const accent = member.id === CREW_JANNA_ID ? "#2dd4bf" : member.id === CREW_CHILDREN_ID ? "#f59e0b" : ASSIGNMENT_STATE_COLOR.accepted;

        return (
          <Column
            key={member.id}
            title={member.name}
            accent={accent}
            header={
              <CrewColumnHeader
                member={member}
                count={mine.length + goals.length}
                subtitle={`${mine.length} task${mine.length !== 1 ? "s" : ""} · ${activeGoals} goal${activeGoals !== 1 ? "s" : ""} · ${owned} owned · ${totalW}w`}
              />
            }
            onAdd={() => onAdd(member.id)}
          >
            {mine.length === 0 && goals.length === 0 ? (
              <EmptyState>Nothing assigned</EmptyState>
            ) : (
              <>
                {mine.map(({ entity, state }) => (
                  <EntityRow
                    key={entity.id}
                    entity={entity}
                    showSummary={false}
                    showTypeGlyph
                    trailing={
                      <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
                        <StateChip state={state} entityType={entity.type} />
                        <AssignControl entity={entity} />
                      </Stack>
                    }
                  />
                ))}
                {goals.map((goal) => (
                  <CompactGoalRow
                    key={goal.id}
                    goal={goal}
                    accent={goal.goalType === "relationship" ? "#22d3ee" : "#a78bfa"}
                    onToggle={updateEntityGoalStatus}
                    onInspect={() => {
                      const v = visionGoalBySeedId(goal.id);
                      if (v) setInspectVision(v);
                    }}
                  />
                ))}
              </>
            )}
          </Column>
        );
      })}
    </Stack>
    <VisionGoalDrawer goal={inspectVision} onClose={() => setInspectVision(null)} />
    </>
  );
}

function MixedCardsContent({ onAdd }: { onAdd: (memberId: string) => void }) {
  const { store, state, inspect, goalsFor, updateEntityGoalStatus } = useCommandCenter();

  const tasksByMember = React.useMemo(() => {
    const map = new Map<string, Array<{ entity: Entity; astate: AssignmentState }>>();
    for (const a of state.assignments) {
      if (a.state === "offered" || a.state === "accepted") {
        const entity = store.getEntity(a.entityId);
        if (!entity || !isAssignable(entity)) continue;
        const list = map.get(a.profileId) ?? [];
        list.push({ entity, astate: a.state });
        map.set(a.profileId, list);
      }
    }
    return map;
  }, [store, state.assignments]);

  return (
    <Stack spacing={3} sx={{ overflowY: "auto", height: "100%", p: 1.5 }}>
      {CREW.filter((member) => {
        const items = tasksByMember.get(member.id) ?? [];
        const goals = goalsFor(member.id);
        return CREW_PIN.includes(member.id) || items.length > 0 || goals.length > 0;
      }).map((member) => {
        const items = tasksByMember.get(member.id) ?? [];
        const goals = goalsFor(member.id);
        const visionGoals = crewVisionGoals(member.id);
        const extraGoals = goals.filter((g) => !visionGoalBySeedId(g.id));
        const activeGoals = goals.filter((g) => g.status === "active").length;
        const empty = items.length === 0 && visionGoals.length === 0 && extraGoals.length === 0;

        return (
          <Box key={member.id}>
            <MemberSectionHeader
              member={member}
              count={items.length + goals.length}
              subtitle={`${items.length} task${items.length !== 1 ? "s" : ""} · ${activeGoals} active goal${activeGoals !== 1 ? "s" : ""}`}
              onAdd={() => onAdd(member.id)}
            />
            {empty ? (
              <Box
                sx={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 220, height: 180, borderRadius: 2,
                  border: "1px dashed", borderColor: "divider",
                  color: "text.disabled", fontSize: 13, fontWeight: 600,
                }}
              >
                Nothing assigned
              </Box>
            ) : (
              <Stack spacing={1.5}>
                {items.length > 0 && (
                  <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
                    {items.map(({ entity, astate }) => {
                      const config = assignmentConfigFor(entity.type);
                      const stateLabel =
                        astate === "offered"  ? config.stateLabels.offered :
                        astate === "accepted" ? config.stateLabels.accepted :
                        astate === "declined" ? config.stateLabels.declined :
                        config.stateLabels.done;
                      const stateColor = ASSIGNMENT_STATE_COLOR[astate];
                      const props = entityToTaskCardProps(entity, member.name);
                      return (
                        <Box
                          key={entity.id}
                          onClick={() => inspect(entity.id)}
                          sx={{ position: "relative", cursor: "pointer", "&:hover .inspect-hint": { opacity: 1 } }}
                        >
                          <HomeworkTaskCard {...props} />
                          <Chip
                            label={stateLabel}
                            size="small"
                            sx={{
                              position: "absolute", top: 6, right: 6,
                              height: 18, fontSize: 9, fontWeight: 800,
                              color: stateColor, bgcolor: alpha(stateColor, 0.15),
                              border: "1px solid", borderColor: alpha(stateColor, 0.3),
                              "& .MuiChip-label": { px: 0.75 },
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Stack>
                )}
                <JannaGoalCards goals={visionGoals} />
                {extraGoals.length > 0 && (
                  <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
                    {extraGoals.map((goal) => (
                      <CrewGoalCard key={goal.id} goal={goal} onStatusChange={updateEntityGoalStatus} />
                    ))}
                  </Stack>
                )}
              </Stack>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

// ─── Create drawer ────────────────────────────────────────────────────────────

interface CreateDrawerProps {
  open: boolean;
  contentType: Exclude<ContentType, "all">;
  defaultMemberId?: string;
  onClose: () => void;
}

function CreateDrawer({ open, contentType, defaultMemberId, onClose }: CreateDrawerProps) {
  const theme = useTheme();
  const { addEntityGoal, addEntity, assign } = useCommandCenter();

  const [memberId, setMemberId]     = React.useState(defaultMemberId ?? CREW[0]?.id ?? "");
  const [title, setTitle]           = React.useState("");
  const [description, setDesc]      = React.useState("");
  const [priority, setPriority]     = React.useState<GoalPriority>("medium");
  const [points, setPoints]         = React.useState<TICKET_POINT_OPTIONS>(TICKET_POINT_OPTIONS.THREE_POINTS);
  const [hasError, setHasError]     = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setMemberId(defaultMemberId ?? CREW[0]?.id ?? "");
      setTitle("");
      setDesc("");
      setPriority("medium");
      setPoints(TICKET_POINT_OPTIONS.THREE_POINTS);
      setHasError(false);
    }
  }, [open, defaultMemberId]);

  const isTask     = contentType === "tasks";
  const isCreative = contentType === "creative";
  const isGoal     = !isTask && !isCreative;

  const drawerTitle =
    isTask     ? "New Work Task" :
    isCreative ? "New Creative Item" :
    contentType === "relationship" ? "New Relationship Goal" : "New Personal Goal";

  const accentColor =
    isTask     ? theme.palette.primary.main :
    isCreative ? "#f59e0b" :
    contentType === "relationship" ? "#22d3ee" : "#a78bfa";

  function handleSubmit() {
    if (!title.trim()) { setHasError(true); return; }

    if (isTask || isCreative) {
      const now = Date.now();
      const entityType = isCreative ? "sequence" : "action";
      const entity: Entity = {
        id:        `task-${now}`,
        slug:      title.trim().toLowerCase().replace(/\s+/g, "-"),
        type:      entityType,
        name:      title.trim(),
        traits: [
          { kind: "status", value: "idea" },
          { kind: "weight", value: points },
        ],
        meta:      { summary: description.trim() || undefined },
        createdAt: now,
      };
      addEntity(entity);
      if (memberId) assign(entity.id, memberId);
    } else {
      addEntityGoal({
        targetEntityId:   memberId,
        targetEntityType: "profile",
        authorId:         "self",
        goalType:         contentType as GoalType,
        title:            title.trim(),
        description:      description.trim() || undefined,
        status:           "active",
        priority,
      });
    }
    onClose();
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 340,
            bgcolor: "background.paper",
            borderLeft: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          px: 2, py: 1.5,
          borderBottom: "1px solid", borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box sx={{ width: 4, height: 20, borderRadius: 999, bgcolor: accentColor, mr: 1.25, flexShrink: 0 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1 }}>{drawerTitle}</Typography>
        <IconButton size="small" onClick={onClose} sx={{ p: 0.5 }}>
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>

      {/* Form */}
      <Stack spacing={2.5} sx={{ p: 2.5, flex: 1, overflowY: "auto" }}>
        {/* Member selector */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
            For
          </Typography>
          <Select
            size="small"
            fullWidth
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            renderValue={(v) => {
              const m = CREW.find((c) => c.id === v);
              return m ? (
                <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                  <CrewAvatar member={m} size={20} />
                  <span>{m.name}</span>
                </Stack>
              ) : "";
            }}
            sx={{ "& .MuiSelect-select": { display: "flex", alignItems: "center" } }}
          >
            {CREW.map((m) => (
              <MenuItem key={m.id} value={m.id} sx={{ gap: 1 }}>
                <CrewAvatar member={m} size={22} />
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Title */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Title *
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder={
              isTask ? "e.g. Write the Q3 report" :
              isCreative ? "e.g. Scene 3 — Campus reveal" :
              "e.g. Check in more regularly"
            }
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (hasError) setHasError(false); }}
            error={hasError}
            helperText={hasError ? "Title is required" : undefined}
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
          />
        </Box>

        {/* Description */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Description
          </Typography>
          <TextField
            size="small"
            fullWidth
            multiline
            rows={3}
            placeholder="Optional context or details…"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Box>

        {/* Points (task/creative mode) */}
        {(isTask || isCreative) && (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Points / Difficulty
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
              {POINT_OPTIONS.map((pt) => (
                <ButtonBase
                  key={pt}
                  onClick={() => setPoints(pt)}
                  sx={{
                    px: 1.25, py: 0.5, borderRadius: 999, border: "1px solid",
                    borderColor: points === pt ? accentColor : "divider",
                    bgcolor: points === pt ? alpha(accentColor, 0.1) : "transparent",
                    color: points === pt ? accentColor : "text.secondary",
                    fontSize: 12, fontWeight: 700, transition: "all 150ms",
                  }}
                >
                  {pt}pt
                </ButtonBase>
              ))}
            </Stack>
          </Box>
        )}

        {/* Priority (goal mode) */}
        {isGoal && (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", mb: 0.75, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>
              Priority
            </Typography>
            <Stack direction="row" sx={{ gap: 0.75 }}>
              {PRIORITY_OPTIONS.map(({ value, color }) => (
                <ButtonBase
                  key={value}
                  onClick={() => setPriority(value)}
                  sx={{
                    px: 1.25, py: 0.5, borderRadius: 999, border: "1px solid",
                    borderColor: priority === value ? color : "divider",
                    bgcolor: priority === value ? alpha(color, 0.12) : "transparent",
                    color: priority === value ? color : "text.secondary",
                    fontSize: 12, fontWeight: 700, textTransform: "capitalize", transition: "all 150ms",
                  }}
                >
                  {value}
                </ButtonBase>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>

      {/* Submit */}
      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", flexShrink: 0 }}>
        <ButtonBase
          onClick={handleSubmit}
          sx={{
            width: "100%", py: 1.25, borderRadius: 1.5,
            bgcolor: accentColor, color: "#fff",
            fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
            transition: "filter 150ms",
            "&:hover": { filter: "brightness(1.1)" },
            "&:active": { filter: "brightness(0.95)" },
          }}
        >
          {isTask ? "Create Task & Assign" : isCreative ? "Create & Pitch" : "Add Goal"}
        </ButtonBase>
      </Box>
    </Drawer>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

function drawerCreateLabel(type: ContentType): string {
  if (type === "tasks") return "task";
  if (type === "creative") return "creative item";
  if (type === "all") return "item";
  return "goal";
}

export function CrewView() {
  const theme = useTheme();
  const { store, state, goalsFor } = useCommandCenter();

  const [contentType, setContentType] = React.useState<ContentType>("all");
  const [layoutMode,  setLayoutMode]  = React.useState<LayoutMode>("cards");
  const [drawerOpen,  setDrawerOpen]  = React.useState(false);
  const [drawerMemberId, setDrawerMemberId] = React.useState<string | undefined>();
  const [drawerType, setDrawerType] = React.useState<Exclude<ContentType, "all">>("tasks");

  function resolveCreateType(memberId?: string): Exclude<ContentType, "all"> {
    if (contentType !== "all") return contentType;
    if (memberId === CREW_JANNA_ID || memberId === CREW_CHILDREN_ID) return "personal";
    return "tasks";
  }

  function openCreate(memberId?: string) {
    setDrawerMemberId(memberId);
    setDrawerType(resolveCreateType(memberId));
    setDrawerOpen(true);
  }

  const isCreative = contentType === "creative";
  const isAll = contentType === "all";

  const work = React.useMemo(
    () => store.allEntities().filter((e) =>
      isAll ? isAssignable(e) : isCreative ? CREATIVE_TYPES.has(e.type) : isAssignable(e) && !CREATIVE_TYPES.has(e.type)
    ),
    [store, isCreative, isAll],
  );

  const assignedCount = React.useMemo(
    () =>
      new Set(
        state.assignments
          .filter((a) => a.state === "offered" || a.state === "accepted")
          .map((a) => a.entityId),
      ).size,
    [state.assignments],
  );

  const goalCount = React.useMemo(
    () => CREW.reduce((n, m) => n + goalsFor(m.id).length, 0),
    [goalsFor],
  );

  return (
    <>
      <Stack
        sx={{
          flex: 1,
          height: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {/* ── Primary header ── */}
        <Stack
          direction="row"
          sx={{
            px: 1.5, py: 0.85,
            borderBottom: "1px solid", borderColor: "divider",
            alignItems: "center", gap: 1, flexShrink: 0,
          }}
        >
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <CrewGlyph size={18} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1 }}>
            Crew
          </Typography>

          {(contentType === "tasks" || contentType === "creative" || contentType === "all") && (
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              {isAll
                ? `${work.length} tasks · ${goalCount} goals`
                : `${work.length - assignedCount} unassigned · ${work.length} total`}
            </Typography>
          )}

          <ToggleButtonGroup
            size="small"
            exclusive
            value={layoutMode}
            onChange={(_, v) => v && setLayoutMode(v)}
            sx={{ "& .MuiToggleButton-root": { border: "none", p: 0.5 } }}
          >
            <ToggleButton value="board" aria-label="Board view">
              <ViewKanbanRoundedIcon sx={{ fontSize: 17 }} />
            </ToggleButton>
            <ToggleButton value="cards" aria-label="Cards view">
              <GridViewRoundedIcon sx={{ fontSize: 17 }} />
            </ToggleButton>
          </ToggleButtonGroup>

          <Tooltip title={`New ${drawerCreateLabel(contentType)}`} arrow>
            <IconButton
              size="small"
              onClick={() => openCreate(undefined)}
              sx={{
                color: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.16) },
              }}
            >
              <AddRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* ── Content type tabs ── */}
        <Stack
          direction="row"
          sx={{ borderBottom: "1px solid", borderColor: "divider", flexShrink: 0, overflow: "hidden" }}
        >
          {CONTENT_TABS.map(({ value, label, Icon }) => {
            const active = contentType === value;
            const accent =
              value === "relationship" ? "#22d3ee" :
              value === "personal"     ? "#a78bfa" :
              value === "creative"     ? "#f59e0b" :
              theme.palette.primary.main;

            return (
              <ButtonBase
                key={value}
                onClick={() => setContentType(value)}
                sx={{
                  flex: 1, px: 1, py: 0.9,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5,
                  borderBottom: "2px solid",
                  borderColor: active ? accent : "transparent",
                  color: active ? accent : "text.secondary",
                  fontSize: 11,
                  fontWeight: active ? 800 : 600,
                  letterSpacing: 0.2,
                  transition: "all 140ms ease",
                  "&:hover": { color: active ? accent : "text.primary", bgcolor: alpha(accent, 0.05) },
                }}
              >
                <Icon sx={{ fontSize: 14 }} />
                {label}
              </ButtonBase>
            );
          })}
        </Stack>

        {/* ── Content area ── */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          {contentType === "all" ? (
            layoutMode === "board" ? (
              <MixedBoardContent onAdd={openCreate} />
            ) : (
              <MixedCardsContent onAdd={openCreate} />
            )
          ) : (contentType === "tasks" || contentType === "creative") ? (
            layoutMode === "board" ? (
              <TaskBoardContent onAdd={openCreate} isCreative={isCreative} />
            ) : (
              <TaskCardsContent onAdd={openCreate} isCreative={isCreative} />
            )
          ) : layoutMode === "board" ? (
            <GoalBoardContent goalType={contentType as GoalType} onAdd={openCreate} />
          ) : (
            <GoalCardsContent goalType={contentType as GoalType} onAdd={openCreate} />
          )}
        </Box>
      </Stack>

      <CreateDrawer
        open={drawerOpen}
        contentType={drawerType}
        defaultMemberId={drawerMemberId}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
