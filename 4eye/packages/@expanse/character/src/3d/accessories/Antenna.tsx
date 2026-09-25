/**
 * Antenna — Themed 3D Accessory (sample)
 * ======================================
 * Demonstrates the accessory-theming pattern: an accessory mounts at a named
 * {@link AnchorName}, sizes itself from the shared proportions, and colors
 * itself from an {@link AccessoryColorToken} resolved against the active
 * {@link CharacterPalette} in state. Swap `stalkColor` / `tipColor` to any
 * palette slot ("primary", "highlight", …) or an explicit `{ hex }`.
 *
 * This is the reference implementation other accessories (hats, badges,
 * ribbons) follow.
 */

import { useMemo } from "react"
import {
  calculateProportions,
  resolveAccessoryColor,
  resolveAnchors,
  type AccessoryColorToken,
} from "../../core"
import { useCharacter } from "../../state"

export interface AntennaProps {
  /** Color of the stalk (default: neutral hardware accent). */
  stalkColor?: AccessoryColorToken
  /** Color of the glowing tip (default: the highlight accent). */
  tipColor?: AccessoryColorToken
}

export function Antenna({
  stalkColor = "neutral",
  tipColor = "highlight",
}: AntennaProps) {
  const { state } = useCharacter()
  const p = useMemo(() => calculateProportions(), [])
  const anchors = useMemo(() => resolveAnchors(), [])

  const stalk = resolveAccessoryColor(stalkColor, state.palette)
  const tip = resolveAccessoryColor(tipColor, state.palette)

  // 3D maps the head-centered anchor (y-down) to model space (y-up).
  const topY = -anchors.headTop.y
  const stalkLen = p.headLength * 0.5
  const stalkRadius = p.headLength * 0.03
  const tipRadius = p.headLength * 0.09

  return (
    <group position={[0, topY, 0]}>
      <mesh position={[0, stalkLen / 2, 0]}>
        <cylinderGeometry args={[stalkRadius, stalkRadius, stalkLen, 12]} />
        <meshStandardMaterial color={stalk} roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, stalkLen, 0]}>
        <sphereGeometry args={[tipRadius, 24, 24]} />
        <meshStandardMaterial
          color={tip}
          emissive={tip}
          emissiveIntensity={0.7}
          roughness={0.25}
        />
      </mesh>
    </group>
  )
}
