"use client";

/**
 * DirectionPanel — the character compass.
 *
 * Command Center answers "what is the plan pointed at" with product, clarity,
 * health, and launch documents. This panel answers a different question:
 * *what is this person pointed at today* — vision, growth, belief, launch,
 * money, and the support that compounds it.
 *
 * Data is authored here (`CHARACTER_DIRECTION_FOCUSES` + `CHARACTER_PRIORITIES`).
 * It is not a slice of the Plan tile. A link still opens full planning when
 * the short heading is not enough.
 */

import { route } from "@4eye/web/lib/routes";
import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";
import NextLink from "next/link";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { COLOR_MAP } from "@4eye/types";

import { CHARACTER_DIRECTION_FOCUSES } from "../model/direction";
import { CHARACTER_PRIORITIES } from "../model/priorities";
import { DirectionFocusGlyph } from "./DirectionGlyphs";
import { PriorityGlyph } from "./PriorityGlyphs";
import { ShowMore, useCapped } from "./shared/ShowMore";

const URGENCY_HEX: Record<string, string> = {
  low: "#64748b",
  medium: "#3b82f6",
  high: "#e0911f",
  critical: "#f91a4b",
};

function TrendMark({ delta }: { delta: number }) {
  if (delta > 0) return <TrendingUpRoundedIcon sx={{ fontSize: 14, color: "#16a34a" }} />;
  if (delta < 0) return <TrendingDownRoundedIcon sx={{ fontSize: 14, color: "#dc2626" }} />;
  return <TrendingFlatRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />;
}

export function DirectionPanel() {
  const focuses = React.useMemo(
    () => [...CHARACTER_DIRECTION_FOCUSES].sort((a, b) => b.weight - a.weight),
    [],
  );
  const focusCap = useCapped(focuses, 3);
  const priorityCap = useCapped([...CHARACTER_PRIORITIES], 2);

  return (
    <Stack sx={{ gap: 1.25 }}>
      <Stack sx={{ gap: 0.4 }}>
        {focusCap.items.map((f) => {
          const urgency = URGENCY_HEX[f.urgency] ?? "#64748b";
          return (
            <Tooltip key={f.id} title={f.description} arrow placement="left">
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: 0.9,
                  px: 0.6,
                  py: 0.4,
                  borderRadius: 1.25,
                  cursor: "default",
                  "&:hover": { bgcolor: alpha(urgency, 0.06) },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    display: "flex",
                    justifyContent: "center",
                    color: COLOR_MAP[f.color],
                    flexShrink: 0,
                  }}
                >
                  <DirectionFocusGlyph id={f.id} size={16} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    flex: 1,
                    minWidth: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {f.name}
                </Typography>
                <TrendMark delta={f.weight - f.previousWeight} />
                <Box
                  sx={{
                    width: 44,
                    height: 4,
                    borderRadius: 1,
                    bgcolor: alpha(urgency, 0.15),
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ width: `${f.weight}%`, height: "100%", bgcolor: urgency, borderRadius: 1 }} />
                </Box>
              </Stack>
            </Tooltip>
          );
        })}
        <ShowMore capped={focusCap} accent="#64748b" noun="headings" />
      </Stack>

      <Box>
        <Typography
          sx={{
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: "text.disabled",
            px: 0.6,
            mb: 0.45,
          }}
        >
          PRIORITIES
        </Typography>
        <Stack sx={{ gap: 0.35 }}>
          {priorityCap.items.map((p) => {
            const c = COLOR_MAP[p.color];
            return (
              <Tooltip key={p.id} title={p.hint} arrow placement="left">
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "flex-start",
                    gap: 0.9,
                    px: 0.6,
                    py: 0.5,
                    borderRadius: 1.25,
                    cursor: "default",
                    border: "1px solid",
                    borderColor: alpha(c, 0.18),
                    bgcolor: alpha(c, 0.04),
                    "&:hover": { bgcolor: alpha(c, 0.09), borderColor: alpha(c, 0.35) },
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      display: "flex",
                      justifyContent: "center",
                      color: c,
                      flexShrink: 0,
                      mt: 0.15,
                    }}
                  >
                    <PriorityGlyph id={p.id} size={16} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      fontFamily: "monospace",
                      letterSpacing: 0.15,
                      color: c,
                      flex: 1,
                      minWidth: 0,
                      lineHeight: 1.35,
                      wordBreak: "break-word",
                    }}
                  >
                    {p.code}
                  </Typography>
                </Stack>
              </Tooltip>
            );
          })}
          <ShowMore capped={priorityCap} accent="#64748b" noun="priorities" />
        </Stack>
      </Box>
    </Stack>
  );
}

/** Header action: through to the full planning surface. */
export function PlanningLink() {
  return (
    <Box
      component={NextLink}
      href={route("/appRealm/command-center")}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.4,
        fontSize: "0.62rem",
        fontWeight: 800,
        color: "text.secondary",
        textDecoration: "none",
        whiteSpace: "nowrap",
        "&:hover": { color: "text.primary" },
      }}
    >
      Full planning
      <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
    </Box>
  );
}
