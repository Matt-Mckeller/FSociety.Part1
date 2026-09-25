import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Stack, LinearProgress } from '@mui/material';
import { Psychology as TheoryIcon } from '@mui/icons-material';
import { theories } from '../utils/dataService';

export default function Theories() {
  // Sort by confidence rating
  const sortedTheories = [...theories].sort((a, b) => (b.confidenceRating || 0) - (a.confidenceRating || 0));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Theories ({theories.length})
      </Typography>

      <Stack spacing={2}>
        {sortedTheories.map((theory) => (
          <Paper
            key={theory.id}
            component={RouterLink}
            to={`/theories/${theory.id}`}
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
                  backgroundColor: 'info.main',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TheoryIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h6">{theory.title}</Typography>
                  <Chip size="small" label={theory.perspective} color="primary" />
                </Stack>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {theory.description}
                </Typography>

                {/* Confidence Rating */}
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Confidence Rating
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {theory.confidenceRating}/10
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(theory.confidenceRating || 0) * 10}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'action.disabledBackground',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: (theory.confidenceRating || 0) >= 7 ? 'success.main' :
                          (theory.confidenceRating || 0) >= 4 ? 'warning.main' : 'error.main',
                      },
                    }}
                  />
                </Box>

                {/* Supporting Evidence */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
                  {theory.supportingEvidenceIds && theory.supportingEvidenceIds.length > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Supporting Evidence:
                      </Typography>
                      <Typography variant="body2">{theory.supportingEvidenceIds.length} events</Typography>
                    </Box>
                  )}
                  {theory.supportingPeopleIds && theory.supportingPeopleIds.length > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Related People:
                      </Typography>
                      <Typography variant="body2">{theory.supportingPeopleIds.length} people</Typography>
                    </Box>
                  )}
                  {theory.supportingLocationIds && theory.supportingLocationIds.length > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Related Locations:
                      </Typography>
                      <Typography variant="body2">{theory.supportingLocationIds.length} locations</Typography>
                    </Box>
                  )}
                  {theory.supportingItemIds && theory.supportingItemIds.length > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        Related Items:
                      </Typography>
                      <Typography variant="body2">{theory.supportingItemIds.length} items</Typography>
                    </Box>
                  )}
                </Box>

                {/* Potential Arguments Against */}
                {theory.contradictingEvidence && theory.contradictingEvidence.length > 0 && (
                  <Box sx={{ mt: 2, p: 1, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: 1 }}>
                    <Typography variant="caption" color="error.main" sx={{ fontWeight: 'bold' }}>
                      Potential Arguments Against:
                    </Typography>
                    {theory.contradictingEvidence.map((item, i) => (
                      <Typography key={i} variant="body2" color="text.secondary">
                        • {item}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Notes */}
                {theory.notes && (
                  <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Notes:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Array.isArray(theory.notes) ? theory.notes.join(' ') : theory.notes}
                    </Typography>
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
