"use client"
import React, { useContext } from "react"
import { Box, Button, useTheme, SxProps } from "@mui/material"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import { ContactDisplayContext } from "../context"
import { ExpanseAnalyticsEvent } from "../../application/types"
import { Config } from "../"
import {
  AnalyticsContext,
  REGISTER_ANALYTICS_EVENT,
} from "expanse.ui/application"
import { useMutation } from "@apollo/client"

export type CalendlyCTAButtonProps = {
  eventName?: ExpanseAnalyticsEvent
  text?: string
  icon?: React.ReactNode
  variant?: "contained" | "outlined" | "text"
  sx?: SxProps
}

export function CalendlyCTAButton({
  eventName = "contact-calendly-click",
  text,
  icon = <EventAvailableIcon fontSize="medium" />,
  variant = "contained",
  sx = {},
}: CalendlyCTAButtonProps) {
  const { dictionary } = useContext(ContactDisplayContext)
  const theme = useTheme()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const onClickHandler = () => {
    registerAnalyticsEvent({
      variables: {
        event: eventName,
        ...analyticsEventContext,
        params: null,
      },
    })
    // router.push(Config.discoveryCallUrl)
  }

  const customStyling =
    variant === "contained"
      ? {
          backgroundColor: "primary",
          "&:hover": {
            background: theme.palette.primary.highSaturation,
          },
          flexGrow: 1,
        }
      : {}

  return (
    <Button
      variant={variant}
      component="a"
      href={Config.discoveryCallUrl}
      target="_blank"
      color="primary"
      sx={{ ...sx, ...customStyling }}
      onClick={onClickHandler}
      endIcon={icon}
    >
      {text ? text : dictionary.calendlyCTAText}
    </Button>
  )
}
