/**
 * Header Component
 */

'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import GitHubIcon from '@mui/icons-material/GitHub'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import PaletteIcon from '@mui/icons-material/Palette'
import DownloadIcon from '@mui/icons-material/Download'

const PROCESS_STEPS = [
  {
    icon: <CloudUploadIcon />,
    title: '1. Upload Animation',
    description: 'Drop or select a Lottie JSON file. Optionally add hints to improve AI analysis.',
  },
  {
    icon: <DescriptionIcon />,
    title: '2. Generate Metadata',
    description: 'AI analyzes the animation structure and generates a name, description, and tags.',
  },
  {
    icon: <LayersIcon />,
    title: '3. Name Elements',
    description: 'AI identifies themeable elements and names them using a [Purpose][Location][Detail] pattern.',
  },
  {
    icon: <PaletteIcon />,
    title: '4. Generate Themes',
    description: 'Pick light/dark color palettes; AI generates optimized color mappings for each theme.',
  },
  {
    icon: <DownloadIcon />,
    title: '5. Export',
    description: 'Download the schema (.expanse-lottie.ts), React component, theme files, or a ZIP of everything.',
  },
]

export function Header() {
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'transparent',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoFixHighIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #a15bca 0%, #e1c2f5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Lottie Studio
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Documentation">
            <IconButton color="inherit" size="small" onClick={() => setHelpOpen(true)}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub">
            <IconButton color="inherit" size="small">
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Lottie Studio Help</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Example process
          </Typography>
          <List dense disablePadding>
            {PROCESS_STEPS.map((step) => (
              <ListItem key={step.title} sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>{step.icon}</ListItemIcon>
                <ListItemText primary={step.title} secondary={step.description} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Status
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip size="small" label="No automated tests" color="warning" variant="outlined" />
            <Chip size="small" label="Requires backend running (:4000)" variant="outlined" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            There is no automated test suite yet for this app — the backend has Jest configured
            (`npm test` in `backend/`) but no spec files exist, and the frontend has no test
            runner set up. To manually verify the app works end-to-end, start both dev servers
            (`npm run dev` in `backend/` and `frontend/`), then run through the 5 steps above
            with a real Lottie JSON file. See the project README for full setup instructions.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}

export default Header
