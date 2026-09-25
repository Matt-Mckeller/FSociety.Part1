"use client";

import type { ReactNode } from "react";
import type { TimeAspect } from "@4eye/types";

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

/** History in play. */
export function PastTimeIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Past">
      <circle cx={12} cy={12} r={7.4} stroke="currentColor" strokeWidth={1.35} opacity={0.45} />
      <path
        d="M12 12 L12 7.6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M12 12 L8.4 13.8"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M7.2 5.4 C5.4 7.2 4.6 9.6 4.8 12"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path
        d="M4.15 10.35 L4.7 12.35 L6.5 11.35"
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
    </Mark>
  );
}

/** Current moment. */
export function PresentTimeIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Present">
      <circle cx={12} cy={12} r={7.4} stroke="currentColor" strokeWidth={1.35} opacity={0.35} />
      <circle cx={12} cy={12} r={2.2} fill="currentColor" />
      <path
        d="M12 5.2 V7.4 M12 16.6 V18.8"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        opacity={0.7}
      />
    </Mark>
  );
}

/** Prediction and forthcoming knowledge. */
export function FutureTimeIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Future">
      <circle cx={12} cy={12} r={7.4} stroke="currentColor" strokeWidth={1.35} opacity={0.45} />
      <path
        d="M12 12 L12 7.6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M12 12 L16.1 14.2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M16.8 5.4 C18.6 7.2 19.4 9.6 19.2 12"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path
        d="M19.85 10.35 L19.3 12.35 L17.5 11.35"
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
    </Mark>
  );
}

/** All three — unbounded. */
export function MaxTimeIcon({ size = 22 }: { size?: number }) {
  return (
    <Mark size={size} title="Max">
      <path
        d={LEMNISCATE}
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={8.6} cy={12} r={1.05} fill="currentColor" opacity={0.8} />
      <circle cx={12} cy={12} r={1.25} fill="currentColor" />
      <circle cx={15.4} cy={12} r={1.05} fill="currentColor" opacity={0.8} />
    </Mark>
  );
}

const ICONS: Record<Exclude<TimeAspect, "auto">, (p: { size?: number }) => ReactNode> = {
  past: (p) => <PastTimeIcon {...p} />,
  present: (p) => <PresentTimeIcon {...p} />,
  future: (p) => <FutureTimeIcon {...p} />,
  max: (p) => <MaxTimeIcon {...p} />,
};

export function TimeAspectIcon({
  aspect,
  size = 22,
}: {
  aspect: Exclude<TimeAspect, "auto">;
  size?: number;
}) {
  return ICONS[aspect]({ size });
}
