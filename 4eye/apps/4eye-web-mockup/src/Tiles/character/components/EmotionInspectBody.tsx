"use client";

/**
 * EmotionInspectBody — dossier content for Emotion.Inspect.
 *
 * Shell-agnostic: rendered inside the HUD `InspectorModal` overlay (primary)
 * or any host that passes an emotion id. Data from `emotion-inspect.ts`.
 */

import * as React from "react";
import { Box, Divider, Link, Stack, Typography, alpha } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { emotionLens, emotionMeta, EMOTION_ORDER, EMOTION_FAMILY_META, emotionFamily } from "../model/emotions";
import {
  dossiersForEmotion,
  groupAssociations,
  primaryDossier,
  type EmotionAssociation,
  type EmotionDataTag,
  type EmotionDataTone,
  type EmotionDossier,
} from "../model/emotion-inspect";
import { PERSPECTIVE_META } from "../model/perspectives";
import { EmotionExperienceField } from "./EmotionExperienceField";

function DataTagChip({ tag, color }: { tag: EmotionDataTag; color: string }) {
  const tone: EmotionDataTone = tag.tone ?? "default";
  const isDim = tone === "dim";
  const isWant = tone === "want" || Boolean(tag.wantLabel);
  const chipColor = isDim ? "#94a3b8" : color;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 0.85,
        py: 0.3,
        borderRadius: 1,
        bgcolor: isWant ? alpha("#e11d48", isDim ? 0.08 : 0.12) : alpha(chipColor, isDim ? 0.06 : 0.12),
        border: "1px solid",
        borderColor: isWant
          ? alpha("#e11d48", isDim ? 0.45 : 0.55)
          : alpha(chipColor, isDim ? 0.25 : 0.35),
        boxShadow: isWant ? `0 0 0 1px ${alpha("#e11d48", 0.2)}` : "none",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 800,
          color: isDim ? "#94a3b8" : chipColor,
          lineHeight: 1.2,
          textDecoration: isDim ? "line-through" : "none",
          textDecorationColor: alpha("#94a3b8", 0.7),
          letterSpacing: isDim ? 0.2 : 0,
        }}
      >
        {tag.label}
      </Typography>
      {isWant ? (
        <Typography
          sx={{
            fontSize: "0.52rem",
            fontWeight: 900,
            letterSpacing: 0.4,
            color: "#e11d48",
            lineHeight: 1,
            px: 0.45,
            py: 0.2,
            borderRadius: 0.5,
            bgcolor: alpha("#e11d48", 0.12),
          }}
        >
          {tag.wantLabel ?? "WANT"}
        </Typography>
      ) : null}
    </Box>
  );
}

function DataTags({ tags, color }: { tags: EmotionDataTag[]; color: string }) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
      {tags.map((t) => (
        <DataTagChip key={t.label} tag={t} color={color} />
      ))}
    </Stack>
  );
}

function AssociationRow({ item, color }: { item: EmotionAssociation; color: string }) {
  const perspective =
    item.kind === "perspective" && item.perspectiveId
      ? PERSPECTIVE_META.find((p) => p.id === item.perspectiveId)
      : undefined;
  const accent = perspective?.color ?? color;
  const isDim = item.tone === "dim";
  const isWant = item.tone === "want" || Boolean(item.wantLabel);

  const body = (
    <Stack sx={{ gap: 0.25, minWidth: 0 }}>
      <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
        <Typography
          sx={{
            fontSize: "0.78rem",
            fontWeight: 800,
            color: isDim ? "text.disabled" : "text.primary",
            textDecoration: isDim ? "line-through" : "none",
            textDecorationColor: alpha("#94a3b8", 0.65),
          }}
        >
          {item.label}
        </Typography>
        {isWant ? (
          <Typography
            sx={{
              fontSize: "0.52rem",
              fontWeight: 900,
              letterSpacing: 0.35,
              color: "#e11d48",
              px: 0.5,
              py: 0.15,
              borderRadius: 0.5,
              bgcolor: alpha("#e11d48", 0.12),
              border: "1px solid",
              borderColor: alpha("#e11d48", 0.35),
            }}
          >
            {item.wantLabel ?? "WANT"}
          </Typography>
        ) : null}
        {item.href ? (
          <OpenInNewRoundedIcon sx={{ fontSize: 12, color: "text.disabled" }} />
        ) : null}
      </Stack>
      {item.detail ? (
        <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", lineHeight: 1.45 }}>
          {item.detail}
        </Typography>
      ) : null}
      {item.tags && item.tags.length > 0 ? (
        <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: alpha(accent, 0.85) }}>
          {item.tags.join(" · ")}
        </Typography>
      ) : null}
    </Stack>
  );

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "flex-start",
        gap: 0.75,
        py: 0.7,
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:last-of-type": { borderBottom: "none" },
        bgcolor: isWant ? alpha("#e11d48", 0.03) : "transparent",
        mx: isWant ? -0.5 : 0,
        px: isWant ? 0.5 : 0,
        borderRadius: isWant ? 1 : 0,
      }}
    >
      <Box
        sx={{
          width: 3,
          alignSelf: "stretch",
          borderRadius: 1,
          bgcolor: isWant ? alpha("#e11d48", 0.75) : alpha(accent, isDim ? 0.35 : 0.7),
          flexShrink: 0,
          minHeight: 18,
        }}
      />
      {item.href ? (
        <Link
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ color: "inherit", minWidth: 0 }}
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </Stack>
  );
}

function DossierCard({ dossier, color }: { dossier: EmotionDossier; color: string }) {
  const groups = groupAssociations(dossier.associations);

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(color, 0.28),
        bgcolor: alpha(color, 0.04),
      }}
    >
      <Typography
        sx={{
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: 0.6,
          color: "text.disabled",
          mb: 0.75,
        }}
      >
        DATA
      </Typography>
      <DataTags tags={dossier.data} color={color} />

      <Typography
        sx={{
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: 0.6,
          color: "text.disabled",
          mt: 1.5,
          mb: 0.4,
        }}
      >
        STRATEGY
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary", lineHeight: 1.4 }}>
        {dossier.strategy}
      </Typography>
      {dossier.strategyAll ? (
        <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", mt: 0.35, lineHeight: 1.4 }}>
          All: {dossier.strategyAll}
        </Typography>
      ) : null}

      {dossier.embedSeeds.length > 0 ? (
        <>
          <Typography
            sx={{
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "text.disabled",
              mt: 1.5,
              mb: 0.5,
            }}
          >
            EMBED SEEDS
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
            {dossier.embedSeeds.map((s) =>
              s.href ? (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    px: 0.8,
                    py: 0.3,
                    borderRadius: 1,
                    bgcolor: alpha(color, 0.08),
                    border: "1px solid",
                    borderColor: alpha(color, 0.22),
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    color,
                  }}
                >
                  {s.label}
                </Link>
              ) : (
                <Box
                  key={s.label}
                  sx={{
                    px: 0.8,
                    py: 0.3,
                    borderRadius: 1,
                    bgcolor: alpha(color, 0.08),
                    border: "1px solid",
                    borderColor: alpha(color, 0.22),
                  }}
                >
                  <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color }}>
                    {s.label}
                  </Typography>
                </Box>
              ),
            )}
          </Stack>
        </>
      ) : null}

      {dossier.goal ? (
        <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", mt: 1.5, lineHeight: 1.45 }}>
          {dossier.goal}
        </Typography>
      ) : null}
      {dossier.choosePositive ? (
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "text.primary",
            mt: 0.75,
            lineHeight: 1.45,
          }}
        >
          Choose.Positive() — {dossier.choosePositive}
        </Typography>
      ) : null}

      {groups.map((g) => (
        <Box key={g.kind} sx={{ mt: 1.75 }}>
          <Typography
            sx={{
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: 0.6,
              color: "text.disabled",
              mb: 0.25,
            }}
          >
            {g.label.toUpperCase()}
          </Typography>
          {g.items.map((item) => (
            <AssociationRow key={item.id} item={item} color={color} />
          ))}
        </Box>
      ))}

      {dossier.docHref ? (
        <Box sx={{ mt: 1.75 }}>
          <Link
            href={dossier.docHref}
            underline="hover"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.72rem",
              fontWeight: 800,
              color,
            }}
          >
            Full write-up
            <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
          </Link>
        </Box>
      ) : null}
    </Box>
  );
}

/** Emotion switcher for the inspect screen. */
function EmotionSwitcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }} role="radiogroup" aria-label="Emotion to inspect">
      {EMOTION_ORDER.map((id) => {
        const meta = emotionMeta(id);
        if (!meta) return null;
        const selected = id === value;
        return (
          <Box
            key={id}
            component="button"
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(id)}
            sx={{
              appearance: "none",
              cursor: "pointer",
              m: 0,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              height: 24,
              px: 0.85,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(meta.color, selected ? 0.45 : 0.2),
              bgcolor: alpha(meta.color, selected ? 0.14 : 0.05),
              font: "inherit",
              "&:focus-visible": { outline: `2px solid ${alpha(meta.color, 0.6)}`, outlineOffset: 2 },
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: selected ? meta.color : alpha(meta.color, 0.45),
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: selected ? 800 : 600,
                color: selected ? meta.color : "text.disabled",
                lineHeight: 1,
              }}
            >
              {meta.label}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}

export function EmotionInspectBody({
  emotionId,
  onEmotionChange,
}: {
  emotionId: string;
  onEmotionChange?: (id: string) => void;
}) {
  const meta = emotionMeta(emotionId);
  const lens = emotionLens(emotionId);
  const color = meta?.color ?? "#ef4444";
  const family = emotionFamily(emotionId);
  const familyMeta = EMOTION_FAMILY_META[family];
  const dossiers = dossiersForEmotion(emotionId);
  const shown = dossiers.length > 0 ? dossiers : [primaryDossier(emotionId)];

  return (
    <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ alignItems: { xs: "stretch", md: "flex-start" }, justifyContent: "space-between", gap: 2, mb: 1.25 }}
      >
        <Stack sx={{ gap: 1, minWidth: 0, flex: 1 }}>
          {onEmotionChange ? <EmotionSwitcher value={emotionId} onChange={onEmotionChange} /> : null}
          <Stack direction="row" sx={{ alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
            <Box
              sx={{
                px: 0.7,
                py: 0.25,
                borderRadius: 1,
                bgcolor: alpha(familyMeta.color, 0.12),
                border: "1px solid",
                borderColor: alpha(familyMeta.color, 0.35),
              }}
            >
              <Typography sx={{ fontSize: "0.58rem", fontWeight: 900, color: familyMeta.color, letterSpacing: 0.4 }}>
                {familyMeta.label.toUpperCase()}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.62rem", color: "text.disabled" }}>{familyMeta.blurb}</Typography>
          </Stack>
          <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", lineHeight: 1.45 }}>
            {lens.premise}
          </Typography>
          <Stack sx={{ gap: 0.35 }}>
            <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: 0.5, color: "text.disabled" }}>
              CHANNELS
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {lens.channels.map((ch) => (
                <Box
                  key={ch.label}
                  sx={{
                    px: 0.75,
                    py: 0.3,
                    borderRadius: 1,
                    bgcolor: alpha(color, 0.1),
                    border: "1px solid",
                    borderColor: alpha(color, 0.28),
                  }}
                >
                  <Typography sx={{ fontSize: "0.66rem", fontWeight: 800, color }}>{ch.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ alignSelf: { xs: "center", md: "flex-start" } }}>
          <EmotionExperienceField
            activeEmotionId={emotionId}
            onSelect={onEmotionChange}
            width={300}
            height={230}
          />
        </Box>
      </Stack>

      <Divider sx={{ mb: 1.5 }} />

      <Stack sx={{ gap: 1.5 }}>
        {shown.map((d) => (
          <DossierCard key={d.id} dossier={d} color={color} />
        ))}
      </Stack>
    </Box>
  );
}
