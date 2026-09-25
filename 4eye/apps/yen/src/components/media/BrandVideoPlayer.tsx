"use client";

/**
 * BrandVideoPlayer — the recording, and everything the library knows about it.
 *
 * `<video controls>` was doing the job and doing it anonymously: default chrome,
 * no chapters, no way to reach the other cuts or editions, and no room for the
 * commentary track. Those are not decorations on top of a player — they are the
 * reasons this library exists rather than being a folder of mp4s — so the
 * player owns them.
 *
 * What it adds over the native element:
 *
 *  - **Chapter marks on the scrubber**, and a list under it. Both seek. A
 *    33-minute walkthrough where the HUD section is 22 minutes in is unusable
 *    without them.
 *  - **A version picker** showing the cut history as a branch, so "which one am
 *    I watching and what changed" is answerable without leaving the card.
 *  - **A language picker** over the entry's editions, marking which are original
 *    audio, dubbed, or subtitled — because those are not equivalent and a flag
 *    icon implies they are.
 *  - **A commentary toggle** that opens the talk-over window.
 *  - **A music layer** — focus pad / binaural bed under the talk track (teach
 *    the overlay here; move the feature later).
 *
 * Sources are frequently `null` while a file is outstanding. The player stays
 * fully operable in that state — controls, chapters, pickers all work — and
 * says so, rather than rendering a broken element. That is the point of a
 * library you publish before it is finished.
 */

import * as React from "react";
import { Box, Menu, MenuItem, Stack, Tooltip, Typography, alpha } from "@mui/material";

import {
  currentVersion,
  type VideoEntry,
  type VideoLanguage,
  type VideoVersion,
} from "@yen/content/media";
import { useT } from "@/i18n/LocaleProvider";

import { CommentaryWindow } from "./CommentaryWindow";
import { MusicLayerControl } from "./MusicLayerOverlay";
import { usePresentation } from "./PresentationMode";
import {
  BranchGlyph,
  ChaptersGlyph,
  CommentaryGlyph,
  ExpandGlyph,
  LanguagesGlyph,
  MutedGlyph,
  PauseGlyph,
  PlayGlyph,
  ReplayGlyph,
  SoundGlyph,
} from "./playerIcons";

function clock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds % 60);
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

/* --------------------------------------------------------------- controls */

function ControlButton({
  label,
  hint,
  active = false,
  disabled = false,
  accent,
  ink,
  onClick,
  children,
}: {
  /**
   * The control's *name* — and therefore its accessible name. Keep it a name:
   * an earlier version passed the commentary button's explanatory sentence
   * here, which made its accessible name a paragraph and left no way to ask a
   * screen reader, or a test, for "the Commentary button".
   */
  label: string;
  /** Longer explanation. Tooltip only — never the accessible name. */
  hint?: string;
  active?: boolean;
  disabled?: boolean;
  accent: string;
  ink: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip title={hint ?? label} arrow>
      <Box component="span" sx={{ display: "inline-flex" }}>
        <Box
          component="button"
          type="button"
          aria-label={label}
          aria-pressed={active || undefined}
          disabled={disabled}
          onClick={onClick}
          sx={{
            appearance: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            p: 0,
            border: "1px solid",
            borderColor: active ? alpha(accent, 0.6) : "transparent",
            borderRadius: 1.25,
            bgcolor: active ? alpha(accent, 0.18) : "transparent",
            color: active ? accent : ink,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
            transition: "background-color 140ms ease, color 140ms ease, border-color 140ms ease",
            "&:hover:not(:disabled)": { bgcolor: alpha(accent, 0.14), color: accent },
            "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Tooltip>
  );
}

/* --------------------------------------------------------------- scrubber */

function Scrubber({
  entry,
  duration,
  time,
  accent,
  onSeek,
}: {
  entry: VideoEntry;
  duration: number;
  time: number;
  accent: string;
  onSeek: (t: number) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);
  const pct = duration > 0 ? Math.min(100, Math.max(0, (time / duration) * 100)) : 0;

  const seekFromClientX = React.useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el || duration <= 0) return;
      const box = el.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
      onSeek(ratio * duration);
    },
    [duration, onSeek],
  );

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      seekFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [seekFromClientX]);

  return (
    <Box
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.max(0, Math.round(duration))}
      aria-valuenow={Math.round(time)}
      aria-valuetext={clock(time)}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        seekFromClientX(e.clientX);
      }}
      onClick={(e) => seekFromClientX(e.clientX)}
      onKeyDown={(e) => {
        if (duration <= 0) return;
        if (e.key === "ArrowRight") onSeek(Math.min(duration, time + 5));
        if (e.key === "ArrowLeft") onSeek(Math.max(0, time - 5));
        if (e.key === "Home") onSeek(0);
        if (e.key === "End") onSeek(duration);
      }}
      sx={{
        position: "relative",
        height: 22,
        display: "flex",
        alignItems: "center",
        cursor: duration > 0 ? "pointer" : "default",
        touchAction: "none",
        "&:hover .track": { height: 7 },
        "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2, borderRadius: 1 },
      }}
    >
      <Box
        className="track"
        sx={{
          position: "relative",
          width: "100%",
          height: 4,
          borderRadius: 999,
          bgcolor: alpha("#94a3b8", 0.35),
          transition: "height 120ms ease",
          overflow: "visible",
        }}
      >
        {/*
          Progress fill: left+width only — never `inset:0` with width, which
          locks left/right and breaks the playhead track.
        */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: `${pct}%`,
            borderRadius: 999,
            bgcolor: accent,
            pointerEvents: "none",
          }}
        />

        {duration > 0 &&
          (entry.chapters ?? []).map((c) =>
            c.start <= 0 ? null : (
              <Tooltip key={c.id} title={`${c.label} · ${clock(c.start)}`} arrow>
                <Box
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSeek(c.start);
                  }}
                  sx={{
                    position: "absolute",
                    top: -3,
                    left: `${(c.start / duration) * 100}%`,
                    width: 3,
                    height: 10,
                    ml: "-1.5px",
                    borderRadius: 999,
                    bgcolor: "#fff",
                    boxShadow: `0 0 0 1px ${alpha("#0f172a", 0.35)}`,
                    "&:hover": { transform: "scaleY(1.35)" },
                  }}
                />
              </Tooltip>
            ),
          )}

        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            width: 12,
            height: 12,
            mt: "-6px",
            ml: "-6px",
            borderRadius: "50%",
            bgcolor: accent,
            boxShadow: `0 0 0 3px ${alpha(accent, 0.25)}`,
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------ version list */

/**
 * The cut history as a branch, not a dropdown of names.
 *
 * "v2" tells you nothing; "cut to 22 minutes, chapters added, HUD re-recorded,
 * from v1" tells you whether to watch it. The indent shows descent, so a
 * re-cut of a re-cut is visibly that.
 */
function VersionMenu({
  versions,
  activeId,
  anchor,
  accent,
  onPick,
  onClose,
}: {
  versions: VideoVersion[];
  activeId: string | null;
  anchor: HTMLElement | null;
  accent: string;
  onPick: (v: VideoVersion) => void;
  onClose: () => void;
}) {
  const t = useT();
  return (
    <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={onClose} slotProps={{ paper: { sx: { maxWidth: 340 } } }}>
      {versions.map((v) => {
        const active = v.id === activeId;
        return (
          <MenuItem
            key={v.id}
            selected={active}
            onClick={() => {
              onPick(v);
              onClose();
            }}
            sx={{ alignItems: "flex-start", gap: 1.25, py: 1, pl: v.parent ? 3 : 1.5, whiteSpace: "normal" }}
          >
            <Box
              aria-hidden
              sx={{
                mt: 0.65,
                width: 9,
                height: 9,
                flexShrink: 0,
                borderRadius: "50%",
                border: `2px solid ${accent}`,
                bgcolor: active ? accent : "transparent",
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" sx={{ alignItems: "baseline", gap: 0.75, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>{v.label}</Typography>
                {v.current && (
                  <Typography sx={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", color: accent }}>
                    {t("player.currentCut")}
                  </Typography>
                )}
                {v.date && (
                  <Typography sx={{ fontSize: 11, color: "text.disabled", fontFamily: "monospace" }}>
                    {v.date}
                  </Typography>
                )}
              </Stack>
              <Typography sx={{ fontSize: 12.5, color: "text.secondary", lineHeight: 1.45 }}>
                {v.note}
              </Typography>
              {v.parent && (
                <Typography sx={{ fontSize: 11, color: "text.disabled", mt: 0.25, fontFamily: "monospace" }}>
                  {t("player.branchedFrom", { parent: v.parent })}
                </Typography>
              )}
            </Box>
          </MenuItem>
        );
      })}
    </Menu>
  );
}

/* ----------------------------------------------------------------- player */

export function BrandVideoPlayer({ entry }: { entry: VideoEntry }) {
  const t = useT();
  const { accent, ink, inkMuted, app } = usePresentation();
  const ref = React.useRef<HTMLVideoElement>(null);

  const versions = entry.versions ?? [];
  const languages = entry.languages ?? [];

  const [version, setVersion] = React.useState<VideoVersion | null>(() => currentVersion(entry));
  const [language, setLanguage] = React.useState<VideoLanguage | null>(
    () => languages.find((l) => l.kind === "original") ?? languages[0] ?? null,
  );
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [ended, setEnded] = React.useState(false);
  const [commentaryOpen, setCommentaryOpen] = React.useState(false);
  const [menu, setMenu] = React.useState<{ kind: "chapters" | "languages" | "versions"; el: HTMLElement } | null>(null);

  /*
    Which file plays, in priority order: the chosen edition, then the chosen
    cut, then the entry's own src. A dubbed edition is a different recording, so
    it wins over the cut; a subtitled one carries no `src` of its own and falls
    through to the cut, which is correct — subtitles ride the original video.
  */
  const src = language?.src ?? version?.src ?? entry.src;

  const activeChapter = React.useMemo(() => {
    const chapters = entry.chapters ?? [];
    let found = null as (typeof chapters)[number] | null;
    for (const c of chapters) if (c.start <= time) found = c;
    return found;
  }, [entry.chapters, time]);

  const toggle = React.useCallback(() => {
    const el = ref.current;
    if (!el || !src) return;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  }, [src]);

  const seek = React.useCallback((to: number) => {
    const el = ref.current;
    if (!el) return;
    const dur = el.duration || duration || 0;
    el.currentTime = Math.max(0, Math.min(dur || Number.MAX_SAFE_INTEGER, to));
    setTime(el.currentTime);
  }, [duration]);

  const syncClock = React.useCallback((el: HTMLVideoElement) => {
    if (Number.isFinite(el.duration) && el.duration > 0) setDuration(el.duration);
    setTime(el.currentTime || 0);
  }, []);

  const fullscreen = () => {
    void ref.current?.parentElement?.requestFullscreen?.().catch(() => {});
  };

  return (
    <Box>
      {/* ── stage ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 1.5,
          overflow: "hidden",
          bgcolor: "#000",
          aspectRatio: entry.orientation === "portrait" ? "9 / 16" : "16 / 9",
          ...(entry.orientation === "portrait" && { maxWidth: 360, mx: "auto", width: "100%" }),
          border: app ? `1px solid ${alpha(accent, 0.25)}` : "none",
        }}
      >
        {src ? (
          <Box
            component="video"
            ref={ref}
            src={src}
            poster={entry.poster ?? undefined}
            preload="metadata"
            playsInline
            muted={muted}
            onClick={toggle}
            onPlay={() => {
              setPlaying(true);
              setEnded(false);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
              setEnded(true);
            }}
            onTimeUpdate={(e) => syncClock(e.target as HTMLVideoElement)}
            onLoadedMetadata={(e) => syncClock(e.target as HTMLVideoElement)}
            onDurationChange={(e) => syncClock(e.target as HTMLVideoElement)}
            onSeeked={(e) => setTime((e.target as HTMLVideoElement).currentTime)}
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: entry.orientation === "portrait" ? "center top" : "center center",
              cursor: "pointer",
            }}
          />
        ) : (
          /*
            No file: show the poster if there is one, and say what is missing.
            The controls below stay live — the chapter list, versions and
            editions are all real information about a recording that exists,
            whether or not its bytes are on this machine yet.
          */
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              backgroundImage: entry.poster ? `url(${entry.poster})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <Typography
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#e2e8f0",
                bgcolor: alpha("#0b1220", 0.78),
                border: `1px dashed ${alpha("#94a3b8", 0.4)}`,
                textAlign: "center",
                maxWidth: "34ch",
              }}
            >
              {t("player.noFile")}
            </Typography>
          </Box>
        )}

        {/* Chapter name, over the stage, so you always know where you are. */}
        {activeChapter && playing && (
          <Typography
            sx={{
              position: "absolute",
              left: 10,
              top: 10,
              px: 1,
              py: 0.35,
              borderRadius: 0.75,
              fontSize: 11,
              fontWeight: 700,
              color: "#e2e8f0",
              bgcolor: alpha("#0b1220", 0.72),
              pointerEvents: "none",
            }}
          >
            {activeChapter.label}
          </Typography>
        )}
      </Box>

      {/* ── control bar ───────────────────────────────────────────────── */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          mt: 0.75,
          color: ink,
        }}
      >
        <ControlButton
          label={ended ? t("player.replay") : playing ? t("player.pause") : t("player.play")}
          accent={accent}
          ink={ink}
          disabled={!src}
          onClick={ended ? () => seek(0) : toggle}
        >
          {ended ? <ReplayGlyph size={19} /> : playing ? <PauseGlyph size={19} /> : <PlayGlyph size={19} />}
        </ControlButton>

        <ControlButton
          label={muted ? t("player.unmute") : t("player.mute")}
          accent={accent}
          ink={ink}
          disabled={!src}
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? <MutedGlyph size={18} /> : <SoundGlyph size={18} />}
        </ControlButton>

        <Box sx={{ flex: 1, minWidth: 0, mx: 0.75 }}>
          <Scrubber entry={entry} duration={duration} time={time} accent={accent} onSeek={seek} />
        </Box>

        <Typography
          sx={{ fontSize: 11.5, fontVariantNumeric: "tabular-nums", color: inkMuted, flexShrink: 0, mr: 0.5 }}
        >
          {clock(time)} / {duration > 0 ? clock(duration) : entry.duration ?? "—"}
        </Typography>

        {(entry.chapters?.length ?? 0) > 0 && (
          <ControlButton
            label={t("player.chapters")}
            accent={accent}
            ink={ink}
            active={menu?.kind === "chapters"}
            onClick={(e) => setMenu({ kind: "chapters", el: e.currentTarget })}
          >
            <ChaptersGlyph size={18} />
          </ControlButton>
        )}

        {languages.length > 1 && (
          <ControlButton
            label={t("player.languages")}
            accent={accent}
            ink={ink}
            active={menu?.kind === "languages"}
            onClick={(e) => setMenu({ kind: "languages", el: e.currentTarget })}
          >
            <LanguagesGlyph size={18} />
          </ControlButton>
        )}

        {versions.length > 1 && (
          <ControlButton
            label={t("player.versions")}
            accent={accent}
            ink={ink}
            active={menu?.kind === "versions"}
            onClick={(e) => setMenu({ kind: "versions", el: e.currentTarget })}
          >
            <BranchGlyph size={18} />
          </ControlButton>
        )}

        {entry.commentary && (
          <ControlButton
            label={t("player.commentary")}
            hint={commentaryOpen ? t("player.commentaryOn") : t("player.commentaryHint")}
            accent={accent}
            ink={ink}
            active={commentaryOpen}
            onClick={() => setCommentaryOpen((v) => !v)}
          >
            <CommentaryGlyph size={18} />
          </ControlButton>
        )}

        <MusicLayerControl accent={accent} ink={ink} playing={playing} />

        <ControlButton label={t("player.fullscreen")} accent={accent} ink={ink} disabled={!src} onClick={fullscreen}>
          <ExpandGlyph size={17} />
        </ControlButton>
      </Stack>

      {/* ── current cut / edition line ────────────────────────────────── */}
      {(version || language) && (
        <Stack direction="row" sx={{ gap: 1, mt: 0.5, flexWrap: "wrap", alignItems: "center" }}>
          {version && (
            <Typography sx={{ fontSize: 11, fontFamily: "monospace", color: inkMuted }}>
              {version.label}
            </Typography>
          )}
          {language && (
            <Typography sx={{ fontSize: 11, color: inkMuted }} lang={language.code}>
              {language.label} · {t(`player.${language.kind}` as "player.original")}
            </Typography>
          )}
        </Stack>
      )}

      {/* ── menus ─────────────────────────────────────────────────────── */}
      <Menu
        open={menu?.kind === "chapters"}
        anchorEl={menu?.el ?? null}
        onClose={() => setMenu(null)}
        slotProps={{ paper: { sx: { maxWidth: 340 } } }}
      >
        {(entry.chapters ?? []).map((c) => (
          <MenuItem
            key={c.id}
            selected={activeChapter?.id === c.id}
            onClick={() => {
              seek(c.start);
              setMenu(null);
            }}
            sx={{ alignItems: "flex-start", gap: 1.25, whiteSpace: "normal", py: 0.85 }}
          >
            <Typography
              sx={{ fontSize: 11.5, fontFamily: "monospace", color: accent, mt: 0.15, flexShrink: 0 }}
            >
              {clock(c.start)}
            </Typography>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 650 }}>{c.label}</Typography>
              {c.note && (
                <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.4 }}>
                  {c.note}
                </Typography>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <Menu open={menu?.kind === "languages"} anchorEl={menu?.el ?? null} onClose={() => setMenu(null)}>
        {languages.map((l) => (
          <MenuItem
            key={l.code}
            selected={language?.code === l.code}
            onClick={() => {
              setLanguage(l);
              setMenu(null);
            }}
            sx={{ gap: 1.5 }}
          >
            <Typography lang={l.code} sx={{ fontSize: 13.5, fontWeight: 650, flex: 1 }}>
              {l.label}
            </Typography>
            <Typography sx={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "text.disabled" }}>
              {t(`player.${l.kind}` as "player.original")}
            </Typography>
            {!l.src && !l.track && (
              <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "warning.main" }} title="No file yet" />
            )}
          </MenuItem>
        ))}
      </Menu>

      <VersionMenu
        versions={versions}
        activeId={version?.id ?? null}
        anchor={menu?.kind === "versions" ? menu.el : null}
        accent={accent}
        onPick={setVersion}
        onClose={() => setMenu(null)}
      />

      {commentaryOpen && entry.commentary && (
        <CommentaryWindow
          commentary={entry.commentary}
          syncTo={ref}
          playing={playing}
          accent={accent}
          onClose={() => setCommentaryOpen(false)}
        />
      )}
    </Box>
  );
}
