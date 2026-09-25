"use client"

/**
 * CharacterAnatomy
 * ----------------
 * Typed registry for the named SVG sub-elements of a brand-core
 * character. Replaces the long-standing convention of looking up parts
 * via `root.querySelector('[name="leftArm"]')` with a compiler-checked
 * map of refs the character component populates as it renders.
 *
 * Why this exists
 *  - The `name="..."` attribute on SVG sub-elements is non-standard and
 *    invisible to TypeScript. A typo in either the markup or the
 *    selector silently breaks animations.
 *  - The animation hooks need stable handles on a small, fixed set of
 *    parts; a callback-ref registry gives them O(1) typed access while
 *    keeping the SVG itself unchanged for the parallel pose system in
 *    `useCharacterAnimation` (which still depends on `name="..."`).
 *
 * The registry is purely additive — character components that adopt it
 * keep their `name="..."` attributes so the existing pose-driven
 * animations and tests continue to work.
 *
 * Usage
 * -----
 * ```tsx
 * const anatomy = useCharacterAnatomy()
 *
 * return (
 *   <svg ref={anatomy.register("svg")}>
 *     <circle name="head" ref={anatomy.register("head")} />
 *     <path name="leftArm" ref={anatomy.register("leftArm")} />
 *   </svg>
 * )
 *
 * // Later, in the reactions hook:
 * const leftArm = anatomy.get<SVGPathElement>("leftArm")
 * ```
 */

import { useCallback, useMemo, useRef } from "react"

/**
 * The fixed set of named parts a brand-core character may expose.
 * Adding a new part is a deliberate, type-checked change touching this
 * union and any consumer that wants to animate it.
 */
export type CharacterPart =
  | "svg"
  | "head"
  | "body"
  | "leftArm"
  | "rightArm"
  | "leftLeg"
  | "rightLeg"
  | "antenna"

/**
 * Map of part → live SVG element. Mutated in place by the registry's
 * callback refs; consumers should always read fresh via `anatomy.get`
 * rather than capturing snapshots.
 */
export type CharacterAnatomyMap = Partial<Record<CharacterPart, SVGElement | null>>

export interface CharacterAnatomy {
  /**
   * Returns a stable callback ref for the given part. Pass the result
   * to `<element ref={...}>`. The same callback reference is returned
   * across renders for a given part name, so React doesn't see a
   * "changing ref" and detach/reattach.
   */
  register: <T extends SVGElement>(part: CharacterPart) => (el: T | null) => void
  /**
   * Read the current element for the given part, or `null` if it isn't
   * mounted (or hasn't registered yet). Generic so callers can specify
   * the SVG element subtype they expect.
   */
  get: <T extends SVGElement>(part: CharacterPart) => T | null
  /**
   * Live (mutable) read of the underlying map. Useful for code that
   * needs to iterate registered parts (e.g. a "kill all tweens"
   * helper). The reference is stable across renders.
   */
  readonly map: CharacterAnatomyMap
}

/**
 * Hook that returns a typed anatomy registry. Cheap — one ref + one
 * memoized object — and safe to call once per character instance.
 */
export function useCharacterAnatomy(): CharacterAnatomy {
  // The live map. Mutated by the callback refs below.
  const mapRef = useRef<CharacterAnatomyMap>({})
  // Cache callback refs by part name so the same `register("leftArm")`
  // call returns an identical function reference across renders.
  const callbackRefsRef = useRef<
    Partial<Record<CharacterPart, (el: SVGElement | null) => void>>
  >({})

  const register = useCallback(
    <T extends SVGElement>(part: CharacterPart) => {
      let cb = callbackRefsRef.current[part]
      if (!cb) {
        cb = (el: SVGElement | null) => {
          if (el) {
            mapRef.current[part] = el
          } else {
            delete mapRef.current[part]
          }
        }
        callbackRefsRef.current[part] = cb
      }
      return cb as (el: T | null) => void
    },
    [],
  )

  const get = useCallback(
    <T extends SVGElement>(part: CharacterPart): T | null => {
      return (mapRef.current[part] as T | null | undefined) ?? null
    },
    [],
  )

  // Stable wrapper. `map` is the live ref'd object — its identity is
  // stable, its contents change as parts mount/unmount.
  return useMemo<CharacterAnatomy>(
    () => ({
      register,
      get,
      map: mapRef.current,
    }),
    [register, get],
  )
}
