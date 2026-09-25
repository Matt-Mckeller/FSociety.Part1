import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Assignment as RequestIcon,
  Security as SafetyIcon,
  Info as InfoIcon,
  Work as ProfessionalIcon,
  Build as ResourceIcon,
  Schedule as ImmediateIcon,
  DateRange as ShortTermIcon,
  EventNote as LongTermIcon,
  PriorityHigh as PriorityIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

// Requests and Needs data from requests-and-status.md
const requestsData = {
  immediateRequests: [
    "Professional guidance on whether to request camera footage or take additional action",
    "Understanding what was real and what concerns I should have",
    "Accurate information (wifi setup is odd, getting incorrect web details)",
  ],
  shortTermRequests: [
    "External input on decision making - this is out of my area of expertise",
    "Support and opportunity for follow up to confirm events",
    "Know that I am not being framed for anything, protection from this in the future",
    "Secure laptop setup and confirmation of supply chain validity",
  ],
  longTermRequests: [
    "Clarity on the situation so I can focus on my businesses",
    "If this is real - could be fantastic for company launches and marketing",
    "Opportunity to utilize story for marketing and teaching, especially with confirmation",
    "Learn. Teach.",
  ],
  safetyNeeds: [
    "More security and privacy, especially physical security",
    "Know what reality is and travel freely",
    "Some more money would be nice but probably isn't needed",
    "Protection from potential framing",
    "Protection from future impacts of prior events (not a name change)",
    "Whatever identity options can be provided - would like an ID or 5 I can use that isn't my real one if that's allowed",
    "Have additional tools for improved security but want supply chain safety validation",
  ],
  informationNeeds: [
    "Clarity on which events were real vs coincidence",
    "Understanding the potential threat level",
    "Accurate web/network information",
  ],
  professionalNeeds: [
    "External expertise (this is out of my area)",
    "Potentially legal guidance",
    "Investigative support for confirmation",
  ],
  resourceNeeds: [
    "Credit monitoring",
    "Personal email hosting (self-hosted)",
    "Custom login screen on Linux",
    "Recordings for physical location security",
    "Improved observability enclosure (lower priority, using partial version)",
    "Eventually a new ID",
  ],
  primaryConcerns: [
    "I do not want to be framed for anything - how do I protect myself from this?",
    "I believe I was pickpocketed a couple times and that my ID could have been taken",
    "My apartment was likely bugged, but by who?",
    "Would appreciate support, and there is opportunity for follow up to confirm",
    "I may have spoken about the observability types I was building a defensive tool for into a tapped apartment",
    "I do not want criminals being upset with me for the rest of my life",
    "Strange education conversation that made me worried (though he said he was there for the show)",
    "Some weird connections that could look like framing",
    "Potential impact of actually following through with the final step setup, but also interested in the story marketing bonus",
  ],
};

export default function Requests() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <RequestIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4">Requests & Needs</Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Current requests, needs, and concerns that require attention or support.
      </Typography>

      <Grid container spacing={3}>
        {/* Requests Section */}
        <Grid size={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
            Requests
          </Typography>
        </Grid>

        {/* Immediate Requests */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'error.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ImmediateIcon color="error" />
                <Typography variant="h6">Immediate</Typography>
                <Chip size="small" label="URGENT" color="error" />
              </Stack>
              <List dense>
                {requestsData.immediateRequests.map((req, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <PriorityIcon color="error" sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={req} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Short-Term Requests */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'warning.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ShortTermIcon color="warning" />
                <Typography variant="h6">Short-Term</Typography>
              </Stack>
              <List dense>
                {requestsData.shortTermRequests.map((req, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon color="warning" sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={req} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Long-Term Requests */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'info.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <LongTermIcon color="info" />
                <Typography variant="h6">Long-Term</Typography>
              </Stack>
              <List dense>
                {requestsData.longTermRequests.map((req, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckIcon color="info" sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={req} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Needs Section */}
        <Grid size={12}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Needs
          </Typography>
        </Grid>

        {/* Safety Needs */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <SafetyIcon color="error" />
              <Typography variant="subtitle1" fontWeight="bold">Safety</Typography>
            </Stack>
            <List dense disablePadding>
              {requestsData.safetyNeeds.map((need, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText primary={`• ${need}`} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Information Needs */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <InfoIcon color="info" />
              <Typography variant="subtitle1" fontWeight="bold">Information</Typography>
            </Stack>
            <List dense disablePadding>
              {requestsData.informationNeeds.map((need, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText primary={`• ${need}`} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Professional Needs */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <ProfessionalIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="bold">Professional</Typography>
            </Stack>
            <List dense disablePadding>
              {requestsData.professionalNeeds.map((need, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText primary={`• ${need}`} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Resource Needs */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <ResourceIcon color="secondary" />
              <Typography variant="subtitle1" fontWeight="bold">Resources</Typography>
            </Stack>
            <List dense disablePadding>
              {requestsData.resourceNeeds.map((need, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText primary={`• ${need}`} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Primary Concerns */}
        <Grid size={12}>
          <Paper sx={{ p: 3, borderLeft: '4px solid', borderColor: 'warning.main' }}>
            <Typography variant="h6" gutterBottom color="warning.main">
              Primary Concerns
            </Typography>
            <List dense>
              {requestsData.primaryConcerns.map((concern, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <PriorityIcon color="warning" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={concern} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
