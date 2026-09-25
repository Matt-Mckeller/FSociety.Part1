import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, TextField } from '@mui/material';
import { Place as PlaceIcon } from '@mui/icons-material';
import { locations, getEventsByLocationId } from '../utils/dataService';

export default function Locations() {
  const [search, setSearch] = useState('');

  const filteredLocations = locations.filter(l => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(searchLower) ||
      l.address?.toLowerCase().includes(searchLower) ||
      l.type.toLowerCase().includes(searchLower) ||
      l.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Locations ({filteredLocations.length})
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Search locations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 2 }}>
        {filteredLocations.map((location) => {
          const eventCount = getEventsByLocationId(location.id).length;

          return (
            <Paper
              key={location.id}
              component={RouterLink}
              to={`/locations/${location.id}`}
              sx={{
                p: 2,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 1,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlaceIcon />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{location.name}</Typography>
                  <Chip size="small" label={location.type} sx={{ mb: 1 }} />
                  
                  {location.address && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      📍 {location.address}
                    </Typography>
                  )}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {location.description}
                  </Typography>
                  
                  <Chip size="small" variant="outlined" label={`${eventCount} events`} />

                  {location.notes && location.notes.length > 0 && (
                    <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Notes:
                      </Typography>
                      {location.notes.map((note, i) => (
                        <Typography key={i} variant="caption" display="block" color="text.secondary">
                          • {note}
                        </Typography>
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
