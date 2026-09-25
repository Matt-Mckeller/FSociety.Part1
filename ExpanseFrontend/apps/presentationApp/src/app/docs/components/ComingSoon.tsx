'use client';

import { Paper, Typography, Box, Chip } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

interface ComingSoonProps {
  title: string;
  description?: string;
  expectedContent?: string[];
}

export function ComingSoon({ title, description, expectedContent }: ComingSoonProps) {
  return (
    <>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          bgcolor: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: 2,
          mb: 3,
        }}
      >
        <ConstructionIcon sx={{ fontSize: 48, color: '#d97706', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#92400e', mb: 1 }}>
          Coming Soon
        </Typography>
        <Typography variant="body1" sx={{ color: '#78350f' }}>
          {description || 'This section is not yet documented. Content will be added as the project progresses.'}
        </Typography>
      </Paper>

      {expectedContent && expectedContent.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Expected Content
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {expectedContent.map((item) => (
              <Chip 
                key={item} 
                label={item} 
                variant="outlined" 
                sx={{ borderStyle: 'dashed' }}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
