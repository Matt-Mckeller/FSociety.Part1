import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Card, CardContent, Grid, Chip, Stack, Alert } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

const regions = [
  { region: 'Navigation / Outline Side Panel', behavior: 'Section list with progress indicators' },
  { region: 'Primary Content Area', behavior: 'Slide content (fixed position, sometimes scrollable)' },
  { region: 'Chat UI Toggle', behavior: 'Embedded as part of layout; clickable from icons; minimal space' },
  { region: 'Action Bar Toggle', behavior: 'Embedded as part of layout; clickable from icons; minimal space' },
  { region: 'Configurable Panels', behavior: 'Hidden/expandable panels (feedback, notes, analytics, etc.) that can be toggled open/closed' },
  { region: 'Game UI Overlay', behavior: 'Profile status display, system action icons, currency/XP status bars — layered on the presentation shell' },
];

const plannedMockups = [
  { name: 'Main Presentation View', status: 'planned', description: 'Core slide viewing experience with navigation' },
  { name: 'Action Bar Expanded', status: 'planned', description: 'All AI action categories visible' },
  { name: 'Presenter Dashboard', status: 'planned', description: 'Real-time audience feedback and controls' },
  { name: 'Student Profile', status: 'planned', description: 'Profile view with stats, achievements, inventory' },
  { name: 'Level-Up Celebration', status: 'planned', description: 'Reward claim and celebration animation' },
  { name: 'Chat Interface', status: 'planned', description: 'Contextual AI chat integrated with slide' },
  { name: 'Accessibility Modes', status: 'planned', description: 'ADHD, Dyslexia, Screen Reader views' },
  { name: 'Mobile Responsive', status: 'planned', description: 'Tablet and mobile layouts' },
];

export default function DesignMockupsPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Design & Mockups
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Visual design specifications, layout system, and UI mockups.
        </Typography>
      </Box>

      {/* Layout System */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <DesignServicesIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Application Layout
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        The app uses a <strong>fixed shell layout</strong> with the following regions.
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Behavior</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regions.map((row) => (
              <TableRow key={row.region}>
                <TableCell sx={{ fontWeight: 500 }}>{row.region}</TableCell>
                <TableCell>{row.behavior}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Layout Diagram */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Layout Diagram
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#1e293b', borderRadius: 2, mb: 4 }}>
        <Typography component="pre" sx={{ fontFamily: '"Fira Code", monospace', fontSize: 11, m: 0, color: '#e2e8f0', overflow: 'auto' }}>
{`┌─────────────────────────────────────────────────────────────┐
│                    Game UI Overlay                         │
│  [Profile] [Currency] [XP] [Settings] [Inventory]          │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  Navigation  │           Primary Content Area               │
│  / Outline   │                                              │
│              │              (Slide Content)                 │
│  - Section 1 │                                              │
│  - Section 2 │                                              │
│  - Section 3 │                                              │
│              │                                              │
│              ├──────────────────────────────────────────────┤
│              │  [Action Bar]  [Chat Toggle]  [Panels]       │
└──────────────┴──────────────────────────────────────────────┘`}
        </Typography>
      </Paper>

      {/* Key Principles */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Layout Principles
      </Typography>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ p: 2, borderLeft: '4px solid #3b82f6' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Fixed UI Shell</Typography>
          <Typography variant="body2" color="text.secondary">
            The entire app maintains a static screen; only primary content scrolls
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, borderLeft: '4px solid #10b981' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Minimal Toggle Space</Typography>
          <Typography variant="body2" color="text.secondary">
            Chat and action bars use icon toggles to maximize content area
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, borderLeft: '4px solid #f59e0b' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Configurable Panels</Typography>
          <Typography variant="body2" color="text.secondary">
            Fixed positions for MVP; drag-and-drop is a future enhancement
          </Typography>
        </Paper>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Mockups */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        UI Mockups
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Mockups will be added as design work progresses. The following screens are planned.
      </Alert>
      <Grid container spacing={2}>
        {plannedMockups.map((mockup) => (
          <Grid item xs={12} sm={6} md={4} key={mockup.name}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%', 
                opacity: mockup.status === 'planned' ? 0.75 : 1,
                bgcolor: '#f8fafc',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {mockup.name}
                  </Typography>
                  <Chip 
                    label={mockup.status} 
                    size="small"
                    sx={{ 
                      fontSize: '0.6rem',
                      bgcolor: '#fef3c7',
                      color: '#92400e',
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                  {mockup.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
