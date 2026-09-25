import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import PageHeader from "../../../../../../apps/personalNext/src/modules/layout/page-header"
import { SideDrawer } from "../../../../../../apps/personalNext/src/modules/layout/side-drawer"
import ProfileMenuList from "../../../../../../apps/personalNext/src/modules/layout/profile-menu-list"
import { Route, StandardRoute, RouteWithNesting, NestedRoute } from "expanse.ui/application"

/**
 * Layout components for the personalNext website navigation.
 * These components handle site-wide navigation, mobile drawers, and user menus.
 * 
 * Note: These components rely on several context providers which are mocked
 * in the Storybook preview.tsx decorators:
 * - AnalyticsContext
 * - AuthDisplayContext / AuthSessionContext
 * - UserContext
 * - Apollo Client (for mutations)
 */
const meta: Meta = {
  title: "PersonalNext/Layout/Navigation",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Navigation components including page header, side drawer for mobile, and profile menu dropdown.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

// Sample navigation links for demos
const sampleNavLinks: StandardRoute[] = [
  { text: "Home", path: "/", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
  { text: "Experience", path: "/experience", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
  { text: "Process", path: "/process", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
  { text: "Contact", path: "/contact", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
]

const nestedNavLinks: Route[] = [
  { text: "Home", path: "/", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
  {
    text: "Experience",
    path: "/experience",
    restrictions: [],
    nestedRoutes: [
      { text: "Frontend", path: "/experience/frontend", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
      { text: "Backend", path: "/experience/backend", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
      { text: "Data Visualization", path: "/experience/data-viz", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
    ] as NestedRoute[],
    config: { displayInHeader: true, displayInSideNav: true, navSectionTitle: "Experience Areas" },
  } as RouteWithNesting,
  { text: "Process", path: "/process", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
  { text: "Contact", path: "/contact", restrictions: [], config: { displayInHeader: true, displayInSideNav: true } },
]

// =============================================================================
// Page Header Stories
// =============================================================================

/**
 * Default page header with navigation links.
 * Shows the desktop version with full navigation.
 */
export const PageHeaderDefault: StoryObj = {
  render: () => (
    <Box sx={{ minHeight: "200px", bgcolor: "background.default" }}>
      <PageHeader 
        toggleDrawer={() => () => {}} 
        navLinks={sampleNavLinks} 
      />
      <Box sx={{ pt: 10, px: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Page content appears below the fixed header.
        </Typography>
      </Box>
    </Box>
  ),
}

/**
 * Page header with nested navigation (dropdown menus).
 */
export const PageHeaderWithNestedNav: StoryObj = {
  render: () => (
    <Box sx={{ minHeight: "200px", bgcolor: "background.default" }}>
      <PageHeader 
        toggleDrawer={() => () => {}} 
        navLinks={nestedNavLinks} 
      />
      <Box sx={{ pt: 10, px: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Hover over &quot;Experience&quot; to see nested navigation dropdown.
        </Typography>
      </Box>
    </Box>
  ),
}

/**
 * Page header with minimal navigation (fewer links).
 */
export const PageHeaderMinimal: StoryObj = {
  render: () => (
    <Box sx={{ minHeight: "200px", bgcolor: "background.default" }}>
      <PageHeader 
        toggleDrawer={() => () => {}} 
        navLinks={[
          { text: "Home", path: "/" },
          { text: "Contact", path: "/contact" },
        ]} 
      />
      <Box sx={{ pt: 10, px: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Minimal navigation with just two links.
        </Typography>
      </Box>
    </Box>
  ),
}

// =============================================================================
// Side Drawer Stories
// =============================================================================

/**
 * Side drawer in open state for mobile navigation.
 */
export const SideDrawerOpen: StoryObj = {
  render: () => (
    <Box sx={{ position: "relative", height: "500px" }}>
      <SideDrawer 
        navLinks={sampleNavLinks} 
        open={true} 
        onClose={() => console.log("Close drawer")} 
      />
    </Box>
  ),
}

/**
 * Side drawer with nested navigation links.
 */
export const SideDrawerWithNestedNav: StoryObj = {
  render: () => (
    <Box sx={{ position: "relative", height: "500px" }}>
      <SideDrawer 
        navLinks={nestedNavLinks} 
        open={true} 
        onClose={() => console.log("Close drawer")} 
      />
    </Box>
  ),
}

/**
 * Side drawer closed (not visible).
 */
export const SideDrawerClosed: StoryObj = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="body1">
        The side drawer is closed. In a real app, this would be triggered by a menu button.
      </Typography>
      <SideDrawer 
        navLinks={sampleNavLinks} 
        open={false} 
        onClose={() => {}} 
      />
    </Box>
  ),
}

// =============================================================================
// Profile Menu List Stories
// =============================================================================

/**
 * Profile menu list dropdown.
 * Click the icon to toggle the menu open/closed.
 */
export const ProfileMenu: StoryObj = {
  render: () => (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Click the user icon to toggle menu:
        </Typography>
        <ProfileMenuList />
      </Box>
    </Box>
  ),
}

/**
 * Profile menu in a header-like context.
 */
export const ProfileMenuInContext: StoryObj = {
  render: () => (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "flex-end",
        p: 2,
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Typography variant="body2" sx={{ mr: 2 }}>
        Navigation items...
      </Typography>
      <ProfileMenuList />
    </Box>
  ),
}

// =============================================================================
// Combined Layout Demo
// =============================================================================

/**
 * Full layout demonstration with header and content area.
 */
export const FullLayoutDemo: StoryObj = {
  render: () => (
    <Box sx={{ minHeight: "400px", bgcolor: "background.default" }}>
      <PageHeader 
        toggleDrawer={() => () => {}} 
        navLinks={sampleNavLinks} 
      />
      <Box sx={{ pt: 12, px: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Site
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This demonstrates the full layout with the page header.
          On mobile viewports, the hamburger menu would open the SideDrawer.
        </Typography>
      </Box>
    </Box>
  ),
}
