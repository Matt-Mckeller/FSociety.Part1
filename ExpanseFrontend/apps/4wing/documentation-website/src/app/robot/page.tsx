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
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import LightModeIcon from '@mui/icons-material/LightMode';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const coreFunctions = [
  { function: 'Audio Recording', description: 'Primary input for transcription' },
  { function: 'Video Recording', description: 'Optional, for nonverbal analysis (P2)' },
  { function: 'Status Indicators', description: 'Lights show: recording, processing, idle' },
  { function: 'Brand Presence', description: 'Ice-breaker, approachable companion' },
];

const notDo = [
  'Does not speak or make sounds',
  'Does not interrupt sessions',
  'Does not provide feedback directly to client',
];

const designRequirements = [
  { aspect: 'Aesthetic', detail: 'Personable creature/character (not humanoid)' },
  { aspect: 'Demeanor', detail: 'Non-threatening, approachable, calming' },
  { aspect: 'Size', detail: "Compact, desk-friendly (fits on counselor's desk)" },
  { aspect: 'Presence', detail: 'Visible but unobtrusive' },
];

const hardwareSpecs = [
  {
    component: 'Microphone',
    requirement: 'Omnidirectional, noise-canceling',
    icon: <MicIcon />,
  },
  {
    component: 'Camera',
    requirement: '1080p wide-angle (optional)',
    icon: <VideocamIcon />,
  },
  {
    component: 'Lights',
    requirement: 'RGB LED for status indication',
    icon: <LightModeIcon />,
  },
  {
    component: 'Connectivity',
    requirement: 'WiFi / Bluetooth to app',
    icon: <BluetoothIcon />,
  },
  {
    component: 'Power',
    requirement: 'USB-C or rechargeable battery',
    icon: <BatteryChargingFullIcon />,
  },
];

const statusLights = [
  { color: '🟢', state: 'Green', meaning: 'Idle, ready', chipColor: '#10B981' },
  { color: '🔵', state: 'Blue', meaning: 'Recording/listening', chipColor: '#3B82F6' },
  { color: '🟡', state: 'Yellow', meaning: 'Processing', chipColor: '#F59E0B' },
  { color: '🔴', state: 'Red', meaning: 'Error / needs attention', chipColor: '#EF4444' },
  { color: '⚪', state: 'Off', meaning: 'Powered off / privacy mode', chipColor: '#9CA3AF' },
];

const designInspiration = [
  'Approachable like a therapy comfort object',
  'Not distracting during emotional moments',
  'Familiar enough to feel safe, novel enough to be memorable',
];

const deliverables = [
  { item: 'Character concept sketches', done: false },
  { item: '3D model / render for pitch', done: false },
  { item: 'Hardware prototype (or mockup for hackathon)', done: false },
  { item: 'Brand integration (name, personality)', done: false },
];

export default function RobotPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Robot Model
      </Typography>

      {/* Purpose */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SmartToyIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={600}>
            Purpose
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Friendly medium for camera/mic—reduces discomfort of being recorded during counseling
          sessions.
        </Typography>
        <Paper
          sx={{
            p: 2,
            backgroundColor: '#FEF3C7',
            borderLeft: '4px solid #F59E0B',
          }}
        >
          <Typography fontWeight={600} color="warning.dark">
            Important: The robot is passive. It never speaks or interrupts sessions.
          </Typography>
        </Paper>
      </Paper>

      {/* Core Functions */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Core Functions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Function</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coreFunctions.map((row) => (
                <TableRow key={row.function}>
                  <TableCell>
                    <Typography fontWeight={500}>{row.function}</Typography>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Card sx={{ mt: 3, borderLeft: '4px solid #EF4444' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <DoNotDisturbIcon color="error" />
              <Typography variant="h6" fontWeight={600}>
                What the robot does NOT do:
              </Typography>
            </Box>
            <List dense>
              {notDo.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DoNotDisturbIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Design Requirements */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Design Requirements
        </Typography>
        <Grid container spacing={2}>
          {designRequirements.map((req) => (
            <Grid size={{ xs: 12, sm: 6 }} key={req.aspect}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="primary" fontWeight={600}>
                    {req.aspect}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {req.detail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Hardware Specifications */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Hardware Specifications
        </Typography>
        <Grid container spacing={2}>
          {hardwareSpecs.map((spec) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={spec.component}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box sx={{ color: 'primary.main' }}>{spec.icon}</Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {spec.component}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {spec.requirement}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Status Light Meanings */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Status Light Meanings
        </Typography>
        <Grid container spacing={2}>
          {statusLights.map((status) => (
            <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={status.state}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Typography fontSize={32}>{status.color}</Typography>
                  <Chip
                    label={status.state}
                    size="small"
                    sx={{
                      backgroundColor: status.chipColor,
                      color: 'white',
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {status.meaning}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Design Inspiration */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Design Inspiration
        </Typography>
        <Card>
          <CardContent>
            <List dense>
              {designInspiration.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Deliverables */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Deliverables
        </Typography>
        <Card>
          <CardContent>
            <List dense>
              {deliverables.map((item, index) => (
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
      </Box>
    </Container>
  );
}
