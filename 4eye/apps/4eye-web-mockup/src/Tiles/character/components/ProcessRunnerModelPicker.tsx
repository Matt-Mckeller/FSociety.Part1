"use client";

/**
 * ProcessRunnerModelPicker — Power + Model selector for running processes.
 *
 * Uses the same ladder as AI Chat (Ion → Ion+ → Aion → Aion+). Persisted
 * separately so the Processes runner can default to Aion+ without touching
 * global chat settings.
 */

import * as React from "react";
import {
  Box,
  ButtonBase,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { POWER_LEVEL_OPTIONS, PowerLevelIcon } from "@4eye/features";
import type { PowerLevel } from "@4eye/types";

import { useSurface } from "@4eye/web/components/surface";
import { usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

export const PROCESSES_RUNNER_POWER_KEY = "4eye.profile.processesRunnerPower";

/** Explicit runner levels — no Auto (processes always run at a chosen power). */
export const PROCESS_RUNNER_POWER_LEVELS = [
  "ion",
  "ion-plus",
  "aion",
  "aion-plus",
] as const satisfies readonly Exclude<PowerLevel, "auto">[];

export type ProcessRunnerPower = (typeof PROCESS_RUNNER_POWER_LEVELS)[number];

/** Friendly labels — Aion+ instead of "Unlimited" for this surface. */
export const RUNNER_POWER_LABEL: Record<ProcessRunnerPower, string> = {
  ion: "Ion",
  "ion-plus": "Ion+",
  aion: "Aion",
  "aion-plus": "Aion+",
};

export function runnerPowerDescription(level: ProcessRunnerPower): string {
  return (
    POWER_LEVEL_OPTIONS.find((o) => o.value === level)?.description
    ?? RUNNER_POWER_LABEL[level]
  );
}

export function useProcessRunnerPower(): [ProcessRunnerPower, (v: ProcessRunnerPower) => void] {
  return usePersistedChoice(
    PROCESSES_RUNNER_POWER_KEY,
    "aion-plus",
    PROCESS_RUNNER_POWER_LEVELS,
  );
}

export function ProcessRunnerModelPicker({
  accent = "#f59e0b",
  value,
  onChange,
}: {
  accent?: string;
  value?: ProcessRunnerPower;
  onChange?: (v: ProcessRunnerPower) => void;
}) {
  const surface = useSurface();
  const [stored, setStored] = useProcessRunnerPower();
  const power = value ?? stored;
  const setPower = onChange ?? setStored;

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 0.5,
        minWidth: 0,
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.6 }}>
        <BoltRoundedIcon sx={{ fontSize: 16, color: accent }} />
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          Runner · Power + Model
        </Typography>
        <Box
          aria-hidden
          sx={{
            flex: 1,
            minWidth: 12,
            height: "1px",
            bgcolor: (t) => alpha(accent, t.palette.mode === "dark" ? 0.35 : 0.25),
          }}
        />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${PROCESS_RUNNER_POWER_LEVELS.length}, minmax(0, 1fr))`,
          gap: 0.5,
          minWidth: { xs: 220, sm: 280 },
        }}
      >
        {PROCESS_RUNNER_POWER_LEVELS.map((level) => {
          const selected = power === level;
          const label = RUNNER_POWER_LABEL[level];
          return (
            <Tooltip
              key={level}
              title={runnerPowerDescription(level)}
              arrow
              placement="bottom"
            >
              <ButtonBase
                onClick={() => setPower(level)}
                aria-pressed={selected}
                aria-label={`${label} — ${runnerPowerDescription(level)}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.35,
                  px: 0.5,
                  py: 0.75,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: selected ? alpha(accent, 0.65) : "divider",
                  bgcolor: selected
                    ? (t) => alpha(accent, t.palette.mode === "dark" ? 0.16 : 0.1)
                    : "background.paper",
                  color: selected ? surface.ink(accent) : "text.secondary",
                  transition: "background-color 120ms, border-color 120ms, color 120ms",
                  "&:hover": {
                    borderColor: alpha(accent, 0.5),
                    bgcolor: (t) => alpha(accent, t.palette.mode === "dark" ? 0.1 : 0.06),
                    color: surface.ink(accent),
                  },
                }}
              >
                <PowerLevelIcon level={level} size={20} />
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    lineHeight: 1.1,
                    textAlign: "center",
                  }}
                >
                  {label}
                </Typography>
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
