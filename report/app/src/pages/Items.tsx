import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, TextField } from '@mui/material';
import { Inventory as ItemIcon } from '@mui/icons-material';
import { items } from '../utils/dataService';

export default function Items() {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.type.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.significance?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Items ({filteredItems.length})
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Search items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
          sx={{ maxWidth: 400 }}
        />
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 2 }}>
        {filteredItems.map((item) => (
          <Paper
            key={item.id}
            component={RouterLink}
            to={`/items/${item.id}`}
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
                  backgroundColor: 'warning.main',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ItemIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip size="small" label={item.type} />
                  {item.currentStatus && (
                    <Chip size="small" variant="outlined" label={item.currentStatus} />
                  )}
                </Stack>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.summary || item.description}
                </Typography>
                
                {item.significance && (
                  <Box sx={{ backgroundColor: 'action.hover', p: 1, borderRadius: 1, mb: 1 }}>
                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      Significance:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.significance}
                    </Typography>
                  </Box>
                )}

                {item.tags && item.tags.length > 0 && (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                    {item.tags.map(tag => (
                      <Chip key={tag} size="small" label={tag} sx={{ fontSize: '0.7rem' }} />
                    ))}
                  </Stack>
                )}

                {item.perspectives && item.perspectives.length > 0 && (
                  <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Perspectives:
                    </Typography>
                    {item.perspectives.map((p, i) => (
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
