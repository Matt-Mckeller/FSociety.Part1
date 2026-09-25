"use client"
import { Alert, Snackbar as MuiSnackbar } from "@mui/material"

import React, { useContext } from "react"
import { LayoutContext } from "expanse.ui/application"

export function Snackbar() {
  const { snackbarMessage, snackbarOpen, closeSnackbar, alertType } =
    useContext(LayoutContext)

  return (
    <MuiSnackbar
      open={snackbarOpen}
      autoHideDuration={null}
      onClose={closeSnackbar}
      sx={{ mx: 1 }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={closeSnackbar} severity={alertType}>
        {snackbarMessage}
      </Alert>
    </MuiSnackbar>
  )
}
