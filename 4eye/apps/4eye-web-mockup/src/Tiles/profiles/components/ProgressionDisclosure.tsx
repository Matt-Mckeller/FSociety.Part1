"use client";

/**
 * ProgressionDisclosure — a card's one-liner plus an optional staged track.
 *
 * Wraps the existing Goal / Next Action text rather than replacing it: the line
 * stays exactly what it was, and a small toggle beside it reveals the learning
 * phases (goal) or onboarding steps (action) underneath. Shut by default —
 * anyone who already knows the plan should not pay height for it.
 *
 * The toggle follows {@link DailyFocusToggle}: same persisted-choice storage,
 * same round accent button, so the surfaced band has one disclosure idiom
 * rather than three. This one expands downward because a track is wide and the
 * cards it lives in are single lines, so there is height to spend here.
 */

import * as React from "react";
import { Box, Collapse, Stack, Tooltip, Typography, alpha } from "@mui/material";
import { BookIcon } from "@4eye/icons";

import { useSurface } from "@4eye/web/components/surface";
import { usePersistedChoice } from "./ProfileControls";
import type { Progression } from "../model/progression";

const OPEN = "open";
const SHUT = "shut";
const STATES = [OPEN, SHUT] as const;

export interface ProgressionDisclosureProps {
  /** localStorage key for this card's open/shut choice. */
  storageKey: string;
  /** Accent for the dots, connectors and button — the card's own accent. */
  accent: string;
  /** What the toggle reveals, named for the tooltip ("learning phases"). */
  label: string;
  progression: Progression;
  /** The card's existing simple text. */
  children: React.ReactNode;
}

export function ProgressionDisclosure({
  storageKey,
  accent,
  label,
  progression,
  children,
}: ProgressionDisclosureProps) {
  const [state, setState] = usePersistedChoice(storageKey, SHUT, STATES);
  const open = state === OPEN;
  const surface = useSurface();
  const ink = surface.ink(accent);

  const { steps, currentIndex, unit } = progression;
  const current = steps[currentIndex];
  const toggle = () => setState(open ? SHUT : OPEN);

  return (
    <Stack sx={{ gap: 0.75, minWidth: 0 }}>
      <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1, minWidth: 0 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>

        <Tooltip title={open ? `Hide ${label}` : `Show ${label}`} arrow>
          <Stack
            role="button"
            tabIndex={0}
            aria-expanded={open}
            aria-label={label}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: 26,
              height: 26,
              flexShrink: 0,
              borderRadius: "50%",
              cursor: "pointer",
              border: "1px solid",
              borderColor: open ? alpha(accent, 0.55) : alpha(accent, 0.28),
              bgcolor: open ? alpha(accent, 0.14) : "transparent",
              transition: "background-color .18s ease, border-color .18s ease",
              "&:hover": { bgcolor: alpha(accent, 0.18), borderColor: alpha(accent, 0.6) },
              "&:focus-visible": { outline: `2px solid ${ink}`, outlineOffset: 2 },
            }}
          >
            <Box component={BookIcon} size={13} sx={{ color: ink }} />
          </Stack>
        </Tooltip>
      </Stack>

      <Collapse in={open} unmountOnExit>
        <Stack sx={{ gap: 0.6, pt: 0.25 }}>
          <ProgressionTrack accent={accent} steps={steps} currentIndex={currentIndex} />

          {current && (
            <Typography sx={{ fontSize: "0.66rem", color: "text.secondary", lineHeight: 1.45 }}>
              {unit} {currentIndex + 1} of {steps.length}
              {"  ·  "}
              <strong style={{ color: ink }}>{current.label}</strong> — {current.detail}
            </Typography>
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
}

/**
 * The track itself: a dot per stage, done ones filled, the current one ringed.
 * Each stage owns an equal share of the width so the row never overflows the
 * card; labels truncate rather than wrap, since the full wording is in the
 * caption underneath anyway.
 */
function ProgressionTrack({
  accent,
  steps,
  currentIndex,
}: {
  accent: string;
  steps: Progression["steps"];
  currentIndex: number;
}) {
  return (
    <Stack
      role="list"
      aria-label="Progression"
      sx={{ flexDirection: "row", alignItems: "flex-start", minWidth: 0 }}
    >
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        const reached = done || current;

        return (
          <Stack
            key={step.id}
            role="listitem"
            aria-current={current ? "step" : undefined}
            sx={{ flex: 1, minWidth: 0, alignItems: "center", gap: 0.35 }}
          >
            <Stack sx={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
              <Connector show={i > 0} filled={reached} accent={accent} />
              <Box
                sx={{
                  width: current ? 11 : 8,
                  height: current ? 11 : 8,
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: reached ? accent : "divider",
                  bgcolor: done ? accent : current ? alpha(accent, 0.25) : "transparent",
                  transition: "background-color .18s ease, border-color .18s ease",
                }}
              />
              <Connector show={i < steps.length - 1} filled={done} accent={accent} />
            </Stack>

            <Typography
              noWrap
              sx={{
                maxWidth: "100%",
                fontSize: "0.56rem",
                fontWeight: current ? 800 : 600,
                letterSpacing: "0.04em",
                color: current ? "text.primary" : "text.secondary",
                opacity: reached ? 1 : 0.7,
              }}
            >
              {step.label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

function Connector({ show, filled, accent }: { show: boolean; filled: boolean; accent: string }) {
  return (
    <Box
      sx={{
        flex: 1,
        height: 2,
        borderRadius: 1,
        bgcolor: !show ? "transparent" : filled ? alpha(accent, 0.5) : "divider",
      }}
    />
  );
}
