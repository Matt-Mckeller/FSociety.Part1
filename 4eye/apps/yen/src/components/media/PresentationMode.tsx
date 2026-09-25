"use client";

/**
 * Site ↔ App presentation.
 *
 * The same library, drawn two ways: as the published page, and as it would look
 * mounted inside the product's HUD chrome. It is one control at page level
 * rather than one per card, and that was a real choice — per-card toggles let
 * you produce a grid that is half light and half dark, which answers no
 * question anyone has and makes both treatments look worse than they are. The
 * comparison you actually want is *the whole surface, either way*.
 *
 * The mode is a token bundle rather than a boolean sprinkled through the
 * components: anything that needs to differ asks `usePresentation()` for the
 * value, so adding a third treatment later is a third entry here instead of a
 * hunt for `mode === "app"`.
 */

import * as React from "react";
import { Stack, Tooltip, Typography, alpha } from "@mui/material";

import { useT } from "@/i18n/LocaleProvider";

export const PRESENTATION_MODES = ["site", "app"] as const;
export type PresentationMode = (typeof PRESENTATION_MODES)[number];

export interface PresentationTokens {
  mode: PresentationMode;
  /** True in the in-app treatment. Read it for the handful of real forks. */
  app: boolean;
  /** Card surface. */
  surface: string;
  /** Card edge. */
  edge: string;
  /** Primary and secondary text on `surface`. */
  ink: string;
  inkMuted: string;
  /** Accent used by the player chrome and active controls. */
  accent: string;
  /** Grid gap and card padding, in MUI spacing units. */
  gap: number;
  pad: number;
  /** Card corner radius. */
  radius: number;
}

/** The 4eye HUD's cyan. Only used in app mode, where it sits on near-black. */
const HUD_ACCENT = "#22d3ee";
const HUD_SURFACE = "#0b1220";
const HUD_EDGE = "#1e293b";

const TOKENS: Record<PresentationMode, Omit<PresentationTokens, "mode" | "app">> = {
  site: {
    surface: "#ffffff",
    edge: "#e2e8f0",
    ink: "#0f172a",
    inkMuted: "#64748b",
    accent: "#2563eb",
    gap: 3.5,
    pad: 0,
    radius: 1.5,
  },
  app: {
    surface: HUD_SURFACE,
    edge: HUD_EDGE,
    ink: "#e2e8f0",
    inkMuted: "#94a3b8",
    accent: HUD_ACCENT,
    // Denser: the app treatment is meant to look like it is competing for room
    // with a HUD, because in the product it is.
    gap: 2,
    pad: 1.5,
    radius: 2,
  },
};

const PresentationContext = React.createContext<PresentationTokens>({
  mode: "site",
  app: false,
  ...TOKENS.site,
});

const STORAGE_KEY = "yen.media.presentation";

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PresentationMode>("site");

  React.useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v === "site" || v === "app") setMode(v);
    } catch {
      /* storage unavailable — the mode just won't persist */
    }
  }, []);

  const change = React.useCallback((next: PresentationMode) => {
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignored */
    }
  }, []);

  const value = React.useMemo<PresentationTokens>(
    () => ({ mode, app: mode === "app", ...TOKENS[mode] }),
    [mode],
  );

  return (
    <PresentationContext.Provider value={value}>
      <SetModeContext.Provider value={change}>{children}</SetModeContext.Provider>
    </PresentationContext.Provider>
  );
}

const SetModeContext = React.createContext<(m: PresentationMode) => void>(() => {});

export function usePresentation(): PresentationTokens {
  return React.useContext(PresentationContext);
}

/**
 * The toggle itself — a two-position segmented control rather than a switch.
 *
 * A switch would need a label saying which way is on, and "App: off" is a
 * worse way to say "Site" than the word Site is.
 */
export function PresentationToggle() {
  const { mode, accent } = usePresentation();
  const setMode = React.useContext(SetModeContext);
  const t = useT();

  return (
    <Tooltip title={t("mode.hint")} arrow>
      <Stack
        role="radiogroup"
        aria-label={t("mode.label")}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          p: 0.3,
          gap: 0.3,
          borderRadius: 999,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          flexShrink: 0,
        }}
      >
        {PRESENTATION_MODES.map((m) => {
          const active = m === mode;
          return (
            <Typography
              key={m}
              component="button"
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMode(m)}
              sx={{
                font: "inherit",
                border: 0,
                cursor: "pointer",
                px: 1.4,
                py: 0.45,
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: active ? "#fff" : "text.secondary",
                bgcolor: active ? accent : "transparent",
                transition: "background-color 150ms ease, color 150ms ease",
                "&:hover": { bgcolor: active ? accent : alpha(accent, 0.1) },
                "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 2 },
              }}
            >
              {t(m === "site" ? "mode.site" : "mode.app")}
            </Typography>
          );
        })}
      </Stack>
    </Tooltip>
  );
}
