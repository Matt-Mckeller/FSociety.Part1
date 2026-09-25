/**
 * Turn Controller — 3D
 * ====================
 * Bridges the declarative store to the imperative render loop. The store
 * holds only the DISCRETE `targetYaw`; this hook tweens the actual mesh
 * rotation toward that target every frame against a ref — so turning is
 * smooth at 60fps WITHOUT dispatching an action per frame.
 *
 * Usage:
 *   const ref = useRef<THREE.Group>(null)
 *   useTurnController(ref)
 *   return <group ref={ref}>…</group>
 */

import { useFrame } from "@react-three/fiber"
import { useRef, type RefObject } from "react"
import type { Group } from "three"
import { useCharacter } from "../state"

const DEG2RAD = Math.PI / 180

/** Critically-damped-ish smoothing factor (higher = snappier). */
const TURN_SPEED = 6

export function useTurnController(ref: RefObject<Group | null>): void {
  const { state } = useCharacter()
  // Read the latest target inside the loop without re-subscribing per frame.
  const targetRef = useRef(state.targetYaw)
  targetRef.current = state.targetYaw

  useFrame((_, delta) => {
    const group = ref.current
    if (!group) return

    const target = targetRef.current * DEG2RAD
    const current = group.rotation.y

    // Shortest-path angular interpolation.
    let diff = target - current
    diff = Math.atan2(Math.sin(diff), Math.cos(diff))

    const t = 1 - Math.exp(-TURN_SPEED * delta)
    group.rotation.y = current + diff * t
  })
}
