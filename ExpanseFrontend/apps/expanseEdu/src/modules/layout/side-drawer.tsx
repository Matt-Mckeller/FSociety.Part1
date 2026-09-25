import {
  Box,
  Divider,
  Theme,
  Typography,
  List,
  ListItem,
  Drawer,
  Button,
  useTheme,
} from "@mui/material"
import { ExpanseLogo } from "expanse.dynamicAssets/logo/ExpanseLogo.component"
import { useRouter } from "next/navigation"
import React, { useContext } from "react"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  AnalyticsContext,
  Route,
  isRouteWithNesting,
} from "expanse.ui/application"
import { ExpandableNavAccordion, NavLink } from "expanse.ui/theme"
import { AuthDisplayContext, AuthSessionContext } from "expanse.ui/auth"
import { REGISTER_ANALYTICS_EVENT } from "expanse.ui/application"
import { useMutation } from "@apollo/client"
import { UserContext } from "expanse.ui/user"

interface SideDrawerProps {
  navLinks: Array<Route>
  open: boolean
  onClose: () => void
  showAuthentication: boolean
}

export function SideDrawer({
  navLinks,
  open,
  onClose,
  showAuthentication,
}: SideDrawerProps) {
  const theme = useTheme()
  const {
    displaySignInNav,
    displaySignUpNav,
    displayUserInNav,
    handleAuthNavigation,
  } = useContext(AuthDisplayContext)
  const { handleLogout } = useContext(AuthSessionContext)
  const { user } = useContext(UserContext)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  const onNavigate = () => {
    onClose()
  }
  const onSignUpClick = () => {
    handleAuthNavigation("signUp")
    registerAnalyticsEvent({
      variables: {
        event: "open-auth",
        ...analyticsEventContext,
        params: JSON.stringify({ location: "sideDrawer", type: "signUp" }),
      },
    })
  }
  const onSignInClick = () => {
    handleAuthNavigation("signIn")
    registerAnalyticsEvent({
      variables: {
        event: "open-auth",
        ...analyticsEventContext,
        params: JSON.stringify({ location: "sideDrawer", type: "signIn" }),
      },
    })
  }
  const onhandleLogoutClick = () => {
    registerAnalyticsEvent({
      variables: { event: "click-handle-logout-side-drawer" },
    })
    handleLogout()
    registerAnalyticsEvent({
      variables: { event: "successful-logout", ...analyticsEventContext },
    })
    onClose()
  }
  const onMyAccountClick = () => {
    handleAuthNavigation("myAccount")
    registerAnalyticsEvent({
      variables: {
        event: "open-auth",
        ...analyticsEventContext,
        params: JSON.stringify({ location: "sideDrawer", type: "myAccount" }),
      },
    })
    onClose()
  }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        width="275px"
        px={5}
        mt={4}
        flexDirection="column"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        height={1}
      >
        {/* <Typography
          variant="h6"
          textTransform="uppercase"
          textAlign="center"
          sx={{ letterSpacing: "6px" }}
        >
          Matthew Mckeller
        </Typography> */}
        <Box width="50px">
          <ExpanseLogo />
        </Box>
        <Typography
          variant="h6"
          textTransform="uppercase"
          sx={{ letterSpacing: "6px" }}
        >
          Expanse EDU
        </Typography>

        <Divider
          sx={(theme) => ({
            mt: 2,
            backgroundColor: theme.palette.text.primary,
            width: "100%",
          })}
        />
        {showAuthentication && (displaySignInNav || displaySignUpNav) && (
          <Box display="flex" onClick={(e) => onClose()}>
            {displaySignUpNav && (
              <Button
                variant="text"
                onClick={onSignUpClick}
                sx={{ color: theme.palette.button.textButtonColor }}
              >
                Sign Up
              </Button>
            )}
            {displaySignInNav && (
              <Button
                variant="text"
                onClick={onSignInClick}
                sx={{ color: theme.palette.button.textButtonColor }}
              >
                Sign In
              </Button>
            )}
          </Box>
        )}
        <Divider
          sx={(theme) => ({
            backgroundColor: theme.palette.text.primary,
            width: "100%",
          })}
        />

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignSelf: "stretch",
          }}
        >
          {navLinks.map((route: Route) => {
            if (isRouteWithNesting(route)) {
              const { text, path, nestedRoutes } = route
              return (
                <ListItem
                  sx={{
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                  }}
                  key={`${text}-side-drawer`}
                >
                  <ExpandableNavAccordion
                    eventName="side-drawer-navigate"
                    text={text}
                    nestedRoutes={nestedRoutes}
                    onNavigate={onNavigate}
                  />
                </ListItem>
              )
            }
            const { text, path } = route
            return (
              <ListItem
                sx={{
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
                key={`${text}-side-drawer`}
              >
                <NavLink
                  path={path}
                  text={text}
                  justifyContent="start"
                  useDotBelow={false}
                  eventName="side-drawer-navigate"
                  onNavigate={onNavigate}
                />
              </ListItem>
            )
          })}
        </List>

        {displayUserInNav && (
          <Box
            height={1}
            display="flex"
            justifyContent="flex-end"
            flexDirection="column"
            textAlign="center"
          >
            <Box width={1} display="flex" justifyContent="center">
              <AccountCircleIcon />
            </Box>
            <Typography variant="body1" fontWeight={600}>
              {user?.fullName}
            </Typography>
            <Button
              variant="text"
              onClick={onMyAccountClick}
              sx={{ color: theme.palette.button.textButtonColor }}
            >
              My Account
            </Button>
            <Button
              variant="text"
              onClick={onhandleLogoutClick}
              sx={{ color: theme.palette.button.textButtonColor }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  )
}
