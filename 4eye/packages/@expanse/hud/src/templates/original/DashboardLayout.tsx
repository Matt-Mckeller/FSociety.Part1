"use client"

import type { ReactNode } from "react"
import {
  FullScreenLayout,
  type FullScreenLayoutProps,
} from "../spatial/FullScreenLayout"

export interface DashboardLayoutProps
  extends Omit<FullScreenLayoutProps, "showMinimap" | "showNavigationControls" | "bars"> {
  topBar?: ReactNode
  leftBar?: ReactNode
  rightBar?: ReactNode
  bottomBar?: ReactNode
}

/**
 * Dashboard-focused layout preset for grid navigation.
 *
 * This wraps FullScreenLayout with richer defaults:
 * - minimap enabled
 * - navigation controls enabled
 * - top/left/right bars enabled by default via provided slots
 */
export function DashboardLayout({
  topBar,
  leftBar,
  rightBar,
  bottomBar,
  children,
  ...rest
}: DashboardLayoutProps) {
  return (
    <FullScreenLayout
      showMinimap
      showNavigationControls
      minimapPosition="top-right"
      navControlsPosition="bottom-center"
      bars={{
        top: topBar,
        left: leftBar,
        right: rightBar,
        bottom: bottomBar,
      }}
      {...rest}
    >
      {children}
    </FullScreenLayout>
  )
}

export default DashboardLayout
