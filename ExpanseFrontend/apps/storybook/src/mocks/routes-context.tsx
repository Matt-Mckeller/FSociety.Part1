import React from "react"
import { RoutesContext } from "../../../../packages/ui/application/context/Routes.context"

// Mock routes for Storybook
const mockRoutes = {
  routes: {
    accountNav: "/account",
    privacyPolicy: "https://example.com/privacy-policy",
    terms: "https://example.com/terms-of-service",
  },
}

export function MockRoutesProvider({ children }: { children: React.ReactNode }) {
  return (
    <RoutesContext.Provider value={mockRoutes}>
      {children}
    </RoutesContext.Provider>
  )
}
