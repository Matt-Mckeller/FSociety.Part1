"use client";

import * as React from "react";
import { Box, Chip, Stack, Tooltip, Typography, alpha } from "@mui/material";
import {
  PHOTOS,
  VIDEOS,
  VIDEO_SEGMENTS,
  allVideoTags,
  videoTags,
  videosInSegment,
  type PhotoEntry,
  type VideoEntry,
} from "@yen/content/media";

import { useT } from "@/i18n/LocaleProvider";
import { CONTENT_TEXT_PROPS } from "@/i18n/locales";
import { BrandVideoPlayer } from "./BrandVideoPlayer";
import { PresentationProvider, PresentationToggle, usePresentation } from "./PresentationMode";
import { SectionFrame } from "./SectionFrame";
import { TagGlyph } from "./playerIcons";

/*
  Entries whose file has not been supplied render as a labelled placeholder
  rather than a broken <video>/<img>. The page is presentable before the assets
  exist, and it is obvious which ones are outstanding.
*/
function Pending({ ratio }: { ratio: string }) {
  const t = useT();
  return (
    <Box
      sx={{
        aspectRatio: ratio,
        display: "grid",
        placeItems: "center",
        borderRadius: 1.5,
        border: "1px dashed",
        borderColor: "divider",
        bgcolor: "action.hover",
        color: "text.disabled",
        fontSize: 13,
      }}
    >
      {t("videos.pending")}
    </Box>
  );
}

/** The derived subjects. Muted on purpose — they are navigation, not headline. */
function TagRow({ tags, onPick }: { tags: string[]; onPick?: (tag: string) => void }) {
  const t = useT();
  const { inkMuted, accent } = usePresentation();
  if (tags.length === 0) return null;

  return (
    <Tooltip title={t("videos.tags.derived")} arrow placement="top-start">
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5, alignItems: "center", mt: 0.75 }}>
        <Box sx={{ color: inkMuted, display: "flex", mr: 0.25 }}>
          <TagGlyph size={12} />
        </Box>
        {tags.map((tag) => (
          <Typography
            key={tag}
            component={onPick ? "button" : "span"}
            type={onPick ? "button" : undefined}
            onClick={onPick ? () => onPick(tag) : undefined}
            sx={{
              font: "inherit",
              border: "1px solid",
              borderColor: alpha(accent, 0.22),
              bgcolor: alpha(accent, 0.05),
              borderRadius: 999,
              px: 0.7,
              py: 0.1,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.03em",
              color: inkMuted,
              cursor: onPick ? "pointer" : "default",
              "&:hover": onPick ? { borderColor: alpha(accent, 0.5), color: accent } : undefined,
            }}
          >
            {tag}
          </Typography>
        ))}
      </Stack>
    </Tooltip>
  );
}

function VideoCard({ entry, onPickTag }: { entry: VideoEntry; onPickTag: (tag: string) => void }) {
  const t = useT();
  const { app, surface, edge, ink, inkMuted, pad, radius, accent } = usePresentation();
  const tags = videoTags(entry);
  const portrait = entry.orientation === "portrait";

  return (
    // The id is the anchor target for links from a document to the recording
    // that walks through it.
    <Box
      id={entry.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        scrollMarginTop: 24,
        ...(portrait && { maxWidth: 360, width: "100%", justifySelf: "center" }),
        // In app mode the card becomes an object with an edge, because that is
        // what it is inside the product. On the site it stays unboxed so the
        // grid reads as an editorial page rather than a dashboard.
        ...(app && {
          p: pad,
          borderRadius: radius,
          bgcolor: surface,
          border: `1px solid ${edge}`,
        }),
      }}
    >
      <BrandVideoPlayer entry={entry} />

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography
            {...CONTENT_TEXT_PROPS}
            sx={{ fontSize: 16, fontWeight: 650, color: app ? ink : "text.primary" }}
          >
            {entry.title}
          </Typography>
          {entry.duration && (
            <Chip
              size="small"
              label={entry.duration}
              sx={{
                height: 19,
                fontSize: 11,
                ...(app && { bgcolor: alpha("#94a3b8", 0.14), color: inkMuted }),
              }}
            />
          )}
          {entry.recordedOn && (
            <Typography sx={{ fontSize: 12, color: app ? inkMuted : "text.disabled" }}>
              {entry.recordedOn}
            </Typography>
          )}
        </Box>

        <Typography
          {...CONTENT_TEXT_PROPS}
          sx={{
            fontSize: 14,
            color: app ? inkMuted : "text.secondary",
            lineHeight: 1.55,
            mt: 0.5,
            whiteSpace: "pre-line",
            // App mode is dense: the description clamps rather than setting the
            // row height for everything beside it.
            ...(app && {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }),
          }}
        >
          {entry.description}
        </Typography>

        <TagRow tags={tags} onPick={onPickTag} />

        {entry.sourceCode && (
          <Typography
            component={entry.sourceVideoId ? "a" : "span"}
            href={entry.sourceVideoId ? `#${entry.sourceVideoId}` : undefined}
            title={entry.sourceVideoId ? "Jump to the original session recording" : undefined}
            sx={{
              fontSize: 12,
              color: app ? accent : "text.secondary",
              mt: 0.75,
              fontFamily: "monospace",
              fontWeight: 650,
              letterSpacing: "0.02em",
              textDecoration: entry.sourceVideoId ? "none" : undefined,
              display: "inline-block",
              "&:hover": entry.sourceVideoId
                ? { textDecoration: "underline", color: app ? accent : "primary.main" }
                : undefined,
            }}
          >
            src {entry.sourceCode}
          </Typography>
        )}

        {entry.filedAs && (
          <Typography
            sx={{
              fontSize: 12,
              color: app ? inkMuted : "text.disabled",
              mt: entry.sourceCode ? 0.25 : 0.75,
              fontFamily: "monospace",
            }}
          >
            {t("videos.filedAs")} {entry.filedAs}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function PhotoCard({ entry }: { entry: PhotoEntry }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {entry.src ? (
        <Box
          component="img"
          src={entry.src}
          alt={entry.description || entry.title}
          loading="lazy"
          sx={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 1.5 }}
        />
      ) : (
        <Pending ratio="4 / 3" />
      )}
      <Box>
        <Typography sx={{ fontSize: 15, fontWeight: 650 }}>{entry.title}</Typography>
        <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.5, mt: 0.25 }}>
          {entry.description}
        </Typography>
      </Box>
    </Box>
  );
}

function Empty({ what, where }: { what: string; where: string }) {
  return (
    <Box sx={{ p: 4, borderRadius: 2, border: "1px dashed", borderColor: "divider", maxWidth: "70ch" }}>
      <Typography sx={{ fontSize: 15, lineHeight: 1.6, color: "text.secondary" }}>
        No {what} yet. Add files to <code>apps/yen/public/media/</code> and describe them in{" "}
        <code>{where}</code> — each entry needs a title and a description before it appears here.
      </Typography>
    </Box>
  );
}

/** The subject filter, over the whole library rather than per segment. */
function TagFilter({
  tags,
  active,
  onChange,
}: {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
}) {
  const t = useT();
  const { accent } = usePresentation();

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "text.disabled",
          mr: 0.5,
        }}
      >
        {t("videos.tags.label")}
      </Typography>
      {[null, ...tags].map((tag) => {
        const on = tag === active;
        return (
          <Typography
            key={tag ?? "__all"}
            component="button"
            type="button"
            aria-pressed={on}
            onClick={() => onChange(tag)}
            sx={{
              font: "inherit",
              cursor: "pointer",
              px: 1,
              py: 0.3,
              borderRadius: 999,
              fontSize: 11.5,
              fontWeight: 700,
              border: "1px solid",
              borderColor: on ? accent : "divider",
              bgcolor: on ? alpha(accent, 0.12) : "transparent",
              color: on ? accent : "text.secondary",
              "&:hover": { borderColor: alpha(accent, 0.55) },
            }}
          >
            {tag ?? t("videos.tags.all")}
          </Typography>
        );
      })}
    </Stack>
  );
}

function VideoGrid({
  entries,
  onPickTag,
}: {
  entries: VideoEntry[];
  onPickTag: (tag: string) => void;
}) {
  const t = useT();
  const { gap } = usePresentation();
  const portrait = entries.some((e) => e.orientation === "portrait");

  if (entries.length === 0) {
    return (
      <Typography sx={{ fontSize: 14, color: "text.secondary", py: 2 }}>{t("videos.empty")}</Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap,
        gridTemplateColumns: portrait
          ? {
              zero: "1fr",
              tablet: "repeat(2, minmax(0, 1fr))",
              laptop: "repeat(3, minmax(0, 1fr))",
              laptopL: "repeat(4, minmax(0, 1fr))",
            }
          : { zero: "1fr", laptop: "repeat(2, minmax(0, 1fr))" },
      }}
    >
      {entries.map((v) => (
        <VideoCard key={v.id} entry={v} onPickTag={onPickTag} />
      ))}
    </Box>
  );
}

function videoMatchesQuery(entry: VideoEntry, q: string): boolean {
  if (!q) return true;
  const hay = [
    entry.title,
    entry.description,
    entry.filedAs,
    entry.sourceCode,
    entry.id,
    ...(entry.pinnedTags ?? []),
    ...videoTags(entry),
    ...(entry.chapters ?? []).flatMap((c) => [c.label, c.note]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function VideoLibraryBody() {
  const t = useT();
  const { app, accent } = usePresentation();
  const [query, setQuery] = React.useState("");
  const [tag, setTag] = React.useState<string | null>(null);
  const [segmentFilter, setSegmentFilter] = React.useState<string | null>(null);
  const [orientation, setOrientation] = React.useState<"landscape" | "portrait" | null>(null);

  const tags = React.useMemo(() => allVideoTags(VIDEOS), []);
  const q = query.trim().toLowerCase();

  const matching = React.useMemo(() => {
    return VIDEOS.filter((v) => {
      if (tag && !videoTags(v).includes(tag)) return false;
      if (segmentFilter && (v.segment ?? "origin") !== segmentFilter) return false;
      if (orientation && (v.orientation ?? "landscape") !== orientation) return false;
      if (!videoMatchesQuery(v, q)) return false;
      return true;
    });
  }, [tag, segmentFilter, orientation, q]);

  const clearFilters = () => {
    setQuery("");
    setTag(null);
    setSegmentFilter(null);
    setOrientation(null);
  };

  const hasFilters = Boolean(query || tag || segmentFilter || orientation);

  return (
    <Stack sx={{ gap: 5 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px dashed",
          borderColor: "secondary.main",
          bgcolor: "action.hover",
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "text.secondary", mb: 1 }}>
          Record checklist
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 1.25, lineHeight: 1.5 }}>
          Shoot these in order — placeholders stay visible until files land in{" "}
          <code style={{ fontSize: 12 }}>public/media/videos/</code>.
        </Typography>
        <Box component="ol" sx={{ m: 0, pl: 2.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            { id: "site-intro-all", label: "Site intro — everything here" },
            { id: "highlights-what-is-here", label: "Highlights — what is here" },
            { id: "4eye-guided-tour", label: "4eye guided tour" },
            { id: "series-all-in-one", label: "Series: All_In_One" },
            { id: "series-all-in-won", label: "Series: All_In_Won" },
            { id: "series-all-in-neo", label: "Series: ALL_IN_NEO" },
            { id: "expanse-edu-walkthrough", label: "Expanse EDU walkthrough" },
          ].map((item) => (
            <Typography key={item.id} component="li" sx={{ fontSize: 13.5 }}>
              <Box
                component="a"
                href={`#${item.id}`}
                sx={{
                  color: "primary.main",
                  fontWeight: 650,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Box>
            </Typography>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.1,
            textTransform: "uppercase",
            color: "text.secondary",
            mb: 1,
          }}
        >
          Related photo albums
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "text.secondary", mb: 1.25, lineHeight: 1.5 }}>
          Instagram packs from <code style={{ fontSize: 12 }}>Media/Instagram</code> show on Photos →{" "}
          <Box component="a" href="/photos?view=exports" sx={{ color: accent, fontWeight: 700, textDecoration: "none" }}>
            Exports
          </Box>
          .
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
          {[
            { href: "/photos?view=exports", label: "Instagram Exports" },
            { href: "/photos", label: "Photos hub" },
            { href: "/photos?view=exports#export-capture-sequence", label: "Capture sequence" },
            { href: "/photos?view=exports#export-ready-4x5", label: "Ready 4×5" },
            { href: "/photos?view=exports#export-heart-evolve-export", label: "Heart.Evolve IG" },
            { href: "/photos?view=exports#export-mirror", label: "Mirror" },
            { href: "/photos?view=exports#export-venture-freedom", label: "Venture → Freedom" },
            { href: "/photos#album-tutorial-island", label: "Tutorial Island" },
            { href: "/photos#album-learning", label: "Learning" },
          ].map((item) => (
            <Box
              key={item.href}
              component="a"
              href={item.href}
              sx={{
                px: 1.1,
                py: 0.35,
                borderRadius: 999,
                border: "1px solid",
                borderColor: item.href.includes("exports") ? alpha(accent, 0.45) : "divider",
                fontSize: 12,
                fontWeight: 650,
                color: item.href.includes("view=exports") && !item.href.includes("#") ? accent : "text.secondary",
                textDecoration: "none",
                "&:hover": { borderColor: accent, color: accent },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Stack>
      </Box>

      <Stack sx={{ gap: 1.5 }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}
        >
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            {matching.length} of {VIDEOS.length} videos
          </Typography>
          <PresentationToggle />
        </Stack>

        <Box
          component="label"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            maxWidth: 420,
          }}
        >
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "text.disabled",
            }}
          >
            Search
          </Typography>
          <Box
            component="input"
            type="search"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Title, tag, chapter, filed as…"
            sx={{
              font: "inherit",
              fontSize: 14,
              px: 1.25,
              py: 1,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: app ? "rgba(15,23,42,0.6)" : "action.hover",
              color: "text.primary",
              outline: "none",
              "&:focus": { borderColor: accent, boxShadow: `0 0 0 2px ${alpha(accent, 0.25)}` },
            }}
          />
        </Box>

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "text.disabled",
              mr: 0.5,
            }}
          >
            Segment
          </Typography>
          {[null, ...VIDEO_SEGMENTS.map((s) => s.id)].map((id) => {
            const on = id === segmentFilter;
            const label = id ? VIDEO_SEGMENTS.find((s) => s.id === id)?.label ?? id : "All";
            return (
              <Typography
                key={id ?? "__all-seg"}
                component="button"
                type="button"
                aria-pressed={on}
                onClick={() => setSegmentFilter(id)}
                sx={{
                  font: "inherit",
                  cursor: "pointer",
                  px: 1,
                  py: 0.3,
                  borderRadius: 999,
                  fontSize: 11.5,
                  fontWeight: 700,
                  border: "1px solid",
                  borderColor: on ? accent : "divider",
                  bgcolor: on ? alpha(accent, 0.12) : "transparent",
                  color: on ? accent : "text.secondary",
                  "&:hover": { borderColor: alpha(accent, 0.55) },
                }}
              >
                {label}
              </Typography>
            );
          })}
        </Stack>

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "text.disabled",
              mr: 0.5,
            }}
          >
            Aspect
          </Typography>
          {(
            [
              [null, "All"],
              ["portrait", "portrait"],
              ["landscape", "landscape"],
            ] as const
          ).map(([id, label]) => {
            const on = id === orientation;
            return (
              <Typography
                key={label}
                component="button"
                type="button"
                aria-pressed={on}
                onClick={() => setOrientation(id)}
                sx={{
                  font: "inherit",
                  cursor: "pointer",
                  px: 1,
                  py: 0.3,
                  borderRadius: 999,
                  fontSize: 11.5,
                  fontWeight: 700,
                  border: "1px solid",
                  borderColor: on ? accent : "divider",
                  bgcolor: on ? alpha(accent, 0.12) : "transparent",
                  color: on ? accent : "text.secondary",
                  "&:hover": { borderColor: alpha(accent, 0.55) },
                }}
              >
                {label}
              </Typography>
            );
          })}
        </Stack>

        <TagFilter tags={tags} active={tag} onChange={setTag} />

        {hasFilters && (
          <Box>
            <Typography
              component="button"
              type="button"
              onClick={clearFilters}
              sx={{
                font: "inherit",
                cursor: "pointer",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "transparent",
                borderRadius: 999,
                px: 1.2,
                py: 0.35,
                fontSize: 12,
                fontWeight: 650,
                color: "text.secondary",
                "&:hover": { borderColor: accent, color: accent },
              }}
            >
              Clear filters
            </Typography>
          </Box>
        )}
      </Stack>

      {matching.length === 0 && (
        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
          No videos match these filters.
        </Typography>
      )}

      {VIDEO_SEGMENTS.map((segment) => {
        if (segmentFilter && segment.id !== segmentFilter) return null;
        const entries = videosInSegment(matching, segment.id);
        if (entries.length === 0 && !segment.fresh) return null;
        if (entries.length === 0) return null;

        return (
          <SectionFrame
            key={segment.id}
            label={segment.label}
            badge={segment.ref}
            blurb={segment.blurb}
            variant={segment.fresh ? "fresh" : "quiet"}
            accent={segment.accent ?? accent}
            dark={app}
            defaultCollapsed={!segment.fresh && !hasFilters}
            actions={
              <Typography sx={{ fontSize: 12, color: "text.disabled", fontVariantNumeric: "tabular-nums" }}>
                {t("videos.count", { n: entries.length })}
              </Typography>
            }
          >
            <VideoGrid entries={entries} onPickTag={setTag} />
          </SectionFrame>
        );
      })}
    </Stack>
  );
}

export function VideoLibrary() {
  if (VIDEOS.length === 0) return <Empty what="videos" where="@yen/content/media" />;
  return (
    <PresentationProvider>
      <VideoLibraryBody />
    </PresentationProvider>
  );
}

/**
 * @deprecated Use PhotoGallery / PhotoBrowse + photos.json allowlist.
 * Hand catalog PHOTOS is empty; kept only so old imports fail soft.
 */
export function PhotoLibrary() {
  if (PHOTOS.length === 0) return <Empty what="photos" where="@yen/content/media — use /photos PhotoGallery" />;
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2.5,
        gridTemplateColumns: {
          zero: "1fr",
          tablet: "repeat(2, minmax(0, 1fr))",
          laptop: "repeat(3, minmax(0, 1fr))",
        },
      }}
    >
      {PHOTOS.map((p) => (
        <PhotoCard key={p.id} entry={p} />
      ))}
    </Box>
  );
}
