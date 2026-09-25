import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper } from "@mui/material"
import { NavLink } from "./navLink.component"
import { ExpandableNavAccordion } from "./expandableNavAccordion.component"
import { NestableNavLink } from "./nestableNavLink.component"

/**
 * Navigation layout components for building menus and navigation bars.
 * These components integrate with Next.js routing and analytics.
 */
const meta: Meta = {
  title: "Theme/Layout/Navigation",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// Mock Data
// ============================================================================

const mockNestedRoutes: any[] = [
  {
    prefix: "services",
    path: "frontend-development",
    text: "Frontend Development",
    restrictions: [],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
      navSectionTitle: "Development",
    },
  },
  {
    prefix: "services",
    path: "backend-development",
    text: "Backend Development",
    restrictions: [],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
      navSectionTitle: "Development",
    },
  },
  {
    prefix: "services",
    path: "design",
    text: "UI/UX Design",
    restrictions: [],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
      navSectionTitle: "Design",
    },
  },
]

// ============================================================================
// NavLink
// ============================================================================

export const NavLinkDefault: StoryObj = {
  name: "NavLink - Default",
  render: () => (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      <NavLink path="/home" text="Home" eventName="nav-home" />
      <NavLink path="/about" text="About" eventName="nav-about" />
      <NavLink path="/services" text="Services" eventName="nav-services" />
      <NavLink path="/contact" text="Contact" eventName="nav-contact" />
    </Box>
  ),
}

export const NavLinkWithDot: StoryObj = {
  name: "NavLink - With Active Dot",
  render: () => (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      <NavLink path="/home" text="Home" eventName="nav-home" useDotBelow />
      <NavLink path="/about" text="About" eventName="nav-about" useDotBelow />
      <NavLink
        path="/services"
        text="Services"
        eventName="nav-services"
        useDotBelow
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavLinks with dot indicator below when active (matches current route).",
      },
    },
  },
}

// ============================================================================
// ExpandableNavAccordion
// ============================================================================

export const ExpandableNavAccordionStory: StoryObj = {
  name: "ExpandableNavAccordion",
  render: () => (
    <Box sx={{ width: 280, bgcolor: "background.paper" }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" mb={2}>
          Drawer Navigation
        </Typography>
        <ExpandableNavAccordion
          text="Services"
          eventName="nav-services-expand"
          nestedRoutes={mockNestedRoutes}
        />
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accordion-style navigation for side drawer menus with nested routes.",
      },
    },
  },
}

// ============================================================================
// NestableNavLink
// ============================================================================

export const NestableNavLinkStory: StoryObj = {
  name: "NestableNavLink",
  render: () => (
    <Box sx={{ p: 4, minHeight: 300 }}>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Hover over the link to see the dropdown popover
      </Typography>
      <NestableNavLink
        text="Services"
        eventName="nav-services-hover"
        nestedRoutes={mockNestedRoutes}
        popoverTitle="Our Services"
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Desktop header navigation with hover popover for nested routes.",
      },
    },
  },
}

// ============================================================================
// Gallery
// ============================================================================

export const AllNavigationComponents: StoryObj = {
  name: "Gallery - All Navigation",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Typography variant="h5">Navigation Components</Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          NavLink
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Standard header navigation links with optional active dot indicator.
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <NavLink path="/home" text="Home" eventName="nav-home" />
          <NavLink path="/about" text="About" eventName="nav-about" />
          <NavLink path="/services" text="Services" eventName="nav-services" />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          ExpandableNavAccordion
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          For side drawer navigation with expandable sections.
        </Typography>
        <Box sx={{ width: 280 }}>
          <ExpandableNavAccordion
            text="Services"
            eventName="nav-services"
            nestedRoutes={mockNestedRoutes}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3, minHeight: 200 }}>
        <Typography variant="h6" mb={2}>
          NestableNavLink
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Header nav with hover popover (hover to see dropdown).
        </Typography>
        <NestableNavLink
          text="Services"
          eventName="nav-services"
          nestedRoutes={mockNestedRoutes}
        />
      </Paper>
    </Box>
  ),
}
