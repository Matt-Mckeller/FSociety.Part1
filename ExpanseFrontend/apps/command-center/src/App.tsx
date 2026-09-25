/**
 * Command Center - Main Application
 * Game-themed planning and tracking application
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Box, Container, Typography } from "@mui/material"
import { AppNavigation } from "./components/Navigation"

// Views
import { Dashboard } from "./components/Dashboard"
import { CampaignsView } from "./components/CampaignsView"
import { StorylinesView } from "./components/StorylinesView"
import { StorylineWikiPage } from "./components/StorylineWikiPage"
import { QuestLog } from "./components/QuestLog"
import { ObjectivesView } from "./components/ObjectivesView"
import { RoadmapView } from "./components/RoadmapView"
import { FinancialsView } from "./components/FinancialsView"
import { StrategicCompassView } from "./components/StrategicCompassView"
import { JourneyMap } from "./components/JourneyMap"
import { JournalView } from "./components/JournalView"
import { QuestionsView } from "./components/QuestionsView"
import { PlansView } from "./components/plans/PlansView"
import { PresentationView } from "./components/presentation"
import { DocsView } from "./components/docs"
import { StrategicFocusPage } from "./pages/StrategicFocusPage"

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", py: 2, gap: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              🎮 Command Center
            </Typography>
            <AppNavigation />
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      {children}
    </Box>
  )
}

/**
 * Content wrapper with standard padding
 */
function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {children}
    </Container>
  )
}

/**
 * Full-width content wrapper (for views that need more control)
 */
function FullWidthContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppLayout>
        <Routes>
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <PageContent>
                <Dashboard />
              </PageContent>
            }
          />

          {/* Missions */}
          <Route
            path="/missions/campaigns"
            element={
              <PageContent>
                <CampaignsView />
              </PageContent>
            }
          />
          <Route
            path="/missions/storylines"
            element={
              <PageContent>
                <StorylinesView />
              </PageContent>
            }
          />
          <Route
            path="/missions/storylines/:storylineId"
            element={
              <PageContent>
                <StorylineWikiPage />
              </PageContent>
            }
          />
          <Route
            path="/missions/quests"
            element={
              <PageContent>
                <QuestLog />
              </PageContent>
            }
          />
          <Route
            path="/missions/objectives"
            element={
              <PageContent>
                <ObjectivesView />
              </PageContent>
            }
          />

          {/* Insights */}
          <Route
            path="/insights/strategic-focus"
            element={
              <PageContent>
                <StrategicFocusPage />
              </PageContent>
            }
          />
          <Route
            path="/insights/roadmap"
            element={
              <PageContent>
                <RoadmapView />
              </PageContent>
            }
          />
          <Route
            path="/insights/financials"
            element={
              <PageContent>
                <FinancialsView />
              </PageContent>
            }
          />
          <Route
            path="/insights/compass"
            element={
              <PageContent>
                <StrategicCompassView />
              </PageContent>
            }
          />
          <Route
            path="/insights/journey-map"
            element={
              <PageContent>
                <JourneyMap />
              </PageContent>
            }
          />

          {/* Records */}
          <Route
            path="/records/journal"
            element={
              <PageContent>
                <JournalView />
              </PageContent>
            }
          />
          <Route
            path="/records/qa"
            element={
              <PageContent>
                <QuestionsView />
              </PageContent>
            }
          />
          <Route
            path="/records/priorities"
            element={<Navigate to="/insights/strategic-focus" replace />}
          />

          {/* Docs - These have their own layout handling */}
          <Route
            path="/docs/plans/*"
            element={
              <FullWidthContent>
                <PlansView />
              </FullWidthContent>
            }
          />
          <Route
            path="/docs/presentation/*"
            element={
              <FullWidthContent>
                <PresentationView />
              </FullWidthContent>
            }
          />
          <Route
            path="/docs/documentation/*"
            element={
              <FullWidthContent>
                <DocsView />
              </FullWidthContent>
            }
          />

          {/* Catch-all redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
