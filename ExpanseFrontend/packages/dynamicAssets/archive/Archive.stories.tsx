import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import ArchiveIcon from "@mui/icons-material/Archive"
import InfoIcon from "@mui/icons-material/Info"

/**
 * Archive - Deprecated Components
 *
 * This section documents components that have been archived and are no longer actively used.
 * These components are kept for reference but should not be used in new development.
 */
const meta: Meta = {
  title: "DynamicAssets/Archive",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

// ============================================================================
// Documentation
// ============================================================================

export const ArchivedComponentsList: StoryObj = {
  name: "Archived Components Overview",
  render: () => {
    const archivedComponents = [
      {
        name: "Chest.component.tsx",
        description:
          "A treasure chest SVG component. Replaced by ChestOpening1Animation (Lottie).",
      },
      {
        name: "CirclesGrayDotted.component.tsx",
        description:
          "Decorative dotted circles pattern. No longer used in current designs.",
      },
      {
        name: "Exclamation.component.tsx",
        description: "An exclamation mark SVG. Replaced by MUI icons.",
      },
      {
        name: "ExpandingGlobe.component.tsx",
        description:
          "Animated globe component. Functionality moved to other graphics.",
      },
      {
        name: "GoogleMap.component.tsx",
        description:
          "Google Maps embed component. Removed from current application.",
      },
      {
        name: "LineWithSquaresAtTheEnd.component.tsx",
        description: "Decorative line element. No longer used.",
      },
      {
        name: "ProcessChalkboard.tsx",
        description:
          "Chalkboard process diagram. Replaced by ScrumBoard and other graphics.",
      },
      {
        name: "TriLogoUp.component.tsx",
        description: "Triangular logo variant. Superseded by current branding.",
      },
    ]

    return (
      <Box sx={{ maxWidth: 800 }}>
        <Typography variant="h4" mb={2}>
          <ArchiveIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Archived Components
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Deprecation Notice:</strong> The components listed below
            have been archived and should not be used in new development. They
            are preserved for historical reference and potential future
            restoration.
          </Typography>
        </Alert>

        <Paper sx={{ p: 0, mb: 3 }}>
          <List>
            {archivedComponents.map((component, index) => (
              <React.Fragment key={component.name}>
                <ListItem>
                  <ListItemIcon>
                    <ArchiveIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{ fontFamily: "monospace" }}
                      >
                        {component.name}
                      </Typography>
                    }
                    secondary={component.description}
                  />
                </ListItem>
                {index < archivedComponents.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 3, bgcolor: "info.light" }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <InfoIcon color="info" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Restoration Process
              </Typography>
              <Typography variant="body2">
                If you need to restore an archived component:
              </Typography>
              <Typography variant="body2" component="ol" sx={{ mt: 1, pl: 2 }}>
                <li>
                  Review the component code in{" "}
                  <code>packages/dynamicAssets/archive/</code>
                </li>
                <li>
                  Update the component to follow current patterns and standards
                </li>
                <li>
                  Move it to the appropriate active directory (graphics, shapes,
                  etc.)
                </li>
                <li>Add proper TypeScript types and documentation</li>
                <li>Create a Storybook story for the component</li>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            File Location
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "monospace",
              bgcolor: "grey.100",
              p: 1,
              borderRadius: 1,
            }}
          >
            packages/dynamicAssets/archive/
          </Typography>
        </Paper>
      </Box>
    )
  },
}
