"use client"

import React, { type ReactNode } from "react"
import { Box, Typography, alpha } from "@mui/material"

export interface DemoPageScaffoldProps {
  title: string
  subtitle?: string
  /** Background tint color (the tile's inactive color works well). */
  color: string
  /** Optional accent color used for the title underline (defaults to a darker shade). */
  accent?: string
  children?: ReactNode
}

/**
 * Lightweight scaffold for the FullHud demo pages. Full-bleed colored panel
 * with a tinted heading, breadcrumbs, and a body slot. Intended only for
 * Storybook demos.
 */
export function DemoPageScaffold({ title, subtitle, color, accent, children }: DemoPageScaffoldProps) {
  const titleAccent = accent ?? color
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: alpha(color, 0.10),
      }}
    >
      <Box
        sx={{
          px: 4,
          pt: 4,
          pb: 2,
          borderBottom: `2px solid ${alpha(titleAccent, 0.35)}`,
          bgcolor: alpha(color, 0.16),
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: titleAccent,
            fontWeight: 700,
            letterSpacing: 1.5,
            fontSize: "0.7rem",
          }}
        >
          Demo Page
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: titleAccent,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            mt: 0.5,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 1, maxWidth: 720 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 4,
          // Tinted body background that matches the page color, slightly
          // softer than the header so the divider still reads.
          bgcolor: alpha(color, 0.08),
          backgroundImage: `radial-gradient(circle at 0% 0%, ${alpha(color, 0.18)}, transparent 60%), radial-gradient(circle at 100% 100%, ${alpha(titleAccent, 0.14)}, transparent 55%)`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
