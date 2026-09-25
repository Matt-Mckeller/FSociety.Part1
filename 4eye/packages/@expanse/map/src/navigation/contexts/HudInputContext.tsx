"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react"

// =============================================================================
// Types
// =============================================================================

/**
 * Logical input event dispatched through the HUD input stack.
 *
 * Concrete keyboard / gamepad / touch sources are translated into these
 * higher-level events by `useKeyboardNavigation` (and any future input
 * adapters), so handlers don't need to care which physical key was pressed.
 */
export type HudInputEvent =
  | { kind: "direction"; direction: "up" | "down" | "left" | "right" }
  | { kind: "action"; action: "home" | "back" | "confirm" | "cancel" }

/**
 * A handler registered on the HUD input stack.
 *
 * Handlers receive each event in order from the most-recently-registered
 * (top of stack) downward. Returning `true` marks the event as consumed and
 * stops propagation to lower handlers and the default grid navigation.
 * Returning `false` / `undefined` lets the event fall through.
 */
export interface HudInputHandler {
  /** Stable id, used for debugging and re-registration semantics. */
  id: string
  handle: (event: HudInputEvent) => boolean | void
}

/** Internal context value shared between the provider and the hook. */
export interface HudInputContextValue {
  /** Push a handler onto the top of the stack. Returns an unregister fn. */
  push: (handler: HudInputHandler) => () => void
  /**
   * Dispatch an event through the stack. Returns `true` if any handler
   * consumed it (caller should suppress default behavior).
   *
   * @internal Intended for `useKeyboardNavigation` / input adapters only.
   */
  dispatch: (event: HudInputEvent) => boolean
}

// =============================================================================
// Context
// =============================================================================

export const HudInputContext = createContext<HudInputContextValue | null>(null)

// =============================================================================
// Internal hook used by providers to build the context value
// =============================================================================

/**
 * Build a stable HudInputContextValue backed by a ref-stored stack.
 *
 * Push/pop don't trigger re-renders, and `dispatch` walks the live stack
 * each call, so handlers registered after a render still see events.
 *
 * @internal
 */
export function useCreateHudInputValue(): HudInputContextValue {
  const stackRef = useRef<HudInputHandler[]>([])

  const push = useCallback((handler: HudInputHandler) => {
    // Top of stack = front of array, so the most-recently-registered
    // handler gets the first crack at every event.
    stackRef.current = [handler, ...stackRef.current]
    return () => {
      stackRef.current = stackRef.current.filter((h) => h !== handler)
    }
  }, [])

  const dispatch = useCallback((event: HudInputEvent) => {
    for (const handler of stackRef.current) {
      try {
        const consumed = handler.handle(event)
        if (consumed === true) return true
      } catch (err) {
        // A buggy handler should not lock out the rest of the stack.
        // eslint-disable-next-line no-console
        console.error(`[HudInput] handler "${handler.id}" threw:`, err)
      }
    }
    return false
  }, [])

  return useMemo(() => ({ push, dispatch }), [push, dispatch])
}

// =============================================================================
// Public hook
// =============================================================================

/**
 * Register a handler on the HUD input stack.
 *
 * The most-recently-registered handler receives each event first. Return
 * `true` to consume; return `false` / nothing to let the event continue
 * down the stack and ultimately reach the default grid navigation.
 *
 * The `handle` callback is stored in a ref, so it may close over current
 * state without re-registering — only `id` (and the surrounding mount)
 * triggers re-registration.
 *
 * @example
 * ```tsx
 * useRegisterHudInput({
 *   id: "home-slideshow",
 *   handle: (e) => {
 *     if (e.kind !== "direction") return false;
 *     if (e.direction === "right") { advance(); return true; }
 *     if (e.direction === "left")  { retreat(); return true; }
 *     return false;
 *   },
 * });
 * ```
 */
export function useRegisterHudInput(handler: HudInputHandler): void {
  const ctx = useContext(HudInputContext)
  const handleRef: MutableRefObject<HudInputHandler["handle"]> = useRef(handler.handle)
  handleRef.current = handler.handle

  useEffect(() => {
    if (!ctx) return
    return ctx.push({
      id: handler.id,
      handle: (event) => handleRef.current(event),
    })
    // Re-run only when id (or context) changes so a fluctuating
    // `handle` body doesn't thrash the stack.
  }, [ctx, handler.id])
}

// =============================================================================
// Provider component (lightweight wrapper used internally)
// =============================================================================

/**
 * Provide a HUD input stack to descendants.
 *
 * Normally you don't render this directly — `NavigationProvider`
 * wraps its children with one already. Use it standalone only when
 * embedding `useRegisterHudInput` consumers outside the map nav tree
 * (e.g. in tests or storybook).
 */
export function HudInputProvider({ children }: { children: ReactNode }) {
  const value = useCreateHudInputValue()
  return <HudInputContext.Provider value={value}>{children}</HudInputContext.Provider>
}
