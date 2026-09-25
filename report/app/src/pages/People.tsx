import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, TextField, Avatar } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { people, getEventsByPersonId } from '../utils/dataService';

export default function People() {
  const [search, setSearch] = useState('');

  const filteredPeople = people.filter(p => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(searchLower) ||
      p.role?.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.aliases?.some(a => a.toLowerCase().includes(searchLower))
    );
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        People ({filteredPeople.length})
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Search people"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
        {filteredPeople.map((person) => {
          const eventCount = getEventsByPersonId(person.id).length;

          return (
            <Paper
              key={person.id}
              component={RouterLink}
              to={`/people/${person.id}`}
              sx={{
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  <PersonIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{person.name}</Typography>
                  {person.aliases && person.aliases.length > 0 && (
                    <Typography variant="caption" color="text.secondary">
                      aka: {person.aliases.join(', ')}
                    </Typography>
                  )}
                  {person.role && (
                    <Chip size="small" label={person.role} sx={{ mt: 0.5, mb: 1 }} />
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {person.summary || person.description.slice(0, 150)}
                    {(!person.summary && person.description.length > 150) ? '...' : ''}
                  </Typography>
                  
                  <Stack direction="row" spacing={1}>
                    <Chip size="small" variant="outlined" label={`${eventCount} events`} />
                    {person.connectionIds && person.connectionIds.length > 0 && (
                      <Chip size="small" variant="outlined" label={`${person.connectionIds.length} connections`} />
                    )}
                  </Stack>

                  {person.tags && person.tags.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                      {person.tags.map(tag => (
                        <Chip key={tag} size="small" label={tag} sx={{ fontSize: '0.7rem' }} />
                      ))}
                    </Stack>
                  )}

                  {person.perspectives && person.perspectives.length > 0 && (
                    <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Perspectives:
                      </Typography>
                      {person.perspectives.map((p, i) => (
                        <Box key={i} sx={{ mt: 0.5 }}>
                          <Chip size="small" label={p.type} sx={{ mr: 1, fontSize: '0.65rem' }} />
                          <Typography variant="caption" color="text.secondary">
                            {p.interpretation.slice(0, 100)}...
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
