import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, TextField } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { organizations } from '../utils/dataService';

export default function Organizations() {
  const [search, setSearch] = useState('');

  const filteredOrgs = organizations.filter(org => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      org.name.toLowerCase().includes(searchLower) ||
      org.type.toLowerCase().includes(searchLower) ||
      org.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Organizations ({filteredOrgs.length})
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Search organizations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 2 }}>
        {filteredOrgs.map((org) => (
          <Paper
            key={org.id}
            component={RouterLink}
            to={`/organizations/${org.id}`}
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
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BusinessIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{org.name}</Typography>
                <Chip size="small" label={org.type} sx={{ mb: 1 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {org.description}
                </Typography>

                {org.concerns && org.concerns.length > 0 && (
                  <Box sx={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', p: 1, borderRadius: 1, mb: 1 }}>
                    <Typography variant="caption" color="error.main" sx={{ fontWeight: 'bold' }}>
                      Concerns:
                    </Typography>
                    {org.concerns.map((concern, i) => (
                      <Typography key={i} variant="body2" color="text.secondary">
                        • {concern}
                      </Typography>
                    ))}
                  </Box>
                )}

                {org.websites && org.websites.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Websites:
                    </Typography>
                    {org.websites.map((url, i) => (
                      <Typography key={i} variant="body2">
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9' }}>
                          {url}
                        </a>
                      </Typography>
                    ))}
                  </Box>
                )}

                <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                  {org.knownPersonIds && org.knownPersonIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${org.knownPersonIds.length} people`} />
                  )}
                  {org.knownLocationIds && org.knownLocationIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${org.knownLocationIds.length} locations`} />
                  )}
                  {org.eventIds && org.eventIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${org.eventIds.length} events`} />
                  )}
                </Stack>

                {org.perspectives && org.perspectives.length > 0 && (
                  <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Perspectives:
                    </Typography>
                    {org.perspectives.map((p, i) => (
                      <Box key={i} sx={{ mt: 0.5 }}>
                        <Chip size="small" label={p.type} sx={{ mr: 1, fontSize: '0.65rem' }} />
                        <Typography variant="caption" color="text.secondary">
                          {p.interpretation}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
