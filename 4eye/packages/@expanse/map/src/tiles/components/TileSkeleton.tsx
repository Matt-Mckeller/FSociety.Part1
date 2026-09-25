import React from "react"
import { Box, Skeleton } from "@mui/material"

/**
 * Skeleton placeholder for loading tiles
 */
export function TileSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
      }}
    >
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="90%" />
    </Box>
  )
}
