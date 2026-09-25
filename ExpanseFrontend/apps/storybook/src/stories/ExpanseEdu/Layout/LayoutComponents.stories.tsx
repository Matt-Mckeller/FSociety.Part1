import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  Drawer,
  Button,
  Divider,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Grow,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import React from "react"

// Import layout components from ExpanseEdu
import PageFooter from "../../../../../../apps/expanseEdu/src/modules/layout/page-footer"
import { ExpanseLogo } from "expanse.dynamicAssets/logo"
import { NavLink } from "expanse.ui/theme"

/**
 * ExpanseEdu Layout Components
 *
 * Layout components used in the ExpanseEdu application including
 * header, footer, navigation, and page wrappers.
 *
 * Note: Some components are recreated as visual representations since
 * the originals have deep dependencies on Next.js router and Apollo Client.
 */
const meta: Meta = {
  title: "ExpanseEdu/Layout",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

// Sample navigation links for demos
const sampleNavLinks = [
  { text: "Home", path: "/" },
  { text: "Demo", path: "/demo" },
  { text: "About", path: "/about" },
  { text: "Contact", path: "/contact" },
]

/**
 * Page Footer - Site footer with contact information
 */
export const Footer: StoryObj = {
  render: () => <PageFooter />,
  parameters: {
    docs: {
      description: {
        story:
          "Site footer displaying phone number and email contact information. Responsive layout adjusts for mobile/desktop.",
      },
    },
  },
}

/**
 * Footer in Context - Footer shown at bottom of content
 */
export const FooterInContext: StoryObj = {
  render: () => (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1, py: 4 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          Page content would appear here
        </Box>
      </Container>
      <PageFooter />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Footer shown in context at the bottom of page content.",
      },
    },
  },
}

/**
 * Page Header (Visual Recreation)
 *
 * This is a visual recreation of the PageHeader component for documentation.
 * The actual component requires Next.js router and Apollo Client.
 */
export const Header: StoryObj = {
  render: () => (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={(theme) => ({
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.common.black}`,
        })}
      >
        <Box
          minWidth="30px"
          height="30px"
          minHeight="30px"
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
          Expanse{" "}
          <Box component="span" sx={{ letterSpacing: "4px" }}>
            EDU
          </Box>
        </Typography>
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
              mr: 4,
            }}
          >
            {sampleNavLinks.map((link) => (
              <ListItem key={link.text} disableGutters>
                <NavLink
                  sx={{ marginLeft: 4, marginRight: 4 }}
                  path={link.path}
                  text={link.text}
                  eventName="storybook-nav"
                  useDotBelow
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Desktop header with Expanse EDU branding, navigation links, and profile menu. Shows the visual design of the header component.",
      },
    },
  },
}

/**
 * Page Header Mobile - Mobile version with hamburger menu
 */
export const HeaderMobile: StoryObj = {
  render: () => (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={(theme) => ({
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.common.black}`,
        })}
      >
        <Box minWidth="30px" height="30px" minHeight="30px">
          <ExpanseLogo />
        </Box>
        <Typography
          variant="h5"
          component="p"
          sx={(theme) => ({
            width: "100%",
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: 1.2,
            letterSpacing: "6px !important",
            textTransform: "uppercase",
            color: theme.palette.text.primary,
          })}
          pl={2}
        >
          Expanse{" "}
          <Box component="span" sx={{ letterSpacing: "4px" }}>
            EDU
          </Box>
        </Typography>
        <Box display="flex" flexGrow={1} justifyContent="flex-end" gap={4}>
          <IconButton
            edge="start"
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
            aria-label="menu"
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Mobile header with hamburger menu icon. Tapping the menu opens the SideDrawer.",
      },
    },
  },
}

/**
 * Side Drawer (Visual Recreation)
 */
export const SideDrawerOpen: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <Box sx={{ position: "relative", height: 500 }}>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              width: 280,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Logo section */}
            <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 40, height: 40 }}>
                <ExpanseLogo />
              </Box>
              <Typography variant="h6">Expanse EDU</Typography>
            </Box>
            <Divider />

            {/* Navigation links */}
            <List sx={{ flex: 1 }}>
              {sampleNavLinks.map((link) => (
                <ListItem key={link.text}>
                  <NavLink
                    path={link.path}
                    text={link.text}
                    eventName="storybook-drawer-nav"
                  />
                </ListItem>
              ))}
            </List>

            <Divider />

            {/* Auth section */}
            <Box sx={{ p: 2 }}>
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                Sign In
              </Button>
              <Button variant="outlined" fullWidth>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Drawer>
        <Box sx={{ p: 4 }}>
          <Typography variant="body1">
            Side drawer is shown open. Click outside to close.
          </Typography>
          <Button onClick={() => setOpen(true)} sx={{ mt: 2 }}>
            Reopen Drawer
          </Button>
        </Box>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mobile navigation drawer with logo, nav links, and authentication buttons. Opens from the left side.",
      },
    },
  },
}

/**
 * Profile Menu (Visual Recreation)
 */
export const ProfileMenu: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(true)
    const anchorRef = React.useRef<HTMLButtonElement>(null)

    return (
      <Box sx={{ p: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          ref={anchorRef}
          onClick={() => setOpen(!open)}
          startIcon={<AccountCircleIcon />}
        >
          Demo User
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <MenuList>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <Divider />
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Profile dropdown menu shown when user is logged in. Displays account options and logout.",
      },
    },
  },
}

/**
 * Full Layout Preview
 */
export const FullLayoutPreview: StoryObj = {
  render: () => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar
          disableGutters
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.palette.common.black}`,
          })}
        >
          <Box minWidth="30px" height="30px">
            <ExpanseLogo />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "500",
              fontSize: "24px",
              letterSpacing: "6px !important",
              textTransform: "uppercase",
            }}
            pl={2}
          >
            Expanse EDU
          </Typography>
          <Box flexGrow={1} />
          <List sx={{ display: "flex" }}>
            {sampleNavLinks.slice(0, 3).map((link) => (
              <ListItem key={link.text} disableGutters>
                <NavLink
                  sx={{ mx: 2 }}
                  path={link.path}
                  text={link.text}
                  eventName="storybook-nav"
                />
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container sx={{ flex: 1, py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Page Content
        </Typography>
        <Typography variant="body1">
          This shows the full layout structure with header, content area, and
          footer.
        </Typography>
      </Container>

      {/* Footer */}
      <PageFooter />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete layout preview showing header, content area, and footer working together.",
      },
    },
  },
}

/**
 * StandardLayout (Visual Recreation)
 *
 * The actual StandardLayout wraps the entire application with:
 * - CssBaseline for consistent styling
 * - PageHeader with navigation
 * - SideDrawer (mobile)
 * - Snackbar for notifications
 * - AuthModal for authentication
 * - Loading spinner overlay
 * - PageFooter (conditional on route)
 */
export const StandardLayoutPreview: StoryObj = {
  render: () => {
    const [loading, setLoading] = React.useState(false)
    const [drawerOpen, setDrawerOpen] = React.useState(false)

    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Side Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 280, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box sx={{ width: 30, height: 30 }}>
                <ExpanseLogo />
              </Box>
              <Typography variant="h6">Expanse EDU</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {sampleNavLinks.map((link) => (
                <ListItem key={link.text} onClick={() => setDrawerOpen(false)}>
                  <NavLink
                    path={link.path}
                    text={link.text}
                    eventName="storybook-nav"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Header */}
        <Box sx={{ flexBasis: 56, width: "100%" }}>
          <AppBar position="static" sx={{ boxShadow: "none" }}>
            <Toolbar
              disableGutters
              sx={(theme) => ({
                borderBottom: `1px solid ${theme.palette.common.black}`,
              })}
            >
              <Box minWidth="30px" height="30px">
                <ExpanseLogo />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "24px",
                  letterSpacing: "6px !important",
                  textTransform: "uppercase",
                }}
                pl={2}
              >
                Expanse EDU
              </Typography>
              <Box flexGrow={1} />
              <List sx={{ display: { xs: "none", md: "flex" } }}>
                {sampleNavLinks.slice(0, 3).map((link) => (
                  <ListItem key={link.text} disableGutters>
                    <NavLink
                      sx={{ mx: 2 }}
                      path={link.path}
                      text={link.text}
                      eventName="storybook-nav"
                    />
                  </ListItem>
                ))}
              </List>
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>

        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            maxWidth: 1440,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Loading Overlay */}
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <Typography>Loading...</Typography>
            </Box>
          )}

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Typography variant="h4" gutterBottom>
              Standard Layout Demo
            </Typography>
            <Typography variant="body1" paragraph>
              The StandardLayout component wraps all pages with consistent
              header, navigation, loading states, and footer.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setLoading(true)
                  setTimeout(() => setLoading(false), 2000)
                }}
              >
                Simulate Loading
              </Button>
              <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
                Open Drawer
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <PageFooter />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive preview of the StandardLayout showing header, drawer, loading states, and footer. The actual component uses LayoutContext for state management.",
      },
    },
  },
}
