"use client";

/**
 * Profiles tile — shared view primitives.
 *
 * Small brand-themed building blocks reused across every sub-view so the
 * visual language stays consistent. All colors derive from the active MUI
 * theme (no hardcoded hex), matching the planning surfaces.
 */

import * as React from "react";
import { Box, Chip, LinearProgress, Stack, Typography, alpha } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";

import type {
  PrivacyLevel,
  ProfileField,
  ProfileMoment,
  ProfileStat,
  SkillCategory,
  SkillLevel,
  WorkEntry,
} from "../../model/types";
import { SKILL_LEVEL_LABEL } from "../../model/types";

/* --------------------------------------------------------------- Section */

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 0.6 }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 0.5 }}>{children}</Box>
    </Box>
  );
}

/* --------------------------------------------------------------- Privacy */

const PRIVACY_ICON: Record<PrivacyLevel, React.ReactNode> = {
  private: <LockIcon sx={{ fontSize: 13 }} />,
  friends: <PeopleIcon sx={{ fontSize: 13 }} />,
  public: <PublicIcon sx={{ fontSize: 13 }} />,
};

function PrivacyDot({ level }: { level?: PrivacyLevel }) {
  if (!level) return null;
  return (
    <Box
      component="span"
      title={level}
      sx={{ display: "inline-flex", alignItems: "center", color: "text.secondary", opacity: 0.7 }}
    >
      {PRIVACY_ICON[level]}
    </Box>
  );
}

/* ----------------------------------------------------------- AspectList */

/** Label/value rows with an optional privacy indicator. */
export function AspectList({ fields }: { fields: ProfileField[] }) {
  if (fields.length === 0) return <Empty />;
  return (
    <Stack spacing={0.75}>
      {fields.map((f) => (
        <Stack
          key={f.id}
          sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 1 }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
            <PrivacyDot level={f.privacy} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {f.label}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
            {f.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

/* ---------------------------------------------------- Skill categories */

const LEVEL_WEIGHT: Record<SkillLevel, number> = {
  expert: 1,
  advanced: 0.82,
  proficient: 0.64,
  working: 0.45,
};

function LevelMark({ level }: { level: SkillLevel }) {
  return (
    <Typography
      variant="caption"
      sx={{
        fontWeight: 800,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        color: level === "expert" || level === "advanced" ? "primary.main" : "text.secondary",
        flexShrink: 0,
      }}
    >
      {SKILL_LEVEL_LABEL[level]}
    </Typography>
  );
}

/** Ranked skill areas — category level + nested skills. No descriptions. */
export function SkillCategoryList({ categories }: { categories: SkillCategory[] }) {
  if (categories.length === 0) return <Empty />;
  const sorted = [...categories].sort((a, b) => a.rank - b.rank);
  return (
    <Stack spacing={1.25}>
      {sorted.map((cat) => {
        const skills = [...cat.skills].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
        return (
          <Box key={cat.id}>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 0.35,
              }}
            >
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, minWidth: 0 }}>
                <PrivacyDot level={cat.privacy} />
                <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
                  {cat.rank}. {cat.label}
                </Typography>
              </Stack>
              <LevelMark level={cat.level} />
            </Stack>
            <LinearProgress
              variant="determinate"
              value={LEVEL_WEIGHT[cat.level] * 100}
              sx={{
                height: 4,
                borderRadius: 2,
                mb: 0.5,
                bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                "& .MuiLinearProgress-bar": { borderRadius: 2 },
              }}
            />
            <Stack spacing={0.35} sx={{ pl: 0.5 }}>
              {skills.map((s) => (
                <Stack
                  key={s.id}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {s.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: "text.primary", flexShrink: 0 }}
                  >
                    {SKILL_LEVEL_LABEL[s.level]}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

/** Compact experience lines — title · org · dates. */
export function ExperienceList({ entries }: { entries: WorkEntry[] }) {
  if (entries.length === 0) return <Empty />;
  return (
    <Stack spacing={0.75}>
      {entries.map((e) => {
        const when = [e.start, e.end].filter(Boolean).join(" – ");
        return (
          <Stack
            key={e.id}
            sx={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, minWidth: 0 }}>
              <PrivacyDot level={e.privacy} />
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {e.title}
                </Box>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  {" · "}
                  {e.org}
                </Box>
              </Typography>
            </Stack>
            {when ? (
              <Typography variant="caption" sx={{ color: "text.secondary", flexShrink: 0 }}>
                {when}
              </Typography>
            ) : null}
          </Stack>
        );
      })}
    </Stack>
  );
}

/* ------------------------------------------------------------- StatTile */

/** A stat with an optional progress bar (XP, attendance, completion). */
export function StatTile({ stat }: { stat: ProfileStat }) {
  const pct = stat.progress != null ? Math.round(stat.progress * 100) : null;
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        minWidth: 120,
        flex: "1 1 120px",
      }}
    >
      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
        {stat.label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
        {stat.value}
        {stat.unit ? (
          <Typography component="span" variant="caption" sx={{ ml: 0.5, color: "text.secondary" }}>
            {stat.unit}
          </Typography>
        ) : null}
      </Typography>
      {pct != null && (
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{
            mt: 0.75,
            height: 6,
            borderRadius: 3,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
            "& .MuiLinearProgress-bar": { borderRadius: 3 },
          }}
        />
      )}
    </Box>
  );
}

export function StatRow({ stats }: { stats: ProfileStat[] }) {
  if (stats.length === 0) return <Empty />;
  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
      {stats.map((s) => (
        <StatTile key={s.id} stat={s} />
      ))}
    </Stack>
  );
}

/* --------------------------------------------------------------- Tags */

export function TagRow({ tags }: { tags: string[] }) {
  if (tags.length === 0) return <Empty />;
  return (
    <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
      {tags.map((t) => (
        <Chip
          key={t}
          label={t}
          size="small"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
          }}
        />
      ))}
    </Stack>
  );
}

/* --------------------------------------------------------- Moment timeline */

export function MomentTimeline({ moments }: { moments: ProfileMoment[] }) {
  if (moments.length === 0) return <Empty />;
  const sorted = [...moments].sort((a, b) => b.at - a.at);
  return (
    <Stack spacing={1}>
      {sorted.map((m) => (
        <Stack key={m.id} sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1 }}>
          <Box
            sx={{
              mt: 0.6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              flexShrink: 0,
              bgcolor: "primary.main",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
              {m.label}
            </Typography>
            {m.detail && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {m.detail}
              </Typography>
            )}
            <Typography variant="caption" sx={{ display: "block", color: "text.secondary", opacity: 0.7 }}>
              {formatDate(m.at)}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

/* --------------------------------------------------------------- utils */

export function Empty({ label = "Nothing here yet." }: { label?: string }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
      {label}
    </Typography>
  );
}

function formatDate(at: number): string {
  return new Date(at).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
