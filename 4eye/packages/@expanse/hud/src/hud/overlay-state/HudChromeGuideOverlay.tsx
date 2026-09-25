"use client";

import { Box, Typography, alpha } from "@mui/material";
import { Z_INDEX } from "@expanse/theme";
import { useRailPreferences } from "./RailPreferencesProvider";

type GuidePlacement =
  | "top-center"
  | "left-center"
  | "right-center"
  | "bottom-orbs"
  | "bottom-input";

interface GuideCallout {
  id: string;
  name: string;
  detail: string;
  placement: GuidePlacement;
}

const CALLOUTS: readonly GuideCallout[] = [
  {
    id: "header",
    name: "Header · Location Bar",
    detail: "Realm + page nav (or AI Chat context tabs)",
    placement: "top-center",
  },
  {
    id: "game-bar",
    name: "Game Bar",
    detail: "Spellbook · Achievements · Inventory · Quests",
    placement: "left-center",
  },
  {
    id: "right-rail",
    name: "Profile · Settings",
    detail: "Right action bar — Settings menu lives here",
    placement: "right-center",
  },
  {
    id: "orb-bar",
    name: "Orb Bar · Actions",
    detail: "Explore · Chat · Edit · Help · Sign In",
    placement: "bottom-orbs",
  },
  {
    id: "ai-input",
    name: "AI Input Bar",
    detail: "Bottom prompt / composer chrome",
    placement: "bottom-input",
  },
];

const PLACEMENT_SX: Record<GuidePlacement, object> = {
  "top-center": {
    top: 56,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "left-center": {
    top: "50%",
    left: 72,
    transform: "translateY(-50%)",
  },
  "right-center": {
    top: "50%",
    right: 72,
    transform: "translateY(-50%)",
    textAlign: "right",
  },
  "bottom-orbs": {
    bottom: 108,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-input": {
    bottom: 52,
    left: "50%",
    transform: "translateX(-50%)",
  },
};

/**
 * Temporary overlay that names the major HUD action bars.
 * Enabled from the right-rail Settings menu; not persisted.
 */
export function HudChromeGuideOverlay() {
  const { chromeGuideVisible } = useRailPreferences();
  if (!chromeGuideVisible) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: Z_INDEX.CHROME + 20,
      }}
    >
      {CALLOUTS.map((c) => (
        <Box
          key={c.id}
          sx={{
            position: "absolute",
            ...PLACEMENT_SX[c.placement],
            maxWidth: 220,
            px: 1.25,
            py: 0.75,
            borderRadius: 1.25,
            border: "1px solid",
            borderColor: alpha("#38bdf8", 0.55),
            bgcolor: alpha("#0c1524", 0.88),
            boxShadow: `0 0 0 1px ${alpha("#38bdf8", 0.18)}, 0 8px 24px ${alpha("#000", 0.35)}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#e0f2fe",
              lineHeight: 1.25,
            }}
          >
            {c.name}
          </Typography>
          <Typography
            sx={{
              mt: 0.35,
              fontSize: 11,
              fontWeight: 500,
              color: alpha("#fff", 0.72),
              lineHeight: 1.35,
            }}
          >
            {c.detail}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
