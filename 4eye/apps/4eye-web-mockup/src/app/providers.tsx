"use client";

import { useMemo } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import type { Palette } from "@mui/material/styles";
import { ThemeProvider, blueLightThemePalette } from "@expanse/theme";
import { createBrandCoreExtensions } from "@expanse/brand-core";
import { createLayoutExtensions } from "@expanse/theme";
import Cookies from "js-cookie";

// Clear cookies before Providers component
if (typeof document !== "undefined") {
  Cookies.remove("expanse-theme");
  Cookies.remove("expanse-mode");
}

// @font-face declarations that register "Xpens" as a real browser font family.
// The MUI theme references fontFamily: 'Xpens,Roboto,sans-serif' by name, so
// the @font-face font-family must match exactly. Files are served from public/fonts/.
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
        ...createBrandCoreExtensions(
          blueLightThemePalette as unknown as Palette,
        ),
        ...createLayoutExtensions(
          blueLightThemePalette as unknown as Palette,
        ),
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
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
