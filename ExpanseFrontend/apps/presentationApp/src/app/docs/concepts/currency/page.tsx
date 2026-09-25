import { Typography, Box, Paper, Alert } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

export default function CurrencyConceptPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 4 }}>
        <Box
          sx={{
            bgcolor: '#10b981',
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
          }}
        >
          <MonetizationOnIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            Currency System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Virtual coins that reward learning and enable customization
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
          <li>What are coins and how are they earned?</li>
          <li>Coin earning mechanics (quests, slides, actions)</li>
          <li>What can coins be spent on?</li>
          <li>Economy balance considerations</li>
          <li>Connection to unlockables and customization</li>
        </Typography>
      </Paper>
    </>
  )
}
