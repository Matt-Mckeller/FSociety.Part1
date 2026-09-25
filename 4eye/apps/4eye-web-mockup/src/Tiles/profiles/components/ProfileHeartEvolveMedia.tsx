"use client";

/**
 * ProfileHeartEvolveMedia — Heart.Evolve album on the personal profile.
 *
 * Destination-forward layout, full player, and field notes. Password-gated
 * via EvolveLoveGate — this does not belong on yen /vision.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";
import {
  HEART_EVOLVE,
  currentVariant,
  primaryFrame,
  type EvolveStageId,
} from "@yen/content/heart-evolve";
import { EvolveLoveGate } from "./EvolveLoveGate";
import { EvolveStagePlayer } from "./heart-evolve/EvolveStagePlayer";
import { HeartEvolveNotes } from "./heart-evolve/HeartEvolveNotes";

const SIDE_STAGES: EvolveStageId[] = ["now", "becoming"];

function Album({ accent }: { accent: string }) {
  const variant = currentVariant(HEART_EVOLVE);
  const destination = primaryFrame(variant, "destination");
  const destMeta = HEART_EVOLVE.stages.find((s) => s.id === "destination");

  return (
    <Box
      id="heart-evolve-media"
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(accent, 0.35),
        overflow: "hidden",
        bgcolor: "background.paper",
        scrollMarginTop: 96,
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: 1.5,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(accent, 0.06),
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12,
              fontWeight: 800,
              color: accent,
            }}
          >
            {HEART_EVOLVE.code}
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: "text.secondary" }}>
            Media · {variant.label} · growth through a human
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { zero: "1fr", tablet: "1.35fr 1fr" },
          gap: 0.75,
          p: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            aspectRatio: { zero: "4 / 5", tablet: "3 / 4" },
            borderRadius: 1.25,
            overflow: "hidden",
            border: "1px solid",
            borderColor: alpha(accent, 0.45),
            background: destination
              ? `#0c0a09 center/cover no-repeat url(${destination.src})`
              : alpha(accent, 0.08),
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              left: 8,
              bottom: 8,
              px: 0.75,
              py: 0.2,
              borderRadius: 1,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
          >
            {destMeta?.label ?? "Destination"}
          </Typography>
          {destination?.caption && (
            <Typography
              sx={{
                position: "absolute",
                left: 8,
                right: 8,
                top: 8,
                px: 0.75,
                py: 0.35,
                borderRadius: 1,
                bgcolor: "rgba(0,0,0,0.45)",
                color: "rgba(255,255,255,0.92)",
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              {destination.caption}
            </Typography>
          )}
        </Box>

        <Stack sx={{ gap: 0.75 }}>
          {SIDE_STAGES.map((stage) => {
            const frame = primaryFrame(variant, stage);
            const meta = HEART_EVOLVE.stages.find((s) => s.id === stage);
            return (
              <Box
                key={stage}
                sx={{
                  position: "relative",
                  flex: 1,
                  minHeight: { zero: 88, tablet: 0 },
                  borderRadius: 1.25,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  background: frame
                    ? `#0c0a09 center/cover no-repeat url(${frame.src})`
                    : alpha(accent, 0.08),
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    left: 6,
                    bottom: 6,
                    px: 0.6,
                    py: 0.15,
                    borderRadius: 1,
                    bgcolor: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  {meta?.label ?? stage}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Typography sx={{ px: 1.5, pb: 1.25, fontSize: 12.5, color: "text.secondary", lineHeight: 1.45 }}>
        Now → Becoming → Destination. Private profile album — IG exports under{" "}
        <Box component="span" sx={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11 }}>
          /media/heart-evolve/exports/instagram/
        </Box>
        .
      </Typography>
    </Box>
  );
}

export function ProfileHeartEvolveMedia({ accent = HEART_EVOLVE.accent }: { accent?: string }) {
  return (
    <EvolveLoveGate accent={accent}>
      <Album accent={accent} />
      <EvolveStagePlayer embedded />
      <HeartEvolveNotes />
    </EvolveLoveGate>
  );
}
