/**
 * DocsNavigation - Sidebar Navigation Component
 *
 * Extracted from the monolithic DocsView.tsx to improve maintainability.
 * Handles the collapsible navigation tree for the docs system.
 *
 * Features:
 * - Collapsible navigation tree
 * - Visual active state with border indicator
 * - Search/filter functionality
 * - Sticky positioning with scroll
 * - Mobile-responsive with drawer support
 */

import { useState, useMemo } from "react"
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
} from "@mui/material"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import MenuIcon from "@mui/icons-material/Menu"
import type { NavItem, SectionId } from "./types"

interface DocsNavigationProps {
  /** Navigation tree structure */
  navigation: NavItem[]
  /** Currently active section */
  activeSection: SectionId
  /** Callback when a section is selected */
  onSectionChange: (sectionId: SectionId) => void
  /** Array of expanded nav item IDs */
  expandedNav: string[]
  /** Callback to toggle nav expansion */
  onNavToggle: (navId: string) => void
  /** Optional title override */
  title?: string
  /** Optional subtitle */
  subtitle?: string
}

const DRAWER_WIDTH = 280

export function DocsNavigation({
  navigation,
  activeSection,
  onSectionChange,
  expandedNav,
  onNavToggle,
  title = "📖 Documentation",
  subtitle = "Expanse EDU",
}: DocsNavigationProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter navigation based on search query
  const filteredNavigation = useMemo(() => {
    if (!searchQuery.trim()) return navigation

    const query = searchQuery.toLowerCase()

    return navigation
      .map((item) => {
        // Check if parent matches
        const parentMatches = item.label.toLowerCase().includes(query)

        // Filter children that match
        const matchingChildren = item.children?.filter((child) =>
          child.label.toLowerCase().includes(query),
        )

        // Include parent if it matches or has matching children
        if (
          parentMatches ||
          (matchingChildren && matchingChildren.length > 0)
        ) {
          return {
            ...item,
            children: parentMatches ? item.children : matchingChildren,
          }
        }
        return null
      })
      .filter(Boolean) as NavItem[]
  }, [navigation, searchQuery])

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedNav.includes(item.id) || searchQuery.length > 0
    const isDisabled = item.disabled
    const isActive = activeSection === item.id

    return (
      <Box key={item.id}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              onNavToggle(item.id)
            } else if (!isDisabled) {
              onSectionChange(item.id as SectionId)
              if (isMobile) setMobileOpen(false)
            }
          }}
          sx={{
            pl: 2 + depth * 2,
            py: depth === 0 ? 1.25 : 0.75,
            opacity: isDisabled ? 0.5 : 1,
            bgcolor: isActive
              ? alpha(theme.palette.primary.main, 0.08)
              : "transparent",
            borderLeft: 3,
            borderColor: isActive ? "primary.main" : "transparent",
            "&:hover": {
              bgcolor: isDisabled
                ? "transparent"
                : alpha(theme.palette.primary.main, 0.04),
            },
            transition: "all 0.15s ease-in-out",
          }}
          disabled={isDisabled}
        >
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: depth === 0 ? "0.9rem" : "0.85rem",
              fontWeight: depth === 0 ? 600 : isActive ? 500 : 400,
              // depth>0 leaf items previously used theme text.secondary
              // (#475569) which reads washed-out next to bold depth-0 headers;
              // bumped to a darker slate for real contrast, keeping the
              // font-weight difference to preserve hierarchy.
              color: isActive
                ? "primary.main"
                : depth === 0
                  ? "text.primary"
                  : "#334155",
            }}
          />
          {hasChildren &&
            (isExpanded ? (
              <ExpandLess sx={{ color: "text.secondary", fontSize: 18 }} />
            ) : (
              <ExpandMore sx={{ color: "text.secondary", fontSize: 18 }} />
            ))}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    )
  }

  const sidebarContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: "divider" }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search sections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchQuery("")}
                  sx={{ p: 0.5 }}
                >
                  <ClearIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              fontSize: "0.875rem",
              bgcolor: alpha(theme.palette.action.hover, 0.5),
              "&:hover": {
                bgcolor: alpha(theme.palette.action.hover, 0.8),
              },
            },
          }}
        />
      </Box>

      {/* Navigation List */}
      <List
        component="nav"
        sx={{
          flex: 1,
          overflow: "auto",
          py: 1,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "grey.400",
            borderRadius: 3,
          },
        }}
      >
        {filteredNavigation.length > 0 ? (
          filteredNavigation.map((item) => renderNavItem(item))
        ) : (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No sections found
            </Typography>
          </Box>
        )}
      </List>

      {/* Footer with section count */}
      <Divider />
      <Box sx={{ p: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          {navigation.reduce(
            (acc, item) => acc + (item.children?.length || 0) + 1,
            0,
          )}{" "}
          sections
        </Typography>
      </Box>
    </Box>
  )

  // Mobile: Floating button + drawer
  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 1100,
            bgcolor: "primary.main",
            color: "white",
            boxShadow: 3,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </>
    )
  }

  // Desktop: Static sidebar
  return (
    <Paper
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        position: "sticky",
        top: 100,
        maxHeight: "calc(100vh - 120px)",
        overflow: "hidden",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
      elevation={1}
    >
      {sidebarContent}
    </Paper>
  )
}
