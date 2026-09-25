"use client"
import { Box, Button, Typography } from "@mui/material"
import { ReactNode, useEffect } from "react"
import { useState } from "react"

export const ApplicationErrorBoundaryLogger = ({
  children,
}: {
  children: ReactNode
}) => {
  const [showErrorDisplay, setShowErrorDisplay] = useState(false)
  // Likely the error display is handled in another manner such as with next.js or apollo.
  // This is primarily for logging
  // Since context can not make api calls this is a component

  useEffect(() => {
    const handleError = (e) => {
      // Todo add api calls for saving error log
      if (process.env.NODE_ENV === "production") {
        console.log("An uncaught error has ocurred in production.", { e })
      } else {
        console.log(
          "An uncaught error has ocurred in a non production environment.",
          { e },
        )
        setShowErrorDisplay(true)
        throw e
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("error", handleError)

      return () => {
        window.removeEventListener("error", handleError)
      }
    }
    return undefined
  }, [])

  if (showErrorDisplay) {
    return (
      <Box
        height="100%"
        minHeight="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="body1" color="error">
          An uncaught error has occurred, check console for details.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setShowErrorDisplay(false)
          }}
        >
          Clear Error
        </Button>
      </Box>
    )
  }
  return children
}
