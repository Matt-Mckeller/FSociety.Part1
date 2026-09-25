import { Typography, Box, Paper, Alert } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export default function ProgressionConceptPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
        <Box
          sx={{
            bgcolor: '#8b5cf6',
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
          }}
        >
          <TrendingUpIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            XP & Progression
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Experience points, levels, and user advancement
          </Typography>
        </Box>
      </Box>

      <Alert severity="warning" sx={{ mb: 4 }}>
        <strong>Placeholder:</strong> This concept page is reserved for future content.
      </Alert>

      <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Topics to Cover
        </Typography>
        <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2 }}>
          <li>What is XP and how is it earned?</li>
          <li>Level progression curve</li>
          <li>What unlocks at each level?</li>
          <li>Level display in UI (XP bar, level badge)</li>
          <li>Level-up celebrations and rewards</li>
        </Typography>
      </Paper>
    </>
  )
}
