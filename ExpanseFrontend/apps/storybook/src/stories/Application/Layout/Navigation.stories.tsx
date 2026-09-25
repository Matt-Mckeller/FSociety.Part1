"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Stack } from "@mui/material"

/**
 * # Navigation Components
 * 
 * These components provide navigation functionality for the application header
 * and side drawer. They include analytics event logging and active state detection.
 * 
 * **Note:** These components require Next.js routing and Apollo Client for full functionality.
 */

const NavigationComponentsDocumentation = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        Navigation Components
      </Typography>
      
      <Typography variant="body1" paragraph>
        These components handle navigation with built-in analytics tracking and
        active state detection based on the current route.
      </Typography>

      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            NavLink
          </Typography>
          <Typography variant="body2" paragraph>
            Standard header navigation link with active state indicator and analytics logging.
          </Typography>
          <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`import { NavLink } from "expanse.ui/theme"

<NavLink
  path="/services"
  text="Services"
  eventName="nav-services-click"
  justifyContent="center"
  useDotBelow={true}
  logEvent={true}
  onNavigate={() => console.log("Navigated!")}
/>`}
          </Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Features:
          </Typography>
          <ul>
            <li>Active state dot indicator below text</li>
            <li>Uppercase text styling</li>
            <li>Bold weight when active</li>
            <li>Analytics event logging on navigation</li>
          </ul>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            NestableNavLink
          </Typography>
          <Typography variant="body2" paragraph>
            Navigation link with dropdown popover for nested routes. Opens on hover.
          </Typography>
          <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`import { NestableNavLink } from "expanse.ui/theme"

<NestableNavLink
  text="Services"
  eventName="nav-services"
  nestedRoutes={[
    { prefix: "services", path: "web-development", name: "Web Dev" },
    { prefix: "services", path: "mobile-apps", name: "Mobile" },
  ]}
  popoverTitle="Our Services"
/>`}
          </Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Features:
          </Typography>
          <ul>
            <li>Hover-triggered popover with nested links</li>
            <li>Active state detection for any nested route</li>
            <li>Divider between sections</li>
            <li>Expand icon indicator</li>
          </ul>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ExpandableNavAccordion
          </Typography>
          <Typography variant="body2" paragraph>
            Accordion-style navigation for side drawer with expandable nested routes.
          </Typography>
          <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12, overflow: "auto" }}>
{`import { ExpandableNavAccordion } from "expanse.ui/theme"

<ExpandableNavAccordion
  text="Services"
  eventName="nav-services"
  nestedRoutes={[
    { prefix: "services", path: "consulting", name: "Consulting" },
    { prefix: "services", path: "development", name: "Development" },
  ]}
  onNavigate={() => closeDrawer()}
/>`}
          </Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
            Features:
          </Typography>
          <ul>
            <li>Accordion expand/collapse behavior</li>
            <li>Nested route display in collapsed panel</li>
            <li>Active state detection</li>
            <li>Analytics event logging</li>
          </ul>
        </Paper>
      </Stack>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "warning.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Requirements
        </Typography>
        <Typography variant="body2">
          These components require:
        </Typography>
        <ul>
          <li><strong>Next.js Router:</strong> For navigation and path detection</li>
          <li><strong>Apollo Client:</strong> For analytics event mutations</li>
          <li><strong>AnalyticsContext:</strong> For event context data</li>
        </ul>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof NavigationComponentsDocumentation> = {
  title: "Application/Layout/Navigation",
  component: NavigationComponentsDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Navigation components for header and drawer navigation with analytics.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof NavigationComponentsDocumentation>

export const Documentation: Story = {}
