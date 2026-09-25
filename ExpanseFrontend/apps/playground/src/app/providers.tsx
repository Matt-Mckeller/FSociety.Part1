"use client"

import { useMemo } from "react"
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { DemoThemeProvider, useDemoTheme } from "../contexts/DemoThemeContext"

/**
 * Inner provider that uses the demo theme context to create MUI theme
 */
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode, currentColors } = useDemoTheme()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: currentColors.main,
            light: currentColors.light,
            dark: currentColors.dark,
          },
        },
      }),
    [mode, currentColors],
  )

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

/**
 * Main providers wrapper for the playground app
 * Provides demo theme context and MUI theme
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <DemoThemeProvider>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </DemoThemeProvider>
  )
}
