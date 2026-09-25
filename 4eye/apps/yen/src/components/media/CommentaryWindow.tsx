"use client";

/**
 * The talk-over window: a second recording of the presenter narrating the first.
 *
 * The industry word for this is a **commentary track** — the DVD idea, where
 * the director talks over the film. Here it is a video rather than an audio
 * track, because the point is partly that you can see him say it.
 *
 * Two mechanics matter:
 *
 * **It is not a version.** Playing commentary does not replace the recording;
 * it plays *with* it. So this is a separate element in its own window, and the
 * player drives its clock — see `syncTo`. Drift is corrected rather than
 * prevented: browsers do not give two media elements a shared timeline, so the
 * honest approach is to check the gap and nudge when it exceeds a threshold
 * a viewer would notice.
 *
 * **It floats, and can leave.** Default is a draggable panel inside the page,
 * because that works everywhere. Where the browser supports Document
 * Picture-in-Picture (Chromium, today), "pop out" moves the same DOM node into
 * a real always-on-top OS window, so the commentary can sit beside the
 * recording while you scroll the page it is about.
 */

import * as React from "react";
import { Box, IconButton, Stack, Tooltip, Typography, alpha } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import type { VideoCommentary } from "@yen/content/media";
import { useT } from "@/i18n/LocaleProvider";
import { CommentaryGlyph } from "./playerIcons";

/** Gap in seconds beyond which the commentary is re-seeked rather than left. */
const DRIFT_TOLERANCE = 0.45;

interface DocumentPiP {
  requestWindow(options?: { width?: number; height?: number }): Promise<Window>;
}

function documentPiP(): DocumentPiP | null {
  const w = window as unknown as { documentPictureInPicture?: DocumentPiP };
  return w.documentPictureInPicture ?? null;
}

export interface CommentaryWindowProps {
  commentary: VideoCommentary;
  /** The element whose clock the commentary follows. */
  syncTo: React.RefObject<HTMLVideoElement>;
  /** Whether the main recording is currently playing. */
  playing: boolean;
  accent: string;
  onClose: () => void;
}

export function CommentaryWindow({
  commentary,
  syncTo,
  playing,
  accent,
  onClose,
}: CommentaryWindowProps) {
  const t = useT();
  const ref = React.useRef<HTMLVideoElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 24, y: 24 });
  const [poppedOut, setPoppedOut] = React.useState(false);
  const drag = React.useRef<{ dx: number; dy: number } | null>(null);

  /*
    Follow the main clock. Polling rather than listening to `timeupdate`:
    `timeupdate` fires on the element being corrected, so acting on it is a
    feedback loop, and its cadence (~4/s, unspecified) is not something to build
    a sync on. A 250ms check against the source of truth is both simpler and
    steadier.
  */
  React.useEffect(() => {
    const id = window.setInterval(() => {
      const main = syncTo.current;
      const side = ref.current;
      if (!main || !side || !commentary.src) return;

      const target = main.currentTime + (commentary.offset ?? 0);
      if (Math.abs(side.currentTime - target) > DRIFT_TOLERANCE) {
        side.currentTime = target;
      }
      if (playing && side.paused) void side.play().catch(() => {});
      if (!playing && !side.paused) side.pause();
    }, 250);
    return () => window.clearInterval(id);
  }, [syncTo, playing, commentary.src, commentary.offset]);

  // Drag, pointer-events based so it works with touch and pen too.
  const onPointerDown = (e: React.PointerEvent) => {
    if (poppedOut) return;
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPos({
      x: Math.max(8, e.clientX - drag.current.dx),
      y: Math.max(8, e.clientY - drag.current.dy),
    });
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const popOut = async () => {
    const api = documentPiP();
    const panel = panelRef.current;
    if (!api || !panel) return;
    try {
      const win = await api.requestWindow({ width: 340, height: 250 });
      // Carry the page's styles across — a PiP window starts with none.
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          const css = Array.from(sheet.cssRules).map((r) => r.cssText).join("");
          const style = win.document.createElement("style");
          style.textContent = css;
          win.document.head.appendChild(style);
        } catch {
          /* cross-origin sheet — skip it rather than fail the pop-out */
        }
      }
      win.document.body.style.margin = "0";
      win.document.body.append(panel);
      setPoppedOut(true);
      win.addEventListener("pagehide", () => {
        document.body.append(panel);
        setPoppedOut(false);
      });
    } catch {
      /* refused or unsupported — the in-page panel is still there */
    }
  };

  const canPopOut = typeof window !== "undefined" && documentPiP() !== null;

  return (
    <Box
      ref={panelRef}
      role="dialog"
      aria-label={t("commentary.title")}
      sx={{
        position: poppedOut ? "static" : "fixed",
        left: poppedOut ? undefined : pos.x,
        top: poppedOut ? undefined : pos.y,
        width: poppedOut ? "100%" : 320,
        zIndex: 1400,
        borderRadius: poppedOut ? 0 : 2,
        overflow: "hidden",
        bgcolor: "#0b1220",
        color: "#e2e8f0",
        border: poppedOut ? "none" : `1px solid ${alpha(accent, 0.45)}`,
        boxShadow: poppedOut ? "none" : "0 18px 40px -12px rgba(0,0,0,0.55)",
      }}
    >
      <Stack
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
          px: 1,
          py: 0.6,
          cursor: poppedOut ? "default" : "grab",
          bgcolor: alpha(accent, 0.14),
          touchAction: "none",
          "&:active": { cursor: poppedOut ? "default" : "grabbing" },
        }}
      >
        <Box sx={{ color: accent, display: "flex" }}>
          <CommentaryGlyph size={15} />
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", flex: 1 }}>
          {t("commentary.title")}
        </Typography>
        {canPopOut && !poppedOut && (
          <Tooltip title={t("commentary.popOut")} arrow>
            <IconButton size="small" onClick={popOut} sx={{ color: "inherit", p: 0.35 }}>
              <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={t("commentary.close")} arrow>
          <IconButton size="small" onClick={onClose} sx={{ color: "inherit", p: 0.35 }}>
            <CloseRoundedIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {commentary.src ? (
        <Box
          component="video"
          ref={ref}
          src={commentary.src}
          playsInline
          // No controls: this window follows the recording's clock, and a scrub
          // bar here would offer a control that immediately undoes itself.
          sx={{ display: "block", width: "100%", aspectRatio: "4 / 3", bgcolor: "#000" }}
        />
      ) : (
        <Box
          sx={{
            aspectRatio: "4 / 3",
            display: "grid",
            placeItems: "center",
            px: 2,
            textAlign: "center",
            bgcolor: alpha("#94a3b8", 0.06),
          }}
        >
          <Typography sx={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.5 }}>
            {t("commentary.pending")}
            <Box component="span" sx={{ display: "block", mt: 0.5, opacity: 0.7 }}>
              {commentary.label}
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
