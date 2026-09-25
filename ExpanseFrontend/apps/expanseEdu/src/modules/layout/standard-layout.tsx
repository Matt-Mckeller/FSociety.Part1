"use client"
import React, { useContext, useMemo } from "react"
import { Box, CssBaseline, useMediaQuery } from "@mui/material"

import { Routes } from "../../config/routes"
import { AuthModal } from "expanse.ui/auth"
import { Snackbar } from "expanse.ui/theme"
import PageHeader from "./page-header"
import PageFooter from "./page-footer"
import { SideDrawer } from "./side-drawer"
import { CenteredExpanseLoadingSpinner } from "expanse.ui/theme"
import { LayoutContext } from "expanse.ui/application"
import { useMutation } from "@apollo/client"
import { AnalyticsContext } from "expanse.ui/application"
import { REGISTER_ANALYTICS_EVENT } from "expanse.ui/application"
import { Route } from "expanse.ui/application"
import { Theme } from "@mui/system"
import { usePathname } from "next/navigation"

type Props = {
  children: React.ReactNode
}

export function StandardLayout({ children }: Props) {
  const {
    loading,
    addLoadingProcessID,
    removeLoadingProcessID,

    // Drawer
    drawerOpen,
    setDrawerOpen,
  } = useContext(LayoutContext)

  const pathname = usePathname()
  const displayFooter = !pathname?.includes("/demo")

  // const hasAccess = hasRouteAccess({ user, doRedirect: false })
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const responsiveSidePadding = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("laptop"),
  )
    ? 8
    : 16

  const headerNavRoutes = useMemo(
    () =>
      Routes.filter((route: Route) => {
        return route.config.displayInHeader === true
      }),
    [Routes],
  )
  const sideNavRoutes = useMemo(
    () =>
      Routes.filter((route: Route) => {
        return route.config.displayInSideNav === true
      }),
    [Routes],
  )

  const openDrawer = () => (event: any) => {
    setDrawerOpen(true)
    registerAnalyticsEvent({
      variables: {
        event: "toggle-drawer-open",
        params: JSON.stringify({ open: true }),
        ...analyticsEventContext,
      },
    })
  }

  const onClose = () => {
    setDrawerOpen(false)
    registerAnalyticsEvent({
      variables: {
        event: "toggle-drawer-open",
        params: JSON.stringify({ open: false }),
        ...analyticsEventContext,
      },
    })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      alignItems={"center"}
    >
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <SideDrawer
        open={drawerOpen}
        onClose={onClose}
        navLinks={sideNavRoutes}
        showAuthentication={false}
      />
      <Box flexBasis="56px">
        <PageHeader
          toggleDrawer={openDrawer}
          navLinks={headerNavRoutes}
          showProfileMenuList={false}
        />
      </Box>
      <Snackbar />
      <Box
        flexGrow="1"
        px={responsiveSidePadding}
        display="flex"
        flexDirection="column"
        justifyContent="stretch"
        maxWidth={"1440px"}
        width="100%"
      >
        <AuthModal />

        <Box component="main" display="flex" flexGrow="1" alignItems="stretch">
          {loading && <CenteredExpanseLoadingSpinner />}
          {children}
        </Box>
      </Box>
      {displayFooter && <PageFooter />}
    </Box>
  )
}

export default StandardLayout
