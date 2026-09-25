/**
 * Head Geometry Resolver — 3D
 * ===========================
 * Maps a platform-neutral {@link HeadShape} token to a real Three.js
 * geometry, sized from the shared {@link calculateProportions} output so the
 * 3D head matches the 2D head dimensionally.
 *
 * `circle` is a true sphere (perfectly round on all axes). The remaining
 * silhouettes are extruded from their 2D outline with a generous bevel, so
 * they read as the same shape while still being rounded in depth.
 */

import * as THREE from "three"
import { calculateProportions, type HeadShape } from "../../core"

/** Build a 2D outline (centered on origin) for an extruded head shape. */
function buildOutline(shape: HeadShape, r: number): THREE.Shape {
  const s = new THREE.Shape()

  switch (shape) {
    case "square": {
      const h = r * 0.92
      s.moveTo(-h, -h)
      s.lineTo(h, -h)
      s.lineTo(h, h)
      s.lineTo(-h, h)
      s.closePath()
      return s
    }
    case "triangle": {
      const h = r * 1.05
      s.moveTo(0, h)
      s.lineTo(h, -h * 0.8)
      s.lineTo(-h, -h * 0.8)
      s.closePath()
      return s
    }
    case "diamond": {
      const h = r * 1.1
      s.moveTo(0, h)
      s.lineTo(h, 0)
      s.lineTo(0, -h)
      s.lineTo(-h, 0)
      s.closePath()
      return s
    }
    case "shield": {
      const w = r * 0.95
      const top = r * 1.0
      const bottom = r * 1.15
      s.moveTo(-w, top)
      s.lineTo(w, top)
      s.lineTo(w, -top * 0.2)
      s.quadraticCurveTo(w, bottom * 0.6, 0, bottom)
      s.quadraticCurveTo(-w, bottom * 0.6, -w, -top * 0.2)
      s.closePath()
      return s
    }
    case "heart": {
      const k = r * 1.1
      s.moveTo(0, -k * 0.85)
      s.bezierCurveTo(k * 1.2, k * 0.3, k * 0.6, k * 1.15, 0, k * 0.55)
      s.bezierCurveTo(-k * 0.6, k * 1.15, -k * 1.2, k * 0.3, 0, -k * 0.85)
      s.closePath()
      return s
    }
    case "present": {
      const h = r * 0.92
      s.moveTo(-h, -h)
      s.lineTo(h, -h)
      s.lineTo(h, h)
      s.lineTo(-h, h)
      s.closePath()
      return s
    }
    default: {
      // Fallback: a square outline (circle/capsule never reach here).
      const h = r * 0.9
      s.moveTo(-h, -h)
      s.lineTo(h, -h)
      s.lineTo(h, h)
      s.lineTo(-h, h)
      s.closePath()
      return s
    }
  }
}

/**
 * Build the Three.js geometry for a head shape at the canonical proportions.
 * Caller is responsible for disposing the geometry when it changes.
 */
export function buildHeadGeometry(
  shape: HeadShape,
  headSize?: number,
): THREE.BufferGeometry {
  const p = calculateProportions(headSize ? { headSize } : undefined)
  const r = p.headLength / 2

  if (shape === "circle") {
    return new THREE.SphereGeometry(r, 48, 48)
  }

  if (shape === "capsule") {
    // Vertical stadium: radius r, total height ≈ headLength * 1.4.
    return new THREE.CapsuleGeometry(r * 0.78, r * 0.9, 16, 32)
  }

  const depth = r * 1.1
  const bevel = r * 0.22
  const outline = buildOutline(shape, r - bevel)
  const geo = new THREE.ExtrudeGeometry(outline, {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 6,
    curveSegments: 24,
  })
  // Center the extrusion on the origin (extrude grows along +Z from 0).
  geo.translate(0, 0, -(depth - bevel) / 2)
  geo.computeVertexNormals()
  return geo
}
