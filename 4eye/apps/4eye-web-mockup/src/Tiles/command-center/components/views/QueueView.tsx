"use client";

/**
 * Command Center — My Queue view.
 *
 * The assignee's POV: a Tinder-style deck of the work currently *offered* to the
 * selected crew member. One card at a time, resolved by swipe, button, or arrow
 * key:
 *   →  accept  (you become the owner)
 *   ←  decline (sent back to the planner)
 *   ↑  later   (keep it, move to the back of the deck)
 *   ↓  done    (mark complete)
 *
 * Action labels adapt to the entity type via {@link assignmentConfigFor} —
 * e.g. creative sequences show "Pitched / In Review / Approved" instead of
 * "Offered / Accepted / Done".
 */

import * as React from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { Symbol } from "@4eye/features";
import { getTrait, type Entity } from "@4eye/types";

import { useCommandCenter, type AssignmentState } from "../../store/CommandCenterProvider";
import { CREW, assignmentConfigFor } from "../../store/crew";
import { CrewAvatar } from "../CrewAvatar";
import { EntityTypeGlyph, QueueGlyph } from "../planning-glyphs";
import { WeightMeter, StatusBadge } from "../../../entity-tile/components/slot-visuals";
import { summaryOf } from "../EntityControls";
import { Panel, EmptyState } from "./shared";

type Dir = "right" | "left" | "up" | "down";

interface ActionMeta {
  label: string;
  color: string;
  icon: React.ReactNode;
  next: AssignmentState | null;
}

function buildActions(entityType: string): Record<Dir, ActionMeta> {
  const config = assignmentConfigFor(entityType);
  return {
    left:  { label: config.stateLabels.declined, color: "#ef4444", icon: <CloseRoundedIcon />,      next: "declined" },
    up:    { label: "Later",                      color: "#f59e0b", icon: <AccessTimeRoundedIcon />, next: null },
    down:  { label: config.stateLabels.done,      color: "#64748b", icon: <DoneAllRoundedIcon />,   next: "done" },
    right: { label: config.stateLabels.accepted,  color: "#22c55e", icon: <CheckRoundedIcon />,     next: "accepted" },
  };
}

const THRESHOLD = 90;

function Card({
  entity,
  actions,
  onCommit,
  onLater,
}: {
  entity: Entity;
  actions: Record<Dir, ActionMeta>;
  onCommit: (dir: Dir) => void;
  onLater: () => void;
}) {
  const theme = useTheme();
  const [drag, setDrag] = React.useState({ x: 0, y: 0 });
  const [flying, setFlying] = React.useState<Dir | null>(null);
  const start = React.useRef<{ x: number; y: number } | null>(null);

  const status = getTrait(entity.traits, "status")?.value;
  const weight = getTrait(entity.traits, "weight")?.value;
  const summary = summaryOf(entity);

  const hint: Dir | null = React.useMemo(() => {
    if (flying) return flying;
    const { x, y } = drag;
    if (Math.abs(x) < 24 && Math.abs(y) < 24) return null;
    if (Math.abs(x) >= Math.abs(y)) return x > 0 ? "right" : "left";
    return y > 0 ? "down" : "up";
  }, [drag, flying]);

  const fling = React.useCallback(
    (dir: Dir) => {
      setFlying(dir);
      window.setTimeout(() => {
        if (dir === "up") onLater();
        else onCommit(dir);
        setFlying(null);
        setDrag({ x: 0, y: 0 });
        start.current = null;
      }, 200);
    },
    [onCommit, onLater],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (flying) return;
    start.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current || flying) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onPointerUp = () => {
    if (!start.current || flying) return;
    const { x, y } = drag;
    if (Math.abs(x) >= Math.abs(y) && Math.abs(x) > THRESHOLD) {
      fling(x > 0 ? "right" : "left");
    } else if (Math.abs(y) > THRESHOLD) {
      fling(y > 0 ? "down" : "up");
    } else {
      setDrag({ x: 0, y: 0 });
      start.current = null;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, Dir> = {
      ArrowRight: "right", ArrowLeft: "left", ArrowUp: "up", ArrowDown: "down",
    };
    const dir = map[e.key];
    if (dir) { e.preventDefault(); fling(dir); }
  };

  const pos = flying
    ? { right: { x: 600, y: 0 }, left: { x: -600, y: 0 }, up: { x: 0, y: -600 }, down: { x: 0, y: 600 } }[flying]
    : drag;
  const rot = pos.x / 18;

  // Entity type label — use the "offered" label from config as the mode tag
  const config = assignmentConfigFor(entity.type);
  const typeTag = `${entity.type} · ${config.stateLabels.offered}`;

  return (
    <Box
      role="group"
      aria-label={`${entity.name} — swipe to resolve`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        p: 2.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: hint ? alpha(actions[hint].color, 0.7) : "divider",
        bgcolor: "background.paper",
        boxShadow: theme.shadows[6],
        cursor: flying ? "default" : "grab",
        touchAction: "none",
        userSelect: "none",
        transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rot}deg)`,
        transition: flying || start.current === null ? "transform 200ms ease" : "none",
        "&:focus-visible": { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
      }}
    >
      {/* Directional hint stamp */}
      {hint && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: hint === "right" ? 16 : undefined,
            right: hint === "left" ? 16 : undefined,
            ...(hint === "up" || hint === "down" ? { left: "50%", transform: "translateX(-50%)" } : {}),
            px: 1.25,
            py: 0.5,
            borderRadius: 2,
            border: `2.5px solid ${actions[hint].color}`,
            color: actions[hint].color,
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: 1,
            textTransform: "uppercase",
            opacity: 0.92,
          }}
        >
          {actions[hint].label}
        </Box>
      )}

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Box sx={{ color: "text.disabled", display: "flex" }}>
          <EntityTypeGlyph type={entity.type} size={18} />
        </Box>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>
          {typeTag}
        </Typography>
      </Stack>

      <Stack sx={{ flex: 1, alignItems: "center", justifyContent: "center", textAlign: "center", gap: 1.5 }}>
        {entity.symbol && (
          <Symbol name={entity.symbol} color={entity.symbolColor ?? "slate"} size={56} />
        )}
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
          {entity.name}
        </Typography>
        {summary && (
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 380 }}>
            {summary}
          </Typography>
        )}
      </Stack>

      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 1.5, mt: 1.5 }}>
        {status && <StatusBadge status={status} />}
        {weight != null && <WeightMeter weight={weight} width={72} />}
      </Stack>
    </Box>
  );
}

function ActionButton({ dir, actions, onClick }: { dir: Dir; actions: Record<Dir, ActionMeta>; onClick: () => void }) {
  const meta = actions[dir];
  return (
    <Tooltip title={meta.label} arrow>
      <IconButton
        onClick={onClick}
        aria-label={meta.label}
        sx={{
          width: 48,
          height: 48,
          color: meta.color,
          border: "2px solid",
          borderColor: alpha(meta.color, 0.5),
          bgcolor: alpha(meta.color, 0.08),
          "&:hover": { bgcolor: alpha(meta.color, 0.16), borderColor: meta.color },
        }}
      >
        {meta.icon}
      </IconButton>
    </Tooltip>
  );
}

export function QueueView() {
  const { store, state, queueFor, setAssignmentState, setActiveCrew } = useCommandCenter();
  const activeId = state.activeCrewId ?? CREW[0]?.id;

  const offeredIds = React.useMemo(
    () => (activeId ? queueFor(activeId, "offered").map((a) => a.entityId) : []),
    [activeId, queueFor],
  );
  const [seq, setSeq] = React.useState<string[]>(offeredIds);

  React.useEffect(() => {
    setSeq((prev) => {
      const live = new Set(offeredIds);
      const kept = prev.filter((id) => live.has(id));
      const added = offeredIds.filter((id) => !kept.includes(id));
      const next = [...kept, ...added];
      const same = next.length === prev.length && next.every((id, i) => id === prev[i]);
      return same ? prev : next;
    });
  }, [offeredIds]);

  const current = seq.length > 0 ? store.getEntity(seq[0]) : undefined;

  // Build actions from the current card's entity type so labels adapt.
  const actions = React.useMemo(
    () => buildActions(current?.type ?? "action"),
    [current?.type],
  );

  const commit = React.useCallback(
    (dir: Dir) => {
      const meta = actions[dir];
      if (!current || !activeId || meta.next === null) return;
      setAssignmentState(current.id, activeId, meta.next);
    },
    [actions, current, activeId, setAssignmentState],
  );
  const later = React.useCallback(() => {
    setSeq((prev) => (prev.length > 1 ? [...prev.slice(1), prev[0]] : prev));
  }, []);

  const activeMember = CREW.find((m) => m.id === activeId);

  return (
    <Panel
      title="My Queue"
      fill
      glyph={
        <Box sx={{ color: "primary.main", display: "flex" }}>
          <QueueGlyph size={18} />
        </Box>
      }
      action={
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
            as
          </Typography>
          <Select
            size="small"
            value={activeId ?? ""}
            onChange={(e) => setActiveCrew(e.target.value)}
            aria-label="Act as crew member"
            sx={{
              height: 30,
              fontSize: 12,
              fontWeight: 700,
              "& .MuiSelect-select": { py: 0.25, pl: 1, display: "flex", alignItems: "center", gap: 0.75 },
            }}
            renderValue={() =>
              activeMember ? (
                <>
                  <CrewAvatar member={activeMember} size={20} />
                  {activeMember.name}
                </>
              ) : ""
            }
          >
            {CREW.map((m) => (
              <MenuItem key={m.id} value={m.id} sx={{ gap: 1, fontSize: 13, fontWeight: 600 }}>
                <CrewAvatar member={m} size={22} />
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      }
    >
      <Stack sx={{ alignItems: "center", gap: 2, height: "100%", justifyContent: "center" }}>
        {!current ? (
          <EmptyState>
            {activeMember ? `${activeMember.name} has no offers waiting.` : "No crew selected."}
            <br />
            Offer work from the Crew board to fill this deck.
          </EmptyState>
        ) : (
          <>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              {seq.length} offer{seq.length === 1 ? "" : "s"} waiting
            </Typography>
            <Box sx={{ position: "relative", width: "100%", maxWidth: 440, height: 360 }}>
              {seq[1] && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    transform: "translateY(12px) scale(0.96)",
                    opacity: 0.6,
                  }}
                />
              )}
              <Card key={current.id} entity={current} actions={actions} onCommit={commit} onLater={later} />
            </Box>
            <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
              <ActionButton dir="left"  actions={actions} onClick={() => commit("left")} />
              <ActionButton dir="up"    actions={actions} onClick={later} />
              <ActionButton dir="down"  actions={actions} onClick={() => commit("down")} />
              <ActionButton dir="right" actions={actions} onClick={() => commit("right")} />
            </Stack>
          </>
        )}
      </Stack>
    </Panel>
  );
}
