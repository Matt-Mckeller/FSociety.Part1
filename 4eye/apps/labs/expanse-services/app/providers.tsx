"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { JSX, ReactNode } from "react";

const appTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
