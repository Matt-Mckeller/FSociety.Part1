"use client"

import React, { createContext, useCallback, useContext, useRef } from "react"

/**
 * BrainStripPulseContext — Tier-A cross-component pulse bridge.
 *
 * The controller calls `pulse(nodeIndex)` when a button is pressed.
 * BrainWiringStrip subscribes via `usePulseSubscribe` and runs a
 * glow animation on the matching node.
 *
 * nodeIndex: 0 = △ (improve/violet), 1 = ○ (heal/teal),
 *            2 = ✕ (protect/amber), 3 = ▢ (win/indigo).
 *            -1 = ALL nodes (used for LEVEL UP sweep).
 */

export type PulseListener = (nodeIndex: number) => void

interface BrainStripPulseContextValue {
  pulse: (nodeIndex: number) => void
  subscribe: (listener: PulseListener) => () => void
}

const BrainStripPulseContext = createContext<BrainStripPulseContextValue | null>(null)

export function BrainStripPulseProvider({ children }: { children: React.ReactNode }) {
  const listeners = useRef<Set<PulseListener>>(new Set())

  const subscribe = useCallback((listener: PulseListener) => {
    listeners.current.add(listener)
    return () => listeners.current.delete(listener)
  }, [])

  const pulse = useCallback((nodeIndex: number) => {
    listeners.current.forEach((l) => l(nodeIndex))
  }, [])

  return (
    <BrainStripPulseContext.Provider value={{ pulse, subscribe }}>
      {children}
    </BrainStripPulseContext.Provider>
  )
}

export function usePulse(): (nodeIndex: number) => void {
  const ctx = useContext(BrainStripPulseContext)
  return ctx?.pulse ?? (() => {})
}

export function usePulseSubscribe(listener: PulseListener): void {
  const ctx = useContext(BrainStripPulseContext)
  const listenerRef = useRef(listener)
  listenerRef.current = listener

  React.useEffect(() => {
    if (!ctx) return
    return ctx.subscribe((i) => listenerRef.current(i))
  }, [ctx])
}
