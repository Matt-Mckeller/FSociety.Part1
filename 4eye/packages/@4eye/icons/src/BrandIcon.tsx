import * as React from "react";

/** Shared props for every brand icon. Icons paint with `currentColor`. */
export interface BrandIconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /** Square size in px (sets width + height). Defaults to 24. */
  size?: number;
  title?: string;
}

/**
 * BrandIcon — the common SVG shell for all custom 4eye icons.
 *
 * Children are the icon's paths, drawn on a 24×24 viewBox using
 * `currentColor` so the icon tints with the surrounding text color.
 */
export const BrandIcon = React.forwardRef<SVGSVGElement, BrandIconProps & { children: React.ReactNode }>(
  function BrandIcon({ size = 24, title, children, ...props }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        role={title ? "img" : "presentation"}
        aria-hidden={title ? undefined : true}
        focusable="false"
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    );
  },
);
