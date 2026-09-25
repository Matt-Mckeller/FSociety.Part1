/**
 * Mock for packages/ui/application module
 * Re-exports everything from the real module but overrides AnalyticsContext
 * to have a default value instead of null (for Storybook isolation)
 */
import React from "react"

// Re-export everything from the real application module
export * from "../../../../packages/ui/application/utility/index"
export * from "../../../../packages/ui/application/types"
export * from "../../../../packages/ui/application/gql"
export * from "../../../../packages/ui/application/components"

// Override AnalyticsContext with a mock that has default values
export const AnalyticsContext = React.createContext<{
  analyticsSessionId: string
  analyticsEventContext: {
    sessionId: string
    metrics: any
    deviceContext: any
  }
}>({
  analyticsSessionId: "storybook-session",
  analyticsEventContext: {
    sessionId: "storybook-session",
    metrics: {},
    deviceContext: {},
  },
})

// Mock AnalyticsProvider
export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => <>{children}</>

// Re-export other context exports
export { LayoutContext } from "../../../../packages/ui/application/context/Layout.context"
export {
  ApiContext,
  ApiProvider,
} from "../../../../packages/ui/application/context/Api.context"
