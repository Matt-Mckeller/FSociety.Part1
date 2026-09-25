"use client";

import { useMemo } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import type { Palette } from "@mui/material/styles";
import {
  ThemeProvider,
  blueLightThemePalette,
  createLayoutExtensions,
} from "@expanse/theme";
import { createBrandCoreExtensions } from "@expanse/brand-core";
import { LocaleProvider } from "@/i18n/LocaleProvider";

/*
  The MUI theme asks for `Xpens` by name, so the @font-face family must match
  exactly or the browser silently falls back. Files are served from
  public/fonts, which came across with the 4eye app.
*/
const XPENS_FONT_FACES = `
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Light.ttf") format("truetype"); font-weight: 300; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-LightItalic.ttf") format("truetype"); font-weight: 300; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Regular.ttf") format("truetype"); font-weight: 400; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Italic.ttf") format("truetype"); font-weight: 400; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Medium.ttf") format("truetype"); font-weight: 500; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-MediumItalic.ttf") format("truetype"); font-weight: 500; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-SemiBold.ttf") format("truetype"); font-weight: 600; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-SemiBoldItalic.ttf") format("truetype"); font-weight: 600; font-style: italic; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-Bold.ttf") format("truetype"); font-weight: 700; font-style: normal; font-display: swap; }
  @font-face { font-family: "Xpens"; src: url("/fonts/Xpens-BoldItalic.ttf") format("truetype"); font-weight: 700; font-style: italic; font-display: swap; }
`;

export function Providers({ children }: { children: React.ReactNode }) {
  const componentExtensions = useMemo(
    () => ({
      light: {
        ...createBrandCoreExtensions(blueLightThemePalette as unknown as Palette),
        ...createLayoutExtensions(blueLightThemePalette as unknown as Palette),
      },
    }),
    [],
  );

  return (
    <ThemeProvider
      initialTheme="blue"
      initialThemeMode="light"
      componentExtensions={componentExtensions}
    >
      <GlobalStyles styles={XPENS_FONT_FACES} />
      {/*
        One variable rather than a `[dir="rtl"]` rule per directional glyph:
        components multiply their transform by `--dir-flip`, so an arrow that
        means "back" points the correct way in both directions without every
        one of them needing its own override.
      */}
      <GlobalStyles styles={{ ":root": { "--dir-flip": 1 }, '[dir="rtl"]': { "--dir-flip": -1 } }} />
      <CssBaseline />
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
