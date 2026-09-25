import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip, Stack } from '@mui/material';

const layoutRegions = [
  { region: 'Navigation / Outline Side Panel', behavior: 'Section list with progress indicators' },
  { region: 'Primary Content Area', behavior: 'Slide content (fixed position, sometimes scrollable)' },
  { region: 'Chat UI Toggle', behavior: 'Embedded as part of layout; clickable from icons; minimal space' },
  { region: 'Action Bar Toggle', behavior: 'Embedded as part of layout; clickable from icons; minimal space' },
  { region: 'Configurable Panels', behavior: 'Hidden/expandable panels (feedback, notes, analytics) that can be toggled open/closed' },
  { region: 'Game UI Overlay', behavior: 'Profile status display, system action icons, currency/XP status bars — layered on the presentation shell' },
];

const transitions = [
  'Polished slide transitions',
  'Optimized UX',
  'Smooth navigation',
];

const modes = [
  { mode: 'Presenter Mode', description: 'Presenter controls slide progression for audience in real time; audience views are synced' },
  { mode: 'Self-Paced Learner Mode', description: 'User navigates freely at their own pace with presenter chat as passive overlay' },
];

export default function UXDetailsPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          UX Details
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          User experience specifications and interaction design for the PresentationApp.
        </Typography>
      </Box>

      {/* Fixed Shell Layout */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
        Fixed Shell Layout
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
        The app uses a fixed shell layout with the following regions:
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 250 }}>Region</TableCell>
              <TableCell>Behavior</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {layoutRegions.map((row) => (
              <TableRow key={row.region}>
                <TableCell sx={{ fontWeight: 500 }}>{row.region}</TableCell>
                <TableCell>{row.behavior}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* Interaction Modes */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Interaction Modes
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        {modes.map((item) => (
          <Paper 
            key={item.mode}
            variant="outlined" 
            sx={{ p: 2.5, borderLeft: '4px solid #1565c0' }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {item.mode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Slide Registry */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Slide Registry
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
        Slides exist in a list with a reusable data structure for audience targeting:
      </Typography>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          bgcolor: '#1e293b',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography 
          component="pre" 
          sx={{ 
            fontFamily: '"Fira Code", monospace', 
            fontSize: 13, 
            m: 0,
            color: '#e2e8f0',
          }}
        >
{`SlideName: "Finance"
PartOfPresentations: ["Investor", "Founders", "Advisors"]`}
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Transitions */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Transitions & Polish
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {transitions.map((t) => (
          <Chip key={t} label={t} variant="outlined" />
        ))}
      </Box>
    </>
  );
}
