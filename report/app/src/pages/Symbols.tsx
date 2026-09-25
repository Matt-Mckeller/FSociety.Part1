import { Box, Paper, Typography, Chip, Stack, LinearProgress } from '@mui/material';
import { AutoAwesome as SymbolIcon } from '@mui/icons-material';
import { symbols } from '../utils/dataService';

export default function Symbols() {
  // Sort by frequency score
  const sortedSymbols = [...symbols].sort((a, b) => (b.frequencyScore || 0) - (a.frequencyScore || 0));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Symbols & Patterns ({symbols.length})
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Recurring symbols, patterns, and motifs observed in the data
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 2 }}>
        {sortedSymbols.map((symbol) => (
          <Paper key={symbol.id} sx={{ p: 2 }}>
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
                <SymbolIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{symbol.name}</Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {symbol.description}
                </Typography>

                {symbol.interpretation && (
                  <Box sx={{ backgroundColor: 'action.hover', p: 1, borderRadius: 1, mb: 1 }}>
                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      Interpretation:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {symbol.interpretation}
                    </Typography>
                  </Box>
                )}

                {/* Frequency Score */}
                {symbol.frequencyScore !== undefined && (
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Frequency Score
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {symbol.frequencyScore}/10
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(symbol.frequencyScore || 0) * 10}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'action.disabledBackground',
                      }}
                    />
                  </Box>
                )}

                {/* Associated entities */}
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                  {symbol.associatedEventIds && symbol.associatedEventIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${symbol.associatedEventIds.length} events`} />
                  )}
                  {symbol.associatedItemIds && symbol.associatedItemIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${symbol.associatedItemIds.length} items`} />
                  )}
                  {symbol.associatedPeopleIds && symbol.associatedPeopleIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${symbol.associatedPeopleIds.length} people`} />
                  )}
                  {symbol.associatedLocationIds && symbol.associatedLocationIds.length > 0 && (
                    <Chip size="small" variant="outlined" label={`${symbol.associatedLocationIds.length} locations`} />
                  )}
                </Stack>

                {/* Notes */}
                {symbol.notes && (
                  <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Notes:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Array.isArray(symbol.notes) ? symbol.notes.join(' ') : symbol.notes}
                    </Typography>
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
