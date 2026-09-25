"use client"
import React, { useContext } from "react"
import { Box, Button, useTheme, SxProps } from "@mui/material"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import { UserContext } from "../../user"
import { AuthDisplayContext } from ".."
import { ExpanseAnalyticsEvent } from "../../application/types"
import { AnalyticsContext } from "../../application"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"

export type AuthCTAButtonProps = {
  // could update to match AuthScreenRoutes / AuthFormScreen.SignIn | AuthFormScreen.SignUp>
  authDisplayType?: "signIn" | "signUp"
  authenticatedText?: string
  unauthenticatedText?: string
  eventName: ExpanseAnalyticsEvent
  variant?: "contained" | "outlined" | "text"
  sx?: SxProps
}

// todo, content provider for sign up and sign in text
export function AuthCTAButton({
  authDisplayType = "signUp",
  authenticatedText,
  unauthenticatedText,
  eventName,
  variant = "contained",
  sx = {},
}: AuthCTAButtonProps) {
  const { user } = useContext(UserContext)
  const theme = useTheme()
  const { handleAuthNavigation } = useContext(AuthDisplayContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  if (authDisplayType !== "signUp" && authDisplayType !== "signIn") {
    throw new Error("Invalid auth display type")
  }

  const signUpText = "Sign Up"
  const signInText = "Sign In"
  const defaultText = signUpText

  const _unAuthenticatedText = unauthenticatedText
    ? unauthenticatedText
    : authDisplayType === "signIn"
      ? signInText
      : authDisplayType === "signUp"
        ? signUpText
        : defaultText
  const _authenticatedText = authenticatedText
    ? authenticatedText
    : "My Account"

  const text = user && user.id ? _authenticatedText : _unAuthenticatedText

  const onClickHandler = () => {
    handleAuthNavigation(authDisplayType)
    registerAnalyticsEvent({
      variables: {
        event: eventName,
        ...analyticsEventContext,
        params: JSON.stringify({ type: authDisplayType }),
      },
    })
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
      color="primary"
      sx={{
        ...customStyling,
        ...sx,
      }}
      // component="a"
      onClick={onClickHandler}
      endIcon={<PowerSettingsNewIcon fontSize="medium" />}
    >
      {text}
    </Button>
  )
}
