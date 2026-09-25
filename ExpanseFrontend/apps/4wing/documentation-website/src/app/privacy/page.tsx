'use client';

import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShieldIcon from '@mui/icons-material/Shield';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const principles = [
  { icon: <LockIcon />, text: 'All data encrypted (TLS 1.3 in transit, AES-256 at rest)' },
  { icon: <HowToRegIcon />, text: 'Explicit consent required before recording' },
  { icon: <ShieldIcon />, text: 'Role-based access control' },
  { icon: <DeleteIcon />, text: 'Auto-delete options / configurable retention' },
  { icon: <SecurityIcon />, text: 'HIPAA-aware design' },
];

const consentFeatures = [
  'Clear opt-in before recording',
  'Separate consent for audio vs video',
  'Revocable at any time',
  'Robot status light indicates recording state',
];

const accessControl = [
  { role: 'Counselor', access: 'Full session data' },
  { role: 'Client', access: 'Filtered recaps, own data' },
  { role: 'Supervisor', access: 'Anonymized analytics' },
  { role: 'Admin', access: 'System config only' },
];

const dataRetention = [
  'Default: 90 days (configurable)',
  'Client can request deletion anytime',
  'Raw audio/video auto-purged after processing',
  'Summaries retained longer than recordings',
];

const hipaaFeatures = [
  'No PHI without consent',
  'BAA available for healthcare orgs',
  'Audit logging for all access',
  'Secure disposal procedures',
];

const roadmap = [
  { item: 'SOC 2 Type II', done: false },
  { item: 'HIPAA certification', done: false },
  { item: 'GDPR compliance', done: false },
];

const incidentResponse = [
  '24-hour breach notification',
  'Regular security audits',
  'Penetration testing schedule',
];

export default function PrivacyPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Privacy & Security
      </Typography>

      {/* Principles */}
      <Paper sx={{ p: 4, mb: 6, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
        <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: 'white' }}>
          Principles
        </Typography>
        <Grid container spacing={2}>
          {principles.map((principle, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'white' }}>
                {principle.icon}
                <Typography>{principle.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Consent */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Consent
        </Typography>
        <Card>
          <CardContent>
            <List dense>
              {consentFeatures.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Access Control */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Access Control
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessControl.map((row) => (
                <TableRow key={row.role}>
                  <TableCell>
                    <Typography fontWeight={500}>{row.role}</Typography>
                  </TableCell>
                  <TableCell>{row.access}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Data Retention */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Data Retention
        </Typography>
        <Card>
          <CardContent>
            <List dense>
              {dataRetention.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DeleteIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Compliance */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Compliance
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  HIPAA
                </Typography>
                <List dense>
                  {hipaaFeatures.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <ShieldIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Roadmap
                </Typography>
                <List dense>
                  {roadmap.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Checkbox checked={item.done} disabled size="small" />
                      </ListItemIcon>
                      <ListItemText primary={item.item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Incident Response */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Incident Response
        </Typography>
        <Card>
          <CardContent>
            <List dense>
              {incidentResponse.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <NotificationsActiveIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
