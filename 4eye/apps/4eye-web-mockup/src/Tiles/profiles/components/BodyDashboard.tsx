"use client";

/**
 * BodyDashboard — top-of-Body-lens strip: vitals (heart rate first), appearance
 * snapshot, and a Socials / photos affordance. Unlocks the BODY · PRESENCE
 * corner HUD on mount.
 */

import * as React from "react";
import { Box, Button, Stack, Typography, alpha } from "@mui/material";
import NextLink from "next/link";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DirectionsWalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";

import { route } from "@4eye/web/lib/routes";
import { useResourceBarsOptional } from "@4eye/web/components/hud/resourceBars";
import { SectionDisclosure } from "@4eye/web/components/surface";
import { useProfiles } from "../store/ProfileProvider";
import { AspectList } from "./shared/primitives";
import type { AppearanceProfile, BodyVitals } from "../model/types";

const BODY_ACCENT = "#ef4444";

function VitalChip({
  label,
  value,
  unit,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.75,
        px: 1.15,
        py: 0.7,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: alpha(color, 0.35),
        bgcolor: alpha(color, 0.07),
        minWidth: 0,
      }}
    >
      {icon}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "text.secondary",
            lineHeight: 1.2,
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color, lineHeight: 1.2 }}>
          {value}
          {unit ? (
            <Box component="span" sx={{ ml: 0.35, fontSize: "0.65rem", fontWeight: 700, opacity: 0.75 }}>
              {unit}
            </Box>
          ) : null}
        </Typography>
      </Box>
    </Stack>
  );
}

function AppearanceSummary({ appearance, accent }: { appearance: AppearanceProfile; accent: string }) {
  const rows = [
    { id: "body", label: "Body type", value: appearance.bodyType },
    { id: "weight", label: "Weight", value: appearance.weight ?? "—" },
    { id: "height", label: "Height", value: appearance.height ?? "—" },
    { id: "hair", label: "Hair", value: `${appearance.hairColor} · ${appearance.hairStyle}` },
    { id: "hair-type", label: "Hair type", value: appearance.hairType },
    { id: "eyes", label: "Eyes", value: appearance.eyeColor },
    { id: "skin", label: "Skin", value: appearance.skinTone },
    ...(appearance.faceShape
      ? [{ id: "face", label: "Face", value: appearance.faceShape }]
      : []),
  ];

  return (
    <Stack sx={{ gap: 1.25 }}>
      <AspectList fields={rows} />
      {appearance.sizing.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            SIZING
          </Typography>
          <AspectList fields={appearance.sizing} />
        </Box>
      )}
      {appearance.colorDescriptions.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            COLOR READS
          </Typography>
          <AspectList fields={appearance.colorDescriptions} />
        </Box>
      )}
      {appearance.source && (
        <Typography sx={{ fontSize: "0.68rem", color: alpha(accent, 0.85), lineHeight: 1.4 }}>
          {appearance.source}
        </Typography>
      )}
    </Stack>
  );
}

function VitalsRow({ vitals }: { vitals: BodyVitals }) {
  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.85 }}>
      <VitalChip
        label="Heart rate"
        value={vitals.heartRate}
        unit="bpm"
        color={BODY_ACCENT}
        icon={<FavoriteRoundedIcon sx={{ fontSize: 18, color: BODY_ACCENT }} />}
      />
      {vitals.heartRateZone && (
        <VitalChip label="Zone" value={vitals.heartRateZone} color="#f97316" />
      )}
      {vitals.spo2 != null && (
        <VitalChip
          label="SpO₂"
          value={vitals.spo2}
          unit="%"
          color="#38bdf8"
          icon={<WaterDropRoundedIcon sx={{ fontSize: 18, color: "#38bdf8" }} />}
        />
      )}
      {vitals.stepsToday != null && (
        <VitalChip
          label="Steps"
          value={vitals.stepsToday.toLocaleString()}
          color="#16a34a"
          icon={<DirectionsWalkRoundedIcon sx={{ fontSize: 18, color: "#16a34a" }} />}
        />
      )}
      {vitals.activeMinutes != null && (
        <VitalChip
          label="Active"
          value={vitals.activeMinutes}
          unit="min"
          color="#a855f7"
          icon={<TimerRoundedIcon sx={{ fontSize: 18, color: "#a855f7" }} />}
        />
      )}
    </Stack>
  );
}

export function BodyDashboard({
  accent,
  onOpenMedia,
}: {
  accent: string;
  /** Jump to Core Media (Heart.Evolve album) without escaping to Vision. */
  onOpenMedia?: () => void;
}) {
  const { profile } = useProfiles();
  const bars = useResourceBarsOptional();
  const unlockBodyPresence = bars?.unlockBodyPresence;
  const healing = profile.data.healing;
  const vitals = healing?.vitals;
  const appearance = healing?.appearance;

  // Visiting Body unlocks HEALTH / PRESENCE on the corner HUD (once per mount).
  React.useEffect(() => {
    unlockBodyPresence?.();
  }, [unlockBodyPresence]);

  return (
    <Stack
      sx={{
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(BODY_ACCENT, 0.28),
        bgcolor: alpha(BODY_ACCENT, 0.04),
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: BODY_ACCENT,
            }}
          >
            BODY · PRESENCE
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.25 }}>
            Health unlocked on visit · vitals lead, appearance follows
          </Typography>
        </Box>
        <Stack sx={{ flexDirection: "row", gap: 0.75, flexWrap: "wrap" }}>
          <Button
            component={NextLink}
            href={route("/appRealm/social")}
            size="small"
            startIcon={<PeopleAltRoundedIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(accent, 0.35),
              color: "text.primary",
              bgcolor: alpha(accent, 0.08),
              "&:hover": { bgcolor: alpha(accent, 0.14) },
            }}
          >
            Socials
          </Button>
          <Button
            component={onOpenMedia ? "button" : NextLink}
            href={onOpenMedia ? undefined : `${route("/appRealm/profile")}?lens=core#heart-evolve-media`}
            onClick={
              onOpenMedia
                ? () => {
                    onOpenMedia();
                  }
                : undefined
            }
            size="small"
            startIcon={<PhotoLibraryRoundedIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(BODY_ACCENT, 0.35),
              color: BODY_ACCENT,
              bgcolor: alpha(BODY_ACCENT, 0.06),
              "&:hover": { bgcolor: alpha(BODY_ACCENT, 0.12) },
            }}
          >
            Photos
          </Button>
        </Stack>
      </Stack>

      {vitals ? (
        <VitalsRow vitals={vitals} />
      ) : (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          No live vitals yet — heart rate will land here.
        </Typography>
      )}

      {appearance && (
        <Box
          sx={{
            pt: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <SectionDisclosure
            id="profile-body-appearance"
            label="Appearance"
            accent={accent}
            meta={[appearance.bodyType, appearance.height, appearance.weight]
              .filter(Boolean)
              .join(" · ")}
            hint="Body type, sizing, hair, eyes, skin, and color reads"
            defaultOpen={false}
          >
            <AppearanceSummary appearance={appearance} accent={accent} />
          </SectionDisclosure>
        </Box>
      )}
    </Stack>
  );
}

export function BodyEnvironmentSection() {
  const { profile } = useProfiles();
  const env = profile.data.healing?.environment;
  if (!env) return null;

  return (
    <Stack sx={{ gap: 1 }}>
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
        <VitalChip label="Place" value={env.place} color="#0ea5e9" />
        <VitalChip label="Setting" value={env.setting} color="#64748b" />
        {env.lighting && <VitalChip label="Light" value={env.lighting} color="#eab308" />}
      </Stack>
      {env.ambient && env.ambient.length > 0 && <AspectList fields={env.ambient} />}
      {env.notes && (
        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", lineHeight: 1.45 }}>
          {env.notes}
        </Typography>
      )}
    </Stack>
  );
}
