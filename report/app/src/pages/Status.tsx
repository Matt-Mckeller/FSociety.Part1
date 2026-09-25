import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, LinearProgress, Table, TableBody, TableCell, TableRow } from '@mui/material';
import {
  LocationOn as LocationIcon,
  Security as SafetyIcon,
  Psychology as MentalIcon,
  AttachMoney as FinancialIcon,
  Gavel as LegalIcon,
  Help as QuestionIcon,
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';

// Status data from requests-and-status.md
const statusData = {
  lastUpdated: "December 26, 2025",
  
  locationStatus: {
    current: "Traveling, planning to move from town to town and environment to environment while pursuing business",
    details: [
      "Got rid of all furniture, took devices and a few clothes",
      "Will eventually settle and get a new ID",
      "Planning to move to another state",
    ],
    level: "transitioning",
  },
  
  safetyStatus: {
    feeling: "Feel safe but still desire more security, confirmation of events, and support for supply chain",
    concerns: [
      "Primary concern is settling and knowing what reality is",
      "Concerned about the whole situation",
      "If there is a threat and they are good with computers/AI, the potential is scary",
      "Hope everything is fine and nothing to worry about",
    ],
    level: "cautious",
  },
  
  mentalPhysicalStatus: {
    current: "Working on removing nicotine, will be much better once this is done",
    progress: 80,
    details: [
      "Started using nicotine, eating less healthy, reducing exercise",
      "Excited to reach full potential again - 'an entirely different level of Matthew'",
      "Events were stressful and somewhat traumatic which brought about anxiety",
      "Mental health still actually quite good - mostly learned improvements, goals, and purpose",
    ],
    level: "recovering",
  },
  
  financialStatus: {
    cash: "~$10k",
    credit: "~$8k",
    assessment: "Won't last long but enough to get businesses going and get some funding",
    level: "limited",
  },
  
  legalStatus: {
    items: [
      "Owes taxes (views as cheap loan)",
      "Chapter 7 bankruptcy completed previously",
      "No evidence of actual crime committed - just communication/observations",
      "No case number from police visit",
    ],
    level: "clear",
  },
  
  questionsRemaining: [
    "Was it a criminal organization? Definitely seemed like it, also seemed like it could have been a mix of government, wealthy organizations, and criminal organizations",
    "Am I in danger? What do I need to do to protect myself besides traveling around?",
    "Was it someone messing with me because they are interested in my company, or was it a bunch of strange events tied together?",
    "Was TransitPros even a real organization? Or was I working for a fake organization?",
    "What was the education conversation really about - or was it nothing?",
  ],
  
  actionsBeingTaken: [
    "Setting up more secure environment",
    "Traveling discretely",
    "Completing the report and documenting it appropriately",
    "Switching to self-hosted email",
    "Switching to custom login screen on Linux",
    "Improving security factors including physical location recordings",
    "Using partial version of observability enclosure",
  ],
  
  updateLog: [
    { date: "12/25/2025", update: "Stopped using new equipment due to being unable to activate it at AT&T" },
    { date: "12/23/2025", update: "Moved out of Mac Properties, left furniture in lobby, left symbolic items" },
    { date: "12/22/2025", update: "Kitchen lightbulb mic removed" },
    { date: "12/20-22/2025", update: "Purchased new equipment and power bank, setting up secure environment" },
    { date: "12/17-18/2025", update: "Mental healing/recovery from lack of sleep" },
    { date: "12/16/2025", update: "Hotel room entry attempt, called 911, went to police" },
    { date: "12/15/2025", update: "First outreach to Talcove / Anxiety at airport, thought ID was stolen" },
  ],
};

const getStatusColor = (level: string) => {
  switch (level) {
    case 'good': return 'success';
    case 'recovering': return 'info';
    case 'cautious': return 'warning';
    case 'limited': return 'warning';
    case 'transitioning': return 'info';
    case 'clear': return 'success';
    default: return 'default';
  }
};

const getStatusProgress = (level: string) => {
  switch (level) {
    case 'good': return 90;
    case 'recovering': return 60;
    case 'cautious': return 50;
    case 'limited': return 40;
    case 'transitioning': return 50;
    case 'clear': return 80;
    default: return 50;
  }
};

export default function Status() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h4">Current Status</Typography>
        <Chip 
          icon={<UpdateIcon />} 
          label={`Last Updated: ${statusData.lastUpdated}`} 
          variant="outlined" 
        />
      </Stack>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Current situation overview, questions remaining, and actions being taken.
      </Typography>

      <Grid container spacing={3}>
        {/* Status Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: getStatusColor(statusData.locationStatus.level) + '.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <LocationIcon color={getStatusColor(statusData.locationStatus.level) as 'success' | 'info' | 'warning'} />
                <Typography variant="h6">Location</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2 }}>{statusData.locationStatus.current}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={getStatusProgress(statusData.locationStatus.level)} 
                color={getStatusColor(statusData.locationStatus.level) as 'success' | 'info' | 'warning'}
                sx={{ mb: 1, height: 6, borderRadius: 3 }}
              />
              <Chip size="small" label={statusData.locationStatus.level} color={getStatusColor(statusData.locationStatus.level) as 'success' | 'info' | 'warning'} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: getStatusColor(statusData.safetyStatus.level) + '.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <SafetyIcon color={getStatusColor(statusData.safetyStatus.level) as 'success' | 'info' | 'warning'} />
                <Typography variant="h6">Safety</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2 }}>{statusData.safetyStatus.feeling}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={getStatusProgress(statusData.safetyStatus.level)} 
                color={getStatusColor(statusData.safetyStatus.level) as 'success' | 'info' | 'warning'}
                sx={{ mb: 1, height: 6, borderRadius: 3 }}
              />
              <Chip size="small" label={statusData.safetyStatus.level} color={getStatusColor(statusData.safetyStatus.level) as 'success' | 'info' | 'warning'} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: getStatusColor(statusData.mentalPhysicalStatus.level) + '.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <MentalIcon color={getStatusColor(statusData.mentalPhysicalStatus.level) as 'success' | 'info' | 'warning'} />
                <Typography variant="h6">Mental/Physical</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2 }}>{statusData.mentalPhysicalStatus.current}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={statusData.mentalPhysicalStatus.progress || getStatusProgress(statusData.mentalPhysicalStatus.level)} 
                color={getStatusColor(statusData.mentalPhysicalStatus.level) as 'success' | 'info' | 'warning'}
                sx={{ mb: 1, height: 6, borderRadius: 3 }}
              />
              <Chip size="small" label={statusData.mentalPhysicalStatus.level} color={getStatusColor(statusData.mentalPhysicalStatus.level) as 'success' | 'info' | 'warning'} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: getStatusColor(statusData.financialStatus.level) + '.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <FinancialIcon color={getStatusColor(statusData.financialStatus.level) as 'success' | 'info' | 'warning'} />
                <Typography variant="h6">Financial</Typography>
              </Stack>
              <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h5" color="success.main">{statusData.financialStatus.cash}</Typography>
                  <Typography variant="caption" color="text.secondary">Cash</Typography>
                </Box>
                <Box>
                  <Typography variant="h5" color="info.main">{statusData.financialStatus.credit}</Typography>
                  <Typography variant="caption" color="text.secondary">Credit</Typography>
                </Box>
              </Stack>
              <Typography variant="body2" color="text.secondary">{statusData.financialStatus.assessment}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: getStatusColor(statusData.legalStatus.level) + '.main' }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <LegalIcon color={getStatusColor(statusData.legalStatus.level) as 'success' | 'info' | 'warning'} />
                <Typography variant="h6">Legal</Typography>
              </Stack>
              <List dense disablePadding>
                {statusData.legalStatus.items.map((item, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <CircleIcon sx={{ fontSize: 8 }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Questions Remaining */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <QuestionIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'warning.main' }} />
              Questions Remaining
            </Typography>
            <List>
              {statusData.questionsRemaining.map((q, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Chip size="small" label={i + 1} color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={q} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Actions Being Taken */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <CheckIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'success.main' }} />
              Actions Being Taken
            </Typography>
            <List dense>
              {statusData.actionsBeingTaken.map((action, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Update Log */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <UpdateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Update Log
            </Typography>
            <Table size="small">
              <TableBody>
                {statusData.updateLog.map((log, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', width: 120 }}>
                      {log.date}
                    </TableCell>
                    <TableCell>{log.update}</TableCell>
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
