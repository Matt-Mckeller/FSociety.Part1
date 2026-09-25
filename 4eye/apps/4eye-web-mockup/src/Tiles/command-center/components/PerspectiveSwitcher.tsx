"use client";

/**
 * PerspectiveSwitcher — compact tab strip that controls which planning lens
 * is active across all Command Center views.
 *
 * Business          → all entities, all goals (the objective org-wide view)
 * Person            → goals and tasks for/by the current user (person-centric)
 * Person → Entity   → goals/tasks the current user has SET for other entities
 * Entity            → goals/tasks set for / owned by other entities
 */

import * as React from "react";
import { ButtonBase, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import type { PlanPerspective } from "../store/CommandCenterProvider";

interface PerspectiveMeta {
  value: PlanPerspective;
  label: string;
  short: string;
  tooltip: string;
}

const PERSPECTIVES: PerspectiveMeta[] = [
  {
    value: "business",
    label: "Business",
    short: "Biz",
    tooltip: "Objective view — all entities, all goals",
  },
  {
    value: "self",
    label: "Person",
    short: "Person",
    tooltip: "Goals and tasks centered on you as a person",
  },
  {
    value: "self-to-others",
    label: "Person → Entity",
    short: "→ Entity",
    tooltip: "Goals you (a person) have set for other entities",
  },
  {
    value: "others-to-self",
    label: "Entity",
    short: "Entity",
    tooltip: "Goals and tasks owned by or set for other entities",
  },
];

interface PerspectiveSwitcherProps {
  value: PlanPerspective;
  onChange: (perspective: PlanPerspective) => void;
}

export function PerspectiveSwitcher({ value, onChange }: PerspectiveSwitcherProps) {
  const theme = useTheme();
  const accent = theme.palette.primary.main;

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "stretch",
        bgcolor: alpha(theme.palette.background.default, 0.5),
        borderRadius: 1,
        p: 0.25,
        gap: 0.25,
      }}
    >
      {PERSPECTIVES.map((p) => {
        const active = value === p.value;
        return (
          <Tooltip key={p.value} title={p.tooltip} arrow placement="bottom">
            <ButtonBase
              onClick={() => onChange(p.value)}
              sx={{
                px: 1.25,
                py: 0.4,
                borderRadius: 0.75,
                fontSize: 11,
                fontWeight: active ? 800 : 600,
                letterSpacing: 0.2,
                color: active ? accent : "text.secondary",
                bgcolor: active ? alpha(accent, 0.12) : "transparent",
                transition: "all 140ms ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  color: active ? accent : "text.primary",
                  bgcolor: active ? alpha(accent, 0.16) : "action.hover",
                },
              }}
            >
              <Typography
                component="span"
                sx={{ fontSize: "inherit", fontWeight: "inherit", color: "inherit" }}
              >
                {p.label}
              </Typography>
            </ButtonBase>
          </Tooltip>
        );
      })}
    </Stack>
  );
}
