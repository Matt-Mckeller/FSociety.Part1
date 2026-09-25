/**
 * Mock for next/script - for Storybook compatibility.
 */
import React from "react"

interface ScriptProps {
  id?: string
  src?: string
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker"
  onLoad?: () => void
  onReady?: () => void
  onError?: () => void
  children?: React.ReactNode
  dangerouslySetInnerHTML?: { __html: string }
  [key: string]: any
}

// Mock Script component - renders nothing in Storybook
function Script({ children, dangerouslySetInnerHTML, ...props }: ScriptProps) {
  // In Storybook, we don't want to actually load external scripts
  console.log("[Storybook] Script component rendered:", props.src || props.id || "inline")
  return null
}

export default Script
