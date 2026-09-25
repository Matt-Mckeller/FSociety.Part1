"use client"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material"
import { AnalyticsContext, handleAnalyticsEventError } from "../../application"
import {
  ExpanseThemes,
  ThemeContextProps,
  ThemeMode,
  ThemeProviderProps,
} from "../types"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import {
  breakpoints,
  getComponents,
  mixins,
  spacing,
  typography,
  zIndex,
} from "../configs/common-theme"
import Cookies from "js-cookie"
import {
  darkThemePalette,
  darkThemeEmptyShadowArray,
  expanseDarkComponents,
  lightThemePalette,
  lightThemeShadows,
  expanseLightComponents,
  blueLightThemePalette,
  blueLightComponents,
  blueDarkThemePalette,
  blueDarkComponents,
  redLightThemePalette,
  redLightComponents,
  greenLightThemePalette,
  greenLightComponents,
  greenDarkThemePalette,
  greenDarkComponents,
  orangeLightThemePalette,
  orangeLightComponents,
  orangeDarkThemePalette,
  orangeDarkComponents,
} from "expanse.ui/theme"

export const ThemeContext = React.createContext<ThemeContextProps>(null)
// todo add a specific type to expanse theme, add a parameter to pass a default config theme
export function ThemeProvider({
  children,
  initialTheme,
  initialThemeMode,
}: ThemeProviderProps) {
  const [themeSelection, setThemeSelection] =
    useState<ExpanseThemes>(initialTheme)
  const [themeMode, setThemeMode] = useState(initialThemeMode)

  const selectedDarkThemePalette =
    themeSelection === "primary"
      ? darkThemePalette
      : themeSelection === "blue"
        ? blueDarkThemePalette
        : themeSelection === "red"
          ? darkThemePalette
          : themeSelection === "green"
            ? greenDarkThemePalette
            : themeSelection === "orange"
              ? orangeDarkThemePalette
              : darkThemePalette

  const selectedDarkComponents =
    themeSelection === "blue"
      ? blueDarkComponents
      : themeSelection === "red"
        ? expanseDarkComponents
        : themeSelection === "green"
          ? greenDarkComponents
          : themeSelection === "orange"
            ? orangeDarkComponents
            : expanseDarkComponents
  const selectedLightThemePalette =
    themeSelection === "primary"
      ? lightThemePalette
      : themeSelection === "blue"
        ? blueLightThemePalette
        : themeSelection === "red"
          ? redLightThemePalette
          : themeSelection === "green"
            ? greenLightThemePalette
            : themeSelection === "orange"
              ? orangeLightThemePalette
              : lightThemePalette

  const selectedLightComponents =
    themeSelection === "blue"
      ? blueLightComponents
      : themeSelection === "red"
        ? redLightComponents
        : themeSelection === "green"
          ? greenLightComponents
          : themeSelection === "orange"
            ? orangeLightComponents
            : expanseLightComponents

  const lightTheme = useMemo(
    () =>
      createTheme({
        spacing,
        palette: selectedLightThemePalette,
        mixins,
        typography,
        // transitions,
        components: getComponents(
          selectedLightThemePalette,
          lightThemeShadows,
          selectedLightComponents,
        ),
        shadows: lightThemeShadows,
        zIndex,
        breakpoints,
      }),
    [],
  )
  const darkTheme = useMemo(
    () =>
      createTheme({
        spacing,
        palette: selectedDarkThemePalette,
        mixins,
        typography,
        // transitions,
        components: getComponents(
          selectedDarkThemePalette,
          darkThemeEmptyShadowArray,
          selectedDarkComponents,
        ),
        shadows: darkThemeEmptyShadowArray, // Note: There are no shadows in dark mode
        zIndex,
        breakpoints,
      }),
    [],
  )

  const themeSelectionToUse = themeMode === "light" ? lightTheme : darkTheme

  const [currentTheme, setCurrentTheme] = useState(themeSelectionToUse)
  const [lightOrDarkThemeMode, setLightOrDarkThemeMode] =
    useState<ThemeMode>(themeMode)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const updateThemeMode = (mode: ThemeMode) => {
    if (mode === "light" && lightOrDarkThemeMode !== "light") {
      registerAnalyticsEvent({
        variables: {
          event: "theme-light-mode-toggle",
          ...analyticsEventContext,
        },
      }).catch(handleAnalyticsEventError)
      setLightOrDarkThemeMode(mode)
      setCurrentTheme(lightTheme)
    } else if (mode === "dark" && lightOrDarkThemeMode !== "dark") {
      registerAnalyticsEvent({
        variables: {
          event: "theme-dark-mode-toggle",
          ...analyticsEventContext,
        },
      }).catch(handleAnalyticsEventError)
      setLightOrDarkThemeMode(mode)
      setCurrentTheme(darkTheme)
    }
  }

  const handleSetThemeSelection = useCallback((theme: ExpanseThemes) => {
    setThemeSelection(theme)
    Cookies.set("themeSelection", theme)
  }, [])

  useEffect(() => {
    const savedThemeSelection = Cookies.get("themeSelection") as ExpanseThemes
    if (savedThemeSelection) {
      setThemeSelection(savedThemeSelection)
    }
  }, [])

  useEffect(() => {
    if (themeSelectionToUse === null) {
      throw new Error("Invalid initial configurations for theme.")
    }
  }, [])

  const value = useMemo(
    () => ({
      currentTheme,
      themeName: initialTheme,
      setCurrentTheme,
      lightOrDarkThemeMode,
      setLightOrDarkThemeMode: updateThemeMode,
      setThemeSelection: handleSetThemeSelection,
      themeSelection,
    }),
    [
      initialTheme,
      currentTheme,
      setCurrentTheme,
      lightOrDarkThemeMode,
      updateThemeMode,
      setLightOrDarkThemeMode,
      themeSelection,
      handleSetThemeSelection,
    ],
  )

  return (
    <MuiThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  )
}
