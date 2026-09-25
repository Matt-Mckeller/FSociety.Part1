import { useState } from 'react';
import { Box, Paper, Typography, Chip, Stack, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Chat as ChatIcon, Email, Phone, Person, Message } from '@mui/icons-material';
import { communications } from '../utils/dataService';

export default function Communications() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const types = Array.from(new Set(communications.map(c => c.type)));

  const filtered = communications.filter(c => {
    if (typeFilter && c.type !== typeFilter) return false;
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      c.from.toLowerCase().includes(searchLower) ||
      c.to.toLowerCase().includes(searchLower) ||
      c.content.toLowerCase().includes(searchLower) ||
      c.subject?.toLowerCase().includes(searchLower)
    );
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return <Email />;
      case 'phone': return <Phone />;
      case 'text': return <Message />;
      case 'in_person':
      case 'verbal': return <Person />;
      default: return <ChatIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Communications ({filtered.length})
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Search communications"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="">All types</MenuItem>
              {types.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Stack spacing={2}>
        {filtered.map((comm) => (
          <Paper key={comm.id} sx={{ p: 2 }}>
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
                {getIcon(comm.type)}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {comm.subject || 'Untitled Communication'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {comm.from} → {comm.to}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip size="small" label={comm.type} />
                    <Typography variant="caption" color="text.secondary">
                      {comm.date || 'Date unknown'}
                      {comm.time && ` at ${comm.time}`}
                    </Typography>
                  </Stack>
                </Stack>
                
                <Typography variant="body2" sx={{ 
                  backgroundColor: 'action.hover', 
                  p: 1.5, 
                  borderRadius: 1,
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  mb: 1,
                }}>
                  {comm.content}
                </Typography>

                {/* Identity information */}
                {(comm.claimedIdentity || comm.actualIdentity) && (
                  <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                    {comm.claimedIdentity && (
                      <Typography variant="caption" color="text.secondary">
                        Claimed identity: <strong>{comm.claimedIdentity}</strong>
                      </Typography>
                    )}
                    {comm.actualIdentity && (
                      <Typography variant="caption" color="warning.main">
                        Actual identity: <strong>{comm.actualIdentity}</strong>
                      </Typography>
                    )}
                  </Stack>
                )}

                {comm.tags && comm.tags.length > 0 && (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                    {comm.tags.map(tag => (
                      <Chip key={tag} size="small" label={tag} sx={{ fontSize: '0.7rem' }} />
                    ))}
                  </Stack>
                )}

                {comm.perspectives && comm.perspectives.length > 0 && (
                  <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Perspectives:
                    </Typography>
                    {comm.perspectives.map((p, i) => (
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
      </Stack>
    </Box>
  );
}
