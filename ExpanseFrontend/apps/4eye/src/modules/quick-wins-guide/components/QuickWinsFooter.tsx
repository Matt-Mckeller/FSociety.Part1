"use client"

import { Box, Typography } from "@mui/material"

export function QuickWinsFooter() {
  return (
    <Box
      sx={{
        bgcolor: "#E3F2FD",
        py: 3,
        mt: 4,
        textAlign: "center",
        borderTop: "2px solid #4285f4",
      }}
      className="qw-no-print"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://www.expanseedu.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4285f4",
            textDecoration: "none",
            fontWeight: 500,
            paddingRight: "16px",
            borderRight: "2px solid #90CAF9",
          }}
        >
          © Expanse Edu Corp
        </a>
        <a
          href="https://www.expanseservices.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4285f4",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Expanse Services
        </a>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "#1976D2", fontSize: "0.875rem", mt: 0.5 }}
      >
        Training Guide - Optimized for Learning
      </Typography>
    </Box>
  )
}
