"use client";

/**
 * Music layer overlay — optional bed under a recording.
 *
 * Runs beside the talk track (like commentary), not instead of it. Layers are
 * either a file under `public/` or a generated binaural / focus pad via Web
 * Audio so the control teaches the idea before the assets land. Headphones
 * matter for binaural; the UI says so.
 */

import * as React from "react";
import { Box, Menu, MenuItem, Slider, Stack, Typography, alpha } from "@mui/material";
import {
  MUSIC_LAYERS,
  getMusicLayer,
  type MusicLayer,
} from "@yen/content/music-layers";
import { useT } from "@/i18n/LocaleProvider";
import { MusicLayerGlyph } from "./playerIcons";

type ToneGraph = {
  ctx: AudioContext;
  left: OscillatorNode;
  right: OscillatorNode;
  gain: GainNode;
  merger: ChannelMergerNode;
};

function startTone(layer: MusicLayer, volume: number): ToneGraph | null {
  if (!layer.tone || typeof window === "undefined") return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;

  const ctx = new Ctx();
  const merger = ctx.createChannelMerger(2);
  const gain = ctx.createGain();
  gain.gain.value = volume;

  const left = ctx.createOscillator();
  const right = ctx.createOscillator();
  left.type = "sine";
  right.type = "sine";
  left.frequency.value = layer.tone.carrierHz;
  right.frequency.value = layer.tone.carrierHz + layer.tone.beatHz;

  left.connect(merger, 0, 0);
  right.connect(merger, 0, 1);
  merger.connect(gain);
  gain.connect(ctx.destination);
  left.start();
  right.start();

  return { ctx, left, right, gain, merger };
}

function stopTone(graph: ToneGraph | null) {
  if (!graph) return;
  try {
    graph.left.stop();
    graph.right.stop();
    void graph.ctx.close();
  } catch {
    /* already closed */
  }
}

export interface MusicLayerControlProps {
  accent: string;
  ink: string;
  /** When the main video is playing — tones follow so the bed does not orphan. */
  playing: boolean;
}

/**
 * Control button + menu + optional generated audio / file element.
 * Mount next to commentary on the player bar.
 */
export function MusicLayerControl({ accent, ink, playing }: MusicLayerControlProps) {
  const t = useT();
  const [layerId, setLayerId] = React.useState("off");
  const [volume, setVolume] = React.useState(0.2);
  const [menuEl, setMenuEl] = React.useState<HTMLElement | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const toneRef = React.useRef<ToneGraph | null>(null);

  const layer = getMusicLayer(layerId);
  const active = layer.id !== "off";

  const tearDown = React.useCallback(() => {
    stopTone(toneRef.current);
    toneRef.current = null;
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
  }, []);

  const applyLayer = React.useCallback(
    async (next: MusicLayer, vol: number, shouldPlay: boolean) => {
      tearDown();
      if (next.id === "off" || !shouldPlay) return;

      if (next.src) {
        const el = audioRef.current;
        if (!el) return;
        el.src = next.src;
        el.loop = true;
        el.volume = vol;
        try {
          await el.play();
        } catch {
          /* autoplay policy — user already clicked the control */
        }
        return;
      }

      if (next.tone) {
        const graph = startTone(next, vol);
        toneRef.current = graph;
        if (graph?.ctx.state === "suspended") {
          try {
            await graph.ctx.resume();
          } catch {
            /* ignore */
          }
        }
      }
    },
    [tearDown],
  );

  React.useEffect(() => {
    void applyLayer(layer, volume, active);
    return () => tearDown();
  }, [layer, volume, active, applyLayer, tearDown]);

  /* Follow the talk track: pause the bed when the recording pauses. */
  React.useEffect(() => {
    if (!active) return;
    const el = audioRef.current;
    const graph = toneRef.current;
    if (playing) {
      if (el && el.src) void el.play().catch(() => {});
      if (graph?.ctx.state === "suspended") void graph.ctx.resume().catch(() => {});
    } else {
      el?.pause();
      if (graph && graph.ctx.state === "running") void graph.ctx.suspend().catch(() => {});
    }
  }, [playing, active]);

  React.useEffect(() => {
    if (toneRef.current) toneRef.current.gain.gain.value = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const pick = (id: string) => {
    const next = getMusicLayer(id);
    setLayerId(id);
    setVolume(next.defaultVolume || volume);
    setMenuEl(null);
  };

  return (
    <>
      <audio ref={audioRef} preload="none" aria-hidden style={{ display: "none" }} />

      <Box
        component="button"
        type="button"
        aria-label={t("player.music")}
        aria-pressed={active || undefined}
        aria-haspopup="menu"
        onClick={(e: React.MouseEvent<HTMLElement>) => setMenuEl(e.currentTarget)}
        title={active ? t("player.musicOn", { layer: layer.label }) : t("player.musicHint")}
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
          cursor: "pointer",
          transition: "background-color 140ms ease, color 140ms ease, border-color 140ms ease",
          "&:hover": { bgcolor: alpha(accent, 0.14), color: accent },
          "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
        }}
      >
        <MusicLayerGlyph size={18} />
      </Box>

      <Menu
        open={Boolean(menuEl)}
        anchorEl={menuEl}
        onClose={() => setMenuEl(null)}
        slotProps={{ paper: { sx: { width: 300, maxWidth: "92vw" } } }}
      >
        <Box sx={{ px: 1.5, pt: 1.25, pb: 0.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 750, letterSpacing: 0.9, textTransform: "uppercase", color: "text.secondary" }}>
            {t("player.musicTitle")}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.45, mt: 0.35 }}>
            {t("player.musicBlurb")}
          </Typography>
        </Box>

        {MUSIC_LAYERS.map((l) => (
          <MenuItem
            key={l.id}
            selected={l.id === layerId}
            onClick={() => pick(l.id)}
            sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0.2, py: 1, whiteSpace: "normal" }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>{l.label}</Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.4 }}>{l.blurb}</Typography>
            {!l.src && l.tone && (
              <Typography sx={{ fontSize: 10.5, color: "text.disabled", mt: 0.2, fontFamily: "monospace" }}>
                generated · {l.tone.carrierHz}Hz ± {l.tone.beatHz}
              </Typography>
            )}
            {!l.src && !l.tone && l.id !== "off" && (
              <Typography sx={{ fontSize: 10.5, color: "warning.main", mt: 0.2 }}>file pending</Typography>
            )}
          </MenuItem>
        ))}

        {active && (
          <Box sx={{ px: 2, py: 1.25, borderTop: "1px solid", borderColor: "divider" }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.25 }}>
              <Typography sx={{ fontSize: 11.5, color: "text.secondary", flexShrink: 0 }}>
                {t("player.musicVolume")}
              </Typography>
              <Slider
                size="small"
                value={Math.round(volume * 100)}
                onChange={(_, v) => setVolume((Array.isArray(v) ? v[0] : v) / 100)}
                onClick={(e) => e.stopPropagation()}
                sx={{ color: accent }}
              />
            </Stack>
          </Box>
        )}
      </Menu>
    </>
  );
}
