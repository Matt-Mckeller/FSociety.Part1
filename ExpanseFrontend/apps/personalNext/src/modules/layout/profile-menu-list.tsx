import * as React from "react"
import Button from "@mui/material/Button"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/system"
import { useContext } from "react"

import { Typography } from "@mui/material"
import { AnalyticsContext } from "expanse.ui/application"
import { AuthDisplayContext, AuthSessionContext } from "expanse.ui/auth"
import { UserContext } from "expanse.ui/user"
import {
  REGISTER_ANALYTICS_EVENT,
  handleAnalyticsEventError,
} from "expanse.ui/application"
import { useMutation } from "@apollo/client"

export default function ProfileMenuList() {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const {
    displaySignInNav,
    displaySignUpNav,
    displayUserInNav,
    handleAuthNavigation,
  } = useContext(AuthDisplayContext)
  const { user } = useContext(UserContext)
  const { handleLogout } = useContext(AuthSessionContext)

  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)

  const handleToggle = () => {
    registerAnalyticsEvent({
      variables: {
        event: "toggle-profile-menu-list",
        params: JSON.stringify({ open: !open }),
        ...analyticsEventContext,
      },
    }).catch(handleAnalyticsEventError)
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    registerAnalyticsEvent({
      variables: { event: "close-profile-menu-list", ...analyticsEventContext },
    })

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    registerAnalyticsEvent({
      variables: { event: "keydown-profile-list", ...analyticsEventContext },
    })
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  const theme = useTheme()

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ color: theme.palette.text.primary, minWidth: "64px" }}
        >
          {/* To provide adequate room for clicking there is a minWidth */}
          <AccountCircleIcon
            sx={{ color: theme.palette.text.primary, height: 28, width: 28 }}
          />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ width: "153px" }}>
                {displayUserInNav && (
                  <Typography
                    variant="body1"
                    px={3}
                    pt={3}
                    textAlign="center"
                    fontWeight="600"
                  >
                    {user?.fullName || "Unknown"}
                  </Typography>
                )}
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem onClick={handleClose}><AuthButton authDisplayType="signIn" variant="link" /></MenuItem> */}
                    {displaySignInNav && (
                      <MenuItem
                        onClick={(e) => {
                          handleAuthNavigation("signIn")
                          registerAnalyticsEvent({
                            variables: {
                              event: "open-auth",
                              ...analyticsEventContext,
                              params: JSON.stringify({
                                location: "profile-menu-list",
                                type: "signIn",
                              }),
                            },
                          })
                          handleClose(e)
                        }}
                      >
                        Sign In
                      </MenuItem>
                    )}
                    {displaySignUpNav && (
                      <MenuItem
                        onClick={(e) => {
                          handleAuthNavigation("signUp")
                          registerAnalyticsEvent({
                            variables: {
                              event: "open-auth",
                              ...analyticsEventContext,
                              params: JSON.stringify({
                                location: "profile-menu-list",
                                type: "signUp",
                              }),
                            },
                          })
                          handleClose(e)
                        }}
                      >
                        Sign Up
                      </MenuItem>
                    )}
                    {displayUserInNav && (
                      <MenuItem
                        onClick={(e) => {
                          handleAuthNavigation("myAccount")
                          registerAnalyticsEvent({
                            variables: {
                              event: "open-auth",
                              ...analyticsEventContext,
                              params: JSON.stringify({
                                location: "profile-menu-list",
                                type: "myAccount",
                              }),
                            },
                          })
                          handleClose(e)
                        }}
                      >
                        My Account
                      </MenuItem>
                    )}
                    {displayUserInNav && (
                      <MenuItem
                        onClick={(e) => {
                          handleLogout()
                          registerAnalyticsEvent({
                            variables: {
                              event: "successful-logout",
                              params: JSON.stringify({
                                location: "profile-menu-list",
                              }),
                              ...analyticsEventContext,
                            },
                          })
                          handleClose(e)
                        }}
                      >
                        Logout
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  )
}
