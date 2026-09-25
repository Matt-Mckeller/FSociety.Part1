"use client"
import { useState } from "react"
import type { DrawerProps } from "../../../types"

/**
 * Creates drawer state for LayoutProvider
 * Controls side navigation drawer open/close state
 */
export function useDrawerState(): DrawerProps {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const setDrawerOpenHandler = (value: boolean) => {
    setDrawerOpen(value)
  }

  return {
    drawerOpen,
    setDrawerOpen: setDrawerOpenHandler,
  }
}
