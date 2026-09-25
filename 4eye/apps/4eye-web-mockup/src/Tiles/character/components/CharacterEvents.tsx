"use client";

/**
 * CharacterEvents — the Events lens.
 *
 * Events became a lens of its own on the premise that "a timeline is something
 * you go and read, not something that trails every other page" — but the lens
 * was still rendering the sidebar timeline at full page width: one flat column
 * of thirteen entries running from two hours ago to six years ago, with no way
 * to ask it anything.
 *
 * This is the reading surface that premise implies:
 *
 *  - **Eras, not a flat list.** The rail breaks at This week / This month /
 *    This year / Before this year, so the jump from last Tuesday to six years
 *    ago is a visible seam instead of arithmetic the reader performs per row.
 *  - **Queries, not scrolling.** Depth, valence, tag and "taught something"
 *    filter the set; the counts sit on the filter itself, so the aside doubles
 *    as the summary of what is there.
 *  - **Significance is stated.** It ranks the whole model and was previously
 *    visible only above 80.
 *
 * Filters are local state and reset on leave — they are a question you ask, not
 * a preference you hold. Sort persists, because which end of a life you want to
 * read from is a habit.
 */

import * as React from "react";
import { Box, Stack, Tooltip, Typography, alpha } from "@mui/material";

import { SectionLabel, useSurface } from "@4eye/web/components/surface";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

import { useProfileStore } from "../store/CharacterProfileStore";
import { formatDate } from "../lib/time";
import { hasLearnedResult } from "./shared/LearnedResult";
import {
  ART_CHANNEL_META,
  ART_PHASE_META,
  buildTimelineEntries,
  groupByEra,
  keyTimelineEntries,
  SOURCE_META,
  tagsOf,
  TIMELINE_SOURCES,
  VALENCE_META,
  type ArtChannel,
  type ArtPhase,
  type TimelineEntry,
  type TimelineSource,
  type Valence,
} from "../model/timeline";
import { CharacterTimeline } from "./CharacterTimeline";
import { TimelineArtView } from "./TimelineArtView";
import { significanceBand, VALENCE_CHIP_BLURB } from "../theme/brainTokens";

const SORTS = ["recent", "significant"] as const;
type Sort = (typeof SORTS)[number];

const VIEWS = ["art", "list"] as const;
type View = (typeof VIEWS)[number];

const VALENCES: readonly Valence[] = ["positive", "neutral", "negative"];

/* ──────────────────────────────────────────────────── filter primitives */

/**
 * A toggle pill carrying its own count.
 *
 * The count is over the *unfiltered* set on purpose: a facet whose number moves
 * every time you touch a different facet cannot be read as "how much of this
 * exists", which is the question the aside is there to answer.
 */
function FilterPill({
  label,
  count,
  active,
  color,
  title,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  color: string;
  title?: string;
  onClick: () => void;
}) {
  const pill = (
    <Stack
      component="button"
      type="button"
      aria-pressed={active}
      onClick={onClick}
      direction="row"
      sx={{
        alignItems: "center",
        gap: 0.6,
        px: 0.9,
        py: 0.4,
        borderRadius: 999,
        cursor: "pointer",
        font: "inherit",
        border: "1px solid",
        borderColor: active ? alpha(color, 0.6) : "divider",
        bgcolor: active ? alpha(color, 0.12) : "transparent",
        color: active ? color : "text.secondary",
        transition: "background-color .15s, border-color .15s",
        "&:hover": { borderColor: alpha(color, 0.5), bgcolor: alpha(color, 0.07) },
        "&:focus-visible": { outline: `2px solid ${alpha(color, 0.6)}`, outlineOffset: 2 },
      }}
    >
      <Typography
        component="span"
        sx={{ fontSize: "0.68rem", fontWeight: active ? 800 : 600, lineHeight: 1.3, whiteSpace: "nowrap" }}
      >
        {label}
      </Typography>
      {count !== undefined && (
        <Typography
          component="span"
          sx={{
            fontSize: "0.6rem",
            fontWeight: 800,
            lineHeight: 1.3,
            color: active ? color : "text.disabled",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {count}
        </Typography>
      )}
    </Stack>
  );

  return title ? (
    <Tooltip title={title} arrow placement="left">
      {pill}
    </Tooltip>
  ) : (
    pill
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "text.disabled",
          mb: 0.75,
        }}
      >
        {label}
      </Typography>
      <Stack direction="row" sx={{ gap: 0.6, flexWrap: "wrap" }}>
        {children}
      </Stack>
    </Box>
  );
}

/* ──────────────────────────────────────────────────── summary */

/** How much of the record went well, mixed, badly — as one 4px bar. */
function ValenceBar({ entries }: { entries: TimelineEntry[] }) {
  const counts = VALENCES.map((v) => ({ v, n: entries.filter((e) => e.valence === v).length })).filter((s) => s.n > 0);
  if (!counts.length) return null;

  return (
    <Stack direction="row" sx={{ height: 5, borderRadius: 999, overflow: "hidden", gap: "2px" }}>
      {counts.map(({ v, n }) => (
        <Tooltip key={v} title={`${VALENCE_META[v].label}: ${n}`} arrow>
          <Box sx={{ flex: n, bgcolor: VALENCE_META[v].color, opacity: 0.85 }} />
        </Tooltip>
      ))}
    </Stack>
  );
}

/** "spans 6 years" — the one number that says how deep the record goes. */
function spanLabel(entries: TimelineEntry[]): string | null {
  if (entries.length < 2) return null;
  const times = entries.map((e) => e.occurredAt);
  const days = (Math.max(...times) - Math.min(...times)) / 86_400_000;
  if (days >= 365) {
    const years = Math.round(days / 365);
    return `spans ${years} year${years === 1 ? "" : "s"}`;
  }
  if (days >= 31) return `spans ${Math.round(days / 30)} months`;
  return `spans ${Math.max(1, Math.round(days))} days`;
}

/* ──────────────────────────────────────────────────── lens */

/** Set toggle that keeps the "empty means all" convention. */
function toggle<T>(set: ReadonlySet<T>, value: T): ReadonlySet<T> {
  const next = new Set(set);
  if (!next.delete(value)) next.add(value);
  return next;
}

export function CharacterEvents({ accent }: { accent: string }) {
  const { state } = useProfileStore();
  const surface = useSurface();
  const ink = surface.ink(accent);

  const all = React.useMemo(() => buildTimelineEntries(state.feedEvents), [state.feedEvents]);

  const [sources, setSources] = React.useState<ReadonlySet<TimelineSource>>(new Set());
  const [valences, setValences] = React.useState<ReadonlySet<Valence>>(new Set());
  const [channels, setChannels] = React.useState<ReadonlySet<ArtChannel>>(new Set());
  const [phases, setPhases] = React.useState<ReadonlySet<ArtPhase>>(new Set());
  const [tag, setTag] = React.useState<string | null>(null);
  const [taughtOnly, setTaughtOnly] = React.useState(false);
  const [sort, setSort] = usePersistedChoice("4eye.profile.eventsSort", "recent" as Sort, SORTS);
  // v2 defaults to art — the image timeline is the Events lens reading surface.
  const [view, setView] = usePersistedChoice("4eye.profile.eventsView.v2", "art" as View, VIEWS);

  const tags = React.useMemo(() => tagsOf(all).slice(0, 12), [all]);
  const taughtCount = React.useMemo(() => all.filter(hasLearnedResult).length, [all]);
  const keyEvents = React.useMemo(() => keyTimelineEntries(all), [all]);
  const channelCounts = React.useMemo(() => {
    const counts = { life: 0, lessons: 0, ascension: 0 };
    for (const e of all) {
      if (e.artChannel) counts[e.artChannel] += 1;
    }
    return counts;
  }, [all]);
  const phaseCounts = React.useMemo(() => {
    const counts = { dark: 0, ember: 0, light: 0 };
    for (const e of all) {
      if (e.artPhase) counts[e.artPhase] += 1;
    }
    return counts;
  }, [all]);

  const filtered = React.useMemo(() => {
    const list = all.filter(
      (e) =>
        (sources.size === 0 || sources.has(e.source)) &&
        (valences.size === 0 || valences.has(e.valence)) &&
        (channels.size === 0 || (e.artChannel != null && channels.has(e.artChannel))) &&
        (phases.size === 0 || (e.artPhase != null && phases.has(e.artPhase))) &&
        (tag === null || (e.tags ?? []).includes(tag)) &&
        (!taughtOnly || hasLearnedResult(e)),
    );
    return sort === "significant" ? [...list].sort((a, b) => b.significance - a.significance) : list;
  }, [all, sources, valences, channels, phases, tag, taughtOnly, sort]);

  const filtersActive =
    sources.size > 0 ||
    valences.size > 0 ||
    channels.size > 0 ||
    phases.size > 0 ||
    tag !== null ||
    taughtOnly;
  const clear = React.useCallback(() => {
    setSources(new Set());
    setValences(new Set());
    setChannels(new Set());
    setPhases(new Set());
    setTag(null);
    setTaughtOnly(false);
  }, []);

  // Eras answer "when did this happen", which sorting by weight has already
  // discarded — so the ranked read is one flat list, honestly labelled.
  const groups = React.useMemo(
    () => (sort === "recent" ? groupByEra(filtered) : [{ id: "ranked" as const, label: "", hint: "", entries: filtered }]),
    [filtered, sort],
  );

  const span = spanLabel(filtered);

  const aside = (
    <Stack sx={{ gap: 2 }}>
      {/* Summary — what the record contains, before any question is asked. */}
      <Box>
        <Stack direction="row" sx={{ alignItems: "baseline", gap: 0.75, mb: 0.75 }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: ink, lineHeight: 1 }}>
            {filtered.length}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", fontWeight: 600 }}>
            {filtered.length === 1 ? "event" : "events"}
            {filtersActive && ` of ${all.length}`}
          </Typography>
        </Stack>
        <ValenceBar entries={filtered} />
        {span && (
          <Typography sx={{ fontSize: "0.65rem", color: "text.disabled", mt: 0.75, display: "block" }}>
            {span}
            {filtered.length > 0 && ` · back to ${formatDate(Math.min(...filtered.map((e) => e.occurredAt)))}`}
          </Typography>
        )}
      </Box>

      <FilterGroup label="Depth">
        {TIMELINE_SOURCES.map((s) => (
          <FilterPill
            key={s}
            label={SOURCE_META[s].label}
            title={SOURCE_META[s].blurb}
            count={all.filter((e) => e.source === s).length}
            active={sources.has(s)}
            color={accent}
            onClick={() => setSources((prev) => toggle(prev, s))}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="How it went">
        {VALENCES.map((v) => (
          <FilterPill
            key={v}
            label={VALENCE_META[v].label}
            title={VALENCE_CHIP_BLURB[v]}
            count={all.filter((e) => e.valence === v).length}
            active={valences.has(v)}
            color={VALENCE_META[v].color}
            onClick={() => setValences((prev) => toggle(prev, v))}
          />
        ))}
      </FilterGroup>

      {(phaseCounts.dark > 0 || phaseCounts.ember > 0 || phaseCounts.light > 0) && (
        <FilterGroup label="Darkness → light">
          {(["dark", "ember", "light"] as const).map((ph) => (
            <FilterPill
              key={ph}
              label={ART_PHASE_META[ph].label}
              title={ART_PHASE_META[ph].blurb}
              count={phaseCounts[ph]}
              active={phases.has(ph)}
              color={ART_PHASE_META[ph].color}
              onClick={() => setPhases((prev) => toggle(prev, ph))}
            />
          ))}
        </FilterGroup>
      )}

      {(channelCounts.life > 0 || channelCounts.lessons > 0 || channelCounts.ascension > 0) && (
        <FilterGroup label="Colour rails">
          {(["life", "lessons", "ascension"] as const).map((ch) => (
            <FilterPill
              key={ch}
              label={ART_CHANNEL_META[ch].label}
              title={ART_CHANNEL_META[ch].blurb}
              count={channelCounts[ch]}
              active={channels.has(ch)}
              color={ART_CHANNEL_META[ch].color}
              onClick={() => setChannels((prev) => toggle(prev, ch))}
            />
          ))}
        </FilterGroup>
      )}

      {taughtCount > 0 && (
        <FilterGroup label="Depth of record">
          <FilterPill
            label="Taught something"
            title="Only entries that recorded what they taught and what changed"
            count={taughtCount}
            active={taughtOnly}
            color={accent}
            onClick={() => setTaughtOnly((v) => !v)}
          />
        </FilterGroup>
      )}

      {tags.length > 0 && (
        <FilterGroup label="Tagged">
          {tags.map(({ tag: t, count }) => (
            <FilterPill
              key={t}
              label={t}
              count={count}
              active={tag === t}
              color={accent}
              // Single-select: two tags at once is an intersection nobody asked
              // for on a thirteen-entry list, and it empties the page.
              onClick={() => setTag((prev) => (prev === t ? null : t))}
            />
          ))}
        </FilterGroup>
      )}

      {filtersActive && (
        <Box
          component="button"
          type="button"
          onClick={clear}
          sx={{
            alignSelf: "flex-start",
            border: 0,
            p: 0,
            bgcolor: "transparent",
            font: "inherit",
            cursor: "pointer",
            fontSize: "0.68rem",
            fontWeight: 800,
            color: ink,
            "&:hover": { textDecoration: "underline" },
            "&:focus-visible": { outline: `2px solid ${alpha(accent, 0.6)}`, outlineOffset: 2 },
          }}
        >
          Clear filters
        </Box>
      )}
    </Stack>
  );

  const main = (
    <Box sx={{ gridColumn: { laptop: 1 }, gridRow: { laptop: 1 }, minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SectionLabel accent={accent}>
              {view === "art"
                ? "Image timeline"
                : sort === "recent"
                  ? "Most recent first"
                  : "Most significant first"}
            </SectionLabel>
          </Box>
          <CycleControl label="View" value={view} options={VIEWS} accent={accent} onChange={setView} />
          {view === "list" && (
            <CycleControl label="Order" value={sort} options={SORTS} accent={accent} onChange={setSort} />
          )}
        </Stack>

        {keyEvents.length > 0 && view === "list" && !filtersActive && (
          <Box sx={{ mb: 2.5 }}>
            <Stack direction="row" sx={{ alignItems: "baseline", gap: 1, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: "text.primary",
                }}
              >
                Key events
              </Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "text.disabled", flex: 1 }}>
                Starred light + critical nodes — juicy data threaded through the dark
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ gap: 0.75, flexWrap: "wrap" }}>
              {keyEvents.map((e) => {
                const band = significanceBand(e.significance);
                return (
                  <Tooltip
                    key={e.id}
                    title={`${band.blurb} · ${VALENCE_CHIP_BLURB[e.valence]}`}
                    arrow
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        gap: 0.6,
                        px: 1,
                        py: 0.45,
                        borderRadius: 999,
                        border: "1px solid",
                        borderColor: alpha(band.color, 0.4),
                        bgcolor: alpha(band.color, 0.08),
                        maxWidth: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: VALENCE_META[e.valence].color,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: "text.primary",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 220,
                        }}
                      >
                        {e.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.58rem",
                          fontWeight: 800,
                          color: band.color,
                          fontVariantNumeric: "tabular-nums",
                          flexShrink: 0,
                        }}
                      >
                        {band.rank10}/10
                      </Typography>
                    </Stack>
                  </Tooltip>
                );
              })}
            </Stack>
          </Box>
        )}

        {filtered.length === 0 ? (
          <Stack sx={{ py: 6, alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              Nothing in the record matches that.
            </Typography>
            <Box
              component="button"
              type="button"
              onClick={clear}
              sx={{
                border: "1px solid",
                borderColor: alpha(accent, 0.4),
                borderRadius: 999,
                px: 1.4,
                py: 0.5,
                bgcolor: "transparent",
                font: "inherit",
                cursor: "pointer",
                fontSize: "0.7rem",
                fontWeight: 800,
                color: ink,
                "&:hover": { bgcolor: alpha(accent, 0.1) },
                "&:focus-visible": { outline: `2px solid ${alpha(accent, 0.6)}`, outlineOffset: 2 },
              }}
            >
              Clear filters
            </Box>
          </Stack>
        ) : view === "art" ? (
          <TimelineArtView entries={filtered} />
        ) : (
          <Stack sx={{ gap: 2.5 }}>
            {groups.map((group) => (
              <Box key={group.id}>
                {group.label && (
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "baseline",
                      gap: 1,
                      mb: 1,
                      pb: 0.5,
                      borderBottom: "1px solid",
                      borderColor: alpha(accent, 0.18),
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        color: "text.primary",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {group.label}
                    </Typography>
                    <Typography sx={{ fontSize: "0.65rem", color: "text.disabled", flex: 1, minWidth: 0 }}>
                      {group.hint}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: "text.disabled",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {group.entries.length}
                    </Typography>
                  </Stack>
                )}
                <CharacterTimeline entries={group.entries} density="comfortable" />
              </Box>
            ))}
          </Stack>
        )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        alignItems: "start",
        gridTemplateColumns: { zero: "1fr", laptop: "minmax(0, 1fr) 244px" },
      }}
    >
      {/*
        The aside leads in source order so the small-screen reading is
        summary → filters → record, rather than making the reader scroll a
        six-year timeline to discover it could have been filtered. At laptop
        both children are explicitly placed, which moves it to the right of the
        rail and lets it stay put while the record scrolls past.
      */}
      <Box
        sx={{
          gridColumn: { laptop: 2 },
          gridRow: { laptop: 1 },
          position: { laptop: "sticky" },
          top: 8,
          pl: { laptop: 2 },
          borderLeft: { laptop: "1px solid" },
          borderColor: { laptop: "divider" },
        }}
      >
        {aside}
      </Box>
      {main}
    </Box>
  );
}
