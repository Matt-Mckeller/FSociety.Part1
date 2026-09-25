import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  HelpOutline as UncategorizedIcon,
  Circle as CircleIcon,
  Gavel as CriminalIcon,
  TrendingUp as BusinessIcon,
  Help as RandomIcon,
  AccountBalance as GovernmentIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { uncategorizedEvents } from '../utils/dataService';

const getPerspectiveIcon = (type: string) => {
  switch (type) {
    case 'criminal': return <CriminalIcon sx={{ fontSize: 14, color: '#d32f2f' }} />;
    case 'business': return <BusinessIcon sx={{ fontSize: 14, color: '#1976d2' }} />;
    case 'government': return <GovernmentIcon sx={{ fontSize: 14, color: '#6a1b9a' }} />;
    case 'random': return <RandomIcon sx={{ fontSize: 14, color: '#757575' }} />;
    default: return null;
  }
};

const getLikelihoodColor = (likelihood: string) => {
  switch (likelihood) {
    case 'high': return '#4caf50';
    case 'medium': return '#ff9800';
    case 'low': return '#f44336';
    default: return '#757575';
  }
};

export default function UncategorizedEvents() {
  const needsFollowUp = uncategorizedEvents.filter(e => e.needsFollowUp).length;

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <UncategorizedIcon sx={{ fontSize: 40, color: 'warning.main' }} />
        <Typography variant="h4">Uncategorized Events</Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Events that have not yet been fully categorized or linked to the main timeline. These may be relevant or coincidental.
      </Typography>

      {/* Stats */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap">
          <Box>
            <Typography variant="h4" color="warning.main">{uncategorizedEvents.length}</Typography>
            <Typography variant="caption" color="text.secondary">Total Events</Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="error.main">{needsFollowUp}</Typography>
            <Typography variant="caption" color="text.secondary">Need Follow-Up</Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Event Cards */}
      <Grid container spacing={2}>
        {uncategorizedEvents.map((event) => (
          <Grid key={event.id} size={12}>
            <Card sx={{ borderLeft: event.needsFollowUp ? '4px solid' : 'none', borderColor: 'warning.main' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{event.title}</Typography>
                    {event.date && (
                      <Typography variant="caption" color="text.secondary">
                        {event.date} {event.dateUncertain && '(uncertain)'}
                      </Typography>
                    )}
                    {!event.date && event.dateUncertain && (
                      <Typography variant="caption" color="text.secondary">
                        Date uncertain
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1}>
                    {event.needsFollowUp && (
                      <Chip 
                        size="small" 
                        icon={<FlagIcon />}
                        label="Needs Follow-Up" 
                        color="warning"
                      />
                    )}
                  </Stack>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description}
                </Typography>

                {/* Perspectives */}
                {event.perspectives && event.perspectives.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Perspectives
                    </Typography>
                    <Stack spacing={1}>
                      {event.perspectives.map((persp, i) => (
                        <Paper key={i} variant="outlined" sx={{ p: 1.5 }}>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                            {getPerspectiveIcon(persp.type)}
                            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                              {persp.type}
                            </Typography>
                            <Chip 
                              size="small" 
                              label={`by ${persp.author}`} 
                              sx={{ fontSize: '0.65rem', height: 18 }} 
                            />
                            <Chip 
                              size="small" 
                              label={persp.likelihood} 
                              sx={{ 
                                fontSize: '0.65rem', 
                                height: 18,
                                backgroundColor: getLikelihoodColor(persp.likelihood || 'unknown'),
                                color: 'white',
                              }} 
                            />
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {persp.interpretation}
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Notes */}
                {event.notes && event.notes.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Notes
                    </Typography>
                    <List dense disablePadding>
                      {event.notes.map((note, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CircleIcon sx={{ fontSize: 8 }} />
                          </ListItemIcon>
                          <ListItemText primary={note} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
