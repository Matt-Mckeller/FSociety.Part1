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
  Inventory as ItemIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
} from '@mui/icons-material';
import {
  getItemById,
  getLocationById,
  getPersonById,
  events,
} from '../utils/dataService';

const getItemTypeColor = (type?: string) => {
  switch (type) {
    case 'document': return '#1976d2';
    case 'money': return '#388e3c';
    case 'electronic': return '#9c27b0';
    case 'object': return '#ff9800';
    case 'clothing': return '#795548';
    default: return '#757575';
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'in_possession': return 'success';
    case 'left_behind': return 'warning';
    case 'given_away': return 'info';
    case 'missing': return 'error';
    default: return 'default';
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

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const item = getItemById(id || '');

  if (!item) {
    return (
      <Box>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/items')}>
          Back to Items
        </Button>
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Item not found</Typography>
          <Typography color="text.secondary">No item exists with ID: {id}</Typography>
        </Paper>
      </Box>
    );
  }

  // Get events involving this item
  const itemEvents = events.filter(e => e.itemIds?.includes(item.id));
  
  // Get locations
  const locationFound = item.locationFoundId ? getLocationById(item.locationFoundId) : null;
  const locationLeft = item.locationLeftId ? getLocationById(item.locationLeftId) : null;
  
  // Get associated people
  const associatedPeople = item.personIds?.map(pid => getPersonById(pid)).filter(Boolean) || [];

  return (
    <Box>
      {/* Navigation */}
      <Button startIcon={<BackIcon />} onClick={() => navigate('/items')} sx={{ mb: 2 }}>
        Back to Items
      </Button>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: getItemTypeColor(item.type) }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <ItemIcon sx={{ fontSize: 48, color: getItemTypeColor(item.type) }} />
          <Box>
            <Typography variant="h4" gutterBottom>
              {item.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
              <Chip
                label={item.type}
                sx={{ backgroundColor: getItemTypeColor(item.type), color: 'white' }}
              />
              {item.currentStatus && (
                <Chip
                  label={item.currentStatus.replace('_', ' ')}
                  color={getStatusColor(item.currentStatus) as 'success' | 'warning' | 'info' | 'error' | 'default'}
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Summary */}
          {item.summary && (
            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Summary
              </Typography>
              <Typography>{item.summary}</Typography>
            </Paper>
          )}

          {/* Description */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Description
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{item.description}</Typography>
          </Paper>

          {/* Significance */}
          {item.significance && (
            <Paper sx={{ p: 2, mb: 3, backgroundColor: 'warning.dark', color: 'warning.contrastText' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                ⚠️ Significance
              </Typography>
              <Typography>{item.significance}</Typography>
            </Paper>
          )}

          {/* Perspectives */}
          {item.perspectives && item.perspectives.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Perspectives ({item.perspectives.length})
              </Typography>
              <Stack spacing={2}>
                {item.perspectives.map((perspective, index) => (
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

          {/* Events Involving Item */}
          {itemEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <TimelineIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Events Involving This Item ({itemEvents.length})
              </Typography>
              <Stack spacing={1}>
                {itemEvents
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
          {item.notes && item.notes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Stack spacing={1}>
                {item.notes.map((note, index) => (
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
          {/* Location Found */}
          {locationFound && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Found At
              </Typography>
              <Chip
                label={locationFound.name}
                component={RouterLink}
                to={`/locations/${locationFound.id}`}
                clickable
              />
            </Paper>
          )}

          {/* Location Left */}
          {locationLeft && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Left At
              </Typography>
              <Chip
                label={locationLeft.name}
                component={RouterLink}
                to={`/locations/${locationLeft.id}`}
                clickable
              />
            </Paper>
          )}

          {/* Associated People */}
          {associatedPeople.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Associated People ({associatedPeople.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {associatedPeople.map(person => person && (
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

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Tags
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {item.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Image Placeholders */}
          {item.images && item.images.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Images ({item.images.length})
              </Typography>
              <Stack spacing={1}>
                {item.images.map((img, index) => (
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
        </Grid>
      </Grid>
    </Box>
  );
}
