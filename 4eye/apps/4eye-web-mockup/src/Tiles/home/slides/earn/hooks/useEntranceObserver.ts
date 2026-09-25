"use client"

/**
 * useEntranceObserver — fire `onEnter` exactly once when the element
 * referenced by `ref` first crosses an IntersectionObserver threshold.
 *
 * The reward slide (and other home-deck slides) mount eagerly; we
 * can't kick off entrance animations or state transitions on mount
 * because the user may not be looking at this slide yet. This hook
 * gates the "slide entered the viewport" moment behind a one-shot
 * IntersectionObserver and disconnects right after.
 *
 * SSR-safe: degrades to firing immediately when `IntersectionObserver`
 * isn't available (matches the previous inline implementation in
 * EarnSlide).
 */

import { useEffect, useRef, type RefObject } from "react"

export interface UseEntranceObserverOptions {
  /**
   * Visibility ratio at which the entrance fires. `0.4` matches the
   * threshold the reward slide previously used inline.
   */
  threshold: number
  /**
   * Called the first time `intersectionRatio >= threshold`. Receives
   * no arguments. The hook never calls it more than once per mount.
   */
  onEnter: () => void
}

export function useEntranceObserver(
  ref: RefObject<Element | null>,
  { threshold, onEnter }: UseEntranceObserverOptions,
): void {
  // Latest-callback ref so the effect doesn't have to re-subscribe
  // every render just because the host passed a fresh `onEnter`.
  const onEnterRef = useRef(onEnter)
  useEffect(() => {
    onEnterRef.current = onEnter
  }, [onEnter])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (typeof IntersectionObserver === "undefined") {
      // No observer available (older runtimes, jsdom). Fire once so
      // hosts at least get a deterministic enter signal.
      onEnterRef.current()
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.intersectionRatio >= threshold) {
          onEnterRef.current()
          observer.disconnect()
        }
      },
      { threshold: [threshold] },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
}
