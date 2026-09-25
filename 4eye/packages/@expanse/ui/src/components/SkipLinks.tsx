/**
 * Accessible Skip Links Component
 * 
 * Provides keyboard-accessible skip navigation for main layout regions
 */

"use client"

import React from "react"
import { Box, Link, type SxProps, type Theme } from "@mui/material"
import { Z_INDEX } from "@expanse/theme"
import type { SkipLinkProps } from "../utils/accessibility"

export interface SkipLinksProps {
  links?: SkipLinkProps[]
  sx?: SxProps<Theme>
}

/**
 * Skip links for keyboard navigation accessibility.
 * 
 * Renders visually hidden links that become visible on keyboard focus,
 * allowing keyboard users to quickly jump to main content areas.
 * 
 * Meets WCAG 2.1 AA success criterion 2.4.1 (Bypass Blocks).
 * 
 * @example
 * ```tsx
 * <SkipLinks
 *   links={[
 *     { href: "#main-content", label: "Skip to main content" },
 *     { href: "#navigation", label: "Skip to navigation" },
 *   ]}
 * />
 * ```
 */
export function SkipLinks({
  links = [
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
  ],
  sx,
}: SkipLinksProps) {
  return (
    <Box
      component="nav"
      aria-label="Skip links"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: Z_INDEX.CHROME + 100,
        ...sx,
      }}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          sx={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            "&:focus": {
              position: "static",
              width: "auto",
              height: "auto",
              overflow: "visible",
              display: "block",
              padding: "8px 16px",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              textDecoration: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  )
}

export default SkipLinks
