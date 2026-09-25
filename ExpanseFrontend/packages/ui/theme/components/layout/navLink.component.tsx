"use client"
// For use as a standard header navigation link

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { styled } from "@mui/material/styles"
import { SxProps, Theme } from "@mui/system"
import { Box, Typography, ButtonBase, Link, Button } from "@mui/material"
import React, { useContext } from "react"

import { usePathname, useRouter } from "next/navigation"
import {
  AnalyticsContext,
  REGISTER_ANALYTICS_EVENT,
} from "expanse.ui/application"
import { useMutation } from "@apollo/client"

const ActiveDot = styled(Box)(({ theme }) => ({
  height: "6px",
  width: "6px",
  minWidth: "6px",
  maxWidth: "6px",
  maxHeight: "6px",
  minHeight: "6px",
  background: theme.palette.text.primary,
  borderRadius: "50px",
}))

const CurrentPageLinkText = styled(Typography)(({ theme }) => ({
  fontSize: ".875rem",
  whiteSpace: "nowrap",
}))

const PREFIX = "ExpanseNavLink"
const classes = {
  whiteRipple: `${PREFIX}-whiteRipple`,
}
const NavLinkStyled: any = styled(Link, {
  shouldForwardProp: (prop) => prop !== "boldweight",
})(({ theme, boldweight }: any) => ({
  textTransform: "uppercase",
  color: theme.palette.text.primary,
  fontWeight: boldweight ? "700" : "400",
  cursor: "pointer",
}))

interface LinkInputProps {
  path: string
  text?: string
  justifyContent?: string
  useDotBelow?: boolean
  onNavigate?: () => void
  eventName: string
  logEvent?: boolean
  // todo figure out the best mui type for adding only the styling properties, the ones
  // I was experimenting with were too many added params
  sx?: SxProps<Theme>
}

export function NavLink({
  path,
  onNavigate: onNavigateCallback,
  eventName,
  text = "Default",
  justifyContent = "center",
  useDotBelow = false,
  logEvent = true,
  ...props
}: LinkInputProps) {
  const routerPath = usePathname()
  const linksToCurrentPage = path === routerPath
  const router = useRouter()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const performNavigate: any = (e: any) => {
    e.preventDefault()
    if (logEvent) {
      registerAnalyticsEvent({
        variables: {
          event: eventName || "navigate",
          ...analyticsEventContext,
          params: null,
        },
      })
    }
    router.push(path)
    if (onNavigateCallback) {
      onNavigateCallback()
    }
  }

  return (
    <Box position="relative" display="flex">
      {useDotBelow && linksToCurrentPage && (
        <Box
          display="flex"
          justifyContent="center"
          position="absolute"
          bottom={-6}
          width="100%"
        >
          <ActiveDot />
        </Box>
      )}
      <NavLinkStyled
        href={path}
        onClick={performNavigate}
        sx={props?.sx}
        boldweight={linksToCurrentPage}
      >
        {text}
      </NavLinkStyled>
    </Box>
  )
}
