import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import MermaidDiagram from '../components/MermaidDiagram';
import { allComplianceDiagrams } from '../data/compliance';

const requirements = [
  { regulation: 'GDPR', requirement: 'Explicit consent before data collection', status: 'Required' },
  { regulation: 'GDPR', requirement: 'Consent stored with timestamp, IP, version', status: 'Required' },
  { regulation: 'GDPR', requirement: 'Easy consent withdrawal', status: 'Required' },
  { regulation: 'GDPR', requirement: 'Data export capability', status: 'Required' },
  { regulation: 'GDPR', requirement: 'Data deletion (right to be forgotten)', status: 'Required' },
  { regulation: 'CCPA', requirement: '"Do Not Sell" option', status: 'Required' },
  { regulation: 'CCPA', requirement: 'Data access request capability', status: 'Required' },
  { regulation: 'COPPA', requirement: 'Age verification at signup', status: 'Required' },
  { regulation: 'COPPA', requirement: 'Parental consent for under-13', status: 'Required' },
  { regulation: 'COPPA', requirement: 'Verifiable parental consent method', status: 'Required' },
  { regulation: 'COPPA', requirement: 'School-as-agent exception (EdLink)', status: 'Supported' },
  { regulation: 'COPPA', requirement: 'Minimal data collection for children', status: 'Required' },
  { regulation: 'COPPA', requirement: 'No behavioral advertising to children', status: 'Required' },
];

export default function CompliancePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
        Compliance & Consent
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        GDPR, CCPA, and COPPA compliance requirements and implementation.
      </Typography>

      <Grid container spacing={3}>
        {allComplianceDiagrams.slice(0, 2).map((diagram, i) => (
          <Grid size={{ xs: 12, lg: 6 }} key={i}>
            <MermaidDiagram 
              chart={diagram.chart} 
              title={diagram.title}
              description={diagram.description}
            />
          </Grid>
        ))}

        <Grid size={12}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Compliance Requirements Checklist
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Regulation</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Requirement</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'primary.main', borderColor: 'divider' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requirements.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ borderColor: 'divider' }}>
                      <Chip 
                        label={r.regulation} 
                        size="small" 
                        color={r.regulation === 'GDPR' ? 'primary' : r.regulation === 'CCPA' ? 'secondary' : 'warning'}
                      />
                    </TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}>{r.requirement}</TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}>
                      <Chip 
                        label={r.status} 
                        size="small"
                        color={r.status === 'Required' ? 'error' : 'success'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {allComplianceDiagrams.slice(2).map((diagram, i) => (
          <Grid size={{ xs: 12, lg: 6 }} key={i}>
            <MermaidDiagram 
              chart={diagram.chart} 
              title={diagram.title}
              description={diagram.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
