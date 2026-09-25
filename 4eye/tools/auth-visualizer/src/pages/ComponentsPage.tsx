import { Typography, Box, Grid } from '@mui/material';
import MermaidDiagram from '../components/MermaidDiagram';
import { allComponentDiagrams } from '../data/components';

export default function ComponentsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
        Components & Hooks
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Frontend components, hooks, and their relationships.
      </Typography>

      <Grid container spacing={3}>
        {allComponentDiagrams.map((diagram, i) => (
          <Grid size={{ xs: 12, lg: 6 }} key={i}>
            <MermaidDiagram 
              chart={diagram.chart} 
              title={diagram.title}
              description={diagram.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
