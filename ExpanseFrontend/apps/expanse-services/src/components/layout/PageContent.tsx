"use client"

import { Box, Typography } from "@mui/material"
import { useNavigation } from "@/context"
import {
  getPageTypeFromPosition,
  getPageConfigFromPosition,
  type Position,
} from "@/types/grid"
import { PageTransition } from "./PageTransition"

// Page imports - these will be lazy loaded or defined inline
import HomePage from "@/components/pages/HomePage"
import DemosPage from "@/components/pages/DemosPage"
import ComponentsPage from "@/components/pages/ComponentsPage"
import NavigationPage from "@/components/pages/NavigationPage"
import LayoutPage from "@/components/pages/LayoutPage"
import AuthPage from "@/components/pages/AuthPage"
import ApiPage from "@/components/pages/ApiPage"
import WebSocketsPage from "@/components/pages/WebSocketsPage"
import SettingsPage from "@/components/pages/SettingsPage"
import DocsPage from "@/components/pages/DocsPage"
import AboutPage from "@/components/pages/AboutPage"
import ContactPage from "@/components/pages/ContactPage"
import PlaceholderPage from "@/components/pages/PlaceholderPage"

// =============================================================================
// Component
// =============================================================================

export function PageContent() {
  const { currentPosition } = useNavigation()

  const getPageContent = () => {
    const pageType = getPageTypeFromPosition(currentPosition)

    switch (pageType) {
      case "home":
        return <HomePage />
      case "demos":
        return <DemosPage />
      case "components":
        return <ComponentsPage />
      case "navigation":
        return <NavigationPage />
      case "layout":
        return <LayoutPage />
      case "auth":
        return <AuthPage />
      case "api":
        return <ApiPage />
      case "websockets":
        return <WebSocketsPage />
      case "settings":
        return <SettingsPage />
      case "docs":
        return <DocsPage />
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      case "placeholder":
      default:
        return <PlaceholderPage position={currentPosition} />
    }
  }

  return (
    <PageTransition>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
          overflow: "auto",
        }}
      >
        {getPageContent()}
      </Box>
    </PageTransition>
  )
}

export default PageContent
