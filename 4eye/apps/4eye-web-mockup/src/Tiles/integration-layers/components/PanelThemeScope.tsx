"use client";

/**
 * PanelThemeScope — nests a dedicated Expanse theme for this screen, so its
 * light/dark mode can be toggled independently of the rest of the app (see
 * `ThemeModeToggle`). Defaults to light.
 *
 * Reused components (CharacterHeader, CharacterSummaryCard, CharacterTimeline,
 * the action bars, …) resolve `text.primary`/`text.disabled` from whichever
 * mode this nested provider is in, so they always render correctly against
 * this screen's own background regardless of the app's ambient theme.
 *
 * (The app clears the theme cookies on load, so this nested provider resolves
 *  from `initialThemeMode` rather than a stale saved mode.)
 */

import { ThemeProvider } from "@expanse/theme";

export function PanelThemeScope({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider initialTheme="blue" initialThemeMode="light">
      {children}
    </ThemeProvider>
  );
}
