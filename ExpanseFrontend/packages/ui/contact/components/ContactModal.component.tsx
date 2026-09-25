"use client"
import { Dialog, DialogTitle, Box, Typography, Link } from "@mui/material"

import React, { useContext } from "react"
import { ContactForm } from "./screens/ContactForm.component"
import { AnalyticsContext } from "../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import { ContactDisplayContext } from "../context/ContactDisplay.context"
import { CloseModalButton } from "expanse.ui/theme"

export function ContactModal() {
  const { isModalOpen, exitContact, dictionary } = useContext(
    ContactDisplayContext,
  )
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  const handleClose = (event?: any, reason?: string) => {
    if (reason === "backdropClick") {
      // Do nothing
    } else {
      exitContact()
      // todo move to context or keep here? if I remember correctly
      // I had to move event registration out of context so waiting to see
      registerAnalyticsEvent({
        variables: {
          event: "exit-contact",
          analyticsEventContext,
          params: null,
        },
      })
    }
  }

  return (
    <Dialog onClose={handleClose} open={isModalOpen}>
      <DialogTitle id="contact-dialog-title">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          width="100%"
          height="100%"
          position="relative"
        >
          <Box textAlign="center">
            <Typography component="h3">
              {dictionary?.title || "Unknown"}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: -7,
            }}
          >
            <CloseModalButton handleClose={handleClose} />
          </Box>
        </Box>
      </DialogTitle>
      <Box
        overflow="scroll"
        sx={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 8,
          width: "483.7px",
        }}
      >
        <ContactForm />
      </Box>
    </Dialog>
  )
}
