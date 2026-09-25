import { useState, useEffect, useMemo } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Lightbulb as IdeasIcon,
  AutoAwesome as GenerationIcon,
  Business as BusinessIcon,
  Code as PromptIcon,
  Image as AssetsIcon,
  School as ExamplesIcon,
  LibraryBooks as LibraryIcon,
  People as AudienceIcon,
  Campaign as MarketingIcon,
  MenuBook as LearningIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
} from "@mui/icons-material"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { PLANS_BASE_PATH } from "../../../constants"

export const DRAWER_WIDTH = 280

interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
  children?: Omit<NavItem, "icon" | "children">[]
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: `${PLANS_BASE_PATH}`,
    icon: <DashboardIcon />,
  },
  {
    id: "future-ideas",
    label: "Future Ideas",
    path: `${PLANS_BASE_PATH}/future-ideas`,
    icon: <IdeasIcon />,
  },
  {
    id: "generation",
    label: "Generation Module",
    path: `${PLANS_BASE_PATH}/modules/generation`,
    icon: <GenerationIcon />,
    children: [
      {
        id: "gen-overview",
        label: "Overview",
        path: `${PLANS_BASE_PATH}/modules/generation/overview`,
      },
      {
        id: "gen-create-content",
        label: "Create Content",
        path: `${PLANS_BASE_PATH}/modules/generation/create-content`,
      },
      {
        id: "gen-process-flow",
        label: "Process Flow",
        path: `${PLANS_BASE_PATH}/modules/generation/process-flow`,
      },
      {
        id: "gen-content-types",
        label: "Content Type Flows",
        path: `${PLANS_BASE_PATH}/modules/generation/content-type-flows`,
      },
      {
        id: "gen-ux-ui",
        label: "UX/UI",
        path: `${PLANS_BASE_PATH}/modules/generation/ux-ui`,
      },
      {
        id: "gen-review",
        label: "Review Process",
        path: `${PLANS_BASE_PATH}/modules/generation/review-process`,
      },
      {
        id: "gen-scheduling",
        label: "Scheduling",
        path: `${PLANS_BASE_PATH}/modules/generation/scheduling`,
      },
      {
        id: "gen-i18n",
        label: "Internationalization",
        path: `${PLANS_BASE_PATH}/modules/generation/internationalization`,
      },
      {
        id: "gen-library",
        label: "Content Library",
        path: `${PLANS_BASE_PATH}/modules/generation/content-library`,
      },
      {
        id: "gen-config",
        label: "Configuration",
        path: `${PLANS_BASE_PATH}/modules/generation/configuration`,
      },
      {
        id: "gen-questions",
        label: "Questions",
        path: `${PLANS_BASE_PATH}/modules/generation/questions`,
      },
      {
        id: "gen-screens",
        label: "Screens",
        path: `${PLANS_BASE_PATH}/modules/generation/screens`,
      },
      {
        id: "gen-design-mockups",
        label: "Design Mockups",
        path: `${PLANS_BASE_PATH}/modules/generation/design-mockups`,
      },
      {
        id: "gen-pipelines",
        label: "Pipelines Overview",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines`,
      },
      {
        id: "gen-data-stacking",
        label: "Data Stacking",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines/data-stacking`,
      },
      {
        id: "gen-audience-reviews",
        label: "Audience Reviews",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines/audience-reviews`,
      },
      {
        id: "gen-cultural-alignment",
        label: "Cultural Alignment",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines/cultural-alignment`,
      },
      {
        id: "gen-perspective-balancing",
        label: "Perspective Balancing",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines/perspective-balancing`,
      },
      {
        id: "gen-design-review",
        label: "Design Review",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines/design-review`,
      },
      {
        id: "gen-pipeline-examples",
        label: "Pipeline Examples",
        path: `${PLANS_BASE_PATH}/modules/generation/pipelines/examples`,
      },
    ],
  },
  {
    id: "core-profiles",
    label: "Core Profiles",
    path: `${PLANS_BASE_PATH}/modules/business-profile`,
    icon: <BusinessIcon />,
    children: [
      {
        id: "business-profile",
        label: "Business Profile",
        path: `${PLANS_BASE_PATH}/modules/business-profile`,
      },
      {
        id: "personal-profile",
        label: "Personal Profile",
        path: `${PLANS_BASE_PATH}/modules/personal-profile`,
      },
      {
        id: "brand-voice",
        label: "Brand Voice",
        path: `${PLANS_BASE_PATH}/modules/brand-voice`,
      },
      {
        id: "company-goals",
        label: "Company Goals",
        path: `${PLANS_BASE_PATH}/modules/company-goals`,
      },
      {
        id: "company-purpose",
        label: "Company Purpose",
        path: `${PLANS_BASE_PATH}/modules/company-purpose`,
      },
      {
        id: "custom-instructions",
        label: "Custom Instructions",
        path: `${PLANS_BASE_PATH}/modules/custom-instructions`,
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    path: `${PLANS_BASE_PATH}/modules/marketing`,
    icon: <MarketingIcon />,
  },
  {
    id: "learning",
    label: "Learning",
    path: `${PLANS_BASE_PATH}/modules/learning`,
    icon: <LearningIcon />,
  },
  {
    id: "prompt-examples",
    label: "Prompt Examples",
    path: `${PLANS_BASE_PATH}/modules/prompt-examples`,
    icon: <PromptIcon />,
  },
  {
    id: "assets",
    label: "Assets",
    path: `${PLANS_BASE_PATH}/modules/assets`,
    icon: <AssetsIcon />,
  },
  {
    id: "few-shot-examples",
    label: "Few Shot Examples",
    path: `${PLANS_BASE_PATH}/modules/few-shot-examples`,
    icon: <ExamplesIcon />,
  },
  {
    id: "content-library",
    label: "Content Library",
    path: `${PLANS_BASE_PATH}/modules/content-library`,
    icon: <LibraryIcon />,
  },
  {
    id: "audience",
    label: "Audience",
    path: `${PLANS_BASE_PATH}/modules/audience`,
    icon: <AudienceIcon />,
  },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Auto-expand section containing current route
  const activeParentId = useMemo(() => {
    for (const item of navItems) {
      if (item.children?.some(child => location.pathname === child.path)) {
        return item.id
      }
    }
    return null
  }, [location.pathname])

  // Expand parent section when navigating to a child route
  useEffect(() => {
    if (activeParentId && !expandedItems.includes(activeParentId)) {
      setExpandedItems(prev => [...prev, activeParentId])
    }
  }, [activeParentId])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const isActive = (path: string) => location.pathname === path
  const isChildActive = (children?: NavItem["children"]) =>
    children?.some((child) => location.pathname === child.path)

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2.5,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1rem",
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
            }}
          >
            📋
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            4up Plans
          </Typography>
        </Box>
        {isMobile && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <ChevronLeft />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflow: "auto", py: 1.5, px: 1 }}>
        {navItems.map((item) => (
          <Box key={item.id} sx={{ mb: 0.5 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={item.children ? "div" : RouterLink}
                to={item.children ? undefined : item.path}
                onClick={
                  item.children ? () => toggleExpanded(item.id) : undefined
                }
                selected={isActive(item.path) || isChildActive(item.children)}
                sx={{
                  borderRadius: 1.5,
                  mx: 0.5,
                  py: 1,
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                  "&.Mui-selected": {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.16),
                    },
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.primary.main,
                    },
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                />
                {item.children &&
                  (expandedItems.includes(item.id) ? (
                    <ExpandLess
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                  ) : (
                    <ExpandMore
                      sx={{ color: "text.secondary", fontSize: 20 }}
                    />
                  ))}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse
                in={expandedItems.includes(item.id)}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding sx={{ mt: 0.5 }}>
                  {item.children.map((child) => (
                    <ListItem key={child.id} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={child.path}
                        selected={isActive(child.path)}
                        sx={{
                          pl: 6,
                          py: 0.75,
                          mx: 0.5,
                          borderRadius: 1,
                          transition: "all 0.15s ease",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.06),
                          },
                          "&.Mui-selected": {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            "& .MuiListItemText-primary": {
                              fontWeight: 600,
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: "0.8125rem",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          boxShadow: `4px 0 24px ${alpha(theme.palette.common.black, 0.04)}`,
          ...(isMobile
            ? {
                position: "fixed",
                top: 0,
                bottom: 0,
                height: "100vh",
              }
            : {
                position: "fixed",
                top: 80,
                height: "calc(100vh - 80px)",
              }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}
