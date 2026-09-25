import type { AlertColor } from "@mui/material"

/**
 * Drawer state and actions
 */
export interface DrawerProps {
  drawerOpen: boolean
  setDrawerOpen: (v: boolean) => void
}

/**
 * Loading spinner state with process ID queue for stacked loading states
 */
export interface LoadingSpinnerProps {
  loading: boolean
  currentLoadingProcessIDs: string[]
  addLoadingProcessID: (processName: string) => void
  removeLoadingProcessID: (processName: string) => void
}

/**
 * Combined layout context type
 */
export type LayoutContextType = DrawerProps & LoadingSpinnerProps

// Grid navigation types (position, tile, animation, input, routing, config, hook)
export * from "@expanse/map"
