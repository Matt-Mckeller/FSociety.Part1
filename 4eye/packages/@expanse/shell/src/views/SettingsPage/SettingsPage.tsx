"use client";

import React from "react";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";

/**
 * Represents a section within the settings page.
 */
export interface SettingsSection {
  /** Unique identifier for the section (used as React key) */
  id: string;
  /** Section title displayed as a header */
  title: string;
  /** Optional description shown below the title */
  description?: string;
  /** Content to render within the section */
  content: React.ReactNode;
}

export interface SettingsPageProps {
  /** Page title displayed at the top */
  title?: string;
  /** Array of settings sections to render */
  sections: SettingsSection[];
  /** Maximum width of the settings container */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Whether to wrap each section in a Paper component */
  elevated?: boolean;
}

/**
 * A reusable settings page layout component.
 *
 * Renders a consistent settings UI with sections that can contain
 * any content (toggles, selectors, forms, etc.).
 *
 * @example
 * <SettingsPage
 *   title="Settings"
 *   sections={[
 *     {
 *       id: 'appearance',
 *       title: 'Appearance',
 *       description: 'Customize how the app looks',
 *       content: (
 *         <>
 *           <LightDarkModeToggle />
 *           <ThemeColorSelector />
 *         </>
 *       ),
 *     },
 *     {
 *       id: 'notifications',
 *       title: 'Notifications',
 *       content: <NotificationSettings />,
 *     },
 *   ]}
 * />
 */
export function SettingsPage({
  title = "Settings",
  sections,
  maxWidth = "sm",
  elevated = true,
}: SettingsPageProps) {
  const resolvedMaxWidth =
    maxWidth === "xs"
      ? 444
      : maxWidth === "sm"
      ? 600
      : maxWidth === "md"
      ? 900
      : maxWidth === "lg"
      ? 1200
      : 1536;

  return (
    <Container maxWidth={false} sx={{ py: 4, maxWidth: resolvedMaxWidth }}>
      {title && (
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {sections.map((section, index) => {
          const sectionContent = (
            <Box key={section.id}>
              <Typography variant="h6" component="h2" gutterBottom>
                {section.title}
              </Typography>

              {section.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 2
                  }}>
                  {section.description}
                </Typography>
              )}

              <Box sx={{ mt: 2 }}>{section.content}</Box>
            </Box>
          );

          if (elevated) {
            return (
              <Paper key={section.id} sx={{ p: 3 }}>
                {sectionContent}
              </Paper>
            );
          }

          return (
            <React.Fragment key={section.id}>
              {sectionContent}
              {index < sections.length - 1 && <Divider sx={{ my: 2 }} />}
            </React.Fragment>
          );
        })}
      </Box>
    </Container>
  );
}

export default SettingsPage;
