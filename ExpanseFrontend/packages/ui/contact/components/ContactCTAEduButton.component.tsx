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

export type ContactCTAEduButtonProps = {
  eventName: ExpanseAnalyticsEvent
  displayIcon?: boolean
  variant?: "text" | "outlined" | "contained"
}
export function ContactCTAEduButton({
  eventName,
  displayIcon = false,
  variant = "text",
}: ContactCTAEduButtonProps) {
  const { dictionary, openContact } = useContext(ContactDisplayContext)
  const theme = useTheme()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const textToDisplay = dictionary.contactCTAEdu

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
