"use client";

/**
 * InfinityGlyph — a lemniscate (∞) with light flowing around it, flanking the
 * globe to say "evermore / on infinite loop."
 */

import * as React from "react";
import { Box } from "@mui/material";

const PATH =
  "M18,20 C8,20 8,32 18,32 C28,32 34,20 44,20 C54,20 54,32 44,32 C34,32 28,20 18,20 Z";

export function InfinityGlyph({
  width = 44,
  color = "#8fe3ff",
  duration = 2.8,
}: {
  width?: number;
  color?: string;
  duration?: number;
}) {
  const id = `inf${React.useId().replace(/:/g, "")}`;
  return (
    <Box sx={{ width, lineHeight: 0, flexShrink: 0 }}>
      <svg viewBox="0 0 62 52" width={width} aria-hidden>
        <defs>
          <linearGradient id={`${id}-g`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity={0.35} />
          </linearGradient>
        </defs>
        {/* base ghost */}
        <path d={PATH} fill="none" stroke={color} strokeOpacity={0.22} strokeWidth={3} />
        {/* flowing light */}
        <path
          d={PATH}
          fill="none"
          stroke={`url(#${id}-g)`}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="26 120"
          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
        >
          <animate attributeName="stroke-dashoffset" from="146" to="0" dur={`${duration}s`} repeatCount="indefinite" />
        </path>
      </svg>
    </Box>
  );
}
