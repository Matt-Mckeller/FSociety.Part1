import { useState } from 'react';
import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, Alert, List, ListItem, ListItemIcon, ListItemText, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  PlayCircle as InProgressIcon,
  Gavel as CriminalIcon,
  TrendingUp as BusinessIcon,
  Help as RandomIcon,
} from '@mui/icons-material';
import investigationsData from '../../../src/data/further-investigations.json';

type Investigation = (typeof investigationsData.investigations)[0];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'info';
    default: return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckIcon color="success" />;
    case 'in_progress': return <InProgressIcon color="warning" />;
    default: return <CircleIcon color="disabled" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Completed';
    case 'in_progress': return 'In Progress';
    case 'not_started': return 'Not Started';
    default: return status;
  }
};

const getPerspectiveIcon = (type: string) => {
  switch (type) {
    case 'criminal': return <CriminalIcon sx={{ fontSize: 16, color: '#d32f2f' }} />;
    case 'business': return <BusinessIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
    case 'random': return <RandomIcon sx={{ fontSize: 16, color: '#757575' }} />;
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

export default function FurtherInvestigations() {
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');

  const investigations = investigationsData.investigations as Investigation[];

  let filteredInvestigations = investigations;

  if (filterStatus) {
    filteredInvestigations = filteredInvestigations.filter(inv => inv.status === filterStatus);
  }

  if (filterPriority) {
    filteredInvestigations = filteredInvestigations.filter(inv => inv.priority === filterPriority);
  }

  // Stats
  const stats = {
    total: investigations.length,
    notStarted: investigations.filter(i => i.status === 'not_started').length,
    inProgress: investigations.filter(i => i.status === 'in_progress').length,
    completed: investigations.filter(i => i.status === 'completed').length,
  };

  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Other Investigations
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Areas and leads that warrant additional investigation.
      </Typography>

      {/* Stats */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap">
          <Box>
            <Typography variant="h4" color="primary">{stats.total}</Typography>
            <Typography variant="caption" color="text.secondary">Total</Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="text.secondary">{stats.notStarted}</Typography>
            <Typography variant="caption" color="text.secondary">Not Started</Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="warning.main">{stats.inProgress}</Typography>
            <Typography variant="caption" color="text.secondary">In Progress</Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="success.main">{stats.completed}</Typography>
            <Typography variant="caption" color="text.secondary">Completed</Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 150 }}>
            <Typography variant="caption" color="text.secondary">
              Progress: {completionPercentage.toFixed(0)}%
            </Typography>
            <LinearProgress variant="determinate" value={completionPercentage} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
        </Stack>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              label="Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="not_started">Not Started</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={filterPriority}
              label="Priority"
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* Investigation Cards */}
      <Grid container spacing={3}>
        {filteredInvestigations.map((investigation) => (
          <Grid key={investigation.id} size={12}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getStatusIcon(investigation.status)}
                      <Typography variant="h6">{investigation.title}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {investigation.location}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      size="small" 
                      label={getStatusLabel(investigation.status)} 
                      variant="outlined"
                    />
                    <Chip 
                      size="small" 
                      label={investigation.priority.toUpperCase()} 
                      color={getPriorityColor(investigation.priority) as 'error' | 'warning' | 'info' | 'default'}
                    />
                  </Stack>
                </Stack>

                <Typography variant="subtitle2" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {investigation.summary}
                </Typography>

                <Alert severity="info" sx={{ mb: 2 }}>
                  <Box sx={{ 
                    '& p': { margin: 0, marginBottom: 1 },
                    '& p:last-child': { marginBottom: 0 },
                    '& strong': { fontWeight: 600 },
                  }}>
                    <ReactMarkdown>{investigation.description}</ReactMarkdown>
                  </Box>
                </Alert>

                <Grid container spacing={2}>
                  {/* Observations */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Observations
                    </Typography>
                    <List dense disablePadding>
                      {investigation.observations.map((obs, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <CircleIcon sx={{ fontSize: 8 }} />
                          </ListItemIcon>
                          <ListItemText primary={obs} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  {/* Suspicions */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      <WarningIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5, color: 'warning.main' }} />
                      Suspicions
                    </Typography>
                    <List dense disablePadding>
                      {investigation.suspicions.map((susp, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <WarningIcon sx={{ fontSize: 12, color: 'warning.main' }} />
                          </ListItemIcon>
                          <ListItemText primary={susp} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>

                {/* Perspectives */}
                {investigation.perspectives && investigation.perspectives.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Perspectives
                    </Typography>
                    <Stack spacing={1}>
                      {investigation.perspectives.map((persp, i) => (
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
                                backgroundColor: getLikelihoodColor(persp.likelihood),
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

                {/* Action Items */}
                {investigation.actionItems && investigation.actionItems.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Action Items
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                      {investigation.actionItems.map((item, i) => (
                        <Chip 
                          key={i} 
                          size="small" 
                          label={item} 
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredInvestigations.length === 0 && (
        <Alert severity="info">
          No investigations match the current filters.
        </Alert>
      )}
    </Box>
  );
}
