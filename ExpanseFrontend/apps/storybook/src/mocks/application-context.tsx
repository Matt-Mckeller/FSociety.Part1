/**
 * Mock for expanse.ui/application context providers
 * These are needed because components use useContext(AnalyticsContext) etc.
 */
import React from "react"

// Mock AnalyticsContext
export const AnalyticsContext = React.createContext<{
  analyticsSessionId: string
  analyticsEventContext: any
}>({
  analyticsSessionId: "storybook-session",
  analyticsEventContext: {
    sessionId: "storybook-session",
    metrics: {},
    deviceContext: {},
  },
})

// Mock AnalyticsProvider - just passes children through since context has default value
export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

// Mock LayoutContext
export const LayoutContext = React.createContext<any>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  screenWidth: 1920,
  screenHeight: 1080,
})

// Mock ApiContext
export const ApiContext = React.createContext<any>({
  apiUrl: "https://mock-api.storybook.local",
})

// Re-export everything the real module exports
export const useAnalyticsEventContext = () => ({
  sessionId: "storybook-session",
  metrics: {},
  deviceContext: {},
})
