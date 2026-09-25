"use client";

/**
 * AmplifyAura
 * -----------
 * Subtle "amplification" effect rendered behind the persistent home
 * mascot on slide 1 (Hook). Just thin lightning strips that crackle
 * around the character body — no halo, no glow column, no DBZ aura.
 *
 * Each bolt is an SVG path with a flickering `stroke-dashoffset`
 * animation, positioned around the character's silhouette. The whole
 * group rotates very slowly so the bolts don't sit in fixed spots.
 *
 * The component is purely cosmetic and `aria-hidden`.
 */

import { Box } from "@mui/material";
import { useRef } from "react";
import gsap from "gsap";
import { useGsap } from "@4eye/web/hooks/animation";

export interface AmplifyAuraProps {
  /** When false, the strips fade out and pause their flicker. */
  active: boolean;
}

// Bolts arranged around the character body. Each is a `transform`
// rotation around the SVG center (100,100). Angles avoid the eye area
// and cluster around shoulders/hips/head for a "channeled energy" feel
// rather than a uniform halo.
const BOLT_ANGLES = [-65, -25, 35, 75, 130, 175, 220, 305];

export function AmplifyAura({ active }: AmplifyAuraProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsap(rootRef, () => {
    // Flicker each bolt independently — short reveal, longer hold,
    // randomized so no two bolts pulse together.
    gsap.set(".aura-bolt", { strokeDasharray: 60, strokeDashoffset: 60, opacity: 0 });
    gsap.utils.toArray<SVGPathElement>(".aura-bolt").forEach((bolt) => {
      const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 1.4 });
      tl.to(bolt, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.18,
        ease: "power2.out",
      })
        .to(bolt, { opacity: 0.85, duration: 0.08 })
        .to(bolt, {
          opacity: 0,
          duration: 0.22,
          ease: "power1.in",
        })
        .to({}, { duration: 0.6 + Math.random() * 1.2 });
    });
    // Very slow rotation of the whole bolt group so positions drift.
    gsap.to(".aura-bolt-group", {
      rotate: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
  });

  return (
    <Box
      ref={rootRef}
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 600ms ease",
        zIndex: 0,
        overflow: "visible",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="aura-bolt-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6f7ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.85" />
          </linearGradient>
          <filter id="aura-bolt-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="aura-bolt-group" style={{ transformOrigin: "100px 100px" }}>
          {BOLT_ANGLES.map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              {/* Thin jagged strip, ~28px tall, hugging the body
                  silhouette at radius ~80 from center. */}
              <path
                className="aura-bolt"
                d="M 100 22 L 98.5 28 L 101 30 L 97.5 37 L 100.5 39 L 98 46"
                fill="none"
                stroke="url(#aura-bolt-grad)"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#aura-bolt-glow)"
              />
            </g>
          ))}
        </g>
      </Box>
    </Box>
  );
}
