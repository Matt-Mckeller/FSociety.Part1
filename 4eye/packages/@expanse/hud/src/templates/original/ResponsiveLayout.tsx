/**
 * Responsive Layout Wrapper
 * 
 * Automatically adapts any layout based on viewport size
 */

"use client"

import React from "react"
import type { ReactElement } from "react"
import { useResponsiveLayout } from "@expanse/shell"
import type { MinimalLayoutProps } from "./MinimalLayout"
import type { DocumentationLayoutProps } from "./DocumentationLayout"
import type { DashboardLayoutProps } from "./DashboardLayout"
import type { FullScreenLayoutProps } from "../spatial/FullScreenLayout"

// =============================================================================
// Types
// =============================================================================

export interface ResponsiveConfig<T = any> {
  mobile?: Partial<T>
  tablet?: Partial<T>
  desktop?: Partial<T>
}

export interface ResponsiveLayoutWrapperProps<T extends {} = any> {
  /** Base layout component */
  layout: React.ComponentType<T>
  /** Base props for the layout */
  baseProps: T
  /** Responsive overrides */
  responsive?: ResponsiveConfig<T>
  /** Custom breakpoints */
  breakpoints?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

// =============================================================================
// ResponsiveLayoutWrapper Component
// =============================================================================

/**
 * Wraps any layout component with responsive behavior.
 * 
 * Automatically merges viewport-specific props based on screen size,
 * allowing layouts to adapt seamlessly across devices.
 * 
 * @example
 * ```tsx
 * <ResponsiveLayoutWrapper
 *   layout={DashboardLayout}
 *   baseProps={{
 *     preset: "default",
 *     autoPages: { home: HomePage }
 *   }}
 *   responsive={{
 *     mobile: {
 *       preset: "compact",
 *       minimapSize: "small"
 *     },
 *     tablet: {
 *       preset: "focus-mode",
 *       minimapSize: "medium"
 *     }
 *   }}
 * />
 * ```
 */
export function ResponsiveLayoutWrapper<T extends {}>({
  layout: Layout,
  baseProps,
  responsive = {},
  breakpoints,
}: ResponsiveLayoutWrapperProps<T>): ReactElement {
  const { deviceType } = useResponsiveLayout(breakpoints)

  // Merge props based on device type
  const deviceConfig = deviceType === "mobile" 
    ? responsive.mobile 
    : deviceType === "tablet"
    ? responsive.tablet
    : responsive.desktop
  
  const responsiveProps = deviceConfig || {}
  const mergedProps = {
    ...baseProps,
    ...responsiveProps,
  }

  return <Layout {...(mergedProps as T)} />
}

// =============================================================================
// Preset Responsive Configs
// =============================================================================

/**
 * Responsive configuration for MinimalLayout
 */
export const minimalResponsiveConfig: ResponsiveConfig<MinimalLayoutProps> = {
  mobile: {
    preset: "clean",
    minimapSize: "small",
    navPadSize: "small",
  },
  tablet: {
    preset: "floating-controls",
    minimapSize: "medium",
    navPadSize: "medium",
  },
  desktop: {
    preset: "floating-controls",
    minimapSize: "large",
    navPadSize: "large",
  },
}

/**
 * Responsive configuration for DocumentationLayout
 */
export const documentationResponsiveConfig: ResponsiveConfig<DocumentationLayoutProps> = {
  mobile: {
    preset: "clean",
    minimapSize: "small",
  },
  tablet: {
    preset: "minimal",
    minimapSize: "medium",
  },
  desktop: {
    preset: "default",
    minimapSize: "large",
  },
}

/**
 * Responsive configuration for DashboardLayout
 */
export const dashboardResponsiveConfig: ResponsiveConfig<DashboardLayoutProps> = {
  mobile: {
    // Mobile-specific overrides (bars, etc.)
  },
  tablet: {
    // Tablet-specific overrides
  },
  desktop: {
    // Desktop-specific overrides
  },
}

// =============================================================================
// Convenience Wrappers
// =============================================================================

/**
 * Minimal layout with responsive defaults
 */
export function ResponsiveMinimalLayout(
  props: MinimalLayoutProps & {
    responsive?: ResponsiveConfig<MinimalLayoutProps>
  }
) {
  const { responsive, ...baseProps } = props
  const MinimalLayout = require("./MinimalLayout").MinimalLayout
  
  return (
    <ResponsiveLayoutWrapper
      layout={MinimalLayout}
      baseProps={baseProps}
      responsive={responsive || minimalResponsiveConfig}
    />
  )
}

/**
 * Documentation layout with responsive defaults
 */
export function ResponsiveDocumentationLayout(
  props: DocumentationLayoutProps & {
    responsive?: ResponsiveConfig<DocumentationLayoutProps>
  }
) {
  const { responsive, ...baseProps } = props
  const DocumentationLayout = require("./DocumentationLayout").DocumentationLayout
  
  return (
    <ResponsiveLayoutWrapper
      layout={DocumentationLayout}
      baseProps={baseProps}
      responsive={responsive || documentationResponsiveConfig}
    />
  )
}

/**
 * Dashboard layout with responsive defaults
 */
export function ResponsiveDashboardLayout(
  props: DashboardLayoutProps & {
    responsive?: ResponsiveConfig<DashboardLayoutProps>
  }
) {
  const { responsive, ...baseProps } = props
  const DashboardLayout = require("./DashboardLayout").DashboardLayout
  
  return (
    <ResponsiveLayoutWrapper
      layout={DashboardLayout}
      baseProps={baseProps}
      responsive={responsive || dashboardResponsiveConfig}
    />
  )
}

