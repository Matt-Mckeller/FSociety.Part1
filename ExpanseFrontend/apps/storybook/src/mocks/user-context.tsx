/**
 * Mock utilities for User context in Storybook.
 * Provides factory functions for creating mock users with different scenarios.
 */
import React, { useMemo } from "react"
import { User, UserContext } from "../../../../packages/ui/user"

// ============================================================================
// Mock User Factory Functions
// ============================================================================

/**
 * Creates a complete mock user with all fields populated
 */
export const createMockUserFull = (): User => {
  return new User({
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    active: true,
    role: { id: 1, name: "student" },
    sessions: { expires: Date.now() + 3600000, createdAt: Date.now() },
    lastLogIn: "2026-01-16T10:30:00Z",
    createdAt: "2025-06-15T08:00:00Z",
    updatedAt: "2026-01-16T10:30:00Z",
  })
}

/**
 * Creates a mock user with partial data (missing optional fields)
 */
export const createMockUserPartial = (): User => {
  return new User({
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: undefined,
    active: true,
    role: { id: 2, name: "teacher" },
    sessions: { expires: Date.now() + 3600000, createdAt: Date.now() },
    lastLogIn: "2026-01-10T14:00:00Z",
    createdAt: "2024-09-01T12:00:00Z",
    updatedAt: "2026-01-10T14:00:00Z",
  })
}

/**
 * Creates a mock user that just signed up (no previous login)
 */
export const createMockUserNew = (): User => {
  const now = new Date().toISOString()
  return new User({
    id: 3,
    fullName: "New User",
    email: "newuser@example.com",
    phone: undefined,
    active: true,
    role: { id: 1, name: "student" },
    sessions: { expires: Date.now() + 3600000, createdAt: Date.now() },
    lastLogIn: "", // No previous login
    createdAt: now,
    updatedAt: now,
  })
}

/**
 * Creates a mock user with long text to test overflow/ellipsis
 */
export const createMockUserLongText = (): User => {
  return new User({
    id: 4,
    fullName: "Alexander Bartholomew Christopher Davidson-Montgomery III",
    email: "alexander.bartholomew.christopher.davidson-montgomery@very-long-domain-name-university.edu",
    phone: "+1 (555) 999-8888 ext. 12345",
    active: true,
    role: { id: 1, name: "district-administrator" },
    sessions: { expires: Date.now() + 3600000, createdAt: Date.now() },
    lastLogIn: "2026-01-15T09:00:00Z",
    createdAt: "2020-01-01T00:00:00Z",
    updatedAt: "2026-01-15T09:00:00Z",
  })
}

/**
 * Creates a mock user for game contexts (used by game-context.tsx)
 */
export const createMockGameUser = (): User => {
  return new User({
    id: 1,
    fullName: "Game Player",
    email: "player@example.com",
    phone: "+1234567890",
    active: true,
    role: { id: 1, name: "student" },
    sessions: { expires: Date.now() + 3600000, createdAt: Date.now() },
    lastLogIn: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

// ============================================================================
// Mock User Context Provider
// ============================================================================

export interface MockUserProviderProps {
  children: React.ReactNode
  user?: User | null
  accountNavRoute?: string
}

/**
 * Mock provider for UserContext in Storybook
 */
export function MockUserProvider({
  children,
  user = createMockUserFull(),
  accountNavRoute = "/account",
}: MockUserProviderProps) {
  const contextValue = useMemo(
    () => ({
      accountNavRoute,
      user,
      initializeUser: (u: User) => console.log("[Storybook] initializeUser", u),
      updateUser: (updates: Partial<User>) =>
        console.log("[Storybook] updateUser", updates),
      clearUser: () => console.log("[Storybook] clearUser"),
    }),
    [user, accountNavRoute],
  )

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

// ============================================================================
// Pre-built mock users for easy story use
// ============================================================================

export const mockUsers = {
  full: createMockUserFull(),
  partial: createMockUserPartial(),
  new: createMockUserNew(),
  longText: createMockUserLongText(),
  gamePlayer: createMockGameUser(),
}
