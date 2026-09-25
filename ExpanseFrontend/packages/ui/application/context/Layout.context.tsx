"use client"
import React, { useMemo, useState } from "react"
import { AlertColor } from "@mui/material"
import { LayoutContextType, LoadingSpinnerProps, SnackbarProps } from "../types"

export function useSnackbar(): SnackbarProps {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [alertType, setAlertType]: [AlertColor, any] = useState("success")
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message! Test message!",
  )
  const showError = (errorMessage: string) => {
    setAlertType("error")
    setSnackbarMessage(errorMessage || "An error has occurred")
    setSnackbarOpen(true)
  }
  const showSuccess = (successMessage: string) => {
    setAlertType("success")
    setSnackbarMessage(successMessage || "Success!")
    setSnackbarOpen(true)
  }

  const closeSnackbar = () => {
    setSnackbarOpen(false)
  }
  const closeAlert = () => {
    setSnackbarOpen(false)
  }

  return {
    snackbarMessage,
    showSnackbarError: showError,
    showSnackbarSuccess: showSuccess,
    snackbarOpen,
    closeSnackbar,
    closeAlert,
    alertType,
  }
}

function useLoadingSpinner(): LoadingSpinnerProps {
  const [currentLoadingProcessIDs, setCurrentLoadingProcessIDs] = useState<
    string[]
  >([])
  const addLoadingProcessID = (processName: string) => {
    // console.log('Add loading process id: ', processName)
    setCurrentLoadingProcessIDs([...currentLoadingProcessIDs, processName])
  }

  const removeLoadingProcessID = (processName: string) => {
    // console.log('Remove loading process id: ', processName)
    const foundIndex = currentLoadingProcessIDs.findIndex(
      (p) => p === processName,
    )
    if (foundIndex > -1) {
      setCurrentLoadingProcessIDs([
        ...currentLoadingProcessIDs.slice(0, foundIndex),
        ...currentLoadingProcessIDs.slice(foundIndex + 1),
      ])
    }
  }

  return {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
    // loading: currentLoadingProcessIDs.length > 0,
    loading: false,
  }
}

function useDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const setDrawerOpenHandler = (value: boolean) => {
    setDrawerOpen(value)
  }

  return {
    drawerOpen,
    setDrawerOpen: setDrawerOpenHandler,
  }
}

export const LayoutContext = React.createContext<LayoutContextType>(null)
export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { drawerOpen, setDrawerOpen } = useDrawer()
  const {
    snackbarMessage,
    showSnackbarSuccess,
    showSnackbarError,
    snackbarOpen,
    closeSnackbar,
    alertType,
    closeAlert,
  } = useSnackbar()
  const {
    addLoadingProcessID,
    removeLoadingProcessID,
    loading,
    currentLoadingProcessIDs,
  } = useLoadingSpinner()

  const value = useMemo(
    () => ({
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
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}
