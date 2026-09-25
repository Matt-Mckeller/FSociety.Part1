"use client"

import { Box } from "@mui/material"
import { NavigationProvider, ActionBarProvider } from "@/context"
import { PageContent } from "@/components/layout"
import { TopActionBar, LeftActionBar, RightActionBar } from "@/components/bars"
import { NavigationControls, Minimap } from "@/components/navigation"

// =============================================================================
// Layout Constants
// =============================================================================

const TOP_BAR_HEIGHT = 56
const BOTTOM_BAR_HEIGHT = 80
const SIDE_BAR_WIDTH = 56

// =============================================================================
// Main Page Component
// =============================================================================

export default function Home() {
  return (
    <NavigationProvider>
      <ActionBarProvider>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          {/* Action Bars */}
          <TopActionBar />
          <LeftActionBar />
          <RightActionBar />

          {/* Navigation UI */}
          <Minimap size="medium" />
          <NavigationControls />

          {/* Main Content Area */}
          <Box
            component="main"
            sx={{
              position: "absolute",
              top: TOP_BAR_HEIGHT,
              left: SIDE_BAR_WIDTH,
              right: SIDE_BAR_WIDTH,
              bottom: BOTTOM_BAR_HEIGHT,
              overflow: "hidden",
            }}
          >
            <PageContent />
          </Box>
        </Box>
      </ActionBarProvider>
    </NavigationProvider>
  )
}
