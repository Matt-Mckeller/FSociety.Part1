"use client";

/**
 * SpinningGlobe — a themed SVG globe that rotates continuously, with a
 * dark → light terminator wash (bringing the world "out of the darkness into
 * the light"). Continents scroll around a wireframe sphere.
 */

import * as React from "react";
import { Box } from "@mui/material";

/**
 * Simplified but recognizable Earth continents on an equirectangular tile
 * (0..100 wide), drawn so the arrangement reads as our planet. Duplicated at
 * +100 for a seamless scroll (the Pacific seam is mostly ocean).
 */
const CONTINENTS = [
  // North America
  "M8,26 q7,-6 15,-3 q6,3 3,9 q4,2 1,7 q-5,5 -12,3 q-3,5 -8,2 q-4,-4 0,-9 q-3,-6 2,-9 Z",
  // Central + South America
  "M23,44 q4,-2 6,2 q1,4 -2,5 q3,3 2,9 q-1,10 -6,17 q-4,6 -6,-1 q-1,-9 2,-18 q-3,-8 4,-13 Z",
  // Europe
  "M47,24 q6,-3 10,1 q2,4 -3,6 q-6,2 -9,-2 q-1,-4 2,-5 Z",
  // Africa
  "M49,34 q9,-3 15,3 q3,6 -1,13 q-3,11 -9,17 q-5,4 -8,-3 q-3,-11 0,-21 q-2,-8 3,-9 Z",
  // Asia
  "M60,20 q14,-5 24,1 q6,4 2,10 q4,3 -1,8 q-9,6 -19,3 q-8,-1 -11,-8 q-4,-8 1,-14 q-1,-6 2,-8 Z",
  // Southeast Asia / islands
  "M78,44 q4,-1 5,3 q0,4 -4,4 q-5,0 -5,-4 q1,-3 4,-3 Z",
  // Australia
  "M80,60 q7,-3 12,2 q3,5 -2,9 q-8,4 -13,-2 q-3,-6 3,-9 Z",
];

export function SpinningGlobe({
  size = 84,
  light = "#8fe3ff",
  deep = "#0a3050",
  land = "#6fd3ff",
  spin = 12,
}: {
  size?: number;
  light?: string;
  deep?: string;
  land?: string;
  /** Seconds per rotation. */
  spin?: number;
}) {
  const id = `globe${React.useId().replace(/:/g, "")}`;

  return (
    <Box sx={{ width: size, height: size, position: "relative", flexShrink: 0, lineHeight: 0 }}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
        <defs>
          <radialGradient id={`${id}-ocean`} cx="38%" cy="34%" r="75%">
            <stop offset="0%" stopColor={light} stopOpacity={0.95} />
            <stop offset="55%" stopColor={deep} stopOpacity={0.95} />
            <stop offset="100%" stopColor="#020913" />
          </radialGradient>
          {/* dark → light terminator */}
          <linearGradient id={`${id}-term`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity={0.72} />
            <stop offset="52%" stopColor="#000000" stopOpacity={0} />
            <stop offset="100%" stopColor={light} stopOpacity={0.28} />
          </linearGradient>
          <clipPath id={`${id}-clip`}>
            <circle cx="50" cy="50" r="46" />
          </clipPath>
          <radialGradient id={`${id}-atmo`} cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor={light} stopOpacity={0} />
            <stop offset="100%" stopColor={light} stopOpacity={0.5} />
          </radialGradient>
        </defs>

        {/* atmosphere glow */}
        <circle cx="50" cy="50" r="49" fill={`url(#${id}-atmo)`} />
        <circle cx="50" cy="50" r="46" fill={`url(#${id}-ocean)`} />

        <g clipPath={`url(#${id}-clip)`}>
          {/* scrolling Earth continents (duplicated for seamless wrap) */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-100 0"
              dur={`${spin}s`}
              repeatCount="indefinite"
            />
            {[0, 100].map((dx) => (
              <g key={dx} transform={`translate(${dx} 0)`} fill={land} fillOpacity={0.9} stroke="#1e6f96" strokeWidth={0.4}>
                {CONTINENTS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            ))}
          </g>

          {/* meridians / parallels wireframe */}
          <g stroke={light} strokeOpacity={0.28} fill="none" strokeWidth={0.6}>
            <ellipse cx="50" cy="50" rx="46" ry="15" />
            <ellipse cx="50" cy="50" rx="46" ry="30" />
            <ellipse cx="50" cy="50" rx="15" ry="46" />
            <ellipse cx="50" cy="50" rx="30" ry="46" />
            <line x1="4" y1="50" x2="96" y2="50" />
          </g>

          {/* dark → light wash */}
          <circle cx="50" cy="50" r="46" fill={`url(#${id}-term)`} />
          {/* specular highlight */}
          <ellipse cx="36" cy="32" rx="14" ry="9" fill="#ffffff" fillOpacity={0.18} />
        </g>

        <circle cx="50" cy="50" r="46" fill="none" stroke={light} strokeOpacity={0.5} strokeWidth={0.8} />
      </svg>
    </Box>
  );
}
