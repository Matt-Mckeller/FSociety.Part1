'use client'

import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

import { ShellMockProvider, MockAppShell, useShellMock } from '@/components/shell-preview'

// ============================================================================
// Control Panel Component
// ============================================================================

function ControlPanel() {
  const { theme, setTheme, panels, togglePanel, user, setUser } = useShellMock()

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        bgcolor: '#1e293b',
        color: 'white',
        borderRadius: 1.5,
        mb: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Theme */}
        <Grid item xs={12} sm={6} md={2.5}>
          <Typography variant="caption" sx={{ color: '#64748b', mb: 0.5, display: 'block' }}>
            Theme
          </Typography>
          <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={(_, v) => v && setTheme(v)}
            size="small"
            sx={{ 
              bgcolor: '#0f172a',
              '& .MuiToggleButton-root': { 
                color: '#94a3b8',
                borderColor: '#334155',
                py: 0.5,
                px: 1.5,
                '&.Mui-selected': {
                  bgcolor: '#3b82f6',
                  color: 'white',
                }
              }
            }}
          >
            <ToggleButton value="light">
              <LightModeIcon sx={{ fontSize: 16 }} />
            </ToggleButton>
            <ToggleButton value="dark">
              <DarkModeIcon sx={{ fontSize: 16 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* Panels */}
        <Grid item xs={12} sm={6} md={4.5}>
          <Typography variant="caption" sx={{ color: '#64748b', mb: 0.5, display: 'block' }}>
            Panels
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            <FormControlLabel
              control={<Switch size="small" checked={panels.navigation} onChange={() => togglePanel('navigation')} />}
              label="Nav"
              sx={{ color: '#e2e8f0', '& .MuiTypography-root': { fontSize: '0.75rem' }, mr: 1 }}
            />
            <FormControlLabel
              control={<Switch size="small" checked={panels.quest} onChange={() => togglePanel('quest')} />}
              label="Quest"
              sx={{ color: '#e2e8f0', '& .MuiTypography-root': { fontSize: '0.75rem' }, mr: 1 }}
            />
            <FormControlLabel
              control={<Switch size="small" checked={panels.chat} onChange={() => togglePanel('chat')} />}
              label="Chat"
              sx={{ color: '#e2e8f0', '& .MuiTypography-root': { fontSize: '0.75rem' } }}
            />
          </Stack>
        </Grid>

        {/* User Level */}
        <Grid item xs={6} sm={6} md={2.5}>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
            Level: {user.level}
          </Typography>
          <Slider
            value={user.level}
            onChange={(_, v) => setUser({ ...user, level: v as number })}
            min={1}
            max={50}
            size="small"
            sx={{ color: '#8b5cf6', py: 0.5 }}
          />
        </Grid>

        {/* XP Progress */}
        <Grid item xs={6} sm={6} md={2.5}>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
            XP: {user.xp}/{user.maxXp}
          </Typography>
          <Slider
            value={user.xp}
            onChange={(_, v) => setUser({ ...user, xp: v as number })}
            min={0}
            max={user.maxXp}
            size="small"
            sx={{ color: '#f59e0b', py: 0.5 }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

// ============================================================================
// Preview Container
// ============================================================================

function PreviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        height: 600,
        overflow: 'hidden',
        border: '2px solid #e2e8f0',
        borderRadius: 1.5,
        bgcolor: '#f1f5f9',
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '125%',
          height: '125%',
          transform: 'scale(0.8)',
          transformOrigin: 'top left',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

// ============================================================================
// Component Regions Legend
// ============================================================================

function ComponentLegend() {
  const regions = [
    { name: 'TopBar', color: '#3b82f6', bg: '#f0f9ff', desc: 'Logo, XP, coins, toggles' },
    { name: 'SideNav', color: '#8b5cf6', bg: '#faf5ff', desc: 'Sections, progress' },
    { name: 'ContentArea', color: '#10b981', bg: '#f0fdf4', desc: 'Slide content' },
    { name: 'PanelDrawer', color: '#f59e0b', bg: '#fef3c7', desc: 'Quest, chat, notes' },
  ]

  return (
    <Grid container spacing={1} sx={{ mt: 1.5 }}>
      {regions.map((r) => (
        <Grid item xs={6} sm={3} key={r.name}>
          <Card variant="outlined" sx={{ p: 1, bgcolor: r.bg, borderColor: r.color }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: r.color }}>{r.name}</Typography>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              {r.desc}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

// ============================================================================
// Main Interactive Shell Preview Accordion
// ============================================================================

export default function InteractiveShellPreview() {
  return (
    <Accordion 
      defaultExpanded={false}
      sx={{ 
        mb: 4,
        border: '1px solid',
        borderColor: '#3b82f6',
        borderRadius: '8px !important',
        '&:before': { display: 'none' },
        bgcolor: '#f8fafc',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          bgcolor: '#f0f9ff',
          borderRadius: '8px',
          '&.Mui-expanded': {
            borderRadius: '8px 8px 0 0',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PlayCircleIcon sx={{ color: '#3b82f6' }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e40af' }}>
              Interactive Shell Preview
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Toggle panels, change themes, and explore the shell layout
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 2 }}>
        <ShellMockProvider initialPanels={{ navigation: true }}>
          <ControlPanel />
          <PreviewContainer>
            <MockAppShell />
          </PreviewContainer>
          <ComponentLegend />
        </ShellMockProvider>
      </AccordionDetails>
    </Accordion>
  )
}
