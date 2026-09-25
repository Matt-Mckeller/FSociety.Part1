/**
 * Achievement icon SVGs — personal Core set.
 *
 * Geometric marks sized for the 38px rarity badge (~22px glyph).
 * `currentColor` inherits the rarity accent from the badge shell.
 */

import * as React from "react";

export type AchievementIconProps = {
  size?: number | string;
  title?: string;
  className?: string;
};

function SvgShell({
  size = "1em",
  title,
  className,
  children,
}: AchievementIconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Stabilized heart / pulse settling — Cured Mental Health */
export function CuredMentalHealthIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <path
        d="M12 19.5C12 19.5 4.5 14.2 4.5 9.2C4.5 6.7 6.4 5 8.6 5C10 5 11.2 5.7 12 6.8C12.8 5.7 14 5 15.4 5C17.6 5 19.5 6.7 19.5 9.2C19.5 14.2 12 19.5 12 19.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.2H10.2L11.2 9.4L13 13.2L14.2 11.2H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgShell>
  );
}

/** Geometric spark / frame-break — Innovation */
export function InnovationIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <path
        d="M12 3.5L13.4 8.6L18.5 10L13.4 11.4L12 16.5L10.6 11.4L5.5 10L10.6 8.6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M18.5 16L19.2 18L21.2 18.7L19.2 19.4L18.5 21.4L17.8 19.4L15.8 18.7L17.8 18L18.5 16Z" fill="currentColor" />
      <path d="M5.2 15.2L5.7 16.6L7.1 17.1L5.7 17.6L5.2 19L4.7 17.6L3.3 17.1L4.7 16.6L5.2 15.2Z" fill="currentColor" />
    </SvgShell>
  );
}

/** Book → eye — Learning Mastery */
export function LearningMasteryIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <path
        d="M5 6.5C5 5.67 5.67 5 6.5 5H11V17.5H6.8C5.8 17.5 5 16.7 5 15.7V6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M19 6.5C19 5.67 18.33 5 17.5 5H13V17.5H17.2C18.2 17.5 19 16.7 19 15.7V6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="11" r="0.7" fill="currentColor" />
    </SvgShell>
  );
}

/** Sun-key / open lock + light — Unlocking Happiness */
export function UnlockingHappinessIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <circle cx="12" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 4.2V2.8M12 17.2V15.8M4.8 10H3.4M20.6 10H19.2M6.5 4.5L5.5 3.5M17.5 4.5L18.5 3.5M6.5 15.5L5.5 16.5M17.5 15.5L18.5 16.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10.2 14.8V16.2C10.2 17.2 11 18 12 18C13 18 13.8 17.2 13.8 16.2V14.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </SvgShell>
  );
}

/** Unlock + ascending chevron — Unlocking Potential */
export function UnlockingPotentialIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <rect x="7" y="11" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 11V8.8C9 7.12 10.34 5.8 12 5.8C13.1 5.8 14.05 6.4 14.55 7.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.1" fill="currentColor" />
      <path
        d="M9.5 4.2L12 2.2L14.5 4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgShell>
  );
}

/** Target with check — Perfect & Real Goals */
export function PerfectRealGoalsIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <path
        d="M15.2 8.2L16.6 7.4L17.8 9.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgShell>
  );
}

/** Node + human silhouette — AI-Trained Years */
export function AiTrainedYearsIcon(props: AchievementIconProps) {
  return (
    <SvgShell {...props}>
      <circle cx="12" cy="7.2" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 18.5C7.8 15.6 9.6 14 12 14C14.4 14 16.2 15.6 16.5 18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="5.2" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18.8" cy="10.5" r="1.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="6.5" cy="16.8" r="1.1" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.5" cy="16.8" r="1.1" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10 8.8L6.2 10.1M14 8.8L17.8 10.1M10.5 15.2L7.4 16.4M13.5 15.2L16.6 16.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </SvgShell>
  );
}

export const ACHIEVEMENT_ICONS: Record<string, React.ComponentType<AchievementIconProps>> = {
  "cured-mental-health": CuredMentalHealthIcon,
  innovation: InnovationIcon,
  "learning-mastery": LearningMasteryIcon,
  "unlocking-happiness": UnlockingHappinessIcon,
  "unlocking-potential": UnlockingPotentialIcon,
  "perfect-real-goals": PerfectRealGoalsIcon,
  "ai-trained-years": AiTrainedYearsIcon,
};
