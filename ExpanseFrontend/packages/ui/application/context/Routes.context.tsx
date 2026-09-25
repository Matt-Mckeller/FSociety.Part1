"use client"
import React, { useMemo } from "react"

/*
  Internationalized routes are preceeded by the Locale i.e. 'es' ( /es/route-text ) for web
*/
type DefaultRoutes = {
  accountNav: string
  privacyPolicy: string
  terms: string
}

// Define RoutesContextType directly without the 'routes' key
type RoutesContextType<T extends DefaultRoutes> = {
  routes: T
}

type RoutesProviderProps<T extends DefaultRoutes> = {
  routes: T
  children: JSX.Element
}

const defaultRoutes: RoutesContextType<DefaultRoutes> = {
  routes: {
    accountNav: "",
    privacyPolicy: "",
    terms: "",
  },
  // router: null as any,
}

// Create the context with the correct defaultValue
export const RoutesContext =
  React.createContext<RoutesContextType<DefaultRoutes>>(defaultRoutes)
export const ExampleRoutesProvider: <T extends DefaultRoutes>(
  props: RoutesProviderProps<T>,
) => JSX.Element = ({ routes, children }) => {
  const memoValues = useMemo(
    () => ({
      routes,
    }),
    [routes],
  )
  return (
    <RoutesContext.Provider value={memoValues}>
      {children}
    </RoutesContext.Provider>
  )
}
