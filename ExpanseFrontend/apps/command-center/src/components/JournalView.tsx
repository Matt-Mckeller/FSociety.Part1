/**
 * JournalView - Personal journal/notes view
 * Placeholder component for tracking thoughts, decisions, and reflections
 */
import { Box, Typography, Paper } from "@mui/material"
import { MenuBook } from "@mui/icons-material"

export function JournalView() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        📔 Journal
      </Typography>

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <MenuBook sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Journal View Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Track your thoughts, decisions, and reflections here.
        </Typography>
      </Paper>
    </Box>
  )
}
