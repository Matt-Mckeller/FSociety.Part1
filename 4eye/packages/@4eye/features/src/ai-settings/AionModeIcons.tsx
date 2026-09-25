"use client";

import type { ReactNode } from "react";
import type { PowerLevel } from "@4eye/types";

const LEMNISCATE =
  "M6.4 12 C6.4 8.6 8.8 7.2 12 12 C15.2 16.8 17.6 15.4 17.6 12 C17.6 8.6 15.2 7.2 12 12 C8.8 16.8 6.4 15.4 6.4 12 Z";

function Mark({
  size = 22,
  title,
  children,
}: {
  size?: number;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Even infinity — equal loops, a still crossing. */
export function BalancedInfinityIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Balanced">
      <path
        d={LEMNISCATE}
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      />
      <circle cx={8.6} cy={12} r={1.15} fill="currentColor" opacity={0.7} />
      <circle cx={15.4} cy={12} r={1.15} fill="currentColor" opacity={0.7} />
      <path
        d="M10.4 12 H13.6"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        opacity={0.45}
      />
    </Mark>
  );
}

/** Incumbent cluster — big tech / big AI companies. */
export function IonSparkIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Ion">
      <rect x={4.2} y={8.2} width={6.2} height={6.2} rx={1.1} stroke="currentColor" strokeWidth={1.25} />
      <rect x={13.6} y={6.4} width={5.6} height={5.6} rx={1} stroke="currentColor" strokeWidth={1.2} opacity={0.85} />
      <rect x={12.2} y={13.4} width={5.2} height={5.2} rx={1} stroke="currentColor" strokeWidth={1.15} opacity={0.7} />
      <circle cx={11.2} cy={12} r={1.35} fill="currentColor" />
    </Mark>
  );
}

/** The present world learning to like Ion. */
export function IonPlusIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Ion+">
      <circle cx={11} cy={12.4} r={6.4} stroke="currentColor" strokeWidth={1.25} opacity={0.85} />
      <ellipse cx={11} cy={12.4} rx={2.6} ry={6.4} stroke="currentColor" strokeWidth={1} opacity={0.55} />
      <path d="M4.6 12.4 H17.4" stroke="currentColor" strokeWidth={1} opacity={0.55} />
      <path
        d="M17.2 5.4 V9.2 M15.3 7.3 H19.1"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
      />
    </Mark>
  );
}

/** Unbounded — infinity with an orbital ring. AI on. */
export function AionInfinityIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Aion">
      <ellipse
        cx={12}
        cy={12}
        rx={9.4}
        ry={6.2}
        stroke="currentColor"
        strokeWidth={1.05}
        opacity={0.28}
      />
      <path
        d={LEMNISCATE}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={12} cy={12} r={1.35} fill="currentColor" />
    </Mark>
  );
}

/**
 * Unlimited — root AION at max. Infinity plus exponential lift.
 * The IV mark is the same "optimally injects" language used on profile inject.
 */
export function AionPlusInfinityIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Unlimited · Aion+^*">
      <path
        d="M4.2 16.8 C7.2 16.4 9.4 14.2 11.2 10.6 C12.6 7.6 14.4 5.2 17.6 4.2"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        opacity={0.55}
      />
      <path
        d="M16.15 4.15 L17.7 3.55 L17.35 5.2"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.55}
      />
      <path
        d="M19.2 7.4 V9.6 M18.1 8.5 H20.3"
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d={LEMNISCATE}
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={15.45} cy={12} r={1.7} stroke="currentColor" strokeWidth={1.05} opacity={0.85} />
      <path
        d="M15.45 10.2 V13.8 M13.75 12 H17.15"
        stroke="currentColor"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.85}
      />
      <text
        x={4.15}
        y={8.1}
        fill="currentColor"
        fontSize={4.4}
        fontWeight={800}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="0.4"
        opacity={0.9}
      >
        IV
      </text>
      <text
        x={17.6}
        y={19.6}
        fill="currentColor"
        fontSize={5.2}
        fontWeight={700}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        opacity={0.9}
      >
        +^*
      </text>
    </Mark>
  );
}

const ICONS: Record<Exclude<PowerLevel, "auto">, (p: { size?: number }) => ReactNode> = {
  ion: (p) => <IonSparkIcon {...p} />,
  "ion-plus": (p) => <IonPlusIcon {...p} />,
  aion: (p) => <AionInfinityIcon {...p} />,
  "aion-plus": (p) => <AionPlusInfinityIcon {...p} />,
};

export function PowerLevelIcon({
  level,
  size = 22,
}: {
  level: Exclude<PowerLevel, "auto">;
  size?: number;
}) {
  return ICONS[level]({ size });
}

/** @deprecated Use PowerLevelIcon */
export function AionModeIcon({
  mode,
  size = 22,
}: {
  mode: Exclude<PowerLevel, "auto">;
  size?: number;
}) {
  return ICONS[mode]({ size });
}
