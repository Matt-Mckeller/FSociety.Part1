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
  Avatar,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import {
  getPersonById,
  events,
  connections,
  people,
} from '../utils/dataService';

export default function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const person = getPersonById(id || '');

  if (!person) {
    return (
      <Box>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/people')}>
          Back to People
        </Button>
        <Paper sx={{ p: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="h5" color="error">Person not found</Typography>
          <Typography color="text.secondary">No person exists with ID: {id}</Typography>
        </Paper>
      </Box>
    );
  }

  // Get events this person is involved in
  const personEvents = events.filter(e => e.peopleIds.includes(person.id));
  
  // Get connected people from connections data
  const personConnections = connections.filter(
    c => (c.fromEntityId === person.id && c.fromEntityType === 'person') ||
         (c.toEntityId === person.id && c.toEntityType === 'person')
  );
  
  const connectedPeople = personConnections
    .map(c => {
      const otherId = c.fromEntityId === person.id ? c.toEntityId : c.fromEntityId;
      const otherType = c.fromEntityId === person.id ? c.toEntityType : c.fromEntityType;
      if (otherType === 'person') {
        return { person: people.find(p => p.id === otherId), connection: c };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <Box>
      {/* Navigation */}
      <Button startIcon={<BackIcon />} onClick={() => navigate('/people')} sx={{ mb: 2 }}>
        Back to People
      </Button>

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, borderLeft: '4px solid', borderColor: 'primary.main' }}>
        <Stack direction="row" spacing={3} alignItems="flex-start">
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}
          >
            {person.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {person.name}
            </Typography>
            {person.role && (
              <Chip label={person.role} color="primary" sx={{ mb: 1 }} />
            )}
            {person.aliases && person.aliases.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                Also known as: {person.aliases.join(', ')}
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Summary */}
          {person.summary && (
            <Paper sx={{ p: 2, mb: 2, backgroundColor: 'action.hover' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Summary
              </Typography>
              <Typography>{person.summary}</Typography>
            </Paper>
          )}

          {/* Description */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Description
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{person.description}</Typography>
          </Paper>

          {/* Events Involved */}
          {personEvents.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <TimelineIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Events Involved ({personEvents.length})
              </Typography>
              <Stack spacing={1}>
                {personEvents
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

          {/* Perspectives */}
          {person.perspectives && person.perspectives.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Perspectives
              </Typography>
              <Stack spacing={2}>
                {person.perspectives.map((perspective, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Chip label={perspective.type} size="small" color="primary" />
                        {perspective.likelihood && (
                          <Chip label={`${perspective.likelihood} likelihood`} size="small" variant="outlined" />
                        )}
                      </Stack>
                      <Typography variant="body2">{perspective.interpretation}</Typography>
                      {perspective.reasoning && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          {perspective.reasoning}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Notes */}
          {person.notes && person.notes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Stack spacing={1}>
                {person.notes.map((note, index) => (
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
          {/* Connected People */}
          {connectedPeople.length > 0 && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                <PeopleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Connections ({connectedPeople.length})
              </Typography>
              <Stack spacing={1}>
                {connectedPeople.map((item, index) => item?.person && (
                  <Box
                    key={index}
                    component={RouterLink}
                    to={`/people/${item.person.id}`}
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
                      {item.person.name}
                    </Typography>
                    {item.connection.relationshipType && (
                      <Typography variant="caption" color="text.secondary">
                        {item.connection.relationshipType}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Tags */}
          {person.tags && person.tags.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Tags
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {person.tags.map(tag => (
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
