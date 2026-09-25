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
  Psychology as TheoryIcon,
  Timeline as TimelineIcon,
  Inventory as ItemIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
} from '@mui/icons-material';
import {
  getTheoryById,
  getEventById,
  getItemById,
  getPersonById,
  getLocationById,
  theories,
} from '../utils/dataService';

const getConfidenceColor = (level?: string) => {
  switch (level) {
    case 'confident': return 'success';
    case 'likely': return 'info';
    case 'possible': return 'warning';
    case 'speculation': return 'error';
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

export default function TheoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const theory = getTheoryById(id || '');

  if (!theory) {
    return (
      <Box>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/theories')}>
          Back to Theories
        </Button>
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Theory not found</Typography>
          <Typography color="text.secondary">No theory exists with ID: {id}</Typography>
        </Paper>
      </Box>
    );
  }

  // Get supporting events (check both supportingEventIds and supportingEvidenceIds)
  const supportingEventIds = theory.supportingEventIds || theory.supportingEvidenceIds || [];
  const supportingEvents = supportingEventIds.map(eid => getEventById(eid)).filter(Boolean) || [];
  
  // Get supporting items
  const supportingItems = theory.supportingItemIds?.map(iid => getItemById(iid)).filter(Boolean) || [];
  
  // Get supporting people
  const supportingPeople = theory.supportingPeopleIds?.map(pid => getPersonById(pid)).filter(Boolean) || [];
  
  // Get supporting locations
  const supportingLocations = theory.supportingLocationIds?.map(lid => getLocationById(lid)).filter(Boolean) || [];
  
  // Get contradicting events
  const contradictingEvents = theory.contradictingEventIds?.map(eid => getEventById(eid)).filter(Boolean) || [];
  
  // Get related theories
  const relatedTheories = theory.relatedTheoryIds?.map(tid => theories.find(t => t.id === tid)).filter(Boolean) || [];

  const perspectiveType = theory.perspectiveType || theory.perspective;

  return (
    <Box>
      {/* Navigation */}
      <Button startIcon={<BackIcon />} onClick={() => navigate('/theories')} sx={{ mb: 2 }}>
        Back to Theories
      </Button>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: getPerspectiveColor(perspectiveType) }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <TheoryIcon sx={{ fontSize: 48, color: getPerspectiveColor(perspectiveType) }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {theory.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
              {perspectiveType && (
                <Chip
                  label={perspectiveType}
                  sx={{ backgroundColor: getPerspectiveColor(perspectiveType), color: 'white' }}
                />
              )}
              {theory.confidenceLevel && (
                <Chip
                  label={`Confidence: ${theory.confidenceLevel}`}
                  color={getConfidenceColor(theory.confidenceLevel) as 'success' | 'info' | 'warning' | 'error' | 'default'}
                />
              )}
              {theory.confidenceRating && (
                <Chip
                  label={`Rating: ${theory.confidenceRating}/10`}
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
          {theory.summary && (
            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Summary
              </Typography>
              <Typography>{theory.summary}</Typography>
            </Paper>
          )}

          {/* Description / Full Description */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Full Description
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
              {theory.fullDescription || theory.description}
            </Typography>
          </Paper>

          {/* Supporting Events */}
          {supportingEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                <TimelineIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Supporting Events ({supportingEvents.length})
              </Typography>
              <Stack spacing={1}>
                {supportingEvents.map(event => event && (
                  <Card
                    key={event.id}
                    variant="outlined"
                    component={RouterLink}
                    to={`/events/${event.id}`}
                    sx={{
                      textDecoration: 'none',
                      borderLeft: '3px solid',
                      borderLeftColor: 'success.main',
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

          {/* Potential Arguments Against - Events */}
          {contradictingEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
                <TimelineIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Potential Arguments Against - Events ({contradictingEvents.length})
              </Typography>
              <Stack spacing={1}>
                {contradictingEvents.map(event => event && (
                  <Card
                    key={event.id}
                    variant="outlined"
                    component={RouterLink}
                    to={`/events/${event.id}`}
                    sx={{
                      textDecoration: 'none',
                      borderLeft: '3px solid',
                      borderLeftColor: 'error.main',
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {event.title}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Potential Arguments Against (text) */}
          {theory.contradictingEvidence && theory.contradictingEvidence.length > 0 && (
            <Paper sx={{ p: 2, mb: 3, borderLeft: '3px solid', borderColor: 'error.main' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
                Potential Arguments Against
              </Typography>
              <Stack spacing={1}>
                {theory.contradictingEvidence.map((evidence, index) => (
                  <Typography key={index} variant="body2">
                    • {evidence}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Notes */}
          {theory.notes && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              {Array.isArray(theory.notes) ? (
                <Stack spacing={1}>
                  {theory.notes.map((note, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      • {note}
                    </Typography>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">{theory.notes}</Typography>
              )}
            </Paper>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Supporting Items */}
          {supportingItems.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <ItemIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Supporting Items ({supportingItems.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {supportingItems.map(item => item && (
                  <Chip
                    key={item.id}
                    label={item.name}
                    component={RouterLink}
                    to={`/items/${item.id}`}
                    clickable
                    size="small"
                  />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Supporting People */}
          {supportingPeople.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Related People ({supportingPeople.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {supportingPeople.map(person => person && (
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

          {/* Supporting Locations */}
          {supportingLocations.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Related Locations ({supportingLocations.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {supportingLocations.map(location => location && (
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

          {/* Related Theories */}
          {relatedTheories.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <TheoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Related Theories ({relatedTheories.length})
              </Typography>
              <Stack spacing={1}>
                {relatedTheories.map(relTheory => relTheory && (
                  <Box
                    key={relTheory.id}
                    component={RouterLink}
                    to={`/theories/${relTheory.id}`}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: 'action.hover',
                      '&:hover': { backgroundColor: 'action.selected' },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {relTheory.title}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Evidence Summary */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Evidence Summary
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Supporting Events:</Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  {supportingEvents.length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Arguments Against:</Typography>
                <Typography variant="body2" fontWeight="bold" color="error.main">
                  {contradictingEvents.length + (theory.contradictingEvidence?.length || 0)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Related Items:</Typography>
                <Typography variant="body2" fontWeight="bold">{supportingItems.length}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Related People:</Typography>
                <Typography variant="body2" fontWeight="bold">{supportingPeople.length}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
