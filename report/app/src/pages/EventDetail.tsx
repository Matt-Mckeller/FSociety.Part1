import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
  ArrowForward as NextIcon,
  ArrowBackIosNew as PrevIcon,
  Videocam as CameraIcon,
  VideocamOff as NoCameraIcon,
  Place as PlaceIcon,
  Person as PersonIcon,
  Inventory as ItemIcon,
  Business as OrgIcon,
  Star as StarIcon,
  Link as LinkIcon,
  Chat as ChatIcon,
  Psychology as TheoryIcon,
  Gesture as SymbolIcon,
  Hub as ConnectionIcon,
} from '@mui/icons-material';
import {
  getEventById,
  getLocationById,
  getPersonById,
  getItemById,
  getOrganizationById,
  getEventsSortedByDate,
  getCommunicationsByEventId,
  getAllSymbolsForEvent,
  getAllTheoriesForEvent,
  getAllConnectionsForEvent,
} from '../utils/dataService';

const getLikelihoodColor = (likelihood?: string) => {
  switch (likelihood) {
    case 'high': return 'success';
    case 'medium': return 'warning';
    case 'low': return 'error';
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

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const event = getEventById(id || '');
  const sortedEvents = getEventsSortedByDate();
  const currentIndex = sortedEvents.findIndex(e => e.id === id);
  const prevEvent = currentIndex > 0 ? sortedEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex < sortedEvents.length - 1 ? sortedEvents[currentIndex + 1] : null;

  if (!event) {
    return (
      <Box>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/timeline')}>
          Back to Timeline
        </Button>
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Event not found</Typography>
          <Typography color="text.secondary">No event exists with ID: {id}</Typography>
        </Paper>
      </Box>
    );
  }

  const location = event.locationId ? getLocationById(event.locationId) : null;
  const people = event.peopleIds?.map(pid => getPersonById(pid)).filter(Boolean) || [];
  const items = event.itemIds?.map(iid => getItemById(iid)).filter(Boolean) || [];
  const organizations = event.organizationIds?.map(oid => getOrganizationById(oid)).filter(Boolean) || [];
  const relatedEvents = event.relatedEventIds?.map(eid => getEventById(eid)).filter(Boolean) || [];
  const relatedCommunications = getCommunicationsByEventId(event.id);
  const relatedSymbols = getAllSymbolsForEvent(event);
  const relatedTheories = getAllTheoriesForEvent(event);
  const relatedConnections = getAllConnectionsForEvent(event);

  return (
    <Box>
      {/* Navigation */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/timeline')}>
          Back to Timeline
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            startIcon={<PrevIcon />}
            disabled={!prevEvent}
            onClick={() => prevEvent && navigate(`/events/${prevEvent.id}`)}
          >
            Previous
          </Button>
          <Button
            size="small"
            endIcon={<NextIcon />}
            disabled={!nextEvent}
            onClick={() => nextEvent && navigate(`/events/${nextEvent.id}`)}
          >
            Next
          </Button>
        </Stack>
      </Stack>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: 'primary.main' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {event.title}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={1}>
              {event.date && (
                <Typography variant="subtitle1" color="text.secondary">
                  📅 {event.date} {event.dateUncertain && '(approximate)'}
                </Typography>
              )}
              {event.onCamera && event.onCamera !== 'unknown' && (
                <Chip
                  icon={event.onCamera === 'no' ? <NoCameraIcon /> : <CameraIcon />}
                  label={event.onCamera === 'no' ? 'Not on Camera' : `Camera: ${event.onCamera}`}
                  size="small"
                  color={event.onCamera === 'no' ? 'default' : 'success'}
                />
              )}
              {event.importanceRating && (
                <Chip
                  icon={<StarIcon />}
                  label={`Importance: ${event.importanceRating}/10`}
                  size="small"
                  color={event.importanceRating >= 8 ? 'error' : event.importanceRating >= 5 ? 'warning' : 'default'}
                />
              )}
              {event.confidenceRating && (
                <Chip
                  label={`Confidence: ${event.confidenceRating}/10`}
                  size="small"
                  variant="outlined"
                />
              )}
              {event.evidenceStrength && (
                <Chip
                  label={`Evidence: ${event.evidenceStrength.replace('_', ' ')}`}
                  size="small"
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
          {event.summary && (
            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Summary
              </Typography>
              <Typography>{event.summary}</Typography>
            </Paper>
          )}

          {/* Full Description */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Full Description
            </Typography>
            <Box sx={{ 
              '& h2': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1, color: 'primary.main' },
              '& h3': { fontSize: '1.1rem', fontWeight: 600, mt: 1.5, mb: 0.5 },
              '& p': { mb: 1.5, lineHeight: 1.7 },
              '& strong': { fontWeight: 600 },
              '& ul, & ol': { pl: 3, mb: 1.5 },
              '& li': { mb: 0.5 },
              '& blockquote': { 
                borderLeft: '3px solid', 
                borderColor: 'primary.main', 
                pl: 2, 
                ml: 0, 
                fontStyle: 'italic',
                color: 'text.secondary'
              }
            }}>
              <ReactMarkdown>{event.description}</ReactMarkdown>
            </Box>
          </Paper>

          {/* Perspectives */}
          {event.perspectives && event.perspectives.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Perspectives ({event.perspectives.length})
              </Typography>
              <Stack spacing={2}>
                {event.perspectives.map((perspective, index) => (
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
                            color={getLikelihoodColor(perspective.likelihood) as 'success' | 'warning' | 'error' | 'default'}
                            variant="outlined"
                          />
                        )}
                        {perspective.author && (
                          <Chip
                            label={`by ${perspective.author}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {perspective.interpretation}
                      </Typography>
                      {perspective.reasoning && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Reasoning:</strong> {perspective.reasoning}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Evidence */}
          {event.evidence && event.evidence.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Evidence
              </Typography>
              <Stack spacing={1}>
                {event.evidence.map((evidence, index) => (
                  <Box key={index} sx={{ p: 1, backgroundColor: 'action.hover', borderRadius: 1 }}>
                    <Typography variant="body2">{evidence}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Notes */}
          {event.notes && event.notes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Stack spacing={1}>
                {event.notes.map((note, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    • {note}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          )}
        </Grid>

        {/* Sidebar - Linked Entities */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Location */}
          {location && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Location
              </Typography>
              <Chip
                label={location.name}
                component={RouterLink}
                to={`/locations/${location.id}`}
                clickable
                sx={{ mb: 1 }}
              />
              {location.address && (
                <Typography variant="body2" color="text.secondary">
                  {location.address}
                </Typography>
              )}
            </Paper>
          )}

          {/* People */}
          {people.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                People Involved ({people.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {people.map(person => person && (
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

          {/* Items */}
          {items.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <ItemIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Items Involved ({items.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {items.map(item => item && (
                  <Chip
                    key={item.id}
                    label={item.name}
                    component={RouterLink}
                    to={`/items/${item.id}`}
                    clickable
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Paper>
          )}

          {/* Organizations */}
          {organizations.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <OrgIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Organizations ({organizations.length})
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {organizations.map(org => org && (
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

          {/* Related Communications */}
          {relatedCommunications.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <ChatIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Communications ({relatedCommunications.length})
              </Typography>
              <Stack spacing={1}>
                {relatedCommunications.map(comm => (
                  <Box
                    key={comm.id}
                    component={RouterLink}
                    to={`/communications`}
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
                      {comm.subject || comm.content?.slice(0, 50)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comm.type} • {comm.date}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Related Symbols */}
          {relatedSymbols.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <SymbolIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Symbols ({relatedSymbols.length})
              </Typography>
              <Stack spacing={1}>
                {relatedSymbols.map(symbol => (
                  <Box
                    key={symbol.id}
                    component={RouterLink}
                    to={`/symbols`}
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
                      {symbol.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {symbol.type} • {symbol.interpretation?.slice(0, 60)}...
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Related Theories */}
          {relatedTheories.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <TheoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Theories ({relatedTheories.length})
              </Typography>
              <Stack spacing={1}>
                {relatedTheories.map(theory => (
                  <Box
                    key={theory.id}
                    component={RouterLink}
                    to={`/theories/${theory.id}`}
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
                      {theory.title}
                    </Typography>
                    {theory.confidenceRating && (
                      <Typography variant="caption" color="text.secondary">
                        Confidence: {theory.confidenceRating}/10
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Related Connections */}
          {relatedConnections.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <ConnectionIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Connections ({relatedConnections.length})
              </Typography>
              <Stack spacing={1}>
                {relatedConnections.map(conn => (
                  <Box
                    key={conn.id}
                    component={RouterLink}
                    to={`/connections`}
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
                      {conn.type}: {conn.relationshipDescription?.slice(0, 50)}...
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Strength: {conn.strength}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Related Events ({relatedEvents.length})
              </Typography>
              <Stack spacing={1}>
                {relatedEvents.map(relEvent => relEvent && (
                  <Box
                    key={relEvent.id}
                    component={RouterLink}
                    to={`/events/${relEvent.id}`}
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
                      {relEvent.title}
                    </Typography>
                    {relEvent.date && (
                      <Typography variant="caption" color="text.secondary">
                        {relEvent.date}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Tags
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {event.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
