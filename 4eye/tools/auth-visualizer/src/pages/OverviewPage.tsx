import { Typography, Box, Grid, Paper, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import MermaidDiagram from '../components/MermaidDiagram';

const overviewDiagram = `mindmap
  root((Auth System))
    Authentication
      Email/Password
      Google OAuth
      Apple Sign In
      EdLink SSO
      Guest Mode
    Authorization
      Role-based
      Route Guards
      API Guards
    Compliance
      GDPR
      CCPA
      COPPA
    User Management
      Signup
      Profile
      Password Reset`;

const phases = [
  { phase: '2A', name: 'Core Auth', items: ['Secure cookies', 'Auth guards', 'Guest mode'], status: 'MVP' },
  { phase: '2B', name: 'OAuth + Consent', items: ['Google OAuth', 'Consent tracking', 'Age verification'], status: 'MVP' },
  { phase: '2C', name: 'Compliance', items: ['Password reset', 'COPPA flows', 'Parent consent'], status: 'MVP' },
  { phase: '2D', name: 'Apple OAuth', items: ['Apple Sign In', 'iOS integration'], status: 'iOS Launch' },
  { phase: '3', name: 'EdLink', items: ['EdLink SSO', 'Roster sync', 'School setup'], status: 'Education' },
];

const decisions = [
  { decision: 'httpOnly Cookies', rationale: 'XSS protection - tokens not readable by JavaScript' },
  { decision: 'Two-layer Architecture', rationale: 'Separation of concerns - session vs auth logic' },
  { decision: 'OAuth in Initial Build', rationale: 'Avoid auth flow refactoring later' },
  { decision: 'Separate Consent Module', rationale: 'Complex enough for own package, reusable' },
  { decision: 'Guest Mode MVP', rationale: 'Required for room join-by-link feature' },
];

export default function OverviewPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
        Authentication System Overview
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Complete authentication architecture for 4eye/Expanse platforms, supporting multiple auth methods 
        and full compliance with GDPR, CCPA, and COPPA regulations.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <MermaidDiagram 
            chart={overviewDiagram} 
            title="System Overview"
            description="High-level view of auth system components"
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Key Decisions
            </Typography>
            <Table size="small">
              <TableBody>
                {decisions.map((d) => (
                  <TableRow key={d.decision}>
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main', borderColor: 'divider' }}>
                      {d.decision}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', borderColor: 'divider' }}>
                      {d.rationale}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Implementation Phases
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Phase</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Features</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phases.map((p) => (
                  <TableRow key={p.phase}>
                    <TableCell sx={{ borderColor: 'divider' }}>
                      <Chip label={p.phase} size="small" color="primary" />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500, borderColor: 'divider' }}>{p.name}</TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}>
                      {p.items.map((item) => (
                        <Chip key={item} label={item} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}>
                      <Chip 
                        label={p.status} 
                        size="small" 
                        color={p.status === 'MVP' ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
