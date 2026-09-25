import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Security as SecurityIcon,
  Warning as WarningIcon,
  Visibility as SurveillanceIcon,
  Home as HomeIcon,
  Lightbulb as LightbulbIcon,
  Shield as ShieldIcon,
  LocationOn as LocationIcon,
  MicOff as MicIcon,
  CameraAlt as CameraIcon,
  Wifi as WifiIcon,
  Badge as IdentityIcon,
  Lock as LockIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import backgroundData from '../../../src/data/background.json';

const { background } = backgroundData;
const { securityContext } = background;

// Lightbulb mic details (previously in background.json, now inline)
const lightbulbMicDetails = {
  location: "Kitchen",
  discoveryMethod: "Light didn't power off despite flipping the power switch and turning off the kitchen lighting",
  removalDate: "Around 12/22",
  context: "After narrator spoke in apartment about uncertainty of who was observing (CIA, Mob, Google/Microsoft) and mentioned knowledge of mic taps, the assumed mic was removed",
  additionalSuspectedTaps: ["Bed area", "Nightstand area"]
};

// Apartment entry timing (previously in background.json, now inline)
const apartmentEntryTiming = {
  firstNoticed: "After Casino Day 2 (Harrahs)"
};

// Additional security concerns data
const additionalConcerns = {
  identityConcerns: [
    "IRS papers with SSN visible in apartment",
    "ID potentially pickpocketed multiple times",
    "Mac Properties ticket taken and returned at casino",
    "Concern about being framed with identity",
  ],
  surveillanceEvidence: [
    {
      type: "Audio",
      evidence: "Kitchen lightbulb that didn't power off when switch flipped",
      status: "Removed ~12/22",
    },
    {
      type: "Visual",
      evidence: "Apartment interior visible from outside, potential visual surveillance",
      status: "Unknown",
    },
    {
      type: "Location",
      evidence: "Tracking suspected based on coordinated appearances",
      status: "Unknown",
    },
    {
      type: "Network",
      evidence: "WiFi setup concerns, potentially compromised network",
      status: "Addressed",
    },
  ],
  apartmentEntryEvidence: [
    "Green folders moved to bed",
    "$20 in ones on nightstand (after 'break into small pieces' conversation)",
    "Weed smell after Keystone event",
    "Lysol on nightstand (mentioned by Logan - proves surveillance)",
    "Room entry attempt at hotel (called 911)",
  ],
  defensiveMeasuresTimeline: [
    { date: "Dec 20-22", action: "Purchased new equipment from Microcenter" },
    { date: "Dec 22", action: "Removed kitchen lightbulb mic" },
    { date: "Dec 23", action: "Moved out of Mac Properties" },
    { date: "Dec 25", action: "Stopped using new equipment (AT&T activation issues)" },
    { date: "Ongoing", action: "Traveling" },
  ],
};

export default function SecurityConcerns() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <SecurityIcon sx={{ fontSize: 40, color: 'error.main' }} />
        <Typography variant="h4">Security Concerns</Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Documented security issues, surveillance evidence, and defensive measures taken.
      </Typography>

      {/* Awareness Level Alert */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="subtitle2">
          Security Awareness Level: <Chip size="small" label={securityContext.awarenessLevel.toUpperCase()} color="warning" />
        </Typography>
        <Typography variant="body2">
          Multiple indicators suggest apartment was under surveillance. Defensive measures have been implemented.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Surveillance Evidence */}
        <Grid size={12}>
          <Paper sx={{ p: 3, borderLeft: '4px solid', borderColor: 'error.main' }}>
            <Typography variant="h6" gutterBottom color="error">
              <SurveillanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Surveillance Evidence
            </Typography>
            <Grid container spacing={2}>
              {additionalConcerns.surveillanceEvidence.map((item, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        {item.type === 'Audio' && <MicIcon color="error" />}
                        {item.type === 'Visual' && <CameraIcon color="error" />}
                        {item.type === 'Location' && <LocationIcon color="error" />}
                        {item.type === 'Network' && <WifiIcon color="error" />}
                        <Typography variant="subtitle2">{item.type}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.evidence}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={item.status}
                        color={item.status === 'Addressed' || item.status.includes('Removed') ? 'success' : 'warning'}
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Lightbulb Mic Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <LightbulbIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'warning.main' }} />
              Lightbulb Mic Details
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Location" secondary={lightbulbMicDetails.location} />
              </ListItem>
              <ListItem>
                <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                <ListItemText primary="Discovery Method" secondary={lightbulbMicDetails.discoveryMethod} />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                <ListItemText primary="Removal Date" secondary={lightbulbMicDetails.removalDate} />
              </ListItem>
            </List>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Context:</strong> {lightbulbMicDetails.context}
              </Typography>
            </Alert>
            {lightbulbMicDetails.additionalSuspectedTaps && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Additional Suspected Taps:</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {lightbulbMicDetails.additionalSuspectedTaps.map((tap, i) => (
                    <Chip key={i} size="small" label={tap} color="error" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Apartment Entry Evidence */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <HomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Apartment Entry Evidence
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              First noticed: <Chip size="small" label={apartmentEntryTiming.firstNoticed} />
            </Typography>
            <List dense>
              {additionalConcerns.apartmentEntryEvidence.map((evidence, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon color="error" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={evidence} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Suspected Surveillance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <SurveillanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Suspected Surveillance Methods
            </Typography>
            <List dense>
              {securityContext.suspectedSurveillance.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CameraIcon color="error" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Identity Concerns */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <IdentityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Identity Concerns
            </Typography>
            <List dense>
              {additionalConcerns.identityConcerns.map((concern, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon color="warning" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={concern} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Defensive Measures Implemented */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <ShieldIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'success.main' }} />
              Defensive Measures Implemented (Ongoing)
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
              {securityContext.measuresImplemented.map((measure, i) => (
                <Chip 
                  key={i} 
                  size="small" 
                  label={measure} 
                  color="success" 
                  variant="outlined"
                  icon={<LockIcon />}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Defensive Actions Timeline */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Defensive Actions Timeline
            </Typography>
            <List dense>
              {additionalConcerns.defensiveMeasuresTimeline.map((item, i) => (
                <ListItem key={i} disableGutters sx={{ borderLeft: '2px solid', borderColor: 'success.main', pl: 2, mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.date}
                    secondary={item.action}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
