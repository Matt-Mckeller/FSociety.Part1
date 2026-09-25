"use client"
// Expected use on desktop header view, opens popover on hover
// and displays nestedRoutes in popover
// Closes popover on hover away or navigation

// Probably could convert to menu from mui, not sure why I built this
// likely has more accessibility features also includes ripples etc which I could add

// Note: The dot below does not look good with dropdown
// Decided to remove this functionality from this component
// tbd if it is removed from others

// Likely going to end up moving this ( or creating a separate copy as a base )
// to a separate component in the project itself for higher customization options

import { styled } from "@mui/material/styles"
import { SxProps, Theme } from "@mui/system"
import { Box, Divider, Link, Popover, Typography } from "@mui/material"
import React, { useContext, useRef, useState } from "react"

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation"
import {
  AnalyticsContext,
  REGISTER_ANALYTICS_EVENT,
  NestedRoute,
  removeNonLetters,
} from "expanse.ui/application"
import { useMutation } from "@apollo/client"
import { ExpandMore } from "@mui/icons-material"

const NavLinkStyled: any = styled(Link, {
  shouldForwardProp: (prop) => prop !== "boldweight",
})(({ theme, boldweight }: any) => ({
  textTransform: "uppercase",
  color: theme.palette.text.primary,
  fontWeight: boldweight ? "700" : "400",
  cursor: "pointer",
}))

interface LinkInputProps {
  text?: string
  justifyContent?: string
  onNavigate?: () => void
  eventName: string
  logEvent?: boolean
  nestedRoutes: NestedRoute[]
  popoverTitle?: string
  // todo figure out the best mui type for adding only the styling properties, the ones
  // I was experimenting with were too many added params
  sx?: SxProps<Theme>
}

export function NestableNavLink({
  onNavigate: onNavigateCallback,
  eventName,
  text = "Default",
  justifyContent = "center",
  logEvent = true,
  nestedRoutes,
  ...props
}: LinkInputProps) {
  const routerPath = usePathname()
  const router = useRouter()
  const popoverAnchorRef = useRef<Element>(null)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const hasActiveNestedRoute = nestedRoutes.reduce(
    (accumulator, nestedRoute: NestedRoute) => {
      if (accumulator === true) {
        return true
      }

      const navPath = `/${nestedRoute.prefix}/${nestedRoute.path}`
      return navPath === routerPath
    },
    false,
  )

  const groupedRoutes = nestedRoutes.reduce((accumulator, current) => {
    const {
      config: { navSectionTitle },
    } = current
    if (!accumulator[navSectionTitle]) {
      accumulator[navSectionTitle] = []
    }
    accumulator[navSectionTitle].push(current)
    return accumulator
  }, {})

  // This regular expression matches any character that is not a Unicode letter.
  const popOverId = "nestableNavLinkPopover-" + removeNonLetters(text)

  const openPopover = () => {
    setPopoverOpen(true)
  }
  const handleClose = (e: any) => {
    e.preventDefault()
    setPopoverOpen(false)
  }
  const performNavigate: any = (e: any, nestedRoute: NestedRoute) => {
    const navPath = `/${nestedRoute.prefix}/${nestedRoute.path}`
    e.preventDefault()
    if (logEvent) {
      registerAnalyticsEvent({
        variables: {
          event: eventName || "navigate",
          ...analyticsEventContext,
          params: JSON.stringify({
            path: navPath,
          }),
        },
      })
    }
    setPopoverOpen(false)
    router.push(navPath)
    if (onNavigateCallback) {
      onNavigateCallback()
    }
  }

  return (
    <Box position="relative" display="flex" onMouseEnter={openPopover}>
      <NavLinkStyled
        type="button"
        onClick={openPopover}
        sx={props?.sx}
        boldweight={hasActiveNestedRoute}
        ref={popoverAnchorRef}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {text}
          {<ExpandMore />}
        </Box>
      </NavLinkStyled>
      {
        // Ensure that the anchor reference has been registered
        // to avoid an error
        popoverAnchorRef.current && (
          <Popover
            id={popOverId}
            open={popoverOpen}
            anchorEl={popoverAnchorRef.current}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              onMouseLeave={handleClose}
              display="flex"
              flexDirection="column"
              p={4}
            >
              {Object.keys(groupedRoutes).map((groupName, index) => {
                const routes = groupedRoutes[groupName]
                const navSectionTitle = groupName
                const result: React.ReactNode[] = []

                if (navSectionTitle) {
                  result.push(
                    <Box
                      key={`${navSectionTitle}-title`}
                      mt={index > 0 ? 2 : 0}
                    >
                      <Typography variant="h6" lineHeight={1}>
                        {navSectionTitle}
                      </Typography>
                      <Divider
                        sx={(theme) => ({
                          my: 2,
                          backgroundColor: theme.palette.text.primary,
                          width: "100%",
                        })}
                      />
                    </Box>,
                  )
                }

                routes.forEach((nestedRoute) => {
                  result.push(
                    <Link
                      onClick={(e) => performNavigate(e, nestedRoute)}
                      href={`/${nestedRoute.prefix}/${nestedRoute.path}`}
                      sx={{ cursor: "pointer" }}
                      mb={1}
                      key={`nestedRouteStandardLink-${removeNonLetters(nestedRoute.text)}`}
                    >
                      {nestedRoute.text}
                    </Link>,
                  )
                })

                return result
              })}
            </Box>
          </Popover>
        )
      }
    </Box>
  )
}
