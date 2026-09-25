import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, Grid } from '@mui/material';
import {
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Place as PlaceIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Psychology as TheoriesIcon,
  Warning as WarningIcon,
  Videocam as CameraIcon,
  Gavel as CriminalIcon,
  TrendingUp as BusinessPerspectiveIcon,
  AccountBalance as GovernmentIcon,
} from '@mui/icons-material';
import { getStats, getAllTags, events } from '../utils/dataService';

export default function Dashboard() {
  const stats = getStats();
  const tags = getAllTags();
  const recentEvents = events
    .filter(e => e.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 5);

  // Count perspectives across all events
  const perspectiveCounts = {
    criminal: 0,
    business: 0,
    government: 0,
    other: 0,
  };
  
  events.forEach(event => {
    event.perspectives?.forEach(p => {
      if (p.type === 'criminal') perspectiveCounts.criminal++;
      else if (p.type === 'business') perspectiveCounts.business++;
      else if (p.type === 'government') perspectiveCounts.government++;
      else perspectiveCounts.other++;
    });
  });

  const statCards = [
    { label: 'Events', value: stats.totalEvents, icon: <TimelineIcon />, color: '#be3030', path: '/timeline' },
    { label: 'People', value: stats.totalPeople, icon: <PeopleIcon />, color: '#1976d2', path: '/people' },
    { label: 'Locations', value: stats.totalLocations, icon: <PlaceIcon />, color: '#388e3c', path: '/locations' },
    { label: 'Items', value: stats.totalItems, icon: <InventoryIcon />, color: '#f57c00', path: '/items' },
    { label: 'Organizations', value: stats.totalOrganizations, icon: <BusinessIcon />, color: '#7b1fa2', path: '/organizations' },
    { label: 'Theories', value: stats.totalTheories, icon: <TheoriesIcon />, color: '#0097a7', path: '/theories' },
    { label: 'High Importance', value: stats.highImportanceEvents, icon: <WarningIcon />, color: '#d32f2f', path: '/timeline' },
    { label: 'On Camera', value: stats.onCameraEvents, icon: <CameraIcon />, color: '#5d4037', path: '/timeline' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Data Overview
      </Typography>

      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 2, mb: 4 }}>
        {statCards.map((stat) => (
          <Paper
            key={stat.label}
            component={RouterLink}
            to={stat.path}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderLeft: '4px solid',
              borderColor: stat.color,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Perspective Summary */}
      <Typography variant="h6" gutterBottom>
        Perspective Breakdown
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, borderLeft: '4px solid #d32f2f' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CriminalIcon sx={{ color: '#d32f2f' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{perspectiveCounts.criminal}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">Criminal Perspectives</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, borderLeft: '4px solid #1976d2' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <BusinessPerspectiveIcon sx={{ color: '#1976d2' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{perspectiveCounts.business}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">Business Perspectives</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 2, borderLeft: '4px solid #388e3c' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <GovernmentIcon sx={{ color: '#388e3c' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{perspectiveCounts.government}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">Government Perspectives</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Uncategorized Alert */}
      {stats.uncategorizedCount > 0 && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid #ff9800' }}>
          <Typography color="warning.main">
            ⚠️ {stats.uncategorizedCount} uncategorized events need attention
          </Typography>
        </Paper>
      )}

      {/* Recent Events */}
      <Typography variant="h6" gutterBottom>
        Recent Events
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        {recentEvents.map((event) => (
          <Box
            key={event.id}
            component={RouterLink}
            to={`/events/${event.id}`}
            sx={{
              py: 1.5,
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' },
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.summary || event.description.slice(0, 100)}...
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 2 }}>
                {event.date}
              </Typography>
            </Stack>
            {event.importanceRating && event.importanceRating >= 8 && (
              <Chip size="small" label="High Importance" color="error" sx={{ mt: 1 }} />
            )}
          </Box>
        ))}
      </Paper>

      {/* Tags */}
      <Typography variant="h6" gutterBottom>
        All Tags ({tags.length})
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
