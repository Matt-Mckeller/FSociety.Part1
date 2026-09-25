"use client"
import React, { useContext, useRef } from "react"
import { Box, Button, useTheme } from "@mui/material"
// import gsap from 'gsap'
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"

import { ContactDisplayContext } from "../context"
import { ExpanseAnalyticsEvent } from "../../application/types"
import {
  AnalyticsContext,
  REGISTER_ANALYTICS_EVENT,
} from "expanse.ui/application"
import { useMutation } from "@apollo/client"

export type ContactCTAButtonProps = {
  eventName: ExpanseAnalyticsEvent
  displayIcon?: boolean
  variant?: "text" | "outlined" | "contained"
  textVariant?: "touch" | "contact" // reflects which dictionary key to reference for button text
}
export function ContactCTAButton({
  eventName,
  displayIcon = false,
  variant = "text",
  textVariant = "contact",
}: ContactCTAButtonProps) {
  const { dictionary, openContact } = useContext(ContactDisplayContext)
  const theme = useTheme()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  if (textVariant !== "touch" && textVariant !== "contact") {
    throw new Error("Invalid text variant option for Contact CTA.")
  }
  const textToDisplay =
    textVariant === "touch"
      ? dictionary.contactCTATouchText
      : textVariant === "contact"
        ? dictionary.contactCTAText
        : ""

  const onClickHandler = () => {
    registerAnalyticsEvent({
      variables: {
        event: eventName,
        ...analyticsEventContext,
        params: null,
      },
    })
    openContact()
  }

  return (
    <Button
      variant={variant || "text"}
      color="primary"
      sx={
        variant === "contained"
          ? {
              backgroundColor: "primary",
              "&:hover": {
                background: theme.palette.primary.highSaturation,
              },
            }
          : {}
      }
      onClick={onClickHandler}
      endIcon={displayIcon && <PowerSettingsNewIcon fontSize="medium" />}
    >
      {textToDisplay}
    </Button>
  )
}
