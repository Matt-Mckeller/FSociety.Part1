/**
 * Mock for Analytics.context.tsx
 * Provides AnalyticsContext with default values so components don't crash in Storybook
 */
import React from "react"

export type AnalyticsEventContextType = {
  sessionId: string
  metrics: any
  deviceContext: any
}

export type AnalyticsContextType = {
  analyticsSessionId: string
  analyticsEventContext: AnalyticsEventContextType
}

export type AnalyticsProviderProps = {
  children: React.ReactNode
}

// Create context with default mock values (not null)
export const AnalyticsContext = React.createContext<AnalyticsContextType>({
  analyticsSessionId: "storybook-session",
  analyticsEventContext: {
    sessionId: "storybook-session",
    metrics: {},
    deviceContext: {},
  },
})

// Mock provider that just passes through children
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  return <>{children}</>
}
