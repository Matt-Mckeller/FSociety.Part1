/**
 * Mock for next/navigation - Next.js router that doesn't work in Storybook.
 * Provides stub implementations for useRouter and usePathname.
 * 
 * This mock bypasses Next.js internal invariant checks by providing
 * direct implementations rather than relying on App Router context.
 */

// Mock router object with all required methods
const mockRouter = {
  push: (url: string) => {
    console.log("[Storybook] Router push:", url)
    return Promise.resolve(true)
  },
  replace: (url: string) => {
    console.log("[Storybook] Router replace:", url)
    return Promise.resolve(true)
  },
  back: () => {
    console.log("[Storybook] Router back")
  },
  forward: () => {
    console.log("[Storybook] Router forward")
  },
  prefetch: (url: string) => {
    console.log("[Storybook] Router prefetch:", url)
    return Promise.resolve()
  },
  refresh: () => {
    console.log("[Storybook] Router refresh")
  },
}

// Mock useRouter hook - returns the mock router directly
export function useRouter() {
  return mockRouter
}

// Mock usePathname hook - returns a static pathname
export function usePathname() {
  return "/storybook"
}

// Mock useSearchParams hook - returns empty URLSearchParams
export function useSearchParams() {
  return new URLSearchParams()
}

// Mock useParams hook - returns empty params object
export function useParams<T extends Record<string, string | string[]> = Record<string, never>>(): T {
  return {} as T
}

// Mock useSelectedLayoutSegment
export function useSelectedLayoutSegment(parallelRoutesKey?: string): string | null {
  return null
}

// Mock useSelectedLayoutSegments
export function useSelectedLayoutSegments(parallelRoutesKey?: string): string[] {
  return []
}

// Mock redirect function
export function redirect(url: string, type?: "replace" | "push"): never {
  console.log("[Storybook] Redirect:", url, type)
  throw new Error("NEXT_REDIRECT")
}

// Mock permanentRedirect function
export function permanentRedirect(url: string, type?: "replace" | "push"): never {
  console.log("[Storybook] Permanent Redirect:", url, type)
  throw new Error("NEXT_REDIRECT")
}

// Mock notFound function
export function notFound(): never {
  console.log("[Storybook] Not found")
  throw new Error("NEXT_NOT_FOUND")
}

// Mock useServerInsertedHTML (used by styled-components, emotion, etc.)
export function useServerInsertedHTML(callback: () => React.ReactNode): void {
  // No-op in Storybook
}

// Mock ReadonlyURLSearchParams class
export class ReadonlyURLSearchParams extends URLSearchParams {
  constructor(init?: string | URLSearchParams | Record<string, string> | string[][]) {
    super(init as any)
  }
}

// Import React for useServerInsertedHTML type
import type React from "react"
