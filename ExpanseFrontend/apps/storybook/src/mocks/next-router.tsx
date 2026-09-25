/**
 * Mock for next/router (Pages Router) - for Storybook compatibility.
 * Some components may still use the Pages Router API.
 */

// Mock router object
const mockRouter = {
  route: "/",
  pathname: "/storybook",
  query: {},
  asPath: "/storybook",
  basePath: "",
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  push: (url: string) => {
    console.log("[Storybook] Pages Router push:", url)
    return Promise.resolve(true)
  },
  replace: (url: string) => {
    console.log("[Storybook] Pages Router replace:", url)
    return Promise.resolve(true)
  },
  reload: () => {
    console.log("[Storybook] Pages Router reload")
  },
  back: () => {
    console.log("[Storybook] Pages Router back")
  },
  forward: () => {
    console.log("[Storybook] Pages Router forward")
  },
  prefetch: (url: string) => {
    console.log("[Storybook] Pages Router prefetch:", url)
    return Promise.resolve()
  },
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  locale: "en",
  locales: ["en"],
  defaultLocale: "en",
  domainLocales: [],
}

// Export as default (for `import router from 'next/router'`)
export default mockRouter

// Export useRouter hook
export function useRouter() {
  return mockRouter
}

// Export withRouter HOC
export function withRouter<P extends { router?: typeof mockRouter }>(
  Component: React.ComponentType<P>
): React.ComponentType<Omit<P, "router">> {
  const WithRouterComponent = (props: Omit<P, "router">) => {
    const router = mockRouter
    return <Component {...(props as P)} router={router} />
  }
  WithRouterComponent.displayName = `withRouter(${Component.displayName || Component.name || "Component"})`
  return WithRouterComponent
}

// Export Router singleton
export const Router = mockRouter

import React from "react"
