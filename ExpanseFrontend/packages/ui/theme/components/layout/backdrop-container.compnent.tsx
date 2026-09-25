"use client"
import React from "react"
import { Box } from "@mui/system"

// Currently this is only used with the loading spinner,
// trying to utilize mui backdrop instead. test that out
export function BackdropContainer({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      minWidth="100%"
      minHeight="100%"
      display="flex"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      zIndex="9999"
      flexDirection="column"
      sx={{
        backgroundColor: "background.backdrop",
      }}
    >
      {children}
    </Box>
  )
}
