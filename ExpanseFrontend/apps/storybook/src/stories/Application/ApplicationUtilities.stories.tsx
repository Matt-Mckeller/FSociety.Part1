"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, List, ListItem, ListItemText, Chip, Divider } from "@mui/material"

/**
 * # Application Utilities
 * 
 * The Application module contains utility components for application-wide concerns
 * like error handling, analytics, and router event logging.
 * 
 * These components are typically used at the root of the application and don't have
 * visual UI elements - they provide infrastructure functionality.
 */

// Documentation-only component
const ApplicationUtilitiesDocumentation = () => {
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        Application Utility Components
      </Typography>
      
      <Typography variant="body1" paragraph>
        The following components provide application-wide infrastructure and are typically
        wrapped around the main application content.
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          ApplicationErrorBoundaryLogger
        </Typography>
        <Chip label="Infrastructure" size="small" sx={{ mb: 2 }} />
        <Typography variant="body2" paragraph>
          Catches and logs uncaught JavaScript errors throughout the application.
          In development mode, it displays an error screen. In production, it logs
          errors for monitoring without disrupting the user experience.
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Usage:
        </Typography>
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`<ApplicationErrorBoundaryLogger>
  <App />
</ApplicationErrorBoundaryLogger>`}
        </Box>
        <List dense>
          <ListItem>
            <ListItemText 
              primary="children" 
              secondary="ReactNode - The application content to wrap"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          GoogleAnalytics
        </Typography>
        <Chip label="Analytics" size="small" sx={{ mb: 2 }} />
        <Typography variant="body2" paragraph>
          Integrates Google Analytics 4 (GA4) into the application. Handles script
          loading and provides the gtag function for event tracking.
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Usage:
        </Typography>
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`<GoogleAnalytics 
  gaId="G-XXXXXXXXXX" 
  dataLayerName="dataLayer" 
/>`}
        </Box>
        <List dense>
          <ListItem>
            <ListItemText 
              primary="gaId (required)" 
              secondary="string - Google Analytics measurement ID (e.g., G-XXXXXXXXXX)"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="dataLayerName" 
              secondary="string - Name for the data layer (default: 'dataLayer')"
            />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary">
          Helper Functions:
        </Typography>
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`import { sendGAEvent } from 'expanse.ui/application'

// Send custom events
sendGAEvent('button_click', { button_name: 'signup' })`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          RouterEventLogger
        </Typography>
        <Chip label="Analytics" size="small" sx={{ mb: 2 }} />
        <Typography variant="body2" paragraph>
          Logs navigation events for analytics purposes. Listens to browser history
          changes and can send analytics events via GraphQL mutations.
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Usage:
        </Typography>
        <Box component="pre" sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, fontSize: 12 }}>
{`<RouterEventLogger>
  <AppContent />
</RouterEventLogger>`}
        </Box>
        <List dense>
          <ListItem>
            <ListItemText 
              primary="children" 
              secondary="ReactNode - The application content to wrap"
            />
          </ListItem>
        </List>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Note: Requires AnalyticsContext to be provided in the component tree.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: "info.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Typical Setup
        </Typography>
        <Box component="pre" sx={{ bgcolor: "common.white", p: 2, borderRadius: 1, fontSize: 12 }}>
{`// In your root layout or _app.tsx
import { 
  ApplicationErrorBoundaryLogger,
  GoogleAnalytics,
  RouterEventLogger 
} from 'expanse.ui/application'

export default function RootLayout({ children }) {
  return (
    <ApplicationErrorBoundaryLogger>
      <GoogleAnalytics gaId={process.env.GA_ID} />
      <RouterEventLogger>
        {children}
      </RouterEventLogger>
    </ApplicationErrorBoundaryLogger>
  )
}`}
        </Box>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof ApplicationUtilitiesDocumentation> = {
  title: "Application/Utilities",
  component: ApplicationUtilitiesDocumentation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Infrastructure components for error handling, analytics, and event logging.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ApplicationUtilitiesDocumentation>

export const Documentation: Story = {}
