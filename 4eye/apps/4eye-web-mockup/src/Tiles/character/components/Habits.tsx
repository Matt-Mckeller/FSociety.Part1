"use client";

/**
 * Character — Routine panel.
 *
 * Shows the equipped routine with streaks, today's progress, and time slots.
 * Library view shows all available practices with equip/unequip affordance.
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { HabitGlyph } from "./HabitGlyphs";

import {
  HABITS,
  HABIT_GROUPS,
  CATEGORY_META,
  TIME_SLOT_LABEL,
  type HabitMeta,
  type HabitGroup,
} from "../model/habits";
import { useProfileStore } from "../store/CharacterProfileStore";

/* --------------------------------------------------------- streak badge */

function StreakBadge({ streak, color }: { streak: number; color: string }) {
  if (!streak) return null;
  return (
    <Stack direction="row" spacing={0.35} sx={{ alignItems: "center", color }}>
      <LocalFireDepartmentRoundedIcon sx={{ fontSize: 13 }} />
      <Typography sx={{ fontSize: "0.65rem", fontWeight: 800 }}>{streak}</Typography>
    </Stack>
  );
}

/* ---------------------------------------------------------- habit row (equipped) */

function HabitRow({ habit }: { habit: HabitMeta }) {
  const { state, dispatch } = useProfileStore();
  const hs = state.habitState[habit.id] ?? { progress: habit.todayProgress ?? 0 };
  const c = habit.color;
  const prog = hs.progress;
  const complete = prog >= 1;

  const handleMark = () => {
    if (!complete) dispatch({ type: "mark-habit-done", habitId: habit.id });
  };

  return (
    <Box
      onClick={handleMark}
      sx={{
        p: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: complete ? alpha(c, 0.4) : "divider",
        bgcolor: complete ? alpha(c, 0.05) : "background.paper",
        cursor: complete ? "default" : "pointer",
        transition: "border-color .15s, background-color .15s",
        "&:hover": complete ? {} : { borderColor: alpha(c, 0.35), bgcolor: alpha(c, 0.03) },
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: prog > 0 && !complete ? 0.75 : 0 }}>
        {/* Completion orb */}
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: complete ? c : alpha(c, 0.35),
            bgcolor: complete ? c : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .15s",
          }}
        >
          {complete && <CheckCircleRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />}
        </Box>
        <Box sx={{ flexShrink: 0, display: "flex", color: complete ? c : "text.secondary" }}>
          <HabitGlyph id={habit.id} size={19} title={habit.label} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: complete ? c : "text.primary", textDecoration: complete ? "line-through" : "none" }}>
              {habit.label}
            </Typography>
            {habit.schedule.timeSlots.slice(0, 2).map((ts) => (
              <Chip
                key={ts}
                label={TIME_SLOT_LABEL[ts]}
                size="small"
                sx={{
                  height: 16,
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  bgcolor: alpha(c, 0.1),
                  color: c,
                  "& .MuiChip-label": { px: 0.6 },
                }}
              />
            ))}
          </Stack>
          {habit.schedule.durationMin && (
            <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.6rem" }}>
              ~{habit.schedule.durationMin} min
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexShrink: 0 }}>
          {(habit.streak ?? 0) > 0 && <StreakBadge streak={habit.streak!} color={c} />}
        </Stack>
      </Stack>
      {prog > 0 && !complete && (
        <LinearProgress
          variant="determinate"
          value={prog * 100}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: alpha(c, 0.12),
            "& .MuiLinearProgress-bar": { bgcolor: c, borderRadius: 2 },
          }}
        />
      )}
    </Box>
  );
}

/* ---------------------------------------------------------- library card */

function HabitLibraryCard({
  habit,
  onToggle,
}: {
  habit: HabitMeta;
  onToggle: (id: string) => void;
}) {
  const c = habit.color;
  const catMeta = CATEGORY_META[habit.category];

  return (
    <Box
      sx={{
        p: 1.1,
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: habit.equipped ? alpha(c, 0.4) : "divider",
        bgcolor: habit.equipped ? alpha(c, 0.05) : "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
      }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1 }}>
        <Box sx={{ flexShrink: 0, display: "flex", color: habit.equipped ? c : "text.disabled" }}>
          <HabitGlyph id={habit.id} size={21} title={habit.label} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", display: "block", lineHeight: 1.2 }}>
            {habit.label}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.65rem" }}>
            {habit.description}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={0.5}>
          <Chip
            label={catMeta.label}
            size="small"
            sx={{
              height: 18,
              fontSize: "0.6rem",
              fontWeight: 700,
              bgcolor: alpha(catMeta.color, 0.1),
              color: catMeta.color,
              "& .MuiChip-label": { px: 0.6 },
            }}
          />
          <Chip
            label={habit.schedule.frequency === "multiple-daily" ? "Multiple / day" : habit.schedule.frequency.charAt(0).toUpperCase() + habit.schedule.frequency.slice(1)}
            size="small"
            sx={{
              height: 18,
              fontSize: "0.6rem",
              fontWeight: 700,
              "& .MuiChip-label": { px: 0.6 },
            }}
          />
        </Stack>
        <IconButton
          size="small"
          onClick={() => onToggle(habit.id)}
          sx={{
            width: 24,
            height: 24,
            bgcolor: habit.equipped ? alpha(c, 0.15) : "action.hover",
            color: habit.equipped ? c : "text.secondary",
          }}
        >
          {habit.equipped ? <RemoveRoundedIcon sx={{ fontSize: 14 }} /> : <AddRoundedIcon sx={{ fontSize: 14 }} />}
        </IconButton>
      </Stack>
    </Box>
  );
}

/* ---------------------------------------------------------- symbol group */

function HabitGroupCard({
  group,
  habits,
}: {
  group: HabitGroup;
  habits: HabitMeta[];
}) {
  const { state } = useProfileStore();
  const [open, setOpen] = React.useState(false);
  const members = group.habitIds
    .map((id) => habits.find((h) => h.id === id))
    .filter((h): h is HabitMeta => Boolean(h));
  const equipped = members.filter((h) => h.equipped);
  if (equipped.length === 0) return null;

  const c = group.color;
  const done = equipped.filter((h) => (state.habitState[h.id]?.progress ?? h.todayProgress ?? 0) >= 1).length;

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(c, 0.28),
        bgcolor: alpha(c, 0.04),
        overflow: "hidden",
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.1,
          py: 0.9,
          border: 0,
          bgcolor: "transparent",
          cursor: "pointer",
          font: "inherit",
          textAlign: "left",
          "&:hover": { bgcolor: alpha(c, 0.06) },
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 0.35, flexShrink: 0 }}>
          {equipped.slice(0, 4).map((h) => (
            <Box
              key={h.id}
              sx={{
                width: 26,
                height: 26,
                borderRadius: 1.25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(h.color, 0.12),
                color: h.color,
                border: "1px solid",
                borderColor: alpha(h.color, 0.3),
              }}
            >
              <HabitGlyph id={h.id} size={15} title={h.label} />
            </Box>
          ))}
        </Stack>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: c, display: "block", lineHeight: 1.2 }}>
            {group.label}
          </Typography>
          <Typography sx={{ fontSize: "0.58rem", color: "text.disabled", fontWeight: 600 }}>
            {group.hint} · {done}/{equipped.length}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: alpha(c, 0.85) }}>
          {open ? "−" : "+"}
        </Typography>
      </Box>
      {open && (
        <Stack spacing={0.65} sx={{ px: 1, pb: 1 }}>
          {equipped.map((h) => (
            <HabitRow key={h.id} habit={h} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

/* --------------------------------------------------------------- main panel */

type HabitsTab = "routine" | "library";

export function HabitsPanel() {
  const { state, dispatch } = useProfileStore();
  const [tab, setTab] = React.useState<HabitsTab>("routine");

  const habits = React.useMemo(
    () => HABITS.map((h) => ({ ...h, equipped: state.habitEquipped[h.id] ?? h.equipped })),
    [state.habitEquipped],
  );

  const equipped = habits.filter((h) => h.equipped);
  const groupedIds = new Set(HABIT_GROUPS.flatMap((g) => g.habitIds));
  const ungrouped = equipped.filter((h) => !groupedIds.has(h.id));

  const toggleEquip = (id: string) => {
    dispatch({ type: "toggle-habit-equip", habitId: id });
  };

  const completedToday = equipped.filter((h) => (state.habitState[h.id]?.progress ?? h.todayProgress ?? 0) >= 1).length;

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1.5 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ minHeight: 36, "& .MuiTab-root": { minHeight: 36, py: 0, fontSize: "0.72rem", fontWeight: 700 } }}
        >
          <Tab value="routine" label="Today" />
          <Tab value="library" label="Library" />
        </Tabs>
      </Box>

      {tab === "routine" && (
        <Stack spacing={1.1}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {completedToday} of {equipped.length} · symbol groups
            </Typography>
            <LinearProgress
              variant="determinate"
              value={equipped.length > 0 ? (completedToday / equipped.length) * 100 : 0}
              sx={{ width: 80, height: 5, borderRadius: 2 }}
            />
          </Stack>

          {HABIT_GROUPS.map((g) => (
            <HabitGroupCard key={g.id} group={g} habits={habits} />
          ))}

          {ungrouped.length > 0 && (
            <Stack spacing={0.75}>
              {ungrouped.map((h) => (
                <HabitRow key={h.id} habit={h} />
              ))}
            </Stack>
          )}

          {equipped.length === 0 && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Nothing in the routine yet. Open the library to equip practices.
            </Typography>
          )}
        </Stack>
      )}

      {tab === "library" && (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 1 }}>
          {habits.map((h) => (
            <HabitLibraryCard key={h.id} habit={h} onToggle={toggleEquip} />
          ))}
        </Box>
      )}
    </Box>
  );
}

