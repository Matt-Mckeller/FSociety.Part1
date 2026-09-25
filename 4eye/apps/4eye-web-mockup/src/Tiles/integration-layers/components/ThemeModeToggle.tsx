"use client";

/**
 * ThemeModeToggle — flips this screen's own light/dark mode (PanelThemeScope's
 * nested ThemeProvider), independent of the app's ambient theme.
 */

import { IconButton, alpha } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { useThemeMode } from "@expanse/theme";
import { useLayerSurface } from "./surfaceTokens";

export function ThemeModeToggle() {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const { text } = useLayerSurface();
  const dark = themeMode === "dark";

  return (
    <IconButton
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      onClick={toggleThemeMode}
      size="small"
      sx={{
        width: 34,
        height: 34,
        color: text.hi,
        border: `1px solid ${alpha(text.hi, 0.18)}`,
        bgcolor: alpha(text.hi, 0.06),
        "&:hover": { bgcolor: alpha(text.hi, 0.12) },
      }}
    >
      {dark ? <DarkModeRoundedIcon sx={{ fontSize: 18 }} /> : <LightModeRoundedIcon sx={{ fontSize: 18 }} />}
    </IconButton>
  );
}
