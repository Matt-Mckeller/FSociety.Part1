"use client";

import Link from "next/link";
import { Box, Chip, Typography } from "@mui/material";
import {
  CHARACTER_STATUS_SEED,
  MOOD_META,
  type MemoryEntry,
  type StatusEffect,
} from "@yen/content/character/status";
import {
  ATTRIBUTES,
  ATTRIBUTE_PROGRESS_SEED,
} from "@yen/content/character/attributes";
import { INTEGRATION_LAYERS, STATUS_META } from "@yen/content/layers";

const HOUR = 3_600_000;
const DAY = 86_400_000;

/** "2h 15m left" · "Expired" · "Permanent". */
function timeLeft(expiresAt?: number | null): string {
  if (!expiresAt) return "Permanent";
  const ms = expiresAt - Date.now();
  if (ms <= 0) return "Expired";
  const hrs = Math.floor(ms / HOUR);
  const mins = Math.ceil((ms % HOUR) / (60 * 1000));
  return hrs > 0 ? `${hrs}h ${mins}m left` : `${mins}m left`;
}

function ago(ms: number): string {
  const diff = Date.now() - ms;
  const years = Math.floor(diff / (365 * DAY));
  if (years >= 1) return `${years}y ago`;
  const days = Math.floor(diff / DAY);
  if (days >= 1) return `${days}d ago`;
  const hrs = Math.floor(diff / HOUR);
  return hrs >= 1 ? `${hrs}h ago` : "just now";
}

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: 1.1,
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>
      {note && (
        <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 0.5, maxWidth: "72ch" }}>
          {note}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Box>
  );
}

function EffectCard({ effect }: { effect: StatusEffect }) {
  const isBuff = effect.kind === "buff";
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: `3px solid ${effect.color}`,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 650 }}>
          {effect.emoji ? `${effect.emoji} ` : ""}
          {effect.label}
        </Typography>
        <Chip
          size="small"
          label={isBuff ? "Buff" : "Debuff"}
          sx={{
            height: 19,
            fontSize: 10,
            fontWeight: 700,
            color: isBuff ? "#15803d" : "#b91c1c",
            bgcolor: isBuff ? "#16a34a18" : "#ef444418",
          }}
        />
        <Typography sx={{ fontSize: 12, color: "text.secondary", ml: "auto" }}>
          {timeLeft(effect.expiresAt)}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55 }}>
        {effect.description}
      </Typography>

      {effect.attributeModifiers && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1.25 }}>
          {effect.attributeModifiers.map((mod) => (
            <Chip
              key={mod.id}
              size="small"
              label={`${mod.label} ${mod.delta > 0 ? "+" : ""}${mod.delta}`}
              sx={{
                height: 21,
                fontSize: 11.5,
                fontWeight: 600,
                color: mod.delta >= 0 ? "#15803d" : "#b91c1c",
                bgcolor: mod.delta >= 0 ? "#16a34a14" : "#ef444414",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

function MemoryCard({ entry }: { entry: MemoryEntry }) {
  const tone =
    entry.valence === "positive" ? "#16a34a" : entry.valence === "negative" ? "#ef4444" : "#64748b";

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: tone, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 15, fontWeight: 650, flex: 1, minWidth: 0 }}>
          {entry.title}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
          {ago(entry.occurredAt)} · {entry.significance}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.55, mt: 0.75 }}>
        {entry.summary}
      </Typography>

      {/*
        `learned` and `result` are the reason an entry is kept at all — the model
        says as much. Showing the summary without them reduces a journal to dates.
      */}
      {entry.learned && (
        <Box sx={{ mt: 1.25, pl: 1.25, borderLeft: "2px solid", borderColor: "divider" }}>
          <Typography sx={{ fontSize: 13, lineHeight: 1.55 }}>
            <Box component="span" sx={{ fontWeight: 650 }}>Learned. </Box>
            <Box component="span" sx={{ color: "text.secondary" }}>{entry.learned}</Box>
          </Typography>
          {entry.result && (
            <Typography sx={{ fontSize: 13, lineHeight: 1.55, mt: 0.5 }}>
              <Box component="span" sx={{ fontWeight: 650 }}>Result. </Box>
              <Box component="span" sx={{ color: "text.secondary" }}>{entry.result}</Box>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

function grid(cols = 2) {
  return {
    display: "grid",
    gap: 1.5,
    gridTemplateColumns: { zero: "1fr", laptop: `repeat(${cols}, minmax(0, 1fr))` },
  } as const;
}

export function ProfileBoard() {
  const s = CHARACTER_STATUS_SEED;
  const mood = MOOD_META[s.mood];

  return (
    <Box>
      {/* ── Current state ─────────────────────────────────────────────── */}
      <Box
        sx={{
          p: 3,
          mb: 5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          borderTop: `3px solid ${mood.color}`,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: mood.color }}>
            {mood.label}
          </Typography>
          <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
            intensity {s.moodIntensity}
            {s.moodIntensity > 100 && " — overflow"}
          </Typography>
          {s.additionalMoods?.map((m) => (
            <Chip
              key={m.id}
              size="small"
              label={`${MOOD_META[m.id].label} ${m.intensity}`}
              sx={{
                height: 21,
                fontSize: 11.5,
                fontWeight: 600,
                color: MOOD_META[m.id].color,
                bgcolor: `${MOOD_META[m.id].color}18`,
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            mt: 1.5,
            height: 6,
            borderRadius: 3,
            bgcolor: "divider",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${Math.min(100, s.moodIntensity)}%`,
              bgcolor: mood.color,
            }}
          />
        </Box>

        <Typography sx={{ fontSize: 15, color: "text.secondary", mt: 1.75, lineHeight: 1.6 }}>
          {s.currentContext}
        </Typography>
      </Box>

      <Section title="Active effects" note="What is currently modifying the character, and for how long.">
        <Box sx={grid(2)}>
          {s.effects.map((e) => (
            <EffectCard key={e.id} effect={e} />
          ))}
        </Box>
      </Section>

      <Section title="Attributes" note="Base value plus the bonus contributed by equipped gear.">
        <Box sx={grid(2)}>
          {ATTRIBUTES.map((attr) => {
            const p = ATTRIBUTE_PROGRESS_SEED[attr.id];
            if (!p) return null;
            const total = p.base + p.bonus;
            const tierIndex = Math.min(4, Math.floor(total / 21));
            return (
              <Box key={attr.id} sx={{ p: 1.75, borderRadius: 1.5, border: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 650, color: attr.color, flex: 1 }}>
                    {attr.label}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                    {attr.tiers[tierIndex]}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700, minWidth: 52, textAlign: "right" }}>
                    {p.base}
                    <Box component="span" sx={{ color: "#16a34a", fontWeight: 600 }}>
                      {p.bonus > 0 ? ` +${p.bonus}` : ""}
                    </Box>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", bgcolor: "divider", mt: 1 }}>
                  <Box sx={{ width: `${Math.min(100, p.base)}%`, bgcolor: attr.color }} />
                  <Box sx={{ width: `${Math.min(100 - Math.min(100, p.base), p.bonus)}%`, bgcolor: `${attr.color}66` }} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Section>

      <Section
        title="Integration"
        note="Which layers this character currently reaches into. The full ladder has its own page."
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1.5 }}>
          {INTEGRATION_LAYERS.map((layer) => (
            <Chip
              key={layer.id}
              size="small"
              label={layer.label}
              sx={{
                height: 24,
                fontSize: 12,
                fontWeight: 600,
                color: layer.status === "live" ? "#fff" : layer.color,
                bgcolor: layer.status === "live" ? layer.color : `${layer.color}14`,
                border: "1px solid",
                borderColor: `${layer.color}44`,
              }}
            />
          ))}
        </Box>
        <Typography
          component={Link}
          href="/integration-layer"
          sx={{ fontSize: 14, fontWeight: 600, color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {INTEGRATION_LAYERS.filter((l) => l.status === "live").length} of{" "}
          {INTEGRATION_LAYERS.length} layers live — see the full ladder →
        </Typography>
      </Section>

      <Section title="Recent" note="Working memory: what has happened lately, ranked by significance.">
        <Box sx={grid(2)}>
          {s.recentEvents.map((e) => (
            <MemoryCard key={e.id} entry={e} />
          ))}
        </Box>
      </Section>

      <Section title="Memory" note="Weeks to months. Kept for what they taught rather than for the date.">
        <Box sx={grid(2)}>
          {s.memory.map((e) => (
            <MemoryCard key={e.id} entry={e} />
          ))}
        </Box>
      </Section>

      <Section title="Cold storage" note="Formative events — the ones that shaped how everything since got approached.">
        <Box sx={grid(2)}>
          {s.coldStorage.map((e) => (
            <MemoryCard key={e.id} entry={e} />
          ))}
        </Box>
      </Section>
    </Box>
  );
}
