"use client";

/**
 * One mark per product, drawn to the same rules as `@4eye/icons`: a 24×24
 * viewBox, stroked in `currentColor`, no fill. Used on the compass bezel
 * slots (small) and enlarged in the hub on focus, so each has to stay
 * readable at ~16px and at 60px and distinguishable from the others at a glance.
 *
 * Stroked rather than filled because the hub sits over the cycling rings —
 * a solid shape reads as a hole punched in the animation.
 */

import { Box } from "@mui/material";

export interface AppIconProps {
  size?: number;
}

function Frame({ size = 24, children }: AppIconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** 4eye — an eye. The name is literal, so the mark should be too. */
function FourEyeIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M1.7 12S5.4 5.5 12 5.5 22.3 12 22.3 12 18.6 18.5 12 18.5 1.7 12 1.7 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </Frame>
  );
}

/** Matthew McKeller — the person the products orbit. */
function MatthewIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.2 19.6c1.3-3.8 3.6-5.6 6.8-5.6s5.5 1.8 6.8 5.6" />
    </Frame>
  );
}

/** 4up — four businesses run from one place, rising. */
function FourUpIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M4 20V13.5" />
      <path d="M9.3 20V9.5" />
      <path d="M14.7 20V11.5" />
      <path d="M20 20V5" />
      <path d="M2.5 20h19" />
    </Frame>
  );
}

/** Expanse EDU — a page opening outward. Learning, not a mortarboard. */
function ExpanseEduIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M12 7.2C10.2 5.8 7.9 5.2 4.5 5.2v12c3.4 0 5.7.6 7.5 2 1.8-1.4 4.1-2 7.5-2v-12c-3.4 0-5.7.6-7.5 2Z" />
      <path d="M12 7.2v12" />
    </Frame>
  );
}

/** 4wing — a pair of wings, and the companion between them. */
function FourWingIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M11 12C8.6 9.1 5.9 7.7 2.8 7.9c-.3 3.6 1 6.4 3.9 8.4" />
      <path d="M13 12c2.4-2.9 5.1-4.3 8.2-4.1.3 3.6-1 6.4-3.9 8.4" />
      <circle cx="12" cy="12" r="2.1" />
    </Frame>
  );
}

/** Expanse Services — brackets around work handed over. */
function ExpanseServicesIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M8.5 4.5C5.5 4.5 5.5 9 5.5 12s0 7.5 3 7.5" />
      <path d="M15.5 4.5c3 0 3 4.5 3 7.5s0 7.5-3 7.5" />
      <path d="M9.8 12h4.4" />
    </Frame>
  );
}

/**
 * The Expanse mark, at rest in the compass hub.
 *
 * Drawn here rather than using `ExpanseLogoV5` from brand-core. That component
 * is built for large display: at 54px every variant rendered the same dark
 * sphere, sat off-centre in its box, and carried a stray secondary shape. This
 * is the same idea — an eye inside its orbit — in the stroked language the five
 * product marks already use, so the hub reads as one set.
 */
export function ExpanseMark({ size = 24 }: AppIconProps) {
  return (
    <Frame size={size}>
      <circle cx="12" cy="12" r="5.1" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10.4" ry="4.4" transform="rotate(-27 12 12)" />
    </Frame>
  );
}

/**
 * A product's mark set into a page.
 *
 * Used on the grid tiles. The document outline says the same thing about every
 * card — that behind each of these there is a written record, not just a link —
 * while the mark inside says which product it is. A tile with no mark still
 * gets the page, so the grid keeps one rhythm.
 */
export function DocumentedIcon({
  id,
  size = 40,
  accent,
}: {
  id: string;
  size?: number;
  accent: string;
}) {
  const Icon = APP_ICONS[id];
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        flex: "none",
        color: accent,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
        style={{ opacity: 0.42 }}
      >
        {/* A page with its corner turned. */}
        <path d="M6 2.6h7.6L19.4 8.4v13H6z" />
        <path d="M13.6 2.6v5.8h5.8" />
      </svg>

      {Icon && (
        <Box
          sx={{
            position: "absolute",
            left: "52%",
            top: "58%",
            transform: "translate(-50%, -50%)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon size={Math.round(size * 0.46)} />
        </Box>
      )}
    </Box>
  );
}

/** Pur Meow — cat mark with soft purr waves; stewardship and name still open. */
function PurMeowIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M7.2 9.2 L5.4 5.6 L9.2 7.4 Z" />
      <path d="M16.8 9.2 L18.6 5.6 L14.8 7.4 Z" />
      <circle cx="12" cy="13" r="6.2" />
      <circle cx="9.6" cy="12.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="12.2" r="1.1" fill="currentColor" stroke="none" />
      <path d="M10.4 15.2 C11.2 16.2 12.8 16.2 13.6 15.2" />
      <path d="M4.2 18.6 C5.6 17.4 7.2 17.4 8.6 18.6" />
      <path d="M15.4 18.6 C16.8 17.4 18.4 17.4 19.8 18.6" />
    </Frame>
  );
}

/** Privacy & security — a shield. */
function PrivacySecurityIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M12 3.2 L19.2 6.2 V11.6 C19.2 16.2 15.8 19.6 12 20.8 C8.2 19.6 4.8 16.2 4.8 11.6 V6.2 Z" />
      <path d="M9.2 12.1 L11.1 14 L15 9.8" />
    </Frame>
  );
}

/** Command Center — crossed bearings, the planning surface. */
function CommandCenterIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 3.8v16.4" />
      <path d="M3.8 12h16.4" />
      <circle cx="12" cy="12" r="2.2" />
    </Frame>
  );
}

/** Documentation — a page with lines. */
function DocsIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <path d="M7 3.5h7.2L17.5 7v13.5H7z" />
      <path d="M14.2 3.5V7h3.3" />
      <path d="M9.2 11h5.6" />
      <path d="M9.2 14.2h5.6" />
      <path d="M9.2 17.4h3.8" />
    </Frame>
  );
}

/** Media — a frame with a play mark; photos and video. */
function MediaIcon(props: AppIconProps) {
  return (
    <Frame {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M10.2 9.2 L15.2 12 L10.2 14.8 Z" />
    </Frame>
  );
}

/** Keyed by registry id. A product with no mark falls back to the wordmark. */
export const APP_ICONS: Record<string, (props: AppIconProps) => React.JSX.Element> = {
  "4eye": FourEyeIcon,
  "matthew-mckeller": MatthewIcon,
  "4up": FourUpIcon,
  "pur-meow": PurMeowIcon,
  "expanse-edu": ExpanseEduIcon,
  "4wing": FourWingIcon,
  "expanse-services": ExpanseServicesIcon,
  "sample-privacy": PrivacySecurityIcon,
  "command-center": CommandCenterIcon,
  docs: DocsIcon,
  media: MediaIcon,
  photos: MediaIcon,
  videos: MediaIcon,
};
