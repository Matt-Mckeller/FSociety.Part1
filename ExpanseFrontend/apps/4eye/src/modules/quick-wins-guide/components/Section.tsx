"use client"

import { Box, Typography } from "@mui/material"
import { ReactNode } from "react"
import { useScrollAnimation } from "../hooks"

export interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Box
      id={id}
      ref={ref}
      className={isVisible ? "qw-fade-in-section" : ""}
      sx={{ mb: 4, scrollMarginTop: "80px" }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          pb: 1,
          fontWeight: 600,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}
