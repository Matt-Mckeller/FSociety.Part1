"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Alert, Snackbar as MuiSnackbar, Button, Stack } from "@mui/material"
import React, { useState } from "react"

/**
 * Snackbar component for displaying brief messages to users.
 * Supports different alert types: success, error, warning, and info.
 * 
 * Note: This is a visual demonstration. The actual component uses LayoutContext.
 */
const meta: Meta = {
  title: "Theme/Layout/Snackbar",
  parameters: {
    layout: "centered",
  },
}

export default meta

// Demo component that manages its own state
const SnackbarDemo = ({
  message = "This is a snackbar message",
  severity = "info" as "success" | "error" | "warning" | "info",
  autoHide = false,
}) => {
  const [open, setOpen] = useState(true)

  return (
    <Box sx={{ position: "relative", height: 100, width: 400 }}>
      <MuiSnackbar
        open={open}
        autoHideDuration={autoHide ? 3000 : null}
        onClose={() => setOpen(false)}
        sx={{ position: "relative", transform: "none", left: 0, bottom: 0 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackbar>
      {!open && (
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Show Snackbar
        </Button>
      )}
    </Box>
  )
}

export const Success: StoryObj = {
  name: "Success",
  render: () => (
    <SnackbarDemo 
      message="Operation completed successfully!" 
      severity="success" 
    />
  ),
}

export const Error: StoryObj = {
  name: "Error",
  render: () => (
    <SnackbarDemo 
      message="An error occurred. Please try again." 
      severity="error" 
    />
  ),
}

export const Warning: StoryObj = {
  name: "Warning",
  render: () => (
    <SnackbarDemo 
      message="Please review your input before continuing." 
      severity="warning" 
    />
  ),
}

export const Info: StoryObj = {
  name: "Info",
  render: () => (
    <SnackbarDemo 
      message="New updates are available." 
      severity="info" 
    />
  ),
}

export const AllTypes: StoryObj = {
  name: "All Alert Types",
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <Alert severity="success" onClose={() => {}}>
        Success — Operation completed!
      </Alert>
      <Alert severity="error" onClose={() => {}}>
        Error — Something went wrong.
      </Alert>
      <Alert severity="warning" onClose={() => {}}>
        Warning — Please check your input.
      </Alert>
      <Alert severity="info" onClose={() => {}}>
        Info — Here's some information.
      </Alert>
    </Stack>
  ),
}

export const Interactive: StoryObj = {
  name: "Interactive Demo",
  render: () => {
    const InteractiveDemo = () => {
      const [open, setOpen] = useState(false)
      const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("info")
      const [message, setMessage] = useState("")

      const showSnackbar = (type: "success" | "error" | "warning" | "info", msg: string) => {
        setSeverity(type)
        setMessage(msg)
        setOpen(true)
      }

      return (
        <Box sx={{ width: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Trigger Snackbars
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
            <Button 
              variant="contained" 
              color="success" 
              size="small"
              onClick={() => showSnackbar("success", "Success! Your changes have been saved.")}
            >
              Success
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              size="small"
              onClick={() => showSnackbar("error", "Error! Failed to save changes.")}
            >
              Error
            </Button>
            <Button 
              variant="contained" 
              color="warning" 
              size="small"
              onClick={() => showSnackbar("warning", "Warning! Please review your input.")}
            >
              Warning
            </Button>
            <Button 
              variant="contained" 
              color="info" 
              size="small"
              onClick={() => showSnackbar("info", "Info: New features available!")}
            >
              Info
            </Button>
          </Stack>
          <MuiSnackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: "100%" }}>
              {message}
            </Alert>
          </MuiSnackbar>
        </Box>
      )
    }

    return <InteractiveDemo />
  },
}

export const LongMessage: StoryObj = {
  name: "Long Message",
  render: () => (
    <Box sx={{ width: 500 }}>
      <Alert severity="info" onClose={() => {}}>
        This is a longer message that demonstrates how the snackbar handles extended content. 
        It will wrap to multiple lines if necessary to display the complete message.
      </Alert>
    </Box>
  ),
}

export const Positioning: StoryObj = {
  name: "Position Examples",
  render: () => (
    <Box sx={{ 
      position: "relative", 
      height: 300, 
      width: 500, 
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 1,
    }}>
      <Typography 
        variant="caption" 
        sx={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)",
          color: "text.secondary",
        }}
      >
        Application Area
      </Typography>
      
      {/* Top Center */}
      <Box sx={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)" }}>
        <Alert severity="info" sx={{ py: 0.5, fontSize: "0.75rem" }}>
          Top Center
        </Alert>
      </Box>
      
      {/* Bottom Center (default) */}
      <Box sx={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)" }}>
        <Alert severity="success" sx={{ py: 0.5, fontSize: "0.75rem" }}>
          Bottom Center (Default)
        </Alert>
      </Box>
      
      {/* Bottom Left */}
      <Box sx={{ position: "absolute", bottom: 8, left: 8 }}>
        <Alert severity="warning" sx={{ py: 0.5, fontSize: "0.75rem" }}>
          Bottom Left
        </Alert>
      </Box>
      
      {/* Bottom Right */}
      <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
        <Alert severity="error" sx={{ py: 0.5, fontSize: "0.75rem" }}>
          Bottom Right
        </Alert>
      </Box>
    </Box>
  ),
}
