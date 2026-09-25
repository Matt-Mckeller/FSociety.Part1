"use client";

/**
 * MoneyMark — an original four-petal pinwheel-in-octagon mark for "banking /
 * institutional value" (the same generic geometric family as many bank
 * marks — an octagon outline with a rotational petal pinwheel — but its own
 * proportions and rendering, not a reproduction of any specific trademark).
 */

import * as React from "react";

export function MoneyMark({ size = 18, color = "#2f6fed" }: { size?: number; color?: string }) {
  const id = React.useId().replace(/:/g, "");
  const cx = 50;
  const cy = 50;
  const octagonRadius = 46;

  const octagonPoints = Array.from({ length: 8 }, (_, i) => {
    const a = ((Math.PI / 180) * (i * 45 - 90));
    return [cx + octagonRadius * Math.cos(a), cy + octagonRadius * Math.sin(a)] as const;
  });
  const octagonPath =
    octagonPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ") + " Z";

  const petalAngles = [-90, 0, 90, 180];
  const petalTipRadius = 40;
  const petalBaseRadius = 9;
  const petalHalfSpreadDeg = 15;
  const petalPaths = petalAngles.map((deg) => {
    const a = (Math.PI / 180) * deg;
    const a1 = (Math.PI / 180) * (deg - petalHalfSpreadDeg);
    const a2 = (Math.PI / 180) * (deg + petalHalfSpreadDeg);
    const tip = [cx + petalTipRadius * Math.cos(a), cy + petalTipRadius * Math.sin(a)];
    const base1 = [cx + petalBaseRadius * Math.cos(a1), cy + petalBaseRadius * Math.sin(a1)];
    const base2 = [cx + petalBaseRadius * Math.cos(a2), cy + petalBaseRadius * Math.sin(a2)];
    return `M${cx},${cy} L${base1[0].toFixed(2)},${base1[1].toFixed(2)} L${tip[0].toFixed(2)},${tip[1].toFixed(2)} L${base2[0].toFixed(2)},${base2[1].toFixed(2)} Z`;
  });

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={1} />
          <stop offset="100%" stopColor={color} stopOpacity={0.68} />
        </linearGradient>
      </defs>
      <path d={octagonPath} fill="none" stroke={color} strokeWidth={3.5} strokeLinejoin="round" />
      {petalPaths.map((d, i) => (
        <path key={i} d={d} fill={`url(#${id}-g)`} />
      ))}
    </svg>
  );
}
