"use client";

import { SvgIcon, type SvgIconProps } from "@mui/material";

/**
 * Aim reticle — the primary cursor of a prompt.
 *
 * Concentric ring + inner mark + crosshair ticks. Reads as a directed
 * action, not as a person. Used on the Aim slot and on the chip that
 * currently holds the cursor.
 */
export function AimReticle(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <circle cx="12" cy="12" r="2.15" />
      <path
        d="M12 2.4v3.4M12 18.2v3.4M2.4 12h3.4M18.2 12h3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}

/**
 * Hollow-center crowd — who else we are targeting and trying to fit in.
 *
 * People sit on the ring. The center stays empty because the cursor
 * lives on Aim, not here.
 */
export function FitHalo(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="5.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.45"
      />
      <circle cx="12" cy="4.6" r="1.55" />
      <circle cx="5.35" cy="8.7" r="1.35" opacity="0.88" />
      <circle cx="18.65" cy="8.7" r="1.35" opacity="0.88" />
      <circle cx="6.4" cy="17.15" r="1.25" opacity="0.72" />
      <circle cx="17.6" cy="17.15" r="1.25" opacity="0.72" />
    </SvgIcon>
  );
}
