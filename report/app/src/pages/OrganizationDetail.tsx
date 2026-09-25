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
  Alert,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Business as OrgIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  Warning as WarningIcon,
  OpenInNew as ExternalIcon,
} from '@mui/icons-material';
import {
  getOrganizationById,
  getLocationById,
  getPersonById,
  events,
} from '../utils/dataService';

const getOrgTypeColor = (type?: string) => {
  switch (type) {
    case 'employer': return '#1976d2';
    case 'property_management': return '#795548';
    case 'casino': return '#d32f2f';
    case 'medical': return '#388e3c';
    case 'retail': return '#ff9800';
    case 'technology': return '#9c27b0';
    case 'government': return '#3f51b5';
    default: return '#757575';
  }
};

const getPerspectiveColor = (type?: string) => {
  switch (type) {
    case 'criminal': return '#d32f2f';
    case 'business': return '#1976d2';
    case 'government': return '#388e3c';
    case 'random': return '#757575';
    case 'objective': return '#0097a7';
    default: return '#9e9e9e';
  }
};

export default function OrganizationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const organization = getOrganizationById(id || '');

  if (!organization) {
    return (
      <Box>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/organizations')}>
          Back to Organizations
        </Button>
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Organization not found</Typography>
          <Typography color="text.secondary">No organization exists with ID: {id}</Typography>
        </Paper>
      </Box>
    );
  }

  // Get events involving this organization
  const orgEvents = events.filter(e => e.organizationIds?.includes(organization.id));
  
  // Get known locations
  const knownLocations = organization.knownLocationIds?.map(lid => getLocationById(lid)).filter(Boolean) || [];
  
  // Get known people
  const knownPeople = organization.knownPersonIds?.map(pid => getPersonById(pid)).filter(Boolean) || [];

  return (
    <Box>
      {/* Navigation */}
      <Button startIcon={<BackIcon />} onClick={() => navigate('/organizations')} sx={{ mb: 2 }}>
        Back to Organizations
      </Button>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: getOrgTypeColor(organization.type) }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <OrgIcon sx={{ fontSize: 48, color: getOrgTypeColor(organization.type) }} />
          <Box>
            <Typography variant="h4" gutterBottom>
              {organization.name}
            </Typography>
            <Chip
              label={organization.type.replace('_', ' ')}
              sx={{ backgroundColor: getOrgTypeColor(organization.type), color: 'white' }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* Concerns Alert */}
      {organization.concerns && organization.concerns.length > 0 && (
        <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Concerns / Red Flags ({organization.concerns.length})
          </Typography>
          <Stack spacing={0.5}>
            {organization.concerns.map((concern, index) => (
              <Typography key={index} variant="body2">
                • {concern}
              </Typography>
            ))}
          </Stack>
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Description */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Description
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{organization.description}</Typography>
          </Paper>

          {/* Perspectives */}
          {organization.perspectives && organization.perspectives.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Perspectives ({organization.perspectives.length})
              </Typography>
              <Stack spacing={2}>
                {organization.perspectives.map((perspective, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{ borderLeft: '4px solid', borderLeftColor: getPerspectiveColor(perspective.type) }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Chip
                          label={perspective.type}
                          size="small"
                          sx={{ backgroundColor: getPerspectiveColor(perspective.type), color: 'white' }}
                        />
                        {perspective.likelihood && (
                          <Chip
                            label={`${perspective.likelihood} likelihood`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                      <Typography variant="body1">{perspective.interpretation}</Typography>
                      {perspective.reasoning && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          <strong>Reasoning:</strong> {perspective.reasoning}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Events Involving Organization */}
          {orgEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <TimelineIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Related Events ({orgEvents.length})
              </Typography>
              <Stack spacing={1}>
                {orgEvents
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
                          <Typography variant="caption" color="text.secondary">
                            {event.date || 'No date'}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
              </Stack>
            </Paper>
          )}

          {/* Notes */}
          {organization.notes && organization.notes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Stack spacing={1}>
                {organization.notes.map((note, index) => (
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
          {/* Known Locations */}
          {knownLocations.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Known Locations ({knownLocations.length})
              </Typography>
              <Stack spacing={1}>
                {knownLocations.map(location => location && (
                  <Chip
                    key={location.id}
                    label={location.name}
                    component={RouterLink}
                    to={`/locations/${location.id}`}
                    clickable
                    size="small"
                  />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Known People */}
          {knownPeople.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Known People ({knownPeople.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {knownPeople.map(person => person && (
                  <Chip
                    key={person.id}
                    label={person.name}
                    component={RouterLink}
                    to={`/people/${person.id}`}
                    clickable
                    size="small"
                  />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Websites */}
          {organization.websites && organization.websites.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Websites
              </Typography>
              <Stack spacing={1}>
                {organization.websites.map((url, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    endIcon={<ExternalIcon />}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                  >
                    {url.replace(/^https?:\/\//, '').slice(0, 30)}...
                  </Button>
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
                <Typography variant="body2" color="text.secondary">Related Events:</Typography>
                <Typography variant="body2" fontWeight="bold">{orgEvents.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Known Locations:</Typography>
                <Typography variant="body2" fontWeight="bold">{knownLocations.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Known People:</Typography>
                <Typography variant="body2" fontWeight="bold">{knownPeople.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Concerns:</Typography>
                <Typography variant="body2" fontWeight="bold" color="warning.main">
                  {organization.concerns?.length || 0}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
