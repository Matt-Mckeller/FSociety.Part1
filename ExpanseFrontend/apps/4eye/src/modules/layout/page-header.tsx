import React, { useContext } from "react"
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { ExpanseLogo } from "expanse.dynamicAssets/logo"
import { useRouter } from "next/navigation"
import ProfileMenuList from "./profile-menu-list"
import { LightDarkModeToggleSwitch, NavLink } from "expanse.ui/theme"
import { useMutation } from "@apollo/client"
import {
  AnalyticsContext,
  REGISTER_ANALYTICS_EVENT,
  Route,
  RouteWithNesting,
  isRouteWithNesting,
} from "expanse.ui/application"
import { NestableNavLink } from "expanse.ui/theme"
import { letterSpacing } from "@mui/system"

// todo grab nav links from somewhere
function PageHeader({ toggleDrawer, navLinks, showProfileMenuList }: any) {
  const useDesktopHeader = useMediaQuery("(min-width:861px)")
  const useMobileHeader = !useDesktopHeader
  const router = useRouter()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const onLogoNavigate = (e: any) => {
    e.preventDefault()
    registerAnalyticsEvent({
      variables: {
        event: "logo-home-navigation",
        ...analyticsEventContext,
        params: null,
      },
    })
    router.push("/")
  }

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        boxShadow: "none",
      })}
    >
      <Toolbar
        disableGutters
        sx={(theme) => ({
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.common.black}`,
        })}
      >
        <Box
          minWidth="48px"
          height="48px"
          minHeight="48px"
          component="a"
          href="/"
          onClick={(e) => onLogoNavigate(e)}
          sx={{ cursor: "pointer" }}
        >
          <ExpanseLogo />
        </Box>
        <Typography
          variant="h5"
          component="p"
          sx={(theme) => ({
            width: "100%",
            fontWeight: "500",
            fontSize: { zero: "16px", tablet: "24px" },
            lineHeight: 1.2,
            letterSpacing: "6px !important",
            textTransform: "uppercase",
            color: theme.palette.text.primary,
          })}
          pl={2}
        >
          4eye
        </Typography>
        {useDesktopHeader && (
          <Box
            flexGrow={1}
            justifyContent="end"
            width={1}
            display="flex"
            flexDirection="row"
            alignItems="stretch"
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mr: 4 /* 12px / level 4 spacing inside links and level 8 for side, need 12 more for equaldistance between edge and link */,
              }}
            >
              {navLinks.map((route: Route) => {
                if (isRouteWithNesting(route)) {
                  const { text, path, nestedRoutes, config } =
                    route as RouteWithNesting
                  return (
                    <ListItem key={`header-nav${text}`} disableGutters>
                      <NestableNavLink
                        sx={{ marginLeft: 4, marginRight: 0 }}
                        text={text}
                        eventName="page-header-popover"
                        nestedRoutes={nestedRoutes}
                      ></NestableNavLink>
                    </ListItem>
                  )
                }
                const { text, path } = route
                return (
                  <ListItem key={`header-nav${text}`} disableGutters>
                    <NavLink
                      sx={{ marginLeft: 4, marginRight: 4 }}
                      path={path}
                      text={text}
                      eventName="page-header-navigation"
                      useDotBelow
                    />
                  </ListItem>
                )
              })}
            </List>

            {/* <LightDarkModeToggleSwitch /> */}
            {showProfileMenuList && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <ProfileMenuList />
              </Box>
            )}
          </Box>
        )}
        {useMobileHeader && (
          <Box
            display="flex"
            flexGrow={1}
            width="100%"
            justifyContent="flex-end"
            textAlign="right"
            gap={4}
          >
            {/* <LightDarkModeToggleSwitch /> */}

            <IconButton
              edge="start"
              sx={(theme) => ({
                color: theme.palette.text.primary,
              })}
              aria-label="menu"
              onClick={toggleDrawer(true)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default PageHeader
