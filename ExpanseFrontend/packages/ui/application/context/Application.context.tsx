"use client"
import React, { useMemo, useContext, useState, useEffect } from "react"
import { LayoutContext, LayoutProvider } from "./Layout.context"
import { UserProvider } from "../../user"
import { AuthProvider } from "../../auth"
import { ApiContextType, ApiProvider, ApiProviderProps } from "./Api.context"
import { UserProviderProps } from "../../user/types"
import { LayoutContextType } from "../types"
import { ThemeProviderProps } from "../../theme/types"
import { ThemeProvider } from "../../theme"
import { AnalyticsProvider } from "./Analytics.context"
import { ApplicationErrorBoundaryLogger } from "../components/ApplicationErrorBoundaryLogger"
import { RouterEventLogger } from "../components/RouterEventLogger"

// Todo, Separate context for api? Probably when adding more

export type ApplicationContextProps = ApiContextType & LayoutContextType
export type ApplicationProviderProps = {
  children: React.ReactNode
  accountNavRoute: string
  // todo: function to navigate to support mobile?
} & UserProviderProps &
  ThemeProviderProps &
  ApiProviderProps
export type ApplicationCoreProps = {
  children: React.ReactNode
  baseGraphQLApiUrl: string
}

export const ApplicationContext =
  React.createContext<ApplicationContextProps>(null)

function ApplicationCoreProvider({
  children,
  baseGraphQLApiUrl,
}: ApplicationCoreProps) {
  const {
    loading,
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,

    // Drawer
    drawerOpen,
    setDrawerOpen,

    // Snackbar
    snackbarMessage,
    showSnackbarSuccess,
    showSnackbarError,
    snackbarOpen,
    closeSnackbar,
    closeAlert,
    alertType,
  } = useContext(LayoutContext)

  const value: ApplicationContextProps = useMemo(
    () => ({
      // Api
      baseGraphQLApiUrl,

      // Loading
      loading,
      currentLoadingProcessIDs,
      addLoadingProcessID,
      removeLoadingProcessID,

      // Drawer
      drawerOpen,
      setDrawerOpen,

      // Snackbar
      snackbarMessage,
      showSnackbarSuccess,
      showSnackbarError,
      snackbarOpen,
      closeSnackbar,
      closeAlert,
      alertType,
    }),
    [
      baseGraphQLApiUrl,
      loading,
      currentLoadingProcessIDs,
      addLoadingProcessID,
      removeLoadingProcessID,
      drawerOpen,
      setDrawerOpen,
      snackbarMessage,
      showSnackbarSuccess,
      showSnackbarError,
      snackbarOpen,
      closeSnackbar,
      closeAlert,
      alertType,
    ],
  )

  return (
    // Theme provider depends on api provider
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function ApplicationProvider({
  children,
  baseGraphQLApiUrl,
  accountNavRoute,
  initialThemeMode,
  initialTheme,
  enableGoogleAnalytics,
}: ApplicationProviderProps & { enableGoogleAnalytics: boolean }) {
  // The application using this will need to define their own RoutesProvider and provide it
  return (
    <ApiProvider
      baseGraphQLApiUrl={baseGraphQLApiUrl}
      enableGoogleAnalytics={enableGoogleAnalytics}
    >
      <LayoutProvider>
        <AnalyticsProvider>
          <ThemeProvider
            initialTheme={initialTheme}
            initialThemeMode={initialThemeMode}
          >
            <UserProvider accountNavRoute={accountNavRoute}>
              <AuthProvider>
                <ApplicationCoreProvider baseGraphQLApiUrl={baseGraphQLApiUrl}>
                  <ApplicationErrorBoundaryLogger>
                    <RouterEventLogger>{children}</RouterEventLogger>
                  </ApplicationErrorBoundaryLogger>
                </ApplicationCoreProvider>
              </AuthProvider>
            </UserProvider>
          </ThemeProvider>
        </AnalyticsProvider>
      </LayoutProvider>
    </ApiProvider>
  )
}

export default ApplicationProvider
