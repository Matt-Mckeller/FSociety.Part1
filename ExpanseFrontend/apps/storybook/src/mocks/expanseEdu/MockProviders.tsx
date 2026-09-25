import React, { createContext } from "react"

/**
 * Mock providers for ExpanseEdu Storybook stories
 * These provide stub implementations of contexts used by layout components
 */

// Mock Analytics Context
export const MockAnalyticsContext = createContext({
  analyticsEventContext: {
    sessionId: "storybook-session",
    userId: null,
  },
})

export const MockAnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <MockAnalyticsContext.Provider
    value={{
      analyticsEventContext: {
        sessionId: "storybook-session",
        userId: null,
      },
    }}
  >
    {children}
  </MockAnalyticsContext.Provider>
)

// Mock Auth Display Context
export const MockAuthDisplayContext = createContext({
  displaySignInNav: true,
  displaySignUpNav: true,
  displayUserInNav: false,
  handleAuthNavigation: (type: string) => {
    console.log("Mock auth navigation:", type)
  },
})

export const MockAuthDisplayProvider: React.FC<{
  children: React.ReactNode
  isLoggedIn?: boolean
}> = ({ children, isLoggedIn = false }) => (
  <MockAuthDisplayContext.Provider
    value={{
      displaySignInNav: !isLoggedIn,
      displaySignUpNav: !isLoggedIn,
      displayUserInNav: isLoggedIn,
      handleAuthNavigation: (type: string) => {
        console.log("Mock auth navigation:", type)
      },
    }}
  >
    {children}
  </MockAuthDisplayContext.Provider>
)

// Mock Auth Session Context
export const MockAuthSessionContext = createContext({
  handleLogout: () => {
    console.log("Mock logout")
  },
})

export const MockAuthSessionProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <MockAuthSessionContext.Provider
    value={{
      handleLogout: () => {
        console.log("Mock logout")
      },
    }}
  >
    {children}
  </MockAuthSessionContext.Provider>
)

// Mock User Context
export const MockUserContext = createContext({
  user: null as any,
})

export const MockUserProvider: React.FC<{
  children: React.ReactNode
  user?: any
}> = ({ children, user = null }) => (
  <MockUserContext.Provider value={{ user }}>
    {children}
  </MockUserContext.Provider>
)

// Sample nav links for stories
export const mockNavLinks = [
  { text: "Home", path: "/" },
  { text: "Demo", path: "/demo" },
  { text: "About", path: "/about" },
  { text: "Contact", path: "/contact" },
]

// Sample user for logged-in state
export const mockUser = {
  id: "user-123",
  email: "demo@expanse.edu",
  firstName: "Demo",
  lastName: "User",
}
