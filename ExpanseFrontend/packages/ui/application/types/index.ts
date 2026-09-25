import { AlertColor } from "@mui/material"
export * from "./analytics.type"
export * from "./routes.type"

export type DEVICE_TYPE = "Mobile" | "Tablet" | "Desktop" | "Server"

export interface DrawerProps {
  drawerOpen: boolean
  setDrawerOpen: (v: boolean) => void
}
export interface LoadingSpinnerProps {
  loading: boolean
  currentLoadingProcessIDs: string[]
  addLoadingProcessID: (processName: string) => void
  removeLoadingProcessID: (processName: string) => void
}

export interface SnackbarProps {
  snackbarMessage: string
  showSnackbarError: (errorMessage: string) => void
  showSnackbarSuccess: (successMessage: string) => void
  closeSnackbar: () => void
  closeAlert: () => void
  snackbarOpen: boolean
  alertType: AlertColor
}

export type LayoutContextType = SnackbarProps &
  DrawerProps &
  LoadingSpinnerProps
