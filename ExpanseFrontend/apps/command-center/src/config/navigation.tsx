/**
 * Navigation Configuration
 * Defines the grouped navigation structure for Command Center
 */
import { ReactNode } from "react"

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard"
import CampaignIcon from "@mui/icons-material/Campaign"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import TimelineIcon from "@mui/icons-material/Timeline"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import ExploreIcon from "@mui/icons-material/Explore"
import MapIcon from "@mui/icons-material/Map"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import DescriptionIcon from "@mui/icons-material/Description"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import ArticleIcon from "@mui/icons-material/Article"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import InsightsIcon from "@mui/icons-material/Insights"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import FolderIcon from "@mui/icons-material/Folder"
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong"

export interface NavItem {
  id: string
  label: string
  icon: ReactNode
  path: string
}

export interface NavGroup {
  id: string
  label: string
  icon: ReactNode
  items?: NavItem[]
  path?: string // For standalone items like Dashboard
}

export const navigationConfig: NavGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    id: "missions",
    label: "Missions",
    icon: <SportsEsportsIcon />,
    items: [
      {
        id: "campaigns",
        label: "Campaigns",
        icon: <CampaignIcon />,
        path: "/missions/campaigns",
      },
      {
        id: "storylines",
        label: "Storylines",
        icon: <AutoStoriesIcon />,
        path: "/missions/storylines",
      },
      {
        id: "quests",
        label: "Quests",
        icon: <TrackChangesIcon />,
        path: "/missions/quests",
      },
      {
        id: "objectives",
        label: "Objectives",
        icon: <CheckCircleIcon />,
        path: "/missions/objectives",
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    icon: <InsightsIcon />,
    items: [
      {
        id: "strategic-focus",
        label: "Strategic Focus",
        icon: <CenterFocusStrongIcon />,
        path: "/insights/strategic-focus",
      },
      {
        id: "roadmap",
        label: "Roadmap",
        icon: <TimelineIcon />,
        path: "/insights/roadmap",
      },
      {
        id: "financials",
        label: "Financials",
        icon: <AccountBalanceIcon />,
        path: "/insights/financials",
      },
      {
        id: "compass",
        label: "Compass",
        icon: <ExploreIcon />,
        path: "/insights/compass",
      },
      {
        id: "journey-map",
        label: "Journey Map",
        icon: <MapIcon />,
        path: "/insights/journey-map",
      },
    ],
  },
  {
    id: "records",
    label: "Records",
    icon: <HistoryEduIcon />,
    items: [
      {
        id: "journal",
        label: "Journal",
        icon: <MenuBookIcon />,
        path: "/records/journal",
      },
      {
        id: "qa",
        label: "Q&A",
        icon: <HelpOutlineIcon />,
        path: "/records/qa",
      },
    ],
  },
  {
    id: "docs",
    label: "Docs",
    icon: <FolderIcon />,
    items: [
      {
        id: "plans",
        label: "Plans",
        icon: <DescriptionIcon />,
        path: "/docs/plans",
      },
      {
        id: "presentation",
        label: "Presentation",
        icon: <SlideshowIcon />,
        path: "/docs/presentation",
      },
      {
        id: "documentation",
        label: "Documentation",
        icon: <ArticleIcon />,
        path: "/docs/documentation",
      },
    ],
  },
]

/**
 * Get the active nav group and item based on current path
 */
export function getActiveNavigation(pathname: string): {
  groupId: string
  itemId?: string
} {
  // Handle root path
  if (pathname === "/" || pathname === "") {
    return { groupId: "dashboard" }
  }

  for (const group of navigationConfig) {
    // Check if it's a standalone group (like Dashboard)
    if (group.path && pathname === group.path) {
      return { groupId: group.id }
    }

    // Check items in the group
    if (group.items) {
      for (const item of group.items) {
        if (pathname === item.path || pathname.startsWith(item.path + "/")) {
          return { groupId: group.id, itemId: item.id }
        }
      }
    }
  }

  // Default to dashboard
  return { groupId: "dashboard" }
}

/**
 * Get all paths for route configuration
 */
export function getAllPaths(): { path: string; id: string }[] {
  const paths: { path: string; id: string }[] = []

  for (const group of navigationConfig) {
    if (group.path) {
      paths.push({ path: group.path, id: group.id })
    }
    if (group.items) {
      for (const item of group.items) {
        paths.push({ path: item.path, id: item.id })
      }
    }
  }

  return paths
}
