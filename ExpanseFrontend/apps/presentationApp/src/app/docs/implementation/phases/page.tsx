import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Divider, Card, CardContent, Stack } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const phases = [
  { 
    phase: 'Phase 1', 
    name: 'Shell', 
    focus: 'Foundation', 
    deliverables: 'App shell, routing, auth, slide navigation with placeholder content',
    duration: '2 weeks',
  },
  { 
    phase: 'Phase 2', 
    name: 'Gamification UI', 
    focus: 'Game layer', 
    deliverables: 'Status bars, quest panel, coin animations, level-up flow',
    duration: '2 weeks',
  },
  { 
    phase: 'Phase 3', 
    name: 'Presenter Mode', 
    focus: 'Real-time', 
    deliverables: 'WebSockets, presenter sync, self-paced mode, audience types',
    duration: '2 weeks',
  },
  { 
    phase: 'Phase 4', 
    name: 'Actions & Feedback', 
    focus: 'Interaction', 
    deliverables: 'Action bars (mocked AI), context menu, feedback system',
    duration: '2 weeks',
  },
  { 
    phase: 'Phase 5', 
    name: 'Content System', 
    focus: 'Content', 
    deliverables: 'Block model, variants, accessibility modes, AI caching',
    duration: '3 weeks',
  },
  { 
    phase: 'Phase 6', 
    name: 'Panels & Chat', 
    focus: 'Panels', 
    deliverables: 'Panel system, chat, notes, analytics',
    duration: '2 weeks',
  },
  { 
    phase: 'Phase 7', 
    name: 'AI Integration', 
    focus: 'AI', 
    deliverables: 'Real AI calls, learning strategies UI, content pipelines',
    duration: '3 weeks',
  },
  { 
    phase: 'Phase 8', 
    name: 'Polish', 
    focus: 'Complete', 
    deliverables: 'Theming, decorative elements, profile view, inventory',
    duration: '2 weeks',
  },
];

const phaseColors = [
  '#dc2626', '#f59e0b', '#10b981', '#3b82f6', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
];

export default function PhasesPage() {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Implementation Phases
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 700 }}>
          Detailed build phases with deliverables and estimated timelines.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <AccountTreeIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Phased Approach
        </Typography>
      </Box>

      {/* Timeline View */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        {phases.map((phase, idx) => (
          <Card 
            key={phase.phase}
            variant="outlined"
            sx={{ 
              borderLeft: `4px solid ${phaseColors[idx]}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: 1,
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box 
                  sx={{ 
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: `${phaseColors[idx]}15`,
                    color: phaseColors[idx],
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {phase.phase}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {phase.name}
                    </Typography>
                    <Chip 
                      label={phase.focus} 
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                    <Chip 
                      label={phase.duration} 
                      size="small"
                      sx={{ 
                        fontSize: '0.65rem', 
                        height: 20,
                        bgcolor: '#f1f5f9',
                        color: '#64748b',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {phase.deliverables}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Summary Table */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Phase Summary
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Phase</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Focus</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phases.map((phase, idx) => (
              <TableRow key={phase.phase}>
                <TableCell>
                  <Chip
                    label={phase.phase}
                    size="small"
                    sx={{ 
                      bgcolor: `${phaseColors[idx]}15`,
                      color: phaseColors[idx],
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{phase.name}</TableCell>
                <TableCell>{phase.focus}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{phase.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Total Estimated Duration:</strong> ~18 weeks (4.5 months) for full implementation
        </Typography>
      </Box>
    </>
  );
}
