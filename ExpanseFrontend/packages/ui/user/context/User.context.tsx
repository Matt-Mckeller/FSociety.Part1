"use client"
import React, { useMemo } from "react"
import { User } from "../models/user.model"
import { UserContextProps, UserProviderProps } from "../types"

export const UserContext = React.createContext<UserContextProps>(null)

export const UserProvider = ({
  children,
  accountNavRoute,
}: UserProviderProps) => {
  // Note: Will want to track changes through the backend to support multiple applications, and devices, shared state and scalability.
  // Keep this built in such a way that it can be
  const [user, setUser] = React.useState<User | null>(null)

  const initializeUser = (user: User) => {
    setUser(user)
  }

  const updateUser = (userUpdates: Partial<User>) => {
    // todo Validate updates?
    const updatedUser: User = { ...user, ...userUpdates }
    setUser(updatedUser)
  }

  const clearUser = () => {
    setUser(null)
  }

  const memoizedValues = useMemo(
    () => ({
      accountNavRoute,
      user,
      initializeUser,
      updateUser,
      clearUser,
    }),
    [accountNavRoute, user, setUser],
  )

  return (
    <UserContext.Provider value={memoizedValues}>
      {children}
    </UserContext.Provider>
  )
}
