import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Place as PlaceIcon,
  Timeline as TimelineIcon,
  Business as OrgIcon,
  OpenInNew as ExternalIcon,
} from '@mui/icons-material';
import {
  getLocationById,
  events,
  organizations,
} from '../utils/dataService';

const getLocationTypeColor = (type?: string) => {
  switch (type) {
    case 'casino': return '#d32f2f';
    case 'apartment': return '#1976d2';
    case 'coffee_shop': return '#795548';
    case 'club': return '#9c27b0';
    case 'business': return '#388e3c';
    case 'atm': return '#ff9800';
    default: return '#757575';
  }
};

export default function LocationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const location = getLocationById(id || '');

  if (!location) {
    return (
      <Box>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/locations')}>
          Back to Locations
        </Button>
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Location not found</Typography>
          <Typography color="text.secondary">No location exists with ID: {id}</Typography>
        </Paper>
      </Box>
    );
  }

  // Get events at this location
  const locationEvents = events.filter(e => e.locationId === location.id);
  
  // Get organizations at this location
  const locationOrgs = organizations.filter(org => 
    org.knownLocationIds?.includes(location.id)
  );

  return (
    <Box>
      {/* Navigation */}
      <Button startIcon={<BackIcon />} onClick={() => navigate('/locations')} sx={{ mb: 2 }}>
        Back to Locations
      </Button>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: getLocationTypeColor(location.type) }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <PlaceIcon sx={{ fontSize: 48, color: getLocationTypeColor(location.type) }} />
          <Box>
            <Typography variant="h4" gutterBottom>
              {location.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
              <Chip
                label={location.type.replace('_', ' ')}
                sx={{ backgroundColor: getLocationTypeColor(location.type), color: 'white' }}
              />
              {location.address && (
                <Typography variant="body1" color="text.secondary">
                  📍 {location.address}
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Description */}
          {location.description && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Description
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{location.description}</Typography>
            </Paper>
          )}

          {/* Events at this Location */}
          {locationEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <TimelineIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Events at this Location ({locationEvents.length})
              </Typography>
              <Stack spacing={1}>
                {locationEvents
                  .sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                  })
                  .map(event => (
                    <Card
                      key={event.id}
                      variant="outlined"
                      component={RouterLink}
                      to={`/events/${event.id}`}
                      sx={{
                        textDecoration: 'none',
                        '&:hover': { backgroundColor: 'action.hover' },
                      }}
                    >
                      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                              {event.title}
                            </Typography>
                            {event.summary && (
                              <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 400 }}>
                                {event.summary}
                              </Typography>
                            )}
                          </Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {event.importanceRating && event.importanceRating >= 8 && (
                              <Chip label="High Importance" size="small" color="error" />
                            )}
                            <Typography variant="caption" color="text.secondary">
                              {event.date || 'No date'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
              </Stack>
            </Paper>
          )}

          {/* Notes */}
          {location.notes && location.notes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Stack spacing={1}>
                {location.notes.map((note, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    • {note}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Organizations at this location */}
          {locationOrgs.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <OrgIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Organizations ({locationOrgs.length})
              </Typography>
              <Stack spacing={1}>
                {locationOrgs.map(org => (
                  <Chip
                    key={org.id}
                    label={org.name}
                    component={RouterLink}
                    to={`/organizations/${org.id}`}
                    clickable
                    size="small"
                  />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Website Link */}
          {location.websiteUrl && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Website
              </Typography>
              <Button
                variant="outlined"
                size="small"
                endIcon={<ExternalIcon />}
                href={location.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </Button>
            </Paper>
          )}

          {/* Image Placeholders */}
          {location.images && location.images.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Images ({location.images.length})
              </Typography>
              <Stack spacing={1}>
                {location.images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: 100,
                      backgroundColor: 'grey.200',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {img || 'Image pending'}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Stats */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Statistics
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Total Events:</Typography>
                <Typography variant="body2" fontWeight="bold">{locationEvents.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">High Importance:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {locationEvents.filter(e => (e.importanceRating || 0) >= 8).length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">On Camera:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {locationEvents.filter(e => e.onCamera === 'fully' || e.onCamera === 'partial').length}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
