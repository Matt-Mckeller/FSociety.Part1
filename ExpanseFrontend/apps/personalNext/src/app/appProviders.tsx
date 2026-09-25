"use client"
import {
  ApplicationProvider,
  ExampleRoutesProvider,
} from "expanse.ui/application"

const authRoutes = {
  accountNav: "/account",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
}

export const ProjectApplicationProviders = ({
  children,
  enableGoogleAnalytics = false,
}: {
  children: React.ReactNode
  enableGoogleAnalytics?: boolean
}) => {
  if (!process.env.NEXT_PUBLIC_SERVICES_GRAPHQL_BASE_URL) {
    throw new Error("Missing API URL environment variable.")
  }
  return (
    // Routes likely to be updated
    <ExampleRoutesProvider routes={authRoutes}>
      <ApplicationProvider
        baseGraphQLApiUrl={process.env.NEXT_PUBLIC_SERVICES_GRAPHQL_BASE_URL}
        accountNavRoute={"/account"}
        initialTheme="primary"
        initialThemeMode="light"
        enableGoogleAnalytics={enableGoogleAnalytics}
      >
        {children}
      </ApplicationProvider>
    </ExampleRoutesProvider>
  )
}
