/**
 * Character4eyeModel — 3D Scene Graph
 * ===================================
 * The shared true-3D 4eye, built from the SAME {@link calculateProportions}
 * values as the 2D SVG character, just revolved round on the depth axis:
 *   head  → shape-token geometry (sphere by default)
 *   body  → vertical capsule (Ø bodyStroke, len bodyLength)
 *   arms  → capsules (Ø armStroke, len armLength)
 *   legs  → capsules (Ø legStroke, len legLength)
 *   eye   → sphere on the head's front face
 *   strap → torus band wrapping the head
 *
 * This component is renderer-host-agnostic: it renders the same scene graph
 * inside a web `<Canvas>` or a native `<Canvas>`. Turning is driven by the
 * shared store via {@link useTurnController} (no per-frame dispatch).
 */

import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { calculateProportions } from "../core"
import { useCharacter } from "../state"
import { buildHeadGeometry } from "./geometry/headGeometry"
import { useTurnController } from "./useTurnController"

export interface Character4eyeModelProps {
  /** Optional hard overrides; when omitted, colors come from the themed palette in state. */
  headColor?: string
  bodyColor?: string
  strapColor?: string
  /** Fallback eye glow when neither override nor state provides one. */
  defaultEyeGlow?: string
  /** Limb opacity override; defaults to the themed palette value. */
  limbOpacity?: number
}

export function Character4eyeModel({
  headColor,
  bodyColor,
  strapColor,
  defaultEyeGlow,
  limbOpacity,
}: Character4eyeModelProps) {
  const { state } = useCharacter()
  const palette = state.palette
  const turnRef = useRef<THREE.Group>(null)
  useTurnController(turnRef)

  // Resolve final colors: explicit prop override → themed palette.
  const resolvedHead = headColor ?? palette.head
  const resolvedBody = bodyColor ?? palette.body
  const resolvedLimb = palette.limb
  const resolvedStrap = strapColor ?? palette.strap
  const resolvedLimbOpacity = limbOpacity ?? palette.limbOpacity

  const p = useMemo(() => calculateProportions(), [])
  const headRadius = p.headLength / 2

  // Vertical layout (y-up). Head centered at origin; body hangs below.
  const headCenterY = 0
  const bodyTopY = headCenterY - headRadius - p.neckGap
  const bodyCenterY = bodyTopY - p.bodyLength / 2
  const bodyBottomY = bodyTopY - p.bodyLength
  const legCenterY = bodyBottomY - p.legLength / 2
  const armCenterY = bodyTopY - p.armLength / 2

  const bodyRadius = p.bodyStrokeWidth / 2
  const armRadius = p.armStrokeWidth / 2
  const legRadius = p.legStrokeWidth / 2

  const eyeRadius = p.headLength * 0.14
  const strapTube = p.headLength * 0.05

  // Offset so the figure's vertical midpoint sits at the world origin,
  // letting the camera/OrbitControls frame it around (0, 0, 0).
  const centerOffsetY = (p.neckGap + p.bodyLength + p.legLength) / 2

  // Head geometry is swapped by shape token; rebuild + dispose on change.
  const headGeometry = useMemo(
    () => buildHeadGeometry(state.shapes.head),
    [state.shapes.head],
  )
  useEffect(() => () => headGeometry.dispose(), [headGeometry])

  const eyeGlow = state.eyeGlowColor ?? defaultEyeGlow ?? palette.eyeGlow

  // Subtle idle bob so the figure feels alive (imperative — no dispatch).
  const bobRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (bobRef.current) {
      bobRef.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 1.2
    }
  })

  return (
    <group position={[0, centerOffsetY, 0]}>
      <group ref={bobRef}>
        <group ref={turnRef}>
        {/* Head */}
        <mesh geometry={headGeometry} position={[0, headCenterY, 0]} castShadow>
          <meshStandardMaterial
            color={resolvedHead}
            roughness={0.45}
            metalness={0.15}
          />
        </mesh>

        {/* Strap band wrapping the head at eye level */}
        {state.strapStyle !== "none" && (
          <mesh
            position={[0, headCenterY, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[headRadius * 0.98, strapTube, 16, 48]} />
            <meshStandardMaterial color={resolvedStrap} roughness={0.5} />
          </mesh>
        )}

        {/* Eye on the front face */}
        <mesh position={[0, headCenterY, headRadius * 0.96]}>
          <sphereGeometry args={[eyeRadius, 32, 32]} />
          <meshStandardMaterial
            color={eyeGlow}
            emissive={eyeGlow}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Body trunk */}
        <mesh position={[0, bodyCenterY, 0]} castShadow>
          <capsuleGeometry args={[bodyRadius, p.bodyLength, 8, 24]} />
          <meshStandardMaterial color={resolvedBody} roughness={0.5} />
        </mesh>

        {/* Arms */}
        {([-1, 1] as const).map((side) => (
          <mesh
            key={`arm-${side}`}
            position={[side * (bodyRadius + armRadius), armCenterY, 0]}
            rotation={[0, 0, side * 0.18]}
          >
            <capsuleGeometry args={[armRadius, p.armLength, 6, 16]} />
            <meshStandardMaterial
              color={resolvedLimb}
              roughness={0.5}
              transparent
              opacity={resolvedLimbOpacity}
            />
          </mesh>
        ))}

        {/* Legs */}
        {([-1, 1] as const).map((side) => (
          <mesh
            key={`leg-${side}`}
            position={[side * bodyRadius * 0.5, legCenterY, 0]}
            rotation={[0, 0, side * 0.06]}
          >
            <capsuleGeometry args={[legRadius, p.legLength, 6, 16]} />
            <meshStandardMaterial
              color={resolvedLimb}
              roughness={0.5}
              transparent
              opacity={resolvedLimbOpacity}
            />
          </mesh>
        ))}
      </group>
      </group>
    </group>
  )
}
