"use client";

/**
 * Character — Daily Focus view (Today tab).
 *
 * Today's at-a-glance: habit completion checklist, active consumable timers,
 * current mood, top active buff, and a preview of the last 3 feed events.
 * All interactive — habits can be tapped complete, consumables show time left.
 */

import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import { useProfileStore } from "../store/CharacterProfileStore";
import { useFocusStack } from "../store/useFocusStack";
import { HABITS, TIME_SLOT_LABEL } from "../model/habits";
import { HabitGlyph } from "./HabitGlyphs";
import { MOOD_META } from "../model/status";
import { useCharacterSeedEffects, useCharacterStatus, useIsJannaProfile } from "../store/useCharacterPresentation";
import { CharacterFeed } from "./CharacterFeed";
import { timeLeftLabel } from "../lib/time";
import { FocusEditDialog } from "./shared/FocusEditDialog";

/* ──────────────────────────────────────────────────── today's #1 */

function TodayNumberOne({ compact = false }: { compact?: boolean }) {
  const { todayPin, todayActions, todaySubjects, revisions, dispatch } = useFocusStack();
  const [editing, setEditing] = React.useState(false);
  const editable = Boolean(dispatch);

  return (
    <>
    <Box
      role={editable ? "button" : undefined}
      tabIndex={editable ? 0 : undefined}
      onClick={editable ? () => setEditing(true) : undefined}
      onKeyDown={
        editable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setEditing(true);
              }
            }
          : undefined
      }
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha("#0ea5e9", 0.35),
        bgcolor: alpha("#0ea5e9", 0.06),
        cursor: editable ? "pointer" : "default",
        "&:hover": editable ? { borderColor: alpha("#0ea5e9", 0.55) } : undefined,
        "&:focus-visible": { outline: "2px solid #0ea5e9", outlineOffset: 2 },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "#0ea5e9",
          fontWeight: 800,
          letterSpacing: 0.6,
          display: "block",
          mb: 0.35,
          fontSize: "0.62rem",
        }}
      >
        TODAY · #{todayPin.rank}
        {editable ? " · edit" : ""}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
        {todayPin.label}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", fontSize: "0.62rem", mt: 0.35, lineHeight: 1.4 }}
      >
        {todayPin.detail}
      </Typography>

      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", gap: 0.45, mt: 0.85 }}
      >
        {todayActions.map((a, i) => (
          <Typography
            key={a.id}
            sx={{
              fontSize: "0.58rem",
              fontWeight: i === 0 ? 800 : 700,
              px: 0.7,
              py: 0.2,
              borderRadius: 999,
              border: "1px solid",
              borderColor: i === 0 ? alpha("#0ea5e9", 0.45) : "divider",
              bgcolor: i === 0 ? alpha("#0ea5e9", 0.12) : "transparent",
              color: i === 0 ? "#0ea5e9" : "text.secondary",
            }}
          >
            {i + 1}. {a.label}
          </Typography>
        ))}
      </Stack>

      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.45, mt: 0.65 }}>
        {todaySubjects.map((s) => (
          <Typography
            key={s.id}
            title={s.detail}
            sx={{
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: 0.04,
              px: 0.7,
              py: 0.2,
              borderRadius: 999,
              border: "1px solid",
              borderColor: alpha("#0ea5e9", 0.28),
              color: "text.primary",
            }}
          >
            {s.label}
          </Typography>
        ))}
      </Stack>

      {!compact && (
        <Typography
          variant="caption"
          sx={{ color: "text.disabled", display: "block", fontSize: "0.58rem", mt: 0.7, lineHeight: 1.4 }}
        >
          {todayActions[todayActions.length - 1]?.detail}
        </Typography>
      )}

    </Box>
      {dispatch && (
        <FocusEditDialog
          open={editing}
          onClose={() => setEditing(false)}
          slot="daily-1"
          label={todayPin.label}
          detail={todayPin.detail}
          revisions={revisions}
          onSave={({ label, detail }) =>
            dispatch({ type: "set-today-pin", label, detail })
          }
        />
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────── mood status */

function MoodStatus() {
  const status = useCharacterStatus();
  const moods = [
    { id: status.mood, intensity: status.moodIntensity },
    ...(status.additionalMoods ?? []),
  ];
  const lead = MOOD_META[status.mood];
  if (!lead) return null;
  const c = lead.color;
  const solid = Boolean(lead.chipBg);

  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: solid ? c : alpha(c, 0.2),
        bgcolor: lead.chipBg ?? alpha(c, 0.04),
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        {moods.map((m) => {
          const meta = MOOD_META[m.id];
          if (!meta) return null;
          const ink = meta.color;
          return (
            <Stack key={m.id} direction="row" sx={{ alignItems: "center", gap: 0.6 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: meta.color,
                  boxShadow: `0 0 8px ${alpha(meta.color, 0.7)}`,
                  flexShrink: 0,
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 800, color: ink }}>
                {meta.label}
              </Typography>
              <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, color: ink }}>
                {m.intensity}%
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Typography
        variant="caption"
        sx={{ color: solid ? alpha(c, 0.8) : "text.secondary", display: "block", fontSize: "0.62rem", mt: 0.5 }}
      >
        {status.currentContext}
      </Typography>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── active buffs ticker */

function ActiveBuffsTicker() {
  const { state } = useProfileStore();
  const seeded = useCharacterSeedEffects();
  const buffs = (seeded ?? state.activeEffects).filter((e) => e.kind === "buff");
  if (!buffs.length) return null;

  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: "text.disabled", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.75, fontSize: "0.65rem" }}
      >
        ACTIVE BUFFS
      </Typography>
      <Stack spacing={0.6}>
        {buffs.map((b) => {
          const c = b.color;
          return (
            <Stack
              key={b.id}
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1,
                p: 0.85,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: alpha(c, 0.25),
                bgcolor: alpha(c, 0.05),
              }}
            >
              <Typography sx={{ fontSize: "0.85rem" }}>{b.emoji ?? "⚡"}</Typography>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: c, lineHeight: 1 }}>
                  {b.label}
                </Typography>
                {b.attributeModifiers && b.attributeModifiers.length > 0 && (
                  <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.58rem", display: "block" }}>
                    {b.attributeModifiers.map((m) => `${m.label} ${m.delta > 0 ? "+" : ""}${m.delta}`).join(" · ")}
                  </Typography>
                )}
              </Box>
              <Stack direction="row" sx={{ alignItems: "center", gap: 0.4, flexShrink: 0 }}>
                <AccessTimeRoundedIcon sx={{ fontSize: 11, color: "text.disabled" }} />
                <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.6rem", fontWeight: 700 }}>
                  {timeLeftLabel(b.expiresAt)}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── habit checklist */

function HabitCheckItem({ habit }: { habit: typeof HABITS[number] }) {
  const { state, dispatch } = useProfileStore();
  const hs = state.habitState[habit.id] ?? { progress: habit.todayProgress ?? 0 };
  const done = hs.progress >= 1;
  const c = habit.color;

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        gap: 1,
        py: 0.6,
        px: 0.75,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: done ? alpha(c, 0.35) : "divider",
        bgcolor: done ? alpha(c, 0.05) : "transparent",
        cursor: done ? "default" : "pointer",
        transition: "all .15s",
        "&:hover": done ? {} : { borderColor: alpha(c, 0.3), bgcolor: alpha(c, 0.03) },
      }}
      onClick={() => !done && dispatch({ type: "mark-habit-done", habitId: habit.id })}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid",
          borderColor: done ? c : alpha(c, 0.35),
          bgcolor: done ? c : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all .15s",
        }}
      >
        {done && (
          <CheckCircleRoundedIcon sx={{ fontSize: 14, color: "#fff" }} />
        )}
      </Box>

      <Box sx={{ flexShrink: 0, display: "flex", color: done ? c : alpha(c, 0.7) }}>
        <HabitGlyph id={habit.id} size={16} title={habit.label} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: done ? c : "text.primary",
            textDecoration: done ? "line-through" : "none",
            lineHeight: 1.3,
          }}
        >
          {habit.label}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.disabled", fontSize: "0.58rem", display: "block" }}>
          {habit.schedule.timeSlots.map((ts) => TIME_SLOT_LABEL[ts]).join(" · ")}
          {habit.schedule.durationMin ? ` · ~${habit.schedule.durationMin}m` : ""}
        </Typography>
      </Box>

      {(habit.streak ?? 0) > 0 && (
        <Stack direction="row" spacing={0.3} sx={{ alignItems: "center", color: c, flexShrink: 0 }}>
          <LocalFireDepartmentRoundedIcon sx={{ fontSize: 12 }} />
          <Typography sx={{ fontSize: "0.62rem", fontWeight: 800 }}>{habit.streak}</Typography>
        </Stack>
      )}

      {!done && hs.progress > 0 && hs.progress < 1 && (
        <Box sx={{ width: 28, flexShrink: 0 }}>
          <LinearProgress
            variant="determinate"
            value={hs.progress * 100}
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: alpha(c, 0.12),
              "& .MuiLinearProgress-bar": { bgcolor: c, borderRadius: 2 },
            }}
          />
        </Box>
      )}
    </Stack>
  );
}

function HabitChecklist() {
  const { state } = useProfileStore();
  const equippedHabits = HABITS.filter((h) => state.habitEquipped[h.id] ?? h.equipped);
  const completedCount = equippedHabits.filter((h) => (state.habitState[h.id]?.progress ?? 0) >= 1).length;
  const pct = equippedHabits.length > 0 ? (completedCount / equippedHabits.length) * 100 : 0;

  const morning = equippedHabits.filter((h) => h.schedule.timeSlots.includes("morning"));
  const midday = equippedHabits.filter((h) =>
    (h.schedule.timeSlots.includes("midday") || h.schedule.timeSlots.includes("afternoon")) &&
    !h.schedule.timeSlots.includes("morning"),
  );
  const evening = equippedHabits.filter((h) =>
    (h.schedule.timeSlots.includes("evening") || h.schedule.timeSlots.includes("night")) &&
    !morning.includes(h) && !midday.includes(h),
  );
  const anytime = equippedHabits.filter((h) =>
    h.schedule.timeSlots.includes("anytime") && !morning.includes(h) && !midday.includes(h) && !evening.includes(h),
  );

  return (
    <Box>
      {/* Progress summary */}
      <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 1 }}>
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, fontSize: "0.65rem" }}>
          ROUTINE
        </Typography>
        <Box sx={{ flex: 1, height: 5, borderRadius: 1, bgcolor: alpha("#16a34a", 0.12), overflow: "hidden" }}>
          <Box
            sx={{
              width: `${pct}%`,
              height: "100%",
              bgcolor: "#16a34a",
              borderRadius: 1,
              transition: "width .4s ease",
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "#16a34a", fontWeight: 800, fontSize: "0.62rem", flexShrink: 0 }}>
          {completedCount}/{equippedHabits.length}
        </Typography>
      </Stack>

      {[
        { label: "🌅 Morning", items: morning },
        { label: "☀️ Midday", items: midday },
        { label: "🌙 Evening", items: evening },
        { label: "⏰ Any Time", items: anytime },
      ].map(({ label, items }) => {
        if (!items.length) return null;
        return (
          <Box key={label} sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, fontSize: "0.6rem", display: "block", mb: 0.5 }}>
              {label}
            </Typography>
            <Stack spacing={0.4}>
              {items.map((h) => <HabitCheckItem key={h.id} habit={h} />)}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}

/* ──────────────────────────────────────────────────── main panel */

export interface DailyFocusProps {
  /**
   * Drops the recent-activity feed and tightens spacing.
   *
   * The full panel is the right thing on the `today` lens and in the
   * integration-layers Human panel, where it owns the column. In the profile
   * page's surfaced band it sits in a narrow card beside four others, and the
   * feed duplicates the Events disclosure further down the same page — so
   * compact keeps what is actionable (mood, routine, active buffs) and drops
   * what is merely informational.
   *
   * Defaults off, so every existing caller is unchanged.
   */
  compact?: boolean;
}

export function DailyFocus({ compact = false }: DailyFocusProps = {}) {
  const isJanna = useIsJannaProfile();
  return (
    <Stack spacing={compact ? 1.25 : 2}>
      {!isJanna && <TodayNumberOne compact={compact} />}

      <MoodStatus />

      <HabitChecklist />

      <ActiveBuffsTicker />

      {!compact && (
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 0.4, display: "block", mb: 0.75, fontSize: "0.65rem" }}
          >
            RECENT ACTIVITY
          </Typography>
          <CharacterFeed limit={5} />
        </Box>
      )}
    </Stack>
  );
}
